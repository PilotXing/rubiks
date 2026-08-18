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
