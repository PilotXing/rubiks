# Bugs (Resolved)

## Scramble Generation
- [x] Does not load a new scramble after completing a solve.

## Scramble Correction and Alerts
- [x] 1. When failing to follow the scramble algorithm, show the correct movement for the next step.
- [x] 2. Provide visual and audio alerts.
- [x] 3. Add a toggle switch in Settings for alerts.
- [x] 4. Remove the direction icon for 180° or 270° movements.
- [x] 5. For 180°/270° movements, do not update immediately; update only when the user starts moving another layer.

---

# New Features (Completed)

## Movement Color Coding
- [x] 1. Apply distinct colors for different movements in both scramble and review modes.

## Review Mode
- [x] 1. Split solves into stages based on method (CFOP, Roux, XCFOP, LBL, CFCE, etc.).
- [x] 2. Display rotations on a virtual cube.
- [x] 3. Display the solve algorithm and split/segment it according to the solving method.
- [x] 4. Tapping a movement jumps to that specific cube state.
- [x] 5. Adjust character/move spacing proportionally based on the time spent on each movement.

## Data Analysis
- [x] 1. Trend curve display:
    - [x] 1. **AoX (Average of X)**: A user-configurable parameter showing the average of the last X solves. If the total number of solves is less than X, use the average of all available solves until reaching X.
    - [x] 2. Support adding multiple AoX curves.
    - [x] 3. Customizable curve styles (Color, Opacity / Transparency, Line width).
    - [x] 4. Apply smoothing algorithms to the curve.
- [x] 2. Per-solve movement curve:
    - [x] 1. X-axis: equally spaced by move (1 move per step/interval).
    - [x] 2. Y-axis: time.
    - [x] 3. Show the derivative of the curve (the duration/time taken for each step).
    - [x] 4. Overlay multiple solve curves on a single chart for comparison.
    - [x] 5. During review, highlight the current movement with a vertical dashed line.

## Algorithm Practice
- [x] 1. Algorithm collection and management:
    - [x] 1. Scrape/import algorithms from the web.
    - [x] 2. Allow custom user input.
    - [x] 3. Standardize case naming for state transitions (e.g., J-Perm, OLL 1, PLL, etc.).
    - [x] 4. Support recognized move sequences and triggers (e.g., Sexy Move).
- [x] 2. The cube does not need to match the initial displayed state; only validate movement sequences. When consecutive movements match the target algorithm, calculate the execution time. Provide a warning on incorrect moves.

## Battery Saver
- [x] 1. Inactivity timeout: Auto-disconnect Bluetooth after a configurable period of inactivity (default 2 minutes) to preserve cube battery.

# 17 AUG

## How do you count movement? Does X2 movement count as 1 or 2?
- [x] **Speedcubing Metric Standards Answer & Configuration**:
    - **OBTM / HTM (Outer Block Turn Metric / Half Turn Metric)**: Any single face turn by 90° (`U`, `U'`) or 180° (`U2`, `R2`, etc.) counts as **1 move**. This is the official WCA competition regulation metric and the default standard in speedcubing timers.
    - **QTM (Quarter Turn Metric)**: Every 90° turn counts as 1 move. A 180° double turn (`U2`, `R2`, `F2`) is equivalent to two quarter turns, so it counts as **2 moves**.
    - **ETM (Execution Turn Metric)**: Every distinct physical wrist / fingertrick action (including full cube rotations `x`, `y`, `z` and slice moves) counts as 1 move.
    - **Implementation**: Added a user-configurable **Move Counting Metric** setting in Settings (OBTM / HTM vs QTM vs ETM) and `CubeEngine.countMoves()`. Dual metrics (e.g., `42 moves (53 QTM)`) are also displayed in solve reconstructions.

## What is Calibrate Time and why is it needed?
- [x] **Hardware Timestamp vs Bluetooth Radio Latency Answer**:
    - **The Problem**: Over Web Bluetooth (BLE), move packets encounter variable radio transmission latency, GATT connection intervals (7.5ms–45ms), OS queue buffering, and JavaScript event loop jitter. Relying solely on browser packet arrival time (`localTimestamp`) introduces significant timing jitter.
    - **Linear Regression Calibration (`cubeTimestampLinearFit`)**: GAN smart cubes contain an internal high-frequency crystal timer that logs each physical turn (`cubeTimestamp`) at the exact mechanical instant the layer turns. Linear regression correlates hardware timestamps against monotonic browser time ($T_{\text{fitted}} = a \cdot T_{\text{cube}} + b$), eliminating wireless transmission lag and jitter to yield millisecond-precise physical solve times and accurate TPS calculations.
    - **Recalibrate (Set Solved)**: Re-synchronizes the virtual internal cube state with the physical cube state if turns were executed while disconnected.

## Curve Analytics Enhancements

### Overall Trend Curve (Multi-AoX)
- [x] 1. **Editable Y-Axis Range**: Added manual Custom Range mode with numeric inputs for Min Y (s) and Max Y (s).
- [x] 2. **Auto-Zoom Y (Keep 90% of Data in View)**: Trims the outer 5% extreme outliers (5th to 95th percentile) to ensure 90% of solve data is in high-resolution visual focus, preventing anomalous DNFs or high solves from squashing the trend chart.
- [x] 3. **Interactive Curve Styles Customizer**: Added a drawer panel allowing customization of line color, stroke width, and opacity for Raw Solves, Ao5, Ao12, and AoX curves.
- [x] 4. **Hover Tooltip & Crosshair**: Live cursor crosshair displaying exact solve number, raw time, Ao5, and AoX values on hover.

### One Solve Movement Curve & Replay
- [x] 1. **Editable Curves & Multi-Layer Toggles**:
    - Toggle **Cumulative Solve Time Curve** with customizable color and width.
    - Toggle **Derivative Delta Bars** (step pause duration) with active step highlight.
    - Toggle **TPS Velocity Curve** showing instantaneous turn velocity across the solve.
    - Toggle **Multi-Solve Comparison Overlay**: Compare with session Best solve or Previous solve.
- [x] 2. **Split Curve into Steps / Method Stages**:
    - Render translucent colored stage background bands across the chart for method stages (e.g. Cross, F2L, OLL, PLL for CFOP; FB, SB, CMLL, LSE for Roux; LBL).
    - Render vertical stage step dividers with stage badge labels at the top of each section.
    - **Interactive Step Navigation**: Click anywhere on the chart steps to immediately jump the 3D replay cube and move table to that exact step.

## Color-Neutral 6-Face Cross & Method Breakdown
- [x] **Full 6-Face Cross Support**:
    - Complete color-neutral CFOP support for Cross on **any of the 6 faces**: White ($U$), Yellow ($D$), Green ($F$), Blue ($B$), Orange ($L$), or Red ($R$).
    - Aligned Kociemba standard 54-facelet color coordinates with 3D/2D renderers: **$U$ = White (`0xFFFFFF`), $D$ = Yellow (`0xFFD500`)**.
    - Added partial cross edge tracker (`countFaceCrossEdges`) and rotational cyclic offset alignment ($0^\circ, 90^\circ, 180^\circ, 270^\circ$) across all 24 corner-edge F2L slots.
    - Added **Auto-Detection** + **Cross Face Selector dropdown** (`select-recon-cross-face`) and live Cross Face badge (`recon-detected-face-badge`) in the reconstruction modal.
    - Added **CFOP Detailed (Cross / Pairs 1-4 / OLL / PLL)** method view with individual pair timing and recognition analytics.

# 18 AUG

## Mobile Full-Bleed Viewport Fill & Responsive Optimization
- [x] **Resolved Page Not Filling Screen Width (Black Void on Right on Mobile Chrome)**:
    - **Root Causes**:
        1. Intrinsic CSS Grid track constraints: `.app-main` and inner grids lacked `minmax(0, 1fr)` and `min-width: 0`, allowing wide children (`stage-summary-cards` single-row 4x130px, 2D Net canvas fixed width 266px, history table without horizontal scroll) to expand the layout width to ~600px, causing Chrome to scale out and leave a 40% empty void on the right.
        2. Top header grid overflow: Header brand, status badges, and action buttons row overflowed screen width in portrait orientation.
        3. Hardcoded 260px WebGL 3D cube canvas container causing clipping inside 140px stage card.
        4. Performance curve graph constructor call misalignment (`createMovementChart` vs `SolveMovementChart`).
    - **Fixes Applied**:
        1. Enhanced mobile viewport meta tag with `maximum-scale=1.0, user-scalable=no, viewport-fit=cover`.
        2. Refactored top header to use a 2-tier responsive flex layout (`.header-top-row` + 100% full-width `.app-nav-tabs`).
        3. Applied `minmax(0, 1fr)` and `min-width: 0` constraints across all cards, containers, and collapsible modules.
        4. Re-architected `.stage-summary-cards` into an adaptive 2x2 grid on mobile screens.
        5. Made 2D Net View and 3D WebGL Cube dynamically scale to container width via `ResizeObserver` and window resize hooks.
        6. Enabled `overflow-x: auto` on `.history-table-wrapper` and `.proportional-moves-flow`.
        7. Fixed performance curve initialization and deep option merges.

## Module Toggle Dock Bar Redesign (Icon + Bottom Text Label & 100% Fill Width)
- [x] **Full-Width Icon + Bottom Text Module Switcher Dock**:
    - Designed 5 vertical-stacked Dock buttons (icon on top, crisp text label below), taking 100% width equally (`flex: 1`):
        1. **本次分析** (Lightning / Pulse SVG Icon)
        2. **3D魔方** (3D Isometric Cube SVG Icon)
        3. **统计** (Bar Chart SVG Icon)
        4. **历史** (Session History List SVG Icon)
        5. **动态打乱/计时切换按钮**:
           - 当界面处于**打乱模式（Scramble）**时，按钮显示**计时秒表 SVG 图标 +「切计时」**文字（提示点击切换至计时器）。
           - 当界面处于**计时模式（Timer）**时，按钮显示**交叉打乱 SVG 图标 +「切打乱」**文字（提示点击切换至打乱公式）。
    - Applied `flex: 1` equal-width distribution with `100%` container fill, eliminating horizontal scroll while providing clear readable labels.
    - Emerald neon active glowing state + dashed muted inactive state.

## Complete SVG Vector Icon Architecture (Zero Emoji System)
- [x] **Redesigned All Icons Across Entire Application with Custom SVG Vector Graphics**:
    - Eradicated 100% of emoji glyphs across HTML, JavaScript strings, canvas overlays, and CSS components.
    - Added modular `.svg-icon`, `.brand-svg`, `.svg-chevron`, and `.status-dot` vector styling with smooth transitions and theme reactivity.
    - Replaced all components:
        - **Brand & Header**: 3D Cube vector logo, pulsing live connection LED dot, battery indicator SVG, PWA Install / Settings gear / Help circle vector buttons.
        - **Navigation Tabs**: Timer stopwatch, Analytics trend curve, Practice target circle icons.
        - **Dock Module Bar**: Analysis pulse, 3D cube, Bar stats, History document, and dynamic dual-state Stopwatch / Shuffle icons.
        - **Arena Action Buttons**: Copy clipboard, New scramble refresh cycle, Set Solved checkmark circle, Timer stopwatch, Scramble arrows.
        - **Collapsible Cards & Panels**: Breakdown pulse, Cube 3D, Stats bars, History table, and smooth animated chevron arrows.
        - **History Table Rows**: Search inspection magnifier SVG and Trash can delete SVG.
        - **Modals & Replay Controls**: Modal close cross lines, Replay prev/next and solid play/pause SVG vectors, Add custom alg plus vector.
        - **Dynamic JavaScript Banners & Chart Legends**: Clean textual status alerts with zero emoji characters.

## Unified Module Spacing & Padding Standardization (Collapsed & Expanded)
- [x] **Resolved Inconsistent Spacing Between Collapsed and Expanded Cards**:
    - Introduced standardized `--card-gap` variable (`0.85rem` desktop, `0.75rem` tablet, `0.6rem` mobile).
    - Unified `.app-main`, `.stage-section`, and `.sidebar-section` to all use the exact same `var(--card-gap)` with zero card margins.
    - Removed hardcoded inline `margin-top: 1rem;` and obsolete outer `padding: 1rem;` from `#card-history-table` / `.history-box`.
    - Standardized `.collapsible-header` (`padding: 0.65rem 0.85rem; min-height: 42px;`) and `.collapsible-body` (`padding: 0.85rem;`).
    - Added `.collapsible-body-flush` for zero-padding table wrappers.
    - Result: Pixel-perfect, completely identical vertical spacing between all 4 modules in both collapsed and expanded states.

## Typography, Alignment & Centering Standardization
- [x] **Corrected All Inconsistent Font Sizes, Unaligned Text & Off-Center Icons**:
    - Standardized font-size hierarchy across headers (`0.8rem`), values (`1.15rem`), labels (`0.68rem`), buttons (`0.74rem`), and badges (`0.72rem`).
    - Fixed top nav tabs: added `display: inline-flex; align-items: center; justify-content: center; min-height: 32px;` for vertical icon-text centering.
    - Standardized card header titles: added `white-space: nowrap; line-height: 1.2;` and unified button heights (`min-height: 28px;`) for `.btn-panel-toggle`, `#btn-reset-3d-cam`, `#btn-clear-session`, and `#select-main-recon-method`.
    - Aligned history table columns: centered `#`, `Moves`, `Date`, and `Actions` buttons (`min-width: 26px; min-height: 26px; inline-flex`), left-aligned `Time` and `Scramble`.
    - Fully centered Scramble banner and move text with balanced line-heights.

## Grid Row Stretching Fix & Material Design 3 (M3) Theme
- [x] **Eliminated Vertical Gap Between Live Cube Views and Session Statistics in Collapsed Mode**:
    - Identified root layout issue: In mobile/tablet mode, CSS Grid with `flex: 1` stretched auto-rows across the viewport height when content height was smaller than viewport height.
    - Applied `align-items: start; align-content: start; grid-auto-rows: max-content;` on `.app-main` across desktop and responsive queries.
    - Applied `justify-content: flex-start;` on `.stage-section` and `.sidebar-section`.
    - Result: Cards sit directly one after another with exact uniform `gap: var(--card-gap)` regardless of collapsed or expanded state.
- [x] **Added Material Design 3 (M3) Color Theme**:
    - Added `body.theme-material` with Google M3 design tokens (`#141218` background, `#211F26` surface container, `#2B2930` surface elevated, `#D0BCFF` primary lavender, `#E8DEF8` container text).
    - Integrated pill buttons (`border-radius: 9999px;`), rounded dialogs (`border-radius: 18px / 24px;`), and active tonal chips.
    - Added "Material Design 3 (M3)" to the theme selector in Settings.

## Skill Installation: Apple Design
- [x] **Installed Apple Design Skill**:
    - Source: `https://github.com/emilkowalski/skills/blob/main/skills/apple-design/SKILL.md`
    - Installed at:
        - Workspace: `.agents/skills/apple-design/SKILL.md`
        - Global: `~/.gemini/config/skills/apple-design/SKILL.md`
    - Scope: Apple fluid interfaces, spring physics (damping/response), interruptible gestures, momentum projection, direct 1:1 tracking, and spatial consistency.

## Apple Liquid Glass (iOS / macOS / visionOS) Theme Implementation
- [x] **Designed and Implemented Apple Fluid Interface Theme (`theme-apple`)**:
    - **Materials & Depth**: Pitch OLED black (`#000000`) base, frosted glass (`backdrop-filter: blur(28px) saturate(190%)`), specular highlight top-edge borders (`inset 0 1px 0 rgba(255,255,255,0.12)`).
    - **Apple System Palette**: iOS System Blue (`#0A84FF`), System Orange (`#FF9F0A`), System Red (`#FF453A`), System Green (`#30D158`).
    - **Segmented Controls**: iOS native segmented tab styling with translucent glass active pill indicator.
    - **Control Center Dock**: Frosted squircle module toggles with luminous active states.
    - **Instant Spring Dynamics**: `scale(0.95)` with Apple cubic-bezier `(0.25, 1, 0.5, 1)` spring press response on pointer-down.
    - **SF Typography & Negative Tracking**: Display numerals tuned with `-0.04em` tracking for optical sizing.
    - **Multimodal Feedback**: Added Web Vibration API taptic engine simulated pulses on tab switches and panel collapses.
    - Added "Apple Liquid Glass (iOS / visionOS)" to theme selector in Settings.

## Multi-Style & Multi-Color Matrix (多对多解耦主题系统)
- [x] **Decoupled Visual Design Style and Accent Color into Independent Orthogonal Selectors (M × N Matrix)**:
    - **5 种视觉主体框架 (Design Styles)**:
        1. `style-dark`: Precision Dark (极简暗黑 - 默认)
        2. `style-apple`: Apple Liquid Glass (苹果流体玻璃 iOS / visionOS)
        3. `style-material`: Material Design 3 (谷歌 Material You)
        4. `style-cyber`: Cyber Neon (赛博霓虹科幻)
        5. `style-light`: Clean Light (明亮极简日间)
    - **7 种强调主题色 (Accent Color Palette)**:
        1. `color-emerald`: 🟢 翡翠绿 (Emerald Green)
        2. `color-blue`: 🔵 苹果蓝 (Apple / System Blue)
        3. `color-purple`: 🟣 罗兰紫 (Electric Violet)
        4. `color-cyan`: 🔷 霓虹青 (Cyber Cyan)
        5. `color-amber`: 🟠 暖阳橙 (Sunset Amber)
        6. `color-crimson`: 🔴 极速红 (Crimson Red)
        7. `color-rose`: 🌸 樱花粉 (Sakura Rose)
    - **交互与存储**:
        - 在设置模态框中新增了独立的下拉菜单与 7 色彩圆形色块矩阵（Swatches Widget），支持即按即换。
        - 独立存储 `timer_ui_style` 和 `timer_accent_color` 到 localStorage。
        - 全局版本同步升级至 `v13.8`。

## Gesture-Driven Arena Redesign (打乱/计时模块纯手势交互改造 - v13.9)
- [x] **Removed Redundant Buttons from Scramble & Timer Panels**:
    - Deleted `View Scramble` button (`#btn-switch-to-scramble`) from Timer mode.
    - Deleted `Copy`, `New`, `Set Solved`, and `Timer` buttons (`.scramble-actions`) from Scramble mode.
- [x] **Tap Scramble Area to Copy Formula**:
    - Tapping/clicking `#scramble-text` directly copies the current scramble formula to clipboard.
    - Displays an Apple-style floating pill toast (`#toast-container`) with `"✓ 已复制当前打乱公式"`.
    - Triggers light haptic feedback vibration.
- [x] **Fluid Horizontal Swipe Gesture Support**:
    - **Swipe Left (往左滑)**: Go to **Previous Scramble** (`goToPreviousScramble()`) in the history stack, displaying progress e.g. `(1/3)`.
    - **Swipe Right (往右滑)**: **Refresh / Generate New Scramble** (`goToNextOrNewScramble()`), pushing to history.
    - Built with direct 1:1 pointer tracking, rubber-band resistance when at history start, velocity projection, and fluid spring animations (`cubic-bezier(0.25, 1, 0.5, 1)`).
- [x] **Scramble History & Version Upgrade**:
    - Maintained `scrambleHistory` stack with subtle `#scramble-history-badge`.
    - Bumped app version to **`v13.9`**.

## Git Repository Initialization (v13.9 Initial Release)
- [x] **Initialized Git Repository & Initial Commit**:
    - Created `.gitignore` (filtering logs, caches, OS files).
    - Created comprehensive [`README.md`](file:///data/data/com.termux/files/home/rubiks/README.md) with full architecture, feature highlights, and shortcuts guide.
    - Completed initial release commit on branch `main`.

## Pure Scramble Formula View & Direct Gestures (v14.0)
- [x] **Minimalist Pure Scramble Display (打乱页面仅显示公式)**:
    - Removed all extra headers, sublines, banners, and badges from `#scramble-box`.
    - Centered formula display `#scramble-text` with generous breathing room and clear monospace typography.
- [x] **Exact 3-Function Gesture Mapping (打乱公式三大核心功能)**:
    1. **点击复制 (Tap to Copy)**: 复制当前公式到剪贴板，弹出 Apple 胶囊 Toast 并触发微震动反馈。
    2. **从右往左滑 (Swipe from Right to Left / Drag Left 👈)**: 生成下一个 / 新打乱（`goToNextOrNewScramble()`），平滑滑出与弹簧滑入。
    3. **从左往右滑 (Swipe from Left to Right / Drag Right 👉)**: 返回上一个打乱（`goToPreviousScramble()`），历史栈回退；若已是第一个打乱则触发阻尼回弹提示。
- [x] **Version Upgrade**:
    - Bumped to `v14.0` (sw.js cache `rubiks-timer-v14.0`).

## Continuous Photo-Album Scramble Carousel (相册画廊式连贯跟手滑动 - v14.1)
- [x] **Pre-computed Multi-Card Infinite Carousel Track**:
    - Real-time pre-generation of adjacent formula cards (Left: Previous Scramble in history; Right: Pre-calculated Next/New Scramble).
    - 3-panel continuous viewport track (`#scramble-carousel-track`) with unified card gap (`14px`).
- [x] **Real-time 1:1 Seamless Tracking (跟手无缝接续)**:
    - As the user drags left, the next scramble slides in synchronously from the right edge with zero delay.
    - As the user drags right, the previous scramble slides in synchronously from the left edge.
    - iOS-inspired momentum, spring snap settle, and rubber-band edge physics.
- [x] **Version Upgrade**:
    - Bumped to `v14.1` (sw.js cache `rubiks-timer-v14.1`).

## Critically Damped Apple Motion & Zero Overshoot (精准对齐零回弹 - v14.2)
- [x] **Eliminated CSS Percentage Offset Mismatch (消除 3 倍超调问题)**:
    - Fixed track translation from percentage (`calc(-100%)` on full 3-card track) to exact pixel-based metrics (`-(width + gap)px`).
    - Handled seamless buffer reset on settled transition with zero-flash position swap.
- [x] **Critically Damped Apple Spring Curve (`cubic-bezier(0.2, 0.9, 0.3, 1)`)**:
    - Implemented Damping Ratio `1.0` (critically damped): cards slide directly into target position without overshoot, bounce-back, or oscillation.
- [x] **Version Upgrade**:
    - Bumped to `v14.2` (sw.js cache `rubiks-timer-v14.2`).

## Full-Bleed 100% Container Scramble Display (100% 充满容器无冗余边框 - v14.3)
- [x] **Eliminated Nested Margins, Gaps & Double Borders**:
    - Removed nested borders, inner box-shadows, and outer container padding on `#scramble-box`.
    - Cards and carousel track now occupy 100% of `#arena-container` edge-to-edge with zero surrounding gaps or redundant borders.
- [x] **Version Upgrade**:
    - Bumped to `v14.3` (sw.js cache `rubiks-timer-v14.3`).

## Balanced 3-Row Formula Layout (步数均布定长 3 行公式 - v14.4)
- [x] **Dynamic Mathematical Move Partitioning (`splitMovesIntoBalancedRows`)**:
    - Calculated row distribution for all formulas: 21 moves are distributed evenly into exactly 3 rows of 7 moves each (`[7, 7, 7]`).
    - Every formula has an identical, fixed 3-row height and geometry, eliminating height jumps during swipe.
- [x] **Monospace Column Uniformity**:
    - Move tokens styled with `display: inline-flex; min-width: 2.2ch; justify-content: center;` for balanced, visually aligned formula blocks.
- [x] **Version Upgrade**:
    - Bumped to `v14.4` (sw.js cache `rubiks-timer-v14.4`).

## Auto-Timer Switch & Giant High-Impact Digits (打乱完成自动切计时与巨幕计时器 - v14.5)
- [x] **Automatic Timer Transition on Scramble Complete**:
    - Bluetooth cube state tracker automatically invokes `setArenaMode('TIMER')` and sets state to `READY` when all scramble moves are matched.
- [x] **Removed Extraneous Header Badges & Sub-Tips**:
    - Removed `READY` / `IDLE` header badge and deleted `"Connect cube or turn cube to start"` sub-line.
- [x] **Giant Container-Filling Timer Digits**:
    - Upgraded `.timer-digits` font-size to `clamp(4.8rem, 18vw, 8.5rem)` with `font-weight: 800`, filling `#arena-container` with clean, modern presence.
- [x] **Version Upgrade**:
    - Bumped to `v14.5` (sw.js cache `rubiks-timer-v14.5`).

## Responsive Width-Aware Row Calculation (设备宽度自适应公式均分布局 - v14.6)
- [x] **Dynamic Width Calculation (`getOptimalRowCount`)**:
    - Dynamically evaluates container width and calculates the optimal row count (1 row for desktop/wide landscape, 2 rows for phone landscape, 3 rows for phone portrait, 4 rows for narrow cover screens).
    - Guarantees all formulas on the active screen share that identical, optimal row count and are mathematically balanced across rows.
- [x] **Real-time Orientation & Resize Adaptation**:
    - Bound to `resize` and `orientationchange` events to seamlessly re-render cards and update track offsets with zero visual jumping.
- [x] **Version Upgrade**:
    - Bumped to `v14.6` (sw.js cache `rubiks-timer-v14.6`).

## Proportional Container-Width Timer Scaling (`00.00` 填满页面宽度与高度等比 - v14.7)
- [x] **Standard 4-Digit Central-Decimal Format (`00.00`)**:
    - Formatted time output in `timer-engine.js` as `${pad(secs, 2)}.${pad(centis, 2)}` for uniform 4-digit display (`00.00`, `09.42`, `12.34`).
- [x] **Proportional Container-Query Sizing (`min(25.5cqw, 25.5vw, 36vh, 175px)`)**:
    - Fitted `.timer-digits` to 100% of the arena width in portrait mode, while maintaining proportional aspect ratio constrained by viewport height in landscape.
    - Dynamic `.timer-digits-long` support for long format solves (> 1 min).
- [x] **Version Upgrade**:
    - Bumped to `v14.7` (sw.js cache `rubiks-timer-v14.7`).

## Modal DOM Hierarchy & Universal View Access Fix (设置与弹窗全页面可用修复 - v14.8)
- [x] **Fixed Nested Modal Hierarchy in `index.html`**:
    - Resolved DOM nesting defect where `#modal-settings`, `#modal-help`, and other dialogs were trapped inside `#view-practice`.
    - Because `#view-practice` was `display: none` when on Timer or Trends pages, settings modal could not be shown.
    - Lifted all modals to top-level `<body>` children outside `<main>`, ensuring Settings & Help open seamlessly from any view tab (Timer, Trends, Practice).
- [x] **Added Click-Outside Backdrop Dismissal**:
    - Added click listener on `.modal-backdrop` to dismiss modals when clicking outside the dialog card.
- [x] **Version Upgrade**:
    - Bumped to `v14.8` (sw.js cache `rubiks-timer-v14.8`).

## Unified Bluetooth Capsule, Diagnostics Log & Synchronized Top 3 Rows (合并蓝牙图标与统一前三行高度 - v14.9)
- [x] **Unified Connect/Disconnect Bluetooth Capsule (`#btn-bluetooth-capsule`)**:
    - Merged separate connect and disconnect buttons into a single smart capsule button.
    - When disconnected: shows Bluetooth icon and "连接魔方", clicking initiates Bluetooth connection.
    - When connected: shows battery icon with live % (`85%`) and green pulsing dot.
    - When clicked while connected: opens the comprehensive Bluetooth Diagnostics & Live Logs modal.
- [x] **Bluetooth Diagnostics & Live Logs Modal (`#modal-bluetooth-log`)**:
    - Real-time display of device model, MAC address, connection status, visual battery gauge bar, and live event/packet stream.
    - Integrated disconnect button, recalibrate button, copy logs, and clear logs actions.
- [x] **Synchronized Height for Top 3 Rows (统一前三行高度)**:
    - Set Row 1 (`.header-top-row`), Row 2 (`.app-nav-tabs`), and Row 3 (`.module-toggle-toolbar`) to identical 42px height (`height: 42px; min-height: 42px;`).
    - Standardized internal padding and vertical centering across all header and stage dock bars.
- [x] **Version Upgrade**:
    - Bumped to `v14.9` (sw.js cache `rubiks-timer-v14.9`).

## 40px Synchronized Rows & Square Action Buttons (每行40px与第一行统一正方形按钮 - v15.0)
- [x] **Strict 40px Height for All 3 Top Rows (每行40px)**:
    - Row 1 (`.header-top-row`): `height: 40px; min-height: 40px; max-height: 40px;`
    - Row 2 (`.app-nav-tabs`): `height: 40px; min-height: 40px; max-height: 40px;`
    - Row 3 (`.module-toggle-toolbar`): `height: 40px; min-height: 40px; max-height: 40px;`
- [x] **Unified 32×32 Square Buttons in Row 1 (第一行三个按钮统一宽度正方形)**:
    - Button 1 (Bluetooth): 32px × 32px square icon button with centered Bluetooth/Battery SVG and corner status indicator.
    - Button 2 (Settings): 32px × 32px square icon button with ⚙️ icon.
    - Button 3 (Help): 32px × 32px square icon button with ❓ icon.
    - All 3 buttons share exact identical geometry, border radius, and aspect ratio.
- [x] **Version Upgrade**:
    - Bumped to `v15.0` (sw.js cache `rubiks-timer-v15.0`).

## Designmodo Flat-UI Integration & 6.7" Screen Touch Target Optimization (经典纯平设计与6.7寸屏大按钮适配 - v15.1)
- [x] **Designmodo Flat-UI Theme Engine (`body.style-flat`)**:
    - Implemented authentic Designmodo Flat-UI system tokens: Midnight Blue (`#2C3E50`), Wet Asphalt (`#34495E`), Clouds (`#ECF0F1`), Silver (`#BDC3C7`).
    - Flat 2D solid buttons with 3px solid bottom border offset and physical down-press micro-animation (`translateY(2px)`).
    - 0 skeuomorphic drop shadows, 0 glassy blurs, crisp 4px-6px radii.
    - Added `Flat Turquoise` (`#1ABC9C`) accent color and quick color swatch.
- [x] **6.7" Mobile Screen Touch Optimization (大屏幕手感升级)**:
    - Expanded top 3 rows height to Apple HIG gold standard `44px` (`min-height: 44px; height: 44px;`).
    - Increased Row 1 square buttons to `38px × 38px` with enlarged `19px` icons (+41% touch surface area) for single-handed thumb taps on 6.7-inch screens.
- [x] **Version Upgrade**:
    - Bumped to `v15.1` (sw.js cache `rubiks-timer-v15.1`).

## Lazy Scramble Generation on First Move & In-Place Scramble Formula Repathing (任意面转动触发打乱与打乱出错原公式实时更新 - v15.2)
- [x] **Lazy Scramble Calculation on First Move (复原完成后先不计算打乱，转动任意面触发)**:
    - Solve finished state leaves timer at completed solve time without pre-generating or switching to next scramble.
    - Turning ANY face on the physical cube generates a new standard WCA random state scramble starting with that exact first turn (`generateWcaScrambleWithFirstMove`).
    - Immediately flips arena to Scramble view with Step 1 marked complete and Step 2 highlighted.
- [x] **In-Place Scramble Error Repathing (打乱出错原公式更新剩下所有正确步骤)**:
    - When a wrong turn occurs during scrambling, dynamically solves from the current physical cube state to the target scrambled state using `min2phase`.
    - Updates remaining steps in-place directly within the active scramble formula card (`repathRemaining`).
    - User seamlessly continues following the updated remaining steps in the formula to completion.
- [x] **Version Upgrade**:
    - Bumped to `v15.2` (sw.js cache `rubiks-timer-v15.2`).

## Bluetooth Capsule Click Fix & PWA Download Button Removal (蓝牙连接按钮修复与删除下载按钮 - v15.3)
- [x] **Fixed Bluetooth Capsule Connection Click Ineffectiveness (修复蓝牙按钮点击失效)**:
    - Removed invalid HTML nested `<button>` tags inside `#btn-bluetooth-capsule` that caused browser DOM parser to prematurely close the outer button and drop click events.
    - Added `pointer-events: none` to all inner SVG icons and text spans to guarantee direct bubble-free tap response.
    - Updated click event listeners with `e.preventDefault()` and `e.stopPropagation()` for instant, reliable connection trigger.
- [x] **Removed PWA Install / Download Button (彻底删除蓝牙旁边的下载按钮)**:
    - Completely stripped `#btn-install-pwa` from header actions.
    - Removed `beforeinstallprompt` display injection in `ui-controller.js`.
- [x] **Version Upgrade**:
    - Bumped to `v15.3` (sw.js cache `rubiks-timer-v15.3`).

## High-Density Full-Width Performance Curve with Embedded Stage Metrics (阶段步数与TPS直显曲线与宽度拉满 - v15.4)
- [x] **Direct On-Curve Stage Metrics Rendering (各阶段步数与TPS直显在曲线上)**:
    - Replaced separate bulky stage cards with embedded stage tags drawn directly above/in each segment of the curve (`CROSS`, `F2L 1..4`, `OLL`, `PLL`, `ROUX`, `LBL`).
    - Displays exact move count (`6步`), instant stage TPS (`4.8 TPS`), and duration directly atop each stage's color-banded segment.
    - Smart text-wrapping and font scaling for narrow/fast sub-stages.
- [x] **Expanded Full-Width Curve Arena (曲线宽度与高度拉满)**:
    - Expanded chart canvas height to 240px and reduced internal padding to utilize 96%+ of available horizontal screen width.
    - Removed redundant margins, borders, and empty card slots for maximum information density.
- [x] **Version Upgrade**:
    - Bumped to `v15.4` (sw.js cache `rubiks-timer-v15.4`).

## Telemetry-Only Breakdown Header & Staggered Collision-Free On-Curve Badges (纯数据指标栏与错峰防重叠阶段曲线上移 - v15.5)
- [x] **Telemetry-Only Breakdown Header (删除标题只显示步数/时间/tps/ao3/ao5/ao12)**:
    - Completely removed redundant card title and method dropdown from the inline breakdown header.
    - Replaced with high-density compact telemetry strip: `步数`, `时间`, `TPS`, `ao3`, `ao5`, `ao12` and a sleek collapse toggle button.
- [x] **Relocated Solve Method Selector to Settings (方法选择移入设置，默认CFOP详细对 cffffop)**:
    - Added "Solve Analysis Method" selector in Settings Modal (`CFOP 详细对 cffffop` as default, `CFOP`, `Roux`, `LBL`).
- [x] **Staggered Multi-Tier Anti-Collision Stage Badges (错峰防重叠算法解决快速阶段显示空间不足)**:
    - Implemented a 2-tier staggered layout algorithm with guide leader lines and anchor points.
    - Fast/narrow stages (e.g. 1-2 move Cross or AUF) cleanly display without text truncation or horizontal collisions.
- [x] **Version Upgrade**:
    - Bumped to `v15.5` (sw.js cache `rubiks-timer-v15.5`).

## Ultra-Clean Numeric-Only Stage Badges with High Contrast Dark Glass Pills (纯时间TPS数值直显与高对比度暗色微卡 - v15.6)
- [x] **Removed Stage Names & Units (完全隐藏阶段名称与单位)**:
    - Completely stripped text like `CROSS`, `F2L`, `OLL`, `PLL` and units (`s`, `m`, `TPS`, `步`, `T`).
    - Only renders clean numeric pair: `[Time] · [TPS]` (e.g. `1.24 · 4.8`).
- [x] **High-Contrast Dark Glass Pill Container (暗色高对比微容器彻底解决浅色背景白字看不清)**:
    - Rendered badges on dark glass pills (`rgba(15, 23, 42, 0.92)`) with stage-colored glowing borders.
    - Crisp white/colored numeric text is 100% legible on all light and dark themes.
    - Pill width reduced to ultra-compact `46px` and height `18px`, eliminating all text overflow.
- [x] **Version Upgrade**:
    - Bumped to `v15.6` (sw.js cache `rubiks-timer-v15.6`).

## Dynamic Auto-Measured Pill Widths & Zero-Overflow Layout Guarantee (动态字宽测量自适应与零溢出保证 - v15.7)
- [x] **Exact Canvas Text Measurement & Dynamic Auto-Sized Pills (精确文本测量自适应微卡宽度)**:
    - Sized every badge dynamically via `ctx.measureText` with guaranteed 5px side paddings.
    - Zero character truncation, zero border overflow, and seamless fit across all screen resolutions.
- [x] **Responsive Mobile Telemetry Strip (移动端高密度统计条自适应)**:
    - Optimized `#main-solve-telemetry-bar` with ultra-compact pills to prevent card header text clipping.
- [x] **Version Upgrade**:
    - Bumped to `v15.7` (sw.js cache `rubiks-timer-v15.7`).

## Apache ECharts Integration & World-Class Visualization Upgrade (全面接入 Apache ECharts 专业图表引擎 - v15.8)
- [x] **Integrated Apache ECharts (本地离线引入 echarts.min.js)**:
    - Downloaded full-featured `echarts.min.js` locally into the project with complete PWA Service Worker offline caching.
- [x] **Rebuilt Solve Movement Breakdown with ECharts (基于 ECharts 重构复原分析曲线)**:
    - **Dual Y-Axes**: Left axis for Cumulative Solve Time in seconds (`时间 (s)`), Right axis for instant TPS (`TPS`).
    - **Smooth Glowing Splines**: Emerald time spline (`#10B981`) with soft linear gradient area fill, and Cyan TPS velocity spline (`#06B6D4`).
    - **Native Stage Bands & Dividers (`markArea`)**: Beautiful color-banded backgrounds for each stage (`Cross`, `F2L 1~4`, `OLL`, `PLL`) with high-contrast embedded stage badges (`Time · TPS`).
    - **High-Precision Magnetic Tooltip (手势高精度磁吸浮窗)**: Sliding on the curve instantly snaps to every step displaying step notation (`Step #14: U'`), duration (`+0.18s`), cumulative time (`3.42s`), and instant TPS (`5.56 TPS`).
- [x] **Version Upgrade**:
    - Bumped to `v15.8` (sw.js cache `rubiks-timer-v15.8`).

## Vertically Stacked & Enlarged Moves and TPS on ECharts Stage Badges (步数与TPS上下叠放并加粗放大 - v15.9)
- [x] **Vertically Stacked Multi-Line Stage Badges (上下叠放双行微卡)**:
    - **Line 1 (步数)**: Exact stage move count (e.g. `6步`) rendered in extra bold **13px** `#FFFFFF`.
    - **Line 2 (TPS)**: Stage TPS (e.g. `4.8`) rendered in bold **11px** Sky Blue `#38BDF8`.
- [x] **Compact High-Density Card Dimensions (微卡宽度压缩至 28px，数字大且绝不占横向空间)**:
    - Squeezed badge width from 50px down to ~28px, allowing large bold numbers even in narrow 1-2 move stages without clipping.
    - Adjusted grid top margin to 58px for seamless vertical breathing room.
- [x] **Version Upgrade**:
    - Bumped to `v15.9` (sw.js cache `rubiks-timer-v15.9`).
