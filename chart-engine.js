/**
 * chart-engine.js
 * High-performance Canvas Charting Engine for Speedcube Analytics
 * Features:
 * - Multi-AoX Trend Curves with Smoothing, Customizable Y-Range (Auto / Auto-Zoom 90% Data / Custom), Hover Tooltips.
 * - Per-Solve Movement Curve with Step/Stage Segmentation Bands, Derivative Delta Bars, TPS Velocity Curve, Editable Styles & Interactive Step Jumping.
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.ChartEngine = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {
    'use strict';

    /**
     * Compute AoX array for a list of solves
     * If solves < X, uses average of all available solves up to that point.
     * When >= X, computes standard speedcubing trimmed average (drop fastest 5% and slowest 5%).
     */
    function computeAoXSeries(solves, x) {
        if (!solves || solves.length === 0 || !x || x < 1) return [];
        const result = [];

        for (let i = 0; i < solves.length; i++) {
            const windowSize = Math.min(i + 1, x);
            const windowSolves = solves.slice(i + 1 - windowSize, i + 1);

            const validTimes = windowSolves
                .map(s => s.finalTimeMs > 0 ? s.finalTimeMs : s.rawTimeMs)
                .filter(t => t > 0);

            if (validTimes.length === 0) {
                result.push(null);
                continue;
            }

            if (windowSize < x || validTimes.length < 3) {
                // If less than X, use arithmetic mean of all available solves
                const sum = validTimes.reduce((acc, t) => acc + t, 0);
                result.push(Math.round(sum / validTimes.length));
            } else {
                // Standard AoX: sort, drop min and max (or 5% trim for large X)
                const sorted = validTimes.slice().sort((a, b) => a - b);
                const trimCount = x >= 20 ? Math.ceil(x * 0.05) : 1;
                const trimmed = sorted.slice(trimCount, sorted.length - trimCount);
                const sum = trimmed.reduce((acc, t) => acc + t, 0);
                result.push(Math.round(sum / trimmed.length));
            }
        }

        return result;
    }

    /**
     * Smooth an array of data points using moving average
     */
    function smoothDataPoints(data, windowSize = 3) {
        if (!data || data.length <= windowSize) return data;
        const smoothed = [];
        const half = Math.floor(windowSize / 2);

        for (let i = 0; i < data.length; i++) {
            if (data[i] == null) {
                smoothed.push(null);
                continue;
            }
            let sum = 0;
            let count = 0;
            for (let w = -half; w <= half; w++) {
                const idx = i + w;
                if (idx >= 0 && idx < data.length && data[idx] != null) {
                    sum += data[idx];
                    count++;
                }
            }
            smoothed.push(count > 0 ? sum / count : data[i]);
        }
        return smoothed;
    }

    /**
     * Trend Chart Renderer (Historical Solves & Multi-AoX Trends)
     */
    class TrendChart {
        constructor(canvasElement, options = {}) {
            this.canvas = canvasElement;
            this.ctx = canvasElement.getContext('2d');
            this.options = Object.assign({
                padding: { top: 25, right: 30, bottom: 35, left: 55 },
                customX: 25,
                enableSmoothing: true,
                yRangeMode: 'auto90', // 'auto90' (keep 90% in view), 'auto' (full range), 'custom' (manual bounds)
                customMinY: null,     // in ms
                customMaxY: null,     // in ms
                seriesConfig: [
                    { id: 'raw', name: 'Raw Solve', color: '#6B7280', width: 1.5, opacity: 0.5, enabled: true },
                    { id: 'ao5', name: 'Ao5', color: '#10B981', width: 2.2, opacity: 0.9, enabled: true },
                    { id: 'ao12', name: 'Ao12', color: '#3B82F6', width: 2.2, opacity: 0.9, enabled: true },
                    { id: 'aox', name: 'AoX (Custom)', color: '#F59E0B', width: 2.8, opacity: 1.0, enabled: true }
                ]
            }, options);

            this.solves = [];
            this.hoverIndex = -1;
            this.initResize();
            this.bindEvents();
        }

        initResize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = this.canvas.getBoundingClientRect();
            const w = rect.width || this.canvas.clientWidth || 600;
            const h = rect.height || this.canvas.clientHeight || 300;
            this.canvas.width = Math.round(w * dpr);
            this.canvas.height = Math.round(h * dpr);
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            this.ctx.scale(dpr, dpr);
            this.width = w;
            this.height = h;
        }

        bindEvents() {
            const handleHover = (e) => {
                if (!this.solves || this.solves.length === 0) return;
                const rect = this.canvas.getBoundingClientRect();
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const x = clientX - rect.left;
                const pad = this.options.padding;
                const plotW = this.width - pad.left - pad.right;
                const n = this.solves.length;

                if (x >= pad.left && x <= this.width - pad.right) {
                    const idx = Math.round(((x - pad.left) / plotW) * (n - 1));
                    this.hoverIndex = Math.max(0, Math.min(n - 1, idx));
                } else {
                    this.hoverIndex = -1;
                }
                this.render();
            };

            this.canvas.addEventListener('mousemove', handleHover);
            this.canvas.addEventListener('touchmove', handleHover, { passive: true });
            this.canvas.addEventListener('mouseleave', () => {
                this.hoverIndex = -1;
                this.render();
            });
            this.canvas.addEventListener('touchend', () => {
                this.hoverIndex = -1;
                this.render();
            });
        }

        setData(solves) {
            this.solves = solves || [];
            this.render();
        }

        setYRangeMode(mode, minMs = null, maxMs = null) {
            this.options.yRangeMode = mode;
            if (minMs != null) this.options.customMinY = minMs;
            if (maxMs != null) this.options.customMaxY = maxMs;
            this.render();
        }

        render() {
            this.initResize();
            const ctx = this.ctx;
            const w = this.width;
            const h = this.height;
            const pad = this.options.padding;

            ctx.clearRect(0, 0, w, h);

            if (this.solves.length === 0) {
                ctx.fillStyle = '#6B7280';
                ctx.font = '13px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('No solve data available yet. Complete solves to see trend curves!', w / 2, h / 2);
                return;
            }

            // 1. Calculate series data
            const rawTimes = this.solves.map(s => s.finalTimeMs > 0 ? s.finalTimeMs : s.rawTimeMs);
            const ao5Series = computeAoXSeries(this.solves, 5);
            const ao12Series = computeAoXSeries(this.solves, 12);
            const aoxSeries = computeAoXSeries(this.solves, this.options.customX || 25);

            // Collect all valid points for scaling
            const allValid = [
                ...rawTimes.filter(t => t > 0),
                ...ao5Series.filter(t => t != null),
                ...ao12Series.filter(t => t != null),
                ...aoxSeries.filter(t => t != null)
            ];

            if (allValid.length === 0) return;

            let minVal = 0;
            let maxVal = 10000;

            if (this.options.yRangeMode === 'custom' && this.options.customMinY != null && this.options.customMaxY != null) {
                // User manual custom range
                minVal = Math.max(0, this.options.customMinY);
                maxVal = Math.max(minVal + 1000, this.options.customMaxY);
            } else if (this.options.yRangeMode === 'auto90' && allValid.length >= 5) {
                // Auto Zoom-in Y to keep 90% of data in view (5th to 95th percentile)
                const sorted = allValid.slice().sort((a, b) => a - b);
                const p5Index = Math.floor(sorted.length * 0.05);
                const p95Index = Math.min(sorted.length - 1, Math.ceil(sorted.length * 0.95));
                const p5 = sorted[p5Index];
                const p95 = sorted[p95Index];
                minVal = Math.max(0, Math.floor(p5 * 0.92));
                maxVal = Math.ceil(p95 * 1.08);
            } else {
                // Standard Auto (Full Range)
                minVal = Math.max(0, Math.min(...allValid) * 0.85);
                maxVal = Math.max(...allValid) * 1.15 || 10000;
            }

            const plotW = w - pad.left - pad.right;
            const plotH = h - pad.top - pad.bottom;
            const n = this.solves.length;

            const getX = (idx) => pad.left + (n === 1 ? plotW / 2 : (idx / (n - 1)) * plotW);
            const getY = (val) => {
                const clamped = Math.max(minVal, Math.min(maxVal, val));
                return pad.top + plotH - ((clamped - minVal) / Math.max(1, maxVal - minVal)) * plotH;
            };

            // 2. Draw Grid Lines & Y-Axis Labels
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
            ctx.lineWidth = 1;
            ctx.fillStyle = '#9CA3AF';
            ctx.font = '10px JetBrains Mono, monospace';
            ctx.textAlign = 'right';

            const gridSteps = 5;
            for (let i = 0; i <= gridSteps; i++) {
                const val = minVal + (i / gridSteps) * (maxVal - minVal);
                const y = pad.top + plotH - (i / gridSteps) * plotH;
                ctx.beginPath();
                ctx.moveTo(pad.left, y);
                ctx.lineTo(w - pad.right, y);
                ctx.stroke();
                ctx.fillText((val / 1000).toFixed(1) + 's', pad.left - 8, y + 3.5);
            }

            // Draw Y-Axis Range Badge Mode
            ctx.fillStyle = '#646A7E';
            ctx.font = '9px Inter, sans-serif';
            ctx.textAlign = 'left';
            const modeText = this.options.yRangeMode === 'auto90'
                ? 'Auto-Zoom (90% in View)'
                : (this.options.yRangeMode === 'custom' ? 'Custom Range' : 'Full Range');
            ctx.fillText(modeText, pad.left, pad.top - 10);

            // 3. Render Series Curves
            const seriesMap = {
                'raw': { data: rawTimes, cfg: this.options.seriesConfig[0] },
                'ao5': { data: this.options.enableSmoothing ? smoothDataPoints(ao5Series) : ao5Series, cfg: this.options.seriesConfig[1] },
                'ao12': { data: this.options.enableSmoothing ? smoothDataPoints(ao12Series) : ao12Series, cfg: this.options.seriesConfig[2] },
                'aox': { data: this.options.enableSmoothing ? smoothDataPoints(aoxSeries) : aoxSeries, cfg: this.options.seriesConfig[3] }
            };

            Object.keys(seriesMap).forEach(key => {
                const { data, cfg } = seriesMap[key];
                if (!cfg || !cfg.enabled || data.length === 0) return;

                ctx.save();
                ctx.strokeStyle = cfg.color;
                ctx.lineWidth = cfg.width;
                ctx.globalAlpha = cfg.opacity;
                ctx.beginPath();

                let started = false;
                for (let i = 0; i < data.length; i++) {
                    const val = data[i];
                    if (val == null) continue;
                    const x = getX(i);
                    const y = getY(val);
                    if (!started) {
                        ctx.moveTo(x, y);
                        started = true;
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();

                // Draw dots on raw points if small dataset
                if (key === 'raw' && n <= 40) {
                    ctx.fillStyle = cfg.color;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i] != null) {
                            ctx.beginPath();
                            ctx.arc(getX(i), getY(data[i]), 3, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                }
                ctx.restore();
            });

            // 4. Hover Crosshair & Tooltip Pill
            if (this.hoverIndex >= 0 && this.hoverIndex < n) {
                const hIdx = this.hoverIndex;
                const hx = getX(hIdx);
                const solve = this.solves[hIdx];
                const rawT = rawTimes[hIdx];

                ctx.save();
                ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.moveTo(hx, pad.top);
                ctx.lineTo(hx, pad.top + plotH);
                ctx.stroke();

                // Draw point circle
                if (rawT != null) {
                    const hy = getY(rawT);
                    ctx.fillStyle = '#F59E0B';
                    ctx.beginPath();
                    ctx.arc(hx, hy, 5, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Render Tooltip Box
                const ao5Val = ao5Series[hIdx] != null ? (ao5Series[hIdx] / 1000).toFixed(2) + 's' : '--';
                const aoxVal = aoxSeries[hIdx] != null ? (aoxSeries[hIdx] / 1000).toFixed(2) + 's' : '--';
                const timeText = solve.formattedTime || (rawT ? (rawT / 1000).toFixed(2) + 's' : '--');
                const labelText = `#${hIdx + 1}: ${timeText} | Ao5: ${ao5Val} | Ao${this.options.customX || 25}: ${aoxVal}`;

                ctx.font = '11px JetBrains Mono, monospace';
                const textWidth = ctx.measureText(labelText).width;
                const tipW = textWidth + 16;
                const tipH = 24;
                let tipX = hx - tipW / 2;
                if (tipX < pad.left) tipX = pad.left;
                if (tipX + tipW > w - pad.right) tipX = w - pad.right - tipW;
                const tipY = pad.top + 4;

                ctx.fillStyle = 'rgba(22, 24, 31, 0.92)';
                ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.roundRect ? ctx.roundRect(tipX, tipY, tipW, tipH, 4) : ctx.rect(tipX, tipY, tipW, tipH);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = '#F4F4F6';
                ctx.textAlign = 'center';
                ctx.fillText(labelText, tipX + tipW / 2, tipY + 16);
                ctx.restore();
            }

            // 5. X-axis labels
            ctx.fillStyle = '#9CA3AF';
            ctx.font = '10px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Solve 1', pad.left, pad.top + plotH + 18);
            ctx.fillText(`Solve ${n}`, w - pad.right, pad.top + plotH + 18);
        }
    }

    /**
     * Per-Solve Movement Curve & Derivative (TPS & Pause Breakdown, Stage Segmentation, Editable Series)
     */
    class SolveMovementChart {
        constructor(canvasElement, options = {}) {
            this.canvas = canvasElement;
            this.ctx = canvasElement.getContext('2d');
            this.options = Object.assign({
                padding: { top: 46, right: 14, bottom: 24, left: 32 },
                highlightStep: -1,
                cumulativeCurve: { enabled: true, color: '#10B981', width: 2.5, opacity: 1.0 },
                derivativeBars: { enabled: true, color: 'rgba(59, 130, 246, 0.35)', activeColor: '#F59E0B' },
                tpsCurve: { enabled: true, color: '#06B6D4', width: 2.0, opacity: 0.85 },
                showStageBands: true,
                showStageDividers: true,
                showStageLabels: true,
                stages: [],
                overlaySolves: [],
                onStepClick: null
            }, options);

            this.solve = null;
            this.stages = [];
            this.initResize();
            this.bindEvents();
        }

        initResize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = this.canvas.getBoundingClientRect();
            const w = rect.width || this.canvas.clientWidth || 500;
            const h = rect.height || this.canvas.clientHeight || 240;
            this.canvas.width = Math.round(w * dpr);
            this.canvas.height = Math.round(h * dpr);
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            this.ctx.scale(dpr, dpr);
            this.width = w;
            this.height = h;
        }

        bindEvents() {
            const handleClick = (e) => {
                if (!this.solve || !this.solve.moves || this.solve.moves.length === 0) return;
                const rect = this.canvas.getBoundingClientRect();
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const x = clientX - rect.left;
                const pad = this.options.padding;
                const plotW = this.width - pad.left - pad.right;
                const n = this.solve.moves.length;

                if (x >= pad.left - 10 && x <= this.width - pad.right + 10) {
                    const stepIdx = Math.round(((x - pad.left) / plotW) * (n - 1));
                    const clamped = Math.max(0, Math.min(n - 1, stepIdx));
                    if (typeof this.options.onStepClick === 'function') {
                        this.options.onStepClick(clamped + 1);
                    }
                }
            };

            this.canvas.addEventListener('click', handleClick);
            this.canvas.addEventListener('touchstart', handleClick, { passive: true });
        }

        setSolve(solve, highlightStep = -1, overlaySolves = []) {
            this.solve = solve;
            this.options.highlightStep = highlightStep;
            if (overlaySolves !== undefined) {
                this.options.overlaySolves = overlaySolves || [];
            }
            this.render();
        }

        setStages(stages) {
            this.stages = stages || [];
            this.render();
        }

        setCurveConfig(cfg) {
            if (!cfg) return;
            for (const key of Object.keys(cfg)) {
                if (typeof cfg[key] === 'object' && cfg[key] !== null && !Array.isArray(cfg[key]) && typeof this.options[key] === 'object') {
                    Object.assign(this.options[key], cfg[key]);
                } else {
                    this.options[key] = cfg[key];
                }
            }
            this.render();
        }

        render() {
            this.initResize();
            const ctx = this.ctx;
            const w = this.width;
            const h = this.height;
            const pad = this.options.padding;

            ctx.clearRect(0, 0, w, h);

            if (!this.solve || !this.solve.moves || this.solve.moves.length === 0) {
                ctx.fillStyle = '#6B7280';
                ctx.font = '12px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('No move telemetry logged for this solve.', w / 2, h / 2);
                return;
            }

            const moves = this.solve.moves;
            const n = moves.length;
            const plotW = w - pad.left - pad.right;
            const plotH = h - pad.top - pad.bottom;

            const maxTime = moves[n - 1].calibratedElapsedMs || moves[n - 1].elapsedMs || 1000;
            const maxDelta = Math.max(...moves.map(m => m.deltaMs || 300), 800);

            const getX = (idx) => pad.left + (n === 1 ? plotW / 2 : (idx / Math.max(1, n - 1)) * plotW);
            const getY = (timeMs) => pad.top + plotH - (timeMs / maxTime) * (plotH * 0.75);

            // 1. Stage Segmentation Background Bands, Dividers, and Staggered Anti-Collision Embedded Metrics
            const stages = (this.stages && this.stages.length > 0) ? this.stages : (this.options.stages || []);
            if (this.options.showStageBands && stages.length > 0) {
                // Pre-calculate band dimensions and layout coordinates
                const stageLayout = stages.map((stg, sIdx) => {
                    const startX = getX(stg.startIdx);
                    const endX = stg.endIdx >= n - 1 ? (w - pad.right) : getX(stg.endIdx + 0.5);
                    const bandW = Math.max(4, endX - startX);
                    const anchorX = startX + bandW / 2;
                    const stgColor = stg.color || '#3B82F6';
                    const moveCount = stg.moveCount !== undefined ? stg.moveCount : (stg.endIdx - stg.startIdx + 1);
                    const timeVal = stg.durationMs ? (stg.durationMs / 1000).toFixed(2) : (stg.durationFormatted ? stg.durationFormatted.replace('s', '') : '0.00');
                    const tpsVal = stg.tps !== undefined ? Number(stg.tps).toFixed(1) : (stg.durationMs > 0 ? (moveCount / (stg.durationMs / 1000)).toFixed(1) : '0.0');
                    return {
                        stg,
                        sIdx,
                        startX,
                        endX,
                        bandW,
                        anchorX,
                        stgColor,
                        timeVal,
                        tpsVal,
                        tier: 0,
                        pillX: 0,
                        pillW: 0
                    };
                });

                // A. Background fills and vertical dividers
                stageLayout.forEach((item, sIdx) => {
                    ctx.save();
                    ctx.fillStyle = item.stgColor;
                    ctx.globalAlpha = 0.12;
                    ctx.fillRect(item.startX, pad.top, item.bandW, plotH);
                    ctx.restore();

                    if (this.options.showStageDividers && sIdx > 0) {
                        ctx.save();
                        ctx.strokeStyle = item.stgColor;
                        ctx.lineWidth = 1.2;
                        ctx.setLineDash([4, 4]);
                        ctx.globalAlpha = 0.55;
                        ctx.beginPath();
                        ctx.moveTo(item.startX, pad.top);
                        ctx.lineTo(item.startX, pad.top + plotH);
                        ctx.stroke();
                        ctx.restore();
                    }
                });

                // B. Smart Staggered Multi-Tier Anti-Collision Badge Placement (Only Time & TPS, no units, high contrast)
                if (this.options.showStageLabels) {
                    const badgeH = 18;
                    const tierY = [
                        pad.top - badgeH * 2 - 4, // Tier 0 (Top): pad.top - 40
                        pad.top - badgeH - 2      // Tier 1 (Bottom): pad.top - 20
                    ];

                    // Check for narrow or crowded stages and assign alternating tiers
                    let needsStagger = stageLayout.some(item => item.bandW < 48);
                    if (stageLayout.length > 4) needsStagger = true;

                    stageLayout.forEach((item, i) => {
                        item.tier = needsStagger ? (i % 2) : 0;
                        item.pillW = 46;
                        item.pillX = item.anchorX - item.pillW / 2;

                        // Clamp pillX within chart horizontal viewport bounds
                        if (item.pillX < pad.left) item.pillX = pad.left;
                        if (item.pillX + item.pillW > w - pad.right) item.pillX = w - pad.right - item.pillW;
                    });

                    // Resolve horizontal overlap within the same tier
                    [0, 1].forEach(t => {
                        const tierItems = stageLayout.filter(item => item.tier === t);
                        for (let i = 1; i < tierItems.length; i++) {
                            const prev = tierItems[i - 1];
                            const curr = tierItems[i];
                            const overlap = (prev.pillX + prev.pillW + 2) - curr.pillX;
                            if (overlap > 0) {
                                curr.pillX += overlap;
                                if (curr.pillX + curr.pillW > w - pad.right) {
                                    curr.pillX = w - pad.right - curr.pillW;
                                    prev.pillX = Math.max(pad.left, curr.pillX - prev.pillW - 2);
                                }
                            }
                        }
                    });

                    // Render badges with guide lines for displaced/fast stages
                    stageLayout.forEach(item => {
                        const y = tierY[item.tier];
                        const pillCenterX = item.pillX + item.pillW / 2;

                        // Draw leader connector line from badge to actual stage band if displaced or narrow
                        const isDisplaced = Math.abs(pillCenterX - item.anchorX) > 4 || item.bandW < 32 || item.tier === 0;
                        if (isDisplaced) {
                            ctx.save();
                            ctx.strokeStyle = item.stgColor;
                            ctx.fillStyle = item.stgColor;
                            ctx.lineWidth = 1;
                            ctx.globalAlpha = 0.55;
                            ctx.beginPath();
                            ctx.moveTo(pillCenterX, y + badgeH);
                            ctx.lineTo(item.anchorX, pad.top);
                            ctx.stroke();

                            // Small anchor point dot at stage start
                            ctx.beginPath();
                            ctx.arc(item.anchorX, pad.top, 2, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.restore();
                        }

                        // High-Contrast Dark Glass Pill Background (Fixes light background contrast)
                        ctx.save();
                        ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
                        if (typeof ctx.roundRect === 'function') {
                            ctx.beginPath();
                            ctx.roundRect(item.pillX, y, item.pillW, badgeH, 4);
                            ctx.fill();
                        } else {
                            ctx.fillRect(item.pillX, y, item.pillW, badgeH);
                        }

                        ctx.strokeStyle = item.stgColor;
                        ctx.globalAlpha = 0.85;
                        ctx.lineWidth = 1.2;
                        if (typeof ctx.roundRect === 'function') {
                            ctx.beginPath();
                            ctx.roundRect(item.pillX, y, item.pillW, badgeH, 4);
                            ctx.stroke();
                        } else {
                            ctx.strokeRect(item.pillX, y, item.pillW, badgeH);
                        }
                        ctx.restore();

                        // Pure High-Contrast Numeric Text: [Time] · [TPS] (No stage name, no units)
                        ctx.save();
                        ctx.textAlign = 'center';
                        ctx.font = 'bold 8.5px JetBrains Mono, monospace';
                        ctx.fillStyle = '#FFFFFF';
                        ctx.fillText(`${item.timeVal} · ${item.tpsVal}`, pillCenterX, y + 12.5);
                        ctx.restore();
                    });
                }
            }

            // 2. Axes & Grid
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pad.left, pad.top + plotH);
            ctx.lineTo(w - pad.right, pad.top + plotH);
            ctx.stroke();

            // 3. Step Derivative Bars (Delta duration / pause time per move)
            if (this.options.derivativeBars && this.options.derivativeBars.enabled) {
                moves.forEach((m, idx) => {
                    const delta = m.deltaMs || 250;
                    const barH = (delta / maxDelta) * (plotH * 0.45);
                    const x = getX(idx);
                    const barW = Math.max(2, (plotW / n) * 0.7);

                    const isActive = (idx === this.options.highlightStep);
                    ctx.fillStyle = isActive
                        ? (this.options.derivativeBars.activeColor || '#F59E0B')
                        : (this.options.derivativeBars.color || 'rgba(59, 130, 246, 0.35)');
                    ctx.fillRect(x - barW / 2, pad.top + plotH - barH, barW, barH);
                });
            }

            // 4. Overlay Comparison Solves (Requirement: Editable & Multi-Overlay)
            if (this.options.overlaySolves && this.options.overlaySolves.length > 0) {
                this.options.overlaySolves.forEach((otherSolve, sIdx) => {
                    if (!otherSolve || !otherSolve.moves || otherSolve.moves.length === 0) return;
                    const oMoves = otherSolve.moves;
                    const oMaxTime = oMoves[oMoves.length - 1].elapsedMs || 1;
                    const colors = ['#EC4899', '#8B5CF6', '#F59E0B'];

                    ctx.save();
                    ctx.strokeStyle = colors[sIdx % colors.length];
                    ctx.lineWidth = 1.8;
                    ctx.globalAlpha = 0.55;
                    ctx.beginPath();
                    oMoves.forEach((om, oIdx) => {
                        const ox = pad.left + (oIdx / Math.max(1, oMoves.length - 1)) * plotW;
                        const oy = pad.top + plotH - (om.elapsedMs / oMaxTime) * (plotH * 0.75);
                        if (oIdx === 0) ctx.moveTo(ox, oy);
                        else ctx.lineTo(ox, oy);
                    });
                    ctx.stroke();
                    ctx.restore();
                });
            }

            // 5. TPS Velocity Trend Curve (Optional editable layer)
            if (this.options.tpsCurve && this.options.tpsCurve.enabled) {
                ctx.save();
                ctx.strokeStyle = this.options.tpsCurve.color || '#06B6D4';
                ctx.lineWidth = this.options.tpsCurve.width || 2.0;
                ctx.globalAlpha = this.options.tpsCurve.opacity || 0.85;
                ctx.beginPath();
                moves.forEach((m, idx) => {
                    const instantTps = m.deltaMs > 0 ? Math.min(12, 1000 / m.deltaMs) : 0;
                    const tx = getX(idx);
                    const ty = pad.top + plotH - (instantTps / 12) * (plotH * 0.75);
                    if (idx === 0) ctx.moveTo(tx, ty);
                    else ctx.lineTo(tx, ty);
                });
                ctx.stroke();
                ctx.restore();
            }

            // 6. Main Cumulative Solve Curve
            if (this.options.cumulativeCurve && this.options.cumulativeCurve.enabled) {
                ctx.save();
                ctx.strokeStyle = this.options.cumulativeCurve.color || '#10B981';
                ctx.lineWidth = this.options.cumulativeCurve.width || 2.5;
                ctx.globalAlpha = this.options.cumulativeCurve.opacity || 1.0;
                ctx.beginPath();
                moves.forEach((m, idx) => {
                    const t = m.calibratedElapsedMs || m.elapsedMs || 0;
                    const x = getX(idx);
                    const y = getY(t);
                    if (idx === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                });
                ctx.stroke();
                ctx.restore();
            }

            // 7. Highlight Marker Line & Step Dot
            if (this.options.highlightStep >= 0 && this.options.highlightStep < n) {
                const hx = getX(this.options.highlightStep);
                ctx.save();
                ctx.setLineDash([4, 4]);
                ctx.strokeStyle = '#F59E0B';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(hx, pad.top);
                ctx.lineTo(hx, pad.top + plotH);
                ctx.stroke();

                // Step Dot
                const ht = moves[this.options.highlightStep].calibratedElapsedMs || moves[this.options.highlightStep].elapsedMs || 0;
                const hy = getY(ht);
                ctx.fillStyle = '#F59E0B';
                ctx.beginPath();
                ctx.arc(hx, hy, 5, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            // 8. Axis & Legend Text
            ctx.fillStyle = '#9CA3AF';
            ctx.font = '9px JetBrains Mono, monospace';
            ctx.textAlign = 'left';
            ctx.fillText('1', pad.left, pad.top + plotH + 14);
            ctx.textAlign = 'right';
            ctx.fillText(`${n} moves`, w - pad.right, pad.top + plotH + 14);
            ctx.fillText((maxTime / 1000).toFixed(1) + 's', pad.left - 4, pad.top + 10);
        }
    }

    return {
        computeAoXSeries,
        smoothDataPoints,
        TrendChart,
        SolveMovementChart
    };
}));
