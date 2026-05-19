import type { Hotspot } from "@/types/game";

export const CLASSIC_PORTFOLIO_URL = "https://www.raqueed.com";

export const resumeHref = `${CLASSIC_PORTFOLIO_URL}/#contact`;

export const recruiterLinks = [
  { label: "Classic Portfolio", href: CLASSIC_PORTFOLIO_URL },
  { label: "Download Resume", href: resumeHref },
  { label: "Projects", href: `${CLASSIC_PORTFOLIO_URL}/#work` },
  { label: "Skills", href: `${CLASSIC_PORTFOLIO_URL}/#stack` },
  { label: "Publications", href: `${CLASSIC_PORTFOLIO_URL}/#research` },
  { label: "Contact", href: "mailto:raqueed@outlook.com" },
] as const;

export const gameHotspots: Hotspot[] = [
  {
    id: "gaming-setup",
    zoneId: "gaming",
    objectName: "Gaming + Dev Setup",
    title: "Gaming + Dev Setup",
    summary:
      "A creative workstation for firmware development, portfolio building, photography editing, 3D print design, and gaming.",
    highlights: [
      "High-performance workstation for embedded development and creative work",
      "Used for coding, debugging, design, editing, and portfolio experiments",
      "Blends engineering productivity with creative exploration",
    ],
    ctaLabel: "Open Classic Portfolio",
    ctaHref: CLASSIC_PORTFOLIO_URL,
    position: { x: 82, y: 112 },
    size: { width: 326, height: 192 },
    accent: "#63f7d4",
  },
  {
    id: "firmware-lab",
    zoneId: "firmware",
    objectName: "Firmware Lab",
    title: "Firmware Lab",
    summary:
      "Embedded firmware work across BLE, cellular, UART passthrough, state machines, and hardware validation.",
    highlights: [
      "STM32 WBA55 BLE platform work",
      "DMA-based UART passthrough and test firmware",
      "Cellular module AT-command workflows",
      "Embedded state-machine architecture",
    ],
    ctaLabel: "View Projects",
    ctaHref: `${CLASSIC_PORTFOLIO_URL}/#work`,
    position: { x: 532, y: 120 },
    size: { width: 256, height: 182 },
    accent: "#ffbd6b",
  },
  {
    id: "automation-stack",
    zoneId: "automation",
    objectName: "Automation Stack",
    title: "Automation + Server Stack",
    summary:
      "Automation and home-lab style systems used to validate firmware, manage media services, and experiment with infrastructure.",
    highlights: [
      "Python/PyTest firmware automation",
      "Jenkins-based test execution",
      "Dockerized services and server workflows",
      "Structured validation reports",
    ],
    ctaLabel: "View Validation Work",
    ctaHref: `${CLASSIC_PORTFOLIO_URL}/#work`,
    position: { x: 918, y: 112 },
    size: { width: 300, height: 202 },
    accent: "#7ee2d1",
  },
  {
    id: "bookshelf",
    zoneId: "research",
    objectName: "Research Shelf",
    title: "Publications & Research",
    summary:
      "Cybersecurity and machine learning research focused on power systems, smart inverters, ransomware detection, and firmware malware analysis.",
    highlights: [
      "Published research on ransomware detection in digital substations",
      "Worked on firmware malware detection for smart inverters",
      "Built AI-based detection workflows using machine learning",
      "Graduate research background in cyber-physical systems",
    ],
    ctaLabel: "Open Publications",
    ctaHref: `${CLASSIC_PORTFOLIO_URL}/#research`,
    position: { x: 72, y: 440 },
    size: { width: 214, height: 150 },
    accent: "#dd9cff",
  },
  {
    id: "photography-corner",
    zoneId: "photography",
    objectName: "Photography Corner",
    title: "Photography + Visual Storytelling",
    summary:
      "Street, portrait, product, and cinematic visual work focused on mood, composition, and storytelling.",
    highlights: [
      "Fujifilm-based photography workflow",
      "Product photography and short-form video concepts",
      "Cinematic visual direction",
      "Creative storytelling through images",
    ],
    ctaLabel: "Open Creative Work",
    ctaHref: `${CLASSIC_PORTFOLIO_URL}/#hobbies`,
    position: { x: 390, y: 434 },
    size: { width: 218, height: 164 },
    accent: "#f4d35e",
  },
  {
    id: "layercade-workshop",
    zoneId: "layercade",
    objectName: "Layercade Workshop",
    title: "Layercade Workshop",
    summary:
      "A creative 3D printing space for dioramas, desk accessories, keycaps, display pieces, and product experiments.",
    highlights: [
      "1/64 car display dioramas",
      "Gamer-focused desk accessories",
      "Product photography and launch marketing",
      "Premium futuristic/cyberpunk brand direction",
    ],
    ctaLabel: "Explore Creative Work",
    ctaHref: `${CLASSIC_PORTFOLIO_URL}/#hobbies`,
    position: { x: 716, y: 428 },
    size: { width: 234, height: 178 },
    accent: "#ff7a90",
  },
  {
    id: "terminal-desk",
    zoneId: "contact",
    objectName: "Resume Terminal",
    title: "Contact / Resume",
    summary:
      "Quick access to resume, contact links, GitHub, LinkedIn, and the classic portfolio experience.",
    highlights: [
      "Embedded firmware and IoT engineer",
      "Experience with BLE, cellular, Python automation, C/C++, AWS, and Jenkins",
      "Research background in cybersecurity and machine learning",
      "Creative technical portfolio with hardware and software projects",
    ],
    ctaLabel: "Contact Me",
    ctaHref: "mailto:raqueed@outlook.com",
    position: { x: 1058, y: 448 },
    size: { width: 184, height: 138 },
    accent: "#86f7b9",
  },
];
