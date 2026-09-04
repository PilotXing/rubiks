---
title: Rubik Vision 完整代码与历史复核报告
date: 2026-09-05
status: Completed
tags:
  - rubiks-cube
  - code-review
  - architecture
  - git-history
  - web-bluetooth
  - termux
source: https://github.com/PilotXing/rubiks
reviewed_commit: 9f374cd3b1f8762cf7b1eb0a3f2e26f21bce513f
reviewed_version: 20.17
history_reviewed: true
history_commit_count: 76
supersedes:
  - Rubiks_Timer_UI_Code_Review_2026-09-04.md
  - Rubik_Vision_Architecture_and_Code_Review_Report.md
---

# Rubik Vision 完整代码与历史复核报告

## 1. 结论先行

Rubik Vision 的技术方向是对的：纯静态、无构建、离线优先，适合在 Android + Termux 上作为 GAN 官方联网应用的轻量替代。手机端 UI 已有较高完成度；390 × 844 视口下未发现横向溢出，Timer、Trends、Practice 三个入口可用，常规页面操作未出现控制台错误。

当前真正需要优先处理的不是“换框架”，而是成绩正确性、状态一致性和改版遗留：

1. 硬件时间校准实际上被脚本加载顺序静默禁用；即使启用，校准值也没有进入最终成绩。
2. WCA inspection 的 15–17 秒 `+2` 没有落实。
3. 统计层与 UI 的字段契约不一致，ao3 还被算成三次中的中位数。
4. csTimer 导出的时间单位少了一个数量级。
5. 打乱可见步数设置、`+2` 显示、首次打乱历史和竖向手势存在明确缺陷。
6. `ui-controller.js` 与 `style.css` 已累积到难以安全修改的程度，但仍可在不引入 React/Vite/TypeScript 的前提下渐进拆分。

本报告同时复核了另一份 Gemini/Antigravity 架构报告。它对纠偏数学、Web Bluetooth 用户手势和 TDZ 故障的历史分析基本可靠；但“当前仍是固定五槽”“曾执行 `git reset --hard`”“Direct Move-Stream 可直接删除”等结论，不能由当前源码和 76 个可见提交完全支持，其中两项已与 v20.17 现状矛盾。

## 2. 审查范围与可信度边界

- 仓库：<https://github.com/PilotXing/rubiks>
- 当前提交：`9f374cd3`，版本 `v20.17`
- Git 历史：完整读取 76 个提交，从 `v13.9` 到 `v20.17`
- 方法：当前源码逐行检查、`git log`、`git show`、`git blame`、历史版本规模对比、移动视口 UI smoke test
- 外部规范：对照当前 WCA inspection 规则与 csTimer 官方源码
- 未完成的验证：本轮没有连接真实 GAN 魔方，因此蓝牙时序、丢包、facelets/move 帧交错仍需真机回归
- 仓库中没有实际自动化测试套件；`docs/specs/*.ts` 是协议参考代码，不是可执行测试

因此，本文将判断分为三类：

- **已确认**：当前代码可直接证明，或 Git diff 能完整解释来源。
- **高概率**：静态路径清晰，但需要一次真实导入或硬件操作完成最终验证。
- **历史推断**：来自旧报告或提交描述，现有 Git 对象不足以证明全部因果。

## 3. 当前架构

```text
GAN 智能魔方
    │  Web Bluetooth / 加密协议 / move 与 facelets 事件
    ▼
src/bluetooth/gan-bluetooth.js + lib/aes.js
    │
    ├── src/core/cube-engine.js       魔方状态、打乱追踪、纠偏与重寻路
    ├── src/core/timer-engine.js      计时、成绩、统计与持久化
    └── src/core/method-analyzer.js   CFOP/Roux 分段分析
    │
    ▼
src/ui/ui-controller.js              页面编排与绝大多数交互
    ├── renderers                     2D / Three.js 3D
    ├── chart-engine.js               ECharts 图表
    └── audio-synth.js                提示音与语音
    │
    ▼
localStorage + Service Worker         本地数据与离线缓存
```

### 架构优点

- 无服务端和构建链，Termux 启动简单，离线故障面小。
- 蓝牙协议、魔方状态、渲染器、图表已经按文件分离。
- `cube-engine.js` 基本不依赖 DOM，适合补纯逻辑测试。
- Service Worker 缓存了本地运行所需的核心脚本、样式和图片。
- 业务能力远高于普通计时器：打乱跟踪、纠偏、分段、TPS、2D/3D 复盘和公式练习已经形成闭环。

### 需要修正的架构描述

旧报告称 `src/core/` “均为纯函数与独立状态机”。这不完全准确：`timer-engine.js` 直接依赖 `localStorage`、`performance`、`requestAnimationFrame` 和 `GanBluetooth`，既包含领域逻辑，也包含浏览器适配与存储。当前边界仍然可用，但若要做单元测试，应该把时钟、存储和硬件校准作为可注入依赖，而不是把整个 core 当作纯计算层。

## 4. 风险总表

| 优先级 | 问题 | 判断 | 用户影响 |
|---|---|---|---|
| P0 | GAN 硬件时间校准被加载顺序静默禁用，且未写入最终时间 | 已确认 | 展示“支持校准”，实际成绩仍是本机时间 |
| P0 | Inspection 15–17 秒没有自动 `+2` | 已确认 | WCA 模式成绩错误 |
| P0 | 统计字段契约错误，ao3 算法错误 | 已确认 | Trends 显示 `--`，ao3 数值失真 |
| P0 | csTimer 导出把毫秒除以 10 | 高概率，官方源码支持 | 导入后 14.17 秒可能变成 1.417 秒 |
| P1 | 可见前/后步数设置不生效 | 已确认的 v20.6 回归 | 设置产生错误预期 |
| P1 | 竖向滚动或 `pointercancel` 可能复制公式 | 已确认 | 手机滚动误操作 |
| P1 | 历史列表用 `penalty === 2` 判断 `+2` | 已确认 | 加罚样式和 `+` 不显示 |
| P1 | 首次启动产生“幽灵上一条打乱” | 已确认的 v19.2 副作用 | 历史语义不可信 |
| P1 | Service Worker 更新时可强制刷新 | 已确认 | 本地更新可能打断当前计时/操作 |
| P2 | Space `keydown` 未过滤 repeat | 已确认 | 长按空格可快速开始后停止 |
| P2 | 约 19 个静态 DOM 引用已无对应元素 | 已确认的清理遗留 | 代码静默失效、误导维护 |
| P2 | 打乱渲染、状态、resize 与主题存在多套事实来源 | 已确认 | 修改容易只修到一条路径 |
| P2 | 自定义公式通过 `innerHTML` 拼接 | 已确认、单机低风险 | 特殊输入可破坏 DOM |
| P3 | 所有轨迹长期存于 localStorage | 容量风险 | 数据多后保存失败或历史丢失 |

## 5. P0：成绩与数据正确性

### 5.1 硬件校准链路实际没有生效

`index.html` 先加载 `src/core/timer-engine.js`，后加载 `src/bluetooth/gan-bluetooth.js`。TimerEngine 的 UMD 工厂在加载时立即接收 `root.GanBluetooth`，此时值为 `undefined`，并被闭包永久捕获：

- `index.html:1128`：加载 timer engine
- `index.html:1131`：之后才加载 GAN Bluetooth
- `src/core/timer-engine.js:6-14`：`factory(root.GanBluetooth)`
- `src/core/timer-engine.js:465-480`：只有 `GanBluetooth` 存在时才拟合硬件时间

这不会报错，所以常规 smoke test 看不出来，只会让校准分支永远跳过。

此外，即便修复加载顺序，代码也只计算 `calibratedTimeMs`，随后仍写入：

```js
finalTimeMs: rawDurationMs,
formattedTime: formatTime(rawDurationMs)
```

因此需要先明确产品语义：

- 若硬件拟合值只是诊断信息，应改名并在 UI 明示“参考值”。
- 若它是计时结果，应由统一的 `officialTimeMs` 决定 `finalTimeMs`、格式化结果和 TPS。

建议先加入一个 10 秒原始时间 / 9.8 秒校准时间的测试夹具，再决定最终成绩来源，避免修了加载顺序却仍然没有行为变化。

### 5.2 Inspection 漏掉 15–17 秒 `+2`

当前 `tickInspection()` 在 17 秒调用 `stopTimerWithDNF()`，但 15 秒时没有记录待应用的加罚；用户在 15–17 秒之间转动魔方，`startTimer()` 会直接开始正常计时。

当前 WCA 规则 A4d1/A4d2 明确：15.00 秒起为 `+2`，17.00 秒起为 DNF。参见 [WCA Regulations A4d](https://www.worldcubeassociation.org/regulations/#A4d)。

建议：

1. Inspection 开始时置 `inspectionPenalty = 0`。
2. 达到 15 秒时置 `inspectionPenalty = 2000` 并更新 UI。
3. 达到 17 秒时 DNF。
4. 从 INSPECTION 进入 RUNNING 时保留 penalty，完成后统一写入 `finalTimeMs = rawTimeMs + penalty`。

边界测试必须覆盖 `14.999`、`15.000`、`16.999`、`17.000` 秒。

### 5.3 统计数据契约不一致

`SolveSession.getStats()` 返回 `best`、`mean`、`currentAo5` 等毫秒数；UI 却读取 `bestFormatted`、`meanFormatted`、`currentAo5Formatted` 等不存在的属性：

- 数据层：`src/core/timer-engine.js:160-246`
- 旧统计渲染：`src/ui/ui-controller.js:1972-1982`
- Trends 卡片：`src/ui/ui-controller.js:2733-2761`

这使统计卡片有成绩时仍显示 `--`。该接口不一致从 v13.9 已存在，v18.4（`7f66098`）加入 Trends 卡片后再次暴露。

最小修复是在 UI 中统一调用 `formatTime(stats.best)`；更稳妥的方案是建立单一 `StatsViewModel`，明确区分 `bestMs` 与 `bestText`，不再靠字段名猜测单位。

### 5.4 ao3 实际被算成中位数

`calcAverage()` 对任何长度大于等于 3 的数组都删除最快和最慢值。`getStats()` 又用它计算 3 次成绩，因此所谓 ao3 只剩中间一项，不是三次平均。

建议把概念写清楚：

- 三次：`mo3 = meanOf(3)`，不裁剪。
- 五次及以上：按对应规则计算 average，并明确 DNF 与裁剪数量。
- 不要让一个根据数组长度隐式猜规则的函数同时承担 Mo3、Ao5、Ao12 和任意 AoX。

### 5.5 csTimer 导出时间单位错误

当前代码把 `finalTimeMs` 除以 10，变量也命名为 `centi`：

```js
const centi = Math.round(s.finalTimeMs / 10);
return [[penaltyFlag, centi], ...];
```

但 csTimer 官方 `kernel.pretty(time)` 将传入值按毫秒处理：显示百分秒时内部再除以 10，开启毫秒显示时直接使用。参见 [csTimer `kernel.js` 的 `pretty()`](https://github.com/cs0x7f/cstimer/blob/master/src/js/kernel.js#L1031-L1060)。

因此 14,170 ms 当前会导出为 `1417`，csTimer 会按约 1.417 秒解释。建议直接导出整数毫秒，并用一条已知 14.17 秒、`+2`、DNF 的三记录夹具做真实导入测试后再发布。

## 6. P1：手机交互与可见功能回归

### 6.1 “前置/后置可见步数”设置已经失效

`scrambleVisiblePrev` 和 `scrambleVisibleNext` 仍会读写 localStorage，也会触发渲染，但当前轨道 class 与定位不读取它们。

历史链路非常清楚：

- v17.0 `ca18fd1`：设置加入并实际参与渲染。
- v20.6 `755ac05`：固定五槽重构移除了使用逻辑，设置 UI 留下。
- v20.7 `0bf59ec`：改成连续轨道，仍未恢复设置逻辑。

这是确定的改版回归。短期应隐藏该设置；若保留，则让可见范围参与 class 派生和可访问性状态，不要只改 opacity。

### 6.2 竖向滚动和 `pointercancel` 可能被当成点击

当前只有明显横向位移才进入 dragging。若从公式卡片开始向上/下滚动，结束时仍可能走“点击卡片 → 复制公式”；`pointercancel` 还和 `pointerup` 共用同一处理器。

建议维护 `gestureAxis`、`hasMoved`、`cancelled` 三个状态：

- 竖向位移超过阈值后，整个手势禁止 tap。
- `pointercancel` 只清理和回弹，绝不导航或复制。
- 复制只允许在短时长、低位移、未取消的 pointerup 上发生。

### 6.3 `+2` 数据与 UI 使用不同单位

数据层用 `penalty === 2000`，历史表却判断 `penalty === 2`。最终时间可能已经增加 2 秒，但列表不会显示 `+` 样式。

建议定义唯一常量或枚举，例如：

```js
const Penalty = Object.freeze({ NONE: 0, PLUS_TWO: 2000, DNF: -1 });
```

所有统计、导出、表格和编辑操作只引用该常量。

### 6.4 首次启动产生幽灵打乱历史

v19.2 `3d74a98` 为消除首屏白屏，预先创建了 `currentScramble`、`scrambleHistory` 和 `pendingNextScramble`。启动末尾仍调用无参数 `setNewScramble()`，于是 pending 被立即追加，用户刚打开应用就能滑回一条从未使用过的公式。

应保留“HTML 首次 paint 即有公式”的目标，但把启动过程改成：选择唯一 current → 初始化 tracker → 渲染；只有用户主动下一条或完成复原后才追加历史。

### 6.5 连接成功自动换公式是设计取舍，不是死代码

`bluetooth.on('status')` 在 CONNECTED 时调用 `setNewScramble()`。这会让连接前已经看到的公式突然变化，但 Git 提交 `e0d9410` 明确把它作为 v19.6 的自动同步保护加入。

推荐暂时保留。如果想改善体验，应做状态化策略：

- 尚未开始打乱且实体魔方已复原：沿用当前公式。
- 实体魔方未复原：提示“校准/换新公式”，不要静默替换。
- 已开始打乱：禁止连接回调覆盖当前 session。

### 6.6 Service Worker 可在更新时打断操作

`sw.js` 在 install 阶段立即 `skipWaiting()`，页面又在 `controllerchange` 时直接 `location.reload()`。本地服务器更新缓存时，如果页面正在计时或复盘，可能无提示刷新。

建议在 IDLE/FINISHED 时才应用更新；RUNNING/INSPECTION 时显示“新版本已就绪”，由用户结束后刷新。离线缓存本身应保留。

### 6.7 空格键没有过滤自动重复

`keydown` 中 Space 会直接切换计时状态，没有检查 `e.repeat`。长按空格可能先开始、随后在重复事件中立即停止。最小修复是忽略 repeat；更符合计时器习惯的方案是 keydown 进入 armed，keyup 才开始或停止。

## 7. 历史事故复核：哪些成立，哪些需要改写

| Gemini 报告结论 | 本次复核 | 最终判断 |
|---|---|---|
| 第 0 步卡死源于显示公式与 tracker 脱节 | 提交说明能证明开发者曾围绕该症状加保护，但不能单凭 Git 证明唯一根因 | **部分成立，因果不可定论** |
| `Direct Move-Stream` 与 facelets 双轨冗余，应直接删除 | 当前 move stream 负责低延迟顺序推进；facelets 负责绝对状态校准与解偏，职责有重叠但不等价 | **不可直接删除，先做硬件回归与裁决模型** |
| `currentStep > 0` 是未回滚补丁 | `e0d9410` 明确加入该守卫以保护第 0 步公式，确实会丢弃第 0 步绝对状态 | **是有副作用的历史保护，但不是无意残留** |
| 纠偏矩阵乘法顺序错误，并在修复时误伤 Header | `1a89ce2` 修正为 `current^-1 × target`，同提交改错 Header；`db7c60a` 恢复 | **完全确认** |
| 轨道漂移后 `git reset --hard 8c7b9d2` 并改成固定五槽 | Git 对象只能看到 v20.6 五槽提交，无法证明本地 reset；v20.7 已再次改为连续轨道 | **历史操作不可证，当前布局描述已过时** |
| 异步 fallback 丢失 Web Bluetooth 瞬态手势 | `f39e243` 确实删除 catch 中的级联 requestDevice，收敛为单次调用 | **完全确认** |
| `mainMovementChart` TDZ 使后续按钮绑定全部跳过 | `0214305` 将声明从后段提升到初始化前 | **完全确认** |
| 给整个初始化加 try/catch 即可加固 | 大范围 catch 容易掩盖半初始化状态 | **方向成立，手段应改为分阶段启动和可见失败** |
| 应立即迁移 IndexedDB | 对轻量本地应用尚无容量证据；迁移本身增加复杂度 | **非当前优先项** |

### 关于双轨打乱追踪的最终建议

当前设计是：

1. `move` 事件先更新 `physicalCube`，再调用 `tracker.onCubeMove()`。
2. 若动作与预期面匹配，Direct Move-Stream 快速返回进度。
3. 不匹配时进入 `evaluateState()`，计算偏离、纠正和重寻路。
4. `facelets` 事件提供绝对状态，但第 0 步被 UI 守卫过滤。

问题不是“有两条路径”本身，而是两条路径都能修改 `currentStep/isHalfTurn/isDeviated`，缺少明确的权威与合并规则。建议保留两种输入，建立单一 reducer：

```text
move frame     ─┐
                ├─> normalize event ─> ScrambleTracker.reduce(state, event) ─> one result
facelets frame ─┘
```

在真机测试证明 move 帧完整、顺序稳定之前，不建议删除 Direct Move-Stream；在证明 facelets 的频率、延迟和初始状态可靠之前，也不建议只依赖绝对状态。

## 8. UI 与维护性债务

### 8.1 `ui-controller.js` 是主要风险集中点

当前文件 3,583 行，同时负责：

- DOM 查询和事件绑定
- 页面导航、弹窗和设置
- 打乱生成、轨道渲染和手势
- 蓝牙事件路由
- timer 状态投影
- 统计、历史和图表
- 练习模式
- 主题和响应式重绘

这不是必须换框架的理由，但已经是拆文件的充分理由。v20.11 的 TDZ 故障正说明顶层执行顺序已经难以人工保证。

### 8.2 CSS 覆盖层持续增长

历史统计：

| 版本 | CSS 行数 | `!important` 数量 |
|---|---:|---:|
| v13.9 | 2306 | 29 |
| v18.4 | 3166 | 78 |
| v19.9 | 3376 | 157 |
| v20.6 | 3523 | 207 |
| v20.13 / 当前 | 3750 | 300 |

主要增长来自全屏模式、五槽方案和纸带视觉的连续覆盖。`setArenaMode()` 还直接写带 priority 的 inline style，迫使后续 CSS 继续提高优先级。

目标不是一次性删掉 300 个 `!important`，而是先让 `data-mode`、`data-view`、`data-theme` 成为状态唯一来源，再按组件逐块回收旧规则。

### 8.3 约 19 个 DOM 引用已静默失效

v16.3 删除 `main-proportional-flow`，v16.5 删除旧 Session Statistics，v20.3 删除模块 dock 和 `btn-toggle-arena-view`，但 DOM map 与若干守卫分支仍保留。因为代码普遍使用 `if (element)`，问题不会抛错，只会让死逻辑长期存在。

建议先生成“JS 静态 ID ↔ HTML 实际 ID”清单，对历史明确删除的节点连同事件和 CSS 一起清理；动态 toast、运行时生成节点和 canvas fallback 应列入白名单，避免误删。

### 8.4 打乱视轨有两套渲染判断

首次渲染通过 `formatScrambleHTML()` 生成字符串；原地更新又独立实现 done/active/pending/half/correction/far 的 class 与文本规则。任何新状态都可能只改到其中一套。

建议抽出：

```js
deriveScrambleStepView(move, index, trackerState)
// => { text, classes, guideText, ariaCurrent }
```

字符串渲染和原地 patch 都消费同一个结果。

### 8.5 resize/orientation 重绘是累积修复，不能盲删

多层监听分别解决过：轮播定位、宽度分行、ECharts 初始零宽、横屏全屏 3D。它们当前确实重复，但每层都有历史目的。

应合并为 `scheduleLayout(reason)`，使用 rAF 去重，并保留测试：

- 首次打开 Trends 时容器宽度从 0 变为可见。
- 竖屏 ↔ 横屏，含浏览器工具栏高度变化。
- 原生 Fullscreen 进入与退出。
- 打乱动画进行中旋转屏幕。

### 8.6 主题和 body 状态有多个事实来源

主题同时维护 `style-*`、`theme-*`、两个 localStorage key 和隐藏旧 selector。`document.body.className = ...` 还可能清掉 `is-scrambling` 等运行状态。

建议只保留 `data-theme` 与 `data-accent`，读取一次旧 key 完成迁移，以后只写新 key；运行状态使用独立 data attribute，禁止重置整个 `className`。

### 8.7 历史表每次全量 innerHTML + 重绑事件

目前每次完成、加罚或删除都会重建全部行，再遍历多组按钮绑定事件。轻量数据下性能未必立刻有问题，但结构重复且容易漏绑定。

建议使用 tbody 级事件委托，并只更新目标行；同时对 scramble 与自定义算法文本使用 `textContent` 或转义函数。

## 9. 应保留的设计意图

以下代码看起来重复，但在没有等价保障前不应直接删除：

- **静态首屏打乱模板**：v19.2 为脚本加载前即显示公式、避免白屏而加入。
- **连接成功后的同步动作**：v19.6 为实体状态与公式不一致增加；可以改善交互，不能当死代码删除。
- **Direct Move-Stream**：为低延迟推进和半转处理加入，需硬件覆盖后才能收敛。
- **ResizeObserver 与延时 resize**：曾分别修复图表零宽和横屏布局；应合并调度，不应批量删 pass。
- **离线 Service Worker**：是项目核心价值，只需改变更新接管时机。

## 10. 推荐的轻量整改计划

### 第一批：成绩可信度

- [ ] 修复 GAN Bluetooth 加载/注入顺序，并明确 raw、calibrated、final 三种时间语义。
- [ ] 实现 inspection 15 秒 `+2`、17 秒 DNF。
- [ ] 修复 stats 字段契约与 Mo3 算法。
- [ ] 修复 csTimer 毫秒导出，并做真实导入夹具。
- [ ] 统一 penalty 常量，修复历史列表展示。

### 第二批：手机端可见缺陷

- [ ] 恢复或隐藏前后可见步数设置。
- [ ] 分离 `pointerup` 与 `pointercancel`，屏蔽竖向滚动误复制。
- [ ] 消除首次启动幽灵打乱。
- [ ] 忽略 Space repeat，最好改成 keydown/keyup 状态机。
- [ ] 延迟 Service Worker 刷新到安全状态。

### 第三批：可安全清理的改版遗留

- [ ] 删除历史已确认不存在的 DOM map、事件分支和对应 CSS。
- [ ] 统一主题 key、class 与 body 状态表达。
- [ ] 用事件委托替换历史表重复绑定。
- [ ] 合并重复的启动渲染和统计渲染。
- [ ] 用户文本统一转义。

### 第四批：无构建拆分

继续使用普通 `<script>` 即可：

```text
src/ui/
├── app-controller.js       启动顺序与跨模块协调
├── scramble-view.js        公式、轨道、纠偏展示
├── scramble-gesture.js     pointer 手势
├── timer-view.js           timer / inspection 投影
├── analytics-view.js       统计、历史、图表
├── practice-view.js        练习模式
└── settings-view.js        设置、主题、弹窗
```

CSS 按职责拆分：

```text
styles/
├── tokens.css
├── base.css
├── components.css
├── themes.css
└── modes.css
```

这些文件仍可被 `index.html` 直接按顺序加载，不需要 npm、bundler 或联网。

## 11. 最小回归测试矩阵

### 纯逻辑测试

- `calcMo3([10000, 11000, 30000]) === 17000`
- Ao5/Ao12 的单 DNF、双 DNF、裁剪边界
- penalty 在 NONE / +2 / DNF 间切换时 finalTime 一致
- inspection 在 14.999 / 15.000 / 16.999 / 17.000 秒的结果
- csTimer 导出 14.17、16.17(+2)、DNF 的 JSON 快照
- `current^-1 × target` 纠偏对随机状态能回到目标

### DOM 与手机交互测试

- 设置可见步数后 DOM class/可见范围真正变化
- 竖向 scroll、横向 swipe、tap、pointercancel 四条路径互斥
- 首次启动没有可返回的幽灵历史
- 主题切换不清除 running/scrambling 状态
- Trends 首次显示与旋转屏幕后图表宽度非零
- Service Worker 更新不打断 RUNNING

### GAN 真机测试

- 已复原/未复原魔方首次连接
- 第 0 步为普通转、反向转、`R2` 的两个 90° 帧和单个 180° 帧
- move 与 facelets 乱序、重复、丢一帧
- 偏离 1–3 步、超过 3 步、撤销错误动作
- 连接中断、重连、页面离线重开
- raw 与 calibrated 时间差异可解释，最终成绩来源符合产品定义

## 12. 对旧报告建议的最终取舍

### 采纳

- `ui-controller.js` 是主要维护瓶颈，应按职责拆分。
- 纠偏乘法与 Header 连带回归的历史结论。
- `requestDevice()` 必须保持单次、直接由用户手势触发。
- TDZ 说明初始化顺序需要结构化加固。
- 打乱状态返回值应逐步改成显式状态枚举，减少复合布尔条件。

### 调整后采纳

- 双轨追踪应收敛为一个裁决模型，但不是立即删掉 move stream。
- 初始化应分阶段隔离失败，但不要用一个大 try/catch 吞掉错误。
- localStorage 需要容量监控、导出和恢复；IndexedDB 在轨迹规模确实触顶时再迁移。

### 不采纳

- 把当前实现描述为固定五槽：v20.7 后已不是当前事实。
- 把 `git reset --hard 8c7b9d2` 当作已由提交历史证明的事件。
- 在没有 GAN 真机矩阵的情况下删除 `currentStep > 0` 与 Direct Move-Stream。
- 为解决代码膨胀引入重型前端框架或构建系统。

## 13. 综合评价

| 维度 | 评分 | 说明 |
|---|---:|---|
| 产品完成度 | 9.0 / 10 | 功能闭环完整，手机端视觉成熟 |
| 离线与场景适配 | 8.5 / 10 | 很适合 Termux，本地优先方向正确 |
| 领域算法与硬件能力 | 8.0 / 10 | 功能强，但缺自动测试与双轨裁决定义 |
| 成绩正确性 | 6.0 / 10 | inspection、统计、导出、校准存在实质缺陷 |
| 可维护性 | 6.5 / 10 | UI/CSS 累积明显，仍可渐进治理 |
| 综合 | 7.7 / 10 | 值得继续迭代，不需要推倒重来 |

最终判断：这个项目不是“架构失控”，而是短时间内大量 UI 与功能迭代超过了清理和测试速度。最划算的路线是先让成绩数据可信，再修手机端回归，然后以 Git 历史保护真实设备修复的意图，逐步收敛 UI 状态、渲染与 CSS。只要补上小规模自动测试和 GAN 真机矩阵，现有轻量架构可以继续稳定演进。

---

## 参考

- 项目仓库：<https://github.com/PilotXing/rubiks>
- 审查提交：<https://github.com/PilotXing/rubiks/commit/9f374cd3b1f8762cf7b1eb0a3f2e26f21bce513f>
- WCA Regulations，A4d inspection：<https://www.worldcubeassociation.org/regulations/#A4d>
- csTimer 官方源码，时间格式化：<https://github.com/cs0x7f/cstimer/blob/master/src/js/kernel.js#L1031-L1060>

*本报告由两份既有审查结果合并复核，并以 v20.17 当前源码和完整可见 Git 历史重新裁决。*
