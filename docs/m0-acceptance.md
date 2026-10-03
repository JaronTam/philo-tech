# M0 批工作验收报告

- 日期：2026-10-03 · 基线提交：`eef87dd` · 复核方式：独立会话只读审计（审计后工作树逐项未变，无任何提交）
- 复验命令：`npm run typecheck` / `build` / `validate` / `measure` 全绿（EXIT=0，Node 24.18 / npm 11.19）

## 验收结论

1. **M0 验收标准 AC**：`docs/prd2.md` §10 两项口径（时间刻度与年份对得上、泳道分隔可辨）经 dev 站 DOM 实测达标，证据见本报告第 6 节。
2. **交付物整体：有条件通过**。骨架无功能缺陷；另有 4 项必须修（M1 前）与 8 项可延后，清单见本报告第 4 节。
3. **事实面 3 项待核**（本会话出网通道全不可用所致，WebSearch 403 / WebFetch 域校验拦截 / curl HTTP=000），不阻塞 M0 骨架验收，但裁定②（哥德尔→图灵 不画）的对外引用在 M1 前史写作前需补核。

## 1. 文档自洽

数值链核对全部通过：分段 6.3/12/25/35/55 在 `docs/prd2.md:179`、`docs/ui-spec.md:27-32`、`src/lib/volumes.ts:26-32` 三方一致；段高合计 2666.9≈2667、主图容器 2750、前史卷 2160（93 年 → 23.2px/年）、卷表 60.6/100.0/133.3/166.7 与 2000÷年数互洽；禁用词 25 词在 `docs/content-spec.md:63` 与 `data/meta.json` 逐条一致；master 44 条在 `docs/master-candidates.md` 与 `data/master-candidates.json` 行序一致；前史 13 条（理论 7 + 机器 6）在 content-spec §4 与 `scripts/measure.ts:23-37` 一致；主图 173 年 = 93+33+20+15+12 核对无误。

| # | 位置 | 缺陷 | 级别 |
|---|---|---|---|
| 1.1 | `docs/ui-spec.md:21` | 卷表主图行「段高合计 2360」，同文件 `:32` 分段表合计 2667，内部自相矛盾 | 必须修 A |
| 1.2 | `checklist.md:3` | 状态行「prd2（v3）」——实际 v4 | 可延后 |
| 1.3 | `docs/ui-spec.md:1`、`docs/content-spec.md:1` | H1 写 v0.5 / v0.6，状态行已 v0.7 / v0.8 | 可延后 |
| 1.4 | `src/lib/volumes.ts:15` | height 注释「主图 2400 / 段高 2360」腐值，实值 2750 / 2667 | 可延后 |

交叉引用检查：`checklist.md` §2.5 → ui-spec §1 → master-candidates → data JSON 引用链无断链；全部 § 编号命中对应章节。

## 2. 代码与规格一致

- 泳道宽公式 `max(列数,3)×112+32`：`src/lib/layout.ts:35-40` 与 ui-spec §1 一致，DOM 实测六泳道 = 368/368/704/368/368/368。
- 理论单列 144px 于 x=24、节点 x=24+6：`src/lib/layout.ts:16,59` 与 ui-spec §1「x = 24 + 6」一致。
- 避让 ≤±20px 与块高模型（主标折行×20 + 灰字≤2 行×15+4）：`src/lib/layout.ts:11-14,114-128` 与 ui-spec §1 判据口径一致。
- schema：`src/lib/types.ts` 三接口与 prd2 §3.3 v5.1 字段逐一对应（含 `label_en` / `checked_at` / `archive_url`）。
- 数据：`data/meta.json` 19 列 = content-spec §2 六层注册表；禁用词子串 + 拉丁大小写不敏感匹配在 `scripts/validate.ts:39-43`；越界半开 [1854,2027) 与 theory 列限前史（year<1947）在 `scripts/validate.ts:6-7,54-57`。

| # | 位置 | 缺陷 | 级别 |
|---|---|---|---|
| 2.1 | `scripts/validate.ts:80` | convergence 入度检查在边循环内即时判定，inDeg 未累计完；target 的第一条入边恰为 convergence 边时计数=1 误报 ERROR，边序决定对错。规则本意（prd2 §9）是最终入度 ≥2，判定须挪出边循环 | 必须修 C |
| 2.2 | `src/components/TechBlock.tsx:12-19` | weight 映射未实现（14/500 硬编码），ui-spec §2 定义了 epic 16/700；M1 有 weight 后需与 estimateBlockHeight 同步 | 可延后 |

## 3. 实测复现与 measure.ts 模型

四命令全部 EXIT=0；build 产物 gzip 129.9KB，低于 ui-spec §7 预算 500KB。与 `checklist.md` §2.5「M0 实测记录」五项对账全中：前史段 586px、前史卷 2160、前史孤岛=无、全表孤立 34 条（正卷边集未写，M1/M3 复跑）、已知残留复现（理论列缺口 2.2/2.2/0.0 ≤3px、McCulloch–Pitts 块底越段界）。

measure.ts 判据模型失真 4 处：

| # | 位置 | 缺陷 | 级别 |
|---|---|---|---|
| 3.1 | `scripts/measure.ts:105` | 汇总行硬编码「现有段高合计 2360」，2667 修订后对比基未动；总需高 2660.1 被显示为「超 ~300px」，实差 ~7px | 必须修 B |
| 3.2 | `docs/ui-spec.md:12` 判据口径 | 口径含灰字，实操定标只按主标轮（前史段灰字预留轮 781.1 → 建议 8.4px/年 被忽略），忽略因果未落文。已登记残留（M–P 越段界、Docker↔K8s）的上游依据空缺 | 必须修 D |
| 3.3 | `scripts/measure.ts:73-75` | 打印过滤前 placeables.length（卷 1 显示「节点 44」实排 9 条）；需高数字本身按过滤后计算、无失真，日志具误导性 | 可延后 |
| 3.4 | `scripts/measure.ts:99-103` | 违规判定浮点 epsilon 病（「哥德尔↔丘奇 缺 0.0」= gap 39.9999 vs 40），同源 = 已登记理论簇 ≤3px 残留 | 可延后 |

模型其余假设自洽且可直接复算：单向下推对给定刻度取每块最早可行位（需高 = 保守上界）；容器余量 83px（2750−2667）吸收前史段缺 59.1px（主标轮需高 645.1−段高 586）后仍有裕；各段需高之和 = 各段独立加高假设，与「主图只加高该段」裁定相容。

## 4. 事实面抽核

本会话三条出网通道（WebSearch / WebFetch / curl）全部不可用，按项目红线「宁缺勿编」标待核、不落结论。结构面已核：三条边均有 citation 出口（`docs/content-spec.md` §3/§4 与 `scripts/measure.ts:40-53` SKELETON），可追溯，只欠事实核验。

| # | 待核对象 | 缺口 |
|---|---|---|
| 4.1 | 罗素《数学原理》→ 哥德尔 1931 / → McCulloch–Pitts 1943 入边依据 | 一文可达原文的出网核验 |
| 4.2 | 图灵 1936 独立于哥德尔（Copeland & Fan 2022） | 该文献本体出处与结论措辞 |
| 4.3 | ABC → ENIAC（1973 Honeywell v. Sperry Rand 判决） | 判决书或权威综述 |
| 4.4 | 补齐条件 | 下一个有网会话逐条核验并记 checked_at 留痕 |

## 5. 裁定完整性

三项裁定 + F-D-4 ① 在 `checklist.md` §2.3/§2.4/§2.5 ↔ 各 docs ↔ data JSON ↔ measure 脚本四方落文且值一致：禁用词 25 词、前史 13 条、master 44 条、无 Z3、主图无图灵机/ENIAC 行、`哥德尔→图灵` 无此边、master JSON 与 md 行序一致。

唯一该记未记：`checklist.md` §2.5 未登记「前史段主标轮缺 59.2px / 灰字预留轮缺 195.2px」两组数字，后者正是 3.2 口径空缺在实测输出上的表现——随必须修 D 一并落文即可闭合。

## 6. M0 站点验收

dev 起站 + 独立 Chromium DOM 断言（截图无法渲染，改坐标断言，证据更强）。主图空态 / 主图试排 / 前史 / 卷 4 四视图无 console error，仅 favicon 404 噪音（`index.html` 无图标链接）。

- **时间刻度与年份对得上**：5 锚点独立计算 vs DOM 实测误差全 <1px——布尔 1854→(30,0)、罗素 1910→y352.8、EDVAC 1945→(286,573.3)、晶体管 1947→(174,585.9)、Transformer 2017→(2350,2116.9)。主图 10 年步进、前史 5 年步进 19 格、卷 4 逐年 12 格，全部与 yForYear 公式吻合。
- **泳道分隔可辨**：6 泳道按 368/368/704/368/368/368 渲染、交替底色（--lane-a/--lane-b）；理论单列 144px 于 x=24；主图试排 44 节点；5 条段界标注（1854/1947/1980/2000/2015 起 · px/年）全部正确。

## 7. 缺陷清单与下一步

**必须修（M1 前，4 项均为一行至数行之改）**

| # | 位置 | 修法 |
|---|---|---|
| A | `docs/ui-spec.md:21` | 主图行 2360 → 2667 |
| B | `scripts/measure.ts:105` | 对比基改动态求值（现 2666.9），防段高调整后基准再腐 |
| C | `scripts/validate.ts:80` | convergence 判定挪出边循环，inDeg 累计完成后检查 |
| D | `docs/ui-spec.md:12` | 落一句定标口径：段高定标按主标轮需高；灰字预留轮仅敏感性阅读，超段由容器余量吸收，M1 带真 concepts 复跑 |

**可延后（M1 中途 P2 顺带，8 项）**：`src/lib/volumes.ts:15` 注释腐值、`checklist.md:3` v3→v4、两份 spec H1 版本号（F-C-1 追踪）、`scripts/measure.ts:73` 日志误导、favicon 404、TechBlock weight 映射、measure 浮点 epsilon、事实面 4.1–4.3 待核 3 项。

建议顺序：修 A–D 四项 → 提交 M0 批 → 有网会话补核事实面 → 进 M1。M1 关键闸门不变：20 手写节点语义列对齐肉眼可辨（`docs/prd2.md` §10）。
## 8. 修复记录（2026-10-03，修复会话）

必须修 4 项 + 可延后 6 项已修；四命令复验全绿（`typecheck` / `build` / `validate` / `measure`，build gzip 129.9KB）；工作树仍无提交。

| # | 位置 | 修复 |
|---|---|---|
| A | `docs/ui-spec.md` 卷表主图行 | 段高合计 2360 → 2667 |
| B | `scripts/measure.ts` 汇总行 | 改为动态 `segmentHeights(main)`：现值「需 2660.1 / 段高合计 2666.9（差 −6.8）」 |
| C | `scripts/validate.ts` | convergence 判定挪出边循环（入度累计后查）；回归实测：convergence 边在前 + 最终入度 2 → 0 error（旧序假阳已消）；最终入度 1 → 仍报 1 error |
| D | `docs/ui-spec.md` 判据口径 | 补「段高定标按主标轮需高；主标轮缺口 59.2px 由容器余量 83px 吸收；灰字预留轮 195.2px 不吸收，M1 带真实 concepts 复跑」 |
| 1.2 | `checklist.md` 状态行 | prd2 v3 → v4 |
| 1.3 | 两份 spec H1 | ui-spec v0.5 → v0.7；content-spec v0.6 → v0.8 |
| 1.4 | `src/lib/volumes.ts` 注释 | 2400 / 2360 → 2750 / 2667 |
| 3.3 | `scripts/measure.ts` 日志 | 打印过滤后节点数（卷 1 不再显示 44） |
| 3.4 | `src/lib/layout.ts` | 违规判定加 0.05px 容差（「缺 0.0」浮点假阳已消） |
| §6 | `index.html` | 补内联 SVG favicon（404 噪音消） |

仍延后：2.2 TechBlock weight 映射（随 M1 真实数据）；事实面 4.1–4.3 见 §9。

## 9. 事实面补核（2026-10-03，修复会话有网）

| # | 结论 | 依据 |
|---|---|---|
| 4.1 | 罗素 → 哥德尔 成立 | 哥德尔 1931 论文标题原文即「Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I」（主源自证）；罗素 → M–P：M–P 1943 引文表含 Principia Mathematica（zbMATH 0063.03860） |
| 4.2 | 图灵 1936 独立于哥德尔 成立 | Copeland & Fan, "Did Turing Stand on Gödel's Shoulders?", Math. Intelligencer 2022（10.1007/s00283-022-10177-y）：OCN 全文仅 3 处提及 Gödel、核心思想独立——`哥德尔 → 图灵` 不画的依据闭合 |
| 4.3 | ABC → ENIAC 成立 | Honeywell v. Sperry Rand（1973-10-19，Judge Larson）判决原文「Eckert and Mauchly … derived that subject matter from … Atanasoff」；国会记录 GPO-CRECB-1974-pt2 |

注：以上为边级依据核验；节点级 `checked_at` 与逐条留痕仍按 content-spec §5 随 M1 写作执行。
