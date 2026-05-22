# 🕵️ Detective Point & Click Engine

A lightweight, modular point-and-click game engine built with **Vanilla TypeScript**, **DOM-based rendering**, and a custom **scene + script + dialogue system**. Designed for narrative-driven detective games with cutscenes, branching dialogue, inventory progression, and interactive environments.

---

## ✨ Features

### 🎬 Scene System

- Fully DOM-based scene rendering
- Layered architecture:
  - Background
  - Environment
  - Characters
  - Effects

- Scene lifecycle (`mount` / `unmount`)
- Scene manager with safe transitions
- Interaction layer per scene

---

### 🧠 Script / Cutscene System

- Sequential script execution system
- Supports:
  - Dialogue playback
  - Scene transitions
  - Audio triggers
  - Custom events
  - Timed waits

- Scene-aware cutscene execution
- Cancellation support on scene changes

---

### 💬 Dialogue System

- Typewriter effect
- Speaker-based dialogue lines
- Auto-advance and manual progression
- Event-driven architecture
- Dialogue lifecycle events:
  - start
  - typing
  - line
  - end

- Supports clue rewards during dialogue

---

### 🧩 Interaction System

- Hotspot-based interaction zones
- Hover / click handling
- Scene-bound interactive elements
- Clean registration & cleanup lifecycle

---

### 🎮 Game State System

Centralized game state management:

- Current scene tracking
- Clue inventory
- Dialogue completion tracking
- Scene unlocking system
- Audio settings (volume, mute)
- Game mode (boot / menu / playing / cutscene)

---

### 🔊 Audio System (foundation)

- Channel-based playback (music / sfx / voice)
- Volume controls per channel
- Global mute support

---

### 💾 Save / Load System

- Persistent game state storage
- Save:
  - progression
  - clues
  - scene state
  - audio settings

- Keyboard shortcuts:
  - `F5` → Save
  - `F9` → Load
  - `F10` → Reset

---

### 🖥 UI System

- Dialogue UI overlay
- Journal UI system
- Menu implemented as a scene (current iteration uses layered UI approach)

---

## 🧱 Architecture Overview

```
Game
 ├── SceneManager
 │     └── Scene (base class)
 │           ├── SceneLayer (background)
 │           ├── SceneLayer (environment)
 │           ├── SceneLayer (characters)
 │           ├── SceneLayer (effects)
 │           └── InteractionLayer
 │
 ├── ScriptRunner (cutscene engine)
 ├── DialogueSystem
 ├── EventBus (typed events)
 ├── GameState (central state)
 ├── Audio System
 ├── Save System
 └── UI Layer (overlay system)
```

---

## 🎯 Core Design Principles

- **DOM-first rendering (no canvas)**
- **Strict scene lifecycle ownership**
- **Event-driven systems**
- **Separation of gameplay systems (dialogue, script, audio)**
- **Deterministic state transitions**
- **Minimal external dependencies**

---

## 🎮 Controls (current dev setup)

- Click → interact / advance dialogue
- `F5` → Save game
- `F9` → Load game
- `F10` → Reset save
- `M` → Toggle mute

---

## ⚠️ Current Known Design Notes

- Scene layers are shared across all scenes (may be simplified later)
- Menu is currently implemented within scene layering system
- Some visual layers (characters/effects) are toggled via display rules in UI scenes
- ScriptRunner handles cancellation on scene changes (cutscene safety layer)

---

## 🧭 Roadmap

### Next Engine Improvements

- Scene reset contract (formal lifecycle guarantees)
- UI system separation (menu / HUD / overlays)
- Proper cutscene interruption system
- Dialogue branching system (state-driven)
- Inventory + case journal expansion
- Audio engine improvements (crossfades, ambience layers)
- Asset streaming + preloading optimization

---

## 🛠 Tech Stack

- TypeScript (vanilla, no framework)
- DOM API rendering
- TailwindCSS (utility styling)
- Event-driven architecture
- Custom engine systems

---

## 📦 Getting Started

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

---

## 📌 Goal of this project

A **fully modular detective point-and-click engine** capable of supporting:

- narrative investigation games
- branching dialogue cases
- cutscene-driven storytelling
- puzzle-based scene interaction

---
