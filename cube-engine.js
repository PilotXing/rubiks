/**
 * cube-engine.js
 * 3x3 Rubik's Cube Model, WCA Scramble Generator, Facelet Mapper, and Smart Scramble Correction Pathfinder
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['min2phase'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('./min2phase'));
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
        let m = move.trim();
        if (m.length === 1) return m;
        if (m.charAt(1) === '2') return m.charAt(0) + '2';
        if (m.charAt(1) === "'" || m.charAt(1) === '’') return m.charAt(0) + "'";
        return m;
    }

    /**
     * Count moves based on speedcubing metric:
     * - 'OBTM' / 'HTM': Outer Block Turn Metric / Half Turn Metric (U2 = 1 move) [Default WCA]
     * - 'QTM': Quarter Turn Metric (U, U' = 1 move, U2 = 2 moves)
     * - 'ETM': Execution Turn Metric (every turn token and physical rotation = 1 move)
     */
    function countMoves(moves, metric = 'OBTM') {
        if (!moves || moves.length === 0) return 0;
        const normMetric = (metric || 'OBTM').toUpperCase();
        let total = 0;

        for (const item of moves) {
            const moveStr = typeof item === 'string' ? item.trim() : (item && item.move ? item.move.trim() : '');
            if (!moveStr) continue;

            const isDouble = moveStr.endsWith('2');
            const isRotation = ['x', 'y', 'z'].includes(moveStr.charAt(0).toLowerCase());

            if (normMetric === 'QTM') {
                if (isRotation) continue;
                total += isDouble ? 2 : 1;
            } else if (normMetric === 'ETM') {
                total += 1;
            } else {
                // OBTM / HTM (Default WCA)
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
            const cube = new RubiksCube();
            cube.cp = this.cp.slice();
            cube.co = this.co.slice();
            cube.ep = this.ep.slice();
            cube.eo = this.eo.slice();
            return cube;
        }

        setState(cp, co, ep, eo) {
            this.cp = cp.slice();
            this.co = co.slice();
            this.ep = ep.slice();
            this.eo = eo.slice();
            return this;
        }

        isSolved() {
            // Fast check: Standard Permutation & Orientation
            let isPermSolved = true;
            for (let i = 0; i < 8; i++) {
                if (this.cp[i] !== i || this.co[i] !== 0) { isPermSolved = false; break; }
            }
            if (isPermSolved) {
                for (let i = 0; i < 12; i++) {
                    if (this.ep[i] !== i || this.eo[i] !== 0) { isPermSolved = false; break; }
                }
            }
            if (isPermSolved) return true;

            // Full check: 6-Face Monochromatic Check (handles all 24 rotated orientations)
            const f = this.getFacelets();
            if (f && f.length === 54) {
                for (let faceIdx = 0; faceIdx < 6; faceIdx++) {
                    const start = faceIdx * 9;
                    const c0 = f[start];
                    for (let j = 1; j < 9; j++) {
                        if (f[start + j] !== c0) return false;
                    }
                }
                return true;
            }

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

            // Wide & slice moves & rotations expansions
            const expansions = {
                "M": ["L", "R'"], "M'": ["L'", "R"], "M2": ["L2", "R2"],
                "E": ["D", "U'"], "E'": ["D'", "U"], "E2": ["D2", "U2"],
                "S": ["F", "B'"], "S'": ["F'", "B"], "S2": ["F2", "B2"],

                "r": ["R", "L'"], "r'": ["R'", "L"], "r2": ["R2", "L2"],
                "Rw": ["R", "L'"], "Rw'": ["R'", "L"], "Rw2": ["R2", "L2"],
                "l": ["L", "R'"], "l'": ["L'", "R"], "l2": ["L2", "R2"],
                "Lw": ["L", "R'"], "Lw'": ["L'", "R"], "Lw2": ["L2", "R2"],
                "u": ["U", "D'"], "u'": ["U'", "D"], "u2": ["U2", "D2"],
                "Uw": ["U", "D'"], "Uw'": ["U'", "D"], "Uw2": ["U2", "D2"],
                "d": ["D", "U'"], "d'": ["D'", "U"], "d2": ["D2", "U2"],
                "Dw": ["D", "U'"], "Dw'": ["D'", "U"], "Dw2": ["D2", "U2"],
                "f": ["F", "B'"], "f'": ["F'", "B"], "f2": ["F2", "B2"],
                "Fw": ["F", "B'"], "Fw'": ["F'", "B"], "Fw2": ["F2", "B2"],
                "b": ["B", "F'"], "b'": ["B'", "F"], "b2": ["B2", "F2"],
                "Bw": ["B", "F'"], "Bw'": ["B'", "F"], "Bw2": ["B2", "F2"],

                "x": ["R", "L'"], "x'": ["R'", "L"], "x2": ["R2", "L2"],
                "y": ["U", "D'"], "y'": ["U'", "D"], "y2": ["U2", "D2"],
                "z": ["F", "B'"], "z'": ["F'", "B"], "z2": ["F2", "B2"]
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
    function generateWcaScramble(length = 20) {
        if (min2phase && typeof min2phase.randomCube === 'function' && typeof min2phase.solve === 'function') {
            try {
                min2phase.initialize();
                const rc = min2phase.randomCube();
                // solve(rc) returns moves to solve the random cube
                const sol = min2phase.solve(rc);
                if (sol && sol.length > 5) {
                    // Scramble is the inverse of the solution to reach that random state
                    const moves = sol.trim().split(/\s+/);
                    const scrambleMoves = invertMoves(moves);
                    return scrambleMoves.join(' ');
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
                // targetState_inv * currentState * M = I
                // Let relativeCube = targetState_inv * currentState.
                // min2phase.solve(relativeCube) solves relativeCube to Solved state,
                // which yields exactly M!
                const targetCC = targetState.toCubieCube();
                targetCC.invCubieCube(); // Invert in place

                const currentCC = currentState.toCubieCube();
                const prod = new min2phase.CubieCube();
                min2phase.CornMult(targetCC, currentCC, prod);
                min2phase.EdgeMult(targetCC, currentCC, prod);

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
            this.correctionMoves = [];
            this.currentStep = 0;
            this.lastMovedFace = null;
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
            this.isHalfTurn = false;
            this.halfFace = null;
            this.remainingOnFace = null;
            this.correctionMoves = [];
            this.currentStep = 0;
            this.lastMovedFace = null;
        }

        setCurrentCubeState(cp, co, ep, eo) {
            this.currentCube.setState(cp, co, ep, eo);
            return this.evaluateState();
        }

        onCubeMove(moveStr) {
            const move = normalizeMove(moveStr);
            this.lastMovedFace = move.charAt(0);
            this.moveHistory.push(move);
            this.currentCube.applyMove(move);
            return this.evaluateState();
        }

        evaluateState() {
            // 1. Check if solved to target
            if (this.currentCube.equals(this.targetCube)) {
                this.isComplete = true;
                this.isDeviated = false;
                this.isHalfTurn = false;
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

            this.isComplete = false;

            // 2. Check if currentCube matches any full-step state (scan backwards from end for furthest matching step)
            let matchedStep = -1;
            for (let i = this.expectedStates.length - 1; i >= 0; i--) {
                if (this.currentCube.equals(this.expectedStates[i])) {
                    matchedStep = i;
                    break;
                }
            }

            if (matchedStep >= 0) {
                this.isDeviated = false;
                this.isHalfTurn = false;
                this.halfFace = null;
                this.remainingOnFace = null;
                this.currentStep = matchedStep;
                this.correctionMoves = [];
                const remainingMoves = this.scrambleMoves.slice(matchedStep);
                return {
                    isComplete: false,
                    isDeviated: false,
                    isHalfTurn: false,
                    currentStep: matchedStep,
                    totalSteps: this.scrambleMoves.length,
                    correctionMoves: [],
                    remainingMoves: remainingMoves
                };
            }

            // 3. Check if currentCube matches an intermediate rotational state on the expected face for any step
            for (let i = 0; i < this.stepInfo.length; i++) {
                const info = this.stepInfo[i];
                const targetState = info.targetState;

                let matchedCandidate = false;
                let remainingOnFace = null;

                if (this.currentCube.equals(info.stateF)) {
                    matchedCandidate = true;
                    if (targetState.equals(info.stateF2)) remainingOnFace = info.face;
                    else if (targetState.equals(info.stateFPrime)) remainingOnFace = info.face + "2";
                } else if (this.currentCube.equals(info.stateF2)) {
                    matchedCandidate = true;
                    if (targetState.equals(info.stateF)) remainingOnFace = info.face;
                    else if (targetState.equals(info.stateFPrime)) remainingOnFace = info.face + "'";
                } else if (this.currentCube.equals(info.stateFPrime)) {
                    matchedCandidate = true;
                    if (targetState.equals(info.stateF)) remainingOnFace = info.face + "2";
                    else if (targetState.equals(info.stateF2)) remainingOnFace = info.face + "'";
                }

                if (matchedCandidate && remainingOnFace) {
                    this.isDeviated = false;
                    this.isHalfTurn = true;
                    this.halfFace = info.face;
                    this.remainingOnFace = remainingOnFace;
                    this.currentStep = i;
                    this.correctionMoves = [];
                    const remainingMoves = [remainingOnFace, ...this.scrambleMoves.slice(i + 1)];
                    return {
                        isComplete: false,
                        isDeviated: false,
                        isHalfTurn: true,
                        halfFace: info.face,
                        remainingOnFace: remainingOnFace,
                        currentStep: i,
                        totalSteps: this.scrambleMoves.length,
                        correctionMoves: [],
                        remainingMoves: remainingMoves
                    };
                }
            }

            // 4. Quick single-move lookahead on active face
            if (this.currentStep < this.scrambleMoves.length) {
                const expectedNextState = this.expectedStates[this.currentStep + 1];
                const expMove = this.scrambleMoves[this.currentStep];
                const face = expMove.charAt(0);

                for (const candidate of [face, face + "'", face + "2"]) {
                    const testCube = this.currentCube.clone().applyMove(candidate);
                    if (testCube.equals(expectedNextState)) {
                        this.isDeviated = false;
                        this.isHalfTurn = true;
                        this.halfFace = face;
                        this.remainingOnFace = candidate;
                        this.correctionMoves = [];
                        const remainingMoves = [candidate, ...this.scrambleMoves.slice(this.currentStep + 1)];
                        return {
                            isComplete: false,
                            isDeviated: false,
                            isHalfTurn: true,
                            halfFace: face,
                            remainingOnFace: candidate,
                            currentStep: this.currentStep,
                            totalSteps: this.scrambleMoves.length,
                            correctionMoves: [],
                            remainingMoves: remainingMoves
                        };
                    }
                }
            }

        repathRemaining(completedMoves, remainingMoves) {
            this.scrambleMoves = [...completedMoves, ...remainingMoves];
            this.scrambleString = this.scrambleMoves.join(' ');
            this.currentStep = completedMoves.length;

            // Reconstruct expectedStates and stepInfo starting from current physical cube state
            this.expectedStates = [];
            this.stepInfo = [];

            // 1. Build states for completed moves from solved state
            const simCube = new RubiksCube();
            this.expectedStates.push(simCube.clone());
            for (let i = 0; i < completedMoves.length; i++) {
                const m = completedMoves[i];
                const face = m.charAt(0);
                const isDouble = m.endsWith('2');

                const stateF = simCube.clone().applyMove(face);
                const stateF2 = simCube.clone().applyMove(face + "2");
                const stateFPrime = simCube.clone().applyMove(face + "'");

                simCube.applyMove(m);
                this.expectedStates.push(simCube.clone());
                this.stepInfo.push({
                    move: m,
                    face: face,
                    isDouble: isDouble,
                    stateF: stateF,
                    stateF2: stateF2,
                    stateFPrime: stateFPrime,
                    targetState: simCube.clone()
                });
            }

            // 2. Build states for remaining moves starting from the current physical cube state
            const currSim = this.currentCube.clone();
            this.expectedStates[this.currentStep] = currSim.clone();

            for (let i = 0; i < remainingMoves.length; i++) {
                const m = remainingMoves[i];
                const face = m.charAt(0);
                const isDouble = m.endsWith('2');

                const stateF = currSim.clone().applyMove(face);
                const stateF2 = currSim.clone().applyMove(face + "2");
                const stateFPrime = currSim.clone().applyMove(face + "'");

                currSim.applyMove(m);
                this.expectedStates.push(currSim.clone());
                this.stepInfo.push({
                    move: m,
                    face: face,
                    isDouble: isDouble,
                    stateF: stateF,
                    stateF2: stateF2,
                    stateFPrime: stateFPrime,
                    targetState: currSim.clone()
                });
            }
            this.targetCube = currSim.clone();
        }

        evaluateState() {
            // 1. Check if solved to target
            if (this.currentCube.equals(this.targetCube)) {
                this.isComplete = true;
                this.isDeviated = false;
                this.isHalfTurn = false;
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

            this.isComplete = false;

            // 2. Check if currentCube matches any full-step state (scan backwards from end for furthest matching step)
            let matchedStep = -1;
            for (let i = this.expectedStates.length - 1; i >= 0; i--) {
                if (this.currentCube.equals(this.expectedStates[i])) {
                    matchedStep = i;
                    break;
                }
            }

            if (matchedStep >= 0) {
                this.isDeviated = false;
                this.isHalfTurn = false;
                this.halfFace = null;
                this.remainingOnFace = null;
                this.currentStep = matchedStep;
                this.correctionMoves = [];
                const remainingMoves = this.scrambleMoves.slice(matchedStep);
                return {
                    isComplete: false,
                    isDeviated: false,
                    isHalfTurn: false,
                    currentStep: matchedStep,
                    totalSteps: this.scrambleMoves.length,
                    correctionMoves: [],
                    remainingMoves: remainingMoves
                };
            }

            // 3. Check if currentCube matches an intermediate rotational state on the expected face for any step
            for (let i = 0; i < this.stepInfo.length; i++) {
                const info = this.stepInfo[i];
                const targetState = info.targetState;

                let matchedCandidate = false;
                let remainingOnFace = null;

                if (this.currentCube.equals(info.stateF)) {
                    matchedCandidate = true;
                    if (targetState.equals(info.stateF2)) remainingOnFace = info.face;
                    else if (targetState.equals(info.stateFPrime)) remainingOnFace = info.face + "2";
                } else if (this.currentCube.equals(info.stateF2)) {
                    matchedCandidate = true;
                    if (targetState.equals(info.stateF)) remainingOnFace = info.face;
                    else if (targetState.equals(info.stateFPrime)) remainingOnFace = info.face + "'";
                } else if (this.currentCube.equals(info.stateFPrime)) {
                    matchedCandidate = true;
                    if (targetState.equals(info.stateF)) remainingOnFace = info.face + "2";
                    else if (targetState.equals(info.stateF2)) remainingOnFace = info.face + "'";
                }

                if (matchedCandidate && remainingOnFace) {
                    this.isDeviated = false;
                    this.isHalfTurn = true;
                    this.halfFace = info.face;
                    this.remainingOnFace = remainingOnFace;
                    this.currentStep = i;
                    this.correctionMoves = [];
                    const remainingMoves = [remainingOnFace, ...this.scrambleMoves.slice(i + 1)];
                    return {
                        isComplete: false,
                        isDeviated: false,
                        isHalfTurn: true,
                        halfFace: info.face,
                        remainingOnFace: remainingOnFace,
                        currentStep: i,
                        totalSteps: this.scrambleMoves.length,
                        correctionMoves: [],
                        remainingMoves: remainingMoves
                    };
                }
            }

            // 4. Quick single-move lookahead on active face
            if (this.currentStep < this.scrambleMoves.length) {
                const expectedNextState = this.expectedStates[this.currentStep + 1];
                const expMove = this.scrambleMoves[this.currentStep];
                const face = expMove.charAt(0);

                for (const candidate of [face, face + "'", face + "2"]) {
                    const testCube = this.currentCube.clone().applyMove(candidate);
                    if (testCube.equals(expectedNextState)) {
                        this.isDeviated = false;
                        this.isHalfTurn = true;
                        this.halfFace = face;
                        this.remainingOnFace = candidate;
                        this.correctionMoves = [];
                        const remainingMoves = [candidate, ...this.scrambleMoves.slice(this.currentStep + 1)];
                        return {
                            isComplete: false,
                            isDeviated: false,
                            isHalfTurn: true,
                            halfFace: face,
                            remainingOnFace: candidate,
                            currentStep: this.currentStep,
                            totalSteps: this.scrambleMoves.length,
                            correctionMoves: [],
                            remainingMoves: remainingMoves
                        };
                    }
                }
            }

            // 5. True deviation: compute remaining moves from currentCube to targetCube and update the active formula in-place
            this.isDeviated = true;
            this.isHalfTurn = false;

            const remainingCorrection = getCorrectionMoves(this.currentCube, this.targetCube);
            if (remainingCorrection && remainingCorrection.length > 0) {
                const completedMoves = this.scrambleMoves.slice(0, this.currentStep);
                this.repathRemaining(completedMoves, remainingCorrection);

                return {
                    isComplete: false,
                    isDeviated: true,
                    repathed: true,
                    currentStep: this.currentStep,
                    totalSteps: this.scrambleMoves.length,
                    fullScrambleString: this.scrambleString,
                    correctionMoves: remainingCorrection,
                    remainingMoves: remainingCorrection
                };
            }

            this.correctionMoves = getNextStepCorrection(this.currentCube, this.expectedStates, this.currentStep, this.targetCube);
            return {
                isComplete: false,
                isDeviated: true,
                repathed: false,
                currentStep: this.currentStep,
                totalSteps: this.scrambleMoves.length,
                fullScrambleString: this.scrambleString,
                correctionMoves: this.correctionMoves,
                remainingMoves: this.correctionMoves
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
        RubiksCube,
        countMoves,
        generateWcaScramble,
        generateWcaScrambleWithFirstMove,
        getCorrectionMoves,
        getNextStepCorrection,
        ScrambleProgressTracker
    };
}));
