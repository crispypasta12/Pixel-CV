"use client";

import { useEffect, useRef } from "react";
import styles from "./PixelGame.module.css";

type OnboardingDialogProps = {
  onClose: () => void;
};

export function OnboardingDialog({ onClose }: OnboardingDialogProps) {
  const startButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    startButtonRef.current?.focus();

    return () => previousFocus?.focus();
  }, []);

  return (
    <div
      aria-labelledby="welcome-title"
      aria-modal="true"
      className={styles.modalBackdrop}
      role="dialog"
    >
      <article className={`${styles.modalCard} ${styles.welcomeCard}`}>
        <div className={styles.modalHeader}>
          <p>Welcome</p>
          <button ref={startButtonRef} type="button" onClick={onClose}>
            Start
          </button>
        </div>
        <h2 id="welcome-title">Welcome to Raqueed&apos;s Interactive Engineering Apartment.</h2>
        <p className={styles.modalSummary}>
          Walk through connected zones, inspect portfolio hotspots, and talk to
          small helper bots for guided context.
        </p>
        <dl className={styles.controlsList}>
          <div>
            <dt>WASD / Arrow Keys</dt>
            <dd>Move</dd>
          </div>
          <div>
            <dt>E</dt>
            <dd>Inspect / Talk</dd>
          </div>
          <div>
            <dt>Esc</dt>
            <dd>Close</dd>
          </div>
        </dl>
      </article>
    </div>
  );
}
