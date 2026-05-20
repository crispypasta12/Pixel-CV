import type { GalleryItem } from "@/types/game";
import { CLASSIC_PORTFOLIO_URL } from "./gameHotspots";

export const galleryItems: GalleryItem[] = [
  {
    id: "rain-crossing",
    title: "Rain Crossing",
    category: "Street",
    caption: "Night street frame built around reflections, motion, and quiet city color.",
    mood: "neon / documentary",
    ctaHref: `${CLASSIC_PORTFOLIO_URL}/#hobbies`,
  },
  {
    id: "warm-portrait",
    title: "Warm Portrait",
    category: "Portrait",
    caption: "Soft directional light with a cinematic, low-contrast color grade.",
    mood: "intimate / warm",
    ctaHref: `${CLASSIC_PORTFOLIO_URL}/#hobbies`,
  },
  {
    id: "desk-object-study",
    title: "Desk Object Study",
    category: "Product",
    caption: "Small-object composition for product storytelling and maker-brand visuals.",
    mood: "clean / tactile",
    ctaHref: `${CLASSIC_PORTFOLIO_URL}/#hobbies`,
  },
  {
    id: "late-night-frame",
    title: "Late Night Frame",
    category: "Cinematic",
    caption: "A moody frame focused on contrast, atmosphere, and environmental story.",
    mood: "cinematic / quiet",
    ctaHref: `${CLASSIC_PORTFOLIO_URL}/#hobbies`,
  },
];
