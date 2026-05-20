"use client";

import { useState } from "react";
import { layercadeProducts } from "@/data/layercadeProducts";
import { SimulationModal } from "./SimulationModal";
import styles from "./PixelGame.module.css";

type LayercadeShowcaseProps = {
  onClose: () => void;
  onStartPrint?: () => void;
};

export function LayercadeShowcase({ onClose, onStartPrint }: LayercadeShowcaseProps) {
  const [printing, setPrinting] = useState(false);

  const startPrint = () => {
    setPrinting(true);
    onStartPrint?.();
    window.setTimeout(() => setPrinting(false), 2200);
  };

  return (
    <SimulationModal eyebrow="Layercade Workshop" title="Product Showcase" onClose={onClose}>
      <div className={styles.layercadeHero}>
        <div className={[styles.printerPreview, printing ? styles.printerPreviewActive : null].filter(Boolean).join(" ")}>
          <span className={styles.previewPrinterHead} />
          <span className={styles.previewPrintBed} />
          <span className={styles.previewPrintModel} />
        </div>
        <div>
          <p>
            Small product concepts combining 3D printing, display design, and polished technical branding.
          </p>
          <button type="button" onClick={startPrint}>
            Start Print
          </button>
        </div>
      </div>
      <div className={styles.productGrid}>
        {layercadeProducts.map((product) => (
          <article key={product.id}>
            <span className={styles.productVisual} />
            <p>{product.category}</p>
            <h3>{product.title}</h3>
            <span>{product.description}</span>
            {product.ctaHref ? <a href={product.ctaHref}>View Layercade</a> : null}
          </article>
        ))}
      </div>
    </SimulationModal>
  );
}
