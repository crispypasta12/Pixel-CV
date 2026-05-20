"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { terminalCommands } from "@/data/terminalCommands";
import styles from "./PixelGame.module.css";

type TerminalLine = {
  id: number;
  kind: "input" | "output" | "error";
  text: string;
  cta?: {
    label: string;
    href: string;
  };
};

type TerminalWindowProps = {
  onClose: () => void;
  onCommandAchievement?: (command: string) => void;
};

const initialLines: TerminalLine[] = [
  {
    id: 1,
    kind: "output",
    text: "Raqueed engineering terminal v3.0 - simulated local shell",
  },
  {
    id: 2,
    kind: "output",
    text: "Type help to list commands. No real shell commands are executed.",
  },
];

export function TerminalWindow({ onClose, onCommandAchievement }: TerminalWindowProps) {
  const [lines, setLines] = useState<TerminalLine[]>(initialLines);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const nextIdRef = useRef(3);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const appendLines = (nextLines: Omit<TerminalLine, "id">[]) => {
    setLines((previous) => [
      ...previous,
      ...nextLines.map((line) => ({ ...line, id: nextIdRef.current++ })),
    ]);
  };

  const submitCommand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = value.trim().toLowerCase();
    if (!command) {
      return;
    }

    setValue("");

    if (command === "clear") {
      setLines([]);
      return;
    }

    if (command === "exit") {
      onClose();
      return;
    }

    const terminalCommand = terminalCommands[command];
    if (!terminalCommand) {
      appendLines([
        { kind: "input", text: `$ ${command}` },
        { kind: "error", text: `Unknown command: ${command}. Type help.` },
      ]);
      return;
    }

    appendLines([
      { kind: "input", text: `$ ${command}` },
      ...terminalCommand.output.map((text) => ({
        kind: "output" as const,
        text,
        cta: terminalCommand.cta,
      })),
    ]);
    onCommandAchievement?.(command);
  };

  return (
    <div className={styles.terminalWindow} onClick={() => inputRef.current?.focus()}>
      <div className={styles.terminalOutput} aria-live="polite">
        {lines.map((line) => (
          <div className={styles[`terminalLine_${line.kind}`]} key={line.id}>
            <span>{line.text}</span>
            {line.cta ? (
              <a href={line.cta.href} onClick={(event) => event.stopPropagation()}>
                {line.cta.label}
              </a>
            ) : null}
          </div>
        ))}
      </div>
      <form className={styles.terminalInputRow} onSubmit={submitCommand}>
        <label htmlFor="game-terminal-input">$</label>
        <input
          autoComplete="off"
          id="game-terminal-input"
          onChange={(event) => setValue(event.target.value)}
          placeholder="help"
          ref={inputRef}
          spellCheck={false}
          value={value}
        />
      </form>
    </div>
  );
}
