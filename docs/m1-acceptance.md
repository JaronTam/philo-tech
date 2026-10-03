# M1 批工作验收报告

- 日期：2026-10-04 · 基线提交：`400e9d3`（M1 = `da20600` feat + `400e9d3` docs，工作树干净）· 复核方式：独立会话实测（命令复跑 + dev 站 DOM 断言 + 数据 / 文档抽核；全程未改任何文件、无提交）
- 复验命令：`npm run validate` / `measure` / `build`（Node 24.18 / npm 11.19）

## 验收结论

`[STATUS: AC]`（audit 协议三值判定）

- **M1 验收标准 AC**：prd2 §10 口径「语义列对齐肉眼可辨（同 `column` 的节点成一列）」DOM 实测达标（§3）。
- **交付物整体：通过**。无 blocking；1 项内容小缺陷 + 2 项登记（§6）。

核查点（≤5）：

- 20 节点 / 16 边落 `data/vol-0.json`（13/8）+ `vol-1.json`（7/8），`validate` 全绿
- `measure` 与 checklist 快照逐项复现：6.8px/年 段高 632.4 / 越段 31.2 / 前史 H 2160 需高 2150.3 / 实排余违规 1 处 7.5px / master 前史孤立无
- 主图 theory 6 条 x=569、device 4 条 x=611（checklist 断言数字实测复现）；前史 theory 7 同 x、device 5 同 x；卷 1 device 5 同 x
- 六视图 0 console error / 0 warning；LOD 0.29 藏灰字 → 1.107 显形；minor < 0.5 整节点隐藏
- `build` gzip 135.21KB（预算 500）；sources 抽核 5 URL 全 200；`checked_at` 全 2026-10-04

## 1. 命令复验

| 命令 | 结果 |
|---|---|
| `npm run validate` | nodes 20 / edges 16，全部通过（citation 可点击性等 M2 后启用） |
| `npm run measure` | 与 checklist「M1 实测记录」数值逐项一致（段高 632.4 / 需高 663.6 / 前史 2160 vs 需高 2150.3 / 卷 1 2000 vs 1474.5 / 去灰字 6、余违规 1 处 7.5px / 主图实排 0 违规） |
| `npm run build` | tsc --noEmit 无错 + vite build；JS gzip 135.21KB |

## 2. 数据内容抽核

- vol-0 13 节点 / 8 边；vol-1 7 节点 / 8 边；跨卷边 5 ≤ 5 ✓
- `PRE_theory` 7 节点（布尔 / 罗素 / 哥德尔 / 丘奇 / 图灵机 / 香农 / M–P）；validate.ts:58 有「PRE_theory 限 year < 1947」哨兵校验
- `checked_at` 20/20 = 2026-10-04 ✓；禁用词 0 命中；concepts 3–8 全合规；sources ≥1 全有；citation 16/16 有
- relation 实际用 3/6 类（conceptual_inf 8 / enables 6 / direct_fork 2）——20 节点规模正常，非缺陷（§6 B3）
- master 子图 = 12 节点 / 9 边，与主图 DOM 9 条边一致（measure 输出「master 子图（12 条）」= 12 节点，措辞易混，数据无矛盾）
- sources 抽核 5 URL 全 200：gutenberg 15114 / plato principia / doi:10.1007/BF01700692 / ibm punched-card-tabulator / iastate history
- 缺陷 B1：summary 违规 1 处（§6）

## 3. 站点 DOM 实测（dev 站）

### 3.1 列对齐（M1 关键闸门）

| 视图 | 节点数 | 实测 |
|---|---|---|
| 主图 | 12 | theory 6 条同 x=569（布尔 / 罗素 / 哥德尔 / 丘奇 / 香农 / M–P）；device 4 条同 x=611（晶体管 / Baby / IC / 4004）；EDVAC 单列；LISP 单列 |
| 前史 | 13 | theory 7 条同 x（含图灵机）；device 5 条同 x（Hollerith / ABC / Colossus / Harvard / ENIAC）；EDVAC 单列 |
| 卷 1 | 7 | device 5 条同 x；LISP、感知机各归列 |
| 卷 2–4 | 0 | 轴正常（卷 2 起 1980 … 卷 4 起 2015），无残留节点 |

checklist 断言数字（theory 6 @ 569、device 4 @ 611）实测复现。图灵机 1936 不在主图 = master-candidates v0.2「−图灵机」（F-D-4）一致。

### 3.2 LOD 与灰字降级

- 主图 fitView zoom 0.2925：12 节点 0 个显 concepts（灰字藏）→ zoom 1.107：concepts 显形（阈值 0.75 区间内）
- 前史 fitView 0.378：minor 节点（Colossus / Harvard Mark I）整节点空渲染 → zoom 2.5 显形（LOD < 0.5 隐藏）
- 灰字降级：前史 6 节点去 concepts（丘奇 / 图灵机 / 香农 / Colossus / Harvard / ENIAC），与 measure「去灰字 6」一致；主图实排余违规 0

### 3.3 边

- 主图 9 条边 = master 子图边数 ✓；正交横-竖-横折线；同列边右侧旁路 x=136（节点右缘 130，6px 旁路）✓

### 3.4 console

- 六视图全切换（主图 / 前史 / 卷 1–4）：0 error / 0 warning

## 4. 文档与 schema 同步

- prd2 v5（head 含 schema v5.2）· ui-spec v0.9 · content-spec v0.9 —— 与 checklist 状态行一致
- PRE_theory 改判面同步完成：`src/lib/types.ts:9`（哨兵 + year < 1947 约束注释）· `data/meta.json` · `scripts/validate.ts:16,58`（去特判）

## 5. 事实面

- 前史 13 条 = 理论 7 + 机器 6（Hollerith / ABC / Colossus / Harvard Mark I / ENIAC / EDVAC 报告；Z3 1941 出图不在数据）
- 主图根节点布尔 1854 在 theory 列，x=569 ✓

## 6. 缺陷清单与下一步

| # | 位置 | 缺陷 | 级别 |
|---|---|---|---|
| B1 | `data/vol-1.json` manchester-baby-1948 | summary 63 字符（含标点）> content-spec §1「≤60 字」；`scripts/validate.ts:62` 只查缺失不查长度（校验盲区） | 小 |
| B2 | `src/App.tsx` | 节点单击无详情框响应——非 M1 范围（prd2 §10：M1 = 列对齐，M2 交互四项不含详情框；ui-spec §4 spec 已定）。建议 M2/M3 计划显式排期，避免落空 | 登记 |
| B3 | 16 边 | relation 仅用 3/6 类——20 节点规模正常（paradigm_shift / convergence / composition 预期出现在卷 3–4） | 登记 |

B1 修复建议（二选一或都做）：summary 压缩至 ≤60 字；validate.ts 增 summary 长度校验（防复发，M3 全量数据前加）。

## 7. 下一步（M2）

- 交互四项（BFS < 100ms @ 250 节点）——checklist 待办①
- B2 详情框排期、B1 summary 校验落地
- 推送待裁定（M1 数据上线会覆盖 M0 骨架，checklist 快照③）
