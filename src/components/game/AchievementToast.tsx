"use client";

import styles from "./PixelGame.module.css";

type AchievementToastProps = {
  message: string | null;
};

export function AchievementToast({ message }: AchievementToastProps) {
  if (!message) {
    return null;
  }

  return (
    <div className={styles.achievementToast} role="status" aria-live="polite">
      <span>Achievement Unlocked</span>
      <strong>{message}</strong>
    </div>
  );
}
