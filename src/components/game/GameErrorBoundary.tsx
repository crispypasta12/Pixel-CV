"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import Link from "next/link";
import styles from "./PixelGame.module.css";

type GameErrorBoundaryProps = {
  children: ReactNode;
};

type GameErrorBoundaryState = {
  hasError: boolean;
};

export class GameErrorBoundary extends Component<GameErrorBoundaryProps, GameErrorBoundaryState> {
  state: GameErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[game-error-boundary]", error, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className={styles.gamePage}>
          <section className={styles.fallbackPanel}>
            <p className={styles.kicker}>Game fallback</p>
            <h1>Classic portfolio is still available.</h1>
            <p>
              The interactive lab could not render in this browser session. Use the conventional portfolio
              path while the game layer is unavailable.
            </p>
            <div className={styles.modalActions}>
              <Link className={styles.primaryCta} href="/">
                Classic Portfolio
              </Link>
              <button
                className={styles.secondaryCta}
                type="button"
                onClick={() => this.setState({ hasError: false })}
              >
                Try Game Again
              </button>
            </div>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
