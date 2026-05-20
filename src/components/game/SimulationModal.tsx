"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import styles from "./PixelGame.module.css";

type SimulationModalProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  wide?: boolean;
  onClose: () => void;
};

export function SimulationModal({
  eyebrow,
  title,
  children,
  wide = true,
  onClose,
}: SimulationModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();

    return () => previousFocus?.focus();
  }, []);

  return (
    <div
      aria-labelledby="simulation-title"
      aria-modal="true"
      className={styles.modalBackdrop}
      role="dialog"
    >
      <section
        className={[styles.modalCard, styles.simulationCard, wide ? styles.simulationCardWide : null]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles.modalHeader}>
          <p>{eyebrow}</p>
          <button ref={closeButtonRef} type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <h2 id="simulation-title">{title}</h2>
        {children}
      </section>
    </div>
  );
}
