"use client";

import type { ReactNode } from "react";
import { gameZones, WORLD_HEIGHT, WORLD_WIDTH } from "@/data/gameZones";
import styles from "./PixelGame.module.css";

type GameWorldProps = {
  children: ReactNode;
};

export function GameWorld({ children }: GameWorldProps) {
  return (
    <div
      className={styles.room}
      role="img"
      aria-label="Raqueed's interactive engineering apartment with connected pixel-art zones"
      style={{ aspectRatio: `${WORLD_WIDTH} / ${WORLD_HEIGHT}` }}
    >
      <div className={styles.ambientGlow} />
      <div className={styles.cityWindow}>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.rainWindow}>
        <span />
      </div>
      <div className={styles.floorGrid} />
      <div className={styles.lightDust} />
      <div className={styles.mainWalkway} />
      <div className={styles.environmentDetails} aria-hidden="true">
        <span className={styles.stickyNotes} />
        <span className={styles.whiteboardDiagram} />
        <span className={styles.rcCarShelf} />
        <span className={styles.cameraLensRack} />
        <span className={styles.filamentRack} />
        <span className={styles.devBoardCluster} />
        <span className={styles.ledStripTop} />
        <span className={styles.ledStripBottom} />
      </div>

      {gameZones.map((zone) => (
        <div
          className={[styles.zone, styles[`zone_${zone.id}`]].filter(Boolean).join(" ")}
          key={zone.id}
          style={{
            left: `${(zone.bounds.x / WORLD_WIDTH) * 100}%`,
            top: `${(zone.bounds.y / WORLD_HEIGHT) * 100}%`,
            width: `${(zone.bounds.width / WORLD_WIDTH) * 100}%`,
            height: `${(zone.bounds.height / WORLD_HEIGHT) * 100}%`,
          }}
        >
          <span className={styles.zoneSign}>{zone.label}</span>
        </div>
      ))}

      {children}
    </div>
  );
}
