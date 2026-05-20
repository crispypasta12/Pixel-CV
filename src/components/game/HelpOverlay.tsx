"use client";

import { useEffect, useRef } from "react";
import { ViewToggle } from "./ViewToggle";
import styles from "./PixelGame.module.css";

type HelpOverlayProps = {
  onClose: () => void;
};

const shortcuts = [
  ["WASD / Arrow Keys", "Move"],
  ["E", "Inspect / Talk"],
  ["Esc", "Close modal"],
  ["M", "Recruiter Mode"],
  ["T", "Guided Tour"],
  ["Ctrl+K / Cmd+K", "Search / Quick Jump"],
  ["?", "Help"],
];

export function HelpOverlay({ onClose }: HelpOverlayProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <div aria-labelledby="help-title" aria-modal="true" className={styles.modalBackdrop} role="dialog">
      <article className={styles.modalCard}>
        <div className={styles.modalHeader}>
          <p>Keyboard Help</p>
          <button ref={closeButtonRef} type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <h2 id="help-title">Shortcuts</h2>
        <dl className={styles.controlsList}>
          {shortcuts.map(([key, value]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.helpFooter}>
          <p>Use the view switcher in the HUD or Recruiter Mode to move between Classic Portfolio and Game Portfolio.</p>
          <ViewToggle compact />
        </div>
      </article>
    </div>
  );
}
