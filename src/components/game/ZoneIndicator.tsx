"use client";

import type { GameZone, ZoneId } from "@/types/game";
import styles from "./PixelGame.module.css";

type ZoneIndicatorProps = {
  currentZone: GameZone;
  visitedZones: Set<ZoneId>;
};

export function ZoneIndicator({ currentZone, visitedZones }: ZoneIndicatorProps) {
  return (
    <div className={styles.zoneIndicator} aria-live="polite">
      <span>Current Zone</span>
      <strong>{currentZone.label}</strong>
      <p>{visitedZones.size}/7 explored</p>
    </div>
  );
}
