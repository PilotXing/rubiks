# Rubik Vision 代码审查整改与缺陷修复执行报告 (2026-09-05)

## 1. 概述与整改目标

根据 2026-09-05 代码审查报告（`Rubik_Vision_Complete_Code_Review_2026-09-05.md`）与修复计划（`Rubik_Vision_Review_Remediation_Plan_2026-09-05.md`），本项目在保持纯原生零构建、Termux 离线优先、原生 ES6 + Web Worker / Service Worker 架构的前提下，完成了全部关键缺陷的根因整改与工程落地。

本次整改涵盖：
- 建立不依赖 npm 的纯 Node 原生自动化回归测试套件。
- 修复硬件线性回归校准闭环与执行顺序倒置。
- 严密对齐 WCA 观察期规则与加罚状态（15–17 秒 +2、>= 17 秒 DNF）。
- 统一惩罚枚举常量（NONE: 0, PLUS_TWO: 2000, DNF: -1）并兼容历史数据。
- 修复统计接口契约（Ao3 改为 Mo3 算术平均、提供格式化字符串，消除趋势图 `--`）。
- 修复 csTimer 导出时间单位（恢复整数毫秒，废除除以 10 的错误换算）。
- 重构打乱区域手机端手势状态机（轴向锁定、竖向滑动防误复制、取消手势复位）。
- 消除启动阶段首条打乱历史幽灵副本（只保留单条激活打乱）。
- 建立 Service Worker 计时中安全保护机制（RUNNING / INSPECTION 期间推迟刷新）。
- 全面清理代码库中所有 Emoji 表情字符。

---

## 2. 修复实施明细

### 2.1 阶段 0：离线自动化回归测试集构建

- 文件：`tests/run-core-tests.js`
- 模块导出补充：
  - `lib/min2phase.js`：添加 CommonJS 导出判断。
  - `src/bluetooth/gan-bluetooth.js`：添加 CommonJS 导出判断与模块引用容错。
  - `src/core/cube-engine.js`：添加 CommonJS 导出判断与 min2phase 路径容错。
  - `src/core/timer-engine.js`：修复 Node 引用路径 `../bluetooth/gan-bluetooth`，导出 `TimerController`、`SolveSession`、`formatTime`、`calcAverage`、`calcMo3`、`Penalty`、`getNowMs`。
- 测试套件覆盖（共 11 项，Node 直接运行无需任何第三方依赖）：
  1. `formatTime` 毫秒、分秒、多分钟、无效值与 DNF 格式化。
  2. `calcMo3` 算术平均与 DNF 判定（10s, 11s, 30s 返回 17s，杜绝中位数中值截断）。
  3. `calcAverage (Ao5)` WCA 首尾裁剪与单次/多次 DNF 判定。
  4. `calcAverage (Ao12)` 10 次保留平均与超额 DNF 判定。
  5. `SolveSession` 内存/持久化存储契约与格式化字段输出。
  6. `SolveSession.togglePenalty` 状态流转、finalTimeMs 与 formattedTime 联动同步。
  7. `csTimer export` 整数毫秒输出与惩罚标记格式校验。
  8. `min2phase` 群论路径寻路（C^-1 * T 逆向求解并验证最终状态吻合）。
  9. `TimerController` 硬件线性拟合门禁（4 步以上且偏差 <= 300ms 方予采纳，超限降级）。
  10. `TimerController` WCA 观察期 15–17 秒 +2 继承与 >= 17 秒强制 DNF。
  11. `Scramble lookahead` 前后可见步数视窗计算（超窗元素打上 step-hidden）。

### 2.2 阶段 1：计时基准与硬件时间戳校准

1. **脚本加载顺序调整**：
   - 文件：`index.html`
   - 将 `src/bluetooth/gan-bluetooth.js` 移至 `src/core/timer-engine.js` 之前加载，根除 `TimerEngine` 工厂闭包捕获 `undefined` 的隐患。
2. **驱动运行时动态解析**：
   - 文件：`src/core/timer-engine.js`
   - 在 `TimerController` 内部解析硬件驱动，优先读取 `this.bluetoothDriver`，次级读取 `GanBluetooth` 或全局上下文 `window.GanBluetooth`。
3. **硬件校准有效性质检门禁**：
   - 文件：`src/core/timer-engine.js`
   - 规则：仅当动作记录包含硬件时间戳、采样点数 >= 4 且拟合时间与本地单调时钟偏差绝对值 <= 300ms 时采纳 `calibratedTimeMs`；否则安全降级为 `rawDurationMs`。
4. **WCA 观察期加罚落地**：
   - 文件：`src/core/timer-engine.js`
   - 观察期在 15.000 秒到 16.999 秒之间转动魔方开始复原时，`currentPenalty` 自动继承 `Penalty.PLUS_TWO`，最终成绩计算为 `baseTimeMs + 2000` 并附加 `+` 后缀；超过 17.000 秒仍未起步则直接裁定 DNF。
5. **统一惩罚枚举**：
   - 常量：`Penalty = Object.freeze({ NONE: 0, PLUS_TWO: 2000, DNF: -1 })`。
   - 文件：`src/ui/ui-controller.js`
   - 修复第 1993 行将 `s.penalty === 2` 改为匹配 `2000`（并兼容旧数据 `2`），消除展示层双 `++` 风险。

### 2.3 阶段 2：统计契约与 csTimer 导出精度

1. **解耦 Mo3 与 Ao5/Ao12**：
   - 实现独立 `calcMo3(timesArray)`，遵循 WCA 9f1 规则，不对 3 次成绩做任何首尾裁剪；`calcAverage` 接收 3 条数据时直接分流至 `calcMo3`。
2. **SolveSession 数据契约扩展**：
   - `getStats()` 同时输出数值原始字段与展示用格式化字段：`bestFormatted`、`worstFormatted`、`currentAo3Formatted`、`bestAo3Formatted`、`currentAo5Formatted`、`bestAo5Formatted`、`currentAo12Formatted`、`bestAo12Formatted`、`meanFormatted`、`stdDevFormatted`。
   - 消除 Trends 视图中读取未定义属性导致 `--` 的问题。
3. **csTimer 导出整数毫秒修正**：
   - 彻底移除 `Math.round(s.finalTimeMs / 10)` 错误分秒除法，直接输出整数毫秒，确保导入官方 csTimer 后时间严格保持真实成绩。

### 2.4 阶段 3：手机端手势状态机与打乱历史清理

1. **手势轴向锁定与误触隔离**：
   - 文件：`src/ui/ui-controller.js`
   - 在 `initScrambleGesture` 中引入 `axisLock`（`'horizontal'` / `'vertical'` / `null`）与 `isCancelled` 状态。
   - 位移超过 8px 时首判主运动轴：若为竖向，锁定为竖向浏览，不捕获指针、不阻断默认滚动、不触发卡片复制。
   - 严格限定卡片点击复制条件：仅在未发生轴向锁定、位移 < 10px 且持续时间 < 350ms 的短促点击下方可触发复制。
   - 处理 `pointercancel`：释放捕获并平滑弹簧复位，不执行任何业务跳转或复制。
2. **打乱前后可见步数设置生效**：
   - 文件：`src/ui/ui-controller.js`、`style.css`
   - 建立 `.reel-step-item.step-hidden` 类（`opacity: 0; visibility: hidden; pointer-events: none;`）。
   - 在视轨生成与增量更新逻辑中，对超出 `scrambleVisiblePrev`（前置步数）与 `scrambleVisibleNext`（后置步数）的元素施加 `step-hidden`，让用户设置即时反馈于视觉呈现。
3. **消除启动打乱幽灵历史**：
   - 文件：`src/ui/ui-controller.js`
   - 页面启动初始化时调用 `setNewScramble(currentScramble, true)`，标明为已有历史态，禁止重复向 `scrambleHistory` 数组 push 相同或新打乱，保证首次加载打乱历史长度严格为 1，向右滑动手势正确呈现“已经是第一个打乱”。
4. **空格按键重复过滤**：
   - 文件：`src/ui/ui-controller.js`
   - 在 `Space` 按键处理最前端增加 `if (e.repeat) return;`，防止长按空格导致计时器在几十毫秒内反复触发 start/stop。

### 2.5 阶段 4：Service Worker 升级保护与界面 Emoji 清理

1. **Service Worker 控制权变更安全门禁**：
   - 文件：`index.html`、`src/ui/ui-controller.js`
   - 暴露 `window.__isTimerActive` 状态检测器。
   - 在 `controllerchange` 触发时检查：若计时器处于 `RUNNING` 或 `INSPECTION` 态，设置 `window.__pendingSwReload = true` 并以 toast 提示用户更新已挂起；直到本轮成绩结算写入 localStorage 且界面转入空闲/完成态后，再安全触发页面刷新，杜绝中途强刷断联。
2. **界面与日志 Emoji 字符彻底清理**：
   - 清理范围：`index.html`、`src/ui/ui-controller.js`、`style.css`。
   - 移除所有下拉菜单、预设按钮、连接状态、诊断日志中的图标表情字符，保持终端工程的严谨性与专业性。

---

## 3. 回归测试验证结果

在 Termux 本地环境中执行全套离线回归测试：

```bash
$ node tests/run-core-tests.js

========================================
Running 11 Core Regression Tests...
========================================
 [PASS] formatTime: correctly formats sub-minute, multi-minute, DNF and invalid times
 [PASS] calcMo3: calculates untrimmed arithmetic mean of 3 solves
 [PASS] calcAverage (Ao5): correctly trims fastest & slowest and handles DNF
 [PASS] calcAverage (Ao12): correctly trims 1 fastest & 1 slowest and averages 10
 [PASS] SolveSession: mock storage and statistics contract consistency
 [PASS] SolveSession.togglePenalty: cycles correctly and synchronizes finalTimeMs and formattedTime
 [PASS] csTimer export: exports integer milliseconds and correct penalty format
 [PASS] min2phase group theory: C^-1 * T solves current cube state C to target T
 [PASS] TimerController: hardware calibration validity gate applies within 300ms, rejects beyond
 [PASS] TimerController: WCA inspection +2 penalty carryover and DNF
 [PASS] Scramble lookahead: step visibility matches visiblePrev and visibleNext parameters
========================================
Result: 11 passed, 0 failed
========================================
```

测试结果：全部 11 项测试用例 100% 通过，无告警、无异常退出。

---

## 4. Git 提交记录

本次整改分三批严格按语义提交并推送到远端仓库：

1. `7704fe9`: `tests(core): add offline regression test suite for engines and algorithms`
2. `23cdd3a`: `fix(timer): restore bluetooth calibration gate, inspection penalty, and stats contracts`
3. `7d2dbef`: `fix(ui): isolate mobile gestures, respect lookahead, guard background reload, and remove emojis`

远端状态：已成功推送至 GitHub `origin/main`。
本地服务：8080 端口 HTTP 服务正常运行，所有静态资源均已通过语法与响应验证。
