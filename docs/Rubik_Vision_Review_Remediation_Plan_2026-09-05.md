---
title: Rubik Vision 审查问题整改实施计划
date: 2026-09-05
status: Planned
tags:
  - rubiks-cube
  - implementation-plan
  - code-review
  - termux
  - web-bluetooth
source_report: Rubik_Vision_Complete_Code_Review_2026-09-05.md
target_repository: https://github.com/PilotXing/rubiks
baseline_commit: 9f374cd3b1f8762cf7b1eb0a3f2e26f21bce513f
---

# Rubik Vision 审查问题整改实施计划

## 1. 目标

在不改变 Termux 本地运行、无构建、离线优先架构的前提下，按以下顺序完成整改：

1. 先保证成绩、统计和导出数据可信。
2. 再修复手机端用户能直接遇到的交互缺陷。
3. 用 GAN 真机回归保护历史上为蓝牙同步加入的逻辑。
4. 最后清理 UI 和 CSS 技术债，避免边修边引入新回归。

本计划不包含 React、Vite、TypeScript、云端服务或强制 IndexedDB 迁移。

## 2. 执行原则

- 每个阶段单独提交，避免把算法修复和 UI 重构混在同一个 commit。
- 任何打乱追踪修改都必须同时测试 Direct Move-Stream 和 facelets 绝对状态。
- 不直接删除静态首屏公式、连接后同步、Direct Move-Stream 或延时 resize。
- 先建立会失败的测试，再修改实现。
- 每阶段完成后都在 Android Termux 环境做一次离线 smoke test。
- 历史数据格式发生变化时必须兼容旧 localStorage。

## 3. 阶段总览

| 阶段 | 内容 | 优先级 | 预计提交数 | 完成标准 |
|---|---|---:|---:|---|
| 0 | 建立基线与测试工具 | P0 | 1 | 测试可在 Termux 一条命令运行 |
| 1 | 时间校准、inspection 与 penalty | P0 | 2 | 原始、校准、最终时间语义一致 |
| 2 | 统计与 csTimer 导出 | P0 | 2 | 已知夹具计算和导入正确 |
| 3 | 手机手势与打乱历史 | P1 | 2 | 滚动、滑动、点击互不误触 |
| 4 | Service Worker 与启动可靠性 | P1 | 1 | 更新不会打断正在进行的计时 |
| 5 | GAN 真机回归与追踪收敛设计 | P1 | 1–2 | 关键帧序列全部通过 |
| 6 | DOM、主题和重复渲染清理 | P2 | 2–3 | 死引用移除，行为保持不变 |
| 7 | 无构建模块化拆分 | P2 | 3–5 | UI 文件职责清晰且离线运行不变 |

## 4. 阶段 0：建立可重复的测试基线

### 工作项

- [ ] 确认 Node 在桌面和 Termux 中均可运行。
- [ ] 新增 tests 目录和单一测试入口。
- [ ] 为浏览器 API 提供最小 fake clock、fake storage 和 fake requestAnimationFrame。
- [ ] 固定一组旧版 localStorage 成绩数据作为兼容夹具。
- [ ] 固定一组 scramble、move、facelets 事件序列。
- [ ] 记录当前 390 × 844 首屏截图和关键 DOM 状态。

### 首批测试

- [ ] penalty 在 NONE、PLUS_TWO、DNF 之间切换。
- [ ] Mo3、Ao5、Ao12 和 DNF 边界。
- [ ] inspection 的 14.999、15.000、16.999、17.000 秒。
- [ ] csTimer 导出普通成绩、加罚和 DNF。
- [ ] 页面首次启动只产生一条当前打乱。

### 验收

- 桌面与 Termux 使用同一条命令运行。
- 测试失败时返回非零退出码。
- 不依赖网络，不新增构建器。

### 建议提交

feat(test): add offline regression harness for timer and session logic

## 5. 阶段 1：修复时间、inspection 与 penalty

### 1A. 明确三种时间

- rawTimeMs：浏览器本地单调时钟测得的时间。
- calibratedTimeMs：根据 GAN 硬件时间戳拟合出的参考时间。
- finalTimeMs：统计、显示和导出使用的权威时间。

先决定 finalTimeMs 的产品规则。推荐默认采用 rawTimeMs，只有硬件拟合通过质量检查时才采用 calibratedTimeMs，并保留两者供诊断。

### 1B. 修复 GAN 校准依赖

- [ ] 调整脚本顺序，或把校准器通过构造参数注入 TimerController。
- [ ] 不再在模块加载时永久捕获未定义的 GanBluetooth。
- [ ] 加入拟合结果不存在、非有限值、负值和偏差过大的降级路径。
- [ ] TPS 与 formattedTime 使用同一权威时间。

### 1C. 实现 inspection penalty

- [ ] inspection 开始时清空待应用 penalty。
- [ ] 15.000 秒设置 PLUS_TWO。
- [ ] 17.000 秒设置 DNF。
- [ ] 从 INSPECTION 转为 RUNNING 时保留 penalty。
- [ ] solve 完成时统一计算 finalTimeMs。
- [ ] UI 在 15–17 秒明确显示 +2。

### 1D. 统一 penalty 表达

- [ ] 定义 NONE = 0、PLUS_TWO = 2000、DNF = -1。
- [ ] 删除 UI 中 penalty === 2 的判断。
- [ ] 统计、CSV、csTimer、历史表共用同一组常量。
- [ ] 读取旧记录时做兼容归一化。

### 验收

- 15.000 秒开始计时的成绩自动加 2 秒。
- 17.000 秒仍未开始时记录 DNF。
- 历史表、趋势图、CSV 和导出展示一致。
- 没有硬件时间戳时行为与当前版本一致。

### 建议提交

fix(timer): restore bluetooth calibration dependency and define final time

fix(inspection): apply WCA plus-two and unify penalty values

## 6. 阶段 2：修复统计与 csTimer 导出

### 2A. 统计接口

- [ ] getStats 只返回带明确单位的数值字段，例如 bestMs。
- [ ] UI 统一调用 formatTime，不再读取不存在的 bestFormatted 等字段。
- [ ] 空 session、全 DNF、单条成绩都有明确结果。

### 2B. Mo3、Ao5、Ao12

- [ ] 将三次成绩命名为 Mo3，使用算术平均，不裁剪。
- [ ] Ao5 和 Ao12 独立实现 WCA-style average。
- [ ] 明确任意 AoX 的裁剪策略；若不支持则限制输入，不隐式猜测。
- [ ] 为一个 DNF、两个 DNF 和窗口滑动加入测试。

### 2C. csTimer

- [ ] 导出的第二个时间字段使用整数毫秒。
- [ ] 保持 +2 penalty flag 与基础时间的 csTimer 语义一致。
- [ ] 用 14.17 秒、16.17 秒加罚和 DNF 三条记录真实导入 csTimer。
- [ ] 把通过导入的示例文件保留为回归夹具。

### 验收

- Trends 不再错误显示双横线。
- Mo3 对 10、11、30 秒返回 17 秒。
- 14.17 秒导入 csTimer 后仍显示 14.17 秒。

### 建议提交

fix(stats): align stats contract and calculate mean of three

fix(export): emit cstimer durations in milliseconds

## 7. 阶段 3：修复手机手势与打乱历史

### 3A. 可见步数设置

- [ ] 确定是否保留前置/后置可见设置。
- [ ] 若保留，让设置进入步骤 view model 和可访问性状态。
- [ ] 若暂不实现，隐藏设置并保留旧值，避免误导用户。

### 3B. 手势状态机

- [ ] pointerdown 初始化 start、axis、moved、cancelled。
- [ ] 首次越过阈值时锁定 horizontal 或 vertical。
- [ ] vertical 手势禁止复制与轮播。
- [ ] pointercancel 只复位，不执行点击或导航。
- [ ] tap 只允许低位移、短时间、未取消的 pointerup。

### 3C. 启动打乱历史

- [ ] 启动时只确定一个 current scramble。
- [ ] 初始化 tracker 后渲染，不向 history 再追加一次。
- [ ] pending 只作为下一条预览。
- [ ] 用户主动下一条或完成复原时才进入历史。
- [ ] 保留静态 HTML 首屏公式，避免重新出现白屏。

### 3D. 键盘

- [ ] 忽略 Space 的重复 keydown。
- [ ] 评估改成 keydown armed、keyup start/stop。

### 验收

- 从公式区域竖向滚动不复制。
- 横向滑动仍保持当前动画和阻尼。
- pointercancel 不产生业务动作。
- 新打开页面无法滑回一条未使用过的公式。

### 建议提交

fix(gesture): separate vertical scroll tap and cancelled pointers

fix(scramble): initialize one visible scramble without ghost history

## 8. 阶段 4：Service Worker 与初始化可靠性

### 工作项

- [ ] Service Worker 更新就绪时先通知页面。
- [ ] RUNNING 或 INSPECTION 状态禁止自动 reload。
- [ ] IDLE 或 FINISHED 时允许用户应用更新。
- [ ] 对缓存版本升级、离线冷启动和旧缓存恢复做测试。
- [ ] 把 DOMContentLoaded 拆成命名明确的启动阶段。
- [ ] 每阶段失败时显示可见错误，不用一个大 try/catch 静默吞掉。
- [ ] 核心 timer 与蓝牙仍可在图表初始化失败时工作。

### 验收

- 更新不能打断一局计时。
- 图表故障不会让蓝牙、设置和计时按钮全部失效。
- 离线冷启动仍能进入主界面。

### 建议提交

fix(pwa): defer service worker takeover until timer is idle

refactor(init): isolate optional module failures during app bootstrap

## 9. 阶段 5：GAN 真机回归

这一阶段是修改打乱追踪守卫前的强制门槛。

### 连接状态

- [ ] 已复原魔方首次连接。
- [ ] 未复原魔方首次连接。
- [ ] 连接中断后重连。
- [ ] 页面离线重开后连接。
- [ ] 连接发生在尚未打乱、打乱中和计时中。

### 第 0 步与半转

- [ ] 普通 90 度第一步。
- [ ] 错误方向第一步。
- [ ] R2 由两个 90 度帧组成。
- [ ] R2 由一个 180 度帧组成。
- [ ] 第一个 90 度随后反向撤销。

### 双事件流

- [ ] move 后 facelets。
- [ ] facelets 后 move。
- [ ] 重复 move。
- [ ] 丢失一帧 move 后由 facelets 恢复。
- [ ] facelets 长时间不更新时 move stream 仍可推进。

### 偏离与纠偏

- [ ] 偏离 1、2、3 步。
- [ ] 偏离超过 3 步。
- [ ] 按提示撤销错误动作。
- [ ] 重寻路后完成原目标状态。

### 决策点

完成矩阵后再决定：

- currentStep > 0 守卫应删除、下沉还是改成初始同步状态。
- Direct Move-Stream 是否保留为预测层。
- facelets 是否有资格成为唯一权威状态。

### 验收

- 每个场景保存日志和期望结果。
- 没有第 0 步卡死、公式静默改写或高亮漂移。
- 任何追踪器重构均能重放全部事件夹具。

## 10. 阶段 6：清理可证明的 UI 遗留

### DOM

- [ ] 生成 JavaScript 静态 ID 与 HTML ID 对照表。
- [ ] 白名单动态 toast、运行时节点和 canvas fallback。
- [ ] 删除历史确认已移除的约 19 个 DOM 引用。
- [ ] 同步删除对应事件分支和无用 CSS。

### 主题与状态

- [ ] 统一为 data-theme、data-accent、data-mode。
- [ ] 读取旧 localStorage key 后迁移一次。
- [ ] 禁止重写整个 body.className。
- [ ] 删除隐藏的旧主题 selector。

### 渲染

- [ ] 抽取 deriveScrambleStepView。
- [ ] 首次 HTML 与原地更新共用相同状态派生。
- [ ] 历史表使用 tbody 事件委托。
- [ ] 自定义算法名称和描述使用 textContent 或统一转义。
- [ ] 合并重复的统计和启动渲染。

### resize

- [ ] 建立 scheduleLayout 统一入口。
- [ ] 用 requestAnimationFrame 合并同一帧重复请求。
- [ ] 保留首次图表零宽和横屏全屏测试。

### 验收

- 清理前后移动端截图和关键 DOM 快照一致。
- 控制台无新增 warning/error。
- 删除项都有 Git 历史或静态 ID 对照支持。

## 11. 阶段 7：无构建模块化拆分

建议目录：

    src/ui/
    ├── app-controller.js
    ├── scramble-view.js
    ├── scramble-gesture.js
    ├── timer-view.js
    ├── analytics-view.js
    ├── practice-view.js
    └── settings-view.js

    styles/
    ├── tokens.css
    ├── base.css
    ├── components.css
    ├── themes.css
    └── modes.css

### 拆分顺序

1. 先抽纯函数和 view model。
2. 再抽没有跨模块状态的设置与历史表。
3. 然后抽手势和打乱视图。
4. 最后保留 app-controller 负责实例创建和事件连线。
5. CSS 按组件迁移，每次只迁一个可截图验证的区域。

### 验收

- index.html 仍通过普通 script/link 加载。
- start.sh 和 Termux 使用方式不变。
- 完全离线可运行。
- app-controller 只保留实例化、启动阶段和跨模块事件。
- 不以文件拆分为理由改变已验证的业务行为。

## 12. 提交与回滚策略

推荐每个 commit 只做一个行为变化：

1. 测试基线。
2. 校准依赖。
3. inspection/penalty。
4. stats/Mo3。
5. csTimer 导出。
6. 手势。
7. 打乱初始化。
8. Service Worker。
9. 真机验证后的追踪器调整。
10. 后续纯重构。

每个行为提交都应附：

- 修复前可复现步骤。
- 对应测试。
- 手机或 GAN 真机验证结果。
- 回滚后不会破坏的数据格式说明。

## 13. 完成定义

全部整改完成需要同时满足：

- [ ] P0 与 P1 项全部关闭。
- [ ] 自动测试在桌面和 Termux 通过。
- [ ] GAN 真机矩阵通过。
- [ ] 390 × 844 竖屏和横屏无布局回归。
- [ ] 离线冷启动、Service Worker 更新和旧数据加载通过。
- [ ] csTimer 真实导入结果正确。
- [ ] 两份旧 review 中保留的历史保护均有测试覆盖。
- [ ] README 记录测试命令和数据备份方式。

## 14. 当前状态

- [x] 完整代码与 Git 历史审查
- [x] Gemini 报告交叉复核
- [x] 整改范围和优先级确定
- [ ] 阶段 0：测试基线
- [ ] 阶段 1：时间与 penalty
- [ ] 阶段 2：统计与导出
- [ ] 阶段 3：手机交互
- [ ] 阶段 4：PWA 与初始化
- [ ] 阶段 5：GAN 真机回归
- [ ] 阶段 6：UI 清理
- [ ] 阶段 7：模块化拆分

下一步：从阶段 0 开始，在独立分支中建立无网络测试入口和第一批失败测试。
