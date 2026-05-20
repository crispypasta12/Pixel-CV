"use client";

import Link from "next/link";
import { trackPortfolioEvent } from "@/lib/portfolioAnalytics";
import styles from "./PixelGame.module.css";

type ViewToggleProps = {
  compact?: boolean;
};

export function ViewToggle({ compact = false }: ViewToggleProps) {
  return (
    <nav
      aria-label="Portfolio view switcher"
      className={[styles.viewToggle, compact ? styles.viewToggleCompact : null]
        .filter(Boolean)
        .join(" ")}
    >
      <Link
        href="/"
        onClick={() => trackPortfolioEvent("classic_portfolio_clicked", { source: "view_toggle" })}
      >
        Classic Portfolio
      </Link>
      <Link aria-current="page" href="/game">
        Game Portfolio
      </Link>
    </nav>
  );
}
