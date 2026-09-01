/**
 * gan-bluetooth.js
 * Web Bluetooth Driver & Protocol Decoder for GAN Smart Cubes (Gen4, Gen3, Gen2, MoYu AI)
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['aesjs'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('./aes'));
    } else {
        root.GanBluetooth = factory(root.aesjs);
    }
}(typeof self !== 'undefined' ? self : this, function(aesjs) {
    'use strict';

    // Bluetooth GATT UUIDs
    const GAN_GEN2_SERVICE = "6e400001-b5a3-f393-e0a9-e50e24dc4179";
    const GAN_GEN2_WRITE   = "28be4a4a-cd67-11e9-a32f-2a2ae2dbcce4";
    const GAN_GEN2_NOTIFY  = "28be4cb6-cd67-11e9-a32f-2a2ae2dbcce4";

    const GAN_GEN3_SERVICE = "8653000a-43e6-47b7-9cb0-5fc21d4ae340";
    const GAN_GEN3_WRITE   = "8653000c-43e6-47b7-9cb0-5fc21d4ae340";
    const GAN_GEN3_NOTIFY  = "8653000b-43e6-47b7-9cb0-5fc21d4ae340";

    const GAN_GEN4_SERVICE = "00000010-0000-fff7-fff6-fff5fff4fff0";
    const GAN_GEN4_WRITE   = "0000fff5-0000-1000-8000-00805f9b34fb";
    const GAN_GEN4_NOTIFY  = "0000fff6-0000-1000-8000-00805f9b34fb";

    // Known encryption keys
    const GAN_ENCRYPTION_KEYS = [
        {   // Key used by GAN Gen2, Gen3, Gen4 (e.g. GAN 12ui, 14ui, 356i Carry, Monster Go)
            key: [0x01, 0x02, 0x42, 0x28, 0x31, 0x91, 0x16, 0x07, 0x20, 0x05, 0x18, 0x54, 0x42, 0x11, 0x12, 0x53],
            iv:  [0x11, 0x03, 0x32, 0x28, 0x21, 0x01, 0x76, 0x27, 0x20, 0x95, 0x78, 0x14, 0x32, 0x12, 0x02, 0x43]
        },
        {   // Key used by MoYu AI 2023
            key: [0x05, 0x12, 0x02, 0x45, 0x02, 0x01, 0x29, 0x56, 0x12, 0x78, 0x12, 0x76, 0x81, 0x01, 0x08, 0x03],
            iv:  [0x01, 0x44, 0x28, 0x06, 0x86, 0x21, 0x22, 0x28, 0x51, 0x05, 0x08, 0x31, 0x82, 0x02, 0x21, 0x06]
        }
    ];

    // High-precision monotonic timestamp
    const getMonotonicMs = () => (typeof performance !== 'undefined' && typeof performance.now === 'function')
        ? performance.now()
        : Date.now();

    /**
     * Bitfield message reader
     */
    class GanProtocolMessageView {
        constructor(message) {
            this.bits = Array.from(message).map(byte => (byte + 0x100).toString(2).slice(1)).join('');
        }

        getBitWord(startBit, bitLength, littleEndian = false) {
            if (bitLength <= 8) {
                return parseInt(this.bits.slice(startBit, startBit + bitLength), 2);
            } else if (bitLength === 16 || bitLength === 32) {
                const buf = new Uint8Array(bitLength / 8);
                for (let i = 0; i < buf.length; i++) {
                    buf[i] = parseInt(this.bits.slice(8 * i + startBit, 8 * i + startBit + 8), 2);
                }
                const dv = new DataView(buf.buffer);
                return bitLength === 16 ? dv.getUint16(0, littleEndian) : dv.getUint32(0, littleEndian);
            } else {
                throw new Error(`Unsupported bit word length: ${bitLength}`);
            }
        }
    }

    /**
     * AES-128-CBC Encrypter/Decrypter with MAC-salted key
     */
    class GanCubeEncrypter {
        constructor(key, iv, salt) {
            if (key.length !== 16 || iv.length !== 16 || salt.length !== 6) {
                throw new Error("Invalid key, IV, or salt length");
            }
            this.key = new Uint8Array(key);
            this.iv = new Uint8Array(iv);
            for (let i = 0; i < 6; i++) {
                this.key[i] = (key[i] + salt[i]) % 0xFF;
                this.iv[i] = (iv[i] + salt[i]) % 0xFF;
            }
        }

        decryptChunk(buffer, offset) {
            const cipher = new aesjs.ModeOfOperation.cbc(this.key, this.iv);
            const chunk = cipher.decrypt(buffer.subarray(offset, offset + 16));
            buffer.set(chunk, offset);
        }

        encryptChunk(buffer, offset) {
            const cipher = new aesjs.ModeOfOperation.cbc(this.key, this.iv);
            const chunk = cipher.encrypt(buffer.subarray(offset, offset + 16));
            buffer.set(chunk, offset);
        }

        decrypt(data) {
            if (data.length < 16) throw new Error("Data must be at least 16 bytes");
            const res = new Uint8Array(data);
            if (res.length > 16) {
                this.decryptChunk(res, res.length - 16);
            }
            this.decryptChunk(res, 0);
            return res;
        }

        encrypt(data) {
            if (data.length < 16) throw new Error("Data must be at least 16 bytes");
            const res = new Uint8Array(data);
            this.encryptChunk(res, 0);
            if (res.length > 16) {
                this.encryptChunk(res, res.length - 16);
            }
            return res;
        }
    }

    /**
     * Linear regression helper for timestamp calibration
     */
    function linregress(X, Y) {
        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0, n = 0;
        for (let i = 0; i < X.length; i++) {
            const x = X[i], y = Y[i];
            if (x == null || y == null) continue;
            n++;
            sumX += x;
            sumY += y;
            sumXY += x * y;
            sumXX += x * x;
        }
        const varX = n * sumXX - sumX * sumX;
        const covXY = n * sumXY - sumX * sumY;
        const slope = Math.abs(varX) < 1e-4 ? 1 : covXY / varX;
        const intercept = n < 1 ? 0 : sumY / n - slope * sumX / n;
        return [slope, intercept];
    }

    function cubeTimestampLinearFit(cubeMoves) {
        if (!cubeMoves || !cubeMoves.length) return [];
        const res = [];
        const validMoves = cubeMoves.map(m => ({ ...m }));

        // Fill missing hardware timestamps
        if (validMoves.length >= 2) {
            for (let i = validMoves.length - 1; i > 0; i--) {
                if (validMoves[i].cubeTimestamp != null && validMoves[i - 1].cubeTimestamp == null) {
                    validMoves[i - 1].cubeTimestamp = validMoves[i].cubeTimestamp - 50;
                }
            }
            for (let i = 0; i < validMoves.length - 1; i++) {
                if (validMoves[i].cubeTimestamp != null && validMoves[i + 1].cubeTimestamp == null) {
                    validMoves[i + 1].cubeTimestamp = validMoves[i].cubeTimestamp + 50;
                }
            }
        }

        const [slope, intercept] = linregress(
            validMoves.map(m => m.cubeTimestamp),
            validMoves.map(m => m.localTimestamp)
        );

        const first = Math.round(slope * (validMoves[0].cubeTimestamp || 0) + intercept);
        validMoves.forEach(m => {
            const fittedMs = m.cubeTimestamp != null
                ? Math.round(slope * m.cubeTimestamp + intercept) - first
                : m.localTimestamp;
            res.push({
                ...m,
                calibratedElapsedMs: Math.max(0, fittedMs)
            });
        });
        return res;
    }

    /**
     * Extract MAC address from Manufacturer Specific Data (GAN Advertising packet)
     */
    function extractMACFromManufacturerData(manufacturerData) {
        if (!manufacturerData) return null;
        let dataView = null;
        if (manufacturerData instanceof DataView) {
            dataView = new DataView(manufacturerData.buffer.slice(2, 11));
        } else if (typeof manufacturerData.has === 'function' && typeof manufacturerData.get === 'function') {
            for (let i = 0; i < 256; i++) {
                const cid = (i << 8) | 0x01;
                if (manufacturerData.has(cid)) {
                    dataView = new DataView(manufacturerData.get(cid).buffer.slice(0, 9));
                    break;
                }
            }
            if (!dataView && typeof manufacturerData.entries === 'function') {
                for (let [_k, v] of manufacturerData.entries()) {
                    if (v && v.byteLength >= 6) {
                        dataView = new DataView(v.buffer.slice(0, 9));
                        break;
                    }
                }
            }
        }
        if (dataView && dataView.byteLength >= 6) {
            const mac = [];
            for (let i = 1; i <= 6; i++) {
                mac.push(dataView.getUint8(dataView.byteLength - i).toString(16).toUpperCase().padStart(2, "0"));
            }
            return mac.join(":");
        }
        return null;
    }

    /**
     * Auto-retrieve MAC from Web Bluetooth watchAdvertisements API
     */
    async function autoRetrieveMacAddress(device) {
        if (!device || typeof device.watchAdvertisements !== 'function') {
            return null;
        }
        return new Promise((resolve) => {
            let done = false;
            const abortController = typeof AbortController !== 'undefined' ? new AbortController() : null;
            const finish = (mac) => {
                if (done) return;
                done = true;
                device.removeEventListener("advertisementreceived", onAdvEvent);
                if (abortController) {
                    try { abortController.abort(); } catch (_) {}
                }
                resolve(mac || null);
            };
            const onAdvEvent = (evt) => {
                const mac = extractMACFromManufacturerData(evt.manufacturerData);
                finish(mac);
            };
            device.addEventListener("advertisementreceived", onAdvEvent);
            const opts = abortController ? { signal: abortController.signal } : {};
            device.watchAdvertisements(opts).catch(() => finish(null));
            setTimeout(() => finish(null), 2500);
        });
    }

    /**
     * Try reading IEEE MAC from Device Information Service (0x180A -> 0x2A23 System ID)
     */
    async function tryReadSystemId(server) {
        try {
            const devInfoService = await server.getPrimaryService("0000180a-0000-1000-8000-00805f9b34fb");
            if (devInfoService) {
                const sysIdChar = await devInfoService.getCharacteristic("00002a23-0000-1000-8000-00805f9b34fb");
                const val = await sysIdChar.readValue();
                if (val && val.byteLength >= 8) {
                    const b = new Uint8Array(val.buffer);
                    const macParts = [b[0], b[1], b[2], b[5], b[6], b[7]];
                    const mac = macParts.map(x => x.toString(16).toUpperCase().padStart(2, '0')).join(':');
                    return mac;
                }
            }
        } catch (_) {}
        return null;
    }

    /**
     * Main GAN Bluetooth Adapter
     */
    class GanBluetoothAdapter {
        constructor(options = {}) {
            let savedMac = null;
            try {
                savedMac = localStorage.getItem('cube_mac_override');
            } catch (_) {}
            this.macOverride = (options.macOverride && options.macOverride.trim()) || (savedMac && savedMac.trim()) || "0c:3d:5e:be:8e:95";
            this.device = null;
            this.server = null;
            this.service = null;
            this.writeCharacteristic = null;
            this.notifyCharacteristic = null;
            this.encrypter = null;
            this.protocolVersion = 4; // default Gen4
            this.decryptionFailCount = 0;

            this.state = 'DISCONNECTED'; // DISCONNECTED, CONNECTING, CONNECTED
            this.listeners = {
                move: [],
                facelets: [],
                battery: [],
                status: [],
                disconnect: [],
                error: [],
                raw: [],
                mac_discovered: [],
                mac_invalid: [],
                decryption_valid: []
            };

            // Protocol tracking state
            this.serial = -1;
            this.lastSerial = -1;
            this.lastLocalTimestamp = null;
            this.hwInfo = {};
        }

        on(event, callback) {
            if (this.listeners[event]) {
                this.listeners[event].push(callback);
            }
            return this;
        }

        off(event, callback) {
            if (this.listeners[event]) {
                this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
            }
            return this;
        }

        emit(event, data) {
            if (this.listeners[event]) {
                this.listeners[event].forEach(cb => {
                    try {
                        cb(data);
                    } catch (e) {
                        console.error(`Error in listener for ${event}:`, e);
                    }
                });
            }
        }

        setMacOverride(mac) {
            if (!mac || !mac.trim()) {
                this.macOverride = "0c:3d:5e:be:8e:95";
            } else {
                this.macOverride = mac.trim().toLowerCase();
            }
            try {
                localStorage.setItem('cube_mac_override', this.macOverride);
            } catch (_) {}

            // Re-derive AES key on the fly if already connected
            if (this.state === 'CONNECTED' && this.device) {
                const saltBytes = this.macOverride.split(/[:-\s]+/).map(c => parseInt(c, 16)).reverse();
                const salt = new Uint8Array(saltBytes);
                const keyDef = (this.device.name && this.device.name.startsWith('AiCube'))
                    ? GAN_ENCRYPTION_KEYS[1]
                    : GAN_ENCRYPTION_KEYS[0];
                this.encrypter = new GanCubeEncrypter(keyDef.key, keyDef.iv, salt);
                this.decryptionFailCount = 0;
                setTimeout(() => this.requestFacelets(), 100);
                setTimeout(() => this.requestBattery(), 300);
            }
        }

        setState(newState) {
            this.state = newState;
            this.emit('status', {
                state: this.state,
                deviceName: this.device ? this.device.name : null,
                mac: this.macOverride,
                protocolVersion: this.protocolVersion
            });
        }

        async requestDevice() {
            if (!navigator.bluetooth) {
                throw new Error("当前浏览器不支持 Web Bluetooth API，请使用 Chrome、Edge 或 Bluefy 浏览器。");
            }

            const requestOptions = {
                filters: [
                    { namePrefix: "GAN" },
                    { namePrefix: "gan" },
                    { namePrefix: "Gan" },
                    { namePrefix: "MG" },
                    { namePrefix: "mg" },
                    { namePrefix: "Monster" },
                    { namePrefix: "AiCube" },
                    { namePrefix: "aicube" },
                    { namePrefix: "Moyu" },
                    { namePrefix: "moyu" },
                    { namePrefix: "MY" },
                    { namePrefix: "Smart" },
                    { namePrefix: "smart" },
                    { namePrefix: "Gi" },
                    { namePrefix: "Go" },
                    { namePrefix: "Rubik" }
                ],
                optionalServices: [
                    GAN_GEN4_SERVICE,
                    GAN_GEN3_SERVICE,
                    GAN_GEN2_SERVICE,
                    "0000180a-0000-1000-8000-00805f9b34fb"
                ]
            };

            this.setState('CONNECTING');
            try {
                this.device = await navigator.bluetooth.requestDevice(requestOptions);
            } catch (err) {
                this.setState('DISCONNECTED');
                throw err;
            }

            this.device.addEventListener('gattserverdisconnected', () => this.handleDisconnect());
            return this.device;
        }

        async connect(deviceOrMac) {
            if (typeof deviceOrMac === 'string') {
                this.setMacOverride(deviceOrMac);
            } else if (deviceOrMac && deviceOrMac.gatt) {
                this.device = deviceOrMac;
            }

            if (!this.device || !this.device.gatt || !this.device.gatt.connected) {
                await this.requestDevice();
            }

            this.setState('CONNECTING');

            try {
                // 1. Connect GATT Server (with auto-retry for Android BLE timing)
                let server = null;
                for (let attempt = 1; attempt <= 2; attempt++) {
                    try {
                        server = await this.device.gatt.connect();
                        if (server && server.connected) break;
                    } catch (gattErr) {
                        if (attempt === 1) {
                            console.warn("GATT attempt 1 failed, retrying in 400ms...", gattErr);
                            await new Promise(r => setTimeout(r, 400));
                        } else {
                            throw gattErr;
                        }
                    }
                }
                this.server = server || this.device.gatt;

                // 2. Discover primary services and determine protocol version
                const services = await this.server.getPrimaryServices();
                let foundService = null;
                let writeUUID = null;
                let notifyUUID = null;

                for (const svc of services) {
                    const uuid = svc.uuid.toLowerCase();
                    if (uuid === GAN_GEN4_SERVICE.toLowerCase()) {
                        this.protocolVersion = 4;
                        foundService = svc;
                        writeUUID = GAN_GEN4_WRITE;
                        notifyUUID = GAN_GEN4_NOTIFY;
                        break;
                    } else if (uuid === GAN_GEN3_SERVICE.toLowerCase()) {
                        this.protocolVersion = 3;
                        foundService = svc;
                        writeUUID = GAN_GEN3_WRITE;
                        notifyUUID = GAN_GEN3_NOTIFY;
                        break;
                    } else if (uuid === GAN_GEN2_SERVICE.toLowerCase()) {
                        this.protocolVersion = 2;
                        foundService = svc;
                        writeUUID = GAN_GEN2_WRITE;
                        notifyUUID = GAN_GEN2_NOTIFY;
                        break;
                    }
                }

                if (!foundService) {
                    throw new Error("未在此魔方上发现支持的 GATT 服务 (No supported GAN GATT service discovered)");
                }

                this.service = foundService;
                this.writeCharacteristic = await this.service.getCharacteristic(writeUUID);
                this.notifyCharacteristic = await this.service.getCharacteristic(notifyUUID);

                // 3. Setup AES Key Salting from MAC Address
                const macClean = this.macOverride || "0c:3d:5e:be:8e:95";
                const saltBytes = macClean.split(/[:-\s]+/).map(c => parseInt(c, 16)).reverse();
                const salt = new Uint8Array(saltBytes);

                const keyDef = (this.device.name && this.device.name.startsWith('AiCube'))
                    ? GAN_ENCRYPTION_KEYS[1]
                    : GAN_ENCRYPTION_KEYS[0];

                this.encrypter = new GanCubeEncrypter(keyDef.key, keyDef.iv, salt);
                this.decryptionFailCount = 0;

                // 4. Start Notifications
                this.notifyCharacteristic.addEventListener('characteristicvaluechanged', (evt) => {
                    this.handleNotification(evt);
                });
                await this.notifyCharacteristic.startNotifications();

                this.setState('CONNECTED');

                // 5. Send initial queries (Request facelets state and battery)
                setTimeout(() => this.requestFacelets(), 200);
                setTimeout(() => this.requestBattery(), 600);

                return true;
            } catch (err) {
                console.error("GATT Connection error:", err);
                this.handleDisconnect();
                this.emit('error', err);
                throw err;
            }
        }

        async sendCommand(commandBytes) {
            if (!this.writeCharacteristic || !this.encrypter) return;
            const buffer = new Uint8Array(20).fill(0);
            buffer.set(commandBytes);
            const encrypted = this.encrypter.encrypt(buffer);
            await this.writeCharacteristic.writeValue(encrypted);
        }

        async requestFacelets() {
            if (this.protocolVersion === 4) {
                await this.sendCommand([0xDD, 0x04, 0x00, 0xED, 0x00, 0x00]);
            } else if (this.protocolVersion === 3) {
                await this.sendCommand([0xDD, 0x04, 0x00, 0x02, 0x00, 0x00]);
            } else {
                await this.sendCommand([0x04]);
            }
        }

        async requestBattery() {
            if (this.protocolVersion === 4) {
                await this.sendCommand([0xDD, 0x04, 0x00, 0xEF, 0x00, 0x00]);
            } else if (this.protocolVersion === 3) {
                await this.sendCommand([0xDD, 0x04, 0x00, 0x07, 0x00, 0x00]);
            } else {
                await this.sendCommand([0x07]);
            }
        }

        async requestReset() {
            if (this.protocolVersion === 4) {
                await this.sendCommand([0xD2, 0x0D, 0x05, 0x39, 0x77, 0x00, 0x00, 0x01, 0x23, 0x45, 0x67, 0x89, 0xAB, 0x00, 0x00, 0x00]);
            }
            this.serial = -1;
            this.lastSerial = -1;
            setTimeout(() => this.requestFacelets(), 250);
        }

        handleNotification(evt) {
            const characteristic = evt.target;
            const rawVal = characteristic.value;
            if (!rawVal || rawVal.byteLength < 16) return;

            const rawBytes = new Uint8Array(rawVal.buffer);
            this.emit('raw', rawBytes);

            let decrypted;
            try {
                decrypted = this.encrypter.decrypt(rawBytes);
            } catch (err) {
                console.error("Decryption error:", err);
                this.emit('mac_invalid', { mac: this.macOverride, error: err });
                return;
            }

            const nowMs = getMonotonicMs();

            if (this.protocolVersion === 4) {
                const eventType = decrypted[0];
                const isValidHeader = [0x01, 0xED, 0xEF, 0xD2, 0xDD, 0x02, 0x07].includes(eventType);
                if (!isValidHeader) {
                    this.decryptionFailCount = (this.decryptionFailCount || 0) + 1;
                    if (this.decryptionFailCount >= 3) {
                        this.emit('mac_invalid', {
                            mac: this.macOverride,
                            deviceName: this.device ? this.device.name : 'GAN Gen4 Cube',
                            protocol: 'GAN Gen4'
                        });
                    }
                    return;
                } else {
                    if (this.decryptionFailCount > 0) {
                        this.decryptionFailCount = 0;
                    }
                    this.emit('decryption_valid', { mac: this.macOverride });
                }
                this.parseGen4Packet(decrypted, nowMs);
            } else if (this.protocolVersion === 3) {
                this.parseGen3Packet(decrypted, nowMs);
            } else {
                this.parseGen2Packet(decrypted, nowMs);
            }
        }

        parseGen4Packet(msgBytes, nowMs) {
            const msg = new GanProtocolMessageView(msgBytes);
            const eventType = msg.getBitWord(0, 8);
            const dataLength = msg.getBitWord(8, 8);

            if (eventType === 0x01) { // MOVE
                const cubeTimestamp = msg.getBitWord(16, 32, true);
                const serial = msg.getBitWord(48, 16, true);
                const direction = msg.getBitWord(64, 2); // 0 = clockwise, 1 = counter, 2 = 180
                const faceIdx = [2, 32, 8, 1, 16, 4].indexOf(msg.getBitWord(66, 6));

                if (faceIdx >= 0) {
                    const faceChar = "URFDLB".charAt(faceIdx);
                    const suffixes = ["", "'", "2", "2"];
                    const suffix = suffixes[direction] || "";
                    const moveStr = faceChar + suffix;

                    this.serial = serial;
                    this.lastLocalTimestamp = nowMs;

                    this.emit('move', {
                        move: moveStr,
                        face: faceIdx,
                        direction: direction,
                        serial: serial,
                        cubeTimestamp: cubeTimestamp,
                        localTimestamp: nowMs
                    });
                }
            } else if (eventType === 0xED) { // FACELETS
                const serial = msg.getBitWord(16, 16, true);
                this.serial = serial;
                this.lastSerial = serial;

                // Corners (7 transmitted, 8th derived)
                const cp = [], co = [];
                for (let i = 0; i < 7; i++) {
                    cp.push(msg.getBitWord(32 + i * 3, 3));
                    co.push(msg.getBitWord(53 + i * 2, 2));
                }
                const sumCp = cp.reduce((a, b) => a + b, 0);
                const sumCo = co.reduce((a, b) => a + b, 0);
                cp.push(28 - sumCp);
                co.push((3 - (sumCo % 3)) % 3);

                // Edges (11 transmitted, 12th derived)
                const ep = [], eo = [];
                for (let i = 0; i < 11; i++) {
                    ep.push(msg.getBitWord(69 + i * 4, 4));
                    eo.push(msg.getBitWord(113 + i, 1));
                }
                const sumEp = ep.reduce((a, b) => a + b, 0);
                const sumEo = eo.reduce((a, b) => a + b, 0);
                ep.push(66 - sumEp);
                eo.push((2 - (sumEo % 2)) % 2);

                this.emit('facelets', {
                    cp, co, ep, eo,
                    serial: serial,
                    timestamp: nowMs
                });
            } else if (eventType === 0xEF) { // BATTERY
                const batteryLevel = msg.getBitWord(16, 8);
                this.emit('battery', { level: batteryLevel });
            }
        }

        parseGen3Packet(msgBytes, nowMs) {
            const msg = new GanProtocolMessageView(msgBytes);
            const eventType = msg.getBitWord(0, 8);

            if (eventType === 0x01) { // MOVE
                const cubeTimestamp = msg.getBitWord(16, 32, true);
                const serial = msg.getBitWord(48, 16, true);
                const direction = msg.getBitWord(64, 2);
                const faceIdx = [2, 32, 8, 1, 16, 4].indexOf(msg.getBitWord(66, 6));

                if (faceIdx >= 0) {
                    const faceChar = "URFDLB".charAt(faceIdx);
                    const suffixes = ["", "'", "2", "2"];
                    const suffix = suffixes[direction] || "";
                    const moveStr = faceChar + suffix;

                    this.emit('move', {
                        move: moveStr,
                        face: faceIdx,
                        direction: direction,
                        serial: serial,
                        cubeTimestamp: cubeTimestamp,
                        localTimestamp: nowMs
                    });
                }
            } else if (eventType === 0x02) { // FACELETS
                const serial = msg.getBitWord(16, 16, true);
                const cp = [], co = [], ep = [], eo = [];
                for (let i = 0; i < 7; i++) {
                    cp.push(msg.getBitWord(32 + i * 3, 3));
                    co.push(msg.getBitWord(53 + i * 2, 2));
                }
                cp.push(28 - cp.reduce((a, b) => a + b, 0));
                co.push((3 - (co.reduce((a, b) => a + b, 0) % 3)) % 3);

                for (let i = 0; i < 11; i++) {
                    ep.push(msg.getBitWord(69 + i * 4, 4));
                    eo.push(msg.getBitWord(113 + i, 1));
                }
                ep.push(66 - ep.reduce((a, b) => a + b, 0));
                eo.push((2 - (eo.reduce((a, b) => a + b, 0) % 2)) % 2);

                this.emit('facelets', { cp, co, ep, eo, serial, timestamp: nowMs });
            }
        }

        parseGen2Packet(msgBytes, nowMs) {
            const msg = new GanProtocolMessageView(msgBytes);
            const eventType = msg.getBitWord(0, 4);

            if (eventType === 0x02) { // MOVE
                const serial = msg.getBitWord(4, 8);
                const faceIdx = [0, 2, 4, 1, 3, 5].indexOf(msg.getBitWord(12, 4));
                const direction = msg.getBitWord(16, 2);

                if (faceIdx >= 0) {
                    const faceChar = "URFDLB".charAt(faceIdx);
                    const suffixes = ["", "'", "2", "2"];
                    const suffix = suffixes[direction] || "";
                    const moveStr = faceChar + suffix;

                    this.emit('move', {
                        move: moveStr,
                        face: faceIdx,
                        direction: direction,
                        serial: serial,
                        cubeTimestamp: null,
                        localTimestamp: nowMs
                    });
                }
            } else if (eventType === 0x04) { // FACELETS
                const cp = [], co = [], ep = [], eo = [];
                for (let i = 0; i < 7; i++) {
                    cp.push(msg.getBitWord(12 + i * 3, 3));
                    co.push(msg.getBitWord(33 + i * 2, 2));
                }
                cp.push(28 - cp.reduce((a, b) => a + b, 0));
                co.push((3 - (co.reduce((a, b) => a + b, 0) % 3)) % 3);

                for (let i = 0; i < 11; i++) {
                    ep.push(msg.getBitWord(47 + i * 4, 4));
                    eo.push(msg.getBitWord(91 + i, 1));
                }
                ep.push(66 - ep.reduce((a, b) => a + b, 0));
                eo.push((2 - (eo.reduce((a, b) => a + b, 0) % 2)) % 2);

                this.emit('facelets', { cp, co, ep, eo, timestamp: nowMs });
            }
        }

        handleDisconnect() {
            this.server = null;
            this.service = null;
            this.writeCharacteristic = null;
            this.notifyCharacteristic = null;
            this.device = null;
            this.setState('DISCONNECTED');
            this.emit('disconnect', {});
        }

        async disconnect() {
            if (this.device && this.device.gatt && this.device.gatt.connected) {
                try {
                    await this.device.gatt.disconnect();
                } catch (e) {
                    console.warn("GATT disconnect error:", e);
                }
            }
            this.handleDisconnect();
        }
    }

    return {
        GanBluetoothAdapter,
        cubeTimestampLinearFit,
        getMonotonicMs
    };
}));
