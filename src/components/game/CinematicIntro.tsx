"use client";

import { useCallback, useEffect, useState } from "react";
import { trackPortfolioEvent } from "@/lib/portfolioAnalytics";
import styles from "./PixelGame.module.css";

const INTRO_STORAGE_KEY = "raqueed-pixel-intro-seen";

type CinematicIntroProps = {
  onFinish: () => void;
};

export function CinematicIntro({ onFinish }: CinematicIntroProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = window.localStorage.getItem(INTRO_STORAGE_KEY);
    if (seen === "true") {
      window.setTimeout(onFinish, 0);
      return;
    }

    const timeout = window.setTimeout(() => {
      setVisible(true);
      trackPortfolioEvent("intro_started");
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [onFinish]);

  const completeIntro = useCallback(
    (reason: "skipped" | "completed") => {
      window.localStorage.setItem(INTRO_STORAGE_KEY, "true");
      if (reason === "skipped") {
        trackPortfolioEvent("intro_skipped");
      }
      setVisible(false);
      onFinish();
    },
    [onFinish],
  );

  useEffect(() => {
    if (!visible) {
      return;
    }

    const timeout = window.setTimeout(() => {
      completeIntro("completed");
    }, 6800);

    return () => window.clearTimeout(timeout);
  }, [completeIntro, visible]);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.introBackdrop} role="dialog" aria-modal="true" aria-labelledby="intro-title">
      <div className={styles.introRain} aria-hidden="true" />
      <button className={styles.skipIntroButton} type="button" onClick={() => completeIntro("skipped")}>
        Skip Intro
      </button>
      <section className={styles.introStage}>
        <div className={styles.introMonitorWall} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={styles.introTerminal} aria-hidden="true">
          <span>&gt; power rails stable</span>
          <span>&gt; dma buffers online</span>
          <span>&gt; mqtt route armed</span>
          <span>&gt; recruiter tour ready</span>
        </div>
        <p className={styles.introKicker}>Monitors online</p>
        <h2 id="intro-title">Raqueed&apos;s Engineering Lab</h2>
        <p className={styles.introSubtitle}>
          Embedded Systems • IoT • Automation • Research • Creative Technology
        </p>
      </section>
    </div>
  );
}
