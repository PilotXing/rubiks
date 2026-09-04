/**
 * renderer-2d.js
 * Crisp 2D Flat Unfolded Net View of Rubik's Cube Facelets
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.CubeRenderer2D = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {
    'use strict';

    const COLOR_HEX = {
        'U': '#FFFFFF', // White
        'D': '#FFD500', // Yellow
        'F': '#009B48', // Green
        'B': '#0046AD', // Blue
        'L': '#FF5800', // Orange
        'R': '#B71234'  // Red
    };

    class Cube2D {
        constructor(canvasElement, options = {}) {
            this.canvas = canvasElement;
            this.ctx = canvasElement.getContext('2d');
            this.facelets = "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB";
            this.size = options.size || 13; // sticker size in px
            this.gap = options.gap || 2;    // gap between stickers
            this.blockGap = options.blockGap || 5; // gap between faces

            this.initCanvasSize();
            this.render();
        }

        initCanvasSize() {
            // Net dimensions: 4 faces wide (L, F, R, B), 3 faces high (U, F/L/R/B, D)
            const faceWidth = this.size * 3 + this.gap * 2;
            const totalWidth = faceWidth * 4 + this.blockGap * 3 + 12;
            const totalHeight = faceWidth * 3 + this.blockGap * 2 + 12;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            this.canvas.width = Math.round(totalWidth * dpr);
            this.canvas.height = Math.round(totalHeight * dpr);
            this.canvas.style.width = `${totalWidth}px`;
            this.canvas.style.height = `${totalHeight}px`;
            this.canvas.style.maxWidth = '100%';
            this.canvas.style.height = 'auto';
            this.canvas.style.display = 'block';
            this.canvas.style.margin = '0 auto';
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            this.ctx.scale(dpr, dpr);
        }

        updateFacelets(faceletString) {
            if (!faceletString || faceletString.length < 54) return;
            this.facelets = faceletString;
            this.render();
        }

        renderFace(startX, startY, faceIndexOffset) {
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    const idx = faceIndexOffset + row * 3 + col;
                    const char = this.facelets.charAt(idx) || 'U';
                    const color = COLOR_HEX[char] || '#444444';

                    const x = startX + col * (this.size + this.gap);
                    const y = startY + row * (this.size + this.gap);

                    // Sticker background with rounded corners
                    this.ctx.fillStyle = color;
                    this.ctx.beginPath();
                    this.roundRect(x, y, this.size, this.size, 2.5);
                    this.ctx.fill();

                    // Subtle border
                    this.ctx.strokeStyle = '#18181B';
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }

        roundRect(x, y, w, h, r) {
            this.ctx.beginPath();
            this.ctx.moveTo(x + r, y);
            this.ctx.lineTo(x + w - r, y);
            this.ctx.quadraticCurveTo(x + w, y, x + w, y + r);
            this.ctx.lineTo(x + w, y + h - r);
            this.ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            this.ctx.lineTo(x + r, y + h);
            this.ctx.quadraticCurveTo(x, y + h, x, y + h - r);
            this.ctx.lineTo(x, y + r);
            this.ctx.quadraticCurveTo(x, y, x + r, y);
            this.ctx.closePath();
        }

        render() {
            const faceSize = this.size * 3 + this.gap * 2;
            const pad = 6;

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Layout coordinates:
            //       [ U ]
            // [ L ][ F ][ R ][ B ]
            //       [ D ]

            const col0 = pad;
            const col1 = pad + faceSize + this.blockGap;
            const col2 = pad + (faceSize + this.blockGap) * 2;
            const col3 = pad + (faceSize + this.blockGap) * 3;

            const row0 = pad;
            const row1 = pad + faceSize + this.blockGap;
            const row2 = pad + (faceSize + this.blockGap) * 2;

            // U (0-8)
            this.renderFace(col1, row0, 0);
            // L (36-44)
            this.renderFace(col0, row1, 36);
            // F (18-26)
            this.renderFace(col1, row1, 18);
            // R (9-17)
            this.renderFace(col2, row1, 9);
            // B (45-53)
            this.renderFace(col3, row1, 45);
            // D (27-35)
            this.renderFace(col1, row2, 27);
        }
    }

    return Cube2D;
}));
