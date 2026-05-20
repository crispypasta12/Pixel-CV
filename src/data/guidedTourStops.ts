import type { ZoneId } from "@/types/game";

export type GuidedTourStop = {
  zoneId: ZoneId;
  title: string;
  explanation: string;
  professionalValue: string;
  highlights: string[];
};

export const guidedTourStops: GuidedTourStop[] = [
  {
    zoneId: "gaming",
    title: "Who I Am",
    explanation:
      "Start at the workstation: the command center for firmware work, automation scripts, research writing, creative editing, and portfolio iteration.",
    professionalValue:
      "This section frames Raqueed as a hands-on engineer who can build technical systems and present them clearly.",
    highlights: [
      "Embedded systems, IoT, automation, research, and creative technology in one coherent portfolio",
      "Terminal and quick navigation paths for reviewers who want speed",
      "Classic portfolio remains one click away",
    ],
  },
  {
    zoneId: "firmware",
    title: "Firmware Lab",
    explanation:
      "The firmware lab shows the strongest embedded systems signal: BLE discovery, UART routing, DMA-backed buffering, and hardware validation thinking.",
    professionalValue:
      "Recruiters can quickly see comfort with low-level data movement, device communication, and debugging workflows.",
    highlights: [
      "BLE / STM32-style scanner demo",
      "UART/DMA passthrough visualizer",
      "Cellular module communication patterns",
    ],
  },
  {
    zoneId: "automation",
    title: "Automation Stack",
    explanation:
      "The automation area turns firmware validation, MQTT routing, server workflows, and repeatable test execution into visual flows.",
    professionalValue:
      "This shows the ability to move beyond one-off demos into repeatable engineering processes.",
    highlights: [
      "Python/PyTest validation mindset",
      "Jenkins and Docker-inspired automation",
      "MQTT publish path simulation",
    ],
  },
  {
    zoneId: "research",
    title: "Research/Publications",
    explanation:
      "The research console explains firmware malware detection and cyber-physical power system security in a portfolio-safe way.",
    professionalValue:
      "It connects embedded systems with security, ML-informed analysis, and technical writing.",
    highlights: [
      "Firmware feature visualization",
      "ML-inspired anomaly detection",
      "Power system cybersecurity themes",
    ],
  },
  {
    zoneId: "photography",
    title: "Creative Work: Photography",
    explanation:
      "The gallery connects technical polish with composition, lighting, editing, and visual storytelling.",
    professionalValue:
      "It adds communication range: the same portfolio can explain hardware, software, and creative product direction.",
    highlights: [
      "Street, portrait, product, and cinematic categories",
      "Gallery wall interaction",
      "Mood-driven creative direction",
    ],
  },
  {
    zoneId: "layercade",
    title: "Creative Work: Layercade",
    explanation:
      "The maker area presents 3D printing, small product ideas, physical prototyping, and creative technical branding.",
    professionalValue:
      "This section shows product instincts, iteration, visual branding, and the ability to build beyond the screen.",
    highlights: [
      "1/64 garage dioramas",
      "Keycaps and desk accessories",
      "Prototype print feedback",
    ],
  },
  {
    zoneId: "contact",
    title: "Contact/Resume",
    explanation:
      "The final station gives fast paths to the classic portfolio, resume route, projects, publications, and contact.",
    professionalValue:
      "The experience ends with conventional recruiter actions, so the memorable game layer never blocks the practical next step.",
    highlights: [
      "Recruiter-friendly shortcut overlay",
      "Classic portfolio remains available",
      "Email and resume CTAs",
    ],
  },
];
