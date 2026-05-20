import { CLASSIC_PORTFOLIO_URL } from "./portfolioHotspots";
import type { DemoId, ZoneId } from "@/types/game";

export type ImpactCard = {
  id: string;
  zoneId: ZoneId;
  title: string;
  problem: string;
  built: string;
  tech: string[];
  impact: string;
  ctaLabel: string;
  ctaHref?: string;
  demoId?: DemoId;
};

export const impactCards: ImpactCard[] = [
  {
    id: "ble-stm32",
    zoneId: "firmware",
    title: "BLE / STM32 Firmware",
    problem:
      "Embedded BLE work needs repeatable visibility into nearby devices, services, RSSI, and validation states.",
    built:
      "A portfolio-safe BLE scanner simulation connected to STM32-style firmware workflows and device inspection.",
    tech: ["STM32", "C/C++", "BLE", "GATT", "embedded debugging"],
    impact:
      "Makes low-level wireless work legible to technical reviewers without exposing private project details.",
    ctaLabel: "Open BLE Scanner",
    demoId: "ble-scanner",
  },
  {
    id: "uart-dma",
    zoneId: "firmware",
    title: "UART/DMA Passthrough Firmware",
    problem:
      "Testing BLE and cellular module communication required a reliable firmware bridge.",
    built:
      "A UART passthrough system with DMA-backed buffering and clear data forwarding paths.",
    tech: ["STM32", "C/C++", "UART", "DMA", "circular buffers", "embedded debugging"],
    impact:
      "Improved test visibility, repeatability, and validation speed.",
    ctaLabel: "Open UART/DMA Visualizer",
    demoId: "uart-dma",
  },
  {
    id: "cellular-mqtt",
    zoneId: "automation",
    title: "Cellular + MQTT / IoT Logging",
    problem:
      "Device telemetry needs a clear route from edge hardware through cellular transport into cloud-style logs.",
    built:
      "A visual packet router that shows BLE, cellular, MQTT, ingestion, retry, and dashboard stages.",
    tech: ["MQTT", "cellular modules", "AT commands", "AWS-style ingestion", "TypeScript"],
    impact:
      "Clarifies system architecture, failure points, and observability tradeoffs for IoT projects.",
    ctaLabel: "Open MQTT Router",
    demoId: "iot-router",
  },
  {
    id: "firmware-automation",
    zoneId: "automation",
    title: "Firmware Test Automation",
    problem:
      "Manual firmware checks are slow, inconsistent, and hard to scale across repeated hardware validation cycles.",
    built:
      "A Python and CI-inspired automation stack for test orchestration, logs, and validation feedback.",
    tech: ["Python", "PyTest", "Jenkins", "Docker", "serial tooling"],
    impact:
      "Shortens validation loops and turns device behavior into evidence that teams can review quickly.",
    ctaLabel: "Jump to Automation Stack",
  },
  {
    id: "cybersecurity-research",
    zoneId: "research",
    title: "Cybersecurity Research",
    problem:
      "Power systems and firmware security work can be difficult to communicate without interactive context.",
    built:
      "Research panels for firmware malware detection and cyber-physical anomaly detection concepts.",
    tech: ["machine learning", "firmware analysis", "power systems", "Python", "research writing"],
    impact:
      "Turns research themes into a concise reviewer-friendly explanation of methods and outcomes.",
    ctaLabel: "Open Research Console",
    demoId: "research-console",
  },
  {
    id: "layercade",
    zoneId: "layercade",
    title: "Layercade / Creative Tech",
    problem:
      "Physical product experiments need both technical prototyping and strong visual presentation.",
    built:
      "A maker showcase for 3D printed dioramas, keycaps, accessories, and product-stage storytelling.",
    tech: ["3D printing", "product design", "rapid prototyping", "visual branding"],
    impact:
      "Shows range beyond code: making, iteration, product thinking, and polished presentation.",
    ctaLabel: "Open Layercade Showcase",
    demoId: "layercade-showcase",
  },
  {
    id: "photography",
    zoneId: "photography",
    title: "Photography / Visual Storytelling",
    problem:
      "Engineering portfolios often miss the visual craft needed to make products and ideas memorable.",
    built:
      "A compact gallery for street, portrait, product, and cinematic visual work.",
    tech: ["photography", "composition", "lighting", "editing", "product storytelling"],
    impact:
      "Adds a creative dimension that supports communication, brand polish, and product presentation.",
    ctaLabel: "Open Photography Gallery",
    demoId: "photography-gallery",
  },
  {
    id: "contact",
    zoneId: "contact",
    title: "Resume / Contact",
    problem:
      "Recruiters need immediate access to the classic portfolio, resume path, and contact options.",
    built:
      "A non-game navigation layer with search, recruiter mode, guided tour, and direct CTAs.",
    tech: ["React", "Next.js", "TypeScript", "accessibility", "UX systems"],
    impact:
      "Keeps the game memorable while preserving fast, conventional portfolio navigation.",
    ctaLabel: "Open Classic Portfolio",
    ctaHref: CLASSIC_PORTFOLIO_URL,
  },
];
