"use client";

import { useMemo, useState } from "react";
import { galleryItems } from "@/data/galleryItems";
import type { GalleryItem } from "@/types/game";
import { SimulationModal } from "./SimulationModal";
import styles from "./PixelGame.module.css";

type PhotographyGalleryProps = {
  onClose: () => void;
  onVisit?: () => void;
};

const categories = ["All", "Street", "Portrait", "Product", "Cinematic"] as const;

export function PhotographyGallery({ onClose, onVisit }: PhotographyGalleryProps) {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem>(galleryItems[0]);

  const visibleItems = useMemo(() => {
    if (category === "All") {
      return galleryItems;
    }

    return galleryItems.filter((item) => item.category === category);
  }, [category]);

  const selectItem = (item: GalleryItem) => {
    setSelectedItem(item);
    onVisit?.();
  };

  return (
    <SimulationModal eyebrow="Photography" title="Gallery Wall" onClose={onClose}>
      <div className={styles.segmentedControl} aria-label="Photography category filter">
        {categories.map((item) => (
          <button
            aria-pressed={category === item}
            key={item}
            onClick={() => setCategory(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <div className={styles.galleryGrid}>
        {visibleItems.map((item, index) => (
          <button
            className={selectedItem.id === item.id ? styles.galleryItemSelected : undefined}
            key={item.id}
            onClick={() => selectItem(item)}
            type="button"
          >
            <span className={styles.photoPlaceholder} data-index={index} />
            <strong>{item.title}</strong>
            <small>{item.category}</small>
          </button>
        ))}
      </div>
      <article className={styles.detailPanel}>
        <p>{selectedItem.mood}</p>
        <h3>{selectedItem.title}</h3>
        <span>{selectedItem.caption}</span>
        {selectedItem.ctaHref ? <a href={selectedItem.ctaHref}>Open creative work</a> : null}
      </article>
    </SimulationModal>
  );
}
