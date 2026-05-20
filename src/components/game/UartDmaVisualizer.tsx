"use client";

import { useMemo, useState } from "react";
import { uartDmaRoute } from "@/data/packetRoutes";
import { PacketFlow } from "./PacketFlow";
import { SimulationModal } from "./SimulationModal";
import styles from "./PixelGame.module.css";

type UartDmaVisualizerProps = {
  onClose: () => void;
  onStart?: () => void;
};

export function UartDmaVisualizer({ onClose, onStart }: UartDmaVisualizerProps) {
  const [running, setRunning] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState(uartDmaRoute.nodes[0].id);

  const selectedNode = useMemo(
    () => uartDmaRoute.nodes.find((node) => node.id === selectedNodeId) ?? uartDmaRoute.nodes[0],
    [selectedNodeId],
  );

  const start = () => {
    setRunning(true);
    onStart?.();
  };

  return (
    <SimulationModal eyebrow="Firmware Lab" title="UART + DMA Visualizer" onClose={onClose}>
      <p className={styles.modalSummary}>
        Simplified embedded routing model: Tool UART -&gt; USART2 RX -&gt; DMA -&gt; Circular Buffer -&gt; LPUART1 TX -&gt; Cellular Module.
      </p>
      <div className={styles.demoToolbar}>
        <button type="button" onClick={running ? () => setRunning(false) : start}>
          {running ? "Pause" : "Start"}
        </button>
        <button type="button" onClick={() => setRunning(false)}>
          Reset
        </button>
        <label className={styles.toggleLabel}>
          <input
            checked={showLabels}
            onChange={(event) => setShowLabels(event.target.checked)}
            type="checkbox"
          />
          Show labels
        </label>
      </div>
      <PacketFlow
        route={uartDmaRoute}
        running={running}
        selectedNodeId={selectedNodeId}
        showLabels={showLabels}
        onSelectNode={setSelectedNodeId}
      />
      <div className={styles.demoGrid}>
        <article className={styles.detailPanel}>
          <p>Node Description</p>
          <h3>{selectedNode.label}</h3>
          <span>{selectedNode.description}</span>
        </article>
        <StatusPanel status={uartDmaRoute.status} />
      </div>
    </SimulationModal>
  );
}

function StatusPanel({ status }: { status: Record<string, string> }) {
  return (
    <article className={styles.statusGridPanel}>
      <p>Route Status</p>
      <dl>
        {Object.entries(status).map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
