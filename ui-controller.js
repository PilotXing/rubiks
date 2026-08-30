/**
 * ui-controller.js
 * Main User Interface Controller for Bluetooth Speedcube Timer
 * Implements Movement Color-Coding, Multi-Method Stage Analysis, Trend Curves (AoX), and Algorithm Practice Mode.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // -------------------------------------------------------------
    // 1. Initialize Core Subsystems
    // -------------------------------------------------------------
    const RubiksCube = CubeEngine.RubiksCube;
    const ScrambleTracker = CubeEngine.ScrambleProgressTracker;
    const generateWcaScramble = CubeEngine.generateWcaScramble;
    const generateWcaScrambleWithFirstMove = CubeEngine.generateWcaScrambleWithFirstMove;
    const formatTime = TimerEngine.formatTime;

    const bluetooth = new GanBluetooth.GanBluetoothAdapter({
        macOverride: localStorage.getItem('cube_mac_override') || "0c:3d:5e:be:8e:95"
    });

    const timer = new TimerEngine.TimerController();
    const session = timer.session;
    const sound = AudioSynth;
    const tracker = new ScrambleTracker();

    // Physical and Virtual Cube state tracking
    const physicalCube = new RubiksCube();

    // DOM Elements Map
    const elements = {
        // Navigation Tabs & Views
        tabTimer: document.getElementById('tab-timer'),
        tabAnalytics: document.getElementById('tab-analytics'),
        tabPractice: document.getElementById('tab-practice'),
        viewTimer: document.getElementById('view-timer'),
        viewAnalytics: document.getElementById('view-analytics'),
        viewPractice: document.getElementById('view-practice'),

        // Bluetooth Capsule & Header
        btnBtCapsule: document.getElementById('btn-bluetooth-capsule'),
        btCapsuleLabel: document.getElementById('bt-capsule-label'),
        cubeStatusBadge: document.getElementById('cube-status-badge'),
        cubeBatteryBadge: document.getElementById('cube-battery-badge'),
        btnSettings: document.getElementById('btn-settings'),
        btnHelp: document.getElementById('btn-help'),
        modalBtLog: document.getElementById('modal-bluetooth-log'),
        btnCloseBtLog: document.getElementById('btn-close-bt-log'),
        btModalDeviceName: document.getElementById('bt-modal-device-name'),
        btModalBatteryVal: document.getElementById('bt-modal-battery-val'),
        btModalBatteryFill: document.getElementById('bt-modal-battery-fill'),
        btModalStatusBadge: document.getElementById('bt-modal-status-badge'),
        btModalMacVal: document.getElementById('bt-modal-mac-val'),
        btLogTerminal: document.getElementById('bt-log-terminal'),
        btnCopyBtLog: document.getElementById('btn-copy-bt-log'),
        btnClearBtLog: document.getElementById('btn-clear-bt-log'),
        btnModalDisconnect: document.getElementById('btn-modal-disconnect'),
        btnModalRecalibrate: document.getElementById('btn-modal-recalibrate'),

        // Scramble Box & Timer Arena
        scrambleBox: document.getElementById('scramble-box'),
        scrambleText: document.getElementById('scramble-text'),
        scrambleBanner: document.getElementById('scramble-banner'),
        btnNewScramble: document.getElementById('btn-new-scramble'),
        btnRecalibrate: document.getElementById('btn-recalibrate'),
        btnCopyScramble: document.getElementById('btn-copy-scramble'),

        // Timer Display
        mainTimerContainer: document.getElementById('main-timer-container'),
        timerDisplay: document.getElementById('timer-display'),
        timerSubDisplay: document.getElementById('timer-sub-display'),
        timerStateBadge: document.getElementById('timer-state-badge'),
        liveMovesBadge: document.getElementById('live-moves-badge'),
        liveTpsBadge: document.getElementById('live-tps-badge'),
        liveLastMoveBadge: document.getElementById('live-last-move-badge'),
        // Arena & Central Swap
        arenaContainer: document.getElementById('arena-container'),
        btnSwitchToTimer: document.getElementById('btn-switch-to-timer'),
        btnSwitchToScramble: document.getElementById('btn-switch-to-scramble'),
        scrambleStepBadge: document.getElementById('scramble-step-badge'),

        // Inline Latest Solve Breakdown & Performance Curve
        mainSolveBreakdownCard: document.getElementById('main-solve-breakdown-card'),
        mainStatMoves: document.getElementById('main-stat-moves'),
        mainStatTime: document.getElementById('main-stat-time'),
        mainStatTps: document.getElementById('main-stat-tps'),
        mainStatAo3: document.getElementById('main-stat-ao3'),
        mainStatAo5: document.getElementById('main-stat-ao5'),
        mainStatAo12: document.getElementById('main-stat-ao12'),
        selectSettingsReconMethod: document.getElementById('select-settings-recon-method'),
        canvasMainSolveGraph: document.getElementById('chart-main-solve-graph') || document.getElementById('canvas-main-solve-graph'),
        toggleMainCumulative: document.getElementById('toggle-main-cumulative'),
        toggleMainTps: document.getElementById('toggle-main-tps'),
        toggleMainDerivative: document.getElementById('toggle-main-derivative'),
        mainProportionalFlow: document.getElementById('main-proportional-flow'),

        // 3D & 2D Cube Stages
        cube3dContainer: document.getElementById('cube-3d-container'),
        canvas2d: document.getElementById('canvas-2d'),
        btnReset3dCam: document.getElementById('btn-reset-3d-cam'),

        // Session Stats Summary
        statCount: document.getElementById('stat-count'),
        statBest: document.getElementById('stat-best'),
        statCurrentAo5: document.getElementById('stat-ao5'),
        statBestAo5: document.getElementById('stat-best-ao5'),
        statCurrentAo12: document.getElementById('stat-ao12'),
        statBestAo12: document.getElementById('stat-best-ao12'),
        statMean: document.getElementById('stat-mean'),
        statStdDev: document.getElementById('stat-stddev'),

        // History Table
        historyTbody: document.getElementById('history-tbody'),
        btnClearSession: document.getElementById('btn-clear-session'),
        btnExportJson: document.getElementById('btn-export-json'),
        btnExportCsv: document.getElementById('btn-export-csv'),
        btnExportCstimer: document.getElementById('btn-export-cstimer'),

        // Modals
        modalSettings: document.getElementById('modal-settings'),
        modalHelp: document.getElementById('modal-help'),
        modalReconstruct: document.getElementById('modal-reconstruct'),
        modalCustomAlg: document.getElementById('modal-custom-alg'),
        btnCloseSettings: document.getElementById('btn-close-settings'),
        btnCloseHelp: document.getElementById('btn-close-help'),
        btnCloseReconstruct: document.getElementById('btn-close-reconstruct'),
        btnCloseCustomAlg: document.getElementById('btn-close-custom-alg'),

        // Settings Inputs
        inputMacOverride: document.getElementById('input-mac-override'),
        btnSaveMac: document.getElementById('btn-save-mac'),
        selectMoveMetric: document.getElementById('select-move-metric'),
        toggleInspection: document.getElementById('toggle-inspection'),
        toggleScrambleAlerts: document.getElementById('toggle-scramble-alerts'),
        toggleSound: document.getElementById('toggle-sound'),
        toggleVoice: document.getElementById('toggle-voice'),
        selectBtTimeout: document.getElementById('select-bt-timeout'),
        selectScrambleDisplayStyle: document.getElementById('select-scramble-display-style'),
        groupScrambleVisibleSteps: document.getElementById('group-scramble-visible-steps'),
        selectScrambleVisiblePrev: document.getElementById('select-scramble-visible-prev'),
        selectScrambleVisibleNext: document.getElementById('select-scramble-visible-next'),
        selectUiStyle: document.getElementById('select-ui-style'),
        selectAccentColor: document.getElementById('select-accent-color'),
        selectTheme: document.getElementById('select-theme'),

        btnCopyReconData: document.getElementById('btn-copy-recon-data'),
        reconSolveTime: document.getElementById('recon-solve-time'),
        reconScramble: document.getElementById('recon-scramble'),
        reconMoveCount: document.getElementById('recon-move-count'),
        reconTps: document.getElementById('recon-tps'),
        selectReconMethod: document.getElementById('select-recon-method'),
        selectReconCrossFace: document.getElementById('select-recon-cross-face'),
        reconDetectedFaceBadge: document.getElementById('recon-detected-face-badge'),
        reconCrossFaceGroup: document.getElementById('recon-cross-face-group'),
        reconStageCards: document.getElementById('recon-stage-cards'),
        reconProportionalFlow: document.getElementById('recon-proportional-flow'),
        reconTbody: document.getElementById('recon-tbody'),
        btnReconPlay: document.getElementById('btn-recon-play'),
        btnReconStepBack: document.getElementById('btn-recon-prev'),
        btnReconStepForward: document.getElementById('btn-recon-next'),
        reconSlider: document.getElementById('recon-slider'),
        reconStepLabel: document.getElementById('recon-step-label'),
        reconCubeContainer: document.getElementById('recon-cube-container'),
        canvasTpsGraph: document.getElementById('canvas-tps-graph'),
        toggleReconCumulative: document.getElementById('toggle-recon-cumulative'),
        toggleReconDerivative: document.getElementById('toggle-recon-derivative'),
        toggleReconTps: document.getElementById('toggle-recon-tps'),
        toggleReconStageBands: document.getElementById('toggle-recon-stage-bands'),
        selectReconOverlay: document.getElementById('select-recon-overlay'),

        // Data Analysis & Trends
        canvasTrendMain: document.getElementById('canvas-trend-main'),
        btnRefreshTrend: document.getElementById('btn-refresh-trend'),
        selectTrendYRange: document.getElementById('select-trend-yrange'),
        trendCustomYGroup: document.getElementById('trend-custom-y-group'),
        inputTrendMinY: document.getElementById('input-trend-min-y'),
        inputTrendMaxY: document.getElementById('input-trend-max-y'),
        btnToggleCurveStyles: document.getElementById('btn-toggle-curve-styles'),
        trendStylesPanel: document.getElementById('trend-styles-panel'),
        colorSeriesRaw: document.getElementById('color-series-raw'),
        widthSeriesRaw: document.getElementById('width-series-raw'),
        colorSeriesAo5: document.getElementById('color-series-ao5'),
        widthSeriesAo5: document.getElementById('width-series-ao5'),
        colorSeriesAo12: document.getElementById('color-series-ao12'),
        widthSeriesAo12: document.getElementById('width-series-ao12'),
        colorSeriesAox: document.getElementById('color-series-aox'),
        widthSeriesAox: document.getElementById('width-series-aox'),
        toggleSeriesRaw: document.getElementById('toggle-series-raw'),
        toggleSeriesAo5: document.getElementById('toggle-series-ao5'),
        toggleSeriesAo12: document.getElementById('toggle-series-ao12'),
        toggleSeriesAox: document.getElementById('toggle-series-aox'),
        inputCustomX: document.getElementById('input-custom-x'),
        toggleTrendSmooth: document.getElementById('toggle-trend-smooth'),

        // Algorithm Practice Mode
        selectAlgCategory: document.getElementById('select-alg-category'),
        inputSearchAlg: document.getElementById('input-search-alg'),
        caseListContainer: document.getElementById('case-list-container'),
        practiceCaseName: document.getElementById('practice-case-name'),
        practiceCaseGroup: document.getElementById('practice-case-group'),
        practiceCaseMoves: document.getElementById('practice-case-moves'),
        practiceAlgBox: document.getElementById('practice-alg-box'),
        practiceStatusBanner: document.getElementById('practice-status-banner'),
        practiceTimerDigits: document.getElementById('practice-timer-digits'),
        practiceLiveTps: document.getElementById('practice-live-tps'),
        practiceLiveStep: document.getElementById('practice-live-step'),
        btnResetPractice: document.getElementById('btn-reset-practice'),
        btnAddCustomAlg: document.getElementById('btn-add-custom-alg'),
        btnSaveCustomAlg: document.getElementById('btn-save-custom-alg'),
        inputCustomAlgName: document.getElementById('input-custom-alg-name'),
        inputCustomAlgGroup: document.getElementById('input-custom-alg-group'),
        inputCustomAlgMoves: document.getElementById('input-custom-alg-moves'),
        inputCustomAlgDesc: document.getElementById('input-custom-alg-desc')
    };

    // Renderers
    let renderer3D = null;
    let renderer2D = null;
    let reconRenderer3D = null;
    let trendChart = null;
    let movementChart = null;

    try {
        const initialW = elements.cube3dContainer ? (elements.cube3dContainer.clientWidth || 200) : 200;
        const initialH = elements.cube3dContainer ? (elements.cube3dContainer.clientHeight || 180) : 180;
        const sz = Math.min(initialW, initialH) || 180;
        renderer3D = new CubeRenderer3D(elements.cube3dContainer, { width: sz, height: sz });
    } catch (e) {
        console.warn("WebGL 3D renderer init fallback:", e);
    }
    renderer2D = new CubeRenderer2D(elements.canvas2d, { size: 13, gap: 2, blockGap: 5 });

    if (window.ResizeObserver && elements.cube3dContainer) {
        const ro = new ResizeObserver(entries => {
            for (const entry of entries) {
                const w = entry.contentRect.width;
                const h = entry.contentRect.height;
                if (w > 0 && h > 0 && renderer3D) {
                    const sz = Math.min(w, h);
                    renderer3D.resize(sz, sz);
                }
            }
        });
        ro.observe(elements.cube3dContainer);
    }

    if (elements.canvasTrendMain && window.ChartEngine) {
        trendChart = new ChartEngine.TrendChart(elements.canvasTrendMain);
    }
    if (elements.canvasTpsGraph && window.ChartEngine) {
        movementChart = new ChartEngine.SolveMovementChart(elements.canvasTpsGraph);
    }

    // State Variables: Style & Color Themes (Orthogonal Multi-Switching)
    let currentView = 'view-timer';
    let currentScramble = '';
    let isAwaitingScrambleTurn = false;
    let currentUiStyle = localStorage.getItem('timer_ui_style') || localStorage.getItem('timer_theme') || 'dark';
    let currentAccentColor = localStorage.getItem('timer_accent_color') || 'emerald';

    function applyThemeAndStyle(style, color) {
        currentUiStyle = style;
        currentAccentColor = color;
        document.body.className = `style-${style} color-${color} theme-${style}`;
        localStorage.setItem('timer_ui_style', style);
        localStorage.setItem('timer_accent_color', color);
        localStorage.setItem('timer_theme', style);

        if (elements.selectUiStyle) elements.selectUiStyle.value = style;
        if (elements.selectAccentColor) elements.selectAccentColor.value = color;
        if (elements.selectTheme) elements.selectTheme.value = style;

        document.querySelectorAll('.swatch-btn[data-color]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.color === color);
        });
    }

    applyThemeAndStyle(currentUiStyle, currentAccentColor);

    // Alert & Audio Settings
    let scrambleAlertsEnabled = localStorage.getItem('scramble_alerts_enabled') !== 'false';
    let wasDeviated = false;
    sound.enabled = localStorage.getItem('sound_enabled') !== 'false';
    sound.voiceEnabled = localStorage.getItem('voice_enabled') !== 'false';
    timer.inspectionEnabled = localStorage.getItem('inspection_enabled') === 'true';

    // Move Counting Metric (OBTM vs QTM vs ETM)
    let currentMoveMetric = localStorage.getItem('move_counting_metric') || 'OBTM';
    if (elements.selectMoveMetric) {
        elements.selectMoveMetric.value = currentMoveMetric;
        elements.selectMoveMetric.addEventListener('change', () => {
            currentMoveMetric = elements.selectMoveMetric.value;
            localStorage.setItem('move_counting_metric', currentMoveMetric);
            renderStatsAndHistory();
        });
    }

    // Scramble Display Style & Visible Steps Settings
    let scrambleDisplayStyle = localStorage.getItem('rubiks_scramble_display_style') || 'reel';
    let scrambleVisiblePrev = parseInt(localStorage.getItem('rubiks_scramble_visible_prev') || '1', 10);
    let scrambleVisibleNext = parseInt(localStorage.getItem('rubiks_scramble_visible_next') || '5', 10);

    if (elements.selectScrambleDisplayStyle) {
        elements.selectScrambleDisplayStyle.value = scrambleDisplayStyle;
        if (elements.groupScrambleVisibleSteps) {
            elements.groupScrambleVisibleSteps.style.display = scrambleDisplayStyle === 'reel' ? 'block' : 'none';
        }
        elements.selectScrambleDisplayStyle.addEventListener('change', () => {
            scrambleDisplayStyle = elements.selectScrambleDisplayStyle.value;
            localStorage.setItem('rubiks_scramble_display_style', scrambleDisplayStyle);
            if (elements.groupScrambleVisibleSteps) {
                elements.groupScrambleVisibleSteps.style.display = scrambleDisplayStyle === 'reel' ? 'block' : 'none';
            }
            renderScrambleDisplay(tracker ? tracker.currentStep : 0);
        });
    }

    if (elements.selectScrambleVisiblePrev) {
        elements.selectScrambleVisiblePrev.value = String(scrambleVisiblePrev);
        elements.selectScrambleVisiblePrev.addEventListener('change', () => {
            scrambleVisiblePrev = parseInt(elements.selectScrambleVisiblePrev.value, 10);
            localStorage.setItem('rubiks_scramble_visible_prev', scrambleVisiblePrev);
            renderScrambleDisplay(tracker ? tracker.currentStep : 0);
        });
    }

    if (elements.selectScrambleVisibleNext) {
        elements.selectScrambleVisibleNext.value = String(scrambleVisibleNext);
        elements.selectScrambleVisibleNext.addEventListener('change', () => {
            scrambleVisibleNext = parseInt(elements.selectScrambleVisibleNext.value, 10);
            localStorage.setItem('rubiks_scramble_visible_next', scrambleVisibleNext);
            renderScrambleDisplay(tracker ? tracker.currentStep : 0);
        });
    }

    // Battery-Saver Inactivity Timeout (Default 2 minutes / 120 seconds)
    let btInactivityTimeoutSec = parseInt(localStorage.getItem('bt_inactivity_timeout') ?? '120', 10);
    let btInactivityTimer = null;

    function resetBtInactivityTimer() {
        if (btInactivityTimer) {
            clearTimeout(btInactivityTimer);
            btInactivityTimer = null;
        }

        if (bluetooth && bluetooth.state === 'CONNECTED' && btInactivityTimeoutSec > 0) {
            btInactivityTimer = setTimeout(() => {
                if (bluetooth && bluetooth.state === 'CONNECTED') {
                    console.log(`[Bluetooth] Inactivity timeout (${btInactivityTimeoutSec}s) reached. Disconnecting to save cube battery.`);
                    bluetooth.disconnect();
                    if (elements.cubeStatusBadge) {
                        elements.cubeStatusBadge.innerHTML = '<span class="status-dot"></span> Disconnected (Battery Saver)';
                        elements.cubeStatusBadge.className = 'badge badge-disconnected';
                    }
                    sound.playScrambleWarning();
                }
            }, btInactivityTimeoutSec * 1000);
        }
    }

    // Helper: Move Color Class Generator (Phase 2)
    function getMoveColorClass(moveStr) {
        if (!moveStr) return '';
        const face = moveStr.trim().charAt(0).toLowerCase();
        if (['u', 'd', 'r', 'l', 'f', 'b', 'm', 'e', 's', 'x', 'y', 'z'].includes(face)) {
            return `move-color-${face}`;
        }
        return '';
    }

    // Helper: Apple Taptic / Vibration Multimodal Feedback (§13)
    function triggerHaptic(type = 'light') {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try {
                if (type === 'light') navigator.vibrate(10);
                else if (type === 'medium') navigator.vibrate(22);
                else if (type === 'success') navigator.vibrate([15, 30, 20]);
            } catch (_) {}
        }
    }

    // -------------------------------------------------------------
    // 2. Navigation Tabs & Views Controller
    // -------------------------------------------------------------
    function switchView(viewId) {
        triggerHaptic('light');
        currentView = viewId;
        [elements.tabTimer, elements.tabAnalytics, elements.tabPractice].forEach(tab => {
            if (tab) tab.classList.toggle('active', tab.dataset.view === viewId);
        });

        if (elements.viewTimer) elements.viewTimer.style.display = viewId === 'view-timer' ? 'contents' : 'none';
        if (elements.viewAnalytics) elements.viewAnalytics.classList.toggle('active', viewId === 'view-analytics');
        if (elements.viewPractice) elements.viewPractice.classList.toggle('active', viewId === 'view-practice');

        if (viewId === 'view-analytics' && trendChart) {
            trendChart.setData(session.solves);
        } else if (viewId === 'view-practice') {
            initPracticeView();
        }
    }

    if (elements.tabTimer) elements.tabTimer.addEventListener('click', () => switchView('view-timer'));
    if (elements.tabAnalytics) elements.tabAnalytics.addEventListener('click', () => switchView('view-analytics'));
    if (elements.tabPractice) elements.tabPractice.addEventListener('click', () => switchView('view-practice'));

    // -------------------------------------------------------------
    // -------------------------------------------------------------
    // 3. Scramble Management & Arena Swapping
    // -------------------------------------------------------------
    function updateArenaToggleBtn(mode) {
        const btn = document.getElementById('btn-toggle-arena-view');
        if (!btn) return;
        if (mode === 'SCRAMBLE') {
            // UI is currently in Scramble mode -> button shows option to switch to Timer
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="13" r="8"></circle>
                    <polyline points="12 9 12 13 15 13"></polyline>
                    <path d="M12 2v3M9 2h6"></path>
                </svg>
                <span class="module-chip-text">切计时</span>
            `;
            btn.title = "切换到大字计时器 (Switch to Timer)";
            btn.setAttribute('aria-label', "切换到大字计时器");
        } else {
            // UI is currently in Timer mode -> button shows option to switch to Scramble
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="16 3 21 3 21 8"></polyline>
                    <line x1="4" y1="20" x2="21" y2="3"></line>
                    <polyline points="21 16 21 21 16 21"></polyline>
                    <line x1="15" y1="15" x2="21" y2="21"></line>
                    <line x1="4" y1="4" x2="9" y2="9"></line>
                </svg>
                <span class="module-chip-text">切打乱</span>
            `;
            btn.title = "切换到打乱公式 (Switch to Scramble)";
            btn.setAttribute('aria-label', "切换到打乱公式");
        }
    }

    function setArenaMode(mode) {
        // mode: 'SCRAMBLE' or 'TIMER'
        if (mode === 'SCRAMBLE') {
            if (elements.scrambleBox) {
                elements.scrambleBox.style.setProperty('display', 'flex', 'important');
                elements.scrambleBox.style.setProperty('flex-direction', 'column', 'important');
                elements.scrambleBox.style.setProperty('width', '100%', 'important');
            }
            if (elements.mainTimerContainer) {
                elements.mainTimerContainer.style.setProperty('display', 'none', 'important');
            }
            if (elements.arenaContainer) {
                elements.arenaContainer.classList.add('mode-scramble');
                elements.arenaContainer.classList.remove('mode-timer');
            }
        } else {
            if (elements.scrambleBox) {
                elements.scrambleBox.style.setProperty('display', 'none', 'important');
            }
            if (elements.mainTimerContainer) {
                elements.mainTimerContainer.style.setProperty('display', 'flex', 'important');
                elements.mainTimerContainer.style.setProperty('flex-direction', 'column', 'important');
                elements.mainTimerContainer.style.setProperty('width', '100%', 'important');
            }
            if (elements.arenaContainer) {
                elements.arenaContainer.classList.add('mode-timer');
                elements.arenaContainer.classList.remove('mode-scramble');
            }
        }
        updateArenaToggleBtn(mode);
    }

    if (elements.btnSwitchToTimer) {
        elements.btnSwitchToTimer.addEventListener('click', () => {
            setArenaMode('TIMER');
            timer.setState('READY');
            if (elements.timerStateBadge) {
                elements.timerStateBadge.textContent = 'READY';
                elements.timerStateBadge.className = 'badge badge-ready';
            }
        });
    }
    if (elements.btnSwitchToScramble) {
        elements.btnSwitchToScramble.addEventListener('click', () => {
            setArenaMode('SCRAMBLE');
            timer.setState('SCRAMBLING');
            if (elements.timerStateBadge) {
                elements.timerStateBadge.textContent = 'SCRAMBLING';
                elements.timerStateBadge.className = 'badge badge-scrambling';
            }
        });
    }

    // -------------------------------------------------------------
    // 3. Continuous Photo-Album Scramble Carousel & Gesture System
    // -------------------------------------------------------------
    let scrambleHistory = [];
    let scrambleHistoryIndex = -1;
    let pendingNextScramble = null;

    const carouselElements = {
        viewport: document.getElementById('scramble-box'),
        track: document.getElementById('scramble-carousel-track'),
        cardPrev: document.getElementById('scramble-card-prev'),
        cardCurrent: document.getElementById('scramble-text'),
        cardNext: document.getElementById('scramble-card-next'),
    };

    function showToast(message, duration = 1600) {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        const toast = document.createElement('div');
        toast.className = 'toast-pill';
        toast.textContent = message;
        container.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            toast.classList.add('hide');
            setTimeout(() => {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 300);
        }, duration);
    }

    function splitMovesIntoBalancedRows(items, numRows = 3) {
        const total = items.length;
        if (total === 0) return [];
        if (total <= numRows) return items.map(x => [x]);

        const baseCount = Math.floor(total / numRows);
        const remainder = total % numRows;

        const rows = [];
        let start = 0;
        for (let r = 0; r < numRows; r++) {
            const count = baseCount + (r < remainder ? 1 : 0);
            rows.push(items.slice(start, start + count));
            start += count;
        }
        return rows;
    }

    function getOptimalRowCount(totalMoves = 21) {
        const viewport = carouselElements.viewport || document.getElementById('scramble-box');
        const width = (viewport && viewport.clientWidth > 0) ? viewport.clientWidth : (window.innerWidth || 360);
        
        if (width >= 800) {
            return 1;
        } else if (width >= 560) {
            return 2;
        }
        // Standard mobile portrait: 3 rows (7 moves per row for 20-21 moves)
        return Math.max(1, Math.min(3, Math.ceil(totalMoves / 7)));
    }

    function renderScrambleGridHTML(scrambleStr, activeIdx = 0, correctionMoves = [], isHalfTurn = false, halfFace = null, remainingOnFace = null, targetRows = null) {
        if (!scrambleStr) return '<span class="scramble-empty-hint">Loading scramble...</span>';
        const moves = scrambleStr.trim().split(/\s+/).filter(Boolean);
        if (moves.length === 0) return '<span class="scramble-empty-hint">Loading scramble...</span>';

        const optimalRows = (targetRows !== null && targetRows !== undefined) ? targetRows : getOptimalRowCount(moves.length);

        const moveSpans = moves.map((move, idx) => {
            let cls = 'move-pending';
            let label = move;
            const colorCls = getMoveColorClass(move);

            if (idx < activeIdx) {
                cls = 'move-done';
            } else if (idx === activeIdx) {
                if (isHalfTurn) {
                    cls = 'move-half-active';
                    label = remainingOnFace ? `${remainingOnFace} (½)` : `${move} (½)`;
                } else {
                    cls = 'move-active';
                }
            }
            return `<span class="scramble-move ${cls} ${colorCls}">${label}</span>`;
        });

        const rows = splitMovesIntoBalancedRows(moveSpans, optimalRows);
        return rows.map(rowSpans => `<div class="scramble-row">${rowSpans.join('')}</div>`).join('');
    }

    function renderScrambleReelHTML(scrambleStr, activeIdx = 0, correctionMoves = [], isHalfTurn = false, halfFace = null, remainingOnFace = null, isDeviated = false) {
        if (!scrambleStr) return '<span class="scramble-empty-hint">Loading scramble...</span>';
        const moves = scrambleStr.trim().split(/\s+/).filter(Boolean);
        if (moves.length === 0) return '<span class="scramble-empty-hint">Loading scramble...</span>';

        const totalMoves = moves.length;
        const visiblePrev = scrambleVisiblePrev;
        const visibleNext = scrambleVisibleNext;

        let trackItemsHtml = '';
        const isCorrectionMode = isDeviated && correctionMoves && correctionMoves.length > 0 && correctionMoves.length <= 2;

        moves.forEach((move, idx) => {
            let cls = 'step-pending';
            let label = move;
            const colorCls = getMoveColorClass(move);
            let inlineStyle = '';

            if (idx < activeIdx) {
                cls = 'step-done';
                const rel = activeIdx - idx;
                if (rel <= visiblePrev) {
                    inlineStyle = 'opacity: 0.35; transform: scale(0.84);';
                } else {
                    inlineStyle = 'opacity: 0; visibility: hidden; pointer-events: none;';
                }
            } else if (idx === activeIdx) {
                if (isCorrectionMode) {
                    cls = 'step-active';
                    const undoMove = correctionMoves[0];
                    const nextMove = correctionMoves.length > 1 ? correctionMoves[1] : (moves[activeIdx] || '');
                    label = `
                        <div class="reel-correction-badge">
                            <span class="reel-correction-undo">${undoMove}</span>
                            <span class="reel-correction-arrow">➔</span>
                            <span class="reel-correction-next">${nextMove}</span>
                        </div>
                    `;
                    inlineStyle = 'width: auto; min-width: 90px; padding: 0 0.6rem; opacity: 1;';
                } else if (isHalfTurn) {
                    cls = 'step-half-active';
                    label = remainingOnFace ? `${remainingOnFace} (½)` : `${move} (½)`;
                    inlineStyle = 'opacity: 1;';
                } else {
                    cls = 'step-active';
                    inlineStyle = 'opacity: 1;';
                }
            } else {
                // idx > activeIdx
                const rel = idx - activeIdx;
                if (rel <= visibleNext) {
                    const opacity = Math.max(0.28, 0.95 - (rel - 1) * 0.14);
                    const scale = Math.max(0.72, 1.0 - (rel - 1) * 0.04);
                    inlineStyle = `opacity: ${opacity}; transform: scale(${scale});`;
                } else {
                    inlineStyle = 'opacity: 0; visibility: hidden; pointer-events: none;';
                }
            }

            trackItemsHtml += `<div class="reel-step-item ${cls} ${colorCls}" style="${inlineStyle}">${label}</div>`;
        });

        // Calculate horizontal offset so active item is mathematically at center (left: 50%)
        const clampedActiveIdx = Math.min(activeIdx, Math.max(0, totalMoves - 1));
        const trackOffset = - (clampedActiveIdx * 74 + 37);

        // Footer progress sub-label
        const completedCount = Math.min(activeIdx, totalMoves);
        const remainingCount = Math.max(0, totalMoves - completedCount);
        const pct = Math.round((completedCount / totalMoves) * 100);
        const footerHtml = `
            <div class="scramble-reel-footer">
                <span>已完成 <strong class="progress-highlight">${completedCount}</strong> 步</span>
                <span>·</span>
                <span>剩余 <strong class="progress-highlight">${remainingCount}</strong> 步</span>
                <span style="opacity: 0.65;">(${pct}%)</span>
            </div>
        `;

        return `
            <div class="scramble-reel-container">
                <div class="scramble-reel-viewport">
                    <div class="scramble-reel-track" style="--track-x: ${trackOffset}px; transform: translate3d(${trackOffset}px, -50%, 0);">
                        ${trackItemsHtml}
                    </div>
                </div>
                ${footerHtml}
            </div>
        `;
    }

    function formatScrambleHTML(scrambleStr, activeIdx = 0, correctionMoves = [], isHalfTurn = false, halfFace = null, remainingOnFace = null, targetRows = null, isDeviated = false) {
        if (scrambleDisplayStyle === 'grid') {
            return renderScrambleGridHTML(scrambleStr, activeIdx, correctionMoves, isHalfTurn, halfFace, remainingOnFace, targetRows);
        }
        return renderScrambleReelHTML(scrambleStr, activeIdx, correctionMoves, isHalfTurn, halfFace, remainingOnFace, isDeviated);
    }

    const CAROUSEL_GAP = 0;

    function getCarouselMetrics() {
        const viewport = carouselElements.viewport || document.getElementById('scramble-box');
        const cardCurrent = carouselElements.cardCurrent || document.getElementById('scramble-text');
        const width = (cardCurrent && cardCurrent.offsetWidth) ? cardCurrent.offsetWidth : ((viewport ? viewport.clientWidth : 0) || 340);
        const step = width + CAROUSEL_GAP;
        return {
            width,
            gap: CAROUSEL_GAP,
            step,
            baseOffset: -step
        };
    }

    function setTrackPosition(offsetPx, animate = false, durationSec = 0.20, curve = 'cubic-bezier(0.2, 0.9, 0.3, 1)') {
        const track = carouselElements.track || document.getElementById('scramble-carousel-track');
        if (!track) return;
        if (animate) {
            track.style.transition = `transform ${durationSec}s ${curve}`;
        } else {
            track.style.transition = 'none';
        }
        track.style.transform = `translate3d(${offsetPx}px, 0, 0)`;
    }

    function updateCarouselCards(activeIdx = 0, correctionMoves = [], isHalfTurn = false, halfFace = null, remainingOnFace = null, isDeviated = false) {
        if (!carouselElements.cardCurrent) {
            carouselElements.cardCurrent = document.getElementById('scramble-text');
            carouselElements.cardPrev = document.getElementById('scramble-card-prev');
            carouselElements.cardNext = document.getElementById('scramble-card-next');
            carouselElements.track = document.getElementById('scramble-carousel-track');
            carouselElements.viewport = document.getElementById('scramble-box');
        }

        const currentStr = currentScramble || (scrambleHistoryIndex >= 0 ? scrambleHistory[scrambleHistoryIndex] : '');
        const prevStr = scrambleHistoryIndex > 0 ? scrambleHistory[scrambleHistoryIndex - 1] : null;
        
        let nextStr = null;
        if (scrambleHistoryIndex < scrambleHistory.length - 1) {
            nextStr = scrambleHistory[scrambleHistoryIndex + 1];
        } else {
            if (!pendingNextScramble) {
                pendingNextScramble = generateWcaScramble(21);
            }
            nextStr = pendingNextScramble;
        }

        // Center Active Card
        if (carouselElements.cardCurrent) {
            carouselElements.cardCurrent.innerHTML = formatScrambleHTML(currentStr, activeIdx, correctionMoves, isHalfTurn, halfFace, remainingOnFace, null, isDeviated);
            carouselElements.cardCurrent.classList.remove('scramble-empty-hint');
        }

        // Left Previous Card
        if (carouselElements.cardPrev) {
            if (prevStr) {
                carouselElements.cardPrev.innerHTML = formatScrambleHTML(prevStr);
                carouselElements.cardPrev.classList.remove('scramble-empty-hint');
            } else {
                carouselElements.cardPrev.innerHTML = '<span>已经是首个打乱</span>';
                carouselElements.cardPrev.classList.add('scramble-empty-hint');
            }
        }

        // Right Next Card (Pre-computed in real-time)
        if (carouselElements.cardNext) {
            carouselElements.cardNext.innerHTML = formatScrambleHTML(nextStr);
            carouselElements.cardNext.classList.remove('scramble-empty-hint');
        }

        // Instantly reset track position to baseOffset without animation
        const { baseOffset } = getCarouselMetrics();
        setTrackPosition(baseOffset, false);
    }

    function setNewScramble(scrambleStr, isHistorical = false) {
        if (!scrambleStr) {
            if (pendingNextScramble) {
                scrambleStr = pendingNextScramble;
                pendingNextScramble = null;
            } else {
                scrambleStr = generateWcaScramble(21);
            }
            if (scrambleHistoryIndex < scrambleHistory.length - 1) {
                scrambleHistory = scrambleHistory.slice(0, scrambleHistoryIndex + 1);
            }
            scrambleHistory.push(scrambleStr);
            scrambleHistoryIndex = scrambleHistory.length - 1;
        } else if (!isHistorical) {
            if (scrambleHistoryIndex < scrambleHistory.length - 1) {
                scrambleHistory = scrambleHistory.slice(0, scrambleHistoryIndex + 1);
            }
            scrambleHistory.push(scrambleStr);
            scrambleHistoryIndex = scrambleHistory.length - 1;
        }

        // Pre-calculate next preview for continuous slide-in
        pendingNextScramble = generateWcaScramble(21);

        currentScramble = scrambleStr;
        timer.setScramble(currentScramble);
        tracker.setScramble(currentScramble);

        if (physicalCube.isSolved()) {
            physicalCube.reset();
        }

        const evalResult = tracker.setCurrentCubeState(physicalCube.cp, physicalCube.co, physicalCube.ep, physicalCube.eo);

        if (elements.mainTimerContainer) {
            elements.mainTimerContainer.classList.remove('timer-ready-pulse');
        }
        setArenaMode('SCRAMBLE');
        updateScrambleStatus(evalResult);
    }

    function copyCurrentScramble() {
        if (!currentScramble) return;
        const textToCopy = currentScramble.trim();
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast('✓ 已复制当前打乱公式');
                triggerHaptic('light');
            }).catch(() => {
                fallbackCopyScramble(textToCopy);
            });
        } else {
            fallbackCopyScramble(textToCopy);
        }
    }

    function fallbackCopyScramble(text) {
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast('✓ 已复制当前打乱公式');
            triggerHaptic('light');
        } catch (_) {
            showToast('打乱: ' + text);
        }
    }

    function recalibrateCube() {
        physicalCube.reset();
        const faceletStr = physicalCube.getFacelets();
        if (renderer3D) renderer3D.updateFacelets(faceletStr);
        if (renderer2D) renderer2D.updateFacelets(faceletStr);
        tracker.resetProgress();
        if (bluetooth) bluetooth.requestReset();
        updateScrambleStatus();
        showToast('✓ 已将魔方设为复原态');
        triggerHaptic('medium');
    }

    // Continuous Photo-Album Gesture Track with Direct 1:1 Finger Tracking & Apple Damping (No Overshoot)
    function initScrambleGesture() {
        const viewport = document.getElementById('scramble-box');
        const track = document.getElementById('scramble-carousel-track');
        if (!track || !viewport) return;

        let startX = null;
        let startY = null;
        let startTime = 0;
        let isDragging = false;
        let currentOffset = 0;
        let isAnimating = false;

        // Ensure cards & track adapt dynamically on window resize & orientation change
        window.addEventListener('resize', () => {
            if (!isDragging && !isAnimating) {
                updateCarouselCards();
                const { baseOffset } = getCarouselMetrics();
                setTrackPosition(baseOffset, false);
            }
        });
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                if (!isDragging && !isAnimating) {
                    updateCarouselCards();
                    const { baseOffset } = getCarouselMetrics();
                    setTrackPosition(baseOffset, false);
                }
            }, 120);
        });

        viewport.addEventListener('pointerdown', (e) => {
            if (isAnimating) return;
            const metrics = getCarouselMetrics();
            startX = e.clientX;
            startY = e.clientY;
            currentOffset = metrics.baseOffset;
            startTime = performance.now();
            isDragging = false;
            setTrackPosition(metrics.baseOffset, false);
        });

        viewport.addEventListener('pointermove', (e) => {
            if (startX === null || isAnimating) return;
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            if (!isDragging && Math.abs(deltaX) > 6 && Math.abs(deltaX) > Math.abs(deltaY)) {
                isDragging = true;
                try { viewport.setPointerCapture(e.pointerId); } catch (_) {}
            }

            if (isDragging) {
                e.preventDefault();
                const metrics = getCarouselMetrics();
                let moveX = deltaX;
                // If dragging right (swiping back to previous) but at the first scramble, apply Apple rubber-band resistance
                if (moveX > 0 && scrambleHistoryIndex <= 0) {
                    moveX = (deltaX * 140 * 0.4) / (140 + 0.4 * deltaX);
                }
                currentOffset = metrics.baseOffset + moveX;
                setTrackPosition(currentOffset, false);
            }
        });

        const handlePointerEnd = (e) => {
            if (startX === null || isAnimating) return;
            const metrics = getCarouselMetrics();
            const elapsed = Math.max(1, performance.now() - startTime);
            const deltaX = currentOffset - metrics.baseOffset;
            const velocity = deltaX / elapsed; // px/ms

            if (isDragging) {
                isDragging = false;
                try { viewport.releasePointerCapture(e.pointerId); } catch (_) {}

                const threshold = Math.min(metrics.width * 0.18, 60);

                // 1. 从右往左滑 (Swipe from Right to Left / deltaX < -threshold 或 velocity < -0.28) -> 切换到下一个
                if (deltaX < -threshold || velocity < -0.28) {
                    isAnimating = true;
                    // Exact target offset for Next Card
                    const targetOffset = -2 * metrics.step;
                    setTrackPosition(targetOffset, true, 0.20, 'cubic-bezier(0.2, 0.9, 0.3, 1)');

                    setTimeout(() => {
                        if (scrambleHistoryIndex < scrambleHistory.length - 1) {
                            scrambleHistoryIndex++;
                            currentScramble = scrambleHistory[scrambleHistoryIndex];
                        } else {
                            if (!pendingNextScramble) pendingNextScramble = generateWcaScramble(21);
                            scrambleHistory.push(pendingNextScramble);
                            scrambleHistoryIndex = scrambleHistory.length - 1;
                            currentScramble = pendingNextScramble;
                            pendingNextScramble = generateWcaScramble(21);
                        }
                        timer.setScramble(currentScramble);
                        tracker.setScramble(currentScramble);
                        if (physicalCube.isSolved()) physicalCube.reset();
                        updateCarouselCards(0);
                        isAnimating = false;
                        triggerHaptic('light');
                    }, 200);
                }
                // 2. 从左往右滑 (Swipe from Left to Right / deltaX > threshold 或 velocity > 0.28) -> 返回上一个
                else if (deltaX > threshold || velocity > 0.28) {
                    if (scrambleHistoryIndex > 0) {
                        isAnimating = true;
                        // Exact target offset for Prev Card
                        const targetOffset = 0;
                        setTrackPosition(targetOffset, true, 0.20, 'cubic-bezier(0.2, 0.9, 0.3, 1)');

                        setTimeout(() => {
                            scrambleHistoryIndex--;
                            currentScramble = scrambleHistory[scrambleHistoryIndex];
                            timer.setScramble(currentScramble);
                            tracker.setScramble(currentScramble);
                            if (physicalCube.isSolved()) physicalCube.reset();
                            updateCarouselCards(0);
                            isAnimating = false;
                            triggerHaptic('light');
                        }, 200);
                    } else {
                        // 已经是第一个打乱，平滑弹簧回位并提示
                        setTrackPosition(metrics.baseOffset, true, 0.22, 'cubic-bezier(0.2, 0.9, 0.3, 1)');
                        showToast('已经是第一个打乱了');
                        triggerHaptic('light');
                    }
                }
                // 未达到滑动阈值：平滑弹簧复位回中心
                else {
                    setTrackPosition(metrics.baseOffset, true, 0.18, 'cubic-bezier(0.2, 0.9, 0.3, 1)');
                }
            } else {
                // 3. 点击卡片 (Tap without dragging) -> 复制当前公式
                copyCurrentScramble();
            }

            startX = null;
            startY = null;
        };

        viewport.addEventListener('pointerup', handlePointerEnd);
        viewport.addEventListener('pointercancel', handlePointerEnd);
    }

    initScrambleGesture();

    function renderScrambleDisplay(activeIdx = 0, correctionMoves = [], isHalfTurn = false, halfFace = null, remainingOnFace = null, isDeviated = false) {
        updateCarouselCards(activeIdx, correctionMoves, isHalfTurn, halfFace, remainingOnFace, isDeviated);
    }

    function updateScrambleStatus(evalResult) {
        const banner = elements.scrambleBanner;
        if (banner) banner.className = 'scramble-banner';

        if (!evalResult) {
            if (banner) {
                banner.innerHTML = `<span>Follow the scramble sequence above on your cube</span>`;
                banner.classList.add('status-pending');
            }
            if (elements.scrambleText) elements.scrambleText.classList.remove('scramble-text-hidden');
            renderScrambleDisplay(0);
            wasDeviated = false;
            setArenaMode('SCRAMBLE');
            return;
        }

        if (evalResult.isComplete) {
            wasDeviated = false;
            setArenaMode('TIMER');
            if (banner) {
                banner.innerHTML = `<span>SCRAMBLE COMPLETE — Ready to Solve!</span>`;
                banner.classList.add('status-ready');
            }
            if (elements.mainTimerContainer) elements.mainTimerContainer.classList.add('timer-ready-pulse');
            if (elements.timerStateBadge) {
                elements.timerStateBadge.textContent = 'READY';
                elements.timerStateBadge.className = 'badge badge-ready';
            }
            timer.setState('READY');
            sound.playScrambleComplete();
        } else if (evalResult.isDeviated) {
            setArenaMode('SCRAMBLE');
            if (elements.scrambleText) elements.scrambleText.classList.remove('scramble-text-hidden');

            if (evalResult.fullScrambleString && evalResult.fullScrambleString !== currentScramble) {
                currentScramble = evalResult.fullScrambleString;
                timer.setScramble(currentScramble);
                if (scrambleHistory.length > 0 && scrambleHistoryIndex >= 0 && scrambleHistoryIndex < scrambleHistory.length) {
                    scrambleHistory[scrambleHistoryIndex] = currentScramble;
                }
            }

            const nextCorrection = (evalResult.remainingMoves && evalResult.remainingMoves.length > 0)
                ? evalResult.remainingMoves[0]
                : (evalResult.correctionMoves && evalResult.correctionMoves.length > 0 ? evalResult.correctionMoves[0] : 'Turn cube');

            if (banner) {
                banner.innerHTML = `<span>打乱已自动更新剩余步骤，请继续转动: <strong>${nextCorrection}</strong></span>`;
                banner.classList.add('status-warning');
            }
            if (elements.timerStateBadge) {
                elements.timerStateBadge.textContent = 'SCRAMBLING';
                elements.timerStateBadge.className = 'badge badge-scrambling';
            }
            timer.setState('SCRAMBLING');

            if (scrambleAlertsEnabled && !wasDeviated) {
                sound.playScrambleWarning();
                // Trigger physical track error shake
                const trackEl = document.querySelector('.scramble-reel-track');
                if (trackEl) {
                    trackEl.classList.remove('error-shake');
                    void trackEl.offsetWidth;
                    trackEl.classList.add('error-shake');
                }
                if (elements.scrambleBox) {
                    elements.scrambleBox.classList.remove('scramble-alert-active');
                    void elements.scrambleBox.offsetWidth;
                    elements.scrambleBox.classList.add('scramble-alert-active');
                    setTimeout(() => {
                        if (elements.scrambleBox) elements.scrambleBox.classList.remove('scramble-alert-active');
                    }, 400);
                }
            }
            wasDeviated = true;
            renderScrambleDisplay(evalResult.currentStep, evalResult.correctionMoves || [], false, null, null, true);
        } else if (evalResult.isHalfTurn) {
            setArenaMode('SCRAMBLE');
            wasDeviated = false;
            if (elements.scrambleText) elements.scrambleText.classList.remove('scramble-text-hidden');
            const turnHelp = evalResult.remainingOnFace ? `Turn <strong>${evalResult.remainingOnFace}</strong> to complete step` : `Complete <strong>${evalResult.halfFace || ''}</strong> turn`;
            if (banner) {
                banner.innerHTML = `<span>Move in progress: ${turnHelp}...</span>`;
                banner.classList.add('status-half-turn');
            }
            if (elements.timerStateBadge) {
                elements.timerStateBadge.textContent = 'SCRAMBLING';
                elements.timerStateBadge.className = 'badge badge-scrambling';
            }
            timer.setState('SCRAMBLING');
            renderScrambleDisplay(evalResult.currentStep, [], true, evalResult.halfFace, evalResult.remainingOnFace, false);
        } else {
            setArenaMode('SCRAMBLE');
            wasDeviated = false;
            if (elements.scrambleText) elements.scrambleText.classList.remove('scramble-text-hidden');
            const pct = Math.round((evalResult.currentStep / evalResult.totalSteps) * 100);
            if (banner) {
                banner.innerHTML = `<span>Scrambling: ${evalResult.currentStep} / ${evalResult.totalSteps} moves (${pct}%)</span>`;
                banner.classList.add('status-pending');
            }
            if (elements.timerStateBadge) {
                elements.timerStateBadge.textContent = 'SCRAMBLING';
                elements.timerStateBadge.className = 'badge badge-scrambling';
            }
            timer.setState('SCRAMBLING');
            renderScrambleDisplay(evalResult.currentStep);
        }
    }

    if (elements.btnNewScramble) elements.btnNewScramble.addEventListener('click', () => setNewScramble());
    if (elements.btnCopyScramble) elements.btnCopyScramble.addEventListener('click', () => copyCurrentScramble());

    // -------------------------------------------------------------
    // 4. Bluetooth Integration, Event Routing & Diagnostics Log
    // -------------------------------------------------------------
    const btLogEntries = [];
    let isCubeConnected = false;
    let currentBatteryLevel = null;

    function appendBtLog(type, message) {
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;
        const logLine = `[${timeStr}] ${message}`;
        btLogEntries.push(logLine);
        if (btLogEntries.length > 200) btLogEntries.shift();

        if (elements.btLogTerminal) {
            const div = document.createElement('div');
            div.className = `bt-log-entry bt-log-${type || 'system'}`;
            div.textContent = logLine;
            elements.btLogTerminal.appendChild(div);
            elements.btLogTerminal.scrollTop = elements.btLogTerminal.scrollHeight;
        }
    }

    function openBluetoothLogModal() {
        if (!elements.modalBtLog) return;
        elements.modalBtLog.classList.add('active');
        if (elements.btModalMacVal) elements.btModalMacVal.textContent = bluetooth.macOverride || '0c:3d:5e:be:8e:95';
        if (elements.btLogTerminal) elements.btLogTerminal.scrollTop = elements.btLogTerminal.scrollHeight;
    }

    if (elements.btnBtCapsule) {
        elements.btnBtCapsule.addEventListener('click', async (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (!isCubeConnected) {
                try {
                    elements.btnBtCapsule.className = 'btn btn-icon-square btn-secondary btn-sm connecting';
                    elements.btnBtCapsule.title = '正在连接魔方...';
                    if (elements.btCapsuleLabel) elements.btCapsuleLabel.textContent = '连接中...';
                    appendBtLog('system', '正在启动蓝牙设备扫描 (Web Bluetooth API)...');
                    await bluetooth.connect();
                } catch (err) {
                    console.error("Connection failed:", err);
                    elements.btnBtCapsule.className = 'btn btn-icon-square btn-secondary btn-sm disconnected';
                    elements.btnBtCapsule.title = '点击连接魔方 (Click to connect)';
                    if (elements.btCapsuleLabel) elements.btCapsuleLabel.textContent = '连接魔方';
                    appendBtLog('err', `连接失败: ${err.message || err}`);
                    if (!err.message || (!err.message.includes('User cancelled') && !err.message.includes('cancelled'))) {
                        alert(`Bluetooth Connection Failed:\n${err.message || err}`);
                    }
                }
            } else {
                openBluetoothLogModal();
            }
        });
    }

    if (elements.btnCloseBtLog) {
        elements.btnCloseBtLog.addEventListener('click', () => {
            if (elements.modalBtLog) elements.modalBtLog.classList.remove('active');
        });
    }

    if (elements.btnModalDisconnect) {
        elements.btnModalDisconnect.addEventListener('click', async () => {
            appendBtLog('warn', '用户在详情弹窗中触发断开连接');
            await bluetooth.disconnect();
            if (elements.modalBtLog) elements.modalBtLog.classList.remove('active');
        });
    }

    if (elements.btnModalRecalibrate) {
        elements.btnModalRecalibrate.addEventListener('click', () => {
            recalibrateCube();
            appendBtLog('system', '手动将魔方校准设为复原态');
        });
    }

    if (elements.btnCopyBtLog) {
        elements.btnCopyBtLog.addEventListener('click', () => {
            copyTextToClipboard(btLogEntries.join('\n'));
            appendBtLog('system', '已复制全部蓝牙日志至剪贴板');
        });
    }

    if (elements.btnClearBtLog) {
        elements.btnClearBtLog.addEventListener('click', () => {
            btLogEntries.length = 0;
            if (elements.btLogTerminal) elements.btLogTerminal.innerHTML = '<div class="bt-log-entry bt-log-system">[System] 日志已清空</div>';
        });
    }

    const btConnectedDot = document.getElementById('bt-connected-dot');

    bluetooth.on('status', (info) => {
        if (info.state === 'CONNECTED') {
            isCubeConnected = true;
            const name = info.deviceName || 'GAN Cube';
            const battText = currentBatteryLevel !== null ? `${currentBatteryLevel}%` : '已连接';
            if (elements.btnBtCapsule) {
                elements.btnBtCapsule.className = 'btn btn-icon-square btn-secondary btn-sm connected';
                elements.btnBtCapsule.title = `魔方已连接: ${name} | 电量: ${battText} (点击查看日志与详情)`;
            }
            if (btConnectedDot) btConnectedDot.style.display = 'block';
            if (elements.btCapsuleLabel) elements.btCapsuleLabel.innerHTML = `<span class="bt-pulse-dot"></span> ${battText}`;
            if (elements.btModalDeviceName) elements.btModalDeviceName.textContent = name;
            if (elements.btModalStatusBadge) {
                elements.btModalStatusBadge.innerHTML = `<span class="status-dot"></span> Connected`;
                elements.btModalStatusBadge.className = 'badge badge-connected';
            }
            if (elements.btnModalDisconnect) elements.btnModalDisconnect.style.display = 'inline-flex';
            if (elements.cubeStatusBadge) {
                elements.cubeStatusBadge.innerHTML = `<span class="status-dot"></span> ${name}`;
                elements.cubeStatusBadge.className = 'badge badge-connected';
            }
            if (elements.btnRecalibrate) elements.btnRecalibrate.style.display = 'inline-flex';
            appendBtLog('system', `已建立蓝牙通信握手: ${name}`);
            resetBtInactivityTimer();
        } else if (info.state === 'CONNECTING') {
            if (elements.btnBtCapsule) {
                elements.btnBtCapsule.className = 'btn btn-icon-square btn-secondary btn-sm connecting';
                elements.btnBtCapsule.title = '正在连接魔方...';
            }
            if (btConnectedDot) btConnectedDot.style.display = 'none';
            if (elements.btCapsuleLabel) elements.btCapsuleLabel.textContent = '连接中...';
            if (elements.btModalStatusBadge) {
                elements.btModalStatusBadge.innerHTML = '<span class="status-dot"></span> Connecting...';
                elements.btModalStatusBadge.className = 'badge badge-connecting';
            }
            appendBtLog('system', '正在协商 AES-128 加密通信协议...');
        } else {
            isCubeConnected = false;
            currentBatteryLevel = null;
            if (btInactivityTimer) {
                clearTimeout(btInactivityTimer);
                btInactivityTimer = null;
            }
            if (elements.btnBtCapsule) {
                elements.btnBtCapsule.className = 'btn btn-icon-square btn-secondary btn-sm disconnected';
                elements.btnBtCapsule.title = '点击连接魔方 (Click to connect)';
            }
            if (btConnectedDot) btConnectedDot.style.display = 'none';
            if (elements.btCapsuleLabel) elements.btCapsuleLabel.textContent = '连接魔方';
            if (elements.btModalDeviceName) elements.btModalDeviceName.textContent = '未连接';
            if (elements.btModalBatteryVal) elements.btModalBatteryVal.textContent = '--%';
            if (elements.btModalBatteryFill) elements.btModalBatteryFill.style.width = '0%';
            if (elements.btModalStatusBadge) {
                elements.btModalStatusBadge.innerHTML = '<span class="status-dot"></span> Disconnected';
                elements.btModalStatusBadge.className = 'badge badge-disconnected';
            }
            if (elements.btnModalDisconnect) elements.btnModalDisconnect.style.display = 'none';
            if (elements.cubeStatusBadge) {
                elements.cubeStatusBadge.innerHTML = '<span class="status-dot"></span> Disconnected';
                elements.cubeStatusBadge.className = 'badge badge-disconnected';
            }
            if (elements.cubeBatteryBadge) elements.cubeBatteryBadge.style.display = 'none';
            appendBtLog('warn', '蓝牙连接已断开');
        }
    });

    bluetooth.on('battery', (data) => {
        currentBatteryLevel = data.level;
        if (elements.btnBtCapsule && isCubeConnected) {
            elements.btnBtCapsule.title = `魔方已连接 | 电量: ${data.level}% (点击查看日志与详情)`;
        }
        if (elements.btCapsuleLabel && isCubeConnected) {
            elements.btCapsuleLabel.innerHTML = `<span class="bt-pulse-dot"></span> ${data.level}%`;
        }
        if (elements.cubeBatteryBadge) {
            elements.cubeBatteryBadge.innerHTML = `
                <svg class="svg-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line></svg>
                <span>${data.level}%</span>
            `;
        }
        if (elements.btModalBatteryVal) elements.btModalBatteryVal.textContent = `${data.level}%`;
        if (elements.btModalBatteryFill) {
            elements.btModalBatteryFill.style.width = `${Math.min(100, Math.max(0, data.level))}%`;
            elements.btModalBatteryFill.style.background = data.level > 50 ? '#10B981' : (data.level > 20 ? '#F59E0B' : '#EF4444');
        }
        appendBtLog('system', `魔方电量更新: ${data.level}%`);
    });

    bluetooth.on('facelets', (data) => {
        resetBtInactivityTimer();
        physicalCube.setState(data.cp, data.co, data.ep, data.eo);
        const faceletStr = physicalCube.getFacelets();
        if (renderer3D) renderer3D.updateFacelets(faceletStr);
        if (renderer2D) renderer2D.updateFacelets(faceletStr);

        if (timer.state === 'RUNNING') {
            if (physicalCube.isSolved()) {
                timer.stopTimer();
            }
        } else if (timer.state === 'SCRAMBLING' || timer.state === 'CORRECTION') {
            const evalResult = tracker.setCurrentCubeState(data.cp, data.co, data.ep, data.eo);
            updateScrambleStatus(evalResult);
        }
    });

    bluetooth.on('move', (moveEvent) => {
        resetBtInactivityTimer();
        sound.playScrambleTick();

        physicalCube.applyMove(moveEvent.move);
        const faceletStr = physicalCube.getFacelets();
        if (renderer3D) renderer3D.updateFacelets(faceletStr);
        if (renderer2D) renderer2D.updateFacelets(faceletStr);

        appendBtLog('move', `动作: ${moveEvent.move} (硬件刻度: ${moveEvent.hardwareTimestamp || '--'})`);

        elements.liveLastMoveBadge.textContent = moveEvent.move;
        const colorCls = getMoveColorClass(moveEvent.move);
        elements.liveLastMoveBadge.className = `badge ${colorCls}`;

        // Practice Mode Routing
        if (currentView === 'view-practice') {
            handlePracticeCubeMove(moveEvent.move);
            return;
        }

        // Standard Timer Engine Routing
        if (isAwaitingScrambleTurn || timer.state === 'FINISHED' || (timer.state === 'IDLE' && physicalCube.isSolved())) {
            // User turned any face on the cube: generate new scramble starting with this first turn!
            isAwaitingScrambleTurn = false;
            const newScramble = generateWcaScrambleWithFirstMove(moveEvent.move, 21);
            setNewScramble(newScramble, false);
            return;
        }

        if (timer.state === 'READY' || timer.state === 'INSPECTION') {
            // First turn begins solve immediately!
            timer.startTimer();
            timer.onCubeMove(moveEvent);
        } else if (timer.state === 'RUNNING') {
            timer.onCubeMove(moveEvent);
            if (physicalCube.isSolved()) {
                timer.stopTimer();
            }
        } else if (timer.state === 'SCRAMBLING' || timer.state === 'CORRECTION') {
            const evalResult = tracker.onCubeMove(moveEvent.move);
            updateScrambleStatus(evalResult);
        }
    });

    // -------------------------------------------------------------
    // 5. Timer Events & Real-Time Clock
    // -------------------------------------------------------------
    timer.on('stateChange', ({ state }) => {
        if (elements.timerStateBadge) {
            elements.timerStateBadge.textContent = state;
            elements.timerStateBadge.className = `badge badge-${state.toLowerCase()}`;
        }

        if (state === 'RUNNING') {
            elements.mainTimerContainer.classList.remove('timer-ready-pulse');
            elements.mainTimerContainer.classList.add('timer-running');
            elements.liveMovesBadge.parentElement.style.display = 'flex';
            sound.playSolveStart();
        } else if (state === 'FINISHED') {
            elements.mainTimerContainer.classList.remove('timer-running');
            elements.mainTimerContainer.classList.add('timer-finished-flash');
            setTimeout(() => elements.mainTimerContainer.classList.remove('timer-finished-flash'), 1000);
        } else if (state === 'IDLE') {
            elements.mainTimerContainer.classList.remove('timer-running');
            elements.liveMovesBadge.parentElement.style.display = 'none';
        }
    });

    function updateTimerDigitsText(text) {
        if (!elements.timerDisplay) return;
        elements.timerDisplay.textContent = text;
        if (text.length > 5) {
            elements.timerDisplay.classList.add('timer-digits-long');
        } else {
            elements.timerDisplay.classList.remove('timer-digits-long');
        }
    }

    timer.on('tick', ({ elapsedMs, moveCount, tps }) => {
        updateTimerDigitsText(formatTime(elapsedMs));
        elements.liveMovesBadge.textContent = `${moveCount} moves`;
        elements.liveTpsBadge.textContent = `${tps} TPS`;
    });

    timer.on('moveLogged', ({ move, totalMoves }) => {
        elements.liveMovesBadge.textContent = `${totalMoves} moves`;
        elements.liveLastMoveBadge.textContent = move.move;
    });

    timer.on('inspectionTick', ({ secondsLeft, callout }) => {
        updateTimerDigitsText(String(secondsLeft));
        if (callout) {
            sound.playInspectionWarning(callout === 8 ? 8 : 12);
        }
    });

    timer.on('solveFinished', (solve) => {
        sound.playSolveComplete();
        handleSolveFinishedUI(solve);
    });

    function handleSolveFinishedUI(solve) {
        if (!solve) return;
        setArenaMode('TIMER');
        updateTimerDigitsText(solve.formattedTime);
        if (elements.timerSubDisplay) {
            if (solve.calibratedTimeMs && solve.calibratedTimeMs !== solve.rawTimeMs) {
                elements.timerSubDisplay.textContent = `Calibrated: ${formatTime(solve.calibratedTimeMs)} | ${solve.moveCount} moves @ ${solve.tps} TPS`;
            } else {
                elements.timerSubDisplay.textContent = `${solve.moveCount} moves @ ${solve.tps} TPS`;
            }
        }

        renderMainSolveBreakdown(solve);
        renderStatsAndHistory();

        if (trendChart && currentView === 'view-analytics') {
            trendChart.setData(session.solves);
        }

        // Requirement: Do not compute next scramble yet. Wait until user turns any face.
        isAwaitingScrambleTurn = true;
        syncAllModuleUIs();
    }

    // Recalibrate / Set Solved
    if (elements.btnRecalibrate) {
        elements.btnRecalibrate.addEventListener('click', () => {
            recalibrateCube();
        });
    }

    // -------------------------------------------------------------
    // 6. Statistics & Session History
    // -------------------------------------------------------------
    function renderStatsAndHistory() {
        const stats = session.getStats();

        if (elements.statCount) elements.statCount.textContent = stats.count;
        if (elements.statBest) elements.statBest.textContent = stats.bestFormatted;
        if (elements.statCurrentAo5) elements.statCurrentAo5.textContent = stats.currentAo5Formatted;
        if (elements.statBestAo5) elements.statBestAo5.textContent = stats.bestAo5Formatted;
        if (elements.statCurrentAo12) elements.statCurrentAo12.textContent = stats.currentAo12Formatted;
        if (elements.statBestAo12) elements.statBestAo12.textContent = stats.bestAo12Formatted;
        if (elements.statMean) elements.statMean.textContent = stats.meanFormatted;
        if (elements.statStdDev) elements.statStdDev.textContent = stats.stdDevFormatted;

        let html = '';
        session.solves.forEach((s, idx) => {
            const solveNum = session.solves.length - idx;
            const dateStr = new Date(s.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            let timeClass = '';
            let timeText = s.formattedTime;
            if (s.penalty === -1) { timeClass = 'stat-dnf'; timeText = 'DNF'; }
            else if (s.penalty === 2) { timeClass = 'stat-plus2'; timeText = `${s.formattedTime}+`; }

            const movesCount = (CubeEngine && typeof CubeEngine.countMoves === 'function')
                ? CubeEngine.countMoves(s.moves, currentMoveMetric)
                : (s.moveCount || 0);
            const timeSec = (s.finalTimeMs > 0 ? s.finalTimeMs : s.rawTimeMs) / 1000;
            const tps = timeSec > 0 ? (movesCount / timeSec).toFixed(2) : (s.tps || 0);

            html += `
                <tr data-id="${s.id}">
                    <td class="col-num">${solveNum}</td>
                    <td class="col-time ${timeClass}"><strong>${timeText}</strong></td>
                    <td class="col-moves">${movesCount} (${tps} TPS)</td>
                    <td class="col-scramble" title="${s.scramble}">${s.scramble}</td>
                    <td class="col-date">${dateStr}</td>
                    <td class="col-actions">
                        <button class="btn-icon btn-recon" title="Reconstruct / View Moves">
                            <svg class="svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </button>
                        <button class="btn-icon btn-penalty" title="Toggle +2">+2</button>
                        <button class="btn-icon btn-dnf" title="Toggle DNF">DNF</button>
                        <button class="btn-icon btn-delete" title="Delete Solve">
                            <svg class="svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </td>
                </tr>
            `;
        });

        if (session.solves.length === 0) {
            html = `<tr><td colspan="6" class="text-center empty-state">No solves recorded yet. Connect your cube and solve!</td></tr>`;
        }

        elements.historyTbody.innerHTML = html;
        bindHistoryActionEvents();
    }

    function bindHistoryActionEvents() {
        elements.historyTbody.querySelectorAll('.btn-recon').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tr = e.target.closest('tr');
                openReconstructionModal(tr.dataset.id);
            });
        });

        elements.historyTbody.querySelectorAll('.btn-penalty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tr = e.target.closest('tr');
                session.togglePenalty(tr.dataset.id, '+2');
                renderStatsAndHistory();
            });
        });

        elements.historyTbody.querySelectorAll('.btn-dnf').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tr = e.target.closest('tr');
                session.togglePenalty(tr.dataset.id, 'DNF');
                renderStatsAndHistory();
            });
        });

        elements.historyTbody.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tr = e.target.closest('tr');
                if (confirm("Delete this solve?")) {
                    session.deleteSolve(tr.dataset.id);
                    renderStatsAndHistory();
                    if (trendChart) trendChart.setData(session.solves);
                }
            });
        });
    }

    elements.btnClearSession.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear the entire session history?")) {
            session.clearSession();
            renderStatsAndHistory();
            if (trendChart) trendChart.setData([]);
        }
    });

    elements.btnExportJson.addEventListener('click', () => {
        downloadFile(session.exportJSON(), 'rubiks-solve-session.json', 'application/json');
    });

    elements.btnExportCsv.addEventListener('click', () => {
        downloadFile(session.exportCSV(), 'rubiks-solve-session.csv', 'text/csv');
    });

    elements.btnExportCstimer.addEventListener('click', () => {
        downloadFile(session.exportCsTimerJSON(), 'cstimer-export.txt', 'text/plain');
    });

    function downloadFile(content, fileName, contentType) {
        const a = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(a.href);
    }

    // -------------------------------------------------------------
    // 7. Solve Reconstruction & Method Stage Breakdown (Phase 3)
    // -------------------------------------------------------------
    let activeReconSolve = null;
    let reconCurrentStep = 0;
    let reconPlaybackTimer = null;
    let activeReconOverlaySolves = [];
    const reconCube = new RubiksCube();

    function openReconstructionModal(solveId) {
        const solve = session.solves.find(s => s.id === solveId);
        if (!solve) return;

        activeReconSolve = solve;
        reconCurrentStep = solve.moves.length;

        const countOBTM = (CubeEngine && typeof CubeEngine.countMoves === 'function')
            ? CubeEngine.countMoves(solve.moves, 'OBTM')
            : solve.moves.length;
        const countQTM = (CubeEngine && typeof CubeEngine.countMoves === 'function')
            ? CubeEngine.countMoves(solve.moves, 'QTM')
            : solve.moves.length;

        elements.reconSolveTime.textContent = solve.formattedTime;
        elements.reconScramble.textContent = solve.scramble;
        elements.reconMoveCount.textContent = `${countOBTM} moves (${countQTM} QTM)`;
        elements.reconTps.textContent = `${solve.tps} TPS`;

        elements.reconSlider.max = solve.moves.length;
        elements.reconSlider.value = reconCurrentStep;

        if (!reconRenderer3D) {
            try {
                reconRenderer3D = new CubeRenderer3D(elements.reconCubeContainer, { width: 220, height: 220 });
            } catch (e) {
                console.warn(e);
            }
        }

        // Reset overlay selector and cross face selector
        if (elements.selectReconOverlay) {
            elements.selectReconOverlay.value = 'none';
        }
        if (elements.selectReconCrossFace) {
            elements.selectReconCrossFace.value = 'auto';
        }
        activeReconOverlaySolves = [];

        // Connect click handler to jump step directly from movement chart
        if (movementChart) {
            movementChart.options.onStepClick = (step) => {
                updateReconCubeStep(step);
            };
        }

        renderReconStageAnalysis(solve);
        renderReconstructionMovesTable(solve);
        updateReconCubeStep(reconCurrentStep);

        elements.modalReconstruct.classList.add('active');
    }

    function renderReconStageAnalysis(solve) {
        if (!window.MethodAnalyzer) return;
        const method = elements.selectReconMethod ? elements.selectReconMethod.value : 'CFOP';
        const forcedFace = elements.selectReconCrossFace ? elements.selectReconCrossFace.value : 'auto';
        const analysis = MethodAnalyzer.analyzeSolve(solve, method, forcedFace);

        // Update Cross Face Badge and visibility
        const isCfop = method === 'CFOP' || method === 'CFOP_PAIRS';
        if (elements.reconCrossFaceGroup) {
            elements.reconCrossFaceGroup.style.display = isCfop ? 'flex' : 'none';
        }
        if (elements.reconDetectedFaceBadge) {
            if (isCfop && analysis.baseFace) {
                elements.reconDetectedFaceBadge.style.display = 'inline-block';
                elements.reconDetectedFaceBadge.textContent = `Cross: ${analysis.baseFace}`;
            } else {
                elements.reconDetectedFaceBadge.style.display = 'none';
            }
        }

        // Pass stage segments to movement chart (Requirement: Split curve into steps)
        if (movementChart && analysis && analysis.stages) {
            movementChart.setStages(analysis.stages);
        }

        // 1. Stage Cards
        let cardsHtml = '';
        analysis.stages.forEach(stg => {
            cardsHtml += `
                <div class="stage-card" data-start="${stg.startIdx}" data-end="${stg.endIdx}">
                    <span class="stage-card-title" style="color: ${stg.color};">${stg.name}</span>
                    <span class="stage-card-stat">${stg.durationFormatted}</span>
                    <span class="stage-card-sub">${stg.moveCount} moves @ ${stg.tps} TPS</span>
                </div>
            `;
        });
        if (elements.reconStageCards) elements.reconStageCards.innerHTML = cardsHtml;

        // Click stage card to warp step
        if (elements.reconStageCards) {
            elements.reconStageCards.querySelectorAll('.stage-card').forEach(card => {
                card.addEventListener('click', () => {
                    const endStep = parseInt(card.dataset.end, 10) + 1;
                    updateReconCubeStep(endStep);
                });
            });
        }

        // 2. Proportional Moves Flow (Phase 3 typography)
        if (elements.reconProportionalFlow) {
            elements.reconProportionalFlow.innerHTML = MethodAnalyzer.generateProportionalHtml(solve.moves);
            elements.reconProportionalFlow.querySelectorAll('.recon-move-token').forEach(token => {
                token.addEventListener('click', () => {
                    const step = parseInt(token.dataset.step, 10) + 1;
                    updateReconCubeStep(step);
                });
            });
        }
    }

    if (elements.selectReconMethod) {
        elements.selectReconMethod.addEventListener('change', () => {
            if (activeReconSolve) {
                renderReconStageAnalysis(activeReconSolve);
                updateReconCubeStep(reconCurrentStep);
            }
        });
    }

    if (elements.btnCopyReconData) {
        elements.btnCopyReconData.addEventListener('click', () => {
            if (!activeReconSolve) return;
            const moveStrings = (activeReconSolve.moves || []).map(m => typeof m === 'string' ? m : (m && m.move ? m.move : '')).join(' ');
            const payload = {
                id: activeReconSolve.id,
                time: activeReconSolve.formattedTime,
                rawTimeMs: activeReconSolve.rawTimeMs,
                scramble: activeReconSolve.scramble,
                moves: moveStrings,
                moveList: activeReconSolve.moves
            };
            const text = JSON.stringify(payload, null, 2);
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    const origRecon = elements.btnCopyReconData.innerHTML;
                    elements.btnCopyReconData.innerHTML = `
                        <svg class="svg-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        已复制!
                    `;
                    setTimeout(() => { elements.btnCopyReconData.innerHTML = origRecon; }, 2000);
                }).catch(() => {
                    prompt('复制本次复原数据:', text);
                });
            } else {
                prompt('复制本次复原数据:', text);
            }
        });
    }

    // -------------------------------------------------------------
    // 8. Main Screen Inline Solve Breakdown & Curve
    // -------------------------------------------------------------
    let mainMovementChart = null;
    let latestFinishedSolve = null;

    function syncMainCubeToSolveStep(solve, stepNum) {
        if (!solve || !CubeEngine || !CubeEngine.RubiksCube) return;
        const simCube = new (CubeEngine.RubiksCube)();
        if (solve.scramble) {
            simCube.applyMoves(solve.scramble);
        }
        const moves = solve.moves || [];
        const count = Math.max(0, Math.min(stepNum, moves.length));
        for (let i = 0; i < count; i++) {
            const m = typeof moves[i] === 'string' ? moves[i] : (moves[i] && moves[i].move ? moves[i].move : '');
            simCube.applyMove(m);
        }
        const faceletStr = simCube.getFacelets();
        if (renderer3D) renderer3D.updateFacelets(faceletStr);
        if (renderer2D) renderer2D.updateFacelets(faceletStr);

        if (count > 0 && count <= moves.length) {
            const lastMoveObj = moves[count - 1];
            const moveName = typeof lastMoveObj === 'string' ? lastMoveObj : (lastMoveObj.move || '');
            if (elements.liveLastMoveBadge) {
                elements.liveLastMoveBadge.textContent = moveName;
                elements.liveLastMoveBadge.className = `badge ${getMoveColorClass(moveName)}`;
            }
        }
    }

    if (elements.canvasMainSolveGraph && window.ChartEngine && typeof ChartEngine.SolveMovementChart === 'function') {
        mainMovementChart = new ChartEngine.SolveMovementChart(elements.canvasMainSolveGraph, {
            cumulativeCurve: { enabled: true, color: '#10B981', width: 2.5, opacity: 1.0 },
            derivativeBars: { enabled: true, color: 'rgba(59, 130, 246, 0.35)', activeColor: '#F59E0B' },
            tpsCurve: { enabled: true, color: '#06B6D4', width: 2.0, opacity: 0.85 },
            showStageBands: true,
            onStepClick: (stepNum) => {
                if (latestFinishedSolve) {
                    syncMainCubeToSolveStep(latestFinishedSolve, stepNum);
                    if (mainMovementChart) {
                        mainMovementChart.setSolve(latestFinishedSolve, stepNum - 1);
                    }
                }
            }
        });
    }

    if (elements.toggleMainCumulative) {
        elements.toggleMainCumulative.addEventListener('change', (e) => {
            if (mainMovementChart) mainMovementChart.setCurveConfig({ cumulativeCurve: { enabled: e.target.checked } });
        });
    }
    if (elements.toggleMainTps) {
        elements.toggleMainTps.addEventListener('change', (e) => {
            if (mainMovementChart) mainMovementChart.setCurveConfig({ tpsCurve: { enabled: e.target.checked } });
        });
    }
    if (elements.toggleMainDerivative) {
        elements.toggleMainDerivative.addEventListener('change', (e) => {
            if (mainMovementChart) mainMovementChart.setCurveConfig({ derivativeBars: { enabled: e.target.checked } });
        });
    }

    function renderMainSolveBreakdown(solve) {
        if (!solve || !solve.moves || solve.moves.length === 0) {
            if (elements.mainSolveBreakdownCard) {
                elements.mainSolveBreakdownCard.style.display = 'none';
                syncModuleUI('main-solve-breakdown-card');
            }
            return;
        }

        latestFinishedSolve = solve;
        if (elements.mainSolveBreakdownCard) {
            elements.mainSolveBreakdownCard.style.display = 'block';
            elements.mainSolveBreakdownCard.classList.remove('module-hidden');
            syncModuleUI('main-solve-breakdown-card');
        }

        const method = (elements.selectSettingsReconMethod ? elements.selectSettingsReconMethod.value : null)
            || localStorage.getItem('rubiks_recon_method')
            || 'CFOP_PAIRS';

        const analysis = MethodAnalyzer.analyzeSolve(solve, method, 'auto');

        const moveCount = solve.moveCount || (solve.moves ? solve.moves.length : 0);
        const solveTimeStr = solve.formattedTime || (solve.finalTimeMs ? (solve.finalTimeMs / 1000).toFixed(2) + 's' : '--s');
        const solveTpsStr = solve.tps || (solve.finalTimeMs > 0 ? (moveCount / (solve.finalTimeMs / 1000)).toFixed(2) : '--');

        const stats = session.getStats();
        const ao3Str = stats.currentAo3 !== null ? (stats.currentAo3 > 0 ? (stats.currentAo3 / 1000).toFixed(2) : 'DNF') : '--';
        const ao5Str = stats.currentAo5 !== null ? (stats.currentAo5 > 0 ? (stats.currentAo5 / 1000).toFixed(2) : 'DNF') : '--';
        const ao12Str = stats.currentAo12 !== null ? (stats.currentAo12 > 0 ? (stats.currentAo12 / 1000).toFixed(2) : 'DNF') : '--';

        if (elements.mainStatMoves) elements.mainStatMoves.textContent = `${moveCount}步`;
        if (elements.mainStatTime) elements.mainStatTime.textContent = `${solveTimeStr}`;
        if (elements.mainStatTps) elements.mainStatTps.textContent = `${solveTpsStr} TPS`;
        if (elements.mainStatAo3) elements.mainStatAo3.textContent = `ao3: ${ao3Str}`;
        if (elements.mainStatAo5) elements.mainStatAo5.textContent = `ao5: ${ao5Str}`;
        if (elements.mainStatAo12) elements.mainStatAo12.textContent = `ao12: ${ao12Str}`;

        // 1. Full-Width Chart Rendering with Anti-Collision On-Curve Stage Metrics
        if (mainMovementChart) {
            mainMovementChart.setSolve(solve);
            if (analysis && analysis.stages) {
                mainMovementChart.setStages(analysis.stages);
            }
            requestAnimationFrame(() => {
                if (mainMovementChart) mainMovementChart.resize();
            });
            setTimeout(() => {
                if (mainMovementChart) mainMovementChart.resize();
            }, 80);
        }
    }

    const TOGGLE_MODULE_IDS = ['main-solve-breakdown-card', 'card-cube-views', 'card-history-table'];

    function syncModuleUI(id) {
        const card = document.getElementById(id);
        if (!card) return;

        const isCollapsed = card.classList.contains('collapsed');
        const isHidden = card.style.display === 'none' || card.classList.contains('module-hidden');

        // 1. Update text on card toggle buttons
        card.querySelectorAll(`.btn-panel-toggle[data-target="${id}"]`).forEach(btn => {
            btn.innerHTML = `
                <svg class="svg-icon svg-chevron" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                <span class="toggle-text">${isCollapsed ? '展开' : '收起'}</span>
            `;
        });

        // 2. Update top capsule chip active state
        document.querySelectorAll(`.module-chip-btn[data-target="${id}"]`).forEach(chip => {
            if (!isCollapsed && !isHidden) {
                chip.classList.add('active');
            } else {
                chip.classList.remove('active');
            }
        });
    }

    function syncAllModuleUIs() {
        TOGGLE_MODULE_IDS.forEach(id => syncModuleUI(id));
    }

    function togglePanel(id, forceCollapse = null) {
        triggerHaptic('light');
        const card = document.getElementById(id);
        if (!card) return;

        let willCollapse;
        if (forceCollapse !== null) {
            willCollapse = forceCollapse;
            if (willCollapse) card.classList.add('collapsed');
            else card.classList.remove('collapsed');
        } else {
            willCollapse = card.classList.toggle('collapsed');
        }

        // If expanding, ensure the card itself is displayed
        if (!willCollapse) {
            card.style.removeProperty('display');
            card.classList.remove('module-hidden');
            if (id === 'main-solve-breakdown-card') {
                const solveToRender = latestFinishedSolve || (session.solves && session.solves.length > 0 ? session.solves[0] : null);
                if (solveToRender) renderMainSolveBreakdown(solveToRender);
                setTimeout(() => {
                    if (mainMovementChart) mainMovementChart.resize();
                }, 80);
            }
        }

        localStorage.setItem(`rubiks_card_collapsed_${id}`, String(willCollapse));
        syncModuleUI(id);
    }

    function initModuleToggles() {
        // 1. Initial State Restoration from localStorage
        TOGGLE_MODULE_IDS.forEach(id => {
            const savedCollapsed = localStorage.getItem(`rubiks_card_collapsed_${id}`) === 'true';
            const card = document.getElementById(id);
            if (card && savedCollapsed) {
                card.classList.add('collapsed');
            }
            syncModuleUI(id);
        });

        // 2. Top Module Capsule Chips Click & Touch Listeners
        document.querySelectorAll('.module-chip-btn[data-target]').forEach(chip => {
            const targetId = chip.dataset.target;
            chip.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                togglePanel(targetId);
            });
        });

        // 3. Panel Toggle Buttons on Card Headers
        document.querySelectorAll('.btn-panel-toggle[data-target]').forEach(btn => {
            const targetId = btn.dataset.target;
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                togglePanel(targetId);
            });
        });

        // 4. Clicking entire card header toggles the panel (ignore clicks on select or other buttons)
        TOGGLE_MODULE_IDS.forEach(targetId => {
            const card = document.getElementById(targetId);
            if (!card) return;

            const header = card.querySelector('.collapsible-header');
            if (header) {
                header.addEventListener('click', (e) => {
                    if (e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION' || 
                       (e.target.tagName === 'BUTTON' && !e.target.classList.contains('btn-panel-toggle'))) {
                        return;
                    }
                    e.preventDefault();
                    togglePanel(targetId);
                });
            }
        });

        // 5. Arena Switch Capsule Button
        const btnToggleArenaView = document.getElementById('btn-toggle-arena-view');
        if (btnToggleArenaView) {
            btnToggleArenaView.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (elements.scrambleBox && elements.scrambleBox.style.display !== 'none') {
                    setArenaMode('TIMER');
                    timer.setState('READY');
                    if (elements.timerStateBadge) {
                        elements.timerStateBadge.textContent = 'READY';
                        elements.timerStateBadge.className = 'badge badge-ready';
                    }
                } else {
                    setArenaMode('SCRAMBLE');
                    timer.setState('SCRAMBLING');
                    if (elements.timerStateBadge) {
                        elements.timerStateBadge.textContent = 'SCRAMBLING';
                        elements.timerStateBadge.className = 'badge badge-scrambling';
                    }
                }
            });
        }

        syncAllModuleUIs();
    }

    if (elements.selectReconCrossFace) {
        elements.selectReconCrossFace.addEventListener('change', () => {
            if (activeReconSolve) {
                renderReconStageAnalysis(activeReconSolve);
                updateReconCubeStep(reconCurrentStep);
            }
        });
    }

    function renderReconstructionMovesTable(solve) {
        let html = '';
        solve.moves.forEach((m, idx) => {
            const timeSec = (m.elapsedMs / 1000).toFixed(2);
            const deltaSec = (m.deltaMs / 1000).toFixed(2);
            const colorCls = getMoveColorClass(m.move);

            html += `
                <tr class="recon-row ${idx + 1 === reconCurrentStep ? 'recon-active-row' : ''}" data-step="${idx + 1}">
                    <td>${idx + 1}</td>
                    <td><span class="badge badge-move ${colorCls}">${m.move}</span></td>
                    <td>+${timeSec}s</td>
                    <td>${deltaSec}s</td>
                    <td>${m.instantTps || 0}</td>
                </tr>
            `;
        });
        elements.reconTbody.innerHTML = html;

        elements.reconTbody.querySelectorAll('tr').forEach(tr => {
            tr.addEventListener('click', () => {
                const step = parseInt(tr.dataset.step, 10);
                updateReconCubeStep(step);
            });
        });
    }

    function updateReconCubeStep(step) {
        if (!activeReconSolve) return;
        reconCurrentStep = Math.max(0, Math.min(step, activeReconSolve.moves.length));
        elements.reconSlider.value = reconCurrentStep;
        elements.reconStepLabel.textContent = `Step: ${reconCurrentStep} / ${activeReconSolve.moves.length}`;

        // Replay scramble first, then moves up to step
        reconCube.reset();
        reconCube.applyMoves(activeReconSolve.scramble);

        for (let i = 0; i < reconCurrentStep; i++) {
            reconCube.applyMove(activeReconSolve.moves[i].move);
        }

        const faceletStr = reconCube.getFacelets();
        if (reconRenderer3D) reconRenderer3D.updateFacelets(faceletStr);

        // Highlight active row in table
        elements.reconTbody.querySelectorAll('tr').forEach(tr => {
            const rStep = parseInt(tr.dataset.step, 10);
            if (rStep === reconCurrentStep) {
                tr.classList.add('recon-active-row');
                tr.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            } else {
                tr.classList.remove('recon-active-row');
            }
        });

        // Highlight active token in proportional flow
        if (elements.reconProportionalFlow) {
            elements.reconProportionalFlow.querySelectorAll('.recon-move-token').forEach(token => {
                const tStep = parseInt(token.dataset.step, 10) + 1;
                token.classList.toggle('active', tStep === reconCurrentStep);
            });
        }

        // Highlight active stage card
        if (elements.reconStageCards) {
            elements.reconStageCards.querySelectorAll('.stage-card').forEach(card => {
                const s = parseInt(card.dataset.start, 10);
                const e = parseInt(card.dataset.end, 10);
                const isCurrentStage = (reconCurrentStep - 1 >= s && reconCurrentStep - 1 <= e);
                card.classList.toggle('active', isCurrentStage);
            });
        }

        // Draw movement chart with active step indicator & overlays
        if (movementChart) {
            movementChart.setSolve(activeReconSolve, reconCurrentStep - 1, activeReconOverlaySolves);
        }
    }

    elements.reconSlider.addEventListener('input', (e) => {
        updateReconCubeStep(parseInt(e.target.value, 10));
    });

    elements.btnReconStepBack.addEventListener('click', () => {
        if (reconCurrentStep > 0) updateReconCubeStep(reconCurrentStep - 1);
    });

    elements.btnReconStepForward.addEventListener('click', () => {
        if (activeReconSolve && reconCurrentStep < activeReconSolve.moves.length) {
            updateReconCubeStep(reconCurrentStep + 1);
        }
    });

    const playBtnSvg = `<svg class="svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> Play`;
    const pauseBtnSvg = `<svg class="svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> Pause`;

    elements.btnReconPlay.addEventListener('click', () => {
        if (reconPlaybackTimer) {
            clearInterval(reconPlaybackTimer);
            reconPlaybackTimer = null;
            elements.btnReconPlay.innerHTML = playBtnSvg;
            return;
        }

        if (reconCurrentStep >= activeReconSolve.moves.length) {
            reconCurrentStep = 0;
        }

        elements.btnReconPlay.innerHTML = pauseBtnSvg;
        reconPlaybackTimer = setInterval(() => {
            if (!activeReconSolve || reconCurrentStep >= activeReconSolve.moves.length) {
                clearInterval(reconPlaybackTimer);
                reconPlaybackTimer = null;
                elements.btnReconPlay.innerHTML = playBtnSvg;
                return;
            }
            updateReconCubeStep(reconCurrentStep + 1);
        }, 240);
    });

    // Reconstruction Curve Customization Listeners (Requirement: Each curve editable)
    function updateReconOverlaySolves() {
        if (!elements.selectReconOverlay || !activeReconSolve) {
            activeReconOverlaySolves = [];
            return;
        }
        const val = elements.selectReconOverlay.value;
        if (val === 'best') {
            const otherSolves = session.solves.filter(s => s.id !== activeReconSolve.id && s.finalTimeMs > 0);
            if (otherSolves.length > 0) {
                const best = otherSolves.slice().sort((a, b) => (a.finalTimeMs || a.rawTimeMs) - (b.finalTimeMs || b.rawTimeMs))[0];
                activeReconOverlaySolves = [best];
            } else {
                activeReconOverlaySolves = [];
            }
        } else if (val === 'prev') {
            const currentIdx = session.solves.findIndex(s => s.id === activeReconSolve.id);
            if (currentIdx >= 0 && currentIdx + 1 < session.solves.length) {
                activeReconOverlaySolves = [session.solves[currentIdx + 1]];
            } else {
                activeReconOverlaySolves = [];
            }
        } else {
            activeReconOverlaySolves = [];
        }

        if (movementChart && activeReconSolve) {
            movementChart.setSolve(activeReconSolve, reconCurrentStep - 1, activeReconOverlaySolves);
        }
    }

    if (elements.selectReconOverlay) {
        elements.selectReconOverlay.addEventListener('change', updateReconOverlaySolves);
    }

    if (elements.toggleReconCumulative) {
        elements.toggleReconCumulative.addEventListener('change', () => {
            if (movementChart) {
                movementChart.options.cumulativeCurve.enabled = elements.toggleReconCumulative.checked;
                movementChart.render();
            }
        });
    }

    if (elements.toggleReconDerivative) {
        elements.toggleReconDerivative.addEventListener('change', () => {
            if (movementChart) {
                movementChart.options.derivativeBars.enabled = elements.toggleReconDerivative.checked;
                movementChart.render();
            }
        });
    }

    if (elements.toggleReconTps) {
        elements.toggleReconTps.addEventListener('change', () => {
            if (movementChart) {
                movementChart.options.tpsCurve.enabled = elements.toggleReconTps.checked;
                movementChart.render();
            }
        });
    }

    if (elements.toggleReconStageBands) {
        elements.toggleReconStageBands.addEventListener('change', () => {
            if (movementChart) {
                const enabled = elements.toggleReconStageBands.checked;
                movementChart.options.showStageBands = enabled;
                movementChart.options.showStageDividers = enabled;
                movementChart.options.showStageLabels = enabled;
                movementChart.render();
            }
        });
    }

    // -------------------------------------------------------------
    // 8. Data Analysis & Multi-AoX Trends (Phase 4)
    // -------------------------------------------------------------
    function updateTrendChartOptions() {
        if (!trendChart) return;
        const customX = parseInt(elements.inputCustomX.value, 10) || 25;
        const smooth = elements.toggleTrendSmooth.checked;
        const yRangeMode = elements.selectTrendYRange ? elements.selectTrendYRange.value : 'auto90';

        if (elements.trendCustomYGroup) {
            elements.trendCustomYGroup.style.display = yRangeMode === 'custom' ? 'inline-flex' : 'none';
        }

        const minYMs = elements.inputTrendMinY ? parseFloat(elements.inputTrendMinY.value) * 1000 : null;
        const maxYMs = elements.inputTrendMaxY ? parseFloat(elements.inputTrendMaxY.value) * 1000 : null;

        trendChart.options.customX = customX;
        trendChart.options.enableSmoothing = smooth;
        trendChart.options.yRangeMode = yRangeMode;
        trendChart.options.customMinY = minYMs;
        trendChart.options.customMaxY = maxYMs;

        trendChart.options.seriesConfig[0].enabled = elements.toggleSeriesRaw.checked;
        trendChart.options.seriesConfig[1].enabled = elements.toggleSeriesAo5.checked;
        trendChart.options.seriesConfig[2].enabled = elements.toggleSeriesAo12.checked;
        trendChart.options.seriesConfig[3].enabled = elements.toggleSeriesAox.checked;

        if (elements.colorSeriesRaw) trendChart.options.seriesConfig[0].color = elements.colorSeriesRaw.value;
        if (elements.widthSeriesRaw) trendChart.options.seriesConfig[0].width = parseFloat(elements.widthSeriesRaw.value);

        if (elements.colorSeriesAo5) trendChart.options.seriesConfig[1].color = elements.colorSeriesAo5.value;
        if (elements.widthSeriesAo5) trendChart.options.seriesConfig[1].width = parseFloat(elements.widthSeriesAo5.value);

        if (elements.colorSeriesAo12) trendChart.options.seriesConfig[2].color = elements.colorSeriesAo12.value;
        if (elements.widthSeriesAo12) trendChart.options.seriesConfig[2].width = parseFloat(elements.widthSeriesAo12.value);

        if (elements.colorSeriesAox) trendChart.options.seriesConfig[3].color = elements.colorSeriesAox.value;
        if (elements.widthSeriesAox) trendChart.options.seriesConfig[3].width = parseFloat(elements.widthSeriesAox.value);

        trendChart.render();
    }

    if (elements.btnToggleCurveStyles && elements.trendStylesPanel) {
        elements.btnToggleCurveStyles.addEventListener('click', () => {
            const isHidden = elements.trendStylesPanel.style.display === 'none';
            elements.trendStylesPanel.style.display = isHidden ? 'block' : 'none';
        });
    }

    if (elements.selectTrendYRange) {
        elements.selectTrendYRange.addEventListener('change', updateTrendChartOptions);
    }
    if (elements.inputTrendMinY) elements.inputTrendMinY.addEventListener('input', updateTrendChartOptions);
    if (elements.inputTrendMaxY) elements.inputTrendMaxY.addEventListener('input', updateTrendChartOptions);

    [
        elements.colorSeriesRaw, elements.widthSeriesRaw,
        elements.colorSeriesAo5, elements.widthSeriesAo5,
        elements.colorSeriesAo12, elements.widthSeriesAo12,
        elements.colorSeriesAox, elements.widthSeriesAox
    ].forEach(input => {
        if (input) input.addEventListener('input', updateTrendChartOptions);
    });

    if (elements.btnRefreshTrend) elements.btnRefreshTrend.addEventListener('click', () => {
        if (trendChart) trendChart.setData(session.solves);
    });

    [elements.toggleSeriesRaw, elements.toggleSeriesAo5, elements.toggleSeriesAo12, elements.toggleSeriesAox, elements.toggleTrendSmooth].forEach(cb => {
        if (cb) cb.addEventListener('change', updateTrendChartOptions);
    });
    if (elements.inputCustomX) elements.inputCustomX.addEventListener('input', updateTrendChartOptions);

    // -------------------------------------------------------------
    // 9. Dedicated Algorithm Practice Engine (Phase 5)
    // -------------------------------------------------------------
    let activePracticeCase = null;
    let practiceMoves = [];
    let practiceStartTime = 0;
    let practiceTimerInterval = null;
    let practiceState = 'IDLE'; // IDLE, RUNNING, COMPLETED, DEVIATED

    function initPracticeView() {
        if (!window.AlgDatabase) return;
        renderPracticeCategories();
        renderPracticeCaseList();
    }

    function renderPracticeCategories() {
        if (!elements.selectAlgCategory || !window.AlgDatabase) return;
        const categories = AlgDatabase.getCategories();
        let html = '<option value="ALL">All Categories</option>';
        categories.forEach(cat => {
            html += `<option value="${cat}">${cat}</option>`;
        });
        elements.selectAlgCategory.innerHTML = html;
    }

    function renderPracticeCaseList() {
        if (!elements.caseListContainer || !window.AlgDatabase) return;
        const selectedCat = elements.selectAlgCategory ? elements.selectAlgCategory.value : 'ALL';
        const searchQuery = elements.inputSearchAlg ? elements.inputSearchAlg.value.toLowerCase().trim() : '';

        let cases = selectedCat === 'ALL' ? AlgDatabase.getAllCases() : AlgDatabase.getCasesByCategory(selectedCat);

        if (searchQuery) {
            cases = cases.filter(c => c.name.toLowerCase().includes(searchQuery) || c.alg.toLowerCase().includes(searchQuery));
        }

        let html = '';
        cases.forEach(c => {
            const isSelected = activePracticeCase && activePracticeCase.id === c.id;
            html += `
                <div class="case-item ${isSelected ? 'active' : ''}" data-id="${c.id}">
                    <div style="display: flex; flex-direction: column; gap: 0.15rem;">
                        <span style="font-weight: 700; font-size: 0.88rem;">${c.name}</span>
                        <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted);">${c.alg}</span>
                    </div>
                    <span class="badge badge-move" style="font-size: 0.75rem;">${c.moves}m</span>
                </div>
            `;
        });

        if (cases.length === 0) {
            html = `<div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No cases found matching filter.</div>`;
        }

        elements.caseListContainer.innerHTML = html;

        elements.caseListContainer.querySelectorAll('.case-item').forEach(item => {
            item.addEventListener('click', () => {
                const caseId = item.dataset.id;
                selectPracticeCase(caseId);
            });
        });

        if (!activePracticeCase && cases.length > 0) {
            selectPracticeCase(cases[0].id);
        }
    }

    function selectPracticeCase(caseId) {
        if (!window.AlgDatabase) return;
        const c = AlgDatabase.getCaseById(caseId);
        if (!c) return;

        activePracticeCase = c;
        elements.practiceCaseName.textContent = c.name;
        elements.practiceCaseGroup.textContent = c.group;
        elements.practiceCaseMoves.textContent = `${c.moves} moves`;

        // Render colorized alg string
        const tokens = c.alg.split(/\s+/).map(m => `<span class="move-token ${getMoveColorClass(m)}">${m}</span>`).join(' ');
        elements.practiceAlgBox.innerHTML = tokens;

        resetPracticeAttempt();
        renderPracticeCaseList();
    }

    if (elements.selectAlgCategory) elements.selectAlgCategory.addEventListener('change', renderPracticeCaseList);
    if (elements.inputSearchAlg) elements.inputSearchAlg.addEventListener('input', renderPracticeCaseList);

    function resetPracticeAttempt() {
        if (practiceTimerInterval) {
            clearInterval(practiceTimerInterval);
            practiceTimerInterval = null;
        }
        practiceState = 'IDLE';
        practiceMoves = [];
        practiceStartTime = 0;
        elements.practiceTimerDigits.textContent = '0.00';
        elements.practiceLiveTps.textContent = '0.00 TPS';
        elements.practiceLiveStep.textContent = `Step 0 / ${activePracticeCase ? activePracticeCase.moves : 0}`;
        elements.practiceStatusBanner.className = 'practice-status-banner status-idle';
        elements.practiceStatusBanner.innerHTML = `<span>Turn your cube to practice! Sequence matching starts on 1st move.</span>`;
    }

    if (elements.btnResetPractice) elements.btnResetPractice.addEventListener('click', resetPracticeAttempt);

    function handlePracticeCubeMove(moveStr) {
        if (!activePracticeCase) return;

        const now = performance.now();
        if (practiceState === 'IDLE' || practiceState === 'COMPLETED') {
            practiceState = 'RUNNING';
            practiceMoves = [];
            practiceStartTime = now;
            elements.practiceStatusBanner.className = 'practice-status-banner status-running';

            if (practiceTimerInterval) clearInterval(practiceTimerInterval);
            practiceTimerInterval = setInterval(() => {
                const elapsed = performance.now() - practiceStartTime;
                elements.practiceTimerDigits.textContent = (elapsed / 1000).toFixed(2);
            }, 30);
        }

        practiceMoves.push(moveStr);
        const matchResult = AlgDatabase.matchSequence(practiceMoves, activePracticeCase.alg);

        const elapsedSec = Math.max(0.01, (now - practiceStartTime) / 1000);
        const instantTps = (practiceMoves.length / elapsedSec).toFixed(2);
        elements.practiceLiveTps.textContent = `${instantTps} TPS`;
        elements.practiceLiveStep.textContent = `Step ${matchResult.matchedCount} / ${matchResult.totalMoves}`;

        if (matchResult.isComplete) {
            // Algorithm Finished!
            if (practiceTimerInterval) {
                clearInterval(practiceTimerInterval);
                practiceTimerInterval = null;
            }
            practiceState = 'COMPLETED';
            const finalSec = ((now - practiceStartTime) / 1000).toFixed(2);
            elements.practiceTimerDigits.textContent = finalSec;
            elements.practiceStatusBanner.className = 'practice-status-banner status-complete';
            elements.practiceStatusBanner.innerHTML = `<span>COMPLETED! Time: <strong>${finalSec}s</strong> @ <strong>${instantTps} TPS</strong></span>`;
            sound.playSolveComplete();
        } else if (matchResult.isMatch) {
            // Move matches prefix
            elements.practiceStatusBanner.className = 'practice-status-banner status-running';
            elements.practiceStatusBanner.innerHTML = `<span>Matching sequence... Next move: <strong>${matchResult.nextExpected}</strong></span>`;
        } else {
            // Wrong move / deviation
            practiceState = 'DEVIATED';
            elements.practiceStatusBanner.className = 'practice-status-banner status-warning';
            elements.practiceStatusBanner.innerHTML = `<span>Wrong move (${moveStr})! Expected <strong>${matchResult.nextExpected}</strong></span>`;
            sound.playScrambleWarning();
        }
    }

    // Custom Algorithm Modal
    if (elements.btnAddCustomAlg) {
        elements.btnAddCustomAlg.addEventListener('click', () => {
            elements.modalCustomAlg.classList.add('active');
        });
    }
    if (elements.btnCloseCustomAlg) {
        elements.btnCloseCustomAlg.addEventListener('click', () => {
            elements.modalCustomAlg.classList.remove('active');
        });
    }
    if (elements.btnSaveCustomAlg) {
        elements.btnSaveCustomAlg.addEventListener('click', () => {
            const name = elements.inputCustomAlgName.value.trim();
            const moves = elements.inputCustomAlgMoves.value.trim();
            const group = elements.inputCustomAlgGroup.value.trim() || 'Custom Cases';
            const desc = elements.inputCustomAlgDesc.value.trim();

            if (!name || !moves) {
                alert("Please provide both algorithm name and move sequence!");
                return;
            }

            const created = AlgDatabase.addCustomCase(name, moves, group, desc);
            elements.modalCustomAlg.classList.remove('active');
            elements.inputCustomAlgName.value = '';
            elements.inputCustomAlgMoves.value = '';
            elements.inputCustomAlgDesc.value = '';
            renderPracticeCategories();
            renderPracticeCaseList();
            selectPracticeCase(created.id);
        });
    }

    // -------------------------------------------------------------
    // 10. Settings & Modal Controls
    // -------------------------------------------------------------
    elements.inputMacOverride.value = bluetooth.macOverride;
    elements.btnSaveMac.addEventListener('click', () => {
        const val = elements.inputMacOverride.value.trim();
        if (val) {
            bluetooth.setMacOverride(val);
            localStorage.setItem('cube_mac_override', val);
            alert(`MAC override saved: ${val}`);
        }
    });

    elements.btnSettings.addEventListener('click', () => {
        elements.inputMacOverride.value = bluetooth.macOverride;
        elements.toggleInspection.checked = timer.inspectionEnabled;
        if (elements.toggleScrambleAlerts) elements.toggleScrambleAlerts.checked = scrambleAlertsEnabled;
        elements.toggleSound.checked = sound.enabled;
        elements.toggleVoice.checked = sound.voiceEnabled;
        if (elements.selectBtTimeout) elements.selectBtTimeout.value = String(btInactivityTimeoutSec);
        elements.modalSettings.classList.add('active');
    });

    elements.btnCloseSettings.addEventListener('click', () => {
        elements.modalSettings.classList.remove('active');
    });

    elements.btnHelp.addEventListener('click', () => {
        elements.modalHelp.classList.add('active');
    });

    elements.btnCloseHelp.addEventListener('click', () => {
        elements.modalHelp.classList.remove('active');
    });

    elements.btnCloseReconstruct.addEventListener('click', () => {
        if (reconPlaybackTimer) {
            clearInterval(reconPlaybackTimer);
            reconPlaybackTimer = null;
        }
        elements.modalReconstruct.classList.remove('active');
    });

    document.querySelectorAll('.modal-backdrop').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    elements.toggleInspection.addEventListener('change', (e) => {
        timer.inspectionEnabled = e.target.checked;
        localStorage.setItem('inspection_enabled', String(timer.inspectionEnabled));
    });

    if (elements.toggleScrambleAlerts) {
        elements.toggleScrambleAlerts.addEventListener('change', (e) => {
            scrambleAlertsEnabled = e.target.checked;
            localStorage.setItem('scramble_alerts_enabled', String(scrambleAlertsEnabled));
        });
    }

    elements.toggleSound.addEventListener('change', (e) => {
        sound.enabled = e.target.checked;
        localStorage.setItem('sound_enabled', String(sound.enabled));
    });

    elements.toggleVoice.addEventListener('change', (e) => {
        sound.voiceEnabled = e.target.checked;
        localStorage.setItem('voice_enabled', String(sound.voiceEnabled));
    });

    if (elements.selectBtTimeout) {
        elements.selectBtTimeout.value = String(btInactivityTimeoutSec);
        elements.selectBtTimeout.addEventListener('change', (e) => {
            btInactivityTimeoutSec = parseInt(e.target.value, 10);
            localStorage.setItem('bt_inactivity_timeout', String(btInactivityTimeoutSec));
            resetBtInactivityTimer();
        });
    }

    // Solve Stage Analysis Method (CFOP Pairs cffffop default)
    if (elements.selectSettingsReconMethod) {
        const savedMethod = localStorage.getItem('rubiks_recon_method') || 'CFOP_PAIRS';
        elements.selectSettingsReconMethod.value = savedMethod;
        elements.selectSettingsReconMethod.addEventListener('change', (e) => {
            localStorage.setItem('rubiks_recon_method', e.target.value);
            triggerHaptic('light');
            if (latestFinishedSolve) {
                renderMainSolveBreakdown(latestFinishedSolve);
            }
        });
    }

    // Visual Style Selector Listener
    if (elements.selectUiStyle) {
        elements.selectUiStyle.value = currentUiStyle;
        elements.selectUiStyle.addEventListener('change', (e) => {
            applyThemeAndStyle(e.target.value, currentAccentColor);
            triggerHaptic('light');
        });
    }

    // Accent Color Selector Listener
    if (elements.selectAccentColor) {
        elements.selectAccentColor.value = currentAccentColor;
        elements.selectAccentColor.addEventListener('change', (e) => {
            applyThemeAndStyle(currentUiStyle, e.target.value);
            triggerHaptic('light');
        });
    }

    // Interactive Color Palette Swatch Buttons (Instant Touch Switch)
    document.querySelectorAll('.swatch-btn[data-color]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const color = btn.dataset.color;
            if (color) {
                applyThemeAndStyle(currentUiStyle, color);
                triggerHaptic('light');
            }
        });
    });

    if (elements.selectTheme) {
        elements.selectTheme.value = currentUiStyle;
        elements.selectTheme.addEventListener('change', (e) => {
            applyThemeAndStyle(e.target.value, currentAccentColor);
        });
    }

    elements.btnReset3dCam.addEventListener('click', () => {
        if (renderer3D) renderer3D.resetOrientation();
    });

    // Tap / Click Timer Interaction
    elements.mainTimerContainer.addEventListener('click', (e) => {
        resetBtInactivityTimer();
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;

        if (timer.state === 'IDLE' || timer.state === 'READY' || timer.state === 'SCRAMBLING') {
            if (timer.inspectionEnabled) {
                timer.startInspection();
            } else {
                timer.startTimer();
            }
        } else if (timer.state === 'INSPECTION') {
            timer.startTimer();
        } else if (timer.state === 'RUNNING') {
            timer.stopTimer();
        }
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
        resetBtInactivityTimer();
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.code === 'Space') {
            e.preventDefault();
            if (currentView === 'view-timer') {
                if (timer.state === 'IDLE' || timer.state === 'READY' || timer.state === 'SCRAMBLING') {
                    if (timer.inspectionEnabled) timer.startInspection();
                    else timer.startTimer();
                } else if (timer.state === 'INSPECTION') {
                    timer.startTimer();
                } else if (timer.state === 'RUNNING') {
                    timer.stopTimer();
                }
            } else if (currentView === 'view-practice') {
                resetPracticeAttempt();
            }
        } else if (e.code === 'Escape') {
            if (elements.modalSettings.classList.contains('active')) elements.modalSettings.classList.remove('active');
            if (elements.modalHelp.classList.contains('active')) elements.modalHelp.classList.remove('active');
            if (elements.modalReconstruct.classList.contains('active')) elements.modalReconstruct.classList.remove('active');
            if (elements.modalCustomAlg && elements.modalCustomAlg.classList.contains('active')) elements.modalCustomAlg.classList.remove('active');
            timer.resetTimer();
        } else if (e.key === 'n' || e.key === 'N') {
            if (currentView === 'view-timer') setNewScramble();
        } else if (e.key === 'r' || e.key === 'R') {
            if (currentView === 'view-timer') recalibrateCube();
            else if (currentView === 'view-practice') resetPracticeAttempt();
        }
    });

    // Window Resize & Reorientation Adaptive Redraw
    window.addEventListener('resize', () => {
        if (renderer3D && elements.cube3dContainer) {
            const rect = elements.cube3dContainer.getBoundingClientRect();
            const sz = Math.min(rect.width || 180, rect.height || 180) || 180;
            renderer3D.resize(sz, sz);
        }
        if (trendChart && currentView === 'view-analytics') {
            trendChart.render();
        }
        if (mainMovementChart && elements.mainSolveBreakdownCard && elements.mainSolveBreakdownCard.style.display !== 'none') {
            mainMovementChart.render();
        }
    });

    // -------------------------------------------------------------
    // 11. Initial Application Boot
    // -------------------------------------------------------------
    initModuleToggles();
    renderStatsAndHistory();
    if (session.solves && session.solves.length > 0) {
        renderMainSolveBreakdown(session.solves[0]);
    }
    syncAllModuleUIs();
    setNewScramble();
});
