"use client";

import { useEffect, useState } from "react";
import { guidedTourStops } from "@/data/guidedTourStops";
import { CLASSIC_PORTFOLIO_URL, resumeHref } from "@/data/portfolioHotspots";
import { trackPortfolioEvent } from "@/lib/portfolioAnalytics";
import type { ZoneId } from "@/types/game";
import { SimulationModal } from "./SimulationModal";
import styles from "./PixelGame.module.css";

type GuidedTourProps = {
  onClose: () => void;
  onComplete?: () => void;
  onFocusZone?: (zoneId: ZoneId) => void;
  onJumpToZone?: (zoneId: ZoneId) => void;
};

export function GuidedTour({ onClose, onComplete, onFocusZone, onJumpToZone }: GuidedTourProps) {
  const [index, setIndex] = useState(0);
  const stop = guidedTourStops[index];
  const isLast = index === guidedTourStops.length - 1;

  useEffect(() => {
    trackPortfolioEvent("guided_tour_started");
  }, []);

  useEffect(() => {
    onFocusZone?.(stop.zoneId);
  }, [onFocusZone, stop.zoneId]);

  const next = () => {
    if (isLast) {
      onComplete?.();
      trackPortfolioEvent("guided_tour_completed");
      onClose();
      return;
    }

    setIndex((current) => current + 1);
  };

  return (
    <SimulationModal
      eyebrow={`Recruiter Tour ${index + 1}/${guidedTourStops.length}`}
      title={stop.title}
      onClose={onClose}
    >
      <p className={styles.modalSummary}>{stop.explanation}</p>
      <div className={styles.storyValueBox}>
        <span>Why it matters</span>
        <p>{stop.professionalValue}</p>
      </div>
      <ul className={styles.tourHighlights}>
        {stop.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <div className={styles.tourProgress} aria-label="Tour progress">
        {guidedTourStops.map((tourStop, stepIndex) => (
          <button
            aria-label={`Open ${tourStop.title}`}
            aria-pressed={stepIndex === index}
            key={tourStop.zoneId}
            onClick={() => setIndex(stepIndex)}
            type="button"
          />
        ))}
      </div>
      {isLast ? (
        <div className={styles.tourCtaPanel}>
          <p>Ready for the conventional next step?</p>
          <a
            href={resumeHref}
            onClick={() => trackPortfolioEvent("resume_clicked", { source: "guided_tour" })}
          >
            Resume
          </a>
          <a
            href="mailto:raqueed@outlook.com"
            onClick={() => trackPortfolioEvent("contact_clicked", { source: "guided_tour" })}
          >
            Contact
          </a>
          <a
            href={CLASSIC_PORTFOLIO_URL}
            onClick={() => trackPortfolioEvent("classic_portfolio_clicked", { source: "guided_tour" })}
          >
            Classic Portfolio
          </a>
        </div>
      ) : null}
      <div className={styles.dialogActions}>
        <button disabled={index === 0} onClick={() => setIndex((current) => Math.max(current - 1, 0))} type="button">
          Back
        </button>
        <button
          onClick={() => {
            onJumpToZone?.(stop.zoneId);
            onClose();
          }}
          type="button"
        >
          Jump
        </button>
        <button onClick={next} type="button">
          {isLast ? "Finish Tour" : "Next"}
        </button>
        <button onClick={onClose} type="button">
          Exit Tour
        </button>
      </div>
    </SimulationModal>
  );
}
