"use client";

import Link from "next/link";
import styles from "@/components/game/PixelGame.module.css";

export default function GameError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className={styles.gamePage}>
      <section className={styles.fallbackPanel}>
        <p className={styles.kicker}>Game fallback</p>
        <h1>The interactive lab hit a rendering issue.</h1>
        <p>The classic portfolio route remains available, and you can retry the game without leaving this page.</p>
        <div className={styles.modalActions}>
          <Link className={styles.primaryCta} href="/">
            Classic Portfolio
          </Link>
          <button className={styles.secondaryCta} type="button" onClick={reset}>
            Retry Game
          </button>
        </div>
      </section>
    </main>
  );
}
