export type HotspotId =
  | "gaming-setup"
  | "firmware-lab"
  | "ble-scanner-station"
  | "uart-dma-visualizer"
  | "automation-stack"
  | "iot-packet-router"
  | "bookshelf"
  | "research-console"
  | "photography-corner"
  | "photo-gallery-wall"
  | "layercade-workshop"
  | "layercade-showcase"
  | "terminal-desk";

export type ZoneId =
  | "gaming"
  | "firmware"
  | "automation"
  | "research"
  | "photography"
  | "layercade"
  | "contact";

export type NpcId =
  | "firmware-bot"
  | "cloud-test-bot"
  | "research-librarian"
  | "creative-assistant";

export type Point = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Direction = "down" | "up" | "left" | "right";

export type Hotspot = {
  id: HotspotId;
  zoneId: ZoneId;
  objectName: string;
  title: string;
  summary: string;
  highlights: string[];
  ctaLabel: string;
  ctaHref: string;
  position: Point;
  size: Size;
  accent: string;
};

export type GameZone = {
  id: ZoneId;
  label: string;
  description: string;
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  jumpPosition: Point;
  accent: string;
};

export type GameNpc = {
  id: NpcId;
  zoneId: ZoneId;
  name: string;
  role: string;
  position: Point;
  accent: string;
  lines: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export type DemoId =
  | "guided-tour"
  | "terminal"
  | "ble-scanner"
  | "uart-dma"
  | "iot-router"
  | "research-console"
  | "photography-gallery"
  | "layercade-showcase";

export type AchievementId =
  | "creative-technologist"
  | "firmware-explorer"
  | "automation-architect"
  | "research-mode"
  | "visual-storyteller"
  | "layercade-maker"
  | "ble-scanner-online"
  | "dma-path-verified"
  | "mqtt-publish-success"
  | "research-analyst"
  | "gallery-visitor"
  | "prototype-maker"
  | "guided-tour-complete";

export type TerminalCommand = {
  name: string;
  description: string;
  output: string[];
  cta?: {
    label: string;
    href: string;
  };
};

export type BLEDeviceType = "Firmware" | "IoT" | "Creative" | "Research";

export type BLEDevice = {
  id: string;
  name: string;
  rssi: number;
  type: BLEDeviceType;
  service: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export type PacketNode = {
  id: string;
  label: string;
  description: string;
};

export type PacketRoute = {
  id: string;
  title: string;
  nodes: PacketNode[];
  status: Record<string, string>;
  logs?: string[];
};

export type ResearchSimulation = {
  id: "firmware-malware" | "power-cybersecurity";
  title: string;
  explanation: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: "Street" | "Portrait" | "Product" | "Cinematic";
  caption: string;
  mood: string;
  ctaHref?: string;
};

export type ProductShowcaseItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  ctaHref?: string;
};
