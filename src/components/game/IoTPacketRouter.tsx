"use client";

import { useMemo, useState } from "react";
import { iotPacketRoute } from "@/data/packetRoutes";
import { PacketFlow } from "./PacketFlow";
import { SimulationModal } from "./SimulationModal";
import styles from "./PixelGame.module.css";

type IoTPacketRouterProps = {
  onClose: () => void;
  onStart?: () => void;
};

export function IoTPacketRouter({ onClose, onStart }: IoTPacketRouterProps) {
  const [running, setRunning] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(iotPacketRoute.nodes[0].id);

  const selectedNode = useMemo(
    () => iotPacketRoute.nodes.find((node) => node.id === selectedNodeId) ?? iotPacketRoute.nodes[0],
    [selectedNodeId],
  );

  const start = () => {
    setRunning(true);
    onStart?.();
  };

  const retryUpload = () => {
    setRetrying(true);
    setRunning(true);
    onStart?.();
    window.setTimeout(() => setRetrying(false), 1400);
  };

  return (
    <SimulationModal eyebrow="Automation Stack" title="MQTT / IoT Packet Router" onClose={onClose}>
      <p className={styles.modalSummary}>
        Local-only visual route: Tool Device -&gt; BLE Module -&gt; Cellular Module -&gt; MQTT Broker -&gt; AWS Cloud -&gt; Dashboard.
      </p>
      <div className={styles.demoToolbar}>
        <button type="button" onClick={running ? () => setRunning(false) : start}>
          {running ? "Pause" : "Start"}
        </button>
        <button type="button" onClick={() => setRunning(false)}>
          Reset
        </button>
        <button type="button" onClick={retryUpload}>
          Retry Upload
        </button>
      </div>
      <PacketFlow
        route={iotPacketRoute}
        running={running || retrying}
        selectedNodeId={selectedNodeId}
        onSelectNode={setSelectedNodeId}
      />
      <div className={styles.demoGrid}>
        <article className={styles.detailPanel}>
          <p>{retrying ? "Retrying Upload" : "Selected Node"}</p>
          <h3>{selectedNode.label}</h3>
          <span>{selectedNode.description}</span>
        </article>
        <article className={styles.statusGridPanel}>
          <p>Simulated Status</p>
          <dl>
            {Object.entries(iotPacketRoute.status).map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{retrying && label === "Cloud Upload" ? "Retrying..." : value}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>
      <div className={styles.logWindow} aria-live="polite">
        {(iotPacketRoute.logs ?? []).map((line) => (
          <span key={line}>{line}</span>
        ))}
        {retrying ? <span>[00:06] Retry publish queued</span> : null}
      </div>
    </SimulationModal>
  );
}
