# 🎲 Rubik Vision (v13.9)

> **Next-Generation Bluetooth Smart Cube Timer, AI Reconstruction Engine, & Speedcubing Analytics Platform**

Rubik Vision is a state-of-the-art, offline-first Web application engineered for speedcubers. It pairs directly with Bluetooth Smart Cubes (GAN Gen2/Gen3 protocol) to provide millisecond-accurate solve timing, real-time 3D state synchronization, automatic phase reconstruction (CFOP, Roux, LBL), TPS/velocity curves, fluid Apple-inspired gestures, and an orthogonal multi-theme visual engine.

---

## ✨ Key Features

### 1. ⚡ Bluetooth Smart Cube Direct Pairing
- **Full GAN Protocol Support**: Seamlessly connects with GAN 356i, GAN 12 ui, GAN Mini ui, GAN 14 ui, GAN Halo Smart Timer, and compatible smart cubes.
- **Hardware AES-128 Encryption**: Client-side dynamic key derivation and hardware-level state verification.
- **Auto Deviation & Correction**: Live scramble tracking detects inaccurate turns in real time and provides instant correction guidance.

### 2. 👆 Gesture-Driven Arena & Scramble Matrix
- **Tap to Copy**: Tap or click the scramble formula to copy it instantly with floating pill toast and haptic feedback.
- **Fluid Horizontal Swipe**:
  - **Swipe Left (👈)**: Navigate to previous scrambles in the session history stack with rubber-band resistance.
  - **Swipe Right (👉)**: Refresh and generate a new WCA 3x3 scramble with fluid Apple spring physics (`cubic-bezier(0.25, 1, 0.5, 1)`).
- **Distraction-Free Mode**: Clean interface without visual clutter.

### 3. 🎨 Multi-Style & Multi-Color Matrix (35 Combinations)
- **5 Independent Visual Styles**:
  1. `Apple Liquid Glass`: OLED pitch black, frosted glass (`blur(28px)`), specular highlight borders, iOS-native segmented controls.
  2. `Material Design 3 (M3)`: Google Material You tonal surfaces and pill buttons.
  3. `Precision Dark`: High-contrast dark cards and clean typography.
  4. `Cyber Neon`: HUD-style glowing borders and cyberpunk accents.
  5. `Clean Light`: Minimalist day mode.
- **7 Accent Colors**: Emerald Green, Apple Blue, Electric Violet, Cyber Cyan, Sunset Amber, Crimson Red, Sakura Rose.

### 4. 📊 Multi-Method Solve Reconstruction & Analytics
- **CFOP Breakdown**: Cross detection (auto color neutral), F2L Pairs (1st to 4th pair), OLL, PLL split times, move counts, and TPS.
- **Roux & LBL Support**: Full phase detection for First Block (FB), Second Block (SB), CMLL, LSE, and Layer-by-Layer.
- **Performance Curves**: Canvas-based real-time TPS velocity curves, cumulative time graphs, and pause derivative detection.

### 5. 🧊 3D & 2D Synchronous Visualizers
- **Interactive Three.js 3D Cube**: Real-time orientation and rotation physics with customizable reset angles.
- **2D Net Map**: Unfolded facelet view for instant orientation inspection.

### 6. 📱 Progressive Web App (PWA) & Offline Ready
- Complete offline support powered by Service Worker cache (`v13.9`).
- Installable on iOS (Safari Add to Home Screen) and Android (Chrome Standalone PWA).

---

## 🚀 Quick Start

### Running Locally

You can launch Rubik Vision using Python's built-in HTTP server or the included launcher:

```bash
# Option 1: Start with the included script
./start.sh

# Option 2: Start directly with Python
python3 -m http.server 8080
```

Open your browser at `http://localhost:8080` (or `http://127.0.0.1:8080`).

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| `Space` (Hold & Release) | Start / Stop Timer (Manual mode) |
| `N` | Generate New WCA Scramble |
| `R` | Recalibrate physical cube to Solved state |
| `Esc` | Close all dialogs / Reset timer |

---

## 📂 Project Architecture

Rubik Vision is designed as a modular, zero-build, offline-first Web application:

```text
rubiks/
├── index.html                   # Application entry point
├── manifest.json                # PWA web app manifest
├── sw.js                        # Root-scoped Service Worker (offline cache)
├── style.css                    # Unified design system & responsive styling
├── server.py / start.sh         # Local HTTPS/HTTP server & 1-click launcher
│
├── src/                         # Core Application Source Code
│   ├── core/                    # Rubik's state machine, timer & reconstruction
│   │   ├── cube-engine.js       # Cube facelet state & turn mechanics
│   │   ├── timer-engine.js      # Millisecond timing & inspection engine
│   │   ├── method-analyzer.js   # CFOP, Roux, and LBL phase solver
│   │   └── alg-database.js      # OLL/PLL/F2L standard algorithms
│   ├── bluetooth/               # Hardware BLE Drivers
│   │   └── gan-bluetooth.js     # Web Bluetooth driver for GAN Gen2/Gen3/Gen4
│   ├── audio/                   # Sound Synthesis
│   │   └── audio-synth.js       # Web Audio API polyphonic sound generator
│   ├── renderers/               # Visualizers
│   │   ├── renderer-2d.js       # 2D Net unfolded facelet visualizer
│   │   └── renderer-3d.js       # Three.js 3D WebGL interactive cube
│   └── ui/                      # UI Controller & Visual Analytics
│       ├── ui-controller.js     # Event orchestration, modal & settings binding
│       └── chart-engine.js      # ECharts TPS curves & solve statistics
│
├── lib/                         # Third-Party Vendor Libraries
│   ├── three.min.js             # Three.js WebGL graphics
│   ├── echarts.min.js           # Apache ECharts
│   ├── aes.js                  # AES-128 client-side cryptography
│   └── min2phase.js             # WCA Two-Phase scrambler & solver
│
└── docs/                        # Specifications & Developer Documentation
    ├── specs/                   # Protocol type definitions & reference code
    ├── bluetooth-cube-timer-integration.md
    ├── OFFLINE_MANUAL.md
    └── todo.md
```

---

## 🛠️ Tech Stack

- **Core Engine**: Pure Modern Vanilla JavaScript (ES6+), Web Bluetooth API, Web Audio API, Web Vibration API.
- **3D Graphics**: Three.js WebGL Renderer.
- **Charts & Data**: Apache ECharts.
- **Math & Solvers**: `min2phase` Two-Phase WCA Scrambler & State Solver.
- **Encryption**: AES-128 Client-side Cryptography.

---

## 👥 Authors & Maintainers

- **PilotXing** - Project Initiator & Creator
- **Antigravity (Google DeepMind)** - Autonomous Pair-Programming Architect, Core Engine & UI Engineer

---

## 💖 Acknowledgments & Third-Party Credits

Rubik Vision builds upon and is deeply grateful to the open-source speedcubing and graphics community:

- **[Three.js](https://github.com/mrdoob/three.js)** (MIT License) - Exceptional 3D WebGL rendering engine by Ricardo Cabello (Mr.doob) and contributors.
- **[Apache ECharts](https://github.com/apache/echarts)** (Apache-2.0 License) - Powerful, interactive charting and visualization library by the Apache Software Foundation.
- **[min2phase](https://github.com/cs0x7f/min2phase)** (GPL-3.0 / MIT License) - Ultra-fast two-phase Rubik's Cube scrambler and solver by Shuang Chen (`cs0x7f`).
- **[aes-js](https://github.com/ricmoo/aes-js)** (MIT License) - Pure JavaScript implementation of the AES block cipher and common modes of operation by Richard Moore (`ricmoo`).
- **[gan-web-bluetooth](https://github.com/afedotov/gan-web-bluetooth)** (MIT License) - Pioneering Web Bluetooth protocol reverse-engineering for GAN smart cubes by Andrew Fedotov (`afedotov`) and the open-source cubing community.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Crafted with precision for the global speedcubing community.


