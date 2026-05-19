"use client";

import type { CSSProperties } from "react";
import { WORLD_HEIGHT, WORLD_WIDTH } from "@/data/gameZones";
import type { GameNpc } from "@/types/game";
import styles from "./PixelGame.module.css";

type NPCProps = {
  npc: GameNpc;
  active: boolean;
  onTalk: (npc: GameNpc) => void;
};

export function NPC({ npc, active, onTalk }: NPCProps) {
  return (
    <button
      aria-label={`Talk to ${npc.name}`}
      className={[styles.npc, styles[npc.id], active ? styles.npcActive : null]
        .filter(Boolean)
        .join(" ")}
      onClick={() => onTalk(npc)}
      style={{
        left: `${(npc.position.x / WORLD_WIDTH) * 100}%`,
        top: `${(npc.position.y / WORLD_HEIGHT) * 100}%`,
        "--accent": npc.accent,
      } as CSSProperties}
      type="button"
    >
      <span className={styles.npcShadow} />
      <span className={styles.npcAntenna} />
      <span className={styles.npcHead} />
      <span className={styles.npcFace} />
      <span className={styles.npcBody} />
      <span className={styles.npcLabel}>{npc.name}</span>
    </button>
  );
}
