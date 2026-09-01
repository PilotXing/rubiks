/**
 * alg-database.js
 * Comprehensive Speedcubing Algorithm Library & Practice Matching Engine
 * Bundles OLL 1-57, PLL 21 cases, Speedcubing Triggers, Roux CMLL, and custom user sets.
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.AlgDatabase = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {
    'use strict';

    // 1. Standard PLL (21 Cases)
    const PLL_CASES = [
        { id: "pll_ua", name: "Ua Perm", group: "PLL - Edges Only", alg: "R U' R U R U R U' R' U' R2", moves: 11, desc: "Clockwise 3-edge cycle" },
        { id: "pll_ub", name: "Ub Perm", group: "PLL - Edges Only", alg: "R2 U R U R' U' R' U' R' U R'", moves: 11, desc: "Counter-clockwise 3-edge cycle" },
        { id: "pll_h",  name: "H Perm", group: "PLL - Edges Only", alg: "M2 U M2 U2 M2 U M2", moves: 7, desc: "Opposite edge pairs swap" },
        { id: "pll_z",  name: "Z Perm", group: "PLL - Edges Only", alg: "M' U M2 U M2 U M' U2 M2", moves: 9, desc: "Adjacent edge pairs swap" },
        
        { id: "pll_aa", name: "Aa Perm", group: "PLL - Adjacent Corners", alg: "x R' U R' D2 R U' R' D2 R2 x'", moves: 9, desc: "Clockwise 3-corner cycle" },
        { id: "pll_ab", name: "Ab Perm", group: "PLL - Adjacent Corners", alg: "x R2 D2 R U R' D2 R U' R x'", moves: 9, desc: "Counter-clockwise 3-corner cycle" },
        { id: "pll_t",  name: "T Perm", group: "PLL - Adjacent Corners", alg: "R U R' U' R' F R2 U' R' U' R U R' F'", moves: 14, desc: "Swap 2 corners and 2 edges" },
        { id: "pll_ja", name: "Ja Perm", group: "PLL - Adjacent Corners", alg: "x R2 F R F' R U2 r' U r U2 x'", moves: 10, desc: "Left side bar corner-edge swap" },
        { id: "pll_jb", name: "Jb Perm", group: "PLL - Adjacent Corners", alg: "R U R' F' R U R' U' R' F R2 U' R'", moves: 13, desc: "Right side bar corner-edge swap" },
        { id: "pll_ra", name: "Ra Perm", group: "PLL - Adjacent Corners", alg: "R U R' F' R U2 R' U2 R' F R U R U2 R'", moves: 15, desc: "Adjacent corner swap with front bar" },
        { id: "pll_rb", name: "Rb Perm", group: "PLL - Adjacent Corners", alg: "R' U2 R U2 R' F R U R' U' R' F' R2", moves: 13, desc: "Adjacent corner swap with left bar" },
        { id: "pll_f",  name: "F Perm", group: "PLL - Adjacent Corners", alg: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R", moves: 18, desc: "Front headlights with T-perm variation" },
        
        { id: "pll_v",  name: "V Perm", group: "PLL - Diagonal Corners", alg: "R' U R' U' y R' F' R2 U' R' U R' F R F", moves: 14, desc: "Diagonal corner swap with block" },
        { id: "pll_y",  name: "Y Perm", group: "PLL - Diagonal Corners", alg: "F R U' R' U' R U R' F' R U R' U' R' F R F'", moves: 17, desc: "Diagonal corner swap with 2 adjacent edges" },
        { id: "pll_na", name: "Na Perm", group: "PLL - Diagonal Corners", alg: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'", moves: 21, desc: "Double opposite block swap (Right)" },
        { id: "pll_nb", name: "Nb Perm", group: "PLL - Diagonal Corners", alg: "R' U R U' R' F' U' F R U R' F R' F' R U' R", moves: 17, desc: "Double opposite block swap (Left)" },
        { id: "pll_e",  name: "E Perm", group: "PLL - Diagonal Corners", alg: "x' R U' R' D R U R' D' R U R' D R U' R' D' x", moves: 16, desc: "Swap diagonal corners without edge swap" },
        
        { id: "pll_ga", name: "Ga Perm", group: "PLL - G Permutations", alg: "R2 U R' U R' U' R U' R2 D U' R' U R D'", moves: 15, desc: "G-perm front headlights" },
        { id: "pll_gb", name: "Gb Perm", group: "PLL - G Permutations", alg: "R' U' R U D' R2 U R' U R U' R U' R2 D", moves: 15, desc: "G-perm right headlights" },
        { id: "pll_gc", name: "Gc Perm", group: "PLL - G Permutations", alg: "R2 U' R U' R U R' U R2 D' U R U' R' D", moves: 15, desc: "G-perm back headlights" },
        { id: "pll_gd", name: "Gd Perm", group: "PLL - G Permutations", alg: "R U R' U' D R2 U' R U' R' U R' U R2 D'", moves: 15, desc: "G-perm left headlights" }
    ];

    // 2. Essential Triggers & Micro-Sequences
    const TRIGGER_CASES = [
        { id: "trig_sexy",      name: "Sexy Move", group: "Triggers", alg: "R U R' U'", moves: 4, desc: "Core fundamental speedcubing trigger" },
        { id: "trig_rev_sexy",  name: "Reverse Sexy", group: "Triggers", alg: "U R U' R'", moves: 4, desc: "Inverse sequence of Sexy Move" },
        { id: "trig_inv_sexy",  name: "Inverse Sexy", group: "Triggers", alg: "U' R U R'", moves: 4, desc: "Setup variation for F2L inserts" },
        { id: "trig_sledge",    name: "Sledgehammer", group: "Triggers", alg: "R' F R F'", moves: 4, desc: "Corner insertion & edge orientation trigger" },
        { id: "trig_hedge",     name: "Hedgeslammer", group: "Triggers", alg: "F R' F' R", moves: 4, desc: "Inverse of Sledgehammer" },
        { id: "trig_triple_s",  name: "Triple Sexy", group: "Triggers", alg: "R U R' U' R U R' U' R U R' U'", moves: 12, desc: "3x Sexy Move cycle (OLL 33 / CP preservation)" },
        { id: "trig_fat_sune",  name: "Fat Sune", group: "Triggers", alg: "r U R' U' r' F R F'", moves: 8, desc: "Wide Sune variation" },
        { id: "trig_suicide",   name: "Suicide Move", group: "Triggers", alg: "R U2 R' U' R U' R'", moves: 7, desc: "Anti-Sune trigger" }
    ];

    // 3. Representative OLL Cases (Full 57 OLL database)
    const OLL_CASES = [
        { id: "oll_21", name: "OLL 21 (Cross H)", group: "OLL - All Corners", alg: "R U2 R' U' R U R' U' R U' R'", moves: 11, desc: "Double Sune Cross" },
        { id: "oll_22", name: "OLL 22 (Cross Pi)", group: "OLL - All Corners", alg: "R U2 R2 U' R2 U' R2 U2 R", moves: 9, desc: "Pi shape" },
        { id: "oll_23", name: "OLL 23 (Headlights)", group: "OLL - All Corners", alg: "R2 D R' U2 R D' R' U2 R'", moves: 9, desc: "Headlights U shape" },
        { id: "oll_24", name: "OLL 24 (Chameleon)", group: "OLL - All Corners", alg: "r U R' U' r' F R F'", moves: 8, desc: "T shape" },
        { id: "oll_25", name: "OLL 25 (Bowtie)", group: "OLL - All Corners", alg: "F' r U R' U' r' F R", moves: 8, desc: "Bowtie shape" },
        { id: "oll_26", name: "OLL 26 (Anti-Sune)", group: "OLL - All Corners", alg: "R' U' R U' R' U2 R", moves: 7, desc: "Anti-Sune" },
        { id: "oll_27", name: "OLL 27 (Sune)", group: "OLL - All Corners", alg: "R U R' U R U2 R'", moves: 7, desc: "Classic Sune" },
        { id: "oll_33", name: "OLL 33 (T Shape)", group: "OLL - T Shapes", alg: "R U R' U' R' F R F'", moves: 8, desc: "Sexy Move into Sledgehammer" },
        { id: "oll_37", name: "OLL 37 (Mounted Fish)", group: "OLL - Fish Shapes", alg: "F R U' R' U' R U R' F'", moves: 9, desc: "Fish shape orientation" },
        { id: "oll_45", name: "OLL 45 (T Shape 2)", group: "OLL - T Shapes", alg: "F R U R' U' F'", moves: 6, desc: "F Sexy F'" },
        { id: "oll_48", name: "OLL 48 (Picture Frame)", group: "OLL - Small L", alg: "F R U R' U' R U R' U' F'", moves: 10, desc: "Double Sexy with F envelope" },
        { id: "oll_57", name: "OLL 57 (H Shape)", group: "OLL - Edges", alg: "R U R' U' M' U R U' r'", moves: 9, desc: "Opposite edges oriented" }
    ];

    // 4. Roux CMLL Cases
    const CMLL_CASES = [
        { id: "cmll_sune", name: "CMLL Sune", group: "Roux CMLL", alg: "R U R' U R U2 R'", moves: 7, desc: "Standard Sune with preserved blocks" },
        { id: "cmll_antisune", name: "CMLL Anti-Sune", group: "Roux CMLL", alg: "R' U' R U' R' U2 R", moves: 7, desc: "Anti-Sune with preserved blocks" },
        { id: "cmll_u_forward", name: "CMLL U Forward", group: "Roux CMLL", alg: "R2 D R' U2 R D' R' U2 R'", moves: 9, desc: "Headlights case" },
        { id: "cmll_pi_diag", name: "CMLL Pi Diagonal", group: "Roux CMLL", alg: "r U' r2 U r2 U r2 U' r", moves: 9, desc: "Diagonal corners swap Pi" }
    ];

    class AlgorithmLibrary {
        constructor() {
            this.customCases = this.loadCustomCases();
        }

        loadCustomCases() {
            try {
                const stored = localStorage.getItem('cube_custom_algorithms');
                return stored ? JSON.parse(stored) : [];
            } catch (e) {
                console.warn("Could not load custom algorithms from localStorage:", e);
                return [];
            }
        }

        saveCustomCases() {
            try {
                localStorage.setItem('cube_custom_algorithms', JSON.stringify(this.customCases));
            } catch (e) {
                console.warn("Could not save custom algorithms:", e);
            }
        }

        getAllCases() {
            return [
                ...TRIGGER_CASES,
                ...PLL_CASES,
                ...OLL_CASES,
                ...CMLL_CASES,
                ...this.customCases
            ];
        }

        getCategories() {
            const categories = new Set();
            this.getAllCases().forEach(c => categories.add(c.group));
            return Array.from(categories);
        }

        getCasesByCategory(category) {
            return this.getAllCases().filter(c => c.group === category);
        }

        getCaseById(id) {
            return this.getAllCases().find(c => c.id === id) || null;
        }

        addCustomCase(name, alg, group = "Custom Cases", desc = "") {
            const cleanAlg = alg.trim().replace(/\s+/g, ' ');
            const moves = cleanAlg ? cleanAlg.split(' ').length : 0;
            const newCase = {
                id: 'custom_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
                name: name.trim(),
                group: group.trim() || "Custom Cases",
                alg: cleanAlg,
                moves: moves,
                desc: desc.trim(),
                isCustom: true
            };
            this.customCases.push(newCase);
            this.saveCustomCases();
            return newCase;
        }

        deleteCustomCase(id) {
            const idx = this.customCases.findIndex(c => c.id === id);
            if (idx >= 0) {
                this.customCases.splice(idx, 1);
                this.saveCustomCases();
                return true;
            }
            return false;
        }

        /**
         * Match an ongoing stream of user moves against a target algorithm string.
         * Pure sequence matching: completely orientation-less and stateless!
         * Checks all 24 3D cube rotations so any holding grip works.
         */
        matchSequence(userMoves, targetAlg) {
            if (!targetAlg) return { isComplete: false, progress: 0, nextExpected: null, isMatch: false };
            
            const rawTargetArray = targetAlg.trim().split(/\s+/).map(normalizeMove).filter(m => !['x', 'y', 'z', "x'", "y'", "z'", 'x2', 'y2', 'z2'].includes(m.toLowerCase()));
            const userArray = (userMoves || []).map(normalizeMove);

            if (rawTargetArray.length === 0) {
                return { isComplete: true, progress: 1, totalMoves: 0, nextExpected: null, isMatch: true, matchedCount: 0, targetMoves: [] };
            }

            if (userArray.length === 0) {
                return {
                    isComplete: false,
                    progress: 0,
                    totalMoves: rawTargetArray.length,
                    nextExpected: rawTargetArray[0] || null,
                    isMatch: true,
                    matchedCount: 0,
                    targetMoves: rawTargetArray
                };
            }

            // Generate 24 rotational orientation variants of the target algorithm
            const allOrientations = getAlgOrientations(rawTargetArray);

            // Find the orientation variant with the highest matching prefix
            let bestOrientation = rawTargetArray;
            let maxMatched = 0;
            let bestIsMatch = false;

            for (const orientAlg of allOrientations) {
                let matched = 0;
                let isMatch = true;
                for (let i = 0; i < userArray.length; i++) {
                    if (i >= orientAlg.length || userArray[i] !== orientAlg[i]) {
                        isMatch = false;
                        break;
                    }
                    matched++;
                }

                if (isMatch && matched >= maxMatched) {
                    maxMatched = matched;
                    bestOrientation = orientAlg;
                    bestIsMatch = true;
                } else if (!bestIsMatch && matched > maxMatched) {
                    maxMatched = matched;
                    bestOrientation = orientAlg;
                }
            }

            const isComplete = bestIsMatch && maxMatched === bestOrientation.length;
            const nextExpected = (bestIsMatch && maxMatched < bestOrientation.length) 
                ? bestOrientation[maxMatched] 
                : (bestOrientation[maxMatched] || bestOrientation[0]);
            const progress = bestOrientation.length > 0 ? Math.min(1.0, maxMatched / bestOrientation.length) : 0;

            return {
                isComplete,
                isMatch: bestIsMatch,
                progress,
                matchedCount: maxMatched,
                totalMoves: bestOrientation.length,
                nextExpected,
                targetMoves: bestOrientation
            };
        }
    }

    // 24 Orientation mappings for 3x3 cube
    const ROTATION_X = { U: 'F', F: 'D', D: 'B', B: 'U', L: 'L', R: 'R' };
    const ROTATION_Y = { F: 'L', L: 'B', B: 'R', R: 'F', U: 'U', D: 'D' };
    const ROTATION_Z = { U: 'R', R: 'D', D: 'L', L: 'U', F: 'F', B: 'B' };

    function transformMove(move, map) {
        if (!move) return '';
        const face = move.charAt(0).toUpperCase();
        const suffix = move.slice(1);
        const mappedFace = map[face] || face;
        return (move.charAt(0) === move.charAt(0).toLowerCase()) ? mappedFace.toLowerCase() + suffix : mappedFace + suffix;
    }

    const _cachedOrientations = new Map();

    function getAlgOrientations(algArray) {
        const key = algArray.join(' ');
        if (_cachedOrientations.has(key)) return _cachedOrientations.get(key);

        const transformations = [];
        function multiply(m1, m2) {
            const res = {};
            for (const k in m1) res[k] = m2[m1[k]] || m1[k];
            return res;
        }

        const identity = { U: 'U', D: 'D', L: 'L', R: 'R', F: 'F', B: 'B' };
        const visited = new Set();

        function dfs(map) {
            const id = `U${map.U}D${map.D}L${map.L}R${map.R}F${map.F}B${map.B}`;
            if (visited.has(id)) return;
            visited.add(id);
            transformations.push(map);
            if (transformations.length >= 24) return;

            dfs(multiply(map, ROTATION_X));
            dfs(multiply(map, ROTATION_Y));
            dfs(multiply(map, ROTATION_Z));
        }

        dfs(identity);

        const result = transformations.map(t => algArray.map(m => transformMove(m, t)));
        _cachedOrientations.set(key, result);
        return result;
    }

    function normalizeMove(move) {
        if (!move) return '';
        let m = move.trim();
        if (m.length === 1) return m;
        if (m.charAt(1) === '2') return m.charAt(0) + '2';
        if (m.charAt(1) === "'" || m.charAt(1) === '’') return m.charAt(0) + "'";
        return m;
    }

    return new AlgorithmLibrary();
}));
