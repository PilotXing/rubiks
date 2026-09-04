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

    class SoundManager {
        constructor() {
            this.ctx = null;
            this.enabled = true;
            this.volume = 0.7; // 0.0 to 1.0
            this.voiceEnabled = true;
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

    return new SoundManager();
}));
