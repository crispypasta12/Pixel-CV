"use client";

import { SimulationModal } from "./SimulationModal";
import { TerminalWindow } from "./TerminalWindow";

type GameTerminalProps = {
  onClose: () => void;
  onCommandAchievement?: (command: string) => void;
};

export function GameTerminal({ onClose, onCommandAchievement }: GameTerminalProps) {
  return (
    <SimulationModal eyebrow="Local Simulation" title="Engineering Terminal" onClose={onClose}>
      <TerminalWindow onClose={onClose} onCommandAchievement={onCommandAchievement} />
    </SimulationModal>
  );
}
