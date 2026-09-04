/**
 * renderer-3d.js
 * Real-time 3D WebGL Rubik's Cube Renderer using Three.js
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['three'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('./three.min.js'));
    } else {
        root.CubeRenderer3D = factory(root.THREE);
    }
}(typeof self !== 'undefined' ? self : this, function(THREE) {
    'use strict';

    // Facelet colors (WCA Standard palette)
    const COLOR_MAP = {
        'U': 0xFFFFFF, // White
        'D': 0xFFD500, // Yellow
        'F': 0x009B48, // Green
        'B': 0x0046AD, // Blue
        'L': 0xFF5800, // Orange
        'R': 0xB71234, // Red
        'K': 0x18181B  // Core plastic (black)
    };

    /**
     * Map (x, y, z) cubie coordinates [-1, 0, 1] and face direction to 54-facelet string index
     * Faces in order: U (0-8), R (9-17), F (18-26), D (27-35), L (36-44), B (45-53)
     */
    function getFaceletIndex(x, y, z, face) {
        // U face (y = 1): z from -1 to 1 (back to front), x from -1 to 1 (left to right)
        // Row 0 (z=-1): x=-1(0), x=0(1), x=1(2)
        // Row 1 (z=0):  x=-1(3), x=0(4), x=1(5)
        // Row 2 (z=1):  x=-1(6), x=0(7), x=1(8)
        if (face === 'U' && y === 1) {
            const row = z + 1; // 0, 1, 2
            const col = x + 1; // 0, 1, 2
            return row * 3 + col;
        }

        // R face (x = 1): y from 1 to -1 (top to bottom), z from 1 to -1 (front to back)
        // Row 0 (y=1):  z=1(9), z=0(10), z=-1(11)
        // Row 1 (y=0):  z=1(12), z=0(13), z=-1(14)
        // Row 2 (y=-1): z=1(15), z=0(16), z=-1(17)
        if (face === 'R' && x === 1) {
            const row = 1 - y;
            const col = 1 - z;
            return 9 + row * 3 + col;
        }

        // F face (z = 1): y from 1 to -1 (top to bottom), x from -1 to 1 (left to right)
        // Row 0 (y=1):  x=-1(18), x=0(19), x=1(20)
        // Row 1 (y=0):  x=-1(21), x=0(22), x=1(23)
        // Row 2 (y=-1): x=-1(24), x=0(25), x=1(26)
        if (face === 'F' && z === 1) {
            const row = 1 - y;
            const col = x + 1;
            return 18 + row * 3 + col;
        }

        // D face (y = -1): z from 1 to -1 (front to back), x from -1 to 1 (left to right)
        // Row 0 (z=1):  x=-1(27), x=0(28), x=1(29)
        // Row 1 (z=0):  x=-1(30), x=0(31), x=1(32)
        // Row 2 (z=-1): x=-1(33), x=0(34), x=1(35)
        if (face === 'D' && y === -1) {
            const row = 1 - z;
            const col = x + 1;
            return 27 + row * 3 + col;
        }

        // L face (x = -1): y from 1 to -1 (top to bottom), z from -1 to 1 (back to front)
        // Row 0 (y=1):  z=-1(36), z=0(37), z=1(38)
        // Row 1 (y=0):  z=-1(39), z=0(40), z=1(41)
        // Row 2 (y=-1): z=-1(42), z=0(43), z=1(44)
        if (face === 'L' && x === -1) {
            const row = 1 - y;
            const col = z + 1;
            return 36 + row * 3 + col;
        }

        // B face (z = -1): y from 1 to -1 (top to bottom), x from 1 to -1 (right to left)
        // Row 0 (y=1):  x=1(45), x=0(46), x=-1(47)
        // Row 1 (y=0):  x=1(48), x=0(49), x=-1(50)
        // Row 2 (y=-1): x=1(51), x=0(52), x=-1(53)
        if (face === 'B' && z === -1) {
            const row = 1 - y;
            const col = 1 - x;
            return 45 + row * 3 + col;
        }

        return -1;
    }

    class Cube3D {
        constructor(containerElement, options = {}) {
            this.container = containerElement;
            this.width = options.width || containerElement.clientWidth || 280;
            this.height = options.height || containerElement.clientHeight || 280;

            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(38, this.width / this.height, 0.1, 100);
            this.camera.position.set(4.2, 3.4, 5.0);
            this.camera.lookAt(0, 0, 0);

            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            this.renderer.setSize(this.width, this.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            this.renderer.shadowMap.enabled = false;
            this.container.appendChild(this.renderer.domElement);

            // Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
            this.scene.add(ambientLight);

            const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.65);
            dirLight1.position.set(5, 10, 7);
            this.scene.add(dirLight1);

            const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.35);
            dirLight2.position.set(-5, -5, -5);
            this.scene.add(dirLight2);

            // Cube Group
            this.cubeGroup = new THREE.Group();
            this.scene.add(this.cubeGroup);

            this.cubies = [];
            this.stickerMaterials = {}; // map faceletIdx -> material
            this.initCubies();

            this.setupInteraction();
            this.animate = this.animate.bind(this);
            this.isRunning = true;
            this.animate();
        }

        initCubies() {
            const cubieSize = 0.94;
            const geometry = new THREE.BoxGeometry(cubieSize, cubieSize, cubieSize);

            // Box faces order in Three.js: +X (R), -X (L), +Y (U), -Y (D), +Z (F), -Z (B)
            const directions = [
                { name: 'R', axis: 'x', val: 1, matIndex: 0 },
                { name: 'L', axis: 'x', val: -1, matIndex: 1 },
                { name: 'U', axis: 'y', val: 1, matIndex: 2 },
                { name: 'D', axis: 'y', val: -1, matIndex: 3 },
                { name: 'F', axis: 'z', val: 1, matIndex: 4 },
                { name: 'B', axis: 'z', val: -1, matIndex: 5 }
            ];

            const defaultFacelets = "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB";

            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    for (let z = -1; z <= 1; z++) {
                        const materials = [];

                        directions.forEach(dir => {
                            const isOuterFace = (dir.axis === 'x' && x === dir.val) ||
                                                (dir.axis === 'y' && y === dir.val) ||
                                                (dir.axis === 'z' && z === dir.val);

                            if (isOuterFace) {
                                const fIdx = getFaceletIndex(x, y, z, dir.name);
                                const defaultColorChar = defaultFacelets.charAt(fIdx) || 'U';
                                const mat = new THREE.MeshLambertMaterial({
                                    color: COLOR_MAP[defaultColorChar] || 0x333333
                                });
                                this.stickerMaterials[fIdx] = mat;
                                materials.push(mat);
                            } else {
                                // Internal plastic
                                materials.push(new THREE.MeshLambertMaterial({ color: 0x111113 }));
                            }
                        });

                        const cubie = new THREE.Mesh(geometry, materials);
                        cubie.position.set(x * 1.0, y * 1.0, z * 1.0);
                        this.cubeGroup.add(cubie);
                        this.cubies.push({ mesh: cubie, x, y, z });
                    }
                }
            }
        }

        updateFacelets(faceletString) {
            if (!faceletString || faceletString.length < 54) return;
            for (let i = 0; i < 54; i++) {
                const char = faceletString.charAt(i);
                const mat = this.stickerMaterials[i];
                if (mat && COLOR_MAP[char] !== undefined) {
                    mat.color.setHex(COLOR_MAP[char]);
                }
            }
        }

        setupInteraction() {
            let isDragging = false;
            let prevMouseX = 0;
            let prevMouseY = 0;

            const onPointerDown = (e) => {
                isDragging = true;
                prevMouseX = e.clientX || (e.touches && e.touches[0].clientX);
                prevMouseY = e.clientY || (e.touches && e.touches[0].clientY);
            };

            const onPointerMove = (e) => {
                if (!isDragging) return;
                const clientX = e.clientX || (e.touches && e.touches[0].clientX);
                const clientY = e.clientY || (e.touches && e.touches[0].clientY);
                if (clientX === undefined || clientY === undefined) return;

                const deltaX = clientX - prevMouseX;
                const deltaY = clientY - prevMouseY;

                this.cubeGroup.rotation.y += deltaX * 0.012;
                this.cubeGroup.rotation.x += deltaY * 0.012;

                prevMouseX = clientX;
                prevMouseY = clientY;
            };

            const onPointerUp = () => {
                isDragging = false;
            };

            const dom = this.renderer.domElement;
            dom.addEventListener('mousedown', onPointerDown);
            window.addEventListener('mousemove', onPointerMove);
            window.addEventListener('mouseup', onPointerUp);

            dom.addEventListener('touchstart', onPointerDown, { passive: true });
            window.addEventListener('touchmove', onPointerMove, { passive: true });
            window.addEventListener('touchend', onPointerUp);
        }

        resetOrientation() {
            this.cubeGroup.rotation.set(0, 0, 0);
        }

        resize(width, height) {
            this.width = width;
            this.height = height;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        }

        animate() {
            if (!this.isRunning) return;
            requestAnimationFrame(this.animate);
            this.renderer.render(this.scene, this.camera);
        }

        destroy() {
            this.isRunning = false;
            if (this.renderer.domElement && this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
            }
            this.renderer.dispose();
        }
    }

    return Cube3D;
}));
