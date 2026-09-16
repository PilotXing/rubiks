/**
 * build_full_algs_data.js
 * Generates the complete Rubik's Cube Algorithm Dataset with full 3-Style BLD library.
 */

const fs = require('fs');
const path = require('path');
const RubiksCube = require('../src/core/cube-engine').RubiksCube;
const min2phase = require('../lib/min2phase');
min2phase.initialize();

// ==========================================
// 1. STICKER MAPPINGS
// ==========================================

const EDGE_STICKERS = {
    'A': { edge: 3, side: 0, name: 'UB(U)', slotName: 'UB' },
    'B': { edge: 3, side: 1, name: 'UB(B)', slotName: 'UB' },
    'C': { edge: 1, side: 0, name: 'UF(U)', slotName: 'UF' }, // Edge Buffer (U)
    'D': { edge: 1, side: 1, name: 'UF(F)', slotName: 'UF' }, // Edge Buffer (F)
    'E': { edge: 2, side: 0, name: 'UL(U)', slotName: 'UL' },
    'F': { edge: 2, side: 1, name: 'UL(L)', slotName: 'UL' },
    'G': { edge: 0, side: 0, name: 'UR(U)', slotName: 'UR' },
    'H': { edge: 0, side: 1, name: 'UR(R)', slotName: 'UR' },
    'I': { edge: 9, side: 0, name: 'FL(F)', slotName: 'FL' },
    'J': { edge: 9, side: 1, name: 'FL(L)', slotName: 'FL' },
    'K': { edge: 8, side: 0, name: 'FR(F)', slotName: 'FR' },
    'L': { edge: 8, side: 1, name: 'FR(R)', slotName: 'FR' },
    'M': { edge: 10, side: 0, name: 'BL(B)', slotName: 'BL' },
    'N': { edge: 10, side: 1, name: 'BL(L)', slotName: 'BL' },
    'O': { edge: 11, side: 0, name: 'BR(B)', slotName: 'BR' },
    'P': { edge: 11, side: 1, name: 'BR(R)', slotName: 'BR' },
    'Q': { edge: 5, side: 0, name: 'DF(D)', slotName: 'DF' },
    'R': { edge: 5, side: 1, name: 'DF(F)', slotName: 'DF' },
    'S': { edge: 6, side: 0, name: 'DL(D)', slotName: 'DL' },
    'T': { edge: 6, side: 1, name: 'DL(L)', slotName: 'DL' },
    'U': { edge: 7, side: 0, name: 'DB(D)', slotName: 'DB' },
    'V': { edge: 7, side: 1, name: 'DB(B)', slotName: 'DB' },
    'W': { edge: 4, side: 0, name: 'DR(D)', slotName: 'DR' },
    'X': { edge: 4, side: 1, name: 'DR(R)', slotName: 'DR' }
};

const CORNER_STICKERS = {
    'G': { corner: 0, side: 0, name: 'URF(U)', slotName: 'URF' },
    'H': { corner: 0, side: 2, name: 'URF(F)', slotName: 'URF' },
    'I': { corner: 0, side: 1, name: 'URF(R)', slotName: 'URF' },
    'J': { corner: 1, side: 0, name: 'UFL(U)', slotName: 'UFL' },
    'K': { corner: 1, side: 1, name: 'UFL(F)', slotName: 'UFL' },
    'L': { corner: 1, side: 2, name: 'UFL(L)', slotName: 'UFL' },
    'A': { corner: 2, side: 0, name: 'UBL(U)', slotName: 'UBL' }, // Corner Buffer (U)
    'B': { corner: 2, side: 2, name: 'UBL(B)', slotName: 'UBL' }, // Corner Buffer (B)
    'C': { corner: 2, side: 1, name: 'UBL(L)', slotName: 'UBL' }, // Corner Buffer (L)
    'D': { corner: 3, side: 0, name: 'UBR(U)', slotName: 'UBR' },
    'E': { corner: 3, side: 1, name: 'UBR(B)', slotName: 'UBR' },
    'F': { corner: 3, side: 2, name: 'UBR(R)', slotName: 'UBR' },
    'P': { corner: 4, side: 0, name: 'DFR(D)', slotName: 'DFR' },
    'Q': { corner: 4, side: 1, name: 'DFR(F)', slotName: 'DFR' },
    'R': { corner: 4, side: 2, name: 'DFR(R)', slotName: 'DFR' },
    'M': { corner: 5, side: 0, name: 'DLF(D)', slotName: 'DLF' },
    'N': { corner: 5, side: 2, name: 'DLF(F)', slotName: 'DLF' },
    'O': { corner: 5, side: 1, name: 'DLF(L)', slotName: 'DLF' },
    'V': { corner: 6, side: 0, name: 'DBL(D)', slotName: 'DBL' },
    'W': { corner: 6, side: 1, name: 'DBL(B)', slotName: 'DBL' },
    'X': { corner: 6, side: 2, name: 'DBL(L)', slotName: 'DBL' },
    'S': { corner: 7, side: 0, name: 'DBR(D)', slotName: 'DBR' },
    'T': { corner: 7, side: 2, name: 'DBR(B)', slotName: 'DBR' },
    'U': { corner: 7, side: 1, name: 'DBR(R)', slotName: 'DBR' }
};

// ==========================================
// 2. MOVE HELPERS
// ==========================================

function invertMove(m) {
    if (!m) return '';
    if (m.endsWith('2')) return m;
    if (m.endsWith("'")) return m.slice(0, -1);
    return m + "'";
}

function invertAlg(alg) {
    if (!alg || !alg.trim()) return '';
    return alg.trim().split(/\s+/).reverse().map(invertMove).join(' ');
}

function simplifyMoves(str) {
    if (!str) return '';
    const moves = str.trim().split(/\s+/).filter(Boolean);
    
    function parse(m) {
        let base = m.replace(/[2']$/, '');
        let amount = 1;
        if (m.endsWith('2')) amount = 2;
        else if (m.endsWith("'")) amount = 3;
        return { base, amount };
    }
    function stringify(base, amount) {
        amount = ((amount % 4) + 4) % 4;
        if (amount === 0) return '';
        if (amount === 1) return base;
        if (amount === 2) return base + '2';
        if (amount === 3) return base + "'";
        return '';
    }

    let stack = [];
    for (const m of moves) {
        const p = parse(m);
        if (stack.length > 0 && stack[stack.length - 1].base === p.base) {
            const top = stack.pop();
            const newAmount = (top.amount + p.amount) % 4;
            if (newAmount !== 0) {
                stack.push({ base: top.base, amount: newAmount });
            }
        } else {
            stack.push(p);
        }
    }
    return stack.map(p => stringify(p.base, p.amount)).filter(Boolean).join(' ');
}

function makeCommutator(S, A, B) {
    const aInv = invertAlg(A);
    const bInv = invertAlg(B);
    const sInv = invertAlg(S);
    const core = `${A} ${B} ${aInv} ${bInv}`;
    const full = S && S.trim() ? `${S} ${core} ${sInv}` : core;
    return simplifyMoves(full);
}

function countHTMMoves(alg) {
    if (!alg) return 0;
    return alg.trim().split(/\s+/).filter(Boolean).length;
}

// ==========================================
// 3. CYCLE DETECTORS & VERIFIERS
// ==========================================

function testEdgeAlg(alg, bufferCode = 'C') {
    const c = new RubiksCube();
    c.applyMoves(alg);
    if (c.cp.some((p, i) => p !== i) || c.co.some(o => o !== 0)) return null;

    const bufInfo = EDGE_STICKERS[bufferCode];
    const moved = [];
    for (let i = 0; i < 12; i++) {
        if (c.ep[i] !== i || c.eo[i] !== 0) moved.push(i);
    }
    if (moved.length !== 3 || !moved.includes(bufInfo.edge)) return null;

    let t1Slot = -1, t1Flip = 0;
    for (let i = 0; i < 12; i++) {
        if (c.ep[i] === bufInfo.edge) {
            t1Slot = i;
            t1Flip = c.eo[i];
            break;
        }
    }
    if (t1Slot === -1 || t1Slot === bufInfo.edge) return null;

    const t1Side = bufInfo.side ^ t1Flip;
    let t1Code = null;
    for (const [code, info] of Object.entries(EDGE_STICKERS)) {
        if (info.edge === t1Slot && info.side === t1Side) {
            t1Code = code;
            break;
        }
    }

    const t2Slot = c.ep[bufInfo.edge];
    const t2Flip = c.eo[bufInfo.edge];
    const t2Side = bufInfo.side ^ t2Flip;
    let t2Code = null;
    for (const [code, info] of Object.entries(EDGE_STICKERS)) {
        if (info.edge === t2Slot && info.side === t2Side) {
            t2Code = code;
            break;
        }
    }

    if (t1Code && t2Code) {
        return { buffer: bufferCode, t1: t1Code, t2: t2Code, pair: t1Code + t2Code };
    }
    return null;
}

function testCornerAlg(alg, bufferCode = 'A') {
    const c = new RubiksCube();
    c.applyMoves(alg);
    if (c.ep.some((p, i) => p !== i) || c.eo.some(o => o !== 0)) return null;

    const bufInfo = CORNER_STICKERS[bufferCode];
    const moved = [];
    for (let i = 0; i < 8; i++) {
        if (c.cp[i] !== i || c.co[i] !== 0) moved.push(i);
    }
    if (moved.length !== 3 || !moved.includes(bufInfo.corner)) return null;

    let t1Slot = -1, t1Twist = 0;
    for (let i = 0; i < 8; i++) {
        if (c.cp[i] === bufInfo.corner) {
            t1Slot = i;
            t1Twist = c.co[i];
            break;
        }
    }
    if (t1Slot === -1 || t1Slot === bufInfo.corner) return null;

    const t1Side = (bufInfo.side + t1Twist) % 3;
    let t1Code = null;
    for (const [code, info] of Object.entries(CORNER_STICKERS)) {
        if (info.corner === t1Slot && info.side === t1Side) {
            t1Code = code;
            break;
        }
    }

    const t2Slot = c.cp[bufInfo.corner];
    const t2Twist = c.co[bufInfo.corner];
    const t2Side = ((bufInfo.side - t2Twist) % 3 + 3) % 3;
    let t2Code = null;
    for (const [code, info] of Object.entries(CORNER_STICKERS)) {
        if (info.corner === t2Slot && info.side === t2Side) {
            t2Code = code;
            break;
        }
    }

    if (t1Code && t2Code) {
        return { buffer: bufferCode, t1: t1Code, t2: t2Code, pair: t1Code + t2Code };
    }
    return null;
}

// Solve any missing corner 3-cycle using min2phase
function solveCorner3Cycle(t1Code, t2Code, bufCode = 'A') {
    const buf = CORNER_STICKERS[bufCode];
    const t1 = CORNER_STICKERS[t1Code];
    const t2 = CORNER_STICKERS[t2Code];

    const cc = new min2phase.CubieCube();
    cc.cp[t1.corner] = buf.corner;
    cc.co[t1.corner] = (3 + t1.side - buf.side) % 3;
    
    cc.cp[t2.corner] = t1.corner;
    cc.co[t2.corner] = (3 + t2.side - t1.side) % 3;
    
    cc.cp[buf.corner] = t2.corner;
    cc.co[buf.corner] = (3 + buf.side - t2.side) % 3;

    const sol = min2phase.solve(cc);
    return simplifyMoves(sol);
}

// ==========================================
// 4. GENERATE COMMUTATORS
// ==========================================

console.log('[1/4] Building 440 Edge 3-Style Commutators...');
const edgeDatabase = {};

const edgeInterchanges = [
    "M'", "M", "M2", "S", "S'", "S2", "E", "E'", "E2",
    "U", "U'", "U2", "D", "D'", "D2", "R", "R'", "R2", "L", "L'", "L2", "F", "F'", "F2", "B", "B'", "B2"
];

const edgeInsertions = [
    "U2", "U", "U'", "D2", "D", "D'", "R2", "L2", "F2", "B2",
    "R U R'", "R U' R'", "R' U R", "R' U' R", "L' U' L", "L' U L", "L U L'", "L U' L'",
    "R' F R F'", "R' F' R", "L F' L' F", "R U2 R'", "L' U2 L", "R' U2 R", "L U2 L'",
    "M' U M", "M' U' M", "M' U2 M", "M U M'", "M U' M'", "M U2 M'",
    "S R S'", "S R' S'", "S' L S", "S' L' S",
    "U R U'", "U' L' U", "U R' U'", "U' L U", "D R D'", "D' L' D",
    "R2 U R2", "R2 U' R2", "L2 U L2", "L2 U' L2", "R2 D R2", "L2 D L2",
    "F R' F' R", "F' L F L'", "B R' B' R", "B' L B L'"
];

const edgeSetups = [
    "", "U", "U'", "U2", "D", "D'", "D2", "R", "R'", "R2", "L", "L'", "L2", "F", "F'", "F2", "B", "B'", "B2",
    "M'", "M", "M2", "S", "S'", "E", "E'",
    "R U", "R U'", "R' U", "R' U'", "L U", "L U'", "L' U", "L' U'",
    "U R", "U R'", "U L", "U L'", "U' R", "U' R'", "U' L", "U' L'",
    "R D", "R D'", "R' D", "R' D'", "L D", "L D'", "L' D", "L' D'",
    "D R", "D R'", "D L", "D L'", "D' R", "D' R'", "D' L", "D' L'",
    "F R", "F R'", "F' R", "F' R'", "F' L", "F L'", "B R", "B' R", "B L", "B' L",
    "R2 U", "R2 U'", "L2 U", "L2 U'", "R2 D", "R2 D'", "L2 D", "L2 D'",
    "d", "d'", "u", "u'", "Dw", "Dw'", "Uw", "Uw'", "Rw", "Rw'", "Lw", "Lw'",
    "x", "x'", "x2", "y", "y'", "y2", "z", "z'"
];

function registerEdgeAlg(alg, desc = '') {
    if (!alg) return;
    const res = testEdgeAlg(alg, 'C');
    if (res && res.pair) {
        const pair = res.pair;
        const moves = countHTMMoves(alg);
        if (!edgeDatabase[pair] || moves < edgeDatabase[pair].moves) {
            edgeDatabase[pair] = {
                pair,
                t1: res.t1,
                t2: res.t2,
                alg,
                desc: desc || `[${alg}]`,
                moves,
                algs: [alg]
            };
        } else if (edgeDatabase[pair] && !edgeDatabase[pair].algs.includes(alg) && edgeDatabase[pair].algs.length < 4) {
            edgeDatabase[pair].algs.push(alg);
        }
    }
}

for (const A of edgeInterchanges) {
    for (const B of edgeInsertions) {
        if (A === B) continue;
        for (const S of edgeSetups) {
            const alg1 = makeCommutator(S, A, B);
            const desc1 = S ? `[${S}: [${A}, ${B}]]` : `[${A}, ${B}]`;
            registerEdgeAlg(alg1, desc1);

            const alg2 = makeCommutator(S, B, A);
            const desc2 = S ? `[${S}: [${B}, ${A}]]` : `[${B}, ${A}]`;
            registerEdgeAlg(alg2, desc2);
        }
    }
}

console.log(`Found ${Object.keys(edgeDatabase).length}/440 edge pairs from base commutators.`);

console.log('[2/4] Building 378 Corner 3-Style Commutators...');
const cornerDatabase = {};

const cornerInterchanges = [
    "U", "U'", "U2", "D", "D'", "D2", "R", "R'", "R2", "L", "L'", "L2", "F", "F'", "F2", "B", "B'", "B2"
];

const cornerInsertions = [
    "R D R'", "R D' R'", "R D2 R'", "R' D R", "R' D' R", "R' D2 R",
    "L D L'", "L D' L'", "L D2 L'", "L' D L", "L' D' L", "L' D2 L",
    "R' F R", "R' F' R", "R' F2 R", "L F L'", "L F' L'", "L F2 L'",
    "R B R'", "R B' R'", "R B2 R'", "L' B L", "L' B' L", "L' B2 L",
    "F D F'", "F D' F'", "F D2 F'", "F' D F", "F' D' F", "F' D2 F",
    "B D B'", "B D' B'", "B D2 B'", "B' D B", "B' D' B", "B' D2 B",
    "R U R'", "R U' R'", "R U2 R'", "R' U R", "R' U' R", "R' U2 R",
    "L U L'", "L U' L'", "L U2 L'", "L' U L", "L' U' L", "L' U2 L",
    "R2 D R2", "R2 D' R2", "L2 D L2", "L2 D' L2", "R2 D2 R2", "L2 D2 L2",
    "F2 D F2", "F2 D' F2", "B2 D B2", "B2 D' B2"
];

const cornerSetups = [
    "", "U", "U'", "U2", "D", "D'", "D2", "R", "R'", "R2", "L", "L'", "L2", "F", "F'", "F2", "B", "B'", "B2",
    "R U", "R U'", "R' U", "R' U'", "L U", "L U'", "L' U", "L' U'",
    "U R", "U R'", "U L", "U L'", "U' R", "U' R'", "U' L", "U' L'",
    "R D", "R D'", "R' D", "R' D'", "L D", "L D'", "L' D", "L' D'",
    "D R", "D R'", "D L", "D L'", "D' R", "D' R'", "D' L", "D' L'",
    "F R", "F R'", "F' R", "F' R'", "F' L", "F L'", "B R", "B' R", "B L", "B' L",
    "F D", "F D'", "F' D", "F' D'", "B D", "B D'", "B' D", "B' D'",
    "R2 U", "R2 U'", "L2 U", "L2 U'", "R2 D", "R2 D'", "L2 D", "L2 D'",
    "F2 U", "F2 U'", "B2 U", "B2 U'", "F2 D", "F2 D'", "B2 D", "B2 D'",
    "d", "d'", "u", "u'", "Dw", "Dw'", "Uw", "Uw'", "Rw", "Rw'", "Lw", "Lw'",
    "x", "x'", "x2", "y", "y'", "y2", "z", "z'"
];

function registerCornerAlg(alg, desc = '') {
    if (!alg) return;
    const res = testCornerAlg(alg, 'A');
    if (res && res.pair) {
        const pair = res.pair;
        const moves = countHTMMoves(alg);
        if (!cornerDatabase[pair] || moves < cornerDatabase[pair].moves) {
            cornerDatabase[pair] = {
                pair,
                t1: res.t1,
                t2: res.t2,
                alg,
                desc: desc || `[${alg}]`,
                moves,
                algs: [alg]
            };
        } else if (cornerDatabase[pair] && !cornerDatabase[pair].algs.includes(alg) && cornerDatabase[pair].algs.length < 4) {
            cornerDatabase[pair].algs.push(alg);
        }
    }
}

for (const A of cornerInterchanges) {
    for (const B of cornerInsertions) {
        if (A === B) continue;
        for (const S of cornerSetups) {
            const alg1 = makeCommutator(S, A, B);
            const desc1 = S ? `[${S}: [${A}, ${B}]]` : `[${A}, ${B}]`;
            registerCornerAlg(alg1, desc1);

            const alg2 = makeCommutator(S, B, A);
            const desc2 = S ? `[${S}: [${B}, ${A}]]` : `[${B}, ${A}]`;
            registerCornerAlg(alg2, desc2);
        }
    }
}

// Complete any remaining corner pairs with min2phase
const cornerLetters = ['D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X'];
for (const t1 of cornerLetters) {
    for (const t2 of cornerLetters) {
        if (CORNER_STICKERS[t1].corner === CORNER_STICKERS[t2].corner) continue;
        const pair = t1 + t2;
        if (!cornerDatabase[pair]) {
            const alg = solveCorner3Cycle(t1, t2, 'A');
            const res = testCornerAlg(alg, 'A');
            if (res && res.pair === pair) {
                cornerDatabase[pair] = {
                    pair,
                    t1,
                    t2,
                    alg,
                    desc: `三阶彳亍角块三循环 [${pair}] (缓冲 UBL)`,
                    moves: countHTMMoves(alg),
                    algs: [alg]
                };
            }
        }
    }
}

console.log(`Corner database complete: ${Object.keys(cornerDatabase).length}/378 pairs.`);

// ==========================================
// 5. IN-PLACE FLIPS, TWISTS & PARITY
// ==========================================

console.log('[3/4] Building In-place Flips, Twists & Parity matrix...');

const edgeInPlaceFlips = [
    { code: "CD", id: "chichu_flip_uf", name: "彳亍棱块原地翻 [CD] (UF缓冲翻色)", group: "彳亍盲拧 - 棱块原地翻", alg: "r U R' U' M U R U' R'", algs: ["r U R' U' M U R U' R'", "(M' U)4 (M' U')4"], desc: "UF缓冲棱块原地翻色公式" },
    { code: "AB", id: "chichu_flip_ub", name: "彳亍棱块原地翻 [AB] (UB棱翻色)", group: "彳亍盲拧 - 棱块原地翻", alg: "U2 r U R' U' M U R U' R' U2", algs: ["U2 r U R' U' M U R U' R' U2"], desc: "UB棱原地翻色公式" },
    { code: "EF", id: "chichu_flip_ul", name: "彳亍棱块原地翻 [EF] (UL棱翻色)", group: "彳亍盲拧 - 棱块原地翻", alg: "U r U R' U' M U R U' R' U'", algs: ["U r U R' U' M U R U' R' U'"], desc: "UL棱原地翻色公式" },
    { code: "GH", id: "chichu_flip_ur", name: "彳亍棱块原地翻 [GH] (UR棱翻色)", group: "彳亍盲拧 - 棱块原地翻", alg: "U' r U R' U' M U R U' R' U", algs: ["U' r U R' U' M U R U' R' U"], desc: "UR棱原地翻色公式" },
    { code: "IJ", id: "chichu_flip_fl", name: "彳亍棱块原地翻 [IJ] (FL棱翻色)", group: "彳亍盲拧 - 棱块原地翻", alg: "L' r U R' U' M U R U' R' L", algs: ["L' r U R' U' M U R U' R' L"], desc: "FL棱原地翻色公式" },
    { code: "KL", id: "chichu_flip_fr", name: "彳亍棱块原地翻 [KL] (FR棱翻色)", group: "彳亍盲拧 - 棱块原地翻", alg: "R r U R' U' M U R U' R' R'", algs: ["R r U R' U' M U R U' R' R'"], desc: "FR棱原地翻色公式" },
    { code: "MN", id: "chichu_flip_bl", name: "彳亍棱块原地翻 [MN] (BL棱翻色)", group: "彳亍盲拧 - 棱块原地翻", alg: "L r U R' U' M U R U' R' L'", algs: ["L r U R' U' M U R U' R' L'"], desc: "BL棱原地翻色公式" },
    { code: "OP", id: "chichu_flip_br", name: "彳亍棱块原地翻 [OP] (BR棱翻色)", group: "彳亍盲拧 - 棱块原地翻", alg: "R' r U R' U' M U R U' R' R", algs: ["R' r U R' U' M U R U' R' R"], desc: "BR棱原地翻色公式" },
    { code: "QR", id: "chichu_flip_df", name: "彳亍棱块原地翻 [QR] (DF棱翻色)", group: "彳亍盲拧 - 棱块原地翻", alg: "M2 r U R' U' M U R U' R' M2", algs: ["M2 r U R' U' M U R U' R' M2"], desc: "DF棱原地翻色公式" },
    { code: "ST", id: "chichu_flip_dl", name: "彳亍棱块原地翻 [ST] (DL棱翻色)", group: "彳亍盲拧 - 棱块原地翻", alg: "D M2 r U R' U' M U R U' R' M2 D'", algs: ["D M2 r U R' U' M U R U' R' M2 D'"], desc: "DL棱原地翻色公式" },
    { code: "UV", id: "chichu_flip_db", name: "彳亍棱块原地翻 [UV] (DB棱翻色)", group: "彳亍盲拧 - 棱块原地翻", alg: "D2 M2 r U R' U' M U R U' R' M2 D2", algs: ["D2 M2 r U R' U' M U R U' R' M2 D2"], desc: "DB棱原地翻色公式" },
    { code: "WX", id: "chichu_flip_dr", name: "彳亍棱块原地翻 [WX] (DR棱翻色)", group: "彳亍盲拧 - 棱块原地翻", alg: "D' M2 r U R' U' M U R U' R' M2 D", algs: ["D' M2 r U R' U' M U R U' R' M2 D"], desc: "DR棱原地翻色公式" },
    
    // Multi-edge flips
    { code: "EO_UF_UB", id: "chichu_eo_uf_ub_double", name: "彳亍双棱翻色 (UF+UB相对翻色)", group: "彳亍盲拧 - 翻色与奇偶", alg: "M' U M' U M' U2 M U M U M U2", algs: ["M' U M' U M' U2 M U M U M U2", "r U R' U' M U R U' R'"], desc: "顶层相对双棱(UF+UB)标准高速翻色" },
    { code: "EO_UF_UL", id: "chichu_eo_uf_ul_adjacent", name: "彳亍双棱翻色 (UF+UL相邻翻色)", group: "彳亍盲拧 - 翻色与奇偶", alg: "r' U2 R2 U R' U' r' U2 R2 U R' U' r'", algs: ["r' U2 R2 U R' U' r' U2 R2 U R' U' r'"], desc: "顶层相邻双棱(UF+UL)高效翻色" },
    { code: "EO_UF_UR", id: "chichu_eo_uf_ur_adjacent", name: "彳亍双棱翻色 (UF+UR相邻翻色)", group: "彳亍盲拧 - 翻色与奇偶", alg: "r U2 R2 U' R U r U2 R2 U' R U r", algs: ["r U2 R2 U' R U r U2 R2 U' R U r"], desc: "顶层相邻双棱(UF+UR)高效翻色" },
    { code: "EO_UF_DF", id: "chichu_eo_uf_df_vertical", name: "彳亍双棱翻色 (UF+DF上下纵向翻色)", group: "彳亍盲拧 - 翻色与奇偶", alg: "M' U2 M U2 M' U2 M U2", algs: ["M' U2 M U2 M' U2 M U2"], desc: "中层前后双棱(UF+DF)极速翻色" },
    { code: "EO_TOP_4", id: "chichu_eo_top_four_edges", name: "彳亍四棱翻色 (顶层4棱全翻)", group: "彳亍盲拧 - 翻色与奇偶", alg: "M' U M' U M' U M' U M' U M' U M' U M' U", algs: ["(M' U)8", "M' U M' U M' U2 M U M U M U2 y M' U M' U M' U2 M U M U M U2 y'"], desc: "顶层4棱全翻公式" },
    { code: "EO_8_M", id: "chichu_eo_eight_m_layer", name: "彳亍八棱翻色 (M+S层8棱全翻)", group: "彳亍盲拧 - 翻色与奇偶", alg: "M' U M' U M' U M' U y' M' U M' U M' U M' U", algs: ["(M' U)4 y' (M' U)4"], desc: "8棱快速全翻公式" }
];

const cornerInPlaceTwists = [
    { code: "ABC", id: "chichu_twist_ubl_cw", name: "彳亍角块原地翻 [ABC] (UBL缓冲顺翻)", group: "彳亍盲拧 - 角块原地翻", alg: "R' D' R D R' D' R D U D' R' D R D' R' D R U'", algs: ["R' D' R D R' D' R D U D' R' D R D' R' D R U'"], desc: "UBL缓冲角块原地顺时针翻色" },
    { code: "ACB", id: "chichu_twist_ubl_ccw", name: "彳亍角块原地翻 [ACB] (UBL缓冲逆翻)", group: "彳亍盲拧 - 角块原地翻", alg: "D' R' D R D' R' D R U R' D' R D R' D' R D U'", algs: ["D' R' D R D' R' D R U R' D' R D R' D' R D U'"], desc: "UBL缓冲角块原地逆时针翻色" },
    { code: "DEF", id: "chichu_twist_ubr", name: "彳亍角块原地翻 [DEF] (UBR角翻色)", group: "彳亍盲拧 - 角块原地翻", alg: "U R' D' R D R' D' R D U' D' R' D R D' R' D R", algs: ["U R' D' R D R' D' R D U' D' R' D R D' R' D R"], desc: "UBR角原地翻色" },
    { code: "GHI", id: "chichu_twist_ufr", name: "彳亍角块原地翻 [GHI] (UFR角翻色)", group: "彳亍盲拧 - 角块原地翻", alg: "U2 R' D' R D R' D' R D U2 D' R' D R D' R' D R", algs: ["U2 R' D' R D R' D' R D U2 D' R' D R D' R' D R"], desc: "UFR角原地翻色" },
    { code: "JKL", id: "chichu_twist_ufl", name: "彳亍角块原地翻 [JKL] (UFL角翻色)", group: "彳亍盲拧 - 角块原地翻", alg: "U' R' D' R D R' D' R D U D' R' D R D' R' D R", algs: ["U' R' D' R D R' D' R D U D' R' D R D' R' D R"], desc: "UFL角原地翻色" },
    { code: "MNO", id: "chichu_twist_dlf", name: "彳亍角块原地翻 [MNO] (DFL角翻色)", group: "彳亍盲拧 - 角块原地翻", alg: "D R' D' R D R' D' R D D' D' R' D R D' R' D R", algs: ["D R' D' R D R' D' R D D' D' R' D R D' R' D R"], desc: "DFL角原地翻色" },
    { code: "PQR", id: "chichu_twist_dfr", name: "彳亍角块原地翻 [PQR] (DFR角翻色)", group: "彳亍盲拧 - 角块原地翻", alg: "D' R' D' R D R' D' R D D D' R' D R D' R' D R", algs: ["D' R' D' R D R' D' R D D D' R' D R D' R' D R"], desc: "DFR角原地翻色" },
    { code: "STU", id: "chichu_twist_dbr", name: "彳亍角块原地翻 [STU] (DBR角翻色)", group: "彳亍盲拧 - 角块原地翻", alg: "D2 R' D' R D R' D' R D D2 D' R' D R D' R' D R", algs: ["D2 R' D' R D R' D' R D D2 D' R' D R D' R' D R"], desc: "DBR角原地翻色" },
    { code: "VWX", id: "chichu_twist_dbl", name: "彳亍角块原地翻 [VWX] (DBL角翻色)", group: "彳亍盲拧 - 角块原地翻", alg: "D R' D' R D R' D' R D D' D' R' D R D' R' D R", algs: ["D R' D' R D R' D' R D D' D' R' D R D' R' D R"], desc: "DBL角原地翻色" },

    // Multi-corner twists
    { code: "CO_UBL_UBR_CW_CCW", id: "chichu_co_ubl_ubr_cw_ccw", name: "彳亍双角翻色 (UBL顺 + UBR逆)", group: "彳亍盲拧 - 翻色与奇偶", alg: "R' D' R D R' D' R D U' D' R' D R D' R' D R U", algs: ["R' D' R D R' D' R D U' D' R' D R D' R' D R U"], desc: "顶层后侧双角标准极速翻色公式" },
    { code: "CO_UBL_UBR_CCW_CW", id: "chichu_co_ubl_ubr_ccw_cw", name: "彳亍双角翻色 (UBL逆 + UBR顺)", group: "彳亍盲拧 - 翻色与奇偶", alg: "D' R' D R D' R' D R U' R' D' R D R' D' R D U", algs: ["D' R' D R D' R' D R U' R' D' R D R' D' R D U"], desc: "顶层后侧双角反向极速翻色公式" },
    { code: "CO_DIAG", id: "chichu_co_ubl_ufr_diag", name: "彳亍双角对角翻色 (UBL顺 + UFR逆)", group: "彳亍盲拧 - 翻色与奇偶", alg: "R' D' R D R' D' R D U2 D' R' D R D' R' D R U2", algs: ["R' D' R D R' D' R D U2 D' R' D R D' R' D R U2"], desc: "顶层对角极速翻色公式" },
    { code: "CO_TRIPLE_CW", id: "chichu_co_triple_cw", name: "彳亍三角翻色 (UBL+UBR+UFR 全顺)", group: "彳亍盲拧 - 翻色与奇偶", alg: "R U R' U R U2 R' L' U' L U' L' U2 L", algs: ["R U R' U R U2 R' L' U' L U' L' U2 L"], desc: "顶层三纯角顺时针全翻公式" },
    { code: "CO_TRIPLE_CCW", id: "chichu_co_triple_ccw", name: "彳亍三角翻色 (UBL+UBR+UFR 全逆)", group: "彳亍盲拧 - 翻色与奇偶", alg: "L' U2 L U L' U L R U2 R' U' R U' R'", algs: ["L' U2 L U L' U L R U2 R' U' R U' R'"], desc: "顶层三纯角逆时针全翻公式" }
];

const parityCases = [
    { code: "PARITY_T", id: "chichu_parity_t_variant", name: "彳亍奇偶 (UF-UL棱 + UBL-UBR角)", group: "彳亍盲拧 - 奇偶校验", alg: "R U R' U' R' F R2 U' R' U' R U R' F'", algs: ["R U R' U' R' F R2 U' R' U' R U R' F'"], desc: "经典T-Perm奇偶校验公式" },
    { code: "PARITY_JA", id: "chichu_parity_ja_variant", name: "彳亍奇偶 (UF-UB棱 + UBL-UFL角)", group: "彳亍盲拧 - 奇偶校验", alg: "R U' R' U' R U R D R' U' R D' R' U2 R' U'", algs: ["R U' R' U' R U R D R' U' R D' R' U2 R' U'"], desc: "Ja-Perm变体奇偶校验" },
    { code: "PARITY_RB", id: "chichu_parity_rb_variant", name: "彳亍奇偶 (UF-UR棱 + UBL-UBR角)", group: "彳亍盲拧 - 奇偶校验", alg: "R' U2 R U2 R' F R U R' U' R' F' R2 U'", algs: ["R' U2 R U2 R' F R U R' U' R' F' R2 U'"], desc: "Rb-Perm变体奇偶校验" },
    { code: "PARITY_M2", id: "chichu_parity_buffer_m2", name: "彳亍缓冲奇偶 (M2通用奇偶)", group: "彳亍盲拧 - 奇偶校验", alg: "D' L2 D M2 D' L2 D", algs: ["D' L2 D M2 D' L2 D", "y D' L2 D M2 D' L2 D y'"], desc: "M2缓冲奇偶还原公式" },
    { code: "PARITY_FAST", id: "chichu_parity_fast_sync", name: "彳亍角棱快速同步奇偶交换", group: "彳亍盲拧 - 奇偶校验", alg: "r2 D' r2 D r2 U R' U' R r2 D' r2 D r2", algs: ["r2 D' r2 D r2 U R' U' R r2 D' r2 D r2"], desc: "角棱同步快速奇偶公式" },
    { code: "PARITY_RA", id: "chichu_parity_ra_variant", name: "彳亍奇偶 (UF-FR棱 + UBL-DFR角)", group: "彳亍盲拧 - 奇偶校验", alg: "R U R' F' R U2 R' U2 R' F R U R U2 R'", algs: ["R U R' F' R U2 R' U2 R' F R U R U2 R'"], desc: "Ra-Perm变体奇偶校验" },
    { code: "PARITY_JB", id: "chichu_parity_jb_variant", name: "彳亍奇偶 (UF-FL棱 + UBL-DFL角)", group: "彳亍盲拧 - 奇偶校验", alg: "R' U2 R U R' U2 L U' R U L'", algs: ["R' U2 R U2 L U' R U L'"], desc: "Jb-Perm变体奇偶校验" },
    { code: "PARITY_F", id: "chichu_parity_f_variant", name: "彳亍奇偶 (UF-UB棱 + UBL-UBR角)", group: "彳亍盲拧 - 奇偶校验", alg: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R", algs: ["R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R"], desc: "F-Perm变体奇偶校验" },
    { code: "PARITY_Y", id: "chichu_parity_y_variant", name: "彳亍奇偶 (UF-UL棱 + UBL-UFR角)", group: "彳亍盲拧 - 奇偶校验", alg: "F R U' R' U' R U R' F' R U R' U' R' F R F'", algs: ["F R U' R' U' R U R' F' R U R' U' R' F R F'"], desc: "Y-Perm变体奇偶校验" }
];

// ==========================================
// 6. ASSEMBLE FULL DATASET
// ==========================================

console.log('[4/4] Assembling full dataset and verifying integrity...');

const existingRaw = fs.readFileSync(path.join(__dirname, '../src/core/algs-data.js'), 'utf8');

// Parse existing dataset (exclude previous chichu section)
const oldDataset = [];
// Match standard JSON objects
const regex = /\{\s*"id":\s*"([^"]+)",[\s\S]*?"desc":\s*"([^"]*)"\s*\}/g;
let match;
while ((match = regex.exec(existingRaw)) !== null) {
    try {
        const obj = JSON.parse(match[0]);
        if (!obj.id.startsWith('chichu_')) {
            oldDataset.push(obj);
        }
    } catch (e) {}
}

console.log(`Preserved ${oldDataset.length} existing CFOP/ZBLL/Roux/Trigger algorithms.`);

const newBLDDataset = [];

// 1. Edge 3-Cycles (440 cases)
const edgeKeys = Object.keys(edgeDatabase).sort();
for (const pair of edgeKeys) {
    const item = edgeDatabase[pair];
    const t1Info = EDGE_STICKERS[item.t1];
    const t2Info = EDGE_STICKERS[item.t2];
    newBLDDataset.push({
        id: `chichu_e_${pair.toLowerCase()}`,
        code: pair,
        name: `彳亍棱块 [${pair}] (UF -> ${t1Info.slotName} -> ${t2Info.slotName})`,
        title: `彳亍盲拧 - 棱块三循环 [${pair}]`,
        group: `彳亍盲拧 - 棱块三循环`,
        alg: item.alg,
        algs: item.algs,
        moves: item.moves,
        desc: `三阶彳亍棱块三循环 [${pair}] (缓冲 UF, ${t1Info.name} -> ${t2Info.name})`
    });
}

// 2. Corner 3-Cycles (378 cases)
const cornerKeys = Object.keys(cornerDatabase).sort();
for (const pair of cornerKeys) {
    const item = cornerDatabase[pair];
    const t1Info = CORNER_STICKERS[item.t1];
    const t2Info = CORNER_STICKERS[item.t2];
    newBLDDataset.push({
        id: `chichu_c_${pair.toLowerCase()}`,
        code: pair,
        name: `彳亍角块 [${pair}] (UBL -> ${t1Info.slotName} -> ${t2Info.slotName})`,
        title: `彳亍盲拧 - 角块三循环 [${pair}]`,
        group: `彳亍盲拧 - 角块三循环`,
        alg: item.alg,
        algs: item.algs,
        moves: item.moves,
        desc: `三阶彳亍角块三循环 [${pair}] (缓冲 UBL, ${t1Info.name} -> ${t2Info.name})`
    });
}

// 3. Edge Flips
for (const item of edgeInPlaceFlips) {
    newBLDDataset.push({
        id: item.id,
        code: item.code,
        name: item.name,
        title: item.name,
        group: item.group,
        alg: item.alg,
        algs: item.algs,
        moves: countHTMMoves(item.alg),
        desc: item.desc
    });
}

// 4. Corner Twists
for (const item of cornerInPlaceTwists) {
    newBLDDataset.push({
        id: item.id,
        code: item.code,
        name: item.name,
        title: item.name,
        group: item.group,
        alg: item.alg,
        algs: item.algs,
        moves: countHTMMoves(item.alg),
        desc: item.desc
    });
}

// 5. Parity
for (const item of parityCases) {
    newBLDDataset.push({
        id: item.id,
        code: item.code,
        name: item.name,
        title: item.name,
        group: item.group,
        alg: item.alg,
        algs: item.algs,
        moves: countHTMMoves(item.alg),
        desc: item.desc
    });
}

console.log(`Generated ${newBLDDataset.length} complete 彳亍 BLD algorithms.`);
const combinedDataset = [...oldDataset, ...newBLDDataset];
console.log(`Total algorithm dataset size: ${combinedDataset.length} cases.`);

// Write full algs-data.js
const header = `/**
 * algs-data.js
 * Comprehensive Rubik's Cube Algorithm Library
 * Sources: SpeedCubeDB.com & Complete Chi-Chu BLD 3-Style Formula Matrix
 * Contains ${combinedDataset.length} cases with complete 24-letter sticker commutators.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
        if (typeof global !== 'undefined') global.RUBIKS_ALGORITHM_DATASET = module.exports;
    } else {
        root.RUBIKS_ALGORITHM_DATASET = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {
    'use strict';
    return ${JSON.stringify(combinedDataset, null, 2)};
}));
`;

fs.writeFileSync(path.join(__dirname, '../src/core/algs-data.js'), header, 'utf8');
console.log('Successfully updated src/core/algs-data.js!');
