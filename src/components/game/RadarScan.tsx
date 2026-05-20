"use client";

import styles from "./PixelGame.module.css";

type RadarScanProps = {
  scanning: boolean;
};

export function RadarScan({ scanning }: RadarScanProps) {
  return (
    <div className={[styles.radar, scanning ? styles.radarScanning : null].filter(Boolean).join(" ")}>
      <span className={styles.radarCore} />
      <span className={styles.radarRing} />
      <span className={styles.radarRing} />
      <span className={styles.radarSweep} />
      <span className={styles.radarBlip} />
      <span className={styles.radarBlip} />
      <span className={styles.radarBlip} />
    </div>
  );
}
