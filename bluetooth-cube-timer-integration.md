# Rubik Vision 蓝牙魔方连接与临时计时器接入说明

版本：2026-08-17  
适用设备：已验证的 GAN v4 智能魔方（当前设备名记录为 `GANic4_8E95`）

## 1. 已知设备信息

当前已经验证过的设备 MAC：

```text
0c:3d:5e:be:8e:95
```

这个 MAC 不是浏览器用来筛选设备的地址，而是 GAN v4 协议在无法从广播自动读取 MAC 时，用来派生 AES 密钥和 IV 的设备参数。浏览器的 Web Bluetooth 通常不会直接暴露传统蓝牙 MAC，因此临时 App 应允许把它作为可编辑的 MAC override。

不要把这个地址当作用户输入的动作标签；它只用于连接和解密这台魔方。

## 2. 浏览器 Web Bluetooth 连接前提

- 使用 Chrome 或其他支持 Web Bluetooth 的 Chromium 浏览器；
- 页面必须运行在 `localhost` 或 HTTPS 安全上下文；
- `requestDevice()` 必须由用户点击触发，不能在页面加载时自动弹出；
- Android 原生 App 不能直接复用浏览器的 Web Bluetooth 权限，需要使用 Android BLE GATT API，或在 Android Chrome 中打开 Web 版本；
- 当前实现一次只连接一台魔方。

## 3. GAN v4 协议常量

```text
Service UUID:
00000010-0000-fff7-fff6-fff5fff4fff0

Read / notification characteristic:
0000fff6-0000-1000-8000-00805f9b34fb

Write characteristic:
0000fff5-0000-1000-8000-00805f9b34fb
```

设备选择使用以下名称前缀，并声明 GAN v4 service：

```ts
const ganV4RequestOptions = {
  filters: [
    { namePrefix: "GAN" },
    { namePrefix: "MG" },
    { namePrefix: "AiCube" },
  ],
  optionalServices: ["00000010-0000-fff7-fff6-fff5fff4fff0"],
};
```

## 4. 连接流程

```text
用户点击“连接魔方”
  ↓
navigator.bluetooth.requestDevice(options)
  ↓
device.gatt.connect()
  ↓
getPrimaryService(GAN_V4_SERVICE_UUID)
  ↓
取得 FFF6 notification characteristic
取得 FFF5 write characteristic
  ↓
startNotifications()
  ↓
用 MAC 派生 AES-CBC key / IV
  ↓
解密蓝牙 notification
  ↓
转换为 Singmaster 动作
```

当前项目已经把这部分封装在：

```text
lib/gan-v4.ts
```

如果临时计时器 App 仍是 TypeScript/Web 版本，优先复用 `GanV4Adapter`，不要重新实现加密和数据包解析。

## 5. TypeScript 最小接入方式

```ts
import {
  GAN_V4_SERVICE_UUID,
  GanV4Adapter,
  ganV4RequestOptions,
} from "./lib/gan-v4";

const MAC_OVERRIDE = "0c:3d:5e:be:8e:95";

const device = await navigator.bluetooth.requestDevice(ganV4RequestOptions);

const adapter = new GanV4Adapter({
  onMove(event) {
    // event.move: U / U' / U2 / ...
    // event.receivedMonotonicMs: performance.now() 时间轴
    // event.deviceTimeMs: 协议提供时才有
    // event.deviceSequence: 设备动作序号
    console.log(event.move, event.receivedMonotonicMs);
  },
  onRaw(record) {
    // 可选：保存原始蓝牙包用于调试
    console.debug(record);
  },
  onDeviceInfo(info) {
    console.log("connected", info);
  },
  onHealth(issue) {
    console.warn(issue);
  },
  onDisconnect() {
    console.warn("cube disconnected");
  },
});

await adapter.connect(device, MAC_OVERRIDE);
```

连接失败时，常见原因依次是：

1. 没有使用用户点击触发设备选择；
2. 浏览器不支持 Web Bluetooth；
3. 页面不是 localhost/HTTPS；
4. 选择了非 GAN/MG/AiCube 设备；
5. MAC 不匹配，导致解密失败；
6. GATT service 或 characteristic 不可用；
7. 设备已经被其他 App 占用或距离太远。

## 6. 临时计时器如何使用动作事件

计时器内部统一使用 `performance.now()`，不要使用 `Date.now()` 做动作对齐。

最简单的临时模式：

```ts
let timerStartedAt: number | null = null;
const moves: Array<{
  move: string;
  elapsedMs: number;
  deviceTimeMs: number | null;
}> = [];

function startTimer() {
  timerStartedAt = performance.now();
  moves.length = 0;
}

function onMove(event: DecodedGanMove) {
  if (timerStartedAt === null) return;
  moves.push({
    move: event.move,
    elapsedMs: event.receivedMonotonicMs - timerStartedAt,
    deviceTimeMs: event.deviceTimeMs,
  });
}

function stopTimer() {
  if (timerStartedAt === null) return null;
  const elapsedMs = performance.now() - timerStartedAt;
  timerStartedAt = null;
  return { elapsedMs, moves: [...moves] };
}
```

建议状态：

```text
DISCONNECTED
CONNECTING
CONNECTED
READY
RUNNING
STOPPED
ERROR
```

连接测试时收到的动作只显示在 UI，不要写入正式计时记录。只有 `RUNNING` 状态下收到的动作才进入当前计时结果。

## 7. `U2` 和校准动作

协议可能发送：

```text
U U' U2
```

当前项目保留原始 `U2`。如果训练或计时器要把 180° 转动当作两个四分之一转动，可以在处理层展开：

```text
U2 → U U
R2 → R R
```

不要修改原始蓝牙日志，也不要在没有准确中间时间点时把一个 `U2` Clip 强行拆成两个独立 Clip。

开始正式计时前可以执行快速 `U U'` 作为同步校准动作，但这段动作应标记为 calibration，不计入正式计时结果。

## 8. 断线和重连

断线时：

1. 立即把状态设为 `DISCONNECTED`；
2. 保存已经收到的动作；
3. 在 UI 显示明显警告；
4. 不自动把断线期间的动作补进当前计时；
5. 用户重新点击连接后，再建立新的 adapter/GATT 连接。

当前 GAN v4 适配器可能请求设备历史动作。历史补包会标记为 `recovered=true`，不应当把它当作实时动作来计算精确计时。

## 9. 计时器 App 的最小交付范围

第一版只需要：

- 连接/断开按钮；
- 显示设备名称和连接状态；
- MAC override 输入框，默认 `0c:3d:5e:be:8e:95`；
- 开始、停止、重置按钮；
- 当前计时毫秒数；
- 最近动作和动作发生时间；
- 断线警告；
- 导出 JSON。

不需要在临时版本中实现视频、模型、整体旋转识别或云端同步。

## 10. 当前仓库中的对应实现

```text
lib/gan-v4.ts       GAN v4 加密、GATT、通知解码和动作转换
app/RubikVisionApp.tsx  Web Bluetooth 连接和动作接收示例
docs/protocol-gan-v4.md 协议说明
```

