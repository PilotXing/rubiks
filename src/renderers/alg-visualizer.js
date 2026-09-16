/**
 * alg-visualizer.js
 * High-Performance Category-Adaptive 2D Algorithm Diagram Visualizer
 * Supports Last-Layer (OLL/PLL/ZBLL/CMLL/Triggers), 2.5D Isometric F2L, and Chi-Chu BLD 3-Cycle Diagrams.
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.AlgVisualizer = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {
    'use strict';

    const COLOR_PALETTE = {
        'U': '#FFE600', // Yellow (Top)
        'F': '#EF4444', // Red (Front)
        'R': '#10B981', // Green (Right)
        'B': '#FF5800', // Orange (Back)
        'L': '#3B82F6', // Blue (Left)
        'D': '#FFFFFF', // White (Bottom)
        'GRAY': '#27272A', // Dimmed / Unoriented Gray
        'BORDER': '#18181B'
    };

    // Cache computed facelet strings for algorithm sequences
    const _stateCache = new Map();

    function getSetupFacelets(algStr) {
        if (!algStr) return 'UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB';
        const cleanKey = algStr.trim();
        if (_stateCache.has(cleanKey)) return _stateCache.get(cleanKey);

        const algDb = (typeof window !== 'undefined' && window.AlgDatabase) ? window.AlgDatabase : (typeof AlgDatabase !== 'undefined' ? AlgDatabase : null);
        const cubeEng = (typeof window !== 'undefined' && window.CubeEngine) ? window.CubeEngine : (typeof CubeEngine !== 'undefined' ? CubeEngine : null);

        if (!algDb || !cubeEng || !cubeEng.RubiksCube) {
            return 'UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB';
        }

        try {
            const steps = algDb.compileAlgorithm(algStr);
            const flatMoves = [];
            steps.forEach(s => s.physicalMoves.forEach(m => flatMoves.push(m)));
            const invMoves = cubeEng.invertMoves(flatMoves);
            const cube = new cubeEng.RubiksCube();
            cube.applyMoves(invMoves);
            const facelets = cube.getFacelets();
            _stateCache.set(cleanKey, facelets);
            return facelets;
        } catch (e) {
            console.warn('AlgVisualizer state computation error:', e);
            return 'UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB';
        }
    }

    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    /**
     * Draw standard Last-Layer 2D top-down diagram:
     * - Top face (正面): 3x3 square blocks (方块)
     * - Side faces (侧面): 4 peripheral bar strips (长条 bar)
     */
    function drawLastLayerView(ctx, facelets, isOLL, width, height, options = {}) {
        ctx.clearRect(0, 0, width, height);

        const pad = options.padding || Math.max(2, Math.round(width * 0.05));
        const availSize = Math.min(width, height) - pad * 2;

        // Proportions for Square Face vs Slender Peripheral Bars
        const barThicknessRatio = 0.26; // Bar thickness relative to square cell size
        const barGapRatio = 0.16;       // Gap between central 3x3 square grid and outer bars
        const cellGapRatio = 0.08;      // Gap between adjacent square cells and adjacent bars

        const factor = 3 + 2 * cellGapRatio + 2 * barGapRatio + 2 * barThicknessRatio;
        const cellSize = availSize / factor;
        const barThickness = Math.max(2.2, cellSize * barThicknessRatio);
        const barGap = Math.max(1.6, cellSize * barGapRatio);
        const gap = Math.max(1.0, cellSize * cellGapRatio);

        const centerSize = 3 * cellSize + 2 * gap;
        const startX = (width - centerSize) / 2;
        const startY = (height - centerSize) / 2;

        const getStickerColor = (char, isTopFace = true) => {
            if (isOLL) {
                if (char === 'U') return COLOR_PALETTE.U;
                return isTopFace ? COLOR_PALETTE.GRAY : 'rgba(39, 39, 42, 0.3)';
            }
            return COLOR_PALETTE[char] || COLOR_PALETTE.GRAY;
        };

        // 1. Draw Central 3x3 Top Face as Squares (正面显示为方块)
        // Row 0: 0(ULB), 1(UB), 2(UBR)
        // Row 1: 3(UL),  4(U),  5(UR)
        // Row 2: 6(UFL), 7(UF), 8(URF)
        const uIndices = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8]
        ];

        const strokeWidth = Math.max(1, width * 0.015);
        const cellRadius = Math.max(1.5, cellSize * 0.14);
        const barRadius = Math.max(1.0, barThickness * 0.35);

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const idx = uIndices[r][c];
                const char = facelets.charAt(idx) || 'U';
                const color = getStickerColor(char, true);

                const x = startX + c * (cellSize + gap);
                const y = startY + r * (cellSize + gap);

                ctx.fillStyle = color;
                roundRect(ctx, x, y, cellSize, cellSize, cellRadius);
                ctx.fill();

                ctx.strokeStyle = COLOR_PALETTE.BORDER;
                ctx.lineWidth = strokeWidth;
                ctx.stroke();
            }
        }

        // 2. Draw 4 Peripheral Side Strips as Bars (侧面显示为 bar)

        // Top Fringe: Back face top row [47(ULB), 46(UB), 45(UBR)] -> Horizontal bars
        const topIndices = [47, 46, 45];
        const topY = startY - barGap - barThickness;
        for (let c = 0; c < 3; c++) {
            const char = facelets.charAt(topIndices[c]) || 'B';
            const color = getStickerColor(char, false);
            if (!isOLL || char === 'U') {
                const x = startX + c * (cellSize + gap);
                ctx.fillStyle = color;
                roundRect(ctx, x, topY, cellSize, barThickness, barRadius);
                ctx.fill();
                ctx.strokeStyle = COLOR_PALETTE.BORDER;
                ctx.lineWidth = strokeWidth * 0.85;
                ctx.stroke();
            }
        }

        // Bottom Fringe: Front face top row [18(UFL), 19(UF), 20(URF)] -> Horizontal bars
        const botIndices = [18, 19, 20];
        const botY = startY + centerSize + barGap;
        for (let c = 0; c < 3; c++) {
            const char = facelets.charAt(botIndices[c]) || 'F';
            const color = getStickerColor(char, false);
            if (!isOLL || char === 'U') {
                const x = startX + c * (cellSize + gap);
                ctx.fillStyle = color;
                roundRect(ctx, x, botY, cellSize, barThickness, barRadius);
                ctx.fill();
                ctx.strokeStyle = COLOR_PALETTE.BORDER;
                ctx.lineWidth = strokeWidth * 0.85;
                ctx.stroke();
            }
        }

        // Left Fringe: Left face top row [36(ULB), 37(UL), 38(UFL)] -> Vertical bars
        const leftIndices = [36, 37, 38];
        const leftX = startX - barGap - barThickness;
        for (let r = 0; r < 3; r++) {
            const char = facelets.charAt(leftIndices[r]) || 'L';
            const color = getStickerColor(char, false);
            if (!isOLL || char === 'U') {
                const y = startY + r * (cellSize + gap);
                ctx.fillStyle = color;
                roundRect(ctx, leftX, y, barThickness, cellSize, barRadius);
                ctx.fill();
                ctx.strokeStyle = COLOR_PALETTE.BORDER;
                ctx.lineWidth = strokeWidth * 0.85;
                ctx.stroke();
            }
        }

        // Right Fringe: Right face top row [11(UBR), 10(UR), 9(URF)] -> Vertical bars
        const rightIndices = [11, 10, 9];
        const rightX = startX + centerSize + barGap;
        for (let r = 0; r < 3; r++) {
            const char = facelets.charAt(rightIndices[r]) || 'R';
            const color = getStickerColor(char, false);
            if (!isOLL || char === 'U') {
                const y = startY + r * (cellSize + gap);
                ctx.fillStyle = color;
                roundRect(ctx, rightX, y, barThickness, cellSize, barRadius);
                ctx.fill();
                ctx.strokeStyle = COLOR_PALETTE.BORDER;
                ctx.lineWidth = strokeWidth * 0.85;
                ctx.stroke();
            }
        }
    }

    const F2L_CORNERS = [
        { name: 'URF', indices: [8, 20, 9] },
        { name: 'UFL', indices: [6, 18, 38] },
        { name: 'ULB', indices: [0, 36, 47] },
        { name: 'UBR', indices: [2, 45, 11] },
        { name: 'DFR', indices: [29, 26, 15] },
        { name: 'DFL', indices: [27, 24, 44] },
        { name: 'DBL', indices: [33, 42, 53] },
        { name: 'DBR', indices: [35, 51, 17] }
    ];

    const F2L_EDGES = [
        { name: 'UR', indices: [5, 10] },
        { name: 'UF', indices: [7, 19] },
        { name: 'UL', indices: [3, 37] },
        { name: 'UB', indices: [1, 46] },
        { name: 'FR', indices: [23, 12] },
        { name: 'FL', indices: [21, 41] },
        { name: 'BL', indices: [50, 39] },
        { name: 'BR', indices: [48, 14] },
        { name: 'DR', indices: [32, 16] },
        { name: 'DF', indices: [28, 25] },
        { name: 'DL', indices: [30, 43] },
        { name: 'DB', indices: [34, 52] }
    ];

    function getF2LActiveIndices(facelets) {
        const active = new Set();
        // Centers: U (4), F (22), R (13)
        active.add(4);
        active.add(22);
        active.add(13);

        // Cross bottom edges visible on F and R faces: DF (25), DR (16)
        active.add(25);
        active.add(16);

        // Target Corner piece with colors {D, F, R}
        for (let i = 0; i < F2L_CORNERS.length; i++) {
            const co = F2L_CORNERS[i];
            const chars = co.indices.map(idx => facelets.charAt(idx) || '').sort().join('');
            if (chars === 'DFR') {
                co.indices.forEach(idx => active.add(idx));
                break;
            }
        }

        // Target Edge piece with colors {F, R}
        for (let i = 0; i < F2L_EDGES.length; i++) {
            const ed = F2L_EDGES[i];
            const chars = ed.indices.map(idx => facelets.charAt(idx) || '').sort().join('');
            if (chars === 'FR') {
                ed.indices.forEach(idx => active.add(idx));
                break;
            }
        }

        return active;
    }

    /**
     * Draw 30-degree isometric full cube view for F2L & Advanced F2L:
     * - Target FR slot in front
     * - Target Corner & Edge colored with actual setup colors
     * - Centers & Cross bottom edges colored
     * - All other pieces remain neutral dark gray (#27272A)
     */
    function drawF2LView(ctx, facelets, width, height, options = {}) {
        ctx.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height * 0.50;
        const scale = Math.min(width, height) * 0.155;

        const sin30 = 0.5;
        const cos30 = 0.8660254;

        function projectIso(x, y, z) {
            // Isometric projection: 30 degrees above horizon, FR slot facing front
            const px = cx + (y - x) * cos30 * scale;
            const py = cy + (x + y) * sin30 * scale - z * scale;
            return { x: px, y: py };
        }

        function drawPolygon(pts, color, strokeColor = COLOR_PALETTE.BORDER, lineWidth = 1) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        }

        const activeIndices = getF2LActiveIndices(facelets);
        const margin = 0.055;
        const strokeWidth = Math.max(1, width * 0.015);

        // Helper to get color: active pieces colored, others remain gray
        const getStickerColor = (idx) => {
            if (activeIndices.has(idx)) {
                const char = facelets.charAt(idx) || 'U';
                return COLOR_PALETTE[char] || COLOR_PALETTE.GRAY;
            }
            return COLOR_PALETTE.GRAY;
        };

        // 1. Top Face (U): z = 1.5, x in [-1.5, 1.5], y in [-1.5, 1.5]
        const uMap = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8]
        ];
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const idx = uMap[r][c];
                const color = getStickerColor(idx);

                const x0 = -1.5 + r + margin;
                const x1 = -1.5 + (r + 1) - margin;
                const y0 = -1.5 + c + margin;
                const y1 = -1.5 + (c + 1) - margin;
                const z = 1.5;

                const pts = [
                    projectIso(x0, y0, z),
                    projectIso(x1, y0, z),
                    projectIso(x1, y1, z),
                    projectIso(x0, y1, z)
                ];
                drawPolygon(pts, color, COLOR_PALETTE.BORDER, strokeWidth);
            }
        }

        // 2. Front Face (F): x = 1.5, y in [-1.5, 1.5], z in [-1.5, 1.5]
        const fMap = [
            [18, 19, 20],
            [21, 22, 23],
            [24, 25, 26]
        ];
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const idx = fMap[r][c];
                const color = getStickerColor(idx);

                const x = 1.5;
                const y0 = -1.5 + c + margin;
                const y1 = -1.5 + (c + 1) - margin;
                const z0 = 1.5 - r - margin;
                const z1 = 1.5 - (r + 1) + margin;

                const pts = [
                    projectIso(x, y0, z0),
                    projectIso(x, y1, z0),
                    projectIso(x, y1, z1),
                    projectIso(x, y0, z1)
                ];
                drawPolygon(pts, color, COLOR_PALETTE.BORDER, strokeWidth);
            }
        }

        // 3. Right Face (R): y = 1.5, x in [-1.5, 1.5], z in [-1.5, 1.5]
        const rMap = [
            [9, 10, 11],
            [12, 13, 14],
            [15, 16, 17]
        ];
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const idx = rMap[r][c];
                const color = getStickerColor(idx);

                const y = 1.5;
                const x0 = 1.5 - c - margin;
                const x1 = 1.5 - (c + 1) + margin;
                const z0 = 1.5 - r - margin;
                const z1 = 1.5 - (r + 1) + margin;

                const pts = [
                    projectIso(x0, y, z0),
                    projectIso(x1, y, z0),
                    projectIso(x1, y, z1),
                    projectIso(x0, y, z1)
                ];
                drawPolygon(pts, color, COLOR_PALETTE.BORDER, strokeWidth);
            }
        }
    }

    class AlgorithmVisualizer {
        constructor() {}

        renderCase(canvas, caseObj, options = {}) {
            if (!canvas || !caseObj) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const displayW = options.width || canvas.clientWidth || 52;
            const displayH = options.height || canvas.clientHeight || 52;

            canvas.width = Math.round(displayW * dpr);
            canvas.height = Math.round(displayH * dpr);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);

            const group = caseObj.group || '';
            const algStr = caseObj.alg || (caseObj.algs && caseObj.algs[0]) || '';

            if (group.startsWith('F2L') || group.startsWith('Advanced F2L')) {
                const facelets = getSetupFacelets(algStr);
                drawF2LView(ctx, facelets, displayW, displayH, options);
            } else {
                // Last Layer & Chi-Chu BLD (OLL, PLL, ZBLL, CMLL, Triggers, 彳亍盲拧, Custom)
                const isOLL = group.startsWith('OLL');
                const facelets = getSetupFacelets(algStr);
                drawLastLayerView(ctx, facelets, isOLL, displayW, displayH, options);
            }
        }
    }

    return new AlgorithmVisualizer();
}));
