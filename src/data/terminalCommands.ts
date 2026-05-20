import type { TerminalCommand } from "@/types/game";
import { CLASSIC_PORTFOLIO_URL, resumeHref } from "./gameHotspots";

export const terminalCommandNames = [
  "help",
  "about",
  "skills",
  "projects",
  "resume",
  "contact",
  "scan_ble",
  "uart_status",
  "dma_status",
  "mqtt_status",
  "publications",
  "clear",
  "exit",
] as const;

export const terminalCommands: Record<string, TerminalCommand> = {
  help: {
    name: "help",
    description: "List supported simulated commands.",
    output: [
      "Available commands:",
      terminalCommandNames.join(", "),
    ],
  },
  about: {
    name: "about",
    description: "Show portfolio summary.",
    output: [
      "Raqueed is an embedded firmware and IoT engineer focused on BLE, cellular, test automation, and cyber-physical security research.",
    ],
  },
  skills: {
    name: "skills",
    description: "Show technical stack.",
    output: [
      "C/C++, Python, TypeScript, BLE, STM32, UART, DMA, MQTT, AWS IoT, Jenkins, PyTest, embedded state machines, test automation.",
    ],
  },
  projects: {
    name: "projects",
    description: "Open project section.",
    output: [
      "Portfolio projects: embedded firmware workflows, BLE scanning, cellular bridge concepts, automation reports, and creative technical systems.",
      "CTA: Open the projects section from the classic portfolio.",
    ],
    cta: { label: "Open Projects", href: `${CLASSIC_PORTFOLIO_URL}/#work` },
  },
  resume: {
    name: "resume",
    description: "Open resume/contact path.",
    output: [
      "Resume route staged. Use the CTA to open the resume/contact section.",
    ],
    cta: { label: "Open Resume", href: resumeHref },
  },
  contact: {
    name: "contact",
    description: "Show contact link.",
    output: [
      "Email: raqueed@outlook.com",
      "Classic portfolio contact section is available through the CTA.",
    ],
    cta: { label: "Contact", href: "mailto:raqueed@outlook.com" },
  },
  scan_ble: {
    name: "scan_ble",
    description: "Run a simulated BLE scan.",
    output: [
      "Starting simulated BLE scan...",
      "STM32_WBA55_DEV | RSSI -48 dBm | Service: Firmware Lab",
      "CELL_BRIDGE_NODE | RSSI -62 dBm | Service: IoT Gateway",
      "LAYERCADE_BEACON | RSSI -70 dBm | Service: Creative Workshop",
      "Scan complete. No live radio hardware was accessed.",
    ],
  },
  uart_status: {
    name: "uart_status",
    description: "Show simulated UART state.",
    output: [
      "USART2: ACTIVE",
      "LPUART1: ACTIVE",
      "DMA RX CHANNELS: LINKED-LIST CIRCULAR MODE",
      "BUFFER HEALTH: OK",
      "PACKETS DROPPED: 0",
    ],
  },
  dma_status: {
    name: "dma_status",
    description: "Show simulated DMA state.",
    output: [
      "GPDMA: ENABLED",
      "RX PATH: PERIPHERAL -> MEMORY",
      "TX PATH: MEMORY -> PERIPHERAL",
      "MODE: CIRCULAR / STREAMING",
      "STATUS: NOMINAL",
    ],
  },
  mqtt_status: {
    name: "mqtt_status",
    description: "Show simulated MQTT state.",
    output: [
      "TOOL NODE: ONLINE",
      "CELLULAR MODULE: READY",
      "AWS IOT ENDPOINT: CONNECTED",
      "UPLOAD QUEUE: EMPTY",
      "LAST PUBLISH: SUCCESS",
    ],
  },
  publications: {
    name: "publications",
    description: "Open publication section.",
    output: [
      "Research themes: firmware malware detection, power system cybersecurity, ML-based anomaly detection, and cyber-physical resilience.",
    ],
    cta: { label: "Open Publications", href: `${CLASSIC_PORTFOLIO_URL}/#research` },
  },
};
