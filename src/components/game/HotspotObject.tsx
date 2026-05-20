"use client";

import type { CSSProperties } from "react";
import { WORLD_HEIGHT, WORLD_WIDTH } from "@/data/gameZones";
import type { Hotspot } from "@/types/game";
import styles from "./PixelGame.module.css";

type HotspotObjectProps = {
  hotspot: Hotspot;
  active: boolean;
  onInspect: (hotspot: Hotspot) => void;
};

export function HotspotObject({ hotspot, active, onInspect }: HotspotObjectProps) {
  return (
    <button
      aria-label={`${hotspot.objectName}: ${hotspot.title}`}
      className={[
        styles.hotspotObject,
        styles[hotspot.id],
        active ? styles.hotspotActive : null,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => onInspect(hotspot)}
      style={{
        left: `${(hotspot.position.x / WORLD_WIDTH) * 100}%`,
        top: `${(hotspot.position.y / WORLD_HEIGHT) * 100}%`,
        width: `${(hotspot.size.width / WORLD_WIDTH) * 100}%`,
        height: `${(hotspot.size.height / WORLD_HEIGHT) * 100}%`,
        "--accent": hotspot.accent,
      } as CSSProperties}
      type="button"
    >
      <span className={styles.objectLabel}>{hotspot.objectName}</span>
      {renderObject(hotspot.id)}
    </button>
  );
}

function renderObject(id: Hotspot["id"]) {
  switch (id) {
    case "gaming-setup":
      return (
        <>
          <span className={styles.setupDesk} />
          <span className={styles.ultrawideMonitor} />
          <span className={styles.monitorCode} />
          <span className={styles.monitorAura} />
          <span className={styles.rgbTower} />
          <span className={styles.towerLights} />
          <span className={styles.glowKeyboard} />
          <span className={styles.glowMouse} />
          <span className={styles.comfyChair} />
          <span className={styles.leftSpeaker} />
          <span className={styles.rightSpeaker} />
          <span className={styles.embeddedBoardA} />
          <span className={styles.embeddedBoardB} />
          <span className={styles.nowBuildingWidget} />
        </>
      );
    case "firmware-lab":
      return (
        <>
          <span className={styles.labBench} />
          <span className={styles.scopeBody} />
          <span className={styles.scopeWave} />
          <span className={styles.logicAnalyzer} />
          <span className={styles.uartCableA} />
          <span className={styles.uartCableB} />
          <span className={styles.stmBoardA} />
          <span className={styles.stmBoardB} />
          <span className={styles.blePulseA} />
          <span className={styles.blePulseB} />
        </>
      );
    case "ble-scanner-station":
      return (
        <>
          <span className={styles.scanStationBase} />
          <span className={styles.scanStationDish} />
          <span className={styles.scanStationPulse} />
        </>
      );
    case "uart-dma-visualizer":
      return (
        <>
          <span className={styles.routeStationBase} />
          <span className={styles.routeStationScreen} />
          <span className={styles.routeStationBytes} />
        </>
      );
    case "automation-stack":
      return (
        <>
          <span className={styles.serverRackBody} />
          <span className={styles.serverSlotA} />
          <span className={styles.serverSlotB} />
          <span className={styles.serverSlotC} />
          <span className={styles.serverLeds} />
          <span className={styles.dockerCubeA} />
          <span className={styles.dockerCubeB} />
          <span className={styles.jenkinsMonitor} />
          <span className={styles.packetTrail} />
        </>
      );
    case "iot-packet-router":
      return (
        <>
          <span className={styles.routerStationBase} />
          <span className={styles.routerStationNodes} />
          <span className={styles.routerStationPacket} />
        </>
      );
    case "bookshelf":
      return (
        <>
          <span className={styles.shelfFrame} />
          <span className={styles.shelfLineOne} />
          <span className={styles.shelfLineTwo} />
          <span className={styles.booksOne} />
          <span className={styles.booksTwo} />
          <span className={styles.booksThree} />
        </>
      );
    case "research-console":
      return (
        <>
          <span className={styles.researchConsoleBase} />
          <span className={styles.researchConsoleScreen} />
          <span className={styles.researchConsoleGlow} />
        </>
      );
    case "photography-corner":
      return (
        <>
          <span className={styles.cameraShelfBoard} />
          <span className={styles.cameraBody} />
          <span className={styles.cameraLens} />
          <span className={styles.photoFrameOne} />
          <span className={styles.photoFrameTwo} />
          <span className={styles.tripod} />
          <span className={styles.softbox} />
          <span className={styles.editingMonitor} />
        </>
      );
    case "photo-gallery-wall":
      return (
        <>
          <span className={styles.galleryWallFrameA} />
          <span className={styles.galleryWallFrameB} />
          <span className={styles.galleryWallFrameC} />
        </>
      );
    case "layercade-workshop":
      return (
        <>
          <span className={styles.printerFrame} />
          <span className={styles.printerBed} />
          <span className={styles.printerHead} />
          <span className={styles.printModel} />
          <span className={styles.spool} />
          <span className={styles.keycaps} />
          <span className={styles.carDiorama} />
          <span className={styles.printShelf} />
        </>
      );
    case "layercade-showcase":
      return (
        <>
          <span className={styles.showcaseShelf} />
          <span className={styles.showcaseItemA} />
          <span className={styles.showcaseItemB} />
          <span className={styles.showcaseItemC} />
        </>
      );
    case "terminal-desk":
      return (
        <>
          <span className={styles.terminalDesk} />
          <span className={styles.terminalScreen} />
          <span className={styles.terminalText} />
          <span className={styles.keyboard} />
          <span className={styles.mug} />
        </>
      );
  }
}
