import type { BLEDevice } from "@/types/game";
import { CLASSIC_PORTFOLIO_URL } from "./gameHotspots";

export const bleDevices: BLEDevice[] = [
  {
    id: "stm32-wba55-dev",
    name: "STM32_WBA55_DEV",
    rssi: -48,
    type: "Firmware",
    service: "Firmware Lab",
    description:
      "BLE development platform used for scan workflows, embedded state machines, and firmware experiments.",
    ctaLabel: "View related portfolio section",
    ctaHref: `${CLASSIC_PORTFOLIO_URL}/#work`,
  },
  {
    id: "cellular-bridge",
    name: "CELLULAR_BRIDGE",
    rssi: -60,
    type: "IoT",
    service: "IoT Gateway",
    description:
      "Represents cellular module communication, AT-command workflows, and cloud upload pipelines.",
    ctaLabel: "Open project card",
    ctaHref: `${CLASSIC_PORTFOLIO_URL}/#work`,
  },
  {
    id: "test-automation-node",
    name: "TEST_AUTOMATION_NODE",
    rssi: -55,
    type: "IoT",
    service: "Validation Runner",
    description:
      "Represents automated validation using Python, PyTest, Jenkins, and structured reporting.",
    ctaLabel: "View automation work",
    ctaHref: `${CLASSIC_PORTFOLIO_URL}/#work`,
  },
  {
    id: "research-beacon",
    name: "RESEARCH_BEACON",
    rssi: -72,
    type: "Research",
    service: "Research Console",
    description:
      "Represents cybersecurity and machine-learning research for firmware and power systems.",
    ctaLabel: "Open publications",
    ctaHref: `${CLASSIC_PORTFOLIO_URL}/#research`,
  },
  {
    id: "layercade-beacon",
    name: "LAYERCADE_BEACON",
    rssi: -69,
    type: "Creative",
    service: "Creative Workshop",
    description:
      "Represents 3D printing, product storytelling, and creative technical branding.",
    ctaLabel: "Explore Layercade",
    ctaHref: `${CLASSIC_PORTFOLIO_URL}/#hobbies`,
  },
];
