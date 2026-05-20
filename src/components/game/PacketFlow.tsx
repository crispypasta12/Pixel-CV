"use client";

import type { PacketRoute } from "@/types/game";
import styles from "./PixelGame.module.css";

type PacketFlowProps = {
  route: PacketRoute;
  running: boolean;
  showLabels?: boolean;
  selectedNodeId?: string | null;
  onSelectNode?: (nodeId: string) => void;
};

export function PacketFlow({
  route,
  running,
  showLabels = true,
  selectedNodeId,
  onSelectNode,
}: PacketFlowProps) {
  return (
    <div className={styles.packetFlow} aria-label={`${route.title} packet route`}>
      <div className={styles.packetRail} />
      {running ? (
        <>
          <span className={styles.flowPacket} />
          <span className={styles.flowPacket} />
          <span className={styles.flowPacket} />
        </>
      ) : null}
      {route.nodes.map((node, index) => (
        <button
          aria-pressed={selectedNodeId === node.id}
          className={[
            styles.packetNode,
            selectedNodeId === node.id ? styles.packetNodeSelected : null,
          ]
            .filter(Boolean)
            .join(" ")}
          key={node.id}
          onClick={() => onSelectNode?.(node.id)}
          style={{ left: `${(index / Math.max(route.nodes.length - 1, 1)) * 100}%` }}
          type="button"
        >
          <span>{index + 1}</span>
          {showLabels ? <strong>{node.label}</strong> : null}
        </button>
      ))}
    </div>
  );
}
