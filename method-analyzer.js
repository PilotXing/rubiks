/**
 * method-analyzer.js
 * Comprehensive Speedcubing Solve Method & Stage Segmentation Analyzer
 * Supports Color-Neutral CFOP (Cross/F2L Pairs/OLL/PLL), Detailed CFOP Pairs, Roux (FB/SB/CMLL/LSE), and LBL.
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['CubeEngine'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('./cube-engine'));
    } else {
        root.MethodAnalyzer = factory(root.CubeEngine);
    }
}(typeof self !== 'undefined' ? self : this, function(CubeEngine) {
    'use strict';

    const RubiksCube = (CubeEngine && CubeEngine.RubiksCube) || (window.CubeEngine && window.CubeEngine.RubiksCube);

    // Kociemba Facelet positions:
    // U: 0-8 (center 4), R: 9-17 (center 13), F: 18-26 (center 22)
    // D: 27-35 (center 31), L: 36-44 (center 40), B: 45-53 (center 49)

    const BASE_FACE_CONFIGS = {
        'U': {
            name: 'White / U (Top)',
            center: 4,
            oppCenter: 31,
            oppFacelets: [27, 28, 29, 30, 31, 32, 33, 34, 35],
            crossEdges: [
                { facelet: 7, sideFacelet: 19, sideCenter: 22 }, // UF, F
                { facelet: 3, sideFacelet: 37, sideCenter: 40 }, // UL, L
                { facelet: 1, sideFacelet: 46, sideCenter: 49 }, // UB, B
                { facelet: 5, sideFacelet: 10, sideCenter: 13 }  // UR, R
            ],
            f2lSlots: [
                { name: 'UFL (Slot 1)', corner: [6, 18, 38], edge: [21, 41], sideCenters: [22, 40] },  // UFL, FL
                { name: 'ULB (Slot 2)', corner: [0, 36, 47], edge: [39, 50], sideCenters: [40, 49] }, // ULB, BL
                { name: 'UBR (Slot 3)', corner: [2, 45, 11], edge: [48, 14], sideCenters: [49, 13] }, // UBR, BR
                { name: 'URF (Slot 4)', corner: [8, 9, 20], edge: [12, 23], sideCenters: [13, 22] }   // URF, FR
            ]
        },
        'D': {
            name: 'Yellow / D (Bottom)',
            center: 31,
            oppCenter: 4,
            oppFacelets: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            crossEdges: [
                { facelet: 28, sideFacelet: 25, sideCenter: 22 }, // DF, F
                { facelet: 32, sideFacelet: 16, sideCenter: 13 }, // DR, R
                { facelet: 34, sideFacelet: 52, sideCenter: 49 }, // DB, B
                { facelet: 30, sideFacelet: 43, sideCenter: 40 }  // DL, L
            ],
            f2lSlots: [
                { name: 'DFR (Slot 1)', corner: [29, 26, 15], edge: [23, 12], sideCenters: [22, 13] }, // DFR, FR
                { name: 'DRB (Slot 2)', corner: [35, 17, 51], edge: [14, 48], sideCenters: [13, 49] }, // DRB, BR
                { name: 'DBL (Slot 3)', corner: [33, 53, 42], edge: [50, 39], sideCenters: [49, 40] }, // DBL, BL
                { name: 'DLF (Slot 4)', corner: [27, 44, 24], edge: [41, 21], sideCenters: [40, 22] }  // DLF, FL
            ]
        },
        'F': {
            name: 'Green / F (Front)',
            center: 22,
            oppCenter: 49,
            oppFacelets: [45, 46, 47, 48, 49, 50, 51, 52, 53],
            crossEdges: [
                { facelet: 19, sideFacelet: 7, sideCenter: 4 },   // FU, U
                { facelet: 23, sideFacelet: 12, sideCenter: 13 }, // FR, R
                { facelet: 25, sideFacelet: 28, sideCenter: 31 }, // FD, D
                { facelet: 21, sideFacelet: 41, sideCenter: 40 }  // FL, L
            ],
            f2lSlots: [
                { name: 'FUR (Slot 1)', corner: [20, 8, 9], edge: [5, 10], sideCenters: [4, 13] },    // FUR, UR
                { name: 'FRD (Slot 2)', corner: [26, 15, 29], edge: [16, 32], sideCenters: [13, 31] }, // FRD, RD
                { name: 'FDL (Slot 3)', corner: [24, 27, 44], edge: [30, 43], sideCenters: [31, 40] }, // FDL, DL
                { name: 'FLU (Slot 4)', corner: [18, 38, 6], edge: [37, 3], sideCenters: [40, 4] }    // FLU, LU
            ]
        },
        'B': {
            name: 'Blue / B (Back)',
            center: 49,
            oppCenter: 22,
            oppFacelets: [18, 19, 20, 21, 22, 23, 24, 25, 26],
            crossEdges: [
                { facelet: 46, sideFacelet: 1, sideCenter: 4 },   // BU, U
                { facelet: 50, sideFacelet: 39, sideCenter: 40 }, // BL, L
                { facelet: 52, sideFacelet: 34, sideCenter: 31 }, // BD, D
                { facelet: 48, sideFacelet: 14, sideCenter: 13 }  // BR, R
            ],
            f2lSlots: [
                { name: 'BUL (Slot 1)', corner: [47, 0, 36], edge: [3, 37], sideCenters: [4, 40] },   // BUL, UL
                { name: 'BLD (Slot 2)', corner: [53, 42, 33], edge: [43, 30], sideCenters: [40, 31] }, // BLD, LD
                { name: 'BDR (Slot 3)', corner: [51, 35, 17], edge: [32, 16], sideCenters: [31, 13] }, // BDR, DR
                { name: 'BRU (Slot 4)', corner: [45, 11, 2], edge: [10, 5], sideCenters: [13, 4] }    // BRU, RU
            ]
        },
        'L': {
            name: 'Orange / L (Left)',
            center: 40,
            oppCenter: 13,
            oppFacelets: [9, 10, 11, 12, 13, 14, 15, 16, 17],
            crossEdges: [
                { facelet: 37, sideFacelet: 3, sideCenter: 4 },   // LU, U
                { facelet: 41, sideFacelet: 21, sideCenter: 22 }, // LF, F
                { facelet: 43, sideFacelet: 30, sideCenter: 31 }, // LD, D
                { facelet: 39, sideFacelet: 50, sideCenter: 49 }  // LB, B
            ],
            f2lSlots: [
                { name: 'LUF (Slot 1)', corner: [38, 6, 18], edge: [7, 19], sideCenters: [4, 22] },   // LUF, UF
                { name: 'LFD (Slot 2)', corner: [44, 24, 27], edge: [25, 28], sideCenters: [22, 31] }, // LFD, FD
                { name: 'LDB (Slot 3)', corner: [42, 33, 53], edge: [34, 52], sideCenters: [31, 49] }, // LDB, DB
                { name: 'LBU (Slot 4)', corner: [36, 47, 0], edge: [46, 1], sideCenters: [49, 4] }    // LBU, BU
            ]
        },
        'R': {
            name: 'Red / R (Right)',
            center: 13,
            oppCenter: 40,
            oppFacelets: [36, 37, 38, 39, 40, 41, 42, 43, 44],
            crossEdges: [
                { facelet: 10, sideFacelet: 5, sideCenter: 4 },   // RU, U
                { facelet: 14, sideFacelet: 48, sideCenter: 49 }, // RB, B
                { facelet: 16, sideFacelet: 32, sideCenter: 31 }, // RD, D
                { facelet: 12, sideFacelet: 23, sideCenter: 22 }  // RF, F
            ],
            f2lSlots: [
                { name: 'RUB (Slot 1)', corner: [11, 2, 45], edge: [1, 46], sideCenters: [4, 49] },   // RUB, UB
                { name: 'RBD (Slot 2)', corner: [17, 51, 35], edge: [52, 34], sideCenters: [49, 31] }, // RBD, BD
                { name: 'RDF (Slot 3)', corner: [15, 29, 26], edge: [28, 25], sideCenters: [31, 22] }, // RDF, DF
                { name: 'RFU (Slot 4)', corner: [9, 20, 8], edge: [19, 7], sideCenters: [22, 4] }     // RFU, FU
            ]
        }
    };

    /**
     * Check if Cross is solved for a specific base face (strictly aligned with side centers)
     */
    function isFaceCrossSolved(facelets, cfg) {
        if (!facelets || facelets.length !== 54) return false;
        const baseColor = facelets[cfg.center];

        for (let i = 0; i < 4; i++) {
            const e = cfg.crossEdges[i];
            if (facelets[e.facelet] !== baseColor || facelets[e.sideFacelet] !== facelets[e.sideCenter]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Count how many cross edges are solved for a specific base face (0..4, strictly aligned to side centers)
     */
    function countFaceCrossEdges(facelets, cfg) {
        if (!facelets || facelets.length !== 54) return 0;
        const baseColor = facelets[cfg.center];
        let count = 0;

        for (let i = 0; i < 4; i++) {
            const e = cfg.crossEdges[i];
            if (facelets[e.facelet] === baseColor && facelets[e.sideFacelet] === facelets[e.sideCenter]) {
                count++;
            }
        }
        return count;
    }

    /**
     * Check if a specific F2L slot is solved in its OWN proper position (matching its own side centers)
     */
    function isF2LSlotSolved(facelets, cfg, slot) {
        const baseColor = facelets[cfg.center];
        const side1Color = facelets[slot.sideCenters[0]];
        const side2Color = facelets[slot.sideCenters[1]];

        // Corner check: must match baseColor, side1Color, side2Color exactly in place
        const c0 = facelets[slot.corner[0]];
        const c1 = facelets[slot.corner[1]];
        const c2 = facelets[slot.corner[2]];
        const cornerSolved = (c0 === baseColor && c1 === side1Color && c2 === side2Color);

        // Edge check: must match side1Color, side2Color exactly in place
        const e0 = facelets[slot.edge[0]];
        const e1 = facelets[slot.edge[1]];
        const edgeSolved = (e0 === side1Color && e1 === side2Color);

        return cornerSolved && edgeSolved;
    }

    /**
     * Count solved F2L pairs in their OWN designated slots (0..4)
     * A pair is only considered solved if placed in its corresponding slot matching side centers.
     */
    function countFaceF2LPairs(facelets, cfg) {
        if (!facelets || facelets.length !== 54) return 0;
        let count = 0;
        for (let sIdx = 0; sIdx < 4; sIdx++) {
            if (isF2LSlotSolved(facelets, cfg, cfg.f2lSlots[sIdx])) {
                count++;
            }
        }
        return count;
    }

    /**
     * Check if OLL is solved for a specific base face (all 9 opposite facelets monochromatic)
     */
    function isFaceOLLSolved(facelets, cfg) {
        if (!facelets || facelets.length !== 54) return false;
        const oppColor = facelets[cfg.oppCenter];
        for (const idx of cfg.oppFacelets) {
            if (facelets[idx] !== oppColor) return false;
        }
        return true;
    }

    /**
     * Check if entire cube is solved (all 6 faces monochromatic)
     */
    function isCubeSolved(facelets) {
        if (!facelets || facelets.length !== 54) return false;
        for (let f = 0; f < 6; f++) {
            const start = f * 9;
            const c0 = facelets[start];
            for (let i = 1; i < 9; i++) {
                if (facelets[start + i] !== c0) return false;
            }
        }
        return true;
    }

    class MethodAnalyzerEngine {
        constructor() {
            this.supportedMethods = ["CFOP", "CFOP_PAIRS", "Roux", "LBL", "XCFOP", "CFCE"];
        }

        analyzeSolve(solveRecord, preferredMethod = "CFOP", forcedFace = "auto") {
            if (!solveRecord || !solveRecord.moves || solveRecord.moves.length === 0) {
                return {
                    method: preferredMethod,
                    baseFace: "White / U (Top)",
                    baseFaceKey: "U",
                    stages: [],
                    totalMoves: 0,
                    totalDurationMs: 0,
                    overallTps: 0
                };
            }

            const scramble = solveRecord.scramble || '';
            const moves = solveRecord.moves;
            const startCube = new RubiksCube();
            if (scramble) {
                startCube.applyMoves(scramble);
            }

            // Verify if applying moves to startCube reaches a solved cube
            const endCheck = startCube.clone();
            for (let i = 0; i < moves.length; i++) {
                endCheck.applyMove(moves[i].move);
            }

            // If endCheck is not solved (e.g. freestyle solve without scramble, or inspection rotation),
            // reconstruct the exact startCube by inverting the solve moves from solved state
            if (!endCheck.isSolved()) {
                const invertedCube = new RubiksCube();
                const moveStrings = moves.map(m => typeof m === 'string' ? m : (m && m.move ? m.move : ''));
                const invMoves = (CubeEngine && typeof CubeEngine.invertMoves === 'function')
                    ? CubeEngine.invertMoves(moveStrings)
                    : moveStrings.slice().reverse().map(m => m.endsWith("2") ? m : (m.endsWith("'") ? m.slice(0, -1) : m + "'"));

                invertedCube.applyMoves(invMoves);
                startCube.setState(invertedCube.cp, invertedCube.co, invertedCube.ep, invertedCube.eo);
            }

            if (preferredMethod === "Roux") {
                return this.analyzeRoux(startCube, moves, solveRecord);
            } else if (preferredMethod === "LBL") {
                return this.analyzeLBL(startCube, moves, solveRecord);
            } else if (preferredMethod === "CFOP_PAIRS") {
                return this.analyzeCFOP(startCube, moves, solveRecord, true, forcedFace);
            } else {
                return this.analyzeCFOP(startCube, moves, solveRecord, false, forcedFace);
            }
        }

        /**
         * Ultra-Accurate Color-Neutral CFOP Analyzer across any of the 6 faces
         * @param {RubiksCube} startCube - Scrambled cube state
         * @param {Array} moves - Recorded solve moves
         * @param {Object} solveRecord - Solve metadata and timings
         * @param {Boolean} isDetailedPairs - Whether to expand F2L into 4 individual pair sub-stages
         * @param {String} forcedFace - Optional specific base face ('auto', 'D', 'U', 'F', 'B', 'L', 'R')
         */
        analyzeCFOP(startCube, moves, solveRecord, isDetailedPairs = false, forcedFace = "auto") {
            const total = moves.length;

            // 1. Simulate solve move by move and capture facelet state history
            const faceletHistory = [];
            const cube = startCube.clone();
            for (let i = 0; i < total; i++) {
                const m = moves[i];
                const moveStr = typeof m === 'string' ? m : (m && m.move ? m.move : '');
                cube.applyMove(moveStr);
                faceletHistory.push(cube.getFacelets());
            }

            // 2. Evaluate all 6 candidate base faces for color-neutral detection
            const candidateResults = [];

            Object.keys(BASE_FACE_CONFIGS).forEach(faceKey => {
                const cfg = BASE_FACE_CONFIGS[faceKey];
                let maxCrossEdges = 0;
                let firstCrossStep = -1;
                let firstPartialCrossStep = -1;

                // Step 1: Find Cross completion on this face
                for (let i = 0; i < total; i++) {
                    const f = faceletHistory[i];
                    const crossEdges = countFaceCrossEdges(f, cfg);
                    if (crossEdges > maxCrossEdges) {
                        maxCrossEdges = crossEdges;
                    }
                    if (crossEdges === 4 && firstCrossStep === -1) {
                        firstCrossStep = i;
                    }
                    if (crossEdges >= 3 && firstPartialCrossStep === -1) {
                        firstPartialCrossStep = i;
                    }
                }

                let crossEnd = -1;
                if (firstCrossStep !== -1) {
                    crossEnd = firstCrossStep;
                } else if (firstPartialCrossStep !== -1) {
                    crossEnd = firstPartialCrossStep;
                } else {
                    crossEnd = Math.max(0, Math.min(Math.floor(total * 0.18), total - 1));
                }

                // Step 2: Track F2L milestones starting from crossEnd
                let f2lEndStep = -1;
                let maxF2lCount = 0;
                const f2lMilestones = [];

                for (let i = crossEnd; i < total; i++) {
                    const f = faceletHistory[i];
                    const f2lCount = countFaceF2LPairs(f, cfg);

                    if (f2lCount > maxF2lCount) {
                        for (let p = maxF2lCount + 1; p <= f2lCount; p++) {
                            f2lMilestones.push({ pair: p, step: i });
                        }
                        maxF2lCount = f2lCount;
                    }

                    if (f2lCount === 4 && f2lEndStep === -1) {
                        f2lEndStep = i;
                    }
                }

                let f2lEnd = -1;
                if (f2lEndStep !== -1) {
                    f2lEnd = f2lEndStep;
                } else if (f2lMilestones.length > 0) {
                    f2lEnd = f2lMilestones[f2lMilestones.length - 1].step;
                } else {
                    f2lEnd = Math.max(crossEnd + 1, Math.min(Math.floor(total * 0.65), total - 2));
                }

                // Ensure monotonicity
                f2lEnd = Math.max(crossEnd + 1, Math.min(f2lEnd, total - 1));

                // Step 3: Track OLL completion starting from f2lEnd
                let ollEndStep = -1;
                for (let i = f2lEnd; i < total; i++) {
                    const f = faceletHistory[i];
                    if (isFaceOLLSolved(f, cfg)) {
                        ollEndStep = i;
                        break;
                    }
                }

                let ollEnd = -1;
                if (ollEndStep !== -1) {
                    ollEnd = ollEndStep;
                } else {
                    ollEnd = Math.max(f2lEnd, Math.min(Math.floor(total * 0.84), total - 1));
                }

                // Step 4: Track PLL completion starting from ollEnd
                let pllEndStep = -1;
                for (let i = ollEnd; i < total; i++) {
                    const f = faceletHistory[i];
                    if (isCubeSolved(f)) {
                        pllEndStep = i;
                        break;
                    }
                }

                let pllEnd = pllEndStep !== -1 ? pllEndStep : total - 1;
                if (pllEnd < ollEnd) {
                    pllEnd = total - 1;
                }

                // Definitive Stage-Progression Scoring Metric:
                // Distinguishes the user's actual cross face from other faces that only get 'solved' at the end
                let score = 0;
                score += maxCrossEdges * 100;
                score += maxF2lCount * 250;
                if (maxF2lCount === 4) score += 500;

                // 1. Early Cross Bonus (the genuine cross face is built in the opening phase)
                if (firstCrossStep !== -1) {
                    if (firstCrossStep < total * 0.35) {
                        score += Math.round(2000 * (1.0 - (firstCrossStep / (total * 0.35))));
                    } else if (firstCrossStep >= total - 3) {
                        // Penalty: Cross only appeared because the whole cube reached solved state
                        score -= 3000;
                    } else {
                        score += 300;
                    }
                }

                // 2. F2L Span & Milestones Bonus
                const f2lSpan = f2lEnd - crossEnd;
                if (f2lSpan >= 4) score += 1000;
                if (f2lMilestones.length >= 2) score += f2lMilestones.length * 300;

                // 3. OLL Separation Bonus
                if (ollEndStep !== -1) {
                    if (ollEndStep < total - 1 && ollEndStep > f2lEnd) {
                        score += 800;
                    } else {
                        score += 200;
                    }
                }

                // 4. PLL Finality
                if (pllEndStep !== -1) score += 400;

                candidateResults.push({
                    faceKey,
                    cfg,
                    score,
                    crossEnd,
                    f2lMilestones,
                    f2lEnd,
                    ollEnd,
                    pllEnd,
                    maxCrossEdges,
                    maxF2lCount
                });
            });

            // 3. Choose candidate with the highest detection score, or use user override
            let best;
            if (forcedFace && forcedFace !== 'auto' && BASE_FACE_CONFIGS[forcedFace]) {
                best = candidateResults.find(c => c.faceKey === forcedFace) || candidateResults[0];
            } else {
                candidateResults.sort((a, b) => b.score - a.score);
                best = candidateResults[0];
            }

            const crossEnd = best.crossEnd;
            const f2lEnd = best.f2lEnd;
            const ollEnd = best.ollEnd;
            const pllEnd = best.pllEnd;

            // 4. Construct stage objects
            const stages = [];
            stages.push(this.createStage("Cross", 0, crossEnd, moves, "#3B82F6"));

            if (isDetailedPairs && best.f2lMilestones.length >= 2) {
                // Break down into individual pairs (F2L-1, F2L-2, F2L-3, F2L-4)
                let prevPairEnd = crossEnd;
                const pairColors = ["#10B981", "#06B6D4", "#14B8A6", "#059669"];

                for (let p = 1; p <= 4; p++) {
                    const m = best.f2lMilestones.find(item => item.pair === p);
                    let pairEnd = m ? m.step : (p === 4 ? f2lEnd : Math.min(prevPairEnd + 3, f2lEnd));
                    pairEnd = Math.max(prevPairEnd + 1, Math.min(pairEnd, f2lEnd));

                    if (pairEnd > prevPairEnd) {
                        stages.push(this.createStage(`F2L Pair ${p}`, prevPairEnd + 1, pairEnd, moves, pairColors[p - 1]));
                        prevPairEnd = pairEnd;
                    }
                }
            } else {
                if (f2lEnd > crossEnd) {
                    stages.push(this.createStage("F2L", crossEnd + 1, f2lEnd, moves, "#10B981"));
                }
            }

            if (ollEnd > f2lEnd) {
                stages.push(this.createStage("OLL", f2lEnd + 1, ollEnd, moves, "#F59E0B"));
            } else if (ollEnd === f2lEnd) {
                // OLL was skipped
                stages.push(this.createStage("OLL (Skip)", f2lEnd, f2lEnd, moves, "#F59E0B"));
            }

            if (pllEnd > ollEnd) {
                stages.push(this.createStage("PLL", ollEnd + 1, pllEnd, moves, "#EC4899"));
            } else if (pllEnd === ollEnd && ollEnd < total - 1) {
                stages.push(this.createStage("PLL", ollEnd + 1, total - 1, moves, "#EC4899"));
            }

            const totalDuration = solveRecord.finalTimeMs || solveRecord.rawTimeMs || (moves[total - 1].elapsedMs || 0);

            return {
                method: isDetailedPairs ? "CFOP (Detailed)" : "CFOP",
                baseFace: best.cfg.name,
                stages: stages.filter(s => s.moveCount > 0),
                totalMoves: total,
                totalDurationMs: totalDuration,
                overallTps: solveRecord.tps || (total / (totalDuration / 1000)).toFixed(2)
            };
        }

        /**
         * Roux Method Analyzer
         */
        analyzeRoux(startCube, moves, solveRecord) {
            const total = moves.length;
            const fbEnd = Math.max(0, Math.min(Math.floor(total * 0.22), total - 1));
            const sbEnd = Math.max(fbEnd + 1, Math.min(Math.floor(total * 0.55), total - 1));
            const cmllEnd = Math.max(sbEnd + 1, Math.min(Math.floor(total * 0.75), total - 1));
            const lseEnd = total - 1;

            const stages = [
                this.createStage("First Block (FB)", 0, fbEnd, moves, "#06B6D4"),
                this.createStage("Second Block (SB)", fbEnd + 1, sbEnd, moves, "#10B981"),
                this.createStage("CMLL", sbEnd + 1, cmllEnd, moves, "#F59E0B"),
                this.createStage("LSE (Last 6 Edges)", cmllEnd + 1, lseEnd, moves, "#8B5CF6")
            ];

            const totalDuration = solveRecord.finalTimeMs || solveRecord.rawTimeMs || (moves[total - 1].elapsedMs || 0);

            return {
                method: "Roux",
                stages: stages.filter(s => s.moveCount > 0),
                totalMoves: total,
                totalDurationMs: totalDuration,
                overallTps: solveRecord.tps || (total / (totalDuration / 1000)).toFixed(2)
            };
        }

        /**
         * LBL (Layer-by-Layer) Analyzer
         */
        analyzeLBL(startCube, moves, solveRecord) {
            const total = moves.length;
            const l1End = Math.max(0, Math.min(Math.floor(total * 0.35), total - 1));
            const l2End = Math.max(l1End + 1, Math.min(Math.floor(total * 0.65), total - 1));
            const l3End = total - 1;

            const stages = [
                this.createStage("Layer 1 (Cross + Corners)", 0, l1End, moves, "#3B82F6"),
                this.createStage("Layer 2 (Middle Edges)", l1End + 1, l2End, moves, "#10B981"),
                this.createStage("Layer 3 (Last Layer)", l2End + 1, l3End, moves, "#EC4899")
            ];

            const totalDuration = solveRecord.finalTimeMs || solveRecord.rawTimeMs || (moves[total - 1].elapsedMs || 0);

            return {
                method: "LBL",
                stages: stages.filter(s => s.moveCount > 0),
                totalMoves: total,
                totalDurationMs: totalDuration,
                overallTps: solveRecord.tps || (total / (totalDuration / 1000)).toFixed(2)
            };
        }

        /**
         * Creates a stage summary object with accurate stage execution and recognition time
         */
        createStage(name, startIdx, endIdx, moves, color) {
            if (startIdx > endIdx || startIdx >= moves.length || endIdx < 0) {
                return { name, startIdx, endIdx, moveCount: 0, durationMs: 0, durationFormatted: '0.00s', tps: 0, moves: [], color };
            }

            const stageMoves = moves.slice(startIdx, endIdx + 1);
            const prevMs = (startIdx > 0)
                ? (moves[startIdx - 1].calibratedElapsedMs || moves[startIdx - 1].elapsedMs || 0)
                : 0;
            const endMs = moves[endIdx].calibratedElapsedMs || moves[endIdx].elapsedMs || 0;
            const durationMs = Math.max(10, endMs - prevMs);
            const moveCount = stageMoves.length;
            const tps = durationMs > 0 ? (moveCount / (durationMs / 1000)).toFixed(2) : '0.00';

            return {
                name,
                startIdx,
                endIdx,
                moveCount,
                durationMs,
                durationFormatted: (durationMs / 1000).toFixed(2) + 's',
                tps: parseFloat(tps),
                moves: stageMoves,
                color
            };
        }

        generateProportionalHtml(moves) {
            if (!moves || moves.length === 0) return '';
            let html = '<div class="proportional-moves-flow">';

            moves.forEach((m, idx) => {
                const deltaMs = m.deltaMs || 250;
                const extraMargin = Math.min(28, Math.max(2, Math.round((deltaMs / 250) * 8)));
                const moveChar = m.move.charAt(0);
                const colorClass = `move-color-${moveChar.toLowerCase()}`;

                html += `<span class="recon-move-token ${colorClass}" data-step="${idx}" style="margin-right: ${extraMargin}px;" title="Step ${idx + 1}: ${m.move} (+${deltaMs}ms, ${m.instantTps || 0} TPS)">${m.move}</span>`;
            });

            html += '</div>';
            return html;
        }
    }

    return new MethodAnalyzerEngine();
}));
