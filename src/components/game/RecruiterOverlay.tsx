"use client";

import { recruiterLinks } from "@/data/portfolioHotspots";
import { trackPortfolioEvent } from "@/lib/portfolioAnalytics";
import type { DemoId, GameZone, ZoneId } from "@/types/game";
import { ViewToggle } from "./ViewToggle";
import styles from "./PixelGame.module.css";

type RecruiterOverlayProps = {
  open: boolean;
  zones: GameZone[];
  onClose: () => void;
  onJumpToZone: (zoneId: ZoneId) => void;
  onOpen: () => void;
  onOpenDemo: (demoId: DemoId) => void;
};

export function RecruiterOverlay({
  open,
  zones,
  onClose,
  onJumpToZone,
  onOpen,
  onOpenDemo,
}: RecruiterOverlayProps) {
  const demoLinks: { label: string; demoId: DemoId }[] = [
    { label: "Start Recruiter Tour", demoId: "guided-tour" },
    { label: "Open Terminal", demoId: "terminal" },
    { label: "BLE Scanner Demo", demoId: "ble-scanner" },
    { label: "UART/DMA Visualizer", demoId: "uart-dma" },
    { label: "IoT Packet Router", demoId: "iot-router" },
    { label: "Research Console", demoId: "research-console" },
    { label: "Photography Gallery", demoId: "photography-gallery" },
    { label: "Layercade Showcase", demoId: "layercade-showcase" },
  ];

  return (
    <>
      <button className={styles.recruiterButton} type="button" onClick={onOpen}>
        Recruiter Mode
      </button>

      {open ? (
        <div
          aria-labelledby="recruiter-title"
          aria-modal="true"
          className={styles.recruiterBackdrop}
          role="dialog"
        >
          <section className={styles.recruiterPanel}>
            <div className={styles.modalHeader}>
              <p>Quick Navigation</p>
              <button type="button" onClick={onClose}>
                Close
              </button>
            </div>
            <h2 id="recruiter-title">Recruiter Mode</h2>
            <p>
              Explore the apartment with WASD and E, or jump straight to the
              professional sections from here. This is the non-game path for fast review.
            </p>
            <ViewToggle compact />
            <div className={styles.zoneJumpGrid} aria-label="Phase 3 demo shortcuts">
              {demoLinks.map((link) => (
                <button
                  key={link.demoId}
                  type="button"
                  onClick={() => {
                    trackPortfolioEvent("demo_opened", { demo: link.demoId, source: "recruiter_overlay" });
                    onOpenDemo(link.demoId);
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className={styles.zoneJumpGrid} aria-label="Zone jump buttons">
              {zones.map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => onJumpToZone(zone.id)}
                >
                  {zone.label}
                </button>
              ))}
            </div>
            <nav aria-label="Recruiter quick links" className={styles.recruiterLinks}>
              {recruiterLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    if (link.label === "Classic Portfolio") {
                      trackPortfolioEvent("classic_portfolio_clicked", { source: "recruiter_overlay" });
                    }
                    if (link.label === "Download Resume") {
                      trackPortfolioEvent("resume_clicked", { source: "recruiter_overlay" });
                    }
                    if (link.label === "Contact") {
                      trackPortfolioEvent("contact_clicked", { source: "recruiter_overlay" });
                    }
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </section>
        </div>
      ) : null}
    </>
  );
}
