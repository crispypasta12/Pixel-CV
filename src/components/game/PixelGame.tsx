"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gameHotspots } from "@/data/gameHotspots";
import { gameNPCs } from "@/data/gameNPCs";
import { gameZones, WORLD_HEIGHT, WORLD_WIDTH } from "@/data/gameZones";
import { trackPortfolioEvent } from "@/lib/portfolioAnalytics";
import type {
  AchievementId,
  DemoId,
  Direction,
  GameNpc,
  Hotspot,
  HotspotId,
  Point,
  ZoneId,
} from "@/types/game";
import { AboutExperienceModal } from "./AboutExperienceModal";
import { AchievementToast } from "./AchievementToast";
import { CinematicIntro } from "./CinematicIntro";
import { DialogBox } from "./DialogBox";
import { GameWorld } from "./GameWorld";
import { GuidedTour } from "./GuidedTour";
import { HelpOverlay } from "./HelpOverlay";
import { HotspotObject } from "./HotspotObject";
import { ImpactCards } from "./ImpactCards";
import { InteractionModal } from "./InteractionModal";
import { NPC } from "./NPC";
import { OnboardingDialog } from "./OnboardingDialog";
import { PhotographyGallery } from "./PhotographyGallery";
import { Player } from "./Player";
import { QuickJumpOverlay } from "./QuickJumpOverlay";
import { RecruiterOverlay } from "./RecruiterOverlay";
import { SoundControls } from "./SoundControls";
import { ViewToggle } from "./ViewToggle";
import { WorldFeedback } from "./WorldFeedback";
import { ZoneIndicator } from "./ZoneIndicator";
import styles from "./PixelGame.module.css";

const BLEScannerDemo = dynamic(
  () => import("./BLEScannerDemo").then((module) => module.BLEScannerDemo),
  { loading: DemoLoading },
);
const GameTerminal = dynamic(
  () => import("./GameTerminal").then((module) => module.GameTerminal),
  { loading: DemoLoading },
);
const IoTPacketRouter = dynamic(
  () => import("./IoTPacketRouter").then((module) => module.IoTPacketRouter),
  { loading: DemoLoading },
);
const LayercadeShowcase = dynamic(
  () => import("./LayercadeShowcase").then((module) => module.LayercadeShowcase),
  { loading: DemoLoading },
);
const ResearchConsole = dynamic(
  () => import("./ResearchConsole").then((module) => module.ResearchConsole),
  { loading: DemoLoading },
);
const UartDmaVisualizer = dynamic(
  () => import("./UartDmaVisualizer").then((module) => module.UartDmaVisualizer),
  { loading: DemoLoading },
);

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

const achievementsByZone: Partial<Record<ZoneId, { id: AchievementId; label: string }>> = {
  gaming: { id: "creative-technologist", label: "Creative Technologist" },
  firmware: { id: "firmware-explorer", label: "Firmware Explorer" },
  automation: { id: "automation-architect", label: "Automation Architect" },
  research: { id: "research-mode", label: "Research Mode" },
  photography: { id: "visual-storyteller", label: "Visual Storyteller" },
  layercade: { id: "layercade-maker", label: "Layercade Maker" },
};

const demoAchievements: Partial<Record<DemoId, { id: AchievementId; label: string }>> = {
  "guided-tour": { id: "guided-tour-complete", label: "Guided Tour Complete" },
  "ble-scanner": { id: "ble-scanner-online", label: "BLE Scanner Online" },
  "uart-dma": { id: "dma-path-verified", label: "DMA Path Verified" },
  "iot-router": { id: "mqtt-publish-success", label: "MQTT Publish Success" },
  "research-console": { id: "research-analyst", label: "Research Analyst" },
  "photography-gallery": { id: "gallery-visitor", label: "Gallery Visitor" },
  "layercade-showcase": { id: "prototype-maker", label: "Prototype Maker" },
};

const demoHotspots: Partial<Record<HotspotId, DemoId>> = {
  "ble-scanner-station": "ble-scanner",
  "uart-dma-visualizer": "uart-dma",
  "iot-packet-router": "iot-router",
  "research-console": "research-console",
  "photo-gallery-wall": "photography-gallery",
  "layercade-showcase": "layercade-showcase",
  "terminal-desk": "terminal",
};

const demoHashes: Partial<Record<DemoId, string>> = {
  "guided-tour": "guided-tour",
  "ble-scanner": "ble-scanner",
  "uart-dma": "uart-dma",
  "iot-router": "mqtt-router",
  "research-console": "research",
  "photography-gallery": "photography",
  "layercade-showcase": "layercade",
  terminal: "contact",
};

const hashTargets: Record<
  string,
  { type: "demo"; demoId: DemoId } | { type: "zone"; zoneId: ZoneId }
> = {
  "firmware-lab": { type: "zone", zoneId: "firmware" },
  firmware: { type: "zone", zoneId: "firmware" },
  "automation-stack": { type: "zone", zoneId: "automation" },
  automation: { type: "zone", zoneId: "automation" },
  "ble-scanner": { type: "demo", demoId: "ble-scanner" },
  "uart-dma": { type: "demo", demoId: "uart-dma" },
  "mqtt-router": { type: "demo", demoId: "iot-router" },
  "iot-packet-routing": { type: "demo", demoId: "iot-router" },
  research: { type: "demo", demoId: "research-console" },
  "research-console": { type: "demo", demoId: "research-console" },
  photography: { type: "demo", demoId: "photography-gallery" },
  layercade: { type: "demo", demoId: "layercade-showcase" },
  contact: { type: "zone", zoneId: "contact" },
  "guided-tour": { type: "demo", demoId: "guided-tour" },
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
  const [introReady, setIntroReady] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showQuickJump, setShowQuickJump] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [ambientSoundEnabled, setAmbientSoundEnabled] = useState(false);
  const [uiSoundEnabled, setUiSoundEnabled] = useState(false);
  const [soundVolume, setSoundVolume] = useState(35);
  const [activeDemo, setActiveDemo] = useState<DemoId | null>(null);
  const [worldEffects, setWorldEffects] = useState<Set<DemoId>>(() => new Set());
  const [transitioning, setTransitioning] = useState(false);
  const [visitedZones, setVisitedZones] = useState<Set<ZoneId>>(() => new Set(["gaming"]));
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<AchievementId>>(
    () => new Set(),
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const keysPressed = useRef<Set<string>>(new Set());
  const positionRef = useRef(position);
  const movingRef = useRef(moving);
  const animationRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const currentZone = useMemo(() => getCurrentZone(position), [position]);

  const handleIntroFinish = useCallback(() => {
    setIntroReady(true);
  }, []);

  const playUiSound = useCallback(() => {
    if (!uiSoundEnabled || typeof window === "undefined") {
      return;
    }

    const AudioContextClass =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) {
      return;
    }

    const context = audioContextRef.current ?? new AudioContextClass();
    audioContextRef.current = context;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "square";
    oscillator.frequency.value = 520;
    gain.gain.value = Math.max(soundVolume, 0) / 1000;
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.045);
  }, [soundVolume, uiSoundEnabled]);

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

  const unlockAchievement = useCallback(
    (achievement: { id: AchievementId; label: string } | undefined) => {
      if (!achievement || unlockedAchievements.has(achievement.id)) {
        return;
      }

      setUnlockedAchievements((previous) => {
        if (previous.has(achievement.id)) {
          return previous;
        }

        const next = new Set(previous);
        next.add(achievement.id);
        return next;
      });

      setToastMessage(achievement.label);
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
      toastTimerRef.current = window.setTimeout(() => setToastMessage(null), 3200);
    },
    [unlockedAchievements],
  );

  const showAchievement = useCallback(
    (zoneId: ZoneId) => {
      unlockAchievement(achievementsByZone[zoneId]);
    },
    [unlockAchievement],
  );

  const activateWorldEffect = useCallback((demoId: DemoId) => {
    setWorldEffects((previous) => {
      if (previous.has(demoId)) {
        return previous;
      }

      const next = new Set(previous);
      next.add(demoId);
      return next;
    });
  }, []);

  const openDemo = useCallback((demoId: DemoId) => {
    keysPressed.current.clear();
    playUiSound();
    setSelectedHotspot(null);
    setSelectedNpc(null);
    setShowWelcome(false);
    setShowRecruiter(false);
    setShowQuickJump(false);
    setShowHelp(false);
    setShowAbout(false);
    setActiveDemo(demoId);
    trackPortfolioEvent("demo_opened", { demo: demoId });

    const hash = demoHashes[demoId];
    if (hash && window.location.hash !== `#${hash}`) {
      window.history.replaceState(null, "", `#${hash}`);
    }
  }, [playUiSound]);

  const closeDemo = useCallback(() => {
    setActiveDemo(null);
  }, []);

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
      playUiSound();
      showAchievement(activeNpc.zoneId);
      setSelectedNpc(activeNpc);
      return;
    }

    if (activeHotspot) {
      playUiSound();
      showAchievement(activeHotspot.zoneId);
      const demoId = demoHotspots[activeHotspot.id];
      if (demoId) {
        openDemo(demoId);
        return;
      }
      setSelectedHotspot(activeHotspot);
    }
  }, [activeHotspot, activeNpc, openDemo, playUiSound, showAchievement]);

  const inspectHotspot = useCallback(
    (hotspot: Hotspot) => {
      playUiSound();
      showAchievement(hotspot.zoneId);
      const demoId = demoHotspots[hotspot.id];
      if (demoId) {
        openDemo(demoId);
        return;
      }
      setSelectedHotspot(hotspot);
    },
    [openDemo, playUiSound, showAchievement],
  );

  const talkToNpc = useCallback(
    (npc: GameNpc) => {
      playUiSound();
      showAchievement(npc.zoneId);
      setSelectedNpc(npc);
    },
    [playUiSound, showAchievement],
  );

  const closeTopLayer = useCallback(() => {
    if (showQuickJump) {
      setShowQuickJump(false);
      return;
    }
    if (showHelp) {
      setShowHelp(false);
      return;
    }
    if (showAbout) {
      setShowAbout(false);
      return;
    }
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
    if (activeDemo) {
      setActiveDemo(null);
      return;
    }
    if (showWelcome) {
      setShowWelcome(false);
    }
  }, [
    activeDemo,
    selectedHotspot,
    selectedNpc,
    showAbout,
    showHelp,
    showQuickJump,
    showRecruiter,
    showWelcome,
  ]);

  const jumpToZone = useCallback(
    (zoneId: ZoneId) => {
      const zone = gameZones.find((candidate) => candidate.id === zoneId);
      if (!zone) {
        return;
      }

      keysPressed.current.clear();
      playUiSound();
      setShowRecruiter(false);
      setShowQuickJump(false);
      setShowHelp(false);
      setShowAbout(false);
      setActiveDemo(null);
      setTransitioning(true);
      window.history.replaceState(null, "", `#${zone.id === "firmware" ? "firmware-lab" : zone.id}`);
      window.setTimeout(() => {
        positionRef.current = zone.jumpPosition;
        setPosition(zone.jumpPosition);
        setDirection("down");
        markZoneVisited(zone.id);
        showAchievement(zone.id);
        window.setTimeout(() => setTransitioning(false), 180);
      }, 160);
    },
    [markZoneVisited, playUiSound, showAchievement],
  );

  const focusTourZone = useCallback(
    (zoneId: ZoneId) => {
      const zone = gameZones.find((candidate) => candidate.id === zoneId);
      if (!zone) {
        return;
      }

      keysPressed.current.clear();
      positionRef.current = zone.jumpPosition;
      setPosition(zone.jumpPosition);
      setDirection("down");
      markZoneVisited(zone.id);
      showAchievement(zone.id);
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

      const interactiveTarget = isInteractiveTarget(event.target);

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (!showQuickJump) {
          setShowQuickJump(true);
        }
        return;
      }

      if (interactiveTarget) {
        return;
      }

      if (event.key === "?") {
        setShowHelp(true);
        return;
      }

      if (
        showWelcome ||
        selectedHotspot ||
        selectedNpc ||
        showRecruiter ||
        showHelp ||
        showQuickJump ||
        showAbout ||
        activeDemo ||
        transitioning
      ) {
        return;
      }

      if (event.key === "m" || event.key === "M") {
        trackPortfolioEvent("recruiter_mode_opened", { source: "keyboard" });
        setShowRecruiter(true);
        return;
      }

      if (event.key === "t" || event.key === "T") {
        openDemo("guided-tour");
        return;
      }

      if (event.key === "e" || event.key === "E") {
        inspectActiveTarget();
        return;
      }

      if (movementKeys[event.key]) {
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
    activeDemo,
    closeTopLayer,
    inspectActiveTarget,
    openDemo,
    selectedHotspot,
    selectedNpc,
    showAbout,
    showHelp,
    showQuickJump,
    showRecruiter,
    showWelcome,
    transitioning,
  ]);

  useEffect(() => {
    const animate = (timestamp: number) => {
      const previous = lastFrameRef.current ?? timestamp;
      const deltaSeconds = Math.min((timestamp - previous) / 1000, 0.04);
      lastFrameRef.current = timestamp;

      if (
        !showWelcome &&
        !selectedHotspot &&
        !selectedNpc &&
        !showRecruiter &&
        !showHelp &&
        !showQuickJump &&
        !showAbout &&
        !activeDemo &&
        !transitioning
      ) {
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
    activeDemo,
    markZoneVisited,
    selectedHotspot,
    selectedNpc,
    showAbout,
    showHelp,
    showQuickJump,
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
      void audioContextRef.current?.close();
    };
  }, []);

  useEffect(() => {
    const applyHashTarget = () => {
      const key = window.location.hash.replace("#", "").trim().toLowerCase();
      if (!key) {
        return;
      }

      const target = hashTargets[key];
      if (!target) {
        return;
      }

      if (target.type === "demo") {
        openDemo(target.demoId);
        return;
      }

      const zone = gameZones.find((candidate) => candidate.id === target.zoneId);
      if (!zone) {
        return;
      }

      keysPressed.current.clear();
      positionRef.current = zone.jumpPosition;
      setPosition(zone.jumpPosition);
      setDirection("down");
      markZoneVisited(zone.id);
      showAchievement(zone.id);
      setShowWelcome(false);
    };

    applyHashTarget();
    window.addEventListener("hashchange", applyHashTarget);
    return () => window.removeEventListener("hashchange", applyHashTarget);
  }, [markZoneVisited, openDemo, showAchievement]);

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
      <CinematicIntro onFinish={handleIntroFinish} />
      <RecruiterOverlay
        open={showRecruiter}
        zones={gameZones}
        onClose={() => setShowRecruiter(false)}
        onJumpToZone={jumpToZone}
        onOpen={() => {
          trackPortfolioEvent("recruiter_mode_opened", { source: "floating_button" });
          setShowRecruiter(true);
        }}
        onOpenDemo={openDemo}
      />

      <section className={styles.headerBar} aria-label="Game portfolio header">
        <div>
          <p className={styles.kicker}>/game</p>
          <h1>Raqueed&apos;s Interactive Engineering Apartment</h1>
        </div>
        <div className={styles.headerCopy}>
          <p>
            Explore embedded firmware, automation, research, photography, 3D printing,
            and interactive engineering systems.
          </p>
          <div className={styles.headerActions}>
            <button type="button" onClick={() => openDemo("guided-tour")}>
              Start Recruiter Tour
            </button>
            <button type="button" onClick={() => setShowQuickJump(true)}>
              Search
            </button>
            <button type="button" onClick={() => setShowHelp(true)} aria-label="Open keyboard shortcut help">
              Help
            </button>
            <button type="button" onClick={() => setShowAbout(true)}>
              About
            </button>
          </div>
          <ViewToggle />
        </div>
      </section>

      <section className={styles.gameShell} aria-label="Playable portfolio apartment">
        <div
          className={[
            styles.sceneFrame,
            transitioning ? styles.sceneTransitioning : null,
            ambientSoundEnabled ? styles.sceneAmbientOn : null,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <GameWorld>
            <WorldFeedback activeEffects={worldEffects} />
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

            {promptText && !selectedHotspot && !selectedNpc && !showWelcome && !showRecruiter && !activeDemo ? (
              <div className={styles.inspectPrompt} role="status">
                <kbd>E</kbd> {promptText.replace("Press E ", "")}
              </div>
            ) : null}

            <AchievementToast message={toastMessage} />
          </GameWorld>
        </div>

        <aside className={styles.statusPanel} aria-label="Current apartment status">
          <div className={styles.hudCard}>
            <span>Quick Actions</span>
            <div className={styles.hudButtonGrid}>
              <button type="button" onClick={() => setShowRecruiter(true)}>
                Recruiter
              </button>
              <button type="button" onClick={() => setShowQuickJump(true)}>
                Ctrl+K
              </button>
              <button type="button" onClick={() => openDemo("guided-tour")}>
                Tour
              </button>
              <button type="button" onClick={() => setShowHelp(true)}>
                ?
              </button>
            </div>
          </div>
          <SoundControls
            ambientEnabled={ambientSoundEnabled}
            uiEnabled={uiSoundEnabled}
            volume={soundVolume}
            onAmbientChange={setAmbientSoundEnabled}
            onUiChange={setUiSoundEnabled}
            onVolumeChange={setSoundVolume}
          />
          <div>
            <span>Controls</span>
            <p>WASD / Arrow Keys to move. E to inspect or talk. Esc closes panels. Press ? for help.</p>
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
          <div className={styles.mobileFallbackMessage}>
            <span>Mobile</span>
            <p>All core content is reachable through Recruiter Mode and Search when touch movement is cramped.</p>
          </div>
        </aside>

        <div className={styles.mobileControls} aria-label="Touch controls">
          <p>
            Touch controls are available, though the full interactive engineering
            lab experience is best on desktop.
          </p>
          <div className={styles.touchGrid}>
            <button type="button" onClick={() => nudge(0, -38)} aria-label="Move up">
              Up
            </button>
            <button type="button" onClick={() => nudge(-38, 0)} aria-label="Move left">
              Left
            </button>
            <button type="button" onClick={inspectActiveTarget} aria-label="Inspect nearby target">
              E
            </button>
            <button type="button" onClick={() => nudge(38, 0)} aria-label="Move right">
              Right
            </button>
            <button type="button" onClick={() => nudge(0, 38)} aria-label="Move down">
              Down
            </button>
          </div>
        </div>
      </section>

      <ImpactCards onJumpToZone={jumpToZone} onOpenDemo={openDemo} />

      {showWelcome && introReady ? <OnboardingDialog onClose={() => setShowWelcome(false)} /> : null}
      {selectedHotspot ? (
        <InteractionModal
          hotspot={selectedHotspot}
          onClose={() => setSelectedHotspot(null)}
          onOpenDemo={
            selectedHotspot.id === "gaming-setup" ? () => openDemo("terminal") : undefined
          }
        />
      ) : null}
      {selectedNpc ? <DialogBox npc={selectedNpc} onClose={() => setSelectedNpc(null)} /> : null}

      {activeDemo === "guided-tour" ? (
        <GuidedTour
          onClose={closeDemo}
          onComplete={() => unlockAchievement(demoAchievements["guided-tour"])}
          onFocusZone={focusTourZone}
          onJumpToZone={jumpToZone}
        />
      ) : null}
      {activeDemo === "terminal" ? (
        <GameTerminal
          onClose={closeDemo}
          onCommandAchievement={(command) => {
            if (command === "scan_ble") {
              unlockAchievement(demoAchievements["ble-scanner"]);
              activateWorldEffect("ble-scanner");
            }
            if (command === "uart_status" || command === "dma_status") {
              unlockAchievement(demoAchievements["uart-dma"]);
              activateWorldEffect("uart-dma");
            }
            if (command === "mqtt_status") {
              unlockAchievement(demoAchievements["iot-router"]);
              activateWorldEffect("iot-router");
            }
            if (command === "publications") {
              unlockAchievement(demoAchievements["research-console"]);
            }
          }}
        />
      ) : null}
      {activeDemo === "ble-scanner" ? (
        <BLEScannerDemo
          onClose={closeDemo}
          onInspectDevice={() => unlockAchievement(demoAchievements["ble-scanner"])}
          onScanStart={() => {
            unlockAchievement(demoAchievements["ble-scanner"]);
            activateWorldEffect("ble-scanner");
          }}
        />
      ) : null}
      {activeDemo === "uart-dma" ? (
        <UartDmaVisualizer
          onClose={closeDemo}
          onStart={() => {
            unlockAchievement(demoAchievements["uart-dma"]);
            activateWorldEffect("uart-dma");
          }}
        />
      ) : null}
      {activeDemo === "iot-router" ? (
        <IoTPacketRouter
          onClose={closeDemo}
          onStart={() => {
            unlockAchievement(demoAchievements["iot-router"]);
            activateWorldEffect("iot-router");
          }}
        />
      ) : null}
      {activeDemo === "research-console" ? (
        <ResearchConsole
          onClose={closeDemo}
          onAnalyze={() => {
            unlockAchievement(demoAchievements["research-console"]);
            activateWorldEffect("research-console");
          }}
        />
      ) : null}
      {activeDemo === "photography-gallery" ? (
        <PhotographyGallery
          onClose={closeDemo}
          onVisit={() => unlockAchievement(demoAchievements["photography-gallery"])}
        />
      ) : null}
      {activeDemo === "layercade-showcase" ? (
        <LayercadeShowcase
          onClose={closeDemo}
          onStartPrint={() => {
            unlockAchievement(demoAchievements["layercade-showcase"]);
            activateWorldEffect("layercade-showcase");
          }}
        />
      ) : null}
      {showHelp ? <HelpOverlay onClose={() => setShowHelp(false)} /> : null}
      {showQuickJump ? (
        <QuickJumpOverlay
          onClose={() => setShowQuickJump(false)}
          onJumpToZone={jumpToZone}
          onOpenDemo={openDemo}
        />
      ) : null}
      {showAbout ? <AboutExperienceModal onClose={() => setShowAbout(false)} /> : null}
    </main>
  );
}

function DemoLoading() {
  return (
    <div className={styles.modalBackdrop} role="status" aria-live="polite">
      <section className={`${styles.modalCard} ${styles.loadingDemoCard}`}>
        <p className={styles.kicker}>Loading demo</p>
        <div className={styles.pixelLoader} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
    </div>
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
