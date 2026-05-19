import { CLASSIC_PORTFOLIO_URL } from "@/data/gameHotspots";
import type { GameNpc } from "@/types/game";

export const gameNPCs: GameNpc[] = [
  {
    id: "firmware-bot",
    zoneId: "firmware",
    name: "Firmware Bot",
    role: "Signal helper",
    position: { x: 806, y: 358 },
    accent: "#ffbd6b",
    lines: [
      "BLE packets, UART traces, DMA transfers... this corner is where hardware starts talking.",
      "Raqueed works across embedded firmware, cellular modules, and test firmware workflows.",
      "The boards blink because the state machines are behaving. Usually.",
    ],
    ctaLabel: "Firmware Projects",
    ctaHref: `${CLASSIC_PORTFOLIO_URL}/#work`,
  },
  {
    id: "cloud-test-bot",
    zoneId: "automation",
    name: "Cloud/Test Bot",
    role: "Automation runner",
    position: { x: 1214, y: 356 },
    accent: "#7ee2d1",
    lines: [
      "Automation keeps the lab honest.",
      "Python, PyTest, Jenkins, and structured reports turn manual validation into repeatable systems.",
      "When firmware changes, repeatable checks make the debugging trail much cleaner.",
    ],
    ctaLabel: "Validation Work",
    ctaHref: `${CLASSIC_PORTFOLIO_URL}/#work`,
  },
  {
    id: "research-librarian",
    zoneId: "research",
    name: "Research Librarian",
    role: "Publication guide",
    position: { x: 286, y: 650 },
    accent: "#dd9cff",
    lines: [
      "Behind these books are research stories about cybersecurity, machine learning, and power systems.",
      "Publications are not just papers here. They are proof of deep technical investigation.",
      "The useful pattern is always the same: define the signal, test the assumption, explain the risk.",
    ],
    ctaLabel: "Read Publications",
    ctaHref: `${CLASSIC_PORTFOLIO_URL}/#research`,
  },
  {
    id: "creative-assistant",
    zoneId: "photography",
    name: "Creative Assistant",
    role: "Visual systems scout",
    position: { x: 640, y: 650 },
    accent: "#f4d35e",
    lines: [
      "Engineering is not the only thing in this apartment.",
      "Photography, 3D printing, and product storytelling give the portfolio its creative edge.",
      "The best technical work still needs framing, mood, and a little taste.",
    ],
    ctaLabel: "Creative Work",
    ctaHref: `${CLASSIC_PORTFOLIO_URL}/#hobbies`,
  },
];
