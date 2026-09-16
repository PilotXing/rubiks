/**
 * cube-engine.js
 * 3x3 Rubik's Cube Model, WCA Scramble Generator, Facelet Mapper, and Smart Scramble Correction Pathfinder
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['min2phase'], factory);
    } else if (typeof module === 'object' && module.exports) {
        let m2p = null;
        try { m2p = require('../../lib/min2phase'); } catch (e) {
            try { m2p = require('./min2phase'); } catch (e2) {}
        }
        module.exports = factory(m2p);
    } else {
        root.CubeEngine = factory(root.min2phase);
    }
}(typeof self !== 'undefined' ? self : this, function(min2phase) {
    'use strict';

    // Ensure min2phase is initialized
    if (min2phase && typeof min2phase.initialize === 'function') {
        min2phase.initialize();
    }

    // Move index mapping in min2phase
    // ["U", "U2", "U'", "R", "R2", "R'", "F", "F2", "F'", "D", "D2", "D'", "L", "L2", "L'", "B", "B2", "B'"]
    const MOVE_NAMES = [
        "U", "U2", "U'",
        "R", "R2", "R'",
        "F", "F2", "F'",
        "D", "D2", "D'",
        "L", "L2", "L'",
        "B", "B2", "B'"
    ];

    const MOVE_MAP = {};
    MOVE_NAMES.forEach((name, idx) => {
        MOVE_MAP[name] = idx;
        // Also support moves with spaces or lowercase
        MOVE_MAP[name.trim()] = idx;
    });
    // Add single-char aliases
    MOVE_MAP["U"] = 0; MOVE_MAP["R"] = 3; MOVE_MAP["F"] = 6;
    MOVE_MAP["D"] = 9; MOVE_MAP["L"] = 12; MOVE_MAP["B"] = 15;

    /**
     * Return the production CSS state for a step in the scramble reel.
     * Kept here as a pure function so rendering and regression tests share it.
     */
    function getScrambleStepClasses(idx, activeIdx, visiblePrev = 1, visibleNext = 5) {
        const previous = Math.max(0, Number(visiblePrev) || 0);
        const next = Math.max(0, Number(visibleNext) || 0);

        if (idx < activeIdx) {
            return {
                cls: 'step-done',
                farCls: idx < activeIdx - previous
                    ? 'step-far step-hidden'
                    : (idx < activeIdx - 1 ? 'step-far' : '')
            };
        }
        if (idx === activeIdx) {
            return { cls: 'step-active', farCls: '' };
        }
        return {
            cls: 'step-pending',
            farCls: idx > activeIdx + next
                ? 'step-far step-hidden'
                : (idx > activeIdx + Math.min(2, next) ? 'step-far' : '')
        };
    }

    // Corner and Edge Facelet Mappings (Kociemba standard representation)
    const CORNER_FACELET_MAP = [
        [8, 9, 20],   // URF (U8, R0, F2) -> [U8, R9, F20]
        [6, 18, 38],  // UFL
        [0, 36, 47],  // ULB
        [2, 45, 11],  // UBR
        [29, 26, 15], // DFR
        [27, 44, 24], // DLF
        [33, 53, 42], // DBL
        [35, 17, 51]  // DRB
    ];

    const EDGE_FACELET_MAP = [
        [5, 10],  // UR
        [7, 19],  // UF
        [3, 37],  // UL
        [1, 46],  // UB
        [32, 16], // DR
        [28, 25], // DF
        [30, 43], // DL
        [34, 52], // DB
        [23, 12], // FR
        [21, 41], // FL
        [50, 39], // BL
        [48, 14]  // BR
    ];

    const FACES = "URFDLB";

    /**
     * Convert CP, CO, EP, EO arrays to a 54-character Kociemba facelet string
     */
    function stateToFacelets(cp, co, ep, eo) {
        const facelets = Array(54);
        for (let i = 0; i < 54; i++) {
            facelets[i] = FACES[Math.floor(i / 9)];
        }
        for (let i = 0; i < 8; i++) {
            for (let p = 0; p < 3; p++) {
                const targetIdx = CORNER_FACELET_MAP[i][(p + co[i]) % 3];
                const srcFaceIdx = Math.floor(CORNER_FACELET_MAP[cp[i]][p] / 9);
                facelets[targetIdx] = FACES[srcFaceIdx];
            }
        }
        for (let i = 0; i < 12; i++) {
            for (let p = 0; p < 2; p++) {
                const targetIdx = EDGE_FACELET_MAP[i][(p + eo[i]) % 2];
                const srcFaceIdx = Math.floor(EDGE_FACELET_MAP[ep[i]][p] / 9);
                facelets[targetIdx] = FACES[srcFaceIdx];
            }
        }
        return facelets.join('');
    }

    /**
     * Invert a move string (e.g. "R" -> "R'", "R'" -> "R", "R2" -> "R2")
     */
    function invertMove(move) {
        if (!move) return '';
        move = move.trim();
        if (move.endsWith("2")) return move;
        if (move.endsWith("'")) return move.slice(0, -1);
        return move + "'";
    }

    /**
     * Invert an array of move strings
     */
    function invertMoves(moves) {
        if (!moves || !moves.length) return [];
        return moves.slice().reverse().map(invertMove);
    }

    /**
     * Normalize move string to standard notation
     */
    function normalizeMove(move) {
        if (!move) return '';
        return move.trim().replace(/[’′]/g, "'");
    }

    /**
     * Consolidate simultaneous/consecutive opposite layer turns into middle layer slice moves (M, E, S).
     * Handles hardware-transmitted dual moves like (R' + L -> M'), (F' + B -> S'), (U + D' -> E), etc.
     */
    function consolidateMoves(rawMoves, options = {}) {
        if (!rawMoves || !rawMoves.length) return [];
        const timeWindowMs = options.timeWindowMs !== undefined ? options.timeWindowMs : 140;

        function getMoveStr(item) {
            return typeof item === 'string' ? item.trim() : (item && item.move ? item.move.trim() : '');
        }
        function getTime(item) {
            return typeof item === 'object' && item && typeof item.time === 'number' ? item.time : null;
        }

        const OPPOSITE_SLICE_MAP = {
            // M-slice: L / R opposite turns
            "R' L": "M'", "L R'": "M'",
            "R L'": "M",  "L' R": "M",
            "R2 L2": "M2", "L2 R2": "M2",

            // E-slice: U / D opposite turns
            "U D'": "E",  "D' U": "E",
            "U' D": "E'", "D U'": "E'",
            "U2 D2": "E2", "D2 U2": "E2",

            // S-slice: F / B opposite turns
            "F B'": "S",  "B' F": "S",
            "F' B": "S'", "B F'": "S'",
            "F2 B2": "S2", "B2 F2": "S2",

            // Wide + Outer layer cancellations (M-slice)
            "Rw R'": "M'", "r R'": "M'", "R' Rw": "M'", "R' r": "M'",
            "Rw' R": "M",  "r' R": "M",  "R Rw'": "M",  "R r'": "M",
            "Lw L'": "M",  "l L'": "M",  "L' Lw": "M",  "L' l": "M",
            "Lw' L": "M'", "l' L": "M'", "L Lw'": "M'", "L l'": "M'",
            "Rw2 R2": "M2", "r2 R2": "M2", "R2 Rw2": "M2", "R2 r2": "M2",
            "Lw2 L2": "M2", "l2 L2": "M2", "L2 Lw2": "M2", "L2 l2": "M2",

            // Wide + Outer layer cancellations (E-slice)
            "Uw U'": "E'", "u U'": "E'", "U' Uw": "E'", "U' u": "E'",
            "Uw' U": "E",  "u' U": "E",  "U Uw'": "E",  "U u'": "E",
            "Dw D'": "E",  "d D'": "E",  "D' Dw": "E",  "D' d": "E",
            "Dw' D": "E'", "d' D": "E'", "D Dw'": "E'", "D d'": "E'",
            "Uw2 U2": "E2", "u2 U2": "E2", "U2 Uw2": "E2", "U2 u2": "E2",
            "Dw2 D2": "E2", "d2 D2": "E2", "D2 Dw2": "E2", "D2 d2": "E2",

            // Wide + Outer layer cancellations (S-slice)
            "Fw F'": "S",  "f F'": "S",  "F' Fw": "S",  "F' f": "S",
            "Fw' F": "S'", "f' F": "S'", "F Fw'": "S'", "F f'": "S'",
            "Bw B'": "S'", "b B'": "S'", "B' Bw": "S'", "B' b": "S'",
            "Bw' B": "S",  "b' B": "S",  "B Bw'": "S",  "B b'": "S",
            "Fw2 F2": "S2", "f2 F2": "S2", "F2 Fw2": "S2", "F2 f2": "S2",
            "Bw2 B2": "S2", "b2 B2": "S2", "B2 Bw2": "S2", "B2 b2": "S2"
        };

        const result = [];
        let i = 0;
        while (i < rawMoves.length) {
            const curr = rawMoves[i];
            const next = i + 1 < rawMoves.length ? rawMoves[i + 1] : null;

            if (next) {
                const m1 = getMoveStr(curr);
                const m2 = getMoveStr(next);
                const key = `${m1} ${m2}`;
                const sliceMove = OPPOSITE_SLICE_MAP[key];

                const t1 = getTime(curr);
                const t2 = getTime(next);
                const isSimultaneous = (t1 !== null && t2 !== null) ? Math.abs(t2 - t1) <= timeWindowMs : true;

                if (sliceMove && isSimultaneous) {
                    if (typeof curr === 'object') {
                        result.push({
                            ...curr,
                            move: sliceMove,
                            origMoves: [m1, m2],
                            time: t2 !== null ? t2 : t1
                        });
                    } else {
                        result.push(sliceMove);
                    }
                    i += 2;
                    continue;
                }
            }

            result.push(curr);
            i += 1;
        }

        return result;
    }

    /**
     * Count moves based on speedcubing metric:
     * - 'OBTM' / 'STM' / 'HTM': Outer Block / Slice Turn Metric (U2 = 1 move, M = 1 move, M2 = 1 move) [Default Speedcubing]
     * - 'QTM': Quarter Turn Metric (U, U' = 1 move, U2 = 2 moves, M = 2 moves, M2 = 4 moves)
     * - 'ETM': Execution Turn Metric (every turn token and physical rotation = 1 move)
     */
    function countMoves(moves, metric = 'OBTM') {
        if (!moves || moves.length === 0) return 0;
        const normMetric = (metric || 'OBTM').toUpperCase();
        const consolidated = consolidateMoves(moves);
        let total = 0;

        for (const item of consolidated) {
            const moveStr = typeof item === 'string' ? item.trim() : (item && item.move ? item.move.trim() : '');
            if (!moveStr) continue;

            const isDouble = moveStr.endsWith('2');
            const isRotation = ['x', 'y', 'z'].includes(moveStr.charAt(0).toLowerCase());
            const isSlice = ['m', 'e', 's'].includes(moveStr.charAt(0).toLowerCase());

            if (normMetric === 'QTM') {
                if (isRotation) continue;
                if (isSlice) {
                    total += isDouble ? 4 : 2;
                } else {
                    total += isDouble ? 2 : 1;
                }
            } else if (normMetric === 'ETM') {
                total += 1;
            } else {
                // OBTM / STM / HTM (Default Speedcubing)
                if (isRotation) continue;
                total += 1;
            }
        }
        return total;
    }

    /**
     * RubiksCube class
     */
    class RubiksCube {
        constructor() {
            this.reset();
        }

        reset() {
            this.cp = [0, 1, 2, 3, 4, 5, 6, 7];
            this.co = [0, 0, 0, 0, 0, 0, 0, 0];
            this.ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
            this.eo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            return this;
        }

        clone() {
            const c = new RubiksCube();
            c.cp = this.cp.slice();
            c.co = this.co.slice();
            c.ep = this.ep.slice();
            c.eo = this.eo.slice();
            return c;
        }

        setState(cp, co, ep, eo) {
            this.cp = cp.slice();
            this.co = co.slice();
            this.ep = ep.slice();
            this.eo = eo.slice();
            return this;
        }

        isSolved() {
            for (let i = 0; i < 8; i++) {
                if (this.cp[i] !== i || this.co[i] !== 0) return false;
            }
            for (let i = 0; i < 12; i++) {
                if (this.ep[i] !== i || this.eo[i] !== 0) return false;
            }
            return true;
        }

        isCrossSolved() {
            const crossEdges = [4, 5, 6, 7]; // DR, DF, DL, DB
            for (const e of crossEdges) {
                if (this.ep[e] !== e || this.eo[e] !== 0) return false;
            }
            return true;
        }

        isOLLSolved() {
            for (let i = 0; i < 4; i++) {
                if (this.co[i] !== 0 || this.eo[i] !== 0) return false;
            }
            return true;
        }

        isF2LSolved() {
            if (!this.isCrossSolved()) return false;
            const f2lEdges = [8, 9, 10, 11]; // FR, FL, BL, BR
            for (const e of f2lEdges) {
                if (this.ep[e] !== e || this.eo[e] !== 0) return false;
            }
            const f2lCorners = [4, 5, 6, 7]; // DFR, DLF, DBL, DRB
            for (const c of f2lCorners) {
                if (this.cp[c] !== c || this.co[c] !== 0) return false;
            }
            return true;
        }

        isSlotSolved(slotName) {
            const s = (slotName || '').toUpperCase();
            const slotMap = {
                'FR': { c: 4, e: 8 },
                'FL': { c: 5, e: 9 },
                'BL': { c: 6, e: 10 },
                'BR': { c: 7, e: 11 }
            };
            const slot = slotMap[s];
            if (!slot) return false;
            return this.cp[slot.c] === slot.c && this.co[slot.c] === 0 &&
                   this.ep[slot.e] === slot.e && this.eo[slot.e] === 0;
        }

        isLastLayerOnly() {
            return this.isF2LSolved();
        }

        hasBlock(type, location) {
            if (type === 'cross') return this.isCrossSolved();
            if (type === 'f2l') return this.isF2LSolved();
            if (type === 'slot') return this.isSlotSolved(location);
            return false;
        }

        equals(otherCube) {
            if (!otherCube) return false;
            for (let i = 0; i < 8; i++) {
                if (this.cp[i] !== otherCube.cp[i] || this.co[i] !== otherCube.co[i]) return false;
            }
            for (let i = 0; i < 12; i++) {
                if (this.ep[i] !== otherCube.ep[i] || this.eo[i] !== otherCube.eo[i]) return false;
            }
            return true;
        }

        applyMove(moveStr) {
            if (!moveStr) return this;
            const norm = normalizeMove(moveStr);
            const moveIdx = MOVE_MAP[norm];
            if (moveIdx !== undefined) {
                if (min2phase && min2phase.moveCube && min2phase.CornMult && min2phase.EdgeMult) {
                    const moveC = min2phase.moveCube[moveIdx];
                    const prod = new min2phase.CubieCube();
                    min2phase.CornMult(this, moveC, prod);
                    min2phase.EdgeMult(this, moveC, prod);
                    this.cp = prod.cp.slice();
                    this.co = prod.co.slice();
                    this.ep = prod.ep.slice();
                    this.eo = prod.eo.slice();
                }
                return this;
            }

            // Native Slice moves on CubieCube representation
            // Edges: 0:UR, 1:UF, 2:UL, 3:UB, 4:DR, 5:DF, 6:DL, 7:DB, 8:FR, 9:FL, 10:BL, 11:BR
            if (norm === 'M') {
                const ep = this.ep.slice(), eo = this.eo.slice();
                this.ep[1] = ep[3]; this.eo[1] = eo[3] ^ 1;
                this.ep[5] = ep[1]; this.eo[5] = eo[1] ^ 1;
                this.ep[7] = ep[5]; this.eo[7] = eo[5] ^ 1;
                this.ep[3] = ep[7]; this.eo[3] = eo[7] ^ 1;
                return this;
            }
            if (norm === "M'" || norm === "M’") {
                const ep = this.ep.slice(), eo = this.eo.slice();
                this.ep[3] = ep[1]; this.eo[3] = eo[1] ^ 1;
                this.ep[7] = ep[3]; this.eo[7] = eo[3] ^ 1;
                this.ep[5] = ep[7]; this.eo[5] = eo[7] ^ 1;
                this.ep[1] = ep[5]; this.eo[1] = eo[5] ^ 1;
                return this;
            }
            if (norm === 'M2') {
                const ep = this.ep.slice(), eo = this.eo.slice();
                this.ep[1] = ep[7]; this.eo[1] = eo[7];
                this.ep[7] = ep[1]; this.eo[7] = eo[1];
                this.ep[3] = ep[5]; this.eo[3] = eo[5];
                this.ep[5] = ep[3]; this.eo[5] = eo[3];
                return this;
            }
            if (norm === 'E') {
                const ep = this.ep.slice(), eo = this.eo.slice();
                this.ep[8] = ep[9]; this.eo[8] = eo[9] ^ 1;
                this.ep[11] = ep[8]; this.eo[11] = eo[8] ^ 1;
                this.ep[10] = ep[11]; this.eo[10] = eo[11] ^ 1;
                this.ep[9] = ep[10]; this.eo[9] = eo[10] ^ 1;
                return this;
            }
            if (norm === "E'" || norm === "E’") {
                const ep = this.ep.slice(), eo = this.eo.slice();
                this.ep[9] = ep[8]; this.eo[9] = eo[8] ^ 1;
                this.ep[10] = ep[9]; this.eo[10] = eo[9] ^ 1;
                this.ep[11] = ep[10]; this.eo[11] = eo[10] ^ 1;
                this.ep[8] = ep[11]; this.eo[8] = eo[11] ^ 1;
                return this;
            }
            if (norm === 'E2') {
                const ep = this.ep.slice(), eo = this.eo.slice();
                this.ep[8] = ep[10]; this.eo[8] = eo[10];
                this.ep[10] = ep[8]; this.eo[10] = eo[8];
                this.ep[9] = ep[11]; this.eo[9] = eo[11];
                this.ep[11] = ep[9]; this.eo[11] = eo[9];
                return this;
            }
            if (norm === 'S') {
                const ep = this.ep.slice(), eo = this.eo.slice();
                this.ep[0] = ep[2]; this.eo[0] = eo[2] ^ 1;
                this.ep[4] = ep[0]; this.eo[4] = eo[0] ^ 1;
                this.ep[6] = ep[4]; this.eo[6] = eo[4] ^ 1;
                this.ep[2] = ep[6]; this.eo[2] = eo[6] ^ 1;
                return this;
            }
            if (norm === "S'" || norm === "S’") {
                const ep = this.ep.slice(), eo = this.eo.slice();
                this.ep[2] = ep[0]; this.eo[2] = eo[2] ^ 1;
                this.ep[6] = ep[2]; this.eo[6] = eo[2] ^ 1;
                this.ep[4] = ep[6]; this.eo[4] = eo[4] ^ 1;
                this.ep[0] = ep[4]; this.eo[0] = eo[4] ^ 1;
                return this;
            }
            if (norm === 'S2') {
                const ep = this.ep.slice(), eo = this.eo.slice();
                this.ep[0] = ep[6]; this.eo[0] = eo[6];
                this.ep[6] = ep[0]; this.eo[6] = eo[6];
                this.ep[2] = ep[4]; this.eo[2] = eo[4];
                this.ep[4] = ep[2]; this.eo[4] = eo[2];
                return this;
            }

            // Wide moves & full cube rotations expansions
            const expansions = {
                "r": ["R", "M'"], "r'": ["R'", "M"], "r2": ["R2", "M2"],
                "Rw": ["R", "M'"], "Rw'": ["R'", "M"], "Rw2": ["R2", "M2"],
                "l": ["L", "M"], "l'": ["L'", "M'"], "l2": ["L2", "M2"],
                "Lw": ["L", "M"], "Lw'": ["L'", "M'"], "Lw2": ["L2", "M2"],
                "u": ["U", "E'"], "u'": ["U'", "E"], "u2": ["U2", "E2"],
                "Uw": ["U", "E'"], "Uw'": ["U'", "E"], "Uw2": ["U2", "E2"],
                "d": ["D", "E"], "d'": ["D'", "E'"], "d2": ["D2", "E2"],
                "Dw": ["D", "E"], "Dw'": ["D'", "E'"], "Dw2": ["D2", "E2"],
                "f": ["F", "S"], "f'": ["F'", "S'"], "f2": ["F2", "S2"],
                "Fw": ["F", "S"], "Fw'": ["F'", "S'"], "Fw2": ["F2", "S2"],
                "b": ["B", "S'"], "b'": ["B'", "S"], "b2": ["B2", "S2"],
                "Bw": ["B", "S'"], "Bw'": ["B'", "S"], "Bw2": ["B2", "S2"],

                "x": ["R", "M'", "L'"], "x'": ["R'", "M", "L"], "x2": ["R2", "M2", "L2"],
                "y": ["U", "E'", "D'"], "y'": ["U'", "E", "D"], "y2": ["U2", "E2", "D2"],
                "z": ["F", "S", "B'"], "z'": ["F'", "S'", "B"], "z2": ["F2", "S2", "B2"]
            };

            if (expansions[norm]) {
                for (const sub of expansions[norm]) {
                    this.applyMove(sub);
                }
                return this;
            }

            return this;
        }

        applyMoves(moves) {
            if (typeof moves === 'string') {
                moves = moves.trim().split(/\s+/);
            }
            if (Array.isArray(moves)) {
                for (const m of moves) {
                    if (m) this.applyMove(m);
                }
            }
            return this;
        }

        getFacelets() {
            return stateToFacelets(this.cp, this.co, this.ep, this.eo);
        }

        toCubieCube() {
            if (!min2phase || !min2phase.CubieCube) return null;
            const cc = new min2phase.CubieCube();
            cc.cp = this.cp.slice();
            cc.co = this.co.slice();
            cc.ep = this.ep.slice();
            cc.eo = this.eo.slice();
            return cc;
        }

        /**
         * Return inverted CubieCube
         */
        getInverse() {
            const cc = this.toCubieCube();
            if (cc && typeof cc.invCubieCube === 'function') {
                cc.invCubieCube();
                const invCube = new RubiksCube();
                invCube.setState(cc.cp, cc.co, cc.ep, cc.eo);
                return invCube;
            }
            return null;
        }
    }

    /**
     * Generate standard WCA 3x3 Scramble
     * Uses min2phase random state generator or standard 21-move non-redundant sequence
     */
    function generateWcaScramble(length = 21) {
        if (min2phase && typeof min2phase.randomCube === 'function' && typeof min2phase.solve === 'function') {
            try {
                min2phase.initialize();
                const rc = min2phase.randomCube();
                const sol = min2phase.solve(rc);
                if (sol && typeof sol === 'string' && !sol.startsWith('Error')) {
                    const moves = sol.trim().split(/\s+/).map(normalizeMove).filter(m => /^[URFDLB][2']?$/.test(m));
                    if (moves.length >= 15) {
                        const scrambleMoves = invertMoves(moves);
                        return scrambleMoves.join(' ');
                    }
                }
            } catch (err) {
                console.warn("min2phase randomCube fallback:", err);
            }
        }

        // Fallback: standard WCA random moves generator with no opposite/redundant cancellations
        const faces = ['U', 'D', 'R', 'L', 'F', 'B'];
        const suffixes = ['', "'", '2'];
        const moves = [];
        let lastAxis = -1;
        let secondLastAxis = -1;

        for (let i = 0; i < length; i++) {
            let axis, faceIdx;
            while (true) {
                faceIdx = Math.floor(Math.random() * 6);
                axis = Math.floor(faceIdx / 2);
                if (axis !== lastAxis && !(axis === secondLastAxis && lastAxis === (axis ^ 1))) {
                    break;
                }
            }
            secondLastAxis = lastAxis;
            lastAxis = axis;
            const suffix = suffixes[Math.floor(Math.random() * 3)];
            moves.push(faces[faceIdx] + suffix);
        }
        return moves.join(' ');
    }

    /**
     * Generate standard WCA 3x3 Scramble that begins with a specific first move
     */
    function generateWcaScrambleWithFirstMove(firstMove, length = 21) {
        firstMove = normalizeMove(firstMove);
        if (!firstMove) return generateWcaScramble(length);

        if (min2phase && typeof min2phase.randomCube === 'function' && typeof min2phase.solve === 'function' && min2phase.CubieCube) {
            try {
                min2phase.initialize();
                const rc = min2phase.randomCube();
                const targetCube = new RubiksCube();
                targetCube.setState(rc.cp, rc.co, rc.ep, rc.eo);

                const startCube = new RubiksCube().applyMove(firstMove);
                const solMoves = getCorrectionMoves(startCube, targetCube);
                if (solMoves && solMoves.length > 0) {
                    const fullScramble = [firstMove, ...solMoves];
                    return fullScramble.join(' ');
                }
            } catch (err) {
                console.warn("min2phase random with firstMove fallback:", err);
            }
        }

        // Fallback: random generator starting with firstMove
        const faces = ['U', 'D', 'R', 'L', 'F', 'B'];
        const suffixes = ['', "'", '2'];
        const firstFace = firstMove.charAt(0);
        const firstAxis = Math.floor(faces.indexOf(firstFace) / 2);

        const moves = [firstMove];
        let lastAxis = firstAxis;
        let secondLastAxis = -1;

        for (let i = 1; i < length; i++) {
            let axis, faceIdx;
            while (true) {
                faceIdx = Math.floor(Math.random() * 6);
                axis = Math.floor(faceIdx / 2);
                if (axis !== lastAxis && !(axis === secondLastAxis && lastAxis === Math.floor(faceIdx / 2) ^ 1)) {
                    break;
                }
            }
            secondLastAxis = lastAxis;
            lastAxis = axis;
            const suffix = suffixes[Math.floor(Math.random() * 3)];
            moves.push(faces[faceIdx] + suffix);
        }
        return moves.join(' ');
    }

    /**
     * Compute optimal/quick correction moves from currentState to targetState
     * If currentState == targetState, returns []
     */
    function getCorrectionMoves(currentState, targetState) {
        if (!currentState || !targetState) return [];
        if (currentState.equals(targetState)) return [];

        if (min2phase && min2phase.solve && min2phase.CubieCube && min2phase.CornMult && min2phase.EdgeMult) {
            try {
                min2phase.initialize();
                // We want moves M such that currentState * M = targetState.
                // In group theory: M = currentState^(-1) * targetState.
                // In min2phase, min2phase.solve(prod) finds the sequence M such that Solved * M = prod.
                // Therefore, setting prod = currentState^(-1) * targetState yields exactly M!
                const currentCC = currentState.toCubieCube();
                currentCC.invCubieCube(); // Invert in place: currentState^(-1)

                const targetCC = targetState.toCubieCube();
                const prod = new min2phase.CubieCube();
                min2phase.CornMult(currentCC, targetCC, prod);
                min2phase.EdgeMult(currentCC, targetCC, prod);

                const sol = min2phase.solve(prod);
                if (sol && sol.trim().length > 0) {
                    return sol.trim().split(/\s+/).map(normalizeMove);
                }
            } catch (err) {
                console.error("Correction solve error:", err);
            }
        }
        return [];
    }

    /**
     * Compute immediate single-step (or shortest 2-step) correction move(s) to get back on track
     */
    function getNextStepCorrection(currentCube, expectedStates, currentStep, targetCube) {
        if (!currentCube) return [];
        const faces = ['U', 'D', 'L', 'R', 'F', 'B'];
        const suffixes = ['', "'", '2'];
        const singleMoves = [];
        for (const f of faces) {
            for (const s of suffixes) {
                singleMoves.push(f + s);
            }
        }

        const nextStepIdx = currentStep + 1;
        const targetNext = (expectedStates && nextStepIdx < expectedStates.length) ? expectedStates[nextStepIdx] : null;
        const targetCurrent = (expectedStates && currentStep < expectedStates.length) ? expectedStates[currentStep] : null;

        // 1. Single move to reach expected next state (fast-forward)
        if (targetNext) {
            for (const m of singleMoves) {
                const test = currentCube.clone().applyMove(m);
                if (test.equals(targetNext)) {
                    return [m];
                }
            }
        }

        // 2. Single move to undo mistake and return to expected current state
        if (targetCurrent) {
            for (const m of singleMoves) {
                const test = currentCube.clone().applyMove(m);
                if (test.equals(targetCurrent)) {
                    return [m];
                }
            }
        }

        // 3. Single move to reach any other expected step in the scramble
        if (expectedStates) {
            for (let j = expectedStates.length - 1; j >= 0; j--) {
                for (const m of singleMoves) {
                    const test = currentCube.clone().applyMove(m);
                    if (test.equals(expectedStates[j])) {
                        return [m];
                    }
                }
            }
        }

        // 4. Two-move lookahead to targetNext or targetCurrent
        if (targetNext) {
            for (const m1 of singleMoves) {
                const test1 = currentCube.clone().applyMove(m1);
                for (const m2 of singleMoves) {
                    if (test1.clone().applyMove(m2).equals(targetNext)) {
                        return [m1, m2];
                    }
                }
            }
        }

        if (targetCurrent) {
            for (const m1 of singleMoves) {
                const test1 = currentCube.clone().applyMove(m1);
                for (const m2 of singleMoves) {
                    if (test1.clone().applyMove(m2).equals(targetCurrent)) {
                        return [m1, m2];
                    }
                }
            }
        }

        // 5. Min2phase solver targeting next step or current step or targetCube
        const dest = targetNext || targetCurrent || targetCube;
        const fullCorr = getCorrectionMoves(currentCube, dest);
        if (fullCorr && fullCorr.length > 0) {
            return fullCorr;
        }

        return [];
    }

    /**
     * Helper to get face and quarter turns from a move string
     */
    function getMoveQuarterTurns(move) {
        if (!move) return { face: '', q: 0 };
        const m = normalizeMove(move);
        const face = m.charAt(0).toUpperCase();
        if (m.endsWith('2')) return { face, q: 2 };
        if (m.endsWith("'")) return { face, q: 3 };
        return { face, q: 1 };
    }

    /**
     * Helper to convert face and net quarter turns into standard correction move notation
     */
    function quarterTurnsToCorrectionMove(face, q) {
        const net = ((q % 4) + 4) % 4;
        const inv = (4 - net) % 4;
        if (inv === 0) return null;
        if (inv === 1) return face;
        if (inv === 2) return face + '2';
        if (inv === 3) return face + "'";
        return null;
    }

    /**
     * ScrambleProgressTracker
     * Manages scramble target, real-time user progress, wrong move detection, and dynamic correction
     */
    class ScrambleProgressTracker {
        constructor() {
            this.scrambleString = '';
            this.scrambleMoves = [];
            this.targetCube = new RubiksCube();
            this.currentCube = new RubiksCube();
            this.expectedStates = []; // expected cube state at each step of the scramble
            this.moveHistory = [];
            this.isComplete = false;
            this.isDeviated = false;
            this.deviationStack = []; // array of { face: string, netQ: number }
            this.correctionMoves = [];
            this.currentStep = 0;
            this.lastMovedFace = null;
            this.isHalfTurn = false;
            this.halfFace = null;
            this.remainingOnFace = null;
            this.halfTurnDirection = null;
            this.wasReverseCancelled = false;
        }

        setScramble(scrambleStr) {
            this.scrambleString = (scrambleStr || '').trim();
            this.scrambleMoves = this.scrambleString ? this.scrambleString.split(/\s+/).map(normalizeMove) : [];
            this.targetCube = new RubiksCube();
            this.expectedStates = [this.targetCube.clone()];
            this.stepInfo = [];

            // Pre-calculate all expected states from 0 to N and rotational states for each step
            const tempCube = new RubiksCube();
            for (let i = 0; i < this.scrambleMoves.length; i++) {
                const m = this.scrambleMoves[i];
                const face = m.charAt(0);
                const isDouble = m.endsWith('2');

                // All 3 non-initial rotational states on face F starting from tempCube:
                const stateF = tempCube.clone().applyMove(face);           // F (CW 90)
                const stateF2 = tempCube.clone().applyMove(face + "2");     // F2 (180)
                const stateFPrime = tempCube.clone().applyMove(face + "'");  // F' (CCW 90 / F3)

                tempCube.applyMove(m);
                this.expectedStates.push(tempCube.clone());
                this.stepInfo.push({
                    move: m,
                    face: face,
                    isDouble: isDouble,
                    stateF: stateF,
                    stateF2: stateF2,
                    stateFPrime: stateFPrime,
                    targetState: tempCube.clone()
                });
            }
            this.targetCube = tempCube.clone();

            this.resetProgress();
        }

        resetProgress() {
            this.currentCube = new RubiksCube();
            this.moveHistory = [];
            this.isComplete = false;
            this.isDeviated = false;
            this.deviationStack = [];
            this.correctionMoves = [];
            this.currentStep = 0;
            this.lastMovedFace = null;
            this.isHalfTurn = false;
            this.halfFace = null;
            this.remainingOnFace = null;
            this.halfTurnDirection = null;
            this.wasReverseCancelled = false;
        }

        setCurrentCubeState(cp, co, ep, eo) {
            this.currentCube.setState(cp, co, ep, eo);
            return this.evaluateState();
        }

        _applyDeviationTurn(moveStr) {
            const { face, q } = getMoveQuarterTurns(moveStr);
            if (!face || q === 0) return;

            if (this.deviationStack.length > 0) {
                const top = this.deviationStack[this.deviationStack.length - 1];
                if (top.face === face) {
                    top.netQ = ((top.netQ + q) % 4 + 4) % 4;
                    if (top.netQ === 0) {
                        this.deviationStack.pop();
                    }
                } else {
                    this.deviationStack.push({ face, netQ: q });
                }
            } else {
                this.deviationStack.push({ face, netQ: q });
            }

            this._recomputeCorrectionMoves();
        }

        _recomputeCorrectionMoves() {
            const moves = [];
            for (let i = this.deviationStack.length - 1; i >= 0; i--) {
                const item = this.deviationStack[i];
                const corr = quarterTurnsToCorrectionMove(item.face, item.netQ);
                if (corr) moves.push(corr);
            }
            this.correctionMoves = moves;
            this.isDeviated = this.deviationStack.length > 0 && this.correctionMoves.length > 0;
        }

        onCubeMove(moveStr) {
            const move = normalizeMove(moveStr);
            this.wasReverseCancelled = false;
            this.lastMovedFace = move.charAt(0);
            this.moveHistory.push(move);
            this.currentCube.applyMove(move);

            // Fast-path 1: Physical cube reached target cube -> scramble complete!
            if (this.currentCube.equals(this.targetCube)) {
                this.isComplete = true;
                this.isDeviated = false;
                this.deviationStack = [];
                this.correctionMoves = [];
                this.isHalfTurn = false;
                this.halfFace = null;
                this.remainingOnFace = null;
                this.halfTurnDirection = null;
                this.currentStep = this.scrambleMoves.length;
                return {
                    isComplete: true,
                    isDeviated: false,
                    isHalfTurn: false,
                    currentStep: this.scrambleMoves.length,
                    totalSteps: this.scrambleMoves.length,
                    correctionMoves: [],
                    remainingMoves: [],
                    wrongMove: null
                };
            }

            // Fast-path 2: Physical cube is on the exact expected state for current step!
            if (this.currentCube.equals(this.expectedStates[this.currentStep])) {
                this.isDeviated = false;
                this.deviationStack = [];
                this.correctionMoves = [];
                this.isHalfTurn = false;
                this.halfFace = null;
                this.remainingOnFace = null;
                this.halfTurnDirection = null;
                return {
                    isComplete: false,
                    isDeviated: false,
                    isHalfTurn: false,
                    halfFace: null,
                    remainingOnFace: null,
                    currentStep: this.currentStep,
                    totalSteps: this.scrambleMoves.length,
                    correctionMoves: [],
                    remainingMoves: this.scrambleMoves.slice(this.currentStep),
                    wrongMove: null
                };
            }

            // 1. If currently in deviated mode: apply move to modulo 4 deviation stack
            if (this.isDeviated) {
                this._applyDeviationTurn(move);

                // Check if physical cube returned to currentStep state
                if (this.currentCube.equals(this.expectedStates[this.currentStep])) {
                    this.isDeviated = false;
                    this.deviationStack = [];
                    this.correctionMoves = [];
                    this.isHalfTurn = false;
                    this.halfFace = null;
                    this.remainingOnFace = null;
                    return {
                        isComplete: false,
                        isDeviated: false,
                        isHalfTurn: false,
                        currentStep: this.currentStep,
                        totalSteps: this.scrambleMoves.length,
                        correctionMoves: [],
                        remainingMoves: this.scrambleMoves.slice(this.currentStep),
                        wrongMove: null
                    };
                }

                // Check if physical cube advanced to currentStep + 1 state
                if (this.currentStep + 1 <= this.scrambleMoves.length && this.currentCube.equals(this.expectedStates[this.currentStep + 1])) {
                    this.currentStep++;
                    this.isDeviated = false;
                    this.deviationStack = [];
                    this.correctionMoves = [];
                    this.isHalfTurn = false;
                    this.halfFace = null;
                    this.remainingOnFace = null;
                    return {
                        isComplete: (this.currentStep >= this.scrambleMoves.length),
                        isDeviated: false,
                        isHalfTurn: false,
                        currentStep: this.currentStep,
                        totalSteps: this.scrambleMoves.length,
                        correctionMoves: [],
                        remainingMoves: this.scrambleMoves.slice(this.currentStep),
                        wrongMove: null
                    };
                }

                // Check if physical cube matches ANY expected state in the scramble
                for (let k = this.expectedStates.length - 1; k >= 0; k--) {
                    if (this.currentCube.equals(this.expectedStates[k])) {
                        this.currentStep = k;
                        this.isDeviated = false;
                        this.deviationStack = [];
                        this.correctionMoves = [];
                        this.isHalfTurn = false;
                        this.halfFace = null;
                        this.remainingOnFace = null;
                        return {
                            isComplete: (k === this.scrambleMoves.length),
                            isDeviated: false,
                            isHalfTurn: false,
                            currentStep: k,
                            totalSteps: this.scrambleMoves.length,
                            correctionMoves: [],
                            remainingMoves: this.scrambleMoves.slice(k),
                            wrongMove: null
                        };
                    }
                }

                if (!this.isDeviated) {
                    return {
                        isComplete: false,
                        isDeviated: false,
                        isHalfTurn: false,
                        currentStep: this.currentStep,
                        totalSteps: this.scrambleMoves.length,
                        correctionMoves: [],
                        remainingMoves: this.scrambleMoves.slice(this.currentStep),
                        wrongMove: null
                    };
                } else {
                    return {
                        isComplete: false,
                        isDeviated: true,
                        currentStep: this.currentStep,
                        totalSteps: this.scrambleMoves.length,
                        fullScrambleString: this.scrambleString,
                        correctionMoves: [...this.correctionMoves],
                        remainingMoves: [...this.correctionMoves, ...this.scrambleMoves.slice(this.currentStep)],
                        wrongMove: move
                    };
                }
            }

            // 2. Normal On-Track Scramble Progression
            if (this.currentStep < this.scrambleMoves.length) {
                const targetMove = this.scrambleMoves[this.currentStep];
                const targetFace = targetMove.charAt(0);
                const isTargetDouble = targetMove.endsWith('2');
                const moveFace = move.charAt(0);
                const isMoveDouble = move.endsWith('2');

                if (moveFace === targetFace) {
                    if (isTargetDouble) {
                        if (isMoveDouble) {
                            // Exact 180 turn matched!
                            this.currentStep++;
                            this.isHalfTurn = false;
                            this.halfFace = null;
                            this.remainingOnFace = null;
                            this.halfTurnDirection = null;
                        } else if (this.isHalfTurn && this.halfFace === targetFace) {
                            if (this.halfTurnDirection && move !== this.halfTurnDirection) {
                                // Reverse 90 turn cancels back to 0! (e.g. R followed by R')
                                this.isHalfTurn = false;
                                this.halfFace = null;
                                this.remainingOnFace = null;
                                this.halfTurnDirection = null;
                                this.wasReverseCancelled = true;
                            } else {
                                // Second 90 turn in same direction completes the 180 turn!
                                this.currentStep++;
                                this.isHalfTurn = false;
                                this.halfFace = null;
                                this.remainingOnFace = null;
                                this.halfTurnDirection = null;
                            }
                        } else {
                            // First 90 turn of a 180 move
                            this.isHalfTurn = true;
                            this.halfFace = targetFace;
                            this.halfTurnDirection = move;
                            this.remainingOnFace = move;
                        }
                    } else {
                        // 90 turn target (e.g. R or R')
                        if (move === targetMove) {
                            // Exact match!
                            this.currentStep++;
                            this.isHalfTurn = false;
                            this.halfFace = null;
                            this.remainingOnFace = null;
                            this.halfTurnDirection = null;
                        } else if (this.isHalfTurn && this.halfFace === targetFace) {
                            if (move === this.remainingOnFace) {
                                this.currentStep++;
                                this.isHalfTurn = false;
                                this.halfFace = null;
                                this.remainingOnFace = null;
                                this.halfTurnDirection = null;
                            } else {
                                this.isHalfTurn = false;
                                this.halfFace = null;
                                this.remainingOnFace = null;
                                this.halfTurnDirection = null;
                                this.wasReverseCancelled = true;
                            }
                        } else {
                            // Wrong direction on target 90-degree face
                            this._applyDeviationTurn(move);
                            return {
                                isComplete: false,
                                isDeviated: true,
                                currentStep: this.currentStep,
                                totalSteps: this.scrambleMoves.length,
                                fullScrambleString: this.scrambleString,
                                correctionMoves: [...this.correctionMoves],
                                remainingMoves: [...this.correctionMoves, ...this.scrambleMoves.slice(this.currentStep)],
                                wrongMove: move
                            };
                        }
                    }

                    if (this.currentStep >= this.scrambleMoves.length) {
                        this.isComplete = true;
                        this.isDeviated = false;
                        this.isHalfTurn = false;
                        return {
                            isComplete: true,
                            isDeviated: false,
                            isHalfTurn: false,
                            currentStep: this.scrambleMoves.length,
                            totalSteps: this.scrambleMoves.length,
                            correctionMoves: [],
                            remainingMoves: []
                        };
                    }

                    return {
                        isComplete: false,
                        isDeviated: false,
                        isHalfTurn: this.isHalfTurn,
                        halfFace: this.halfFace,
                        remainingOnFace: this.remainingOnFace,
                        wasReverseCancelled: !!this.wasReverseCancelled,
                        currentStep: this.currentStep,
                        totalSteps: this.scrambleMoves.length,
                        correctionMoves: [],
                        remainingMoves: this.scrambleMoves.slice(this.currentStep)
                    };
                } else {
                    // Wrong face turned
                    if (this.isHalfTurn && this.halfFace) {
                        // User made a partial half-turn on halfFace before turning a wrong face
                        const halfQ = getMoveQuarterTurns(this.halfTurnDirection || this.halfFace).q;
                        this._applyDeviationTurn(this.halfTurnDirection || this.halfFace);
                        this.isHalfTurn = false;
                        this.halfFace = null;
                        this.remainingOnFace = null;
                        this.halfTurnDirection = null;
                    }
                    this._applyDeviationTurn(move);
                    return {
                        isComplete: false,
                        isDeviated: true,
                        currentStep: this.currentStep,
                        totalSteps: this.scrambleMoves.length,
                        fullScrambleString: this.scrambleString,
                        correctionMoves: [...this.correctionMoves],
                        remainingMoves: [...this.correctionMoves, ...this.scrambleMoves.slice(this.currentStep)],
                        wrongMove: move
                    };
                }
            }

            return this.evaluateState();
        }

        evaluateState() {
            // Check if solved to target
            if (this.currentCube.equals(this.targetCube)) {
                this.isComplete = true;
                this.isDeviated = false;
                this.isHalfTurn = false;
                this.deviationStack = [];
                this.correctionMoves = [];
                this.currentStep = this.scrambleMoves.length;
                return {
                    isComplete: true,
                    isDeviated: false,
                    isHalfTurn: false,
                    currentStep: this.scrambleMoves.length,
                    totalSteps: this.scrambleMoves.length,
                    correctionMoves: [],
                    remainingMoves: []
                };
            }

            // Check if currentCube matches current expected step
            if (this.currentCube.equals(this.expectedStates[this.currentStep])) {
                this.isDeviated = false;
                this.isHalfTurn = false;
                this.halfFace = null;
                this.remainingOnFace = null;
                this.deviationStack = [];
                this.correctionMoves = [];
                return {
                    isComplete: false,
                    isDeviated: false,
                    isHalfTurn: false,
                    currentStep: this.currentStep,
                    totalSteps: this.scrambleMoves.length,
                    correctionMoves: [],
                    remainingMoves: this.scrambleMoves.slice(this.currentStep)
                };
            }

            // Check if currentCube matches any full-step state
            for (let i = this.expectedStates.length - 1; i >= 0; i--) {
                if (this.currentCube.equals(this.expectedStates[i])) {
                    this.isDeviated = false;
                    this.isHalfTurn = false;
                    this.halfFace = null;
                    this.remainingOnFace = null;
                    this.currentStep = i;
                    this.deviationStack = [];
                    this.correctionMoves = [];
                    return {
                        isComplete: (i === this.scrambleMoves.length),
                        isDeviated: false,
                        isHalfTurn: false,
                        currentStep: i,
                        totalSteps: this.scrambleMoves.length,
                        correctionMoves: [],
                        remainingMoves: this.scrambleMoves.slice(i)
                    };
                }
            }

            if (this.isDeviated && this.correctionMoves.length > 0) {
                return {
                    isComplete: false,
                    isDeviated: true,
                    currentStep: this.currentStep,
                    totalSteps: this.scrambleMoves.length,
                    fullScrambleString: this.scrambleString,
                    correctionMoves: [...this.correctionMoves],
                    remainingMoves: [...this.correctionMoves, ...this.scrambleMoves.slice(this.currentStep)]
                };
            }

            this.isDeviated = false;
            this.isHalfTurn = false;
            return {
                isComplete: false,
                isDeviated: false,
                isHalfTurn: false,
                currentStep: this.currentStep,
                totalSteps: this.scrambleMoves.length,
                correctionMoves: [],
                remainingMoves: this.scrambleMoves.slice(this.currentStep)
            };
        }
    }

    return {
        MOVE_NAMES,
        MOVE_MAP,
        CORNER_FACELET_MAP,
        EDGE_FACELET_MAP,
        stateToFacelets,
        normalizeMove,
        invertMove,
        invertMoves,
        getScrambleStepClasses,
        RubiksCube,
        consolidateMoves,
        countMoves,
        generateWcaScramble,
        generateWcaScrambleWithFirstMove,
        getCorrectionMoves,
        getNextStepCorrection,
        ScrambleProgressTracker
    };
}));
