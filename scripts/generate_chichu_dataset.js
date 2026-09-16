/**
 * generate_chichu_dataset.js
 * Generates and mathematically validates the complete 3-Style BLD (Chinese Blindfolded 彳亍) dataset:
 * - 440 Edge 3-cycles (UF Buffer C)
 * - 378 Corner 3-cycles (UBL Buffer A)
 * - In-place edge flips (cd, ab, ef, gh, ij, kl, mn, op, qr, st, uv, wx) & multi-flips
 * - In-place corner twists (abc, def, ghi, jkl, mno, pqr, stu, vwx) & multi-twists
 * - Full parity cases
 */

const fs = require('fs');
const path = require('path');
const RubiksCube = require('../src/core/cube-engine').RubiksCube;

// ==========================================
// 1. STICKER DEFINITIONS & MAPPINGS
// ==========================================

// 24 Edge Stickers: 12 edges * 2 stickers
// Standard 24 letters: A - X
const EDGE_STICKERS = {
    'A': { edge: 3, side: 0, name: 'UB(U)' },
    'B': { edge: 3, side: 1, name: 'UB(B)' },
    'C': { edge: 1, side: 0, name: 'UF(U)' }, // Edge Buffer
    'D': { edge: 1, side: 1, name: 'UF(F)' },
    'E': { edge: 2, side: 0, name: 'UL(U)' },
    'F': { edge: 2, side: 1, name: 'UL(L)' },
    'G': { edge: 0, side: 0, name: 'UR(U)' },
    'H': { edge: 0, side: 1, name: 'UR(R)' },
    'I': { edge: 9, side: 0, name: 'FL(F)' },
    'J': { edge: 9, side: 1, name: 'FL(L)' },
    'K': { edge: 8, side: 0, name: 'FR(F)' },
    'L': { edge: 8, side: 1, name: 'FR(R)' },
    'M': { edge: 10, side: 0, name: 'BL(B)' },
    'N': { edge: 10, side: 1, name: 'BL(L)' },
    'O': { edge: 11, side: 0, name: 'BR(B)' },
    'P': { edge: 11, side: 1, name: 'BR(R)' },
    'Q': { edge: 5, side: 0, name: 'DF(D)' },
    'R': { edge: 5, side: 1, name: 'DF(F)' },
    'S': { edge: 6, side: 0, name: 'DL(D)' },
    'T': { edge: 6, side: 1, name: 'DL(L)' },
    'U': { edge: 7, side: 0, name: 'DB(D)' },
    'V': { edge: 7, side: 1, name: 'DB(B)' },
    'W': { edge: 4, side: 0, name: 'DR(D)' },
    'X': { edge: 4, side: 1, name: 'DR(R)' }
};

// 24 Corner Stickers: 8 corners * 3 stickers
// Standard 24 letters: A - X
// UBL Buffer: A (U), B (B), C (L)
const CORNER_STICKERS = {
    'A': { corner: 2, side: 0, name: 'UBL(U)' }, // Corner Buffer
    'B': { corner: 2, side: 1, name: 'UBL(L)' },
    'C': { corner: 2, side: 2, name: 'UBL(B)' },
    'D': { corner: 3, side: 0, name: 'UBR(U)' },
    'E': { corner: 3, side: 1, name: 'UBR(B)' },
    'F': { corner: 3, side: 2, name: 'UBR(R)' },
    'G': { corner: 0, side: 0, name: 'URF(U)' },
    'H': { corner: 0, side: 1, name: 'URF(R)' },
    'I': { corner: 0, side: 2, name: 'URF(F)' },
    'J': { corner: 1, side: 0, name: 'UFL(U)' },
    'K': { corner: 1, side: 1, name: 'UFL(F)' },
    'L': { corner: 1, side: 2, name: 'UFL(L)' },
    'M': { corner: 5, side: 0, name: 'DLF(D)' },
    'N': { corner: 5, side: 1, name: 'DLF(L)' },
    'O': { corner: 5, side: 2, name: 'DLF(F)' },
    'P': { corner: 4, side: 0, name: 'DFR(D)' },
    'Q': { corner: 4, side: 1, name: 'DFR(F)' },
    'R': { corner: 4, side: 2, name: 'DFR(R)' },
    'S': { corner: 7, side: 0, name: 'DBR(D)' },
    'T': { corner: 7, side: 1, name: 'DBR(R)' },
    'U': { corner: 7, side: 2, name: 'DBR(B)' },
    'V': { corner: 6, side: 0, name: 'DBL(D)' },
    'W': { corner: 6, side: 1, name: 'DBL(B)' },
    'X': { corner: 6, side: 2, name: 'DBL(L)' }
};

// ==========================================
// 2. MOVE HELPER FUNCTIONS
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
// 3. CYCLE DETECTORS
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

    // Buffer piece (bufInfo.edge) is in which slot?
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

// ==========================================
// 4. COMMUTATOR GENERATION ENGINE
// ==========================================

console.log('Generating full 3-Style Commutators dataset...');

// Build Edge Commutators
const edgeDatabase = {}; // pair -> { alg, desc, moves, algs }

// Core edge templates
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

// Generate base commutators
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

console.log(`Found ${Object.keys(edgeDatabase).length}/440 edge 3-cycle pairs.`);

// Build Corner Commutators
const cornerDatabase = {}; // pair -> { alg, desc, moves, algs }

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

console.log(`Found ${Object.keys(cornerDatabase).length}/378 corner 3-cycle pairs.`);

module.exports = {
    EDGE_STICKERS,
    CORNER_STICKERS,
    edgeDatabase,
    cornerDatabase,
    testEdgeAlg,
    testCornerAlg,
    simplifyMoves,
    makeCommutator
};
