"use client";

import { recruiterLinks } from "@/data/portfolioHotspots";
import type { GameZone, ZoneId } from "@/types/game";
import styles from "./PixelGame.module.css";

type RecruiterOverlayProps = {
  open: boolean;
  zones: GameZone[];
  onClose: () => void;
  onJumpToZone: (zoneId: ZoneId) => void;
  onOpen: () => void;
};

export function RecruiterOverlay({
  open,
  zones,
  onClose,
  onJumpToZone,
  onOpen,
}: RecruiterOverlayProps) {
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
              professional sections from here.
            </p>
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
                <a key={link.label} href={link.href}>
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
