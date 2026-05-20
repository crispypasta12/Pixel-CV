"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CLASSIC_PORTFOLIO_URL, resumeHref } from "@/data/portfolioHotspots";
import type { DemoId, ZoneId } from "@/types/game";
import { trackPortfolioEvent } from "@/lib/portfolioAnalytics";
import styles from "./PixelGame.module.css";

type QuickAction =
  | { id: string; label: string; hint: string; type: "demo"; demoId: DemoId }
  | { id: string; label: string; hint: string; type: "zone"; zoneId: ZoneId }
  | { id: string; label: string; hint: string; type: "href"; href: string; eventName?: string };

type QuickJumpOverlayProps = {
  onClose: () => void;
  onJumpToZone: (zoneId: ZoneId) => void;
  onOpenDemo: (demoId: DemoId) => void;
};

const actions: QuickAction[] = [
  { id: "resume", label: "Open Resume", hint: "Contact and resume CTA", type: "href", href: resumeHref, eventName: "resume_clicked" },
  { id: "contact", label: "Contact", hint: "Email Raqueed", type: "href", href: "mailto:raqueed@outlook.com", eventName: "contact_clicked" },
  { id: "firmware", label: "Firmware Lab", hint: "BLE, UART, DMA, cellular", type: "zone", zoneId: "firmware" },
  { id: "automation", label: "Automation Stack", hint: "Validation and infrastructure", type: "zone", zoneId: "automation" },
  { id: "ble", label: "BLE Scanner", hint: "Wireless discovery demo", type: "demo", demoId: "ble-scanner" },
  { id: "uart", label: "UART/DMA Visualizer", hint: "Embedded data path demo", type: "demo", demoId: "uart-dma" },
  { id: "mqtt", label: "MQTT Router", hint: "IoT packet route", type: "demo", demoId: "iot-router" },
  { id: "research", label: "Research Console", hint: "Cybersecurity research", type: "demo", demoId: "research-console" },
  { id: "photo", label: "Photography Gallery", hint: "Visual storytelling", type: "demo", demoId: "photography-gallery" },
  { id: "layercade", label: "Layercade Showcase", hint: "Creative tech products", type: "demo", demoId: "layercade-showcase" },
  { id: "classic", label: "Classic Portfolio", hint: "Conventional portfolio page", type: "href", href: CLASSIC_PORTFOLIO_URL, eventName: "classic_portfolio_clicked" },
  { id: "tour", label: "Guided Tour", hint: "Recruiter story path", type: "demo", demoId: "guided-tour" },
];

export function QuickJumpOverlay({ onClose, onJumpToZone, onOpenDemo }: QuickJumpOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const visibleActions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return actions;
    }

    return actions.filter((action) => {
      return `${action.label} ${action.hint}`.toLowerCase().includes(normalized);
    });
  }, [query]);

  const runAction = (action: QuickAction) => {
    if (action.type === "demo") {
      trackPortfolioEvent("demo_opened", { demo: action.demoId, source: "quick_jump" });
      onOpenDemo(action.demoId);
      return;
    }

    if (action.type === "zone") {
      onJumpToZone(action.zoneId);
      return;
    }

    if (action.eventName) {
      trackPortfolioEvent(action.eventName, { source: "quick_jump" });
    }
    window.location.assign(action.href);
  };

  return (
    <div aria-labelledby="quick-jump-title" aria-modal="true" className={styles.modalBackdrop} role="dialog">
      <section className={`${styles.modalCard} ${styles.quickJumpCard}`}>
        <div className={styles.modalHeader}>
          <p>Quick Jump</p>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <h2 id="quick-jump-title">Search portfolio actions</h2>
        <input
          aria-label="Search portfolio actions"
          className={styles.quickJumpInput}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search projects, demos, contact..."
          ref={inputRef}
          value={query}
        />
        <div className={styles.quickActionList}>
          {visibleActions.map((action) => (
            <button key={action.id} type="button" onClick={() => runAction(action)}>
              <span>{action.label}</span>
              <small>{action.hint}</small>
            </button>
          ))}
          {visibleActions.length === 0 ? <p>No matching actions.</p> : null}
        </div>
      </section>
    </div>
  );
}
