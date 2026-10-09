# M3 B0 批工作验收报告（回顾性补验收）

- 日期：2026-10-09 · 基线提交：`7dd703f`（B0 = `4bef487` + `08dd894` + `7dd703f`，自 `72234f8` 起）· 复核方式：独立会话实测（worktree @ `7dd703f` 五命令复跑 + 独立数据复算脚本 + `measure --draft` 正/错两径 + dev 站 DOM 断言 + 部署链 GitHub API 核对；未改基线任何文件、无提交，唯一写入 = 本报告）
- 复验环境：worktree `.playwright-mcp/b0-wt`（detached @ `7dd703f`，独立 `npm ci`，Node v24.18.0）；dev 站 `npm run dev -- --port 5201 --strictPort`（vite base `/philo-tech/`，`/` 302）；Playwright 浏览器断言 1920×1080；gh 未登录 → api.github.com 未鉴权（本批 2 次调用）
- **历史批口径**：复现对象 = B0 批时点状态（20 节点 / 16 边）。代码零差异已独立复核：`7dd703f → 1969a9b` 间 `src/**` / `scripts/measure.ts` / `scripts/bench-bfs.ts` / `data/meta.json` / `package.json` / `package-lock.json` 全部 ZERO DIFF；`scripts/validate.ts` 唯变 +13/−2（D-12 people 2–4 规则、J7 边预算 32/7），B0 所加「前史入口」三规则（存在 / master / year<1947）原样保留 ✓

## 验收结论

`[STATUS: AC]`（audit 协议三值判定）

- **G0 五命令全绿复现**：typecheck 无错；validate 20/16 EXIT=0；measure 逐项读数与批时口径吻合；bench 合成 p95 0.208ms（两次同值）；build **清洗后逐字节复现**（`index-Dntz4j5O.js` 442,664B / gzip 141.54kB、`index-BIaq5sj1.css` 24,195B / 5.03kB，与批时读数及 checklist 所载线上资产哈希一致）
- **数据独立复算 FAIL COUNT 0**：总量 20/16、分卷 13+7、master 12、连通 7/6/5/2（分组逐节点吻合）、master 子图 9 边、preEntry 2 条三条件全过；唯一对账失配 = Pitts label 漂移（D-17）
- **`measure --draft` 正/错两径 + 3 边界全过**：正径 45 = 38+7 · 预检 0/0 · 1959.4/2000 · EXIT=0；注入错误 → error 5 / warn 1 且 EXIT=1；缺路径/main/绝对路径三边界 EXIT=1（行为符合文档口径）
- **DOM 断言全过**：chip 恰 2 处且点击落 `#vol=pre&node=`、无 dim、history 不变；缩放 ×1.2 阶梯 + 0.75 舍入边界 + 25% 精确钳制；L2 928px 与三列 x 公式吻合；搜索 / 深链 / tooltip 三态 / BFS dim / 收敛空态 disabled / 六视图 0 console error
- **部署链**：`37226881285`（head `08dd894`）与 `37226962390`（head `7dd703f`）均 success ✓
- 缺陷：2 项小缺陷（D-16 / D-17）+ 环境注记与口径澄清（§8），**无 blocking**

核查点（≤5）：五命令复现（§1）· 数据复算 0 fail（§2）· draft 双径与退出码（§3）· DOM 全矩阵（§4）· 文档同步与部署链（§5/§6）

## 1. 命令复验（worktree @ 7dd703f，先跑再比）

| 命令 | 复现读数 | 比对 |
|---|---|---|
| `npm run typecheck` | tsc --noEmit 无错 | ✓ |
| `npm run validate` | `nodes 20 / edges 16` 全部通过，EXIT=0（直取退出码） | ✓ |
| `npm run measure` | 主图 [1854,1947) 6.8px/年 高 632.4 · 主标轮需 663.6 缺 31.2 · 实排 672.8（去灰字 4，余违规 0）· [1947,1980) 308/396 实排 342 · 其余三段空 · 段高合计 2713.4 · 前史 2150.3/2160（实排 2167.5 · 余违规 1 = Colossus ↔ Mark I 7.5px）· 卷 1 1474.5/2000 · 卷 2–4 空 · master 子图 12 节点 / 9 边 · 全表孤立 0 · 连通 7/6/5/2 | ✓ 逐项同 |
| `npm run bench` | 合成 250/383：deriveLit p50 0.111 / **p95 0.208**（二跑 0.110/0.208）· 真实 20（master 12）/16：出度 max 2（罗素《数学原理》）· 入度 max 2（并列：EDVAC 报告 + Manchester Baby，bench 显示先遇到者）· master→master 入度 9 目标各 1（bench 取 top 5 截断）· convergence 0 · 跨卷 vol-0→1 = 5 · 真实 deriveLit p50 0.004–0.005 / **p95 0.007–0.008** | ✓ 同量级 |
| `npm run build` | `index-Dntz4j5O.js` 442,664B / vite gzip **141.54kB** · `index-BIaq5sj1.css` 24,195B / gzip 5.03kB | ✓ 精确 |
| 容器真源 | `src/lib/volumes.ts` 主图 `height: 2800`（= 段高合计 2713.4 + 余量 86.6） | ✓ 同 ui-spec §1 |

- build 注记：首次在含遗留未跟踪文件（`data/candidates/tmp-vol-1.draft.json`，主会话遗留）的树上构建时文件名哈希偏移（`index-C3gikZSW.js` / `index-CfBIOIy-.css`，JS 字节数恰同、CSS +66B）——Tailwind v4 自动内容扫描纳入该未被 gitignore 的文件所致；移出后重建**逐字节复现**批时哈希。B0 时点（CI / 干净树）无此文件，故不受影响（详见 §8）。
- Node v24.18.0 与批时环境（Node 24.x）同大版本。

## 2. 数据独立复算（独立脚本直读 `data/*.json`，不调用仓库脚本，FAIL COUNT: 0）

- 总量 nodes **20** / edges **16**；分卷 13 / 7 / 0 / 0 / 0（节点）· 8 / 8 / 0 / 0 / 0（边）✓
- master = **12**（前史 7 + 卷 1 5）；12 条均命中 `data/master-candidates.json`（44 条候选池）——其中 11 条 label 精确匹配，1 条漂移（D-17）
- relation 分布（自统）：`conceptual_inf` 8 / `enables` 6 / `direct_fork` 2（B0 无 `paradigm_shift`，与预算「全量 ≤8、首用延后」口径相容）
- 出入度极值：出度 max 2 = 罗素《数学原理》（唯一）；入度 max 2 = EDVAC 报告 / Manchester Baby（并列）
- 跨卷边 5 条，全部 vol-0 → vol-1（= pre→v1 上限 8 未触顶；bench 对账同数）
- 连通性独立复算与 measure 分组**逐节点一致**：7（图灵机/EDVAC/Manchester Baby/Manchester Mark 1/Colossus/ENIAC/ABC）· 6（罗素/M–P/感知机/哥德尔/丘奇/LISP）· 5（布尔/香农/晶体管/集成电路/Intel 4004）· 2（Hollerith/Harvard Mark I）；全表孤立 0
- master 子图（两端皆 master 的边）= **9** 条，与 measure「12 节点 / 9 边」及主图 DOM 渲染 9 边三方吻合
- `meta.preEntryNodes` = `boole-laws-of-thought-1854` / `shannon-switching-circuits-1937`，逐条验：节点存在 ✓ / master ✓ / year<1947 ✓

## 3. `measure --draft` 行为（正 / 错两径 + 边界）

- **正路径**（worktree 内 `cp` 主仓 `vol-1.draft.json` 为 tmp 副本）：`草稿 45 节点（新增 38 / 沿用既有 7）` · `预检：error 0 / warn 0` · `卷 1（草稿）：节点 45 · 主标轮需高 1959.4 / 现有 2000 ✓ · 实排需高 1959.4（去灰字 0，余违规 0）` · **EXIT=0**。交叉对账 `docs/m3-candidates-vol1.md:3`「预检 0 error / 0 warn；主标轮需高 1959.4 / H 2000」✓ 同数
- **错误路径**（注入：重复 id + year=1900 + 坏 id）：`预检：error 5 / warn 1`（`[year]` / `[id 重复]` / `[id 格式]` / `[同列同年]×2`，warn = `[id 年份]`）· **EXIT=1**（`scripts/measure.ts:212`，退出码直取未过管道）
- **边界**：`--draft` 缺路径 → 用法提示 + EXIT=1 ✓；`volume:"main"` → `仅支持 v1..v4` + EXIT=1 ✓；绝对路径 `C:/...` → ENOENT + EXIT=1（口径注：路径解析实为 **repo-root 相对**（`import.meta.dirname/..`），非 cwd 拼接；npm script 下二者等价，现象与批时记录一致）
- **「预检 6 项」口径澄清**：实现含 **9 个 error push 点**（id 格式 / id 重复 / 禁用词 / summary / 未知 layer / column 不在 layer / PRE_theory year≥1947 / year 越区间 / 同列同年），按消息标签计 8 类；粗粒度分组（id 规则〔格式+重复〕· 禁用词 · summary · layer/column 注册表〔含 PRE_theory 特判〕· year 越区间 · 同列同年）恰 6 组。声称「6 项」在本口径下成立，但未写明分组归属——记口径注记（非缺陷），建议修复批在 checklist/文档补分组口径。

## 4. dev DOM 断言（dev 站 5201，1920×1080）

| 组 | 断言 | 结果 |
|---|---|---|
| chip | 主图恰 2 处（`boole-1854` / `shannon-1937`）· 点击 → `#vol=pre&node=<id>` + 面板开 + accent outline 选中 + **0 dim**（正确层级测：无 0.1 opacity 块）+ `history.length` 不变（4→4）· pre 视图 0 chip | ✓ |
| 缩放 | 四钮 = `−` / % 读数 / `+` / `适配`；读数 = round(zoom×100)；稳态步进恰 **×1.2**（pre 视图梯 0.25→0.30→0.36→0.43→0.52→0.62→0.7465→0.8958→1.075）；连点间动画排队致读数瞬时滞后（RF 内部动画，非缺陷） | ✓ |
| LOD | <0.5：minor 藏（0.25/0.46 处 Colossus / Harvard Mark I 尺寸归零），concepts 藏；≥0.5 minor 显；concepts 阈值 **0.75 舍入边界实锤**：scale=0.7465（读数已显示 "75%"）concepts=0，scale=0.8958 → 7 节点出灰字 | ✓ |
| 25% 钳制 | 连点 `−` 至 scale **恰 0.25** → 读数 25%、`−` disabled ✓；`适配` 回 fit（pre 46.4% / 主图 35.9%，= `fitView({padding:0.03})`） | ✓ |
| L2 双列 | `meta.columns.L2_language` = 既有序 + `algol-family` / `dotnet-family` 追加末尾（8 列）；lane 宽 = 8×112+32 = **928px**；DOM 布局 x 与公式逐列吻合：主图 theory 30 / device 174 / arch 286 / lisp-family 1022（含 144px 前史单列）；v1 视图 device 30 / lisp-family 878 / nn 2430（无前史列）——既有列 x 未移动；v1 数据两新列 0 节点（V1 才填） | ✓ |
| 回归 | 搜索 1 例（`集成电路` → 面板 + `#vol=main&node=integrated-circuit-1958`）· 深链 1 例（`#vol=v1&node=transistor-1947` → 面板开 + 落地选中）· 边 tooltip：hover 出内容（香农→晶体管·使能 + citation）→ 点击固定（移开仍在）→ 空白点击收起 · BFS dim（点晶体管：5 lit = boole→shannon→transistor→IC→4004 血统，7 dim）· 收敛 toggle 空态 disabled（title「当前数据无 convergence 边（预期出现在卷 3–4）」）· 六视图渲染数 main 12/9 · pre 13/8 · v1 7/3（= 8 − 5 跨卷不画）· v2–4 0/0 · **全程 0 console error**（0 warning） | ✓ |

- 环境注记：新鲜加载首帧 100% → 约 1.2s 后落 fit（React Flow v12 fitView 落位时机不定，`FlowBridge` 注释已载且已用 transform 静止补偿居中请求）；批时 fit 读数 29%（容器较矮）vs 本环境 1920×1080 容器 1034px → 36%，机制（×1.2 步进）一致，批时口径「以实测序列为准」满足。

## 5. 文档同步核验（`08dd894` + `7dd703f`）

- `content-spec` v0.11：标题行「# Content Spec（草案 v0.11）」= 状态行 v0.11 ✓；§2 注册表 8 列次序 ✓；两列判据（`algol-family` = FORTRAN/ALGOL 60/COBOL/PL/I/BASIC/Pascal/Simula；`dotnet-family` = C#/F# 等，与 jvm-family 同构）✓；「追加数组末尾」✓；**「L3–L5 泳道…整体右移 112px」≠ 公式（6→8 列 = 2×112 = 224px）→ D-16**
- `ui-spec` v0.11：标题行 = 状态行 v0.11 ✓；§1 `laneWidth = max(列数,3)×112+32`「L2 8 列 → 928px」✓；主图分段表合计 2713（容器 **2800**，= 修正「陈旧值 2750 → 2800」）对 `volumes.ts` 真源 ✓
- `prd2` v7：标题行无版本号（无漂移面）+ 状态行 v7 ✓；§3.2 落定句（`algol-family` / `dotnet-family` 取值 + 「M3 批新增」注）✓；§13 M3 行「『C#/.NET 暂无槽位』条款落定；L2 6 → 8 列（704 → 928px，ui-spec §1 同步）」✓
- **D-15 类漂移核查（B0 = 源头批）**：三份文档在 `7dd703f` 时点标题行与状态行**均一致**——B0 提交本身无漂移；后续批次状态行单改造成漂移，已由 `6768278` 按口径 A（版本真源唯一 = 状态行，标题去版本号）修复
- checklist 快照（`git show 7dd703f:checklist.md`）逐项对账 ✓：B0 五项 ①–⑤ / G0 数字（20/16 · p95 0.236 · gzip 141.54KB）/ run `37226881285` / 「Node.js 维持 L4-web」裁定关档 / §2.5 F-D-1 注（8 列 = 928px，三文档同步）
- 旁证：`docs/m3-v1-acceptance.md:20,:73`（B0 run 核对 + head 注记）· `docs/m3-b6-acceptance.md:83`（B0 run 行）✓ 均在

## 6. 部署链（api.github.com 未鉴权直查）

| run | head | 结果 |
|---|---|---|
| `37226881285` | `08dd894` | completed / **success** ✓ |
| `37226962390` | `7dd703f` | completed / **success** ✓ |

- 线上站点现为全量终态（B6 已验），B0 build 无法线上重放；checklist 所载「线上 `assets/index-Dntz4j5O.js` 200」与本地清洗后 build 文件名哈希互证 ✓

## 7. 缺陷清单（D-16 续）

| # | 位置 | 缺陷 | 级别 |
|---|---|---|---|
| D-16 | `docs/content-spec.md:36`（B0 `08dd894` 引入，`7dd703f` 时点与现 HEAD 同文） | 「L3–L5 泳道随 L2 增宽整体**右移 112px**」与本文档/`ui-spec §1`/`layout.ts` 公式矛盾：6 → 8 列 = +2×112 = **224px**（laneWidth 704 → 928，laneBases 累加 → L3/L4/L5 各 +224）。独立复算 6 列 vs 8 列 bases 差 = 224，无 112 来源 | 小 |
| D-17 | `data/vol-0.json` vs `data/master-candidates.json`（M1 期漂移，B0 批时点既存；至 HEAD 仍在） | 同一节点 label 不一致：数据 = `McCulloch–Pitts 模型`（id `mcculloch-pitts-1943`，随站点呈现）/ 候选池 = `McCulloch–Pitts 神经元模型`。12 master 与候选池严格对账 1/12 失配（其余 11 条精确匹配）。两处文档 prose 均用「McCulloch–Pitts 模型」 | 小 |

修法建议（不修，留给修复批）：D-16——112 → 224，或注明「112px/列 × 2 列」口径；D-17——二选一对齐（数据侧或候选池侧），建议随下一文档批处理。

## 8. 登记与备注

- **历史批口径**：本批为回顾性补验收，验收对象 = B0 批时点状态（20/16）+ 批时声称；HEAD 全量（193/203）已由 B6 验收覆盖，不重复。B0 之后代码面唯一变化 = `scripts/validate.ts` 15 行（D-12 + J7）——本批复现读数对现状代码同样成立（除 validate 规则集差异）。
- **批时声称 vs 复现对照表**：

| 声称 | 复现 | 判定 |
|---|---|---|
| 预检「6 项」 | 9 push 点 / 8 类（细）/ 6 组（粗分组口径） | 口径注记（§3），非缺陷 |
| 缩放 29% → 87% 步进 | 本环境 fit 36%（容器差）· 阶梯 ×1.2 逐位吻合（…0.7465→0.8958→1.075） | 环境差，机制一致 ✓ |
| 87% 出灰字 concepts | 阈值 0.75；0.7465 隐 / 0.8958 显（「75%」读数舍入边界实录） | ✓（更精确） |
| 25% 处 `−` 禁用 | scale 恰 0.25 钳制 + disabled | ✓ |
| 入度 max 2（EDVAC 报告） | 并列 = EDVAC 报告 + Manchester Baby（bench 取先遇到者显示单值） | 显示口径，非缺陷 |
| master→master 入度 top 5 各 1 | 实为 9 目标各 1，`slice(0,5)` 截断（另 4 = Manchester Baby / LISP / 集成电路 / Intel 4004） | 显示口径，非缺陷 |
| build 哈希 `Dntz4j5O` / `BIaq5sj1` | 清洗后逐字节复现；首跑偏移系 Tailwind 扫描遗留草稿所致 | 环境注记（见下） |
| 真实 deriveLit p95 0.008（p50 0.005） | 两读 0.007/0.004 与 0.008/0.005 | 计时噪声内 ✓ |
| `--draft` 路径按 cwd 拼接 | 实为 repo-root 相对（`import.meta.dirname/..`）；npm script 下等价 | 口径注记，非缺陷 |

- **环境注记（Tailwind 扫描面）**：Tailwind v4 自动内容扫描纳入 repo 内一切未被 gitignore 的文件——worktree 遗留的 `data/candidates/tmp-vol-1.draft.json`（未跟踪、未 ignore）使 `npm run build` 的 CSS +66B、级联改变 JS/CSS 文件名哈希。B0 时点（CI/干净树无此文件）不受影响；后续批次 `data/candidates/*.draft.json` 为跟踪文件，CI 与本地一致。建议（可选，收口处理）：gitignore 增 `data/candidates/tmp-*` 或收口时清理临时副本。
- worktree 验收临时文件（保留待收口，均不属仓库文件）：`data/candidates/tmp-vol-1.draft.json`（主会话原件）+ `.playwright-mcp/` 下我的注入副本与采样输出 + `recompute.mjs`（独立复算脚本，可复跑：worktree 内 `node .playwright-mcp/recompute.mjs`）。

## 9. 下一步

- D-16 / D-17 随下一文档批修正（不涉数据/代码逻辑；D-17 若定数据侧则涉 vol-0 label 一处）
- （可选）`data/candidates/tmp-*` gitignore；checklist/文档补「预检」分组口径
- M3 主线：V1–V4 数据批 + B6 已收口（20/16 → 193/203）；本回顾批关档后无遗留复验项

## 10. 修复记录（2026-10-09，修复批 `bc5ad07`）

- **D-16 修复**：`docs/content-spec.md:36`「L3–L5 泳道随 L2 增宽整体右移 112px」→ **224px = 112px/列 × 2 列**——与 laneWidth / laneBases 公式及 ui-spec §1 对齐（6 → 8 列，L3–L5 各 +224，独立复算差 224 成立）。
- **D-17 修复**：`data/master-candidates.json` 第 6 条 label `McCulloch–Pitts 神经元模型` → **`McCulloch–Pitts 模型`**（对齐数据侧 shipped label；`docs/master-candidates.md` 注记补记本修复批）——12 master × 候选池对账复原 12/12。
- **环境注记处置**：`.gitignore` 增 `data/candidates/tmp-*`——Tailwind v4 自动扫描未 ignore 文件致 build 哈希偏移（本批 worktree 遗留 tmp 草稿所致；B0 时点 CI / 干净树不受影响），防复发。
- 修复批五命令复绿（2026-10-09）：typecheck 无错 · validate 193/203 · measure 合计 2713.4（逐段与 B6 读数一致）· bench 合成 p95 0.211ms · build `index-ftHh4CJ1.js` 562.28kB / gzip 175.63kB（与 B6 逐字节一致——修复无构建漂移）。
