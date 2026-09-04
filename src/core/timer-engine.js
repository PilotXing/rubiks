/**
 * timer-engine.js
 * High-precision Speedcubing Timer Engine, Move Logger & Session Statistics
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bluetooth/gan-bluetooth'], factory);
    } else if (typeof module === 'object' && module.exports) {
        let gb = null;
        try {
            gb = require('../bluetooth/gan-bluetooth');
        } catch (e) {}
        module.exports = factory(gb);
    } else {
        root.TimerEngine = factory(root.GanBluetooth);
    }
}(typeof self !== 'undefined' ? self : this, function(GanBluetooth) {
    'use strict';

    const Penalty = Object.freeze({
        NONE: 0,
        PLUS_TWO: 2000,
        DNF: -1
    });

    const getNowMs = () => (typeof performance !== 'undefined' && typeof performance.now === 'function')
        ? performance.now()
        : Date.now();

    const raf = typeof requestAnimationFrame === 'function'
        ? requestAnimationFrame
        : (cb => setTimeout(cb, 16));

    const caf = typeof cancelAnimationFrame === 'function'
        ? cancelAnimationFrame
        : (id => clearTimeout(id));

    /**
     * Format milliseconds into standard speedcubing time display (e.g. 9.42, 1:12.35)
     */
    function formatTime(ms, includeHundredths = true) {
        if (ms == null || isNaN(ms)) return '00.00';
        if (ms < 0) return 'DNF';

        const totalSecs = ms / 1000;
        const mins = Math.floor(totalSecs / 60);
        const secs = Math.floor(totalSecs % 60);
        const centis = Math.floor((ms % 1000) / 10);
        const milliss = Math.floor(ms % 1000);

        const pad = (n, width = 2) => String(n).padStart(width, '0');

        if (includeHundredths) {
            if (mins > 0) {
                return `${mins}:${pad(secs)}.${pad(centis)}`;
            } else {
                return `${pad(secs, 2)}.${pad(centis)}`;
            }
        } else {
            if (mins > 0) {
                return `${mins}:${pad(secs)}.${pad(milliss, 3)}`;
            } else {
                return `${pad(secs, 2)}.${pad(milliss, 3)}`;
            }
        }
    }

    /**
     * Calculate WCA Mean of 3 (untrimmed arithmetic mean)
     * WCA Rule 9f1: For 3 solves, no times are trimmed.
     * Any DNF results in a DNF mean.
     */
    function calcMo3(timesArray) {
        if (!timesArray || timesArray.length !== 3) return null;
        if (timesArray.some(t => t < 0)) return -1;
        const sum = timesArray.reduce((a, b) => a + b, 0);
        return sum / 3;
    }

    /**
     * Calculate WCA Average of N (Ao5, Ao12, etc.)
     */
    function calcAverage(timesArray) {
        if (!timesArray || timesArray.length === 0) return null;

        if (timesArray.length < 3) {
            if (timesArray.some(t => t < 0)) return -1;
            const sum = timesArray.reduce((a, b) => a + b, 0);
            return sum / timesArray.length;
        }

        if (timesArray.length === 3) {
            return calcMo3(timesArray);
        }

        const dnfCount = timesArray.filter(t => t < 0).length;
        // WCA rules: 1 DNF allowed in Ao5 and Ao12 (counts as slowest, trimmed out)
        const maxDnfs = timesArray.length >= 5 ? 1 : 0;
        if (dnfCount > maxDnfs) return -1; // DNF

        // Sort times, treating DNF (< 0) as largest
        const sorted = timesArray.slice().sort((a, b) => {
            if (a < 0) return 1;
            if (b < 0) return -1;
            return a - b;
        });

        // Trim 1 fastest and 1 slowest (standard Ao5 and Ao12)
        const trimCount = 1;
        const trimmed = sorted.slice(trimCount, sorted.length - trimCount);

        if (trimmed.some(t => t < 0)) return -1;

        const sum = trimmed.reduce((a, b) => a + b, 0);
        return sum / trimmed.length;
    }

    /**
     * Session Storage & Statistics Manager
     */
    class SolveSession {
        constructor(storageKey = 'rubiks_timer_session_v1', storageEngine = null) {
            this.storageKey = storageKey;
            this.storage = storageEngine || (typeof window !== 'undefined' && window.localStorage ? window.localStorage : null);
            this.solves = [];
            this.load();
        }

        load() {
            try {
                if (this.storage) {
                    const saved = this.storage.getItem(this.storageKey);
                    if (saved) {
                        this.solves = JSON.parse(saved);
                    }
                }
            } catch (e) {
                console.warn("Failed to load session:", e);
                this.solves = [];
            }
        }

        save() {
            try {
                if (this.storage) {
                    this.storage.setItem(this.storageKey, JSON.stringify(this.solves));
                }
            } catch (e) {
                console.warn("Failed to save session:", e);
            }
        }

        addSolve(solveRecord) {
            this.solves.unshift(solveRecord);
            this.save();
            return solveRecord;
        }

        deleteSolve(solveId) {
            this.solves = this.solves.filter(s => s.id !== solveId);
            this.save();
        }

        togglePenalty(solveId, penaltyType) {
            // penaltyType: '+2' or 'DNF' or 'OK'
            const solve = this.solves.find(s => s.id === solveId);
            if (!solve) return;

            const baseTime = (typeof solve.baseTimeMs === 'number' && solve.baseTimeMs > 0)
                ? solve.baseTimeMs
                : ((typeof solve.rawTimeMs === 'number' && solve.rawTimeMs > 0)
                    ? solve.rawTimeMs
                    : (solve.penalty === Penalty.PLUS_TWO ? solve.finalTimeMs - 2000 : solve.finalTimeMs));

            if (penaltyType === '+2') {
                if (solve.penalty === Penalty.PLUS_TWO) {
                    solve.penalty = Penalty.NONE;
                    solve.finalTimeMs = baseTime;
                    solve.formattedTime = formatTime(baseTime);
                } else {
                    solve.penalty = Penalty.PLUS_TWO;
                    solve.finalTimeMs = baseTime + 2000;
                    solve.formattedTime = formatTime(baseTime + 2000) + '+';
                }
            } else if (penaltyType === 'DNF') {
                if (solve.penalty === Penalty.DNF) {
                    solve.penalty = Penalty.NONE;
                    solve.finalTimeMs = baseTime;
                    solve.formattedTime = formatTime(baseTime);
                } else {
                    solve.penalty = Penalty.DNF;
                    solve.finalTimeMs = Penalty.DNF;
                    solve.formattedTime = 'DNF';
                }
            } else {
                solve.penalty = Penalty.NONE;
                solve.finalTimeMs = baseTime;
                solve.formattedTime = formatTime(baseTime);
            }
            this.save();
        }

        clearSession() {
            this.solves = [];
            this.save();
        }

        getStats() {
            const count = this.solves.length;
            if (count === 0) {
                return {
                    count: 0,
                    best: null,
                    bestFormatted: '--',
                    worst: null,
                    worstFormatted: '--',
                    currentAo3: null,
                    currentAo3Formatted: '--',
                    bestAo3: null,
                    bestAo3Formatted: '--',
                    currentAo5: null,
                    currentAo5Formatted: '--',
                    bestAo5: null,
                    bestAo5Formatted: '--',
                    currentAo12: null,
                    currentAo12Formatted: '--',
                    bestAo12: null,
                    bestAo12Formatted: '--',
                    mean: null,
                    meanFormatted: '--',
                    stdDev: null,
                    stdDevFormatted: '--'
                };
            }

            const times = this.solves.map(s => s.finalTimeMs);
            const validTimes = times.filter(t => t > 0);

            const best = validTimes.length ? Math.min(...validTimes) : null;
            const worst = validTimes.length ? Math.max(...validTimes) : null;

            // Session Mean
            const mean = validTimes.length
                ? (validTimes.reduce((a, b) => a + b, 0) / validTimes.length)
                : null;

            // Standard Deviation
            let stdDev = null;
            if (validTimes.length > 1 && mean !== null) {
                const variance = validTimes.reduce((acc, t) => acc + Math.pow(t - mean, 2), 0) / (validTimes.length - 1);
                stdDev = Math.sqrt(variance);
            }

            // Current ao3 and best ao3 (mean of 3 / ao3)
            let currentAo3 = null;
            let bestAo3 = null;
            if (count >= 3) {
                currentAo3 = calcAverage(times.slice(0, 3));
                for (let i = 0; i <= count - 3; i++) {
                    const avg = calcAverage(times.slice(i, i + 3));
                    if (avg > 0) {
                        bestAo3 = (bestAo3 === null) ? avg : Math.min(bestAo3, avg);
                    }
                }
            }

            // Current ao5 and best ao5
            let currentAo5 = null;
            let bestAo5 = null;
            if (count >= 5) {
                currentAo5 = calcAverage(times.slice(0, 5));
                for (let i = 0; i <= count - 5; i++) {
                    const avg = calcAverage(times.slice(i, i + 5));
                    if (avg > 0) {
                        bestAo5 = (bestAo5 === null) ? avg : Math.min(bestAo5, avg);
                    }
                }
            }

            // Current ao12 and best ao12
            let currentAo12 = null;
            let bestAo12 = null;
            if (count >= 12) {
                currentAo12 = calcAverage(times.slice(0, 12));
                for (let i = 0; i <= count - 12; i++) {
                    const avg = calcAverage(times.slice(i, i + 12));
                    if (avg > 0) {
                        bestAo12 = (bestAo12 === null) ? avg : Math.min(bestAo12, avg);
                    }
                }
            }

            const fmt = (val) => {
                if (val === null || val === undefined) return '--';
                if (val < 0) return 'DNF';
                return formatTime(val);
            };

            return {
                count,
                best,
                bestFormatted: fmt(best),
                worst,
                worstFormatted: fmt(worst),
                currentAo3,
                currentAo3Formatted: fmt(currentAo3),
                bestAo3,
                bestAo3Formatted: fmt(bestAo3),
                currentAo5,
                currentAo5Formatted: fmt(currentAo5),
                bestAo5,
                bestAo5Formatted: fmt(bestAo5),
                currentAo12,
                currentAo12Formatted: fmt(currentAo12),
                bestAo12,
                bestAo12Formatted: fmt(bestAo12),
                mean,
                meanFormatted: fmt(mean),
                stdDev,
                stdDevFormatted: stdDev !== null ? (stdDev / 1000).toFixed(2) : '--'
            };
        }

        calculateAoN(n) {
            if (!n || typeof n !== 'number' || n <= 0) return null;
            if (!this.solves || this.solves.length < n) return null;
            const times = this.solves.slice(0, n).map(s => s.finalTimeMs);
            return calcAverage(times);
        }

        exportJSON() {
            return JSON.stringify({
                version: 1,
                exportedAt: new Date().toISOString(),
                session: this.solves
            }, null, 2);
        }

        exportCSV() {
            let csv = "Index,Time(s),Formatted,Penalty,MoveCount,TPS,Scramble,Date\n";
            this.solves.forEach((s, idx) => {
                const timeSec = s.finalTimeMs > 0 ? (s.finalTimeMs / 1000).toFixed(2) : 'DNF';
                const penaltyStr = s.penalty === Penalty.PLUS_TWO ? '+2' : (s.penalty === Penalty.DNF ? 'DNF' : 'OK');
                const dateStr = new Date(s.timestamp).toLocaleString().replace(/,/g, '');
                const scrambleEscaped = `"${(s.scramble || '').replace(/"/g, '""')}"`;
                csv += `${this.solves.length - idx},${timeSec},${s.formattedTime},${penaltyStr},${s.moveCount || 0},${s.tps || 0},${scrambleEscaped},${dateStr}\n`;
            });
            return csv;
        }

        exportCsTimerJSON() {
            // csTimer JSON structure: { "session1": [ [ [penalty, timeInMs], scramble, comment, timestamp ] ] }
            const sessionData = this.solves.map(s => {
                const timeVal = s.finalTimeMs > 0 ? Math.round(s.finalTimeMs) : -1;
                const penaltyFlag = s.penalty === Penalty.PLUS_TWO ? 2000 : (s.penalty === Penalty.DNF ? -1 : 0);
                return [
                    [penaltyFlag, timeVal],
                    s.scramble || "",
                    `Moves: ${s.moveCount || 0}, TPS: ${s.tps || 0}`,
                    Math.floor((s.timestamp || Date.now()) / 1000)
                ];
            });

            return JSON.stringify({
                session1: sessionData.reverse(),
                properties: { sessionData: "{\"1\":{\"name\":\"Bluetooth Cubing Session\"}}" }
            }, null, 2);
        }
    }

    /**
     * High-Precision Timer Engine
     */
    class TimerController {
        constructor() {
            this.state = 'IDLE'; // IDLE, SCRAMBLING, CORRECTION, READY, INSPECTION, RUNNING, FINISHED
            this.startTimeMs = 0;
            this.stopTimeMs = 0;
            this.elapsedMs = 0;
            this.animationFrameId = null;

            this.inspectionEnabled = false;
            this.inspectionStartMs = 0;
            this.inspectionDurationSec = 15;
            this.inspectionPassed8 = false;
            this.inspectionPassed12 = false;
            this.inspectionPenalty = Penalty.NONE;
            this.currentPenalty = Penalty.NONE;

            this.currentMoves = []; // Moves recorded during current RUNNING solve
            this.lastMoveTimestamp = 0;

            this.currentScramble = '';
            this.session = new SolveSession();
            this.bluetoothDriver = null;

            this.listeners = {
                stateChange: [],
                tick: [],
                moveLogged: [],
                solveFinished: [],
                inspectionTick: []
            };
        }

        on(event, cb) {
            if (this.listeners[event]) this.listeners[event].push(cb);
            return this;
        }

        emit(event, data) {
            if (this.listeners[event]) {
                this.listeners[event].forEach(cb => {
                    try { cb(data); } catch (e) { console.error(e); }
                });
            }
        }

        setState(newState) {
            const oldState = this.state;
            this.state = newState;
            this.emit('stateChange', { state: newState, oldState });
        }

        setScramble(scrambleStr) {
            this.currentScramble = scrambleStr;
        }

        startInspection() {
            this.setState('INSPECTION');
            this.inspectionStartMs = getNowMs();
            this.inspectionPassed8 = false;
            this.inspectionPassed12 = false;
            this.inspectionPenalty = Penalty.NONE;
            this.tickInspection();
        }

        tickInspection() {
            if (this.state !== 'INSPECTION') return;
            const now = getNowMs();
            const elapsedSec = (now - this.inspectionStartMs) / 1000;
            const remainingSec = Math.max(0, Math.ceil(this.inspectionDurationSec - elapsedSec));

            if (elapsedSec >= 8 && !this.inspectionPassed8) {
                this.inspectionPassed8 = true;
                this.emit('inspectionTick', { secondsLeft: 7, callout: 8 });
            }
            if (elapsedSec >= 12 && !this.inspectionPassed12) {
                this.inspectionPassed12 = true;
                this.emit('inspectionTick', { secondsLeft: 3, callout: 12 });
            }

            if (elapsedSec >= 15 && elapsedSec < 17) {
                this.inspectionPenalty = Penalty.PLUS_TWO;
            }

            this.emit('inspectionTick', { secondsLeft: remainingSec, elapsedSec, penalty: this.inspectionPenalty });

            if (elapsedSec >= 17) {
                // Inspection expired (+2 at 15s, DNF at 17s)
                this.inspectionPenalty = Penalty.DNF;
                this.stopTimerWithDNF();
                return;
            }

            raf(() => this.tickInspection());
        }

        startTimer() {
            if (this.state === 'RUNNING') return;

            this.currentPenalty = this.inspectionPenalty || Penalty.NONE;
            this.inspectionPenalty = Penalty.NONE;

            this.startTimeMs = getNowMs();
            this.stopTimeMs = 0;
            this.elapsedMs = 0;
            this.currentMoves = [];
            this.lastMoveTimestamp = this.startTimeMs;

            this.setState('RUNNING');
            this.tick();
        }

        tick() {
            if (this.state !== 'RUNNING') return;
            const now = getNowMs();
            this.elapsedMs = now - this.startTimeMs;

            const tps = this.currentMoves.length > 0 && this.elapsedMs > 500
                ? ((this.currentMoves.length / (this.elapsedMs / 1000))).toFixed(2)
                : 0.00;

            this.emit('tick', {
                elapsedMs: this.elapsedMs,
                moveCount: this.currentMoves.length,
                tps: tps
            });

            this.animationFrameId = raf(() => this.tick());
        }

        onCubeMove(moveEvent) {
            // moveEvent: { move: 'R', face: 0, direction: 0, cubeTimestamp, localTimestamp }
            const now = getNowMs();

            if (this.state === 'READY' || this.state === 'INSPECTION') {
                // First physical turn starts the solve!
                this.startTimer();
            }

            if (this.state === 'RUNNING') {
                const moveTimeFromStart = now - this.startTimeMs;
                const deltaFromPrev = this.currentMoves.length > 0
                    ? now - this.lastMoveTimestamp
                    : moveTimeFromStart;

                this.lastMoveTimestamp = now;

                const instantTps = deltaFromPrev > 0
                    ? (1000 / deltaFromPrev).toFixed(2)
                    : 0.00;

                const moveRecord = {
                    move: moveEvent.move,
                    elapsedMs: Math.round(moveTimeFromStart),
                    deltaMs: Math.round(deltaFromPrev),
                    cubeTimestamp: moveEvent.cubeTimestamp,
                    localTimestamp: moveEvent.localTimestamp || now,
                    instantTps: parseFloat(instantTps)
                };

                this.currentMoves.push(moveRecord);
                this.emit('moveLogged', { move: moveRecord, totalMoves: this.currentMoves.length });
            }
        }

        stopTimer(stopTimestampMs = null) {
            if (this.state !== 'RUNNING') return null;

            this.stopTimeMs = stopTimestampMs || this.stopTimeMs || getNowMs();
            if (this.animationFrameId) {
                caf(this.animationFrameId);
                this.animationFrameId = null;
            }

            const rawDurationMs = Math.round(this.stopTimeMs - this.startTimeMs);
            let baseTimeMs = rawDurationMs;
            let calibratedTimeMs = rawDurationMs;

            // Hardware linear regression calibration if hardware timestamps available
            const driver = this.bluetoothDriver
                || GanBluetooth
                || (typeof window !== 'undefined' && window.GanBluetooth ? window.GanBluetooth : null)
                || (typeof global !== 'undefined' && global.GanBluetooth ? global.GanBluetooth : null);

            if (driver && typeof driver.cubeTimestampLinearFit === 'function') {
                const hasHardwareTimestamps = this.currentMoves.some(m => m.cubeTimestamp != null);
                if (hasHardwareTimestamps && this.currentMoves.length >= 4) {
                    const fittedMoves = driver.cubeTimestampLinearFit(this.currentMoves);
                    const lastFitted = fittedMoves && fittedMoves[fittedMoves.length - 1];
                    if (lastFitted && typeof lastFitted.calibratedElapsedMs === 'number' && lastFitted.calibratedElapsedMs > 0) {
                        const candidateMs = Math.round(lastFitted.calibratedElapsedMs);
                        // Hardware calibration validity gate: sampleCount >= 4 and abs deviation <= 300ms
                        if (Math.abs(candidateMs - rawDurationMs) <= 300) {
                            calibratedTimeMs = candidateMs;
                            baseTimeMs = candidateMs;
                            // Replace move timestamps with fitted timestamps
                            fittedMoves.forEach((fm, idx) => {
                                if (this.currentMoves[idx] && fm.calibratedElapsedMs != null) {
                                    this.currentMoves[idx].calibratedElapsedMs = fm.calibratedElapsedMs;
                                }
                            });
                        }
                    }
                }
            }

            const penalty = this.currentPenalty || Penalty.NONE;
            this.currentPenalty = Penalty.NONE;

            let finalTimeMs = baseTimeMs;
            let formatted = formatTime(baseTimeMs);

            if (penalty === Penalty.PLUS_TWO) {
                finalTimeMs = baseTimeMs + 2000;
                formatted = formatTime(finalTimeMs) + '+';
            } else if (penalty === Penalty.DNF) {
                finalTimeMs = Penalty.DNF;
                formatted = 'DNF';
            }

            const totalMoves = this.currentMoves.length;
            const timeForTps = baseTimeMs > 0 ? baseTimeMs : rawDurationMs;
            const overallTps = timeForTps > 0
                ? ((totalMoves / (timeForTps / 1000))).toFixed(2)
                : 0.00;

            const solveRecord = {
                id: 'solve_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
                timestamp: Date.now(),
                rawTimeMs: rawDurationMs,
                calibratedTimeMs: calibratedTimeMs,
                baseTimeMs: baseTimeMs,
                finalTimeMs: finalTimeMs,
                formattedTime: formatted,
                scramble: this.currentScramble,
                moveCount: totalMoves,
                tps: parseFloat(overallTps),
                moves: this.currentMoves.slice(),
                penalty: penalty
            };

            this.session.addSolve(solveRecord);
            this.setState('FINISHED');
            this.emit('solveFinished', solveRecord);

            return solveRecord;
        }

        stopTimerWithDNF() {
            if (this.animationFrameId) {
                caf(this.animationFrameId);
                this.animationFrameId = null;
            }
            this.setState('FINISHED');

            const solveRecord = {
                id: 'solve_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
                timestamp: Date.now(),
                rawTimeMs: 0,
                calibratedTimeMs: 0,
                baseTimeMs: 0,
                finalTimeMs: Penalty.DNF,
                formattedTime: 'DNF',
                scramble: this.currentScramble,
                moveCount: this.currentMoves.length,
                tps: 0,
                moves: this.currentMoves.slice(),
                penalty: Penalty.DNF
            };
            this.session.addSolve(solveRecord);
            this.emit('solveFinished', solveRecord);
            return solveRecord;
        }

        resetTimer() {
            if (this.animationFrameId) {
                caf(this.animationFrameId);
                this.animationFrameId = null;
            }
            this.elapsedMs = 0;
            this.inspectionPenalty = Penalty.NONE;
            this.currentPenalty = Penalty.NONE;
            this.currentMoves = [];
            this.setState('IDLE');
        }
    }

    return {
        TimerController,
        SolveSession,
        formatTime,
        calcAverage,
        calcMo3,
        Penalty,
        getNowMs
    };
}));
