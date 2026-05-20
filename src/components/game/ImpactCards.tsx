"use client";

import { impactCards } from "@/data/impactCards";
import type { DemoId, ZoneId } from "@/types/game";
import { trackPortfolioEvent } from "@/lib/portfolioAnalytics";
import styles from "./PixelGame.module.css";

type ImpactCardsProps = {
  onJumpToZone: (zoneId: ZoneId) => void;
  onOpenDemo: (demoId: DemoId) => void;
};

export function ImpactCards({ onJumpToZone, onOpenDemo }: ImpactCardsProps) {
  return (
    <section className={styles.impactSection} aria-labelledby="impact-title">
      <div className={styles.sectionHeader}>
        <p className={styles.kicker}>Recruiter summary</p>
        <h2 id="impact-title">Portfolio Impact Cards</h2>
      </div>
      <div className={styles.impactGrid}>
        {impactCards.map((card) => (
          <article className={styles.impactCard} key={card.id}>
            <p>{card.title}</p>
            <dl>
              <div>
                <dt>Problem</dt>
                <dd>{card.problem}</dd>
              </div>
              <div>
                <dt>What I Built</dt>
                <dd>{card.built}</dd>
              </div>
              <div>
                <dt>Tech Used</dt>
                <dd>{card.tech.join(", ")}</dd>
              </div>
              <div>
                <dt>Impact</dt>
                <dd>{card.impact}</dd>
              </div>
            </dl>
            {card.demoId ? (
              <DemoImpactButton
                ctaLabel={card.ctaLabel}
                demoId={card.demoId}
                onOpenDemo={onOpenDemo}
              />
            ) : card.ctaHref ? (
              <a
                href={card.ctaHref}
                onClick={() => {
                  if (card.id === "contact") {
                    trackPortfolioEvent("classic_portfolio_clicked", { source: "impact_card" });
                  }
                }}
              >
                {card.ctaLabel}
              </a>
            ) : (
              <button type="button" onClick={() => onJumpToZone(card.zoneId)}>
                {card.ctaLabel}
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function DemoImpactButton({
  ctaLabel,
  demoId,
  onOpenDemo,
}: {
  ctaLabel: string;
  demoId: DemoId;
  onOpenDemo: (demoId: DemoId) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        trackPortfolioEvent("demo_opened", { demo: demoId, source: "impact_card" });
        onOpenDemo(demoId);
      }}
    >
      {ctaLabel}
    </button>
  );
}
