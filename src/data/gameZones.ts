import type { GameZone } from "@/types/game";

export const WORLD_WIDTH = 1320;
export const WORLD_HEIGHT = 760;

export const gameZones: GameZone[] = [
  {
    id: "gaming",
    label: "Gaming Setup",
    description: "Cozy cyberpunk workstation and creative command center.",
    bounds: { x: 36, y: 52, width: 430, height: 356 },
    jumpPosition: { x: 236, y: 390 },
    accent: "#63f7d4",
  },
  {
    id: "firmware",
    label: "Firmware Lab",
    description: "Boards, traces, signals, and validation benches.",
    bounds: { x: 494, y: 52, width: 344, height: 356 },
    jumpPosition: { x: 642, y: 390 },
    accent: "#ffbd6b",
  },
  {
    id: "automation",
    label: "Automation Stack",
    description: "Home-lab servers, Jenkins, Docker, and reports.",
    bounds: { x: 866, y: 52, width: 418, height: 356 },
    jumpPosition: { x: 1038, y: 390 },
    accent: "#7ee2d1",
  },
  {
    id: "research",
    label: "Research / Publications",
    description: "Cybersecurity, ML, power systems, and technical writing.",
    bounds: { x: 36, y: 404, width: 300, height: 294 },
    jumpPosition: { x: 176, y: 674 },
    accent: "#dd9cff",
  },
  {
    id: "photography",
    label: "Photography",
    description: "Camera gear, framed stories, and cinematic edits.",
    bounds: { x: 364, y: 404, width: 282, height: 294 },
    jumpPosition: { x: 496, y: 674 },
    accent: "#f4d35e",
  },
  {
    id: "layercade",
    label: "Layercade",
    description: "3D printing, dioramas, keycaps, and product ideas.",
    bounds: { x: 674, y: 404, width: 318, height: 294 },
    jumpPosition: { x: 822, y: 674 },
    accent: "#ff7a90",
  },
  {
    id: "contact",
    label: "Contact / Resume",
    description: "Fast paths back to the classic portfolio and contact links.",
    bounds: { x: 1020, y: 404, width: 264, height: 294 },
    jumpPosition: { x: 1138, y: 674 },
    accent: "#86f7b9",
  },
];
