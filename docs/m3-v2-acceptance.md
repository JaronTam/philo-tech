# M3 V2 批工作验收报告（回顾性补验收）

- 日期：2026-10-09 · 基线提交：`f154e1c`（V2 = `7ef829a` + `f154e1c` + `2fb4040`，自 `72234f8` 起，一次推送三提交）· 复核方式：独立会话实测（worktree @ `f154e1c` 五命令复跑 + 独立数据复算脚本 + dev 站 DOM 断言 + 来源抽查 30 URL / 6 DOI + 部署链 GitHub API 核对；未改基线任何文件、无提交，唯一写入 = 本报告）
- 复验环境：worktree `.playwright-mcp/v2-wt`（detached @ `f154e1c`，独立 `npm ci`，Node v24.18.0）；dev 站 `npm run dev -- --port 5201 --strictPort`（vite base `/philo-tech/`）；Playwright MCP 1920×1080；gh 未登录 → api.github.com 未鉴权（3 次调用，起查额度 60/60）
- **历史批口径**：复现对象 = V2 批时点状态（**103 节点 / 104 边** = vol-0 13 + vol-1 45 + vol-2 45；V3/V4 未落）。代码不变量独立复核：`git diff --stat f154e1c main -- src/ scripts/ data/meta.json package.json package-lock.json` → 仅 `scripts/validate.ts`（+7/−4 = D-12 people 2–4 规则 + J7 跨卷 32/7 两处规则档）；除该文件外 ZERO DIFF——V2 读数 =「同一套代码 + 不同数据」。V2 时点规则 = J1（主图入边 ≤8）+ J5（跨卷 ≤12 / master→master ≤5）

## 0. 验收结论

`[STATUS: AC]`（audit 协议三值判定）

- **M3 验收标准**：prd2 §10 M3 行「主图 + 4 卷，150–250 节点，`npm run validate` 全绿」——V2 交付口径 = §13 两行（J5 跨卷 8→12 + V2 数据批）：validate **103 / 104 全绿**（EXIT=0，0 error 0 warn）✓；150–250 为 M3 完成态目标（B6 终验 193 达标，不属本批口径）
- **交付物整体：通过**。无 blocking；2 项小缺陷（D-18 / D-19，均为「文档-注释滞后于裁定」类；D-18 现 HEAD 已被后续批随行修复）+ 口径注记与环境注记（§8）
- 核查点（≤5）：命令链逐项复现（§1）· 数据独立复算 FAIL COUNT 0（§2）· DOM 断言全过 + 六视图 0 console error（§3）· 来源抽查 30 URL 0 死链 + 重点 2 条口径核对（§4）· 部署链 run head 口径与文档同步（§5 / §6）

## 1. 命令复验（worktree @ f154e1c，先跑再比）

| 命令 | 复现读数（2026-10-09 本会话） | 与待验读数比对 |
|---|---|---|
| `npm run typecheck` | tsc --noEmit 无错（EXIT=0） | ✓ |
| `npm run validate` | `nodes 103 / edges 104` 全部通过（0 error 0 warn） | ✓ |
| `npm run measure` | 主图段 [1854,1947) 663.6/632.4（缺 31.2 容器吸收）· [1947,1980) 392/396（节点 10）· [1980,2000) **445/500**（节点 8）· 后两段空；段高合计 **2713.4**；前史 **2150.3/2160**（实排 2167.5 · 余违规 1 = Colossus ↔ Mark I 缺 7.5px）；卷 1 **1959.4/2000**（实排 1993.4）· 卷 2 **1820/2000**（实排 1854，0 灰字降级 / 0 余违规）· 卷 3–4 空；master 子图 **25 节点 / 19 边**；全表孤立 0；连通性 **95 + 8**（8 = 图灵机 / EDVAC 报告 / Baby / Mark 1 / Colossus / ENIAC / UNIVAC I / ABC） | ✓ 逐项一致 |
| `npm run bench` | 合成 250/383：deriveLit p95 **0.204ms**（p50 0.109）；真实 103（master 25）/ 104：出度 max **5（WWW）** / 入度 max 2（EDVAC 报告）· convergence **3** · 跨卷 vol-0→1 **8** / vol-1→2 **11** · 真实 deriveLit p95 **0.030ms** · 正确性断言 6 组全过 | ✓（p95 差 0.007ms = 噪声） |
| `npm run build` | `index-BeBc7OY4.js` **503.04 kB / gzip 158.53 kB** + `index-C9m32AgH.css` **25.82 kB / gzip 5.29 kB**（194 modules） | ✓ 哈希名 + 字节数 + gzip 与待验读数全同 |
| `npm run measure -- --draft data/candidates/vol-2.draft.json`（补充：候选件文案对账） | 预检 **error 0 / warn 0** · 卷 2 草稿 45 节点 · 主标轮需高 **1820 / 现 2000 ✓** | ✓（§6） |

- build 注：JS raw 503.04 kB 恰越 vite「>500 kB」信息性提示阈值（非错误；gzip 158.53 kB，无 gzip 口径要求）

## 2. 数据独立复算（独立脚本直读 `data/*.json`，不调用仓库脚本，FAIL COUNT: 0）

脚本 = 工作副本内自写 `tmp-acc/recompute.mjs`（仅 Node 内置模块；输出留存 `tmp-acc/recompute-out.txt`）。

- 分卷 / 总量：vol-0 13/8 · vol-1 45/49 · vol-2 **45/47** · vol-3/4 空 → 总 **103/104** ✓；节点 id 全局唯一 ✓
- master = **25**（前史 7 + 卷 1 10 + 卷 2 8）✓；vol-2 = 8 master + 37 非 master ✓
- 跨卷边（按边两端节点实际所在卷归类）：vol-0→1 = **8** · vol-1→2 = **11**（J5 ≤12 内）；跨卷 master→master：vol-0→1 = 4 · vol-1→2 = **5**（= 候选文档 §D 所列 4 条 + J6 新增 `8086 → IBM PC`；≤5 ✓ 不违规 → 文档侧滞后记 D-19）
- convergence **3** 条：`algol-60-1960 → c-language-1972` / `lisp-1958 → ml-1973` / `ms-dos-1981 → windows-95-1995`；target 入度均 ≥2 ✓
- master 子图 **25 节点 / 19 边**（与 measure、DOM 三方吻合）✓；全表孤立 **0** ✓；连通 **95 + 8** 两分量（8 分量逐节点核对 = 报告所列 8 机器）✓
- 边存储口径核实：vol-n 文件收 **n 卷入边**（vol-0 8 条全卷内；vol-1 49 = 41 卷内 + 8 pre→v1；vol-2 47 = 36 卷内 + 11 v1→v2）；vol-2 47 = 45 节点入边 + IBM PC / Windows 95 各双入度 ✓（与提交文案分解一致）
- 字段规则：summary ≤60（0 越界）· sources ≥1（0 空）· id kebab+年份（0 异常）· citation 全部含 URL（0 缺；47 边去重 46 URL）· **people 2–4（0 越界——vol-2 已符合 D-12 后续规则档）** · 禁用词 label 级 **0 命中**（meta 25 词）· checked_at 全 = 2026-10-05（45/45）· vol-2 年份域 [1980, 1998] ⊂ [1980,2000) ✓
- **J6 三处一致**：`data/vol-1.json` 中 `intel-8086-1978` `master: true`（该节点居 **vol-1** 文件，year 1978；f154e1c 对 vol-1.json 的唯一改动 = 该 1 行）+ `data/master-candidates.json` 含 Intel 8086 行（总 **45** 条 = 44→45 触顶）+ 主图渲染（DOM：IBM PC 入边 2 = 8086 / Apple II、出边 4）✓；8086 相关边 = `intel-8080-1974 → 8086`[direct_fork] + `8086 → ibm-pc-1981`[enables] ✓

## 3. dev DOM 断言（dev 站 5201，1920×1080，Playwright MCP）

| 组 | 断言 | 结果 |
|---|---|---|
| A | 六视图渲染：主图 **25** master / 19 边（DOM 节点 26 = 25 + 装饰 `grid` 节点，`App.tsx:131`）· 前史 13/8 · 卷 1 45/41 · 卷 2 **45/36**（47 − 11 跨卷入边）· 卷 3/4 0/0 | ✓ |
| B | 六视图 0 console error（全程 3 条消息全为 info 级；0 error / 0 warn） | ✓ |
| C | 深链：`#vol=v2&node=ibm-pc-1981` 整页加载 → 面板「节点详情：IBM PC」+ 选中（唯一 accent outline）+ hash 精确；随后图内点击 MS-DOS → `#vol=v2&node=ms-dos-1981`、`history.length` 3 → 3 不变（replaceState） | ✓ |
| D | chip 恰 2 处（`boole-laws-of-thought-1854` / `shannon-switching-circuits-1937`）；两枚分别点击 → `#vol=pre&node=…` + 面板开 + 全节点 opacity 1（无 dim）+ history 不变 | ✓ |
| E | 缩放四钮：75% →(+×1.2)→ 90%；− 连续下降至 **25% 精确钳制且 − disabled**（scale 0.2513）；+ 恢复 0.3016 / 0.3619（步进 ×1.2000x）；「适配」→ 0.3586（36%） | ✓ |
| F | LOD 边界：卷 2 视图 104% concepts 显形 → 72.7%（<0.75）藏 · 50.2%（≥0.5）minor 在 → 41.8%（<0.5）minor 内容空（React Flow 包装层保留，按内容判隐藏） | ✓ |
| G | 收敛 toggle：卷 2 视图点亮 `ms-dos-1981` / `windows-95-1995`（两端中可见者），非参与 30 节点 dim；主图点亮 `lisp-1958` / `c-language-1972`；再点关闭全恢复；搜索选中使收敛 aria-pressed → false（三态互斥） | ✓ |
| H | 回归：搜索「IBM PC」→ `#vol=v2&node=ibm-pc-1981` + 面板 + lit 5 / dim 40；边 tooltip（`8086 → IBM PC`）hover 出「使能 + citation + 来源」→ 点击固定（「· 已固定」）→ 空白收起；BFS 点晶体管 → trace lit 17 / dim 8 | ✓ |

- 截图留存：`.playwright-mcp/m3-v2-acc-fitview.png`（卷 2 fit）· `m3-v2-acc-zoomed.png`（卷 2 104% concepts 显形）

## 4. 来源抽查（直连 30 distinct URL / 31 次请求 + 6 DOI + 内容抽查）

- 直连结果：**28 × 200 · 2 × 403（bot 墙）· 1 瞬态 000（重试 200）——0 死链**。抽样覆盖 vol-2 `sources` 25 条（24 条正式抽样 + `dev.mysql.com`；含 `about.google` / `computerhistory.org` / `doi.org` / `docs.python.org` / `ecma-international.org` / `ethw.org` / `httpd.apache.org` / `learn.microsoft.com` / `webstore.iec.ch` / `www.apple.com` 等）+ 边 citation 补充 5 条
- 内容对点抽查（正文含主张）：IBM PC 页「On August 12, 1981 … IBM 5150」✓ · ECMA-262 页「1st edition, June 1997」✓ · CHM 1987 时间线「Acorn's ARM … first used in the Archimedes」✓ · scholarpedia / yann.lecun / cs.cmu（Linux 史）均 200
- **重点 1（ARM2 口径）**：`acorn-archimedes-1987` 摘要「采用 ARM2；ARM1 为 1985 评估样片」——`newsroom.arm.com` 博客（200）含「ARM1, was completed in 1985」与「Archimedes, released in 1987」但**未提 ARM2**；CHM 1987（200）记「ARM first used in Archimedes」亦未提 ARM2；该节点第二源 `computinghistory.org.uk/det/51418` 本机多次尝试均超时（环境拦截，同域其余页 200）。WebSearch 旁路核实：ARM2 = 首款量产 ARM（1987 Archimedes 搭载）、ARM1 = 1985 首硅 / 评估样片 → **摘要口径成立**（批时 PARTIAL 标注与实际相符，记环境注记）
- **重点 2（google 节点）**：主源 = `infolab.stanford.edu/~backrub/google.html`（200；正文含 Brin / PageRank / 1998）· 第二源 `about.google/our-story`（200）· vol-2 sources 中 `wikipedia.org` 出现 **0 次**（不依赖本机不可达域）✓
- DOI ×6 经 Crossref 元数据验证（Neocognitron / RISC I / zip-code Backprop / LSTM / 80386 design / i486 cache and bus interface）——标题全部与节点口径对齐 ✓
- 环境域拦截（非死链）：`blogs.oracle.com`（mysql 核验文）、`dev.mysql.com` 均 403 bot 墙——MySQL「1995 年 5 月首发」经 WebSearch 旁路核实（1995-05-23 首版）✓；`web.archive.org` 5 处引用（java / javascript 源）本机备案不可达——1995-12-04 Netscape/Sun 联合发布经 WebSearch 旁路核实 ✓；`web.stanford.edu` 首次 000 瞬态、重试 200 ✓
- 总账口径：批时「45/45 = 33 VERIFIED + 2 PARTIAL」无法由仓库产物完整重建（33+2=35，未列 10 条类别未说明）→ 口径注记（§8）；本会话 30 URL 抽样与之相容

## 5. 部署链（api.github.com 未鉴权直查）

- run `37233431046`：head_sha = **`2fb4040`**（批尾提交，非 `f154e1c`）· conclusion **success** · event push ✓
- head_sha 过滤独立复核：`f154e1c` → total_count **0** · `7ef829a` → total_count **0** · `2fb4040` → total_count **1**（即 37233431046）——三提交一次推送、单 run 归属批尾 ✓
- 判读：checklist 记「`f154e1c`，deploy run `37233431046`」= head 省略口径（B0 轮同类先例 = 口径注记、非缺陷）→ §8
- 线上现站 = 全量终态（B6 已验 193/203）；V2 build 不可线上重放——本批只核 run 记录 ✓

## 6. 文档与 schema 同步（worktree @ f154e1c 实文）

- `docs/m3-candidates-vol2.md` 逐项对账：**45 = 8 master + 37** ✓ · §C 表 **47 行**（= 47 边）✓ · 出度 max 5 = `www-1991` ✓ · 弱边 4 条（🚩 = berkeley-risc / intel-80386 / lstm / apple-ii）✓ · 预检 0/0 + 主标轮 1820/2000（复跑再现，§1 末行）✓ · 「48 边」仅存于 `7ef829a` 提交文案，文档已在 §0 注明误计 ✓。**例外**：§D「master→master 4 条」未随 J6 更新（实 5）→ **D-19**
- J5 落三处（时点口径 ≤12 / master→master ≤5）：`content-spec` §3 v0.13（「≤12 条（总量）…J5 定 ≤12」）✓ · `prd2` §9 行 + §13 变更档「J5 裁定（V2 批）：总量 8 → 12」✓ · `validate.ts` 双档（:154 `>12` error / :158 `>5` error，注释「J1 → J5」）✓
- J6 落点：数据 master 标记（vol-1 一行）✓ · `data/master-candidates.json` 44 → 45 触顶（v0.4 页注 + Intel 8086 行 + IBM PC 行备注）✓ · `docs/master-candidates.md` v0.4（「44 → 45 条候选〔触顶 ≤45〕」+ J6 依据段）✓ · 主渲染（§3）✓
- 标题行 / 状态行一致性：`content-spec` **一致**（标题（草案 v0.13）= 状态行 v0.13）· `ui-spec` **漂移**（标题（草案 v0.11）vs 状态行 v0.12——V2 批仅升状态行所致）· `prd2` 标题无版本号（无此漂移面）✓。ui-spec 漂移属 D-15 类已知项（后被 `6768278` 口径 A 修复），按已知项处理不另记
- `ui-spec` v0.12（§1 主图注记「M3 = 25 条 master〔pre 7 + v1 10 + v2 8，J6 后〕」）✓ 与复算一致
- `scripts/validate.ts:114` 段头注释「相邻卷跨卷边 ≤5」与 J5（≤12/≤5）不一致（自 V1/J1 起滞后）→ **D-18**

## 7. 缺陷清单（D-18 续）

| # | 位置 | 缺陷 | 级别 |
|---|---|---|---|
| D-18 | `scripts/validate.ts:114`（V2 时点） | 段头注释「主图入边 ≤8；相邻卷跨卷边 ≤5」的跨卷档与 J5 时点规则不一致（应为 ≤12 总量 / ≤5 master→master）——该注释自 V1（J1：≤8/≤5）起即滞后，V2（J5）未随行更新；**行为本身正确**（:154 / :158 双档 = 12 / 5） | 小 |
| D-19 | `docs/m3-candidates-vol2.md` §D 第 2 条（V2 时点） | 「master→master 4 条（c→c++ / tcp-ip→www / unix→linux / c→python）」未随 J6 更新——J6 新增 `8086 → IBM PC` 亦为跨卷 master→master（两端 master 于 V2 时点成立），实为 **5 条**（仍 ≤5 ✓ 不违规）；同文档 §D 第 1 条已加 J6 追记，本条未同步 | 小 |

修法建议（不修，留给修复会话；D-18 已被后续批覆盖）：

- D-18：注释同步为「≤12（master→master ≤5）」。**现状说明**：该行已在 V3 修复批 `0a7bbd3`（D-11/D-12 同批）随行为「≤32（master→master ≤7）」（J7 口径），现 HEAD 无需再动，本项仅记档
- D-19：§D 该行更新为 5 条（+ `8086 → IBM PC`）或加「4 条 = J6 前口径」注；涉文档一处，随下一文档批

## 8. 登记与备注

### 已知项确认（prompt §1 三项，V2 时点逐项核对，不另记缺陷）

1. **D-17**（Pitts label）：V2 时点 `data/master-candidates.json` 第 6 行 label =「McCulloch–Pitts 神经元模型」vs 数据 `mcculloch-pitts-1943` =「McCulloch–Pitts 模型」——既存（M1 期），候选表该行自带备注；已记 D-17、已修 `bc5ad07` ✓
2. **D-15 类**（标题 / 状态行）：V2 时点实况 = **`ui-spec` 漂移**（标题 v0.11 vs 状态行 v0.12）；`content-spec` 在 V2 时点**一致**（v0.13 / v0.13，其漂移在 V3/V4 状态行单升后才出现）——prompt 已知项行的数字系 B6 时点两文件并记，V2 时点以本条为准；均已由 `6768278`（口径 A）修复 ✓
3. **「48 边」误计**：仅存于 `7ef829a` 提交文案；实测 47（§2），checklist 快照与候选文档均已注记 ✓

### 口径注记（非要件）

- **run head 省略**：checklist 记「`f154e1c`，deploy run `37233431046`」；直查 head = `2fb4040`（批尾），`f154e1c` / `7ef829a` 无独立 run——同批一次推送的 head 省略口径（B0 轮先例）
- **核验记账口径**：「45/45 = 33 VERIFIED + 2 PARTIAL」不闭合（33+2=35；未列 10 条类别无说明）。同构台账：V1「37 VERIFIED / 4 PARTIAL」（38 节点）、V3「14 + 27」（45 节点）均不闭合，V4「41 + 4」（45）恰闭合——系各批会话分类粒度不同、仓库仅存汇总数所致（会话日志不在仓库）；本会话 30 URL 抽样与之相容，重点 2 条成立
- **prompt §4 J6 三处**写「`data/vol-2.json` 中 `intel-8086-1978` `master: true`」——该节点实居 `data/vol-1.json`（year 1978 属卷 1）；三处核对按实际文件成立（§2）
- **DOM 计数口径**：主图 DOM `.react-flow__node` = 25 + 1（装饰 `grid` 节点，`App.tsx:131`）；LOD 隐藏 minor 时 React Flow 包装层仍在（内容空）——计数应剔除 `grid`、按内容判隐藏
- **环境注记**（本机备案追加）：`computinghistory.org.uk/det/51418` 多次尝试均超时（同域其余页 200）；`blogs.oracle.com` / `dev.mysql.com` 403 bot 墙（MySQL 事实经 WebSearch 旁路）；`web.archive.org` 5 处引用不可达（WebSearch 旁路）；`web.stanford.edu` 首次 000 瞬态、重试 200

### 批时声称 vs 复现对照表（prompt §1 批时声称逐项）

| # | 批时声称（出处 = checklist V2 段 / 提交文案） | 本会话复现 | 判定 |
|---|---|---|---|
| 1 | vol-2 = 45 节点 / 47 边 | 45 / 47（独立复算 + validate） | ✓ |
| 2 | 核验 45/45 = 33 VERIFIED + 2 PARTIAL | 无法完整重建（33+2≠45）；重点 2 条口径核对成立 | 口径注记 |
| 3 | validate 103/104 全绿 | 103/104 全绿（0 error 0 warn） | ✓ |
| 4 | measure 卷 2 主标轮 1820/2000 · 实排 1854（0 灰字降级 / 0 余违规） | 1820/2000 · 实排 1854（0 / 0） | ✓ |
| 5 | 主图段 [1980,2000) 445/500 ✓ | 445/500（节点 8） | ✓ |
| 6 | 主图 master 子图 25 节点 / 19 边 | 25 / 19（measure + 复算 + DOM 三方） | ✓ |
| 7 | 全表孤立 0；连通 95 + 8 两分量维持 | 0；95 + 8（8 分量逐节点吻合） | ✓ |
| 8 | J6：8086 升 master / 候选表 44→45 触顶 / 主图 IBM PC 孤点消解 | 三处成立（vol-1 master:true · 候选表 45 · DOM IBM PC 入边 2） | ✓ |
| 9 | 「48 边」（`7ef829a` 文案） | 误计；实测 47（已注记） | 已知项 |

### 流程缺口销账

- 本批完成后，M3 全部数据批验收覆盖 = **100%**（M0–M2 / V1–V4 / B0 / B6 + 本 V2 补验收）；B6 报告 §8 备案的「V2 无独立验收报告」缺口即此关闭

## 9. 下一步

- D-18 / D-19 随文档批处理（D-18 已由 `0a7bbd3` 覆盖、无需再动；D-19 一处随下一文档批）
- checklist 快照「V2 缺口」备案项销账（本报告入档）
- M3 已随 B6 关档；无后续数据批动作

## 10. 修复记录（2026-10-09，修复批 `d663942`）

- **D-19 修复**：`docs/m3-candidates-vol2.md` §D「master→master 4 条」→ **5 条**（+ J6 新增 `8086 → IBM PC`；原 4 条系 J6 前口径）——复算复核仍 ≤5 不违规。
- **D-18 记档（无需修复）**：V2 时点 `validate.ts:114` 段头注释滞后（「跨卷边 ≤5」vs J5 实际 ≤12）——行为档（:154/:158 = 12/5）正确；该注释已在 V3 修复批 `0a7bbd3` 随行同步至 J7 口径（「≤32 / master→master ≤7」），现 HEAD 正确，仅记档。
- **口径注记处置（随收口入 checklist）**：run `37233431046` head = `2fb4040`（批尾）——checklist V2 段已补 head 注；「33 VERIFIED + 2 PARTIAL」不闭合系跨批分类粒度（V1/V3 同构），维持口径注记。
- 修复批五命令复绿（2026-10-09）：typecheck 无错 · validate **193/203** 全部通过 · measure 合计 2713.4（主标轮 2435.6）· master 子图 45 节点 / 38 边 · bench 合成 p95 0.203ms · build `index-ftHh4CJ1.js` 562.28kB / gzip **175.63kB**（同 B6 逐字节，零构建漂移）。
