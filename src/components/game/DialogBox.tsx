"use client";

import { useEffect, useRef, useState } from "react";
import type { GameNpc } from "@/types/game";
import styles from "./PixelGame.module.css";

type DialogBoxProps = {
  npc: GameNpc;
  onClose: () => void;
};

export function DialogBox({ npc, onClose }: DialogBoxProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isLastLine = lineIndex >= npc.lines.length - 1;

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, [npc.id]);

  return (
    <div
      aria-labelledby="dialog-title"
      aria-modal="true"
      className={styles.dialogBackdrop}
      role="dialog"
    >
      <article className={styles.dialogBox}>
        <div className={styles.modalHeader}>
          <p>{npc.role}</p>
          <button ref={closeButtonRef} type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <h2 id="dialog-title">{npc.name}</h2>
        <p className={styles.dialogLine}>{npc.lines[lineIndex]}</p>
        <div className={styles.dialogActions}>
          {npc.ctaHref ? (
            <a className={styles.secondaryCta} href={npc.ctaHref}>
              {npc.ctaLabel}
            </a>
          ) : null}
          <button
            type="button"
            onClick={() => (isLastLine ? onClose() : setLineIndex((value) => value + 1))}
          >
            {isLastLine ? "Done" : "Next"}
          </button>
        </div>
      </article>
    </div>
  );
}
