# Rubik Vision (v20.26)

> Next-generation Bluetooth smart cube timer, reconstruction engine, and speedcubing analytics platform.

Rubik Vision is an offline-first Web application engineered for speedcubers. It pairs directly with Bluetooth Smart Cubes (GAN Gen2/Gen3/Gen4 protocols) to provide millisecond-accurate solve timing, real-time 3D state synchronization, automatic phase reconstruction (CFOP, Roux, LBL), TPS velocity curves, gesture-driven scramble navigation, and an orthogonal multi-theme visual engine.

---

## Key Features

### 1. Bluetooth Smart Cube Direct Pairing
- **Full GAN Protocol Support**: Connects directly with GAN 356i, GAN 12 ui, GAN Mini ui, GAN 14 ui, GAN Halo Smart Timer, and compatible smart cubes.
- **Hardware AES-128 Encryption**: Dynamic key derivation and hardware-level state verification executed entirely client-side.
- **Live Deviation & Correction**: Real-time scramble tracking detects inaccurate turns and provides immediate correction guidance.

### 2. Gesture-Driven Scramble Reel
- **Formula Copy**: Tap or click the scramble formula to copy standard WCA notation with haptic feedback.
- **Horizontal Swipe Mechanics**:
  - **Swipe Left**: Navigate backward through the session scramble history stack.
  - **Swipe Right**: Generate a fresh WCA 3x3 scramble with fluid spring physics.
- **Distraction-Free Mode**: Focused layout optimized for competition and practice.

### 3. Multi-Style & Multi-Color Matrix
- **7 Independent Visual Styles**:
  1. `Precision Dark`: High-contrast dark cards and technical typography.
  2. `Designmodo Flat UI`: Iconic flat colors, 2D solid buttons, and zero gradient minimalism.
  3. `Windows 98`: Authentic retro desktop teal (`#008080`), dialog gray (`#C0C0C0`), blue gradient titlebars, 3D beveled outset/inset borders, and mechanical push buttons.
  4. `Apple Liquid Glass`: OLED black background, frosted glass blurring, specular highlights, and iOS-style segmented controls.
  5. `Material Design 3 (M3)`: Material You tonal surfaces and pill components.
  6. `Cyber Neon`: HUD-style glowing borders and neon accents.
  7. `Clean Light`: Minimalist day mode.
- **8 Accent Colors**: Emerald Green, Flat Turquoise, Apple Blue, Electric Violet, Cyber Cyan, Sunset Amber, Crimson Red, Sakura Rose.

### 4. Multi-Method Solve Reconstruction & Analytics
- **CFOP Breakdown**: Automatic Cross detection (color neutral), F2L Pairs (1st to 4th pair), OLL, PLL split times, move counts, and phase TPS.
- **Roux & LBL Detection**: Phase tracking for First Block (FB), Second Block (SB), CMLL, LSE, and Layer-by-Layer solving.
- **Performance Curves**: Canvas-based real-time TPS velocity curves, cumulative time graphs, and hesitation derivative analysis.

### 5. 3D and 2D Synchronous Visualizers
- **Interactive Three.js 3D Cube**: Real-time orientation and rotation physics with customizable reset angles.
- **2D Net Map**: Unfolded facelet view for instant orientation inspection.

### 6. Progressive Web App (PWA) & Offline Architecture
- Complete offline operation backed by Service Worker caching.
- Installable on mobile devices (iOS Safari Add to Home Screen and Android Chrome Standalone PWA).

---

## Quick Start

### Running Locally

Launch the local web server using Python or the provided shell script:

```bash
# Option 1: Start using the shell script
./start.sh

# Option 2: Start directly with Python
python3 server.py 8080
```

Open your browser at `http://localhost:8080` (or `http://127.0.0.1:8080`).

---

## Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| `Space` (Hold & Release) | Start / Stop Timer (Manual mode) |
| `N` | Generate New WCA Scramble |
| `R` | Recalibrate physical cube to Solved state |
| `Esc` | Close dialogs / Reset timer |

---

## Project Architecture

Rubik Vision follows a modular, zero-build, offline-first directory structure:

```text
rubiks/
├── index.html                   # Application entry point
├── manifest.json                # PWA web app manifest
├── sw.js                        # Root-scoped Service Worker (offline cache)
├── style.css                    # Unified design system and responsive styling
├── server.py / start.sh         # Local HTTP server and launcher script
│
├── src/                         # Core application source code
│   ├── core/                    # State machine, timer engine, and solvers
│   │   ├── cube-engine.js       # Cube facelet state and turn mechanics
│   │   ├── timer-engine.js      # Millisecond timing and inspection engine
│   │   ├── method-analyzer.js   # CFOP, Roux, and LBL reconstruction solver
│   │   └── alg-database.js      # Standard OLL/PLL/F2L algorithm reference
│   ├── bluetooth/               # Hardware BLE drivers
│   │   └── gan-bluetooth.js     # Web Bluetooth driver for GAN Gen2/Gen3/Gen4
│   ├── audio/                   # Sound synthesis
│   │   └── audio-synth.js       # Web Audio API sound generator
│   ├── renderers/               # Visualizers
│   │   ├── renderer-2d.js       # 2D net unfolded facelet visualizer
│   │   └── renderer-3d.js       # Three.js 3D WebGL interactive cube
│   └── ui/                      # UI controller and visual analytics
│       ├── ui-controller.js     # Event orchestration and settings binding
│       └── chart-engine.js      # ECharts TPS curves and solve statistics
│
├── lib/                         # Third-party vendor libraries
│   ├── three.min.js             # Three.js WebGL graphics
│   ├── echarts.min.js           # Apache ECharts
│   ├── aes.js                  # AES-128 client-side cryptography
│   └── min2phase.js             # WCA Two-Phase scrambler and solver
│
└── docs/                        # Specifications and developer documentation
    ├── specs/                   # Protocol type definitions and reference code
    ├── bluetooth-cube-timer-integration.md
    ├── OFFLINE_MANUAL.md
    └── todo.md
```

---

## Tech Stack

- **Core Engine**: Modern Vanilla JavaScript (ES6+), Web Bluetooth API, Web Audio API, Web Vibration API.
- **3D Graphics**: Three.js WebGL Renderer.
- **Charts & Data**: Apache ECharts.
- **Math & Solvers**: min2phase Two-Phase WCA Scrambler and State Solver.
- **Encryption**: AES-128 Client-side Cryptography.

---

## Authors & Maintainers

- **PilotXing** - Project Initiator & Creator
- **Antigravity (Google DeepMind)** - Autonomous Pair-Programming Architect, Core Engine & UI Engineer

---

## Acknowledgments & Third-Party Credits

Rubik Vision builds upon and is grateful to the open-source speedcubing and graphics community:

- **[Three.js](https://github.com/mrdoob/three.js)** (MIT License) - 3D WebGL rendering engine by Ricardo Cabello (Mr.doob) and contributors.
- **[Apache ECharts](https://github.com/apache/echarts)** (Apache-2.0 License) - Charting and visualization library by the Apache Software Foundation.
- **[min2phase](https://github.com/cs0x7f/min2phase)** (GPL-3.0 / MIT License) - Two-phase Rubik's Cube scrambler and solver by Shuang Chen (`cs0x7f`).
- **[aes-js](https://github.com/ricmoo/aes-js)** (MIT License) - JavaScript implementation of the AES block cipher by Richard Moore (`ricmoo`).
- **[gan-web-bluetooth](https://github.com/afedotov/gan-web-bluetooth)** (MIT License) - Web Bluetooth protocol reverse-engineering for GAN smart cubes by Andrew Fedotov (`afedotov`) and the open-source cubing community.

---

## License

This project is licensed under the [MIT License](LICENSE).
