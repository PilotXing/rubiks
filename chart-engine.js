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
            this.zoomRange = { start: 0, end: 1 };
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
            let initialPinchDistance = 0;
            let initialZoom = { start: 0, end: 1 };
            let isPanning = false;
            let panStartX = 0;
            let panStartZoom = { start: 0, end: 1 };

            const handleHover = (e) => {
                if (!this.solves || this.solves.length === 0) return;
                const rect = this.canvas.getBoundingClientRect();
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const x = clientX - rect.left;
                const pad = this.options.padding;
                const plotW = this.width - pad.left - pad.right;
                const n = this.solves.length;

                const startIdx = Math.floor(this.zoomRange.start * (n - 1));
                const endIdx = Math.min(n - 1, Math.ceil(this.zoomRange.end * (n - 1)));
                const visibleCount = Math.max(1, endIdx - startIdx + 1);

                if (x >= pad.left && x <= this.width - pad.right) {
                    const localIdx = Math.round(((x - pad.left) / plotW) * (visibleCount - 1));
                    this.hoverIndex = Math.max(startIdx, Math.min(endIdx, startIdx + localIdx));
                } else {
                    this.hoverIndex = -1;
                }
                this.render();
            };

            this.canvas.addEventListener('mousemove', handleHover);
            this.canvas.addEventListener('mouseleave', () => {
                this.hoverIndex = -1;
                this.render();
            });

            // Touch Gestures: 1-finger hover/pan, 2-finger pinch-to-zoom
            this.canvas.addEventListener('touchstart', (e) => {
                if (e.touches.length === 2) {
                    isPanning = false;
                    const x1 = e.touches[0].clientX;
                    const y1 = e.touches[0].clientY;
                    const x2 = e.touches[1].clientX;
                    const y2 = e.touches[1].clientY;
                    initialPinchDistance = Math.hypot(x2 - x1, y2 - y1);
                    initialZoom = { ...this.zoomRange };
                } else if (e.touches.length === 1) {
                    if (this.zoomRange.start > 0.001 || this.zoomRange.end < 0.999) {
                        isPanning = true;
                        panStartX = e.touches[0].clientX;
                        panStartZoom = { ...this.zoomRange };
                    }
                    handleHover(e);
                }
            }, { passive: true });

            this.canvas.addEventListener('touchmove', (e) => {
                if (e.touches.length === 2 && initialPinchDistance > 0) {
                    e.preventDefault();
                    const x1 = e.touches[0].clientX;
                    const y1 = e.touches[0].clientY;
                    const x2 = e.touches[1].clientX;
                    const y2 = e.touches[1].clientY;
                    const currentDistance = Math.hypot(x2 - x1, y2 - y1);
                    const scale = initialPinchDistance / Math.max(10, currentDistance);

                    const initialSpan = initialZoom.end - initialZoom.start;
                    const newSpan = Math.max(0.08, Math.min(1.0, initialSpan * scale));
                    const center = (initialZoom.start + initialZoom.end) / 2;

                    let newStart = center - newSpan / 2;
                    let newEnd = center + newSpan / 2;
                    if (newStart < 0) { newEnd += -newStart; newStart = 0; }
                    if (newEnd > 1) { newStart -= (newEnd - 1); newEnd = 1; }

                    this.zoomRange.start = Math.max(0, newStart);
                    this.zoomRange.end = Math.min(1, newEnd);
                    this.render();
                } else if (e.touches.length === 1 && isPanning) {
                    e.preventDefault();
                    const rect = this.canvas.getBoundingClientRect();
                    const plotW = this.width - this.options.padding.left - this.options.padding.right;
                    const deltaPx = e.touches[0].clientX - panStartX;
                    const deltaRatio = - (deltaPx / plotW) * (panStartZoom.end - panStartZoom.start);

                    let newStart = panStartZoom.start + deltaRatio;
                    let newEnd = panStartZoom.end + deltaRatio;
                    const span = panStartZoom.end - panStartZoom.start;

                    if (newStart < 0) { newStart = 0; newEnd = span; }
                    if (newEnd > 1) { newEnd = 1; newStart = 1 - span; }

                    this.zoomRange.start = Math.max(0, newStart);
                    this.zoomRange.end = Math.min(1, newEnd);
                    this.render();
                } else if (e.touches.length === 1) {
                    handleHover(e);
                }
            }, { passive: false });

            this.canvas.addEventListener('touchend', () => {
                isPanning = false;
                initialPinchDistance = 0;
                this.hoverIndex = -1;
                this.render();
            });

            this.canvas.addEventListener('dblclick', () => {
                this.zoomRange = { start: 0, end: 1 };
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

            const startIdx = Math.floor(this.zoomRange.start * (n - 1));
            const endIdx = Math.min(n - 1, Math.ceil(this.zoomRange.end * (n - 1)));
            const visibleSpan = Math.max(1, endIdx - startIdx);

            const getX = (idx) => pad.left + (visibleSpan === 0 ? plotW / 2 : ((idx - startIdx) / visibleSpan) * plotW);
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

            // Draw Y-Axis Range Badge Mode & Zoom Indicator
            ctx.fillStyle = '#646A7E';
            ctx.font = '9px Inter, sans-serif';
            ctx.textAlign = 'left';
            let modeText = this.options.yRangeMode === 'auto90'
                ? 'Auto-Zoom (90% in View)'
                : (this.options.yRangeMode === 'custom' ? 'Custom Range' : 'Full Range');
            if (this.zoomRange.start > 0.001 || this.zoomRange.end < 0.999) {
                modeText += ` | Zoom: #${startIdx + 1}~#${endIdx + 1} (${Math.round((endIdx - startIdx + 1) / n * 100)}%) - 双击复原`;
            }
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
                for (let i = startIdx; i <= endIdx; i++) {
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

                // Draw dots on raw points if small dataset or zoomed in
                if (key === 'raw' && (visibleSpan <= 40)) {
                    ctx.fillStyle = cfg.color;
                    for (let i = startIdx; i <= endIdx; i++) {
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

            // 5. X-axis labels with zoom support
            ctx.fillStyle = '#9CA3AF';
            ctx.font = '10px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`#${startIdx + 1}`, pad.left, pad.top + plotH + 18);
            if (visibleSpan >= 2) {
                const midIdx = startIdx + Math.round(visibleSpan / 2);
                ctx.fillText(`#${midIdx + 1}`, getX(midIdx), pad.top + plotH + 18);
            }
            ctx.fillText(`#${endIdx + 1}`, w - pad.right, pad.top + plotH + 18);
        }
    }

    /**
     * Per-Solve Movement Curve & Derivative using Apache ECharts
     * (TPS & Pause Breakdown, Stage Segmentation, Dual Y-Axes, Magnetic Tooltip)
     */
    class SolveMovementChart {
        constructor(domElement, options = {}) {
            // Handle canvas or div seamlessly
            if (domElement && domElement.tagName === 'CANVAS') {
                const parent = domElement.parentElement;
                const div = document.createElement('div');
                div.id = domElement.id;
                div.className = domElement.className;
                div.style.width = '100%';
                div.style.height = (domElement.clientHeight || 250) + 'px';
                div.style.position = 'relative';
                parent.replaceChild(div, domElement);
                this.dom = div;
            } else {
                this.dom = domElement;
            }

            this.options = Object.assign({
                cumulativeCurve: { enabled: true, color: '#10B981', width: 2.8 },
                derivativeBars: { enabled: true, color: 'rgba(59, 130, 246, 0.4)' },
                tpsCurve: { enabled: true, color: '#06B6D4', width: 2.2 },
                tpsSmoothingWindow: 5,
                showStageBands: true,
                showStageDividers: true,
                showStageLabels: true,
                stages: [],
                overlaySolves: [],
                onStepClick: null
            }, options);

            this.solve = null;
            this.stages = [];
            this.chart = null;

            this.initChart();
            this.bindResize();
        }

        initChart() {
            if (!this.dom || typeof echarts === 'undefined') return;
            if (this.chart) {
                try { this.chart.dispose(); } catch (e) {}
            }
            this.chart = echarts.init(this.dom, null, { renderer: 'canvas' });
            if (typeof this.options.onStepClick === 'function') {
                this.chart.on('click', (params) => {
                    if (params && params.dataIndex !== undefined) {
                        this.options.onStepClick(params.dataIndex + 1);
                    }
                });
            }
        }

        resize() {
            if (this.chart && this.dom && this.dom.clientWidth > 0) {
                this.chart.resize();
            }
        }

        bindResize() {
            const handleResize = () => {
                if (this.chart && this.dom && this.dom.clientWidth > 0) {
                    this.chart.resize();
                }
            };

            window.addEventListener('resize', handleResize);

            if (typeof ResizeObserver !== 'undefined' && this.dom) {
                this.resizeObserver = new ResizeObserver((entries) => {
                    for (const entry of entries) {
                        if (entry.contentRect && entry.contentRect.width > 0) {
                            if (this.chart) {
                                this.chart.resize();
                            }
                        }
                    }
                });
                this.resizeObserver.observe(this.dom);
                if (this.dom.parentElement) {
                    this.resizeObserver.observe(this.dom.parentElement);
                }
            }
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

        setSmoothingWindow(windowSize) {
            this.options.tpsSmoothingWindow = Math.max(1, parseInt(windowSize, 10) || 5);
            if (this.solve) {
                this.render();
            }
        }

        static calculateSmoothedTps(moves, smoothingWindow = 5) {
            if (!moves || moves.length === 0) return [];
            const n = moves.length;
            const w = Math.max(1, smoothingWindow || 5);
            const radius = Math.floor(w / 2);
            // Gaussian standard deviation: controls bell curve falloff around current move
            const sigma = Math.max(0.75, radius / 1.5);
            const twoSigmaSq = 2 * sigma * sigma;

            // Step 0 has no preceding move in the solve (elapsedMs = 0, deltaMs = 0).
            // Estimate its realistic physical duration from the first valid subsequent moves to prevent a 0ms spike.
            const validDeltas = moves.slice(1, 5).map(m => m.deltaMs).filter(d => typeof d === 'number' && d >= 40);
            let initialPaceMs = 240;
            if (validDeltas.length > 0) {
                const avgDelta = validDeltas.reduce((a, b) => a + b, 0) / validDeltas.length;
                initialPaceMs = Math.max(100, Math.min(500, Math.round(avgDelta)));
            }

            const smoothedData = moves.map((m, i) => {
                const s = Math.max(0, i - radius);
                const e = Math.min(n - 1, i + radius);

                let sumWeight = 0;
                let sumWeightedTimeSec = 0;

                for (let j = s; j <= e; j++) {
                    const dist = j - i;
                    const weight = Math.exp(- (dist * dist) / twoSigmaSq);
                    let deltaMs = moves[j].deltaMs;
                    // If move is Step 0 or invalid delta, use realistic initial turning pace
                    if (j === 0 || deltaMs === undefined || deltaMs === null || isNaN(deltaMs) || deltaMs <= 0) {
                        deltaMs = initialPaceMs;
                    }
                    // BLE packet jitter & batching guard: clamp single-move deltaMs to min 40ms
                    const effectiveDeltaMs = Math.max(40, deltaMs);
                    const deltaSec = effectiveDeltaMs / 1000;

                    sumWeight += weight;
                    sumWeightedTimeSec += weight * deltaSec;
                }

                if (sumWeightedTimeSec <= 0.001) return 0;
                // Physical rate = effective moves count / effective time in seconds
                const tps = sumWeight / sumWeightedTimeSec;
                // Human speedcubing physical ceiling clamping (18.0 TPS)
                const clampedTps = Math.min(18.0, Math.max(0, tps));
                return Number(clampedTps.toFixed(2));
            });

            // Boundary smoothing constraint:
            // Step 0 is literally 1 turn; solver cannot be turning faster before making move 2 than between moves 1 and 2.
            if (smoothedData.length > 1 && smoothedData[0] > smoothedData[1]) {
                smoothedData[0] = smoothedData[1];
            }

            return smoothedData;
        }

        render() {
            if (!this.chart) {
                this.initChart();
            }
            if (!this.chart) return;

            if (this.dom && this.dom.clientWidth > 0) {
                this.chart.resize();
            }

            if (!this.solve || !this.solve.moves || this.solve.moves.length === 0) {
                this.chart.clear();
                return;
            }

            const moves = this.solve.moves;
            const n = moves.length;

            const xData = moves.map((m, i) => `#${i + 1} ${m.move || ''}`);
            const cumulativeSecData = moves.map(m => Number(((m.calibratedElapsedMs || m.elapsedMs || 0) / 1000).toFixed(3)));
            const stepDeltaSecData = moves.map(m => Number(((m.deltaMs || 0) / 1000).toFixed(3)));
            
            // Physical Smoothed TPS using Gaussian-weighted time/turn rate
            const tpsWindow = Math.max(1, this.options.tpsSmoothingWindow || 5);
            const smoothedTpsData = SolveMovementChart.calculateSmoothedTps(moves, tpsWindow);

            // Stage markArea data with Multi-Level Staggered Badges to prevent label collision
            const stages = (this.stages && this.stages.length > 0) ? this.stages : (this.options.stages || []);
            const markAreaData = [];

            if (this.options.showStageBands && stages.length > 0) {
                stages.forEach((stg, sIdx) => {
                    const moveCount = stg.moveCount !== undefined ? stg.moveCount : (stg.endIdx - stg.startIdx + 1);
                    const tpsVal = stg.tps !== undefined ? Number(stg.tps).toFixed(1) : (stg.durationMs > 0 ? (moveCount / (stg.durationMs / 1000)).toFixed(1) : '0.0');
                    const stgColor = stg.color || '#3B82F6';

                    // 3-Level Staggered Vertical Offsets to avoid any overlap between short stages
                    const verticalPos = (sIdx % 3 === 0) ? ['50%', '6px'] : ((sIdx % 3 === 1) ? ['50%', '30px'] : ['50%', '54px']);

                    markAreaData.push([
                        {
                            name: `${moveCount}步\n${tpsVal}`,
                            xAxis: Math.max(0, stg.startIdx),
                            itemStyle: {
                                color: stgColor,
                                opacity: 0.12
                            },
                            label: {
                                show: this.options.showStageLabels !== false,
                                position: verticalPos,
                                distance: 4,
                                color: '#FFFFFF',
                                backgroundColor: 'rgba(15, 23, 42, 0.94)',
                                borderColor: stgColor,
                                borderWidth: 1.5,
                                borderRadius: 4,
                                padding: [3, 6],
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                shadowBlur: 6,
                                formatter: `{moves|${moveCount}步} {tps|${tpsVal}}`,
                                rich: {
                                    moves: {
                                        fontSize: 11,
                                        fontWeight: '800',
                                        fontFamily: 'JetBrains Mono, monospace',
                                        color: '#FFFFFF',
                                        align: 'center',
                                        lineHeight: 14
                                    },
                                    tps: {
                                        fontSize: 10,
                                        fontWeight: '700',
                                        fontFamily: 'JetBrains Mono, monospace',
                                        color: '#38BDF8',
                                        align: 'center',
                                        lineHeight: 14
                                    }
                                }
                            }
                        },
                        {
                            xAxis: Math.min(n - 1, stg.endIdx)
                        }
                    ]);
                });
            }

            const series = [];

            // 1. Single Step Pause Bars
            if (this.options.derivativeBars && this.options.derivativeBars.enabled) {
                series.push({
                    name: '单步耗时',
                    type: 'bar',
                    yAxisIndex: 0,
                    barMaxWidth: 14,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(59, 130, 246, 0.65)' },
                            { offset: 1, color: 'rgba(59, 130, 246, 0.15)' }
                        ]),
                        borderRadius: [3, 3, 0, 0]
                    },
                    data: stepDeltaSecData
                });
            }

            // 2. Cumulative Solve Time Spline Curve
            if (this.options.cumulativeCurve && this.options.cumulativeCurve.enabled) {
                series.push({
                    name: '累计时间',
                    type: 'line',
                    yAxisIndex: 0,
                    smooth: 0.35,
                    symbol: 'circle',
                    symbolSize: 4,
                    itemStyle: {
                        color: '#10B981'
                    },
                    lineStyle: {
                        color: '#10B981',
                        width: 2.8,
                        shadowColor: 'rgba(16, 185, 129, 0.6)',
                        shadowBlur: 10
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(16, 185, 129, 0.28)' },
                            { offset: 1, color: 'rgba(16, 185, 129, 0.0)' }
                        ])
                    },
                    markArea: markAreaData.length > 0 ? {
                        silent: true,
                        data: markAreaData
                    } : undefined,
                    data: cumulativeSecData
                });
            }

            // 3. Instant / Smoothed TPS Velocity Spline
            if (this.options.tpsCurve && this.options.tpsCurve.enabled) {
                series.push({
                    name: '平滑 TPS',
                    type: 'line',
                    yAxisIndex: 1,
                    smooth: 0.22,
                    symbol: 'circle',
                    symbolSize: 3,
                    itemStyle: {
                        color: '#06B6D4'
                    },
                    lineStyle: {
                        color: '#06B6D4',
                        width: 2.2,
                        shadowColor: 'rgba(6, 182, 212, 0.45)',
                        shadowBlur: 8
                    },
                    data: smoothedTpsData
                });
            }

            const option = {
                backgroundColor: 'transparent',
                animationDuration: 400,
                animationEasing: 'cubicOut',
                grid: {
                    top: 58,
                    right: 36,
                    bottom: 22,
                    left: 36,
                    containLabel: false
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        lineStyle: { color: 'rgba(255, 255, 255, 0.4)', type: 'dashed' },
                        crossStyle: { color: 'rgba(255, 255, 255, 0.3)' }
                    },
                    backgroundColor: 'rgba(15, 23, 42, 0.94)',
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    borderWidth: 1,
                    padding: [8, 12],
                    textStyle: {
                        color: '#F3F4F6',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 11
                    },
                    formatter: (params) => {
                        if (!params || params.length === 0) return '';
                        const stepIdx = params[0].dataIndex;
                        const moveObj = moves[stepIdx] || {};
                        const moveName = moveObj.move || '';
                        const timeSec = (moveObj.calibratedElapsedMs || moveObj.elapsedMs || 0) / 1000;
                        const deltaMs = Math.round(moveObj.deltaMs || 0);
                        const curSmoothedTps = (smoothedTpsData && smoothedTpsData[stepIdx] !== undefined)
                            ? smoothedTpsData[stepIdx]
                            : (deltaMs > 0 ? (1000 / deltaMs).toFixed(1) : '0.0');

                        let stageBadge = '';
                        if (stages && stages.length > 0) {
                            const foundStage = stages.find(s => stepIdx >= s.startIdx && stepIdx <= s.endIdx);
                            if (foundStage) {
                                stageBadge = `<span style="background: ${foundStage.color || '#3B82F6'}; color: #fff; padding: 1px 5px; border-radius: 3px; font-size: 10px; margin-left: 6px; font-weight: 600;">${foundStage.name}</span>`;
                            }
                        }

                        return `
                            <div style="font-weight: 800; color: #38BDF8; font-size: 12px; margin-bottom: 4px; display: flex; align-items: center; justify-content: space-between;">
                                <span>Step #${stepIdx + 1}: ${moveName}</span>
                                ${stageBadge}
                            </div>
                            <div style="display: flex; justify-content: space-between; gap: 12px; font-size: 11px; margin: 2px 0;">
                                <span style="color: #9CA3AF;">平滑 TPS:</span>
                                <b style="color: #06B6D4; font-size: 12px;">${curSmoothedTps}</b>
                            </div>
                            <div style="display: flex; justify-content: space-between; gap: 12px; font-size: 11px; margin: 2px 0;">
                                <span style="color: #9CA3AF;">单步耗时:</span>
                                <b style="color: #60A5FA;">${stepIdx === 0 ? '起步 (+0ms)' : `+${deltaMs}ms`}</b>
                            </div>
                            <div style="display: flex; justify-content: space-between; gap: 12px; font-size: 11px; margin: 2px 0;">
                                <span style="color: #9CA3AF;">累计用时:</span>
                                <b style="color: #10B981;">${timeSec.toFixed(2)}s</b>
                            </div>
                        `;
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xData,
                    axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.15)' } },
                    axisTick: { show: false },
                    axisLabel: {
                        show: false
                    }
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '时间 (s)',
                        nameTextStyle: {
                            color: '#10B981',
                            fontFamily: 'JetBrains Mono',
                            fontSize: 10,
                            fontWeight: 'bold',
                            padding: [0, 0, 2, 0]
                        },
                        position: 'left',
                        splitLine: {
                            lineStyle: { color: 'rgba(255, 255, 255, 0.06)' }
                        },
                        axisLabel: {
                            color: '#10B981',
                            fontFamily: 'JetBrains Mono',
                            fontSize: 9.5,
                            formatter: '{value}s'
                        }
                    },
                    {
                        type: 'value',
                        name: 'TPS',
                        nameTextStyle: {
                            color: '#06B6D4',
                            fontFamily: 'JetBrains Mono',
                            fontSize: 10,
                            fontWeight: 'bold',
                            padding: [0, 0, 2, 0]
                        },
                        position: 'right',
                        splitLine: { show: false },
                        axisLabel: {
                            color: '#06B6D4',
                            fontFamily: 'JetBrains Mono',
                            fontSize: 9.5,
                            formatter: '{value}'
                        }
                    }
                ],
                series: series
            };

            this.chart.setOption(option, true);

            // Safe post-render layout pass to guarantee uncollapsed full-width rendering on initial page load
            requestAnimationFrame(() => {
                if (this.chart && this.dom && this.dom.clientWidth > 0) {
                    this.chart.resize();
                }
            });
            setTimeout(() => {
                if (this.chart && this.dom && this.dom.clientWidth > 0) {
                    this.chart.resize();
                }
            }, 60);
        }
    }

    return {
        computeAoXSeries,
        smoothDataPoints,
        TrendChart,
        SolveMovementChart
    };
}));
