# Pixel CV

Pixel CV is a playful, interactive portfolio website built with Next.js and TypeScript. It turns a personal CV into a cozy pixel-art engineering apartment where visitors can walk through connected zones, inspect project hotspots, talk to helper characters, and still jump directly to recruiter-friendly portfolio links.

The project was designed for [raqueed.com](https://www.raqueed.com/) as an alternate portfolio route, while preserving the classic portfolio experience.

## Highlights

- Playable pixel portfolio experience on `/game`
- Alias route on `/pixel-portfolio`
- Classic portfolio preserved at the main route
- Keyboard movement with WASD or arrow keys
- Touch controls for smaller screens
- Recruiter Mode overlay for direct navigation
- Multi-zone apartment map with animated pixel-art objects
- NPC-style dialogue system
- Interaction modals for portfolio storytelling
- Current zone HUD
- Subtle exploration achievement toasts
- CSS-based pixel art with no heavy external assets

## Interactive Apartment Zones

### Gaming + Dev Setup

The visual centerpiece of the experience: a cozy cyberpunk engineering workstation with an ultrawide monitor, RGB PC tower, glowing keyboard and mouse, speakers, embedded dev boards, animated code, and monitor glow.

This zone represents firmware development, portfolio building, photography editing, 3D print design, and gaming.

### Firmware Lab

A firmware workbench with STM32-style boards, oscilloscope visuals, logic analyzer, UART cable runs, blinking LEDs, and BLE pulse animations.

Portfolio themes include:

- STM32 WBA55 BLE platform work
- DMA-based UART passthrough firmware
- Cellular module AT-command workflows
- Embedded state-machine architecture
- Hardware validation and debugging

### Automation + Server Stack

A server and automation corner with NAS/server rack visuals, Docker-like containers, Jenkins/test monitor, status LEDs, and animated packet movement.

Portfolio themes include:

- Python and PyTest firmware automation
- Jenkins-based test execution
- Dockerized services and server workflows
- Structured validation reports

### Research / Publications

A research shelf for cybersecurity, machine learning, power systems, firmware malware detection, and technical investigation.

### Photography + Visual Storytelling

A creative photography corner with a Fujifilm-inspired camera shelf, framed photos, tripod, editing monitor, and softbox lighting.

### Layercade Workshop

A 3D printing and product experimentation space with an animated printer head, filament spool, keycaps, car diorama display, and cyberpunk/gamer product styling.

### Contact / Resume

A quick access zone for resume, contact, GitHub/LinkedIn-style navigation, and the classic portfolio.

## NPC Helpers

The apartment includes small helper characters that provide guided portfolio context:

- Firmware Bot
- Cloud/Test Bot
- Research Librarian
- Creative Assistant

Each NPC has short dialogue lines and optional links back to relevant classic portfolio sections.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- CSS Modules
- CSS-based pixel art and lightweight animations

No game engine or large asset pack is used. The scene is built with reusable React components and CSS sprites to keep the page fast and easy to deploy.

## Project Structure

```text
src/
  app/
    game/
    pixel-portfolio/
  components/
    game/
      AchievementToast.tsx
      DialogBox.tsx
      GameWorld.tsx
      HotspotObject.tsx
      InteractionModal.tsx
      NPC.tsx
      OnboardingDialog.tsx
      PixelGame.tsx
      Player.tsx
      RecruiterOverlay.tsx
      ZoneIndicator.tsx
  data/
    gameHotspots.ts
    gameNPCs.ts
    gameZones.ts
  types/
    game.ts
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000/game
```

If port `3000` is busy, Next.js will choose the next available port.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Routes

- `/` - classic portfolio
- `/game` - interactive pixel portfolio
- `/pixel-portfolio` - alias for the interactive pixel portfolio

## Current Scope

This repository currently includes the Phase 2 interactive apartment experience:

- Expanded connected zones
- Premium gaming/development workstation
- NPC dialogue interactions
- Recruiter Mode quick navigation
- Zone indicator
- Achievement toast notifications
- Atmospheric pixel animations

Phase 3 ideas such as BLE scanning mini-games, UART/DMA puzzles, MQTT routing challenges, save/load state, inventory, multiplayer, and backend integrations are intentionally not implemented yet.

## Deployment

This is a standard Next.js app and can be deployed to Vercel or any host that supports Next.js.

## Author

Built for Raqueed's personal engineering portfolio.
