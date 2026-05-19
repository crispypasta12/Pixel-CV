"use client";

import { useEffect, useRef } from "react";
import type { Hotspot } from "@/types/game";
import styles from "./PixelGame.module.css";

type InteractionModalProps = {
  hotspot: Hotspot;
  onClose: () => void;
};

export function InteractionModal({ hotspot, onClose }: InteractionModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
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
        <a className={styles.primaryCta} href={hotspot.ctaHref}>
          {hotspot.ctaLabel}
        </a>
      </article>
    </div>
  );
}
