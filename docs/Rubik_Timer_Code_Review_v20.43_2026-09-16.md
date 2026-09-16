# Rubik Vision Bluetooth Timer v20.43 代码审查报告

审查日期：2026-09-16

审查基线：`036ee56`

审查版本：`2e0cb1d6b1f11bfc78c785e7846ee1f896eb5793`（GitHub `main`）

提交范围：`036ee56..2e0cb1d`，共 15 个提交

## 总体结论

v20.43 增加了节拍器、屏幕常亮、连续 Scramble Tape、M/E/S 合并、公式可视化，以及 1519-case 公式库。功能增长明显，但当前版本仍有多项会影响打乱判定、TPS/重建统计和手机端体验的问题，暂不建议视为稳定版本。

本次审查发现 5 个 P1、2 个 P2 和 1 个 P3 问题。优先建议修复打乱状态机、M/E/S 时间判定和手机公式库渲染。

## P1：高优先级

### 1. 混合单转和双转事件会错误判定打乱完成

位置：`src/core/cube-engine.js:1067`

双转目标的处理只要收到同面的 `x2` 事件就直接推进步骤，没有检查此前是否已经进入半转状态。

稳定复现：

```text
目标打乱：U2
实际动作：U → U2
结果：isComplete = true
实际魔方状态：未到达 U2 目标状态
```

`GAN Gen4` 协议会把方向值 `2` 直接转换为 `U2` 一类事件，因此该组合在真实硬件流中可能出现。

建议：推进步骤前以 `currentCube.equals(expectedStates[currentStep + 1])` 作为最终判定；收到 `x2` 时如果已有半转状态，必须按照总净转量重新计算。

### 2. M/E/S 合并读取了不存在的时间字段

位置：

- `src/core/cube-engine.js:163-168`
- `src/core/timer-engine.js:559-565`

`consolidateMoves()` 只读取 `item.time`，但计时器实际记录的是：

- `elapsedMs`
- `localTimestamp`
- `cubeTimestamp`

因此对象记录的时间始终被当成缺失，而缺失时间会默认视为“同时转动”。

复现结果：

```text
R' @ 100ms
L  @ 2100ms
```

两个动作相隔两秒，仍会被合并为 `M'`。

影响范围：

- 实时 move count 与 TPS
- 最终保存的 `moves`
- CFOP/Roux 阶段分析
- 重建和图表数据

建议：统一时间字段，优先使用 `calibratedElapsedMs ?? elapsedMs ?? localTimestamp`；当对象没有时间时应保守地拒绝合并，而不是默认同时发生。

### 3. 手机进入公式练习页会长时间阻塞

位置：

- `src/ui/ui-controller.js:3192-3260`
- `src/core/alg-database.js:72-95`
- `src/core/alg-database.js:165-167`

进入练习页时一次性创建 1519 张卡片和 1519 个 canvas。每个 canvas 又调用一次 `getCaseById()`，而该函数每次都会重新复制并映射全部 1519 个 case，整体接近 O(N²)。

320px 手机视口实测：

```text
DOM 节点：约 967 → 14,658
公式卡片：1519
Canvas：1519
点击练习后约 10.3 秒仍触发浏览器操作超时
```

建议：

1. 使用分页或虚拟列表，只创建可见卡片。
2. 为 case 建立持久的 `Map<id, case>` 索引。
3. 使用 `IntersectionObserver` 延迟绘制缩略图。
4. 搜索输入增加 debounce，避免每次按键重建整个列表。

### 4. 新公式库包含无法执行的默认公式

位置：

- `src/core/algs-data.js:747-757`
- `src/core/algs-data.js:23862-23884`
- `src/core/alg-database.js:72-93`

校验了 1519 个 case、6616 个公式，共发现：

- 14 个 case 含无效记号
- 18 个无效 token
- 3 个当前默认公式直接不可练习

典型问题：

```text
OLL 22：R2'
四棱翻色：(M' U)8 被解析为 M' U8
八棱翻色：(M' U)4 被解析为 M' U4
部分备用公式包含 R3、L3、F3、B3
```

部分 case 的 `alg` 字段已有展开后的有效公式，但 `getAllCases()` 会使用 `algs[0]` 覆盖 `alg`，使压缩记号重新成为默认值。

建议：构建阶段完成重复表达式展开和标准化，并在生成后拒绝任何不符合 `^[URFDLBMESxyzurfdlb](w)?(2|')?$` 的 token；数据校验应成为回归测试的一部分。

### 5. `S'` 和 `S2` 的 Edge Orientation 映射错误

位置：`src/core/cube-engine.js:471-484`

`S'`、`S2` 更新 `eo` 时使用了错误的源下标。性质测试结果：

```text
任意非复原状态执行 S → S'
预期：回到原状态
实际：false
```

`f/Fw`、`b/Bw` 和 `z` 的展开都会依赖 S 层动作，所以问题不仅限于直接输入 `S'`。

影响：

- 含 S/Fw/Bw 的公式预览
- BLD 三循环数据生成和数学验证
- Slice move 重建分析

建议为 `M/E/S`、wide move 和 rotation 增加群性质测试：`move + inverse = identity`、`move^4 = identity`，并使用随机合法状态而不是只测复原态。

## P2：中等优先级

### 6. Scramble telemetry 调试逻辑进入了生产路径

位置：

- `src/ui/ui-controller.js:29-39`
- `src/ui/ui-controller.js:2069-2083`
- `server.py:29-68`

每个打乱动作都会 POST 整个 tape 状态。标准 21 步打乱约产生 35KB 重复 JSON，服务端同步追加到不轮转的日志文件。

服务端还存在以下问题：

- 绑定全部网络接口 `TCPServer(("", p), ...)`
- 允许任意 Origin POST
- 无身份验证
- 无请求体大小限制
- 日志不轮转

另外，前端读取 `moveEvent.hardwareTimestamp`，蓝牙层实际提供的是 `cubeTimestamp`，因此 telemetry 中该字段通常为 `null`。

建议默认关闭 telemetry，并放到显式 debug 开关后；服务默认只绑定 `127.0.0.1`，限制请求体和日志文件尺寸。

### 7. 当前回归测试不是全绿

执行 `node tests/run-core-tests.js`：

```text
17 tests
16 passed
1 failed
```

失败项：

```text
ScrambleTape.sync: handles real-time cube stream, wrong moves at step 7, and seamless recovery
```

v20.43 在纠错完成时会清除插入的纠错卡片，但旧测试仍要求纠错卡片保留。需要先确定期望 UI 语义，再同步代码和测试；发布分支不应保留失败的回归测试。

## P3：低优先级

### 8. 全局音效开关不会静音节拍器

位置：`src/audio/audio-synth.js:83-129`

普通音效会检查 `sound.enabled`，但 `MetronomeEngine.start()` 和 `playToneAt()` 不检查它。因此用户关闭 `Enable Sound Effects` 后，ARM 状态的节拍器仍可能播放。

建议明确产品语义：如果节拍器属于全局音效，应统一检查 `sound.enabled`；如果它应独立控制，则 UI 需要明确说明并提供独立启用开关。

## 已验证通过的部分

- 320px 窄屏没有横向溢出，顶部四个操作按钮完整可见。
- Service Worker 预缓存资源与 HTML 引用一致。
- v20.43 badge 与缓存版本一致。
- 全部项目 JavaScript 文件通过语法检查。
- 1519 个 case 没有重复 ID，也没有缺失基础字段。
- 蓝牙电量轮询不再重置活动计时器。
- 蓝牙断开后会释放 Screen Wake Lock。
- ScrambleTape 和 AlgVisualizer 的模块拆分方向合理。

## 推荐修复顺序

1. 修复打乱状态机的混合 `x/x2` 判定并补回归测试。
2. 修复 M/E/S 时间字段和 S/S'/S2 状态映射。
3. 为全部 6616 个公式增加构建期 notation 校验。
4. 将练习列表改为虚拟列表或分页，并缓存 ID 索引。
5. 清理或隔离 telemetry。
6. 恢复全绿测试后再发布新版本。

## 测试范围与限制

本次执行了：

- Git 提交历史和增量 diff 审查
- Core regression tests
- 全部 JavaScript 语法检查
- 公式库结构与 notation 校验
- M/E/S 群性质测试
- 320px、390px 手机视口浏览器烟雾测试
- Service Worker 资源一致性检查

本次没有连接真实 GAN 魔方，因此蓝牙包序列、音频输出和 Wake Lock 的硬件行为只做了代码级审查。
