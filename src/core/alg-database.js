/**
 * alg-database.js
 * Comprehensive Speedcubing Algorithm Library & Practice Matching Engine
 * Bundles full CFOP (F2L, OLL, PLL, Adv F2L), complete ZBLL (T, U, L, H, Pi, S, AS),
 * Chi-Chu Blindfolded (角块三循环, 棱块三循环, 翻角翻棱, 奇偶校验), Roux CMLL, Triggers, and custom sets.
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

    class AlgorithmLibrary {
        constructor() {
            this.customCases = this.loadCustomCases();
            this.activeAlgOverrides = this.loadActiveAlgOverrides();
        }

        loadCustomCases() {
            try {
                if (typeof localStorage === 'undefined') return [];
                const stored = localStorage.getItem('cube_custom_algorithms');
                return stored ? JSON.parse(stored) : [];
            } catch (e) {
                console.warn("Could not load custom algorithms from localStorage:", e);
                return [];
            }
        }

        saveCustomCases() {
            try {
                if (typeof localStorage === 'undefined') return;
                localStorage.setItem('cube_custom_algorithms', JSON.stringify(this.customCases));
            } catch (e) {
                console.warn("Could not save custom algorithms:", e);
            }
        }

        loadActiveAlgOverrides() {
            try {
                if (typeof localStorage === 'undefined') return {};
                const stored = localStorage.getItem('cube_active_alg_overrides');
                return stored ? JSON.parse(stored) : {};
            } catch (e) {
                return {};
            }
        }

        saveActiveAlgOverrides() {
            try {
                if (typeof localStorage === 'undefined') return;
                localStorage.setItem('cube_active_alg_overrides', JSON.stringify(this.activeAlgOverrides));
            } catch (e) {}
        }

        getBuiltinDataset() {
            if (typeof self !== 'undefined' && self.RUBIKS_ALGORITHM_DATASET) {
                return self.RUBIKS_ALGORITHM_DATASET;
            }
            if (typeof window !== 'undefined' && window.RUBIKS_ALGORITHM_DATASET) {
                return window.RUBIKS_ALGORITHM_DATASET;
            }
            return [];
        }

        getAllCases() {
            const dataset = this.getBuiltinDataset();
            const cases = [...dataset, ...this.customCases].map(c => {
                const overrideIdx = this.activeAlgOverrides[c.id];
                const allAlgs = (c.algs && c.algs.length > 0) ? c.algs : [c.alg];
                if (overrideIdx !== undefined && allAlgs[overrideIdx]) {
                    const chosenAlg = allAlgs[overrideIdx];
                    return {
                        ...c,
                        activeAlgIdx: overrideIdx,
                        alg: chosenAlg,
                        algs: allAlgs,
                        moves: chosenAlg ? chosenAlg.split(' ').length : c.moves
                    };
                }
                return {
                    ...c,
                    activeAlgIdx: 0,
                    alg: allAlgs[0] || c.alg,
                    algs: allAlgs,
                    moves: allAlgs[0] ? allAlgs[0].split(' ').length : c.moves
                };
            });
            return cases;
        }

        setCaseActiveAlg(caseId, algIndex) {
            this.activeAlgOverrides[caseId] = algIndex;
            this.saveActiveAlgOverrides();
            return this.getCaseById(caseId);
        }

        getCategories() {
            const categories = new Set();
            this.getAllCases().forEach(c => {
                if (c.group) categories.add(c.group);
            });
            return Array.from(categories);
        }

        getMajorCategoryGroups() {
            const allCases = this.getAllCases();
            const groups = {
                'CFOP 全套公式 (SpeedCubeDB)': [],
                'ZBLL 顶层一步法 (SpeedCubeDB)': [],
                '彳亍盲拧公式全套 (Chi-Chu BLD)': [],
                '手法触发器与桥式 (Triggers & Roux)': [],
                '自定义公式 (Custom)': []
            };

            allCases.forEach(c => {
                const g = c.group || '';
                if (g.startsWith('PLL') || g.startsWith('OLL') || g.startsWith('F2L') || g.startsWith('Advanced F2L')) {
                    if (!groups['CFOP 全套公式 (SpeedCubeDB)'].includes(g)) groups['CFOP 全套公式 (SpeedCubeDB)'].push(g);
                } else if (g.startsWith('ZBLL')) {
                    if (!groups['ZBLL 顶层一步法 (SpeedCubeDB)'].includes(g)) groups['ZBLL 顶层一步法 (SpeedCubeDB)'].push(g);
                } else if (g.startsWith('彳亍盲拧')) {
                    if (!groups['彳亍盲拧公式全套 (Chi-Chu BLD)'].includes(g)) groups['彳亍盲拧公式全套 (Chi-Chu BLD)'].push(g);
                } else if (g === 'Custom Cases' || c.isCustom) {
                    if (!groups['自定义公式 (Custom)'].includes(g)) groups['自定义公式 (Custom)'].push(g);
                } else {
                    if (!groups['手法触发器与桥式 (Triggers & Roux)'].includes(g)) groups['手法触发器与桥式 (Triggers & Roux)'].push(g);
                }
            });

            return groups;
        }

        getCasesByCategory(category) {
            if (!category || category === 'ALL') return this.getAllCases();
            if (category === 'CFOP_ALL') {
                return this.getAllCases().filter(c => 
                    c.group.startsWith('PLL') || c.group.startsWith('OLL') || c.group.startsWith('F2L') || c.group.startsWith('Advanced F2L')
                );
            }
            if (category === 'PLL_ALL') {
                return this.getAllCases().filter(c => c.group.startsWith('PLL'));
            }
            if (category === 'OLL_ALL') {
                return this.getAllCases().filter(c => c.group.startsWith('OLL'));
            }
            if (category === 'F2L_ALL') {
                return this.getAllCases().filter(c => c.group.startsWith('F2L') || c.group.startsWith('Advanced F2L'));
            }
            if (category === 'ZBLL_ALL') {
                return this.getAllCases().filter(c => c.group.startsWith('ZBLL'));
            }
            if (category === 'CHICHU_ALL') {
                return this.getAllCases().filter(c => c.group.startsWith('彳亍盲拧'));
            }
            return this.getAllCases().filter(c => c.group === category);
        }

        getCaseById(id) {
            return this.getAllCases().find(c => c.id === id) || null;
        }

        addCustomCase(name, alg, group = "Custom Cases", desc = "") {
            const cleanAlg = cleanAlgString(alg);
            const moves = cleanAlg ? cleanAlg.split(' ').length : 0;
            const newCase = {
                id: 'custom_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
                name: name.trim(),
                group: group.trim() || "Custom Cases",
                alg: cleanAlg,
                algs: [cleanAlg],
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

        compileAlgorithm(algStr) {
            return compileAlgorithmWithRotations(algStr);
        }

        matchSequence(userMoves, targetAlg) {
            if (!targetAlg) return { isComplete: false, progress: 0, nextExpected: null, isMatch: false };
            
            const compiledSteps = compileAlgorithmWithRotations(targetAlg);
            if (compiledSteps.length === 0) {
                return { isComplete: true, progress: 1, totalMoves: 0, nextExpected: null, isMatch: true, matchedCount: 0, targetMoves: [], compiledSteps: [] };
            }

            // Flatten physical target moves while tracking step associations
            const flatPhysicalTarget = [];
            compiledSteps.forEach((step, sIdx) => {
                step.physicalMoves.forEach((pm, subIdx) => {
                    flatPhysicalTarget.push({
                        physicalMove: normalizeMove(pm),
                        stepIdx: sIdx,
                        subIdx: subIdx,
                        displayMove: step.displayMove,
                        isLastSub: subIdx === step.physicalMoves.length - 1
                    });
                });
            });

            const rawPhysicalArray = flatPhysicalTarget.map(p => p.physicalMove);
            const userArray = (userMoves || []).map(normalizeMove);

            if (userArray.length === 0) {
                return {
                    isComplete: false,
                    progress: 0,
                    totalMoves: compiledSteps.length,
                    totalPhysicalMoves: rawPhysicalArray.length,
                    nextExpected: compiledSteps[0].displayMove || rawPhysicalArray[0] || null,
                    nextExpectedPhysical: rawPhysicalArray[0] || null,
                    isMatch: true,
                    matchedCount: 0,
                    matchedPhysicalCount: 0,
                    targetMoves: compiledSteps.map(s => s.displayMove),
                    compiledSteps: compiledSteps
                };
            }

            // Generate 24 rotational orientation variants of the physical target sequence
            const allOrientations = getAlgOrientations(rawPhysicalArray);

            let bestOrientation = rawPhysicalArray;
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

            // Calculate which high-level display step we are on
            let displayMatchedCount = 0;
            if (maxMatched > 0) {
                const lastMatchedItem = flatPhysicalTarget[maxMatched - 1];
                displayMatchedCount = lastMatchedItem ? (lastMatchedItem.isLastSub ? lastMatchedItem.stepIdx + 1 : lastMatchedItem.stepIdx) : 0;
            }

            const isComplete = bestIsMatch && maxMatched === bestOrientation.length;
            const nextExpectedStepIdx = Math.min(displayMatchedCount, compiledSteps.length - 1);
            const nextExpected = (bestIsMatch && !isComplete)
                ? (compiledSteps[nextExpectedStepIdx] ? compiledSteps[nextExpectedStepIdx].displayMove : bestOrientation[maxMatched])
                : (compiledSteps[nextExpectedStepIdx] ? compiledSteps[nextExpectedStepIdx].displayMove : bestOrientation[0]);

            const progress = compiledSteps.length > 0 ? Math.min(1.0, displayMatchedCount / compiledSteps.length) : 0;

            return {
                isComplete,
                isMatch: bestIsMatch,
                progress,
                matchedCount: displayMatchedCount,
                matchedPhysicalCount: maxMatched,
                totalMoves: compiledSteps.length,
                totalPhysicalMoves: bestOrientation.length,
                nextExpected,
                nextExpectedPhysical: (bestIsMatch && maxMatched < bestOrientation.length) ? bestOrientation[maxMatched] : null,
                targetMoves: compiledSteps.map(s => s.displayMove),
                compiledSteps: compiledSteps
            };
        }
    }

    // 24 Orientation mappings for 3x3 cube
    const ROTATION_X = { U: 'F', F: 'D', D: 'B', B: 'U', L: 'L', R: 'R' };
    const ROTATION_Y = { F: 'R', R: 'B', B: 'L', L: 'F', U: 'U', D: 'D' };
    const ROTATION_Z = { U: 'R', R: 'D', D: 'L', L: 'U', F: 'F', B: 'B' };

    const ROTATIONS = {
        x: { U: 'F', F: 'D', D: 'B', B: 'U', L: 'L', R: 'R' },
        "x'": { U: 'B', B: 'D', D: 'F', F: 'U', L: 'L', R: 'R' },
        x2: { U: 'D', D: 'U', F: 'B', B: 'F', L: 'L', R: 'R' },
        y: { F: 'R', R: 'B', B: 'L', L: 'F', U: 'U', D: 'D' },
        "y'": { F: 'L', L: 'B', B: 'R', R: 'F', U: 'U', D: 'D' },
        y2: { F: 'B', B: 'F', L: 'R', R: 'L', U: 'U', D: 'D' },
        z: { U: 'R', R: 'D', D: 'L', L: 'U', F: 'F', B: 'B' },
        "z'": { U: 'L', L: 'U', D: 'R', R: 'D', F: 'F', B: 'B' },
        z2: { U: 'D', D: 'U', L: 'R', R: 'L', F: 'F', B: 'B' }
    };

    const WIDE_MAP = {
        r: { face: 'L', rot: 'x' },
        l: { face: 'R', rot: "x'" },
        u: { face: 'D', rot: 'y' },
        d: { face: 'U', rot: "y'" },
        f: { face: 'B', rot: 'z' },
        b: { face: 'F', rot: "z'" }
    };

    function applyRotation(currentMap, rotKey) {
        const rot = ROTATIONS[rotKey];
        if (!rot) return currentMap;
        const newMap = {};
        for (const perceived in currentMap) {
            newMap[perceived] = currentMap[rot[perceived]];
        }
        return newMap;
    }

    function cleanAlgString(algStr) {
        return (algStr || '')
            .replace(/[\(\)\[\]\{\}]/g, '')
            .replace(/[’‘ʼ‘]/g, "'")
            .replace(/\s+/g, ' ')
            .trim();
    }

    function compileAlgorithmWithRotations(algStr) {
        let currentMap = { U: 'U', D: 'D', L: 'L', R: 'R', F: 'F', B: 'B' };
        const cleaned = cleanAlgString(algStr);
        const rawTokens = cleaned.split(/\s+/).filter(Boolean);
        const steps = [];

        rawTokens.forEach(tok => {
            let base = tok.charAt(0);
            let lower = tok.toLowerCase();

            let isWide = (base >= 'a' && base <= 'z') || lower.startsWith('rw') || lower.startsWith('lw') ||
                         lower.startsWith('uw') || lower.startsWith('dw') ||
                         lower.startsWith('fw') || lower.startsWith('bw');
            
            let suffix = tok.slice(isWide && tok.length > 1 && tok.charAt(1).toLowerCase() === 'w' ? 2 : 1);
            if (suffix === '’' || suffix === '‘') suffix = "'";

            // Slices: M, S, E (passed as native slice moves to engine)
            if (base === 'M' || base === 'm' || base === 'S' || base === 's' || base === 'E' || base === 'e') {
                const normTok = base.toUpperCase() + (suffix || '');
                steps.push({ displayMove: tok, physicalMoves: [normTok] });
                return;
            }

            // Pure rotation: x, y, z
            if (['x', 'y', 'z'].includes(lower.charAt(0)) && !lower.includes('w')) {
                const rotKey = lower.charAt(0) + (suffix || '');
                currentMap = applyRotation(currentMap, rotKey);
                return;
            }

            if (isWide) {
                const wideKey = (lower.startsWith('rw') ? 'r' :
                                lower.startsWith('lw') ? 'l' :
                                lower.startsWith('uw') ? 'u' :
                                lower.startsWith('dw') ? 'd' :
                                lower.startsWith('fw') ? 'f' :
                                lower.startsWith('bw') ? 'b' : lower.charAt(0));
                const wideDef = WIDE_MAP[wideKey];
                if (wideDef) {
                    let rotKey = wideDef.rot;
                    if (suffix === "'") {
                        rotKey = rotKey.endsWith("'") ? rotKey.slice(0, -1) : rotKey + "'";
                    } else if (suffix === '2') {
                        rotKey = rotKey.charAt(0) + '2';
                    }

                    const physFace = currentMap[wideDef.face];
                    const physMove = physFace + (suffix || '');

                    steps.push({
                        displayMove: tok,
                        physicalMoves: [physMove]
                    });

                    currentMap = applyRotation(currentMap, rotKey);
                    return;
                }
            }

            // Standard outer face turn
            const faceUpper = base.toUpperCase();
            const physFace = currentMap[faceUpper] || faceUpper;
            const physMove = physFace + (suffix || '');

            steps.push({
                displayMove: tok,
                physicalMoves: [physMove]
            });
        });

        return steps;
    }

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
        if (m.charAt(1) === "'" || m.charAt(1) === '’' || m.charAt(1) === '‘') return m.charAt(0) + "'";
        return m;
    }

    return new AlgorithmLibrary();
}));
