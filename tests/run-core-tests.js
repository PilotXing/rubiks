/**
 * tests/run-core-tests.js
 * Offline Regression Test Suite for Rubik Vision Core Engines
 * Runs with pure Node.js (v18+) without any external npm packages.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// 1. Load Core Modules
let min2phase = null;
try {
    min2phase = require('../lib/min2phase');
    if (min2phase && min2phase.initialize) min2phase.initialize();
} catch (e) {
    console.warn('min2phase load warning:', e.message);
}

let CubeEngine = null;
try {
    CubeEngine = require('../src/core/cube-engine');
} catch (e) {
    console.error('Failed to load cube-engine:', e);
}

let TimerEngine = null;
try {
    TimerEngine = require('../src/core/timer-engine');
} catch (e) {
    console.error('Failed to load timer-engine:', e);
}

let ChartEngine = null;
try {
    ChartEngine = require('../src/ui/chart-engine');
} catch (e) {
    console.error('Failed to load chart-engine:', e);
}

const tests = [];
function test(name, fn) {
    tests.push({ name, fn });
}

// -------------------------------------------------------------
// Test Cases
// -------------------------------------------------------------

test('formatTime: correctly formats sub-minute, multi-minute, DNF and invalid times', () => {
    const { formatTime } = TimerEngine;
    assert.strictEqual(formatTime(0), '00.00');
    assert.strictEqual(formatTime(9420), '09.42');
    assert.strictEqual(formatTime(72350), '1:12.35');
    assert.strictEqual(formatTime(-1), 'DNF');
    assert.strictEqual(formatTime(null), '00.00');
});

test('calcMo3: calculates untrimmed arithmetic mean of 3 solves', () => {
    const { calcMo3, calcAverage } = TimerEngine;
    // 3 solves: 10s, 11s, 30s -> mean should be 17s (17000ms), NOT 11s median!
    assert.strictEqual(calcMo3([10000, 11000, 30000]), 17000);
    // calcAverage on 3 solves must match calcMo3 (WCA rule 9f1)
    assert.strictEqual(calcAverage([10000, 11000, 30000]), 17000);

    // Any DNF in Mo3 makes the result DNF (-1)
    assert.strictEqual(calcMo3([10000, -1, 12000]), -1);
});

test('calcAverage (Ao5): correctly trims fastest & slowest and handles DNF', () => {
    const { calcAverage } = TimerEngine;
    // 5 solves: [10000, 12000, 14000, 16000, 18000]
    // Trim 10000 and 18000 -> average 12000, 14000, 16000 -> 14000
    assert.strictEqual(calcAverage([10000, 12000, 14000, 16000, 18000]), 14000);

    // 1 DNF allowed in Ao5 (counts as slowest, trimmed out)
    // [10000, 12000, 14000, 16000, -1] -> trim 10000 and -1 -> avg(12000, 14000, 16000) = 14000
    assert.strictEqual(calcAverage([10000, 12000, 14000, 16000, -1]), 14000);

    // 2 DNFs in Ao5 results in DNF (-1)
    assert.strictEqual(calcAverage([10000, 12000, 14000, -1, -1]), -1);
});

test('calcAverage (Ao12): correctly trims 1 fastest & 1 slowest and averages 10', () => {
    const { calcAverage } = TimerEngine;
    const times = [9000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 20000];
    // Trim 9000 and 20000 -> average ten 10000s = 10000
    assert.strictEqual(calcAverage(times), 10000);

    // 2 DNFs in Ao12 results in DNF (-1)
    const timesWith2Dnf = [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, -1, -1];
    assert.strictEqual(calcAverage(timesWith2Dnf), -1);
});

test('calcAverage and chart AoX: share generalized 5% trimming and DNF semantics', () => {
    const { calcAverage } = TimerEngine;
    const ao25Times = [...Array(23).fill(10000), 100000, 200000];
    const ao25Solves = ao25Times.map(t => ({ finalTimeMs: t, rawTimeMs: t }));

    // Ao25 trims two values from each end, leaving only the 10-second solves.
    assert.strictEqual(calcAverage(ao25Times), 10000);
    assert.strictEqual(ChartEngine.computeAoXSeries(ao25Solves, 25).at(-1), 10000);

    // Two DNFs fit in Ao25's two-result trim; a third must make the average DNF.
    const twoDnfs = [...Array(23).fill(10000), -1, -1];
    const threeDnfs = [...Array(22).fill(10000), -1, -1, -1];
    assert.strictEqual(calcAverage(twoDnfs), 10000);
    assert.strictEqual(calcAverage(threeDnfs), -1);

    const dnfSolves = threeDnfs.map((t, idx) => ({
        finalTimeMs: t,
        rawTimeMs: t < 0 ? 15000 + idx : t
    }));
    assert.strictEqual(ChartEngine.computeAoXSeries(dnfSolves, 25).at(-1), -1);

    const mo3WithDnf = [10000, -1, 12000].map(t => ({
        finalTimeMs: t,
        rawTimeMs: t < 0 ? 11000 : t
    }));
    assert.strictEqual(ChartEngine.computeAoXSeries(mo3WithDnf, 3).at(-1), -1);
});

test('SolveSession: mock storage and statistics contract consistency', () => {
    const { SolveSession, Penalty } = TimerEngine;
    const memoryStorage = {
        data: {},
        getItem(k) { return this.data[k] || null; },
        setItem(k, v) { this.data[k] = String(v); },
        removeItem(k) { delete this.data[k]; }
    };

    const session = new SolveSession('test_session', memoryStorage);
    assert.strictEqual(session.solves.length, 0);

    // Add 3 solves: 10.00s, 12.00s, 14.00s
    session.addSolve({ id: 's1', rawTimeMs: 10000, finalTimeMs: 10000, penalty: Penalty.NONE, formattedTime: '10.00' });
    session.addSolve({ id: 's2', rawTimeMs: 12000, finalTimeMs: 12000, penalty: Penalty.NONE, formattedTime: '12.00' });
    session.addSolve({ id: 's3', rawTimeMs: 14000, finalTimeMs: 14000, penalty: Penalty.NONE, formattedTime: '14.00' });

    const stats = session.getStats();
    assert.strictEqual(stats.count, 3);
    assert.strictEqual(stats.best, 10000);
    assert.strictEqual(stats.bestFormatted, '10.00');
    assert.strictEqual(stats.currentAo3, 12000);
    assert.strictEqual(stats.currentAo3Formatted, '12.00');
});

test('SolveSession.togglePenalty: cycles correctly and synchronizes finalTimeMs and formattedTime', () => {
    const { SolveSession, Penalty } = TimerEngine;
    const memoryStorage = {
        data: {},
        getItem(k) { return this.data[k] || null; },
        setItem(k, v) { this.data[k] = String(v); }
    };

    const session = new SolveSession('test_penalty', memoryStorage);
    session.addSolve({
        id: 's_pen',
        rawTimeMs: 10000,
        baseTimeMs: 10000,
        finalTimeMs: 10000,
        penalty: Penalty.NONE,
        formattedTime: '10.00'
    });

    // 1. Toggle +2: 10000 -> 12000 (+2, formatted: '12.00+')
    session.togglePenalty('s_pen', '+2');
    let solve = session.solves.find(s => s.id === 's_pen');
    assert.strictEqual(solve.penalty, Penalty.PLUS_TWO);
    assert.strictEqual(solve.finalTimeMs, 12000);
    assert.strictEqual(solve.formattedTime, '12.00+');

    // 2. Toggle +2 again: removes penalty -> 10000
    session.togglePenalty('s_pen', '+2');
    solve = session.solves.find(s => s.id === 's_pen');
    assert.strictEqual(solve.penalty, Penalty.NONE);
    assert.strictEqual(solve.finalTimeMs, 10000);
    assert.strictEqual(solve.formattedTime, '10.00');

    // 3. Toggle DNF: -> -1
    session.togglePenalty('s_pen', 'DNF');
    solve = session.solves.find(s => s.id === 's_pen');
    assert.strictEqual(solve.penalty, Penalty.DNF);
    assert.strictEqual(solve.finalTimeMs, -1);
    assert.strictEqual(solve.formattedTime, 'DNF');
});

test('csTimer export: exports integer milliseconds and correct penalty format', () => {
    const { SolveSession, Penalty } = TimerEngine;
    const memoryStorage = {
        data: {},
        getItem(k) { return this.data[k] || null; },
        setItem(k, v) { this.data[k] = String(v); }
    };

    const session = new SolveSession('test_cstimer', memoryStorage);
    session.addSolve({
        id: 's1',
        rawTimeMs: 14170,
        finalTimeMs: 14170,
        penalty: Penalty.NONE,
        scramble: "R U R' U'",
        timestamp: 1700000000000
    });
    session.addSolve({
        id: 's2',
        rawTimeMs: 12000,
        finalTimeMs: 14000,
        penalty: Penalty.PLUS_TWO,
        scramble: "F R U R' U' F'",
        timestamp: 1700000005000
    });
    session.addSolve({
        id: 's3',
        rawTimeMs: 9000,
        finalTimeMs: -1,
        penalty: Penalty.DNF,
        scramble: "U",
        timestamp: 1700000010000
    });

    const parsed = JSON.parse(session.exportCsTimerJSON());
    assert(parsed.session1, 'csTimer json must have session1');
    assert.strictEqual(parsed.session1.length, 3);

    // Oldest solve was s1: 14170ms -> must be integer 14170 (NOT 1417 centiseconds!)
    const solve1Record = parsed.session1[0];
    assert.deepStrictEqual(solve1Record[0], [0, 14170]);
    assert.strictEqual(solve1Record[1], "R U R' U'");

    // s2 (+2 penalty): csTimer adds the first tuple value while rendering,
    // so the second value must remain the unpenalized 12000ms base time.
    const solve2Record = parsed.session1[1];
    assert.deepStrictEqual(solve2Record[0], [2000, 12000]);

    // s3 (DNF): retain the underlying time for DNF(09.00) display/recovery.
    const solve3Record = parsed.session1[2];
    assert.deepStrictEqual(solve3Record[0], [-1, 9000]);
});

test('min2phase group theory: C^-1 * T solves current cube state C to target T', () => {
    if (!min2phase || !CubeEngine) {
        console.warn('Skipping min2phase test (dependencies not loaded)');
        return;
    }
    const { RubiksCube, getCorrectionMoves } = CubeEngine;
    const targetCube = new RubiksCube().applyMove('R').applyMove('U').applyMove('F');
    // User made a mistake: applied 'D' instead of F
    const currentCube = new RubiksCube().applyMove('R').applyMove('U').applyMove('D');

    const moves = getCorrectionMoves(currentCube, targetCube);
    assert(moves && moves.length > 0, 'Must find path from current to target');

    // Applying moves to currentCube must result in targetCube!
    const verifyCube = currentCube.clone();
    for (const m of moves) {
        verifyCube.applyMove(m);
    }
    assert.strictEqual(verifyCube.equals(targetCube), true, 'Correcting moves must reach targetCube');
});

test('TimerController: hardware calibration validity gate applies within 300ms, rejects beyond', () => {
    const { TimerController, Penalty } = TimerEngine;
    const memoryStorage = {
        data: {},
        getItem(k) { return this.data[k] || null; },
        setItem(k, v) { this.data[k] = String(v); }
    };

    const timer = new TimerController();
    timer.session = new TimerEngine.SolveSession('test_timer_calib', memoryStorage);

    // Mock bluetooth driver with cubeTimestampLinearFit
    const mockDriver = {
        cubeTimestampLinearFit(moves) {
            return moves.map(m => ({
                ...m,
                calibratedElapsedMs: m._targetCalibMs
            }));
        }
    };
    timer.bluetoothDriver = mockDriver;

    // Case A: 4 moves, calibrated time deviation is 50ms (within 300ms gate)
    timer.startTimer();
    timer.startTimeMs = 1000;
    timer.currentMoves = [
        { move: 'R', cubeTimestamp: 100, _targetCalibMs: 200 },
        { move: 'U', cubeTimestamp: 200, _targetCalibMs: 400 },
        { move: 'R\'', cubeTimestamp: 300, _targetCalibMs: 600 },
        { move: 'U\'', cubeTimestamp: 400, _targetCalibMs: 1050 }
    ];
    // Explicit stop at 2000ms: rawDurationMs = 1000ms, calibrated = 1050ms
    const solveRecord = timer.stopTimer(2000);

    assert.strictEqual(solveRecord.rawTimeMs, 1000);
    assert.strictEqual(solveRecord.calibratedTimeMs, 1050);
    assert.strictEqual(solveRecord.finalTimeMs, 1050);

    // Case B: 4 moves, calibrated time deviation is 600ms (> 300ms gate -> fallback to raw)
    timer.startTimer();
    timer.startTimeMs = 1000;
    timer.currentMoves = [
        { move: 'R', cubeTimestamp: 100, _targetCalibMs: 200 },
        { move: 'U', cubeTimestamp: 200, _targetCalibMs: 400 },
        { move: 'R\'', cubeTimestamp: 300, _targetCalibMs: 600 },
        { move: 'U\'', cubeTimestamp: 400, _targetCalibMs: 1600 }
    ];
    const solveRejected = timer.stopTimer(2000); // raw = 1000ms, candidate = 1600ms (diff 600ms > 300ms)

    assert.strictEqual(solveRejected.rawTimeMs, 1000);
    assert.strictEqual(solveRejected.calibratedTimeMs, 1000); // rejected, falls back to raw
    assert.strictEqual(solveRejected.finalTimeMs, 1000);
});

test('TimerController: WCA inspection +2 penalty carryover and DNF', () => {
    const { TimerController, Penalty, getNowMs } = TimerEngine;
    const memoryStorage = {
        data: {},
        getItem(k) { return this.data[k] || null; },
        setItem(k, v) { this.data[k] = String(v); }
    };

    const timer = new TimerController();
    timer.session = new TimerEngine.SolveSession('test_inspection', memoryStorage);

    // 1. Inspection starts, user starts at 16s (between 15s and 17s -> +2 penalty)
    timer.startInspection();
    timer.inspectionStartMs = getNowMs() - 16000; // 16 seconds elapsed
    timer.tickInspection();
    assert.strictEqual(timer.inspectionPenalty, Penalty.PLUS_TWO);

    // User makes first turn to start solve
    timer.startTimer();
    assert.strictEqual(timer.currentPenalty, Penalty.PLUS_TWO);
    assert.strictEqual(timer.inspectionPenalty, Penalty.NONE); // reset inspection

    timer.startTimeMs = 1000;
    const solve = timer.stopTimer(6000); // rawDuration = 5000ms

    assert.strictEqual(solve.penalty, Penalty.PLUS_TWO);
    assert.strictEqual(solve.rawTimeMs, 5000);
    assert.strictEqual(solve.finalTimeMs, 7000);
    assert.strictEqual(solve.formattedTime, '07.00+');

    // 2. Inspection >= 17s triggers DNF
    timer.resetTimer();
    timer.startInspection();
    timer.inspectionStartMs = getNowMs() - 17500;
    timer.tickInspection();

    assert.strictEqual(timer.state, 'FINISHED');
    const dnfSolve = timer.session.solves[0];
    assert.strictEqual(dnfSolve.penalty, Penalty.DNF);
    assert.strictEqual(dnfSolve.finalTimeMs, Penalty.DNF);
    assert.strictEqual(dnfSolve.formattedTime, 'DNF');
});

test('Scramble lookahead: step visibility matches visiblePrev and visibleNext parameters', () => {
    const computeStepClasses = CubeEngine.getScrambleStepClasses;

    // Active = 5, visiblePrev = 1, visibleNext = 3
    // idx = 3 (< 5 - 1) -> hidden
    assert.strictEqual(computeStepClasses(3, 5, 1, 3).farCls, 'step-far step-hidden');
    // idx = 4 (== 5 - 1) -> visible done
    assert.strictEqual(computeStepClasses(4, 5, 1, 3).farCls, '');
    // idx = 5 -> active
    assert.strictEqual(computeStepClasses(5, 5, 1, 3).cls, 'step-active');
    // idx = 8 (== 5 + 3) -> visible pending
    assert.strictEqual(computeStepClasses(8, 5, 1, 3).farCls, 'step-far');
    // idx = 9 (> 5 + 3) -> hidden
    assert.strictEqual(computeStepClasses(9, 5, 1, 3).farCls, 'step-far step-hidden');
});

test('Offline cache: every local CSS/JS URL in index is precached exactly', () => {
    const rootDir = path.resolve(__dirname, '..');
    const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
    const sw = fs.readFileSync(path.join(rootDir, 'sw.js'), 'utf8');
    const htmlAssets = [...html.matchAll(/(?:src|href)=["']([^"']+\.(?:js|css)(?:\?[^"']*)?)["']/g)]
        .map(match => '/' + match[1].replace(/^\//, ''));
    const cachedAssets = new Set(
        [...sw.matchAll(/["'](\/[^"']+\.(?:js|css)(?:\?[^"']*)?)["']/g)]
            .map(match => match[1])
    );

    assert.deepStrictEqual(
        htmlAssets.filter(asset => !cachedAssets.has(asset)),
        [],
        'index.html contains CSS/JS URLs that are missing from the service-worker precache'
    );
    assert(!sw.includes("caches.match(evt.request) || caches.match('/index.html'"),
        'asset failures must not fall back to index.html');
});

// -------------------------------------------------------------
// Runner
// -------------------------------------------------------------
let passed = 0;
let failed = 0;

console.log(`\n========================================`);
console.log(`Running ${tests.length} Core Regression Tests...`);
console.log(`========================================`);

for (const t of tests) {
    try {
        t.fn();
        console.log(` [PASS] ${t.name}`);
        passed++;
    } catch (err) {
        console.error(` [FAIL] ${t.name}`);
        console.error(`        Error: ${err.message}`);
        failed++;
    }
}

console.log(`========================================`);
console.log(`Result: ${passed} passed, ${failed} failed`);
console.log(`========================================\n`);

if (failed > 0) {
    process.exit(1);
}
