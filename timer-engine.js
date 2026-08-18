/**
 * timer-engine.js
 * High-precision Speedcubing Timer Engine, Move Logger & Session Statistics
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['gan-bluetooth'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('./gan-bluetooth'));
    } else {
        root.TimerEngine = factory(root.GanBluetooth);
    }
}(typeof self !== 'undefined' ? self : this, function(GanBluetooth) {
    'use strict';

    const getNowMs = () => (typeof performance !== 'undefined' && typeof performance.now === 'function')
        ? performance.now()
        : Date.now();

    /**
     * Format milliseconds into standard speedcubing time display (e.g. 9.42, 1:12.35)
     */
    function formatTime(ms, includeHundredths = true) {
        if (ms == null || isNaN(ms)) return '0.00';
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
                return `${secs}.${pad(centis)}`;
            }
        } else {
            if (mins > 0) {
                return `${mins}:${pad(secs)}.${pad(milliss, 3)}`;
            } else {
                return `${secs}.${pad(milliss, 3)}`;
            }
        }
    }

    /**
     * Calculate WCA Average of N (trim fastest and slowest, average the rest)
     */
    function calcAverage(timesArray) {
        if (!timesArray || timesArray.length === 0) return null;
        const validSolves = timesArray.filter(t => t > 0);
        const dnfCount = timesArray.filter(t => t < 0).length;

        // More than 1 DNF in ao5 or more than allowed means DNF
        const maxDnfs = timesArray.length >= 5 ? 1 : 0;
        if (dnfCount > maxDnfs) return -1; // DNF

        if (timesArray.length < 3) {
            // Mean
            const sum = validSolves.reduce((a, b) => a + b, 0);
            return sum / validSolves.length;
        }

        // For ao5 and ao12: sort times, drop highest and lowest
        const sorted = timesArray.slice().sort((a, b) => {
            if (a < 0) return 1; // DNF is largest
            if (b < 0) return -1;
            return a - b;
        });

        // Remove 1 best and 1 worst (for ao5), or 1 best & 1 worst for ao12 (or Math.ceil(0.05*n))
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
        constructor(storageKey = 'rubiks_timer_session_v1') {
            this.storageKey = storageKey;
            this.solves = [];
            this.load();
        }

        load() {
            try {
                const saved = localStorage.getItem(this.storageKey);
                if (saved) {
                    this.solves = JSON.parse(saved);
                }
            } catch (e) {
                console.warn("Failed to load session from localStorage:", e);
                this.solves = [];
            }
        }

        save() {
            try {
                localStorage.setItem(this.storageKey, JSON.stringify(this.solves));
            } catch (e) {
                console.warn("Failed to save session to localStorage:", e);
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

            if (penaltyType === '+2') {
                if (solve.penalty === 2000) {
                    solve.penalty = 0;
                    solve.finalTimeMs = solve.rawTimeMs;
                } else {
                    solve.penalty = 2000;
                    solve.finalTimeMs = solve.rawTimeMs + 2000;
                }
            } else if (penaltyType === 'DNF') {
                if (solve.penalty === -1) {
                    solve.penalty = 0;
                    solve.finalTimeMs = solve.rawTimeMs;
                } else {
                    solve.penalty = -1;
                    solve.finalTimeMs = -1;
                }
            } else {
                solve.penalty = 0;
                solve.finalTimeMs = solve.rawTimeMs;
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
                    worst: null,
                    currentAo5: null,
                    bestAo5: null,
                    currentAo12: null,
                    bestAo12: null,
                    mean: null,
                    stdDev: null
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

            // Current ao5 and best ao5
            let currentAo5 = null;
            let bestAo5 = null;
            if (count >= 5) {
                currentAo5 = calcAverage(times.slice(0, 5));
                // Calculate all ao5 in history for best ao5
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

            return {
                count,
                best,
                worst,
                currentAo5,
                bestAo5,
                currentAo12,
                bestAo12,
                mean,
                stdDev
            };
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
                const penaltyStr = s.penalty === 2000 ? '+2' : (s.penalty === -1 ? 'DNF' : 'OK');
                const dateStr = new Date(s.timestamp).toLocaleString().replace(/,/g, '');
                const scrambleEscaped = `"${(s.scramble || '').replace(/"/g, '""')}"`;
                csv += `${this.solves.length - idx},${timeSec},${s.formattedTime},${penaltyStr},${s.moveCount || 0},${s.tps || 0},${scrambleEscaped},${dateStr}\n`;
            });
            return csv;
        }

        exportCsTimerJSON() {
            // csTimer JSON structure: { "session1": [ [ [penalty, timeInCentiSec], scramble, comment, timestamp ] ] }
            const sessionData = this.solves.map(s => {
                const centi = s.finalTimeMs > 0 ? Math.round(s.finalTimeMs / 10) : -1;
                const penaltyFlag = s.penalty === 2000 ? 2000 : (s.penalty === -1 ? -1 : 0);
                return [
                    [penaltyFlag, centi],
                    s.scramble || "",
                    `Moves: ${s.moveCount || 0}, TPS: ${s.tps || 0}`,
                    Math.floor(s.timestamp / 1000)
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

            this.currentMoves = []; // Moves recorded during current RUNNING solve
            this.lastMoveTimestamp = 0;

            this.currentScramble = '';
            this.session = new SolveSession();

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

            this.emit('inspectionTick', { secondsLeft: remainingSec, elapsedSec });

            if (elapsedSec >= 17) {
                // Inspection expired (+2 at 15s, DNF at 17s)
                this.stopTimerWithDNF();
                return;
            }

            requestAnimationFrame(() => this.tickInspection());
        }

        startTimer() {
            if (this.state === 'RUNNING') return;

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

            this.animationFrameId = requestAnimationFrame(() => this.tick());
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

        stopTimer() {
            if (this.state !== 'RUNNING') return null;

            this.stopTimeMs = getNowMs();
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
            }

            const rawDurationMs = Math.round(this.stopTimeMs - this.startTimeMs);
            let finalTimeMs = rawDurationMs;

            // Hardware linear regression calibration if hardware timestamps available
            let calibratedTimeMs = rawDurationMs;
            if (GanBluetooth && typeof GanBluetooth.cubeTimestampLinearFit === 'function') {
                const hasHardwareTimestamps = this.currentMoves.some(m => m.cubeTimestamp != null);
                if (hasHardwareTimestamps && this.currentMoves.length >= 2) {
                    const fittedMoves = GanBluetooth.cubeTimestampLinearFit(this.currentMoves);
                    const lastFitted = fittedMoves[fittedMoves.length - 1];
                    if (lastFitted && lastFitted.calibratedElapsedMs > 0) {
                        calibratedTimeMs = lastFitted.calibratedElapsedMs;
                        // Replace move timestamps with fitted timestamps
                        fittedMoves.forEach((fm, idx) => {
                            if (this.currentMoves[idx]) {
                                this.currentMoves[idx].calibratedElapsedMs = fm.calibratedElapsedMs;
                            }
                        });
                    }
                }
            }

            const totalMoves = this.currentMoves.length;
            const overallTps = rawDurationMs > 0
                ? ((totalMoves / (rawDurationMs / 1000))).toFixed(2)
                : 0.00;

            const solveRecord = {
                id: 'solve_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
                timestamp: Date.now(),
                rawTimeMs: rawDurationMs,
                calibratedTimeMs: calibratedTimeMs,
                finalTimeMs: rawDurationMs,
                formattedTime: formatTime(rawDurationMs),
                scramble: this.currentScramble,
                moveCount: totalMoves,
                tps: parseFloat(overallTps),
                moves: this.currentMoves.slice(),
                penalty: 0
            };

            this.session.addSolve(solveRecord);
            this.setState('FINISHED');
            this.emit('solveFinished', solveRecord);

            return solveRecord;
        }

        stopTimerWithDNF() {
            if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
            this.setState('FINISHED');

            const solveRecord = {
                id: 'solve_' + Date.now(),
                timestamp: Date.now(),
                rawTimeMs: 0,
                finalTimeMs: -1,
                formattedTime: 'DNF',
                scramble: this.currentScramble,
                moveCount: this.currentMoves.length,
                tps: 0,
                moves: this.currentMoves.slice(),
                penalty: -1
            };
            this.session.addSolve(solveRecord);
            this.emit('solveFinished', solveRecord);
        }

        resetTimer() {
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
            }
            this.elapsedMs = 0;
            this.currentMoves = [];
            this.setState('IDLE');
        }
    }

    return {
        TimerController,
        SolveSession,
        formatTime,
        calcAverage
    };
}));
