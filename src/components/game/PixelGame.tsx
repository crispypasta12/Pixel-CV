"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gameHotspots } from "@/data/gameHotspots";
import { gameNPCs } from "@/data/gameNPCs";
import { gameZones, WORLD_HEIGHT, WORLD_WIDTH } from "@/data/gameZones";
import type { Direction, GameNpc, Hotspot, Point, ZoneId } from "@/types/game";
import { AchievementToast } from "./AchievementToast";
import { DialogBox } from "./DialogBox";
import { GameWorld } from "./GameWorld";
import { HotspotObject } from "./HotspotObject";
import { InteractionModal } from "./InteractionModal";
import { NPC } from "./NPC";
import { OnboardingDialog } from "./OnboardingDialog";
import { Player } from "./Player";
import { RecruiterOverlay } from "./RecruiterOverlay";
import { ZoneIndicator } from "./ZoneIndicator";
import styles from "./PixelGame.module.css";

const PLAYER_WIDTH = 34;
const PLAYER_HEIGHT = 46;
const PLAYER_SPEED = 182;
const INSPECT_DISTANCE = 94;
const NPC_TALK_DISTANCE = 82;
const BOUNDS = {
  minX: 28,
  minY: 250,
  maxX: WORLD_WIDTH - PLAYER_WIDTH - 28,
  maxY: WORLD_HEIGHT - PLAYER_HEIGHT - 24,
};

const achievementsByZone: Partial<Record<ZoneId, string>> = {
  gaming: "Creative Technologist",
  firmware: "Firmware Explorer",
  automation: "Automation Architect",
  research: "Research Mode",
  photography: "Visual Storyteller",
  layercade: "Layercade Maker",
};

const movementKeys: Record<string, Point> = {
  ArrowUp: { x: 0, y: -1 },
  w: { x: 0, y: -1 },
  W: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  s: { x: 0, y: 1 },
  S: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  a: { x: -1, y: 0 },
  A: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  d: { x: 1, y: 0 },
  D: { x: 1, y: 0 },
};

export function PixelGame() {
  const [position, setPosition] = useState<Point>({ x: 236, y: 390 });
  const [direction, setDirection] = useState<Direction>("down");
  const [moving, setMoving] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [selectedNpc, setSelectedNpc] = useState<GameNpc | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showRecruiter, setShowRecruiter] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [visitedZones, setVisitedZones] = useState<Set<ZoneId>>(() => new Set(["gaming"]));
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(
    () => new Set(),
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const keysPressed = useRef<Set<string>>(new Set());
  const positionRef = useRef(position);
  const movingRef = useRef(moving);
  const animationRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const currentZone = useMemo(() => getCurrentZone(position), [position]);

  const markZoneVisited = useCallback((zoneId: ZoneId) => {
    setVisitedZones((previous) => {
      if (previous.has(zoneId)) {
        return previous;
      }

      const next = new Set(previous);
      next.add(zoneId);
      return next;
    });
  }, []);

  const showAchievement = useCallback(
    (zoneId: ZoneId) => {
      const achievement = achievementsByZone[zoneId];
      if (!achievement || unlockedAchievements.has(achievement)) {
        return;
      }

      setUnlockedAchievements((previous) => {
        if (previous.has(achievement)) {
          return previous;
        }

        const next = new Set(previous);
        next.add(achievement);
        return next;
      });

      setToastMessage(achievement);
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
      toastTimerRef.current = window.setTimeout(() => setToastMessage(null), 3200);
    },
    [unlockedAchievements],
  );

  const updateMoving = useCallback((isMoving: boolean) => {
    if (movingRef.current !== isMoving) {
      movingRef.current = isMoving;
      setMoving(isMoving);
    }
  }, []);

  const activeHotspot = useMemo(
    () => getNearestHotspot(position, gameHotspots),
    [position],
  );

  const activeNpc = useMemo(() => getNearestNpc(position, gameNPCs), [position]);

  const inspectActiveTarget = useCallback(() => {
    if (activeNpc) {
      showAchievement(activeNpc.zoneId);
      setSelectedNpc(activeNpc);
      return;
    }

    if (activeHotspot) {
      showAchievement(activeHotspot.zoneId);
      setSelectedHotspot(activeHotspot);
    }
  }, [activeHotspot, activeNpc, showAchievement]);

  const inspectHotspot = useCallback(
    (hotspot: Hotspot) => {
      showAchievement(hotspot.zoneId);
      setSelectedHotspot(hotspot);
    },
    [showAchievement],
  );

  const talkToNpc = useCallback(
    (npc: GameNpc) => {
      showAchievement(npc.zoneId);
      setSelectedNpc(npc);
    },
    [showAchievement],
  );

  const closeTopLayer = useCallback(() => {
    if (selectedNpc) {
      setSelectedNpc(null);
      return;
    }
    if (selectedHotspot) {
      setSelectedHotspot(null);
      return;
    }
    if (showRecruiter) {
      setShowRecruiter(false);
      return;
    }
    if (showWelcome) {
      setShowWelcome(false);
    }
  }, [selectedHotspot, selectedNpc, showRecruiter, showWelcome]);

  const jumpToZone = useCallback(
    (zoneId: ZoneId) => {
      const zone = gameZones.find((candidate) => candidate.id === zoneId);
      if (!zone) {
        return;
      }

      keysPressed.current.clear();
      setShowRecruiter(false);
      setTransitioning(true);
      window.setTimeout(() => {
        positionRef.current = zone.jumpPosition;
        setPosition(zone.jumpPosition);
        setDirection("down");
        markZoneVisited(zone.id);
        showAchievement(zone.id);
        window.setTimeout(() => setTransitioning(false), 180);
      }, 160);
    },
    [markZoneVisited, showAchievement],
  );

  useEffect(() => {
    const isInteractiveTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) {
        return false;
      }

      return Boolean(target.closest("button, a, input, textarea, select, [contenteditable]"));
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeTopLayer();
        return;
      }

      if (showWelcome || selectedHotspot || selectedNpc || showRecruiter || transitioning) {
        return;
      }

      if (event.key === "e" || event.key === "E") {
        inspectActiveTarget();
        return;
      }

      if (movementKeys[event.key] && !isInteractiveTarget(event.target)) {
        event.preventDefault();
        keysPressed.current.add(event.key);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed.current.delete(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    closeTopLayer,
    inspectActiveTarget,
    selectedHotspot,
    selectedNpc,
    showRecruiter,
    showWelcome,
    transitioning,
  ]);

  useEffect(() => {
    const animate = (timestamp: number) => {
      const previous = lastFrameRef.current ?? timestamp;
      const deltaSeconds = Math.min((timestamp - previous) / 1000, 0.04);
      lastFrameRef.current = timestamp;

      if (!showWelcome && !selectedHotspot && !selectedNpc && !showRecruiter && !transitioning) {
        const vector = getMovementVector(keysPressed.current);
        const isMoving = vector.x !== 0 || vector.y !== 0;
        updateMoving(isMoving);

        if (isMoving) {
          const distance = PLAYER_SPEED * deltaSeconds;
          const nextPosition = {
            x: clamp(positionRef.current.x + vector.x * distance, BOUNDS.minX, BOUNDS.maxX),
            y: clamp(positionRef.current.y + vector.y * distance, BOUNDS.minY, BOUNDS.maxY),
          };

          positionRef.current = nextPosition;
          setPosition(nextPosition);
          markZoneVisited(getCurrentZone(nextPosition).id);
          setDirection(getDirection(vector));
        }
      } else {
        updateMoving(false);
        keysPressed.current.clear();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    markZoneVisited,
    selectedHotspot,
    selectedNpc,
    showRecruiter,
    showWelcome,
    transitioning,
    updateMoving,
  ]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const nudge = (x: number, y: number) => {
    keysPressed.current.clear();
    const nextPosition = {
      x: clamp(positionRef.current.x + x, BOUNDS.minX, BOUNDS.maxX),
      y: clamp(positionRef.current.y + y, BOUNDS.minY, BOUNDS.maxY),
    };
    positionRef.current = nextPosition;
    setPosition(nextPosition);
    markZoneVisited(getCurrentZone(nextPosition).id);
    setDirection(getDirection({ x, y }));
    updateMoving(true);
    window.setTimeout(() => updateMoving(false), 160);
  };

  const promptText = activeNpc
    ? `Press E to talk to ${activeNpc.name}`
    : activeHotspot
      ? `Press E to inspect ${activeHotspot.objectName}`
      : null;

  return (
    <main className={styles.gamePage}>
      <RecruiterOverlay
        open={showRecruiter}
        zones={gameZones}
        onClose={() => setShowRecruiter(false)}
        onJumpToZone={jumpToZone}
        onOpen={() => setShowRecruiter(true)}
      />

      <section className={styles.headerBar} aria-label="Game portfolio header">
        <div>
          <p className={styles.kicker}>/game</p>
          <h1>Raqueed&apos;s Interactive Engineering Apartment</h1>
        </div>
        <p>
          Explore a cozy cyberpunk apartment for embedded firmware, automation,
          research, photography, 3D printing, and workstation storytelling.
        </p>
      </section>

      <section className={styles.gameShell} aria-label="Playable portfolio apartment">
        <div
          className={[
            styles.sceneFrame,
            transitioning ? styles.sceneTransitioning : null,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <GameWorld>
            <ZoneIndicator currentZone={currentZone} visitedZones={visitedZones} />

            {gameHotspots.map((hotspot) => (
              <HotspotObject
                active={activeHotspot?.id === hotspot.id && !activeNpc}
                hotspot={hotspot}
                key={hotspot.id}
                onInspect={inspectHotspot}
              />
            ))}

            {gameNPCs.map((npc) => (
              <NPC
                active={activeNpc?.id === npc.id}
                key={npc.id}
                npc={npc}
                onTalk={talkToNpc}
              />
            ))}

            <Player direction={direction} moving={moving} position={position} />

            {promptText && !selectedHotspot && !selectedNpc && !showWelcome && !showRecruiter ? (
              <div className={styles.inspectPrompt} role="status">
                <kbd>E</kbd> {promptText.replace("Press E ", "")}
              </div>
            ) : null}

            <AchievementToast message={toastMessage} />
          </GameWorld>
        </div>

        <aside className={styles.statusPanel} aria-label="Current apartment status">
          <div>
            <span>Controls</span>
            <p>WASD / Arrow Keys to move. E to inspect or talk. Esc closes panels.</p>
          </div>
          <div>
            <span>Current Zone</span>
            <p>{currentZone.label}: {currentZone.description}</p>
          </div>
          <div>
            <span>Nearby</span>
            <p>
              {activeNpc
                ? activeNpc.name
                : activeHotspot
                  ? activeHotspot.objectName
                  : "Walk near an object or helper"}
            </p>
          </div>
        </aside>

        <div className={styles.mobileControls} aria-label="Touch controls">
          <p>
            Touch controls are available, though the full pixel portfolio
            experience is best on desktop.
          </p>
          <div className={styles.touchGrid}>
            <button type="button" onClick={() => nudge(0, -38)} aria-label="Move up">
              ↑
            </button>
            <button type="button" onClick={() => nudge(-38, 0)} aria-label="Move left">
              ←
            </button>
            <button type="button" onClick={inspectActiveTarget} aria-label="Inspect nearby target">
              E
            </button>
            <button type="button" onClick={() => nudge(38, 0)} aria-label="Move right">
              →
            </button>
            <button type="button" onClick={() => nudge(0, 38)} aria-label="Move down">
              ↓
            </button>
          </div>
        </div>
      </section>

      {showWelcome ? <OnboardingDialog onClose={() => setShowWelcome(false)} /> : null}
      {selectedHotspot ? (
        <InteractionModal
          hotspot={selectedHotspot}
          onClose={() => setSelectedHotspot(null)}
        />
      ) : null}
      {selectedNpc ? <DialogBox npc={selectedNpc} onClose={() => setSelectedNpc(null)} /> : null}
    </main>
  );
}

function getMovementVector(keys: Set<string>) {
  const vector = { x: 0, y: 0 };

  keys.forEach((key) => {
    const movement = movementKeys[key];
    if (movement) {
      vector.x += movement.x;
      vector.y += movement.y;
    }
  });

  if (vector.x !== 0 && vector.y !== 0) {
    const normalizer = Math.SQRT1_2;
    vector.x *= normalizer;
    vector.y *= normalizer;
  }

  return vector;
}

function getDirection(vector: Point): Direction {
  if (Math.abs(vector.x) > Math.abs(vector.y)) {
    return vector.x > 0 ? "right" : "left";
  }

  return vector.y < 0 ? "up" : "down";
}

function getCurrentZone(position: Point) {
  const zone = gameZones.find(({ bounds }) => {
    return (
      position.x >= bounds.x &&
      position.x <= bounds.x + bounds.width &&
      position.y >= bounds.y &&
      position.y <= bounds.y + bounds.height
    );
  });

  return zone ?? gameZones[0];
}

function getNearestHotspot(position: Point, hotspots: Hotspot[]) {
  const playerCenter = {
    x: position.x + PLAYER_WIDTH / 2,
    y: position.y + PLAYER_HEIGHT / 2,
  };

  return (
    hotspots
      .map((hotspot) => {
        const center = {
          x: hotspot.position.x + hotspot.size.width / 2,
          y: hotspot.position.y + hotspot.size.height / 2,
        };
        const distance = Math.hypot(playerCenter.x - center.x, playerCenter.y - center.y);
        return { hotspot, distance };
      })
      .filter(({ distance }) => distance <= INSPECT_DISTANCE)
      .sort((a, b) => a.distance - b.distance)[0]?.hotspot ?? null
  );
}

function getNearestNpc(position: Point, npcs: GameNpc[]) {
  const playerCenter = {
    x: position.x + PLAYER_WIDTH / 2,
    y: position.y + PLAYER_HEIGHT / 2,
  };

  return (
    npcs
      .map((npc) => {
        const distance = Math.hypot(playerCenter.x - npc.position.x, playerCenter.y - npc.position.y);
        return { npc, distance };
      })
      .filter(({ distance }) => distance <= NPC_TALK_DISTANCE)
      .sort((a, b) => a.distance - b.distance)[0]?.npc ?? null
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
