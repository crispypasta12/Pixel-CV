import Link from "next/link";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <section className={styles.panel}>
        <p className={styles.kicker}>Phase 1 Prototype</p>
        <h1>Raqueed&apos;s Engineering Lab</h1>
        <p>
          A cozy pixel-art game hub for exploring embedded firmware projects,
          automation work, research, photography, Layercade, and contact links.
        </p>
        <div className={styles.actions}>
          <Link href="/game">Enter the Lab</Link>
          <a href="https://www.raqueed.com/">Classic Portfolio</a>
        </div>
      </section>
    </main>
  );
}
