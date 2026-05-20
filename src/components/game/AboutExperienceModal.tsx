"use client";

import { useEffect, useRef } from "react";
import { CLASSIC_PORTFOLIO_URL, resumeHref } from "@/data/portfolioHotspots";
import { trackPortfolioEvent } from "@/lib/portfolioAnalytics";
import styles from "./PixelGame.module.css";

type AboutExperienceModalProps = {
  onClose: () => void;
};

export function AboutExperienceModal({ onClose }: AboutExperienceModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <div aria-labelledby="about-title" aria-modal="true" className={styles.modalBackdrop} role="dialog">
      <article className={styles.modalCard}>
        <div className={styles.modalHeader}>
          <p>About</p>
          <button ref={closeButtonRef} type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <h2 id="about-title">About This Pixel Portfolio</h2>
        <p className={styles.modalSummary}>
          This interactive portfolio turns embedded systems, IoT, automation, research, photography, and
          creative technology into an explorable pixel-style engineering lab. It is designed to make the
          portfolio memorable while keeping recruiter navigation fast and accessible.
        </p>
        <p className={styles.modalSummary}>
          Built with React, Next.js, and TypeScript.
        </p>
        <div className={styles.modalActions}>
          <a
            className={styles.primaryCta}
            href={CLASSIC_PORTFOLIO_URL}
            onClick={() => trackPortfolioEvent("classic_portfolio_clicked", { source: "about_modal" })}
          >
            Classic Portfolio
          </a>
          <a
            className={styles.secondaryCta}
            href={resumeHref}
            onClick={() => trackPortfolioEvent("resume_clicked", { source: "about_modal" })}
          >
            Resume
          </a>
          <a
            className={styles.secondaryCta}
            href="mailto:raqueed@outlook.com"
            onClick={() => trackPortfolioEvent("contact_clicked", { source: "about_modal" })}
          >
            Contact
          </a>
        </div>
      </article>
    </div>
  );
}
