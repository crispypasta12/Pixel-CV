"use client";

import type { DemoId } from "@/types/game";
import styles from "./PixelGame.module.css";

type WorldFeedbackProps = {
  activeEffects: Set<DemoId>;
};

export function WorldFeedback({ activeEffects }: WorldFeedbackProps) {
  return (
    <>
      {activeEffects.has("ble-scanner") ? (
        <div className={styles.worldBleParticles} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      ) : null}
      {activeEffects.has("uart-dma") ? <div className={styles.worldLabLeds} aria-hidden="true" /> : null}
      {activeEffects.has("iot-router") ? <div className={styles.worldServerBoost} aria-hidden="true" /> : null}
      {activeEffects.has("research-console") ? <div className={styles.worldResearchGlow} aria-hidden="true" /> : null}
      {activeEffects.has("layercade-showcase") ? <div className={styles.worldPrinterBoost} aria-hidden="true" /> : null}
    </>
  );
}
