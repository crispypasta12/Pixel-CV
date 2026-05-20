"use client";

import { useState } from "react";
import { firmwareAnalysisResults, researchSimulations } from "@/data/researchSimulations";
import { SimulationModal } from "./SimulationModal";
import styles from "./PixelGame.module.css";

type ResearchConsoleProps = {
  onClose: () => void;
  onAnalyze?: () => void;
};

export function ResearchConsole({ onClose, onAnalyze }: ResearchConsoleProps) {
  const [activeTab, setActiveTab] = useState<"firmware" | "power">("firmware");
  const [analyzing, setAnalyzing] = useState(false);
  const [complete, setComplete] = useState(false);

  const analyzeFirmware = () => {
    setAnalyzing(true);
    setComplete(false);
    onAnalyze?.();
    window.setTimeout(() => {
      setAnalyzing(false);
      setComplete(true);
    }, 1200);
  };

  return (
    <SimulationModal eyebrow="Research / Publications" title="Research Console" onClose={onClose}>
      <div className={styles.tabList} role="tablist" aria-label="Research simulations">
        <button
          aria-selected={activeTab === "firmware"}
          onClick={() => setActiveTab("firmware")}
          role="tab"
          type="button"
        >
          Firmware Malware Detection
        </button>
        <button
          aria-selected={activeTab === "power"}
          onClick={() => setActiveTab("power")}
          role="tab"
          type="button"
        >
          Power System Cybersecurity
        </button>
      </div>

      {activeTab === "firmware" ? (
        <section className={styles.researchPanel} role="tabpanel">
          <article className={styles.firmwareCard}>
            <p>Sample Firmware File</p>
            <h3>{firmwareAnalysisResults.fileName}</h3>
            <span>Simulated static feature extraction. No upload or live scan occurs.</span>
            <button type="button" onClick={analyzeFirmware}>
              Analyze Firmware
            </button>
            {analyzing ? <div className={styles.progressBar}><span /></div> : null}
          </article>
          <div className={styles.featureMatrix} aria-label="Byte-pattern visualization">
            {firmwareAnalysisResults.features.map((feature, index) => (
              <span
                key={`${feature}-${index}`}
                style={{ opacity: 0.25 + feature / 140 }}
              />
            ))}
          </div>
          <article className={styles.detailPanel}>
            <p>Simulated Result</p>
            {complete ? (
              <>
                <h3>{firmwareAnalysisResults.classification}</h3>
                <span>Confidence: {firmwareAnalysisResults.confidence}%</span>
              </>
            ) : (
              <>
                <h3>Awaiting analysis</h3>
                <span>{researchSimulations[0].explanation}</span>
              </>
            )}
          </article>
        </section>
      ) : (
        <section className={styles.researchPanel} role="tabpanel">
          <div className={styles.gridSimulation} aria-label="Power system cybersecurity simulation">
            <span className={styles.substationNode}>Substation</span>
            <span className={styles.gridNode}>Feeder</span>
            <span className={styles.gridNode}>Inverter</span>
            <span className={styles.attackSignal}>Attack Signal</span>
            <span className={styles.detectionNode}>Detection</span>
          </div>
          <article className={styles.detailPanel}>
            <p>{researchSimulations[1].title}</p>
            <h3>Anomaly caught</h3>
            <span>{researchSimulations[1].explanation}</span>
          </article>
        </section>
      )}
    </SimulationModal>
  );
}
