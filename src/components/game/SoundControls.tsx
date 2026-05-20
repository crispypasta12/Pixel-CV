"use client";

import styles from "./PixelGame.module.css";

type SoundControlsProps = {
  ambientEnabled: boolean;
  uiEnabled: boolean;
  volume: number;
  onAmbientChange: (enabled: boolean) => void;
  onUiChange: (enabled: boolean) => void;
  onVolumeChange: (volume: number) => void;
};

export function SoundControls({
  ambientEnabled,
  uiEnabled,
  volume,
  onAmbientChange,
  onUiChange,
  onVolumeChange,
}: SoundControlsProps) {
  return (
    <fieldset className={styles.soundControls}>
      <legend>Sound</legend>
      <label>
        <input
          checked={ambientEnabled}
          onChange={(event) => onAmbientChange(event.target.checked)}
          type="checkbox"
        />
        Ambient
      </label>
      <label>
        <input checked={uiEnabled} onChange={(event) => onUiChange(event.target.checked)} type="checkbox" />
        UI
      </label>
      <label className={styles.volumeControl}>
        <span>Volume</span>
        <input
          aria-label="Sound volume"
          max="100"
          min="0"
          onChange={(event) => onVolumeChange(Number(event.target.value))}
          type="range"
          value={volume}
        />
      </label>
    </fieldset>
  );
}
