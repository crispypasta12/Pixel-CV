"use client";

import type { Direction, Point } from "@/types/game";
import { WORLD_HEIGHT, WORLD_WIDTH } from "@/data/gameZones";
import styles from "./PixelGame.module.css";

type PlayerProps = {
  position: Point;
  direction: Direction;
  moving: boolean;
};

export function Player({ position, direction, moving }: PlayerProps) {
  return (
    <div
      aria-label="Player character"
      className={[styles.player, styles[direction], moving ? styles.walking : null]
        .filter(Boolean)
        .join(" ")}
      style={{
        left: `${(position.x / WORLD_WIDTH) * 100}%`,
        top: `${(position.y / WORLD_HEIGHT) * 100}%`,
      }}
    >
      <span className={styles.playerShadow} />
      <span className={styles.playerHair} />
      <span className={styles.playerHead} />
      <span className={styles.playerBody} />
      <span className={styles.playerPack} />
      <span className={styles.playerLegLeft} />
      <span className={styles.playerLegRight} />
    </div>
  );
}
