export type HotspotId =
  | "gaming-setup"
  | "firmware-lab"
  | "automation-stack"
  | "bookshelf"
  | "photography-corner"
  | "layercade-workshop"
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
