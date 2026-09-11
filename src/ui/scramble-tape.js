/**
 * ScrambleTape - Physical Continuous Tape Component for Rubik's Cube Scrambles and Practice
 * 
 * Provides continuous, smooth linear sliding (transform: translate3d) with zero in-place flashes.
 * - Correct move: shifts active pointer forward, slides tape smoothly leftward.
 * - Wrong move: inserts [wrongMove(done, gray), inverseMove(active, highlight)] at head,
 *   smoothly slides tape rightward to push pending moves.
 * - Correcting move: shifts active pointer forward, smoothly slides tape leftward to restore target.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.ScrambleTape = factory().ScrambleTape;
        root.ScrambleTapeModule = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {
    'use strict';

    function getMoveColorClass(move) {
        if (!move) return '';
        const face = move.charAt(0).toUpperCase();
        switch (face) {
            case 'U': return 'move-col-u';
            case 'D': return 'move-col-d';
            case 'R': return 'move-col-r';
            case 'L': return 'move-col-l';
            case 'F': return 'move-col-f';
            case 'B': return 'move-col-b';
            default: return '';
        }
    }

    function getInverseMove(move) {
        if (!move) return '';
        const m = move.trim();
        if (m.endsWith('2')) return m; // 180-degree inverse is itself
        if (m.endsWith("'")) return m.slice(0, -1);
        return m + "'";
    }

    class ScrambleTape {
        constructor(options = {}) {
            this.container = options.container || null;
            this.footerEl = options.footerEl || null;
            this.overallBoxEl = options.overallBoxEl || null;
            this.mode = options.mode || 'scramble'; // 'scramble' | 'practice'
            this.visiblePrev = typeof options.visiblePrev === 'number' ? options.visiblePrev : 1;
            this.visibleNext = typeof options.visibleNext === 'number' ? options.visibleNext : 3;

            this.track = null;
            this.items = [];
            this.rawScramble = '';
            this.originalMoves = [];
            this.activeIdx = 0;
            this.nextId = 0;
            this.currentOffset = 0;
            this.isDeviated = false;

            if (this.container && typeof document !== 'undefined') {
                this._initDOM();
            }
        }

        _initDOM() {
            if (!this.container) return;
            let track = this.container.querySelector('.scramble-reel-track');
            if (!track) {
                const viewport = document.createElement('div');
                viewport.className = 'scramble-carousel-viewport';
                track = document.createElement('div');
                track.className = 'scramble-reel-track';
                viewport.appendChild(track);
                this.container.innerHTML = '';
                this.container.appendChild(viewport);
            }
            this.track = track;
        }

        setScramble(scrambleStr) {
            this.rawScramble = (scrambleStr || '').trim();
            this.originalMoves = this.rawScramble ? this.rawScramble.split(/\s+/).filter(Boolean) : [];
            this.items = [];
            this.activeIdx = 0;
            this.isDeviated = false;
            this.nextId = 0;

            this.items = this.originalMoves.map((m, idx) => ({
                id: ++this.nextId,
                move: m,
                status: idx === 0 ? 'active' : 'pending',
                isOriginal: true,
                origIdx: idx,
                isWrong: false,
                isCorrection: false,
                element: null
            }));

            if (this.track && typeof document !== 'undefined') {
                this._renderAllItems();
                this.align(0, false);
            }
            this._updateFooter();
            this._updateOverallChips();
        }

        _renderAllItems() {
            if (!this.track) return;
            this.track.innerHTML = '';
            this.items.forEach((item, idx) => {
                const el = this._createItemElement(item, idx);
                item.element = el;
                this.track.appendChild(el);
            });
        }

        _createItemElement(item, idx) {
            const el = document.createElement('div');
            el.dataset.itemId = String(item.id);
            this._updateElementClasses(el, item, idx);
            el.innerHTML = this._getItemContent(item);
            return el;
        }

        _getItemContent(item) {
            if (item.isCorrection) {
                return `<span class="step-undo-icon">⟲</span><span class="step-corr-move">${item.move}</span>`;
            }
            return item.move;
        }

        _updateElementClasses(el, item, idx) {
            const colorCls = getMoveColorClass(item.move);
            let cls = `reel-step-item ${colorCls}`;

            if (idx < this.activeIdx) {
                cls += ' step-done';
                if (idx < this.activeIdx - this.visiblePrev) cls += ' step-far step-hidden';
            } else if (idx === this.activeIdx) {
                if (item.isCorrection) {
                    cls += ' step-active step-correction step-rewind';
                } else {
                    cls += ' step-active';
                }
            } else {
                cls += ' step-pending';
                if (idx > this.activeIdx + this.visibleNext) cls += ' step-far step-hidden';
            }

            if (item.isWrong) {
                cls += ' step-wrong';
            }

            el.className = cls;
        }

        onCorrectMove() {
            if (this.activeIdx >= this.items.length) return;

            const completedItem = this.items[this.activeIdx];
            if (completedItem) {
                completedItem.status = 'done';
            }

            this.activeIdx++;

            if (this.activeIdx < this.items.length) {
                this.items[this.activeIdx].status = 'active';
            }

            const hasPendingCorrections = this.items.slice(this.activeIdx).some(it => it.isCorrection);
            if (!hasPendingCorrections) {
                this.isDeviated = false;
            }

            this._refreshDOMStates();
            this.align(this.activeIdx, true);
            this._updateFooter();
            this._updateOverallChips();
        }

        onWrongMove(wrongMove, inverseMove = null) {
            const inv = inverseMove || getInverseMove(wrongMove);
            const wrongItem = {
                id: ++this.nextId,
                move: wrongMove,
                status: 'done',
                isOriginal: false,
                isWrong: true,
                isCorrection: false,
                element: null
            };
            const corrItem = {
                id: ++this.nextId,
                move: inv,
                status: 'active',
                isOriginal: false,
                isWrong: false,
                isCorrection: true,
                element: null
            };

            if (this.activeIdx < this.items.length) {
                this.items[this.activeIdx].status = 'pending';
            }

            // Insert [wrongItem, corrItem] directly before the active slot
            this.items.splice(this.activeIdx, 0, wrongItem, corrItem);

            const targetActiveIdx = this.activeIdx + 1;
            this.activeIdx = targetActiveIdx;
            this.isDeviated = true;

            if (this.track && typeof document !== 'undefined') {
                const refItem = this.items[targetActiveIdx + 1];
                const refEl = (refItem && refItem.element) || null;
                const wrongEl = this._createItemElement(wrongItem, targetActiveIdx - 1);
                const corrEl = this._createItemElement(corrItem, targetActiveIdx);
                wrongItem.element = wrongEl;
                corrItem.element = corrEl;

                if (refEl) {
                    this.track.insertBefore(wrongEl, refEl);
                    this.track.insertBefore(corrEl, refEl);
                } else {
                    this.track.appendChild(wrongEl);
                    this.track.appendChild(corrEl);
                }

                this._refreshDOMStates();
                this.align(this.activeIdx, true);
            }

            this._updateFooter();
            this._updateOverallChips();
        }

        onHalfTurnProgress(face, remaining) {
            const activeItem = this.items[this.activeIdx];
            if (!activeItem || !activeItem.element) return;
            activeItem.element.className = `reel-step-item step-half-active ${getMoveColorClass(activeItem.move)}`;
            activeItem.element.innerHTML = `<span class="step-half-base">${activeItem.move}</span><span class="step-half-guide">再转 ${remaining}</span>`;
        }

        _refreshDOMStates() {
            this.items.forEach((item, idx) => {
                if (item.element) {
                    this._updateElementClasses(item.element, item, idx);
                    item.element.innerHTML = this._getItemContent(item);
                }
            });
        }

        align(activeIdx = this.activeIdx, animate = true) {
            if (!this.track) return;
            const items = this.track.querySelectorAll('.reel-step-item');
            if (!items || items.length === 0) return;

            const clampedIdx = Math.min(Math.max(0, activeIdx), items.length - 1);
            const activeEl = items[clampedIdx];
            if (!activeEl) return;

            const viewport = this.track.parentElement;
            const vpWidth = (viewport && viewport.clientWidth > 0) ? viewport.clientWidth : (window.innerWidth || 360);
            const itemCenter = activeEl.offsetLeft + (activeEl.offsetWidth / 2);
            const targetOffset = Math.round((vpWidth / 2) - itemCenter);

            this.currentOffset = targetOffset;
            this.track.style.setProperty('--track-curr-x', `${targetOffset}px`);

            if (animate) {
                this.track.style.transition = 'transform 0.25s cubic-bezier(0.25, 0.1, 0.25, 1.0)';
            } else {
                this.track.style.transition = 'none';
            }
            this.track.style.transform = `translate3d(${targetOffset}px, 0, 0)`;
        }

        _updateFooter() {
            if (!this.footerEl) return;
            const total = this.originalMoves.length;
            const doneOriginal = this.items.slice(0, this.activeIdx).filter(it => it.isOriginal).length;
            const remaining = Math.max(0, total - doneOriginal);
            const pct = total > 0 ? Math.round((doneOriginal / total) * 100) : 0;
            const statusNote = this.isDeviated
                ? `<span style="color: #EF4444; font-weight: 700;">(纠错中)</span>`
                : `<span style="opacity: 0.65;">(${pct}%)</span>`;

            this.footerEl.innerHTML = `
                <span>已完成 <strong class="progress-highlight">${doneOriginal}</strong> 步</span>
                <span>·</span>
                <span>剩余 <strong class="progress-highlight">${remaining}</strong> 步</span>
                ${statusNote}
                <button class="btn-enter-scramble-fs" title="进入全屏打乱模式 (Fullscreen Scramble)" type="button">全屏</button>
            `;
        }

        _updateOverallChips() {
            if (!this.overallBoxEl) return;
            let chipsHtml = '';
            this.items.forEach((item, idx) => {
                let stCls = 'pending';
                if (idx < this.activeIdx) stCls = 'done';
                else if (idx === this.activeIdx) stCls = 'active';
                const corrCls = item.isCorrection ? 'correction' : '';
                const colorCls = getMoveColorClass(item.move);
                const prefix = item.isCorrection ? '⟲' : '';
                chipsHtml += `<span class="overall-move-chip ${stCls} ${corrCls} ${colorCls}">${prefix}${item.move}</span>`;
            });
            this.overallBoxEl.innerHTML = chipsHtml;
        }

        getActiveMove() {
            const it = this.items[this.activeIdx];
            return it ? it.move : null;
        }

        isComplete() {
            const doneOriginal = this.items.slice(0, this.activeIdx).filter(it => it.isOriginal).length;
            return doneOriginal >= this.originalMoves.length && !this.isDeviated;
        }
    }

    return {
        ScrambleTape,
        getMoveColorClass,
        getInverseMove
    };
}));
