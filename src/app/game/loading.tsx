import styles from "@/components/game/PixelGame.module.css";

export default function GameLoading() {
  return (
    <main className={styles.gamePage}>
      <section className={styles.loadingPanel} aria-live="polite">
        <p className={styles.kicker}>Loading</p>
        <h1>Booting Raqueed&apos;s Engineering Lab</h1>
        <div className={styles.pixelLoader} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
    </main>
  );
}
