/**
 * audio-synth.js
 * Web Audio API Sound Synthesizer for Rubik's Cube Timer
 * Provides crisp, zero-latency feedback for scramble moves, scramble completion,
 * inspection warnings, and solve completion.
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.AudioSynth = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {
    'use strict';

    class MetronomeEngine {
        constructor(soundManager) {
            this.sound = soundManager;
            const getStorage = (key, fallback) => {
                if (typeof localStorage !== 'undefined') {
                    const v = localStorage.getItem(key);
                    return v !== null ? v : fallback;
                }
                return fallback;
            };

            this.bps = parseFloat(getStorage('rubiks_metronome_bps', '2.5')) || 2.5;
            this.armed = getStorage('rubiks_metronome_armed', 'false') === 'true';
            this.soundType = getStorage('rubiks_metronome_sound', 'woodblock');
            this.volume = parseFloat(getStorage('rubiks_metronome_vol', '0.8')) || 0.8;
            this.isRunning = false;
            this.timerId = null;
            this.nextNoteTime = 0.0;
            this.lookahead = 25.0; // ms
            this.scheduleAheadTime = 0.1; // sec
            this.beatCount = 0;
            this.onBeat = null;
        }

        setBps(val) {
            const parsed = parseFloat(val);
            if (!isNaN(parsed) && parsed >= 0.5 && parsed <= 15.0) {
                this.bps = Math.round(parsed * 10) / 10;
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('rubiks_metronome_bps', this.bps.toString());
                }
            }
            return this.bps;
        }

        setArmed(isArmed) {
            this.armed = !!isArmed;
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('rubiks_metronome_armed', this.armed ? 'true' : 'false');
            }
            return this.armed;
        }

        setSoundType(type) {
            if (['woodblock', 'beep', 'tick', 'cowbell'].includes(type)) {
                this.soundType = type;
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('rubiks_metronome_sound', this.soundType);
                }
            }
            return this.soundType;
        }

        setVolume(vol) {
            const parsed = parseFloat(vol);
            if (!isNaN(parsed)) {
                this.volume = Math.max(0, Math.min(1, parsed));
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('rubiks_metronome_vol', this.volume.toString());
                }
            }
            return this.volume;
        }

        start() {
            if (this.isRunning) return;
            this.sound.initContext();
            if (!this.sound.ctx) return;
            this.isRunning = true;
            this.beatCount = 0;
            this.nextNoteTime = this.sound.ctx.currentTime + 0.03;
            this._scheduleLoop();
        }

        stop() {
            this.isRunning = false;
            if (this.timerId) {
                clearTimeout(this.timerId);
                this.timerId = null;
            }
        }

        toggle() {
            if (this.isRunning) {
                this.stop();
            } else {
                this.start();
            }
            return this.isRunning;
        }

        _scheduleLoop() {
            if (!this.isRunning) return;
            const ctx = this.sound.ctx;
            if (!ctx) return;

            while (this.nextNoteTime < ctx.currentTime + this.scheduleAheadTime) {
                this.playToneAt(this.nextNoteTime, this.beatCount);
                const interval = 1.0 / this.bps;
                this.nextNoteTime += interval;
                this.beatCount++;
            }

            this.timerId = setTimeout(() => this._scheduleLoop(), this.lookahead);
        }

        playToneAt(time, count = 0) {
            const ctx = this.sound.ctx;
            if (!ctx) return;
            const effVol = this.volume * this.sound.volume;
            if (effVol <= 0.001) return;

            if (this.soundType === 'beep') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1200, time);
                gain.gain.setValueAtTime(0.001, time);
                gain.gain.exponentialRampToValueAtTime(effVol * 0.7, time + 0.004);
                gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.035);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(time);
                osc.stop(time + 0.04);
            } else if (this.soundType === 'tick') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(2400, time);
                osc.frequency.exponentialRampToValueAtTime(600, time + 0.015);
                gain.gain.setValueAtTime(0.001, time);
                gain.gain.exponentialRampToValueAtTime(effVol * 0.8, time + 0.002);
                gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.02);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(time);
                osc.stop(time + 0.025);
            } else if (this.soundType === 'cowbell') {
                const osc1 = ctx.createOscillator();
                const osc2 = ctx.createOscillator();
                const gain = ctx.createGain();
                osc1.type = 'square';
                osc2.type = 'triangle';
                osc1.frequency.setValueAtTime(800, time);
                osc2.frequency.setValueAtTime(540, time);
                gain.gain.setValueAtTime(0.001, time);
                gain.gain.exponentialRampToValueAtTime(effVol * 0.6, time + 0.003);
                gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.06);
                osc1.connect(gain);
                osc2.connect(gain);
                gain.connect(ctx.destination);
                osc1.start(time);
                osc2.start(time);
                osc1.stop(time + 0.07);
                osc2.stop(time + 0.07);
            } else {
                // Default: 'woodblock'
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(900, time);
                osc.frequency.exponentialRampToValueAtTime(450, time + 0.025);
                gain.gain.setValueAtTime(0.001, time);
                gain.gain.exponentialRampToValueAtTime(effVol * 0.9, time + 0.003);
                gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.035);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(time);
                osc.stop(time + 0.04);
            }

            if (this.onBeat) {
                const delayMs = Math.max(0, (time - ctx.currentTime) * 1000);
                setTimeout(() => {
                    if (this.isRunning && this.onBeat) this.onBeat(count);
                }, delayMs);
            }
        }

        playSingleTick() {
            this.sound.initContext();
            if (!this.sound.ctx) return;
            this.playToneAt(this.sound.ctx.currentTime + 0.01, 0);
        }
    }

    class SoundManager {
        constructor() {
            this.ctx = null;
            this.enabled = true;
            this.volume = 0.7; // 0.0 to 1.0
            this.voiceEnabled = true;
            this.metronome = new MetronomeEngine(this);
        }

        initContext() {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) {
                    this.ctx = new AudioCtx();
                }
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        }

        playTone(freq, type = 'sine', duration = 0.08, delay = 0, gainLevel = 1.0) {
            if (!this.enabled) return;
            this.initContext();
            if (!this.ctx) return;

            const startTime = this.ctx.currentTime + delay;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, startTime);

            const peakGain = Math.max(0.001, this.volume * gainLevel);
            gain.gain.setValueAtTime(0.001, startTime);
            gain.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(startTime);
            osc.stop(startTime + duration + 0.02);
        }

        /**
         * Pleasant tactile click on each scramble move
         */
        playScrambleTick() {
            if (!this.enabled) return;
            this.initContext();
            if (!this.ctx) return;

            // Dual micro click: high pop
            this.playTone(1400, 'sine', 0.03, 0, 0.4);
            this.playTone(880, 'triangle', 0.025, 0.01, 0.3);
        }

        /**
         * Scramble completed fanfare / chime: C5 -> E5 -> G5 -> C6 ascending chord
         */
        playScrambleComplete() {
            if (!this.enabled) return;
            this.initContext();
            if (!this.ctx) return;

            const notes = [
                { f: 523.25, d: 0.12, t: 0.00 }, // C5
                { f: 659.25, d: 0.12, t: 0.08 }, // E5
                { f: 783.99, d: 0.15, t: 0.16 }, // G5
                { f: 1046.50, d: 0.35, t: 0.24 } // C6
            ];

            notes.forEach(n => {
                this.playTone(n.f, 'triangle', n.d, n.t, 0.7);
                this.playTone(n.f * 2, 'sine', n.d * 0.8, n.t, 0.2);
            });
        }

        /**
         * Solve start sharp beep
         */
        playSolveStart() {
            if (!this.enabled) return;
            this.playTone(1000, 'sine', 0.07, 0, 0.7);
        }

        /**
         * Solve finished triumph chord: F5 + A5 + C6
         */
        playSolveComplete() {
            if (!this.enabled) return;
            this.initContext();
            if (!this.ctx) return;

            // Rich victory chord
            this.playTone(698.46, 'sine', 0.45, 0.00, 0.6); // F5
            this.playTone(880.00, 'sine', 0.50, 0.03, 0.7); // A5
            this.playTone(1046.50, 'sine', 0.65, 0.06, 0.8); // C6
            this.playTone(1396.91, 'triangle', 0.55, 0.08, 0.4); // F6
        }

        /**
         * Scramble mistake / wrong move warning alert: low distinct buzz
         */
        playScrambleWarning() {
            if (!this.enabled) return;
            this.initContext();
            if (!this.ctx) return;

            this.playTone(260, 'sawtooth', 0.12, 0, 0.4);
            this.playTone(200, 'sawtooth', 0.15, 0.08, 0.4);
        }

        /**
         * Inspection warning tone or voice
         */
        playInspectionWarning(secondsRemaining) {
            if (!this.enabled) return;
            if (this.voiceEnabled && 'speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(`${secondsRemaining} seconds`);
                utterance.rate = 1.2;
                utterance.volume = this.volume;
                window.speechSynthesis.speak(utterance);
            } else {
                this.playTone(800, 'sine', 0.1, 0, 0.8);
                this.playTone(1200, 'sine', 0.15, 0.1, 0.8);
            }
        }
    }

    const soundManagerInstance = new SoundManager();
    soundManagerInstance.MetronomeEngine = MetronomeEngine;
    return soundManagerInstance;
}));
