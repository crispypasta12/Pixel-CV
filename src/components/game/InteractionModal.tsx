"use client";

import { useEffect, useRef } from "react";
import type { Hotspot } from "@/types/game";
import styles from "./PixelGame.module.css";

type InteractionModalProps = {
  hotspot: Hotspot;
  onClose: () => void;
  onOpenDemo?: () => void;
};

export function InteractionModal({ hotspot, onClose, onOpenDemo }: InteractionModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();

    return () => previousFocus?.focus();
  }, [hotspot.id]);

  return (
    <div
      aria-labelledby="inspection-title"
      aria-modal="true"
      className={styles.modalBackdrop}
      role="dialog"
    >
      <article className={styles.modalCard}>
        <div className={styles.modalHeader}>
          <p>{hotspot.objectName}</p>
          <button ref={closeButtonRef} type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <h2 id="inspection-title">{hotspot.title}</h2>
        <p className={styles.modalSummary}>{hotspot.summary}</p>
        <ul>
          {hotspot.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <div className={styles.modalActions}>
          {onOpenDemo ? (
            <button className={styles.primaryCtaButton} type="button" onClick={onOpenDemo}>
              Open Interactive Demo
            </button>
          ) : null}
          <a className={styles.primaryCta} href={hotspot.ctaHref}>
            {hotspot.ctaLabel}
          </a>
        </div>
      </article>
    </div>
  );
}
