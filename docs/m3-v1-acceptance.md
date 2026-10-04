# M3 V1 批工作验收报告

- 日期：2026-10-05 · 基线提交：`703fba2`（M3 开工批 = `4bef487` + `08dd894` + `7dd703f` + `dc2a12a` + `703fba2`，自 `72234f8` 起，已推 origin/main，工作树干净）· 复核方式：独立会话实测（命令复跑 + 独立数据复算脚本 + dev 站 DOM 断言 22 项 + 来源抽查 16 URL + 部署链 GitHub API 核对；全程未改仓库文件、无提交，唯一写入 = 本报告）
- 复验命令：`npm run typecheck` / `validate` / `measure` / `bench` / `build`（Node 24.x）；dev 站 `npm run dev -- --port 5313 --strictPort`（避开 5199 旧进程与 5201 会话占用），standalone playwright + chromium-1228
- 环境偏差（非缺陷）：Playwright MCP 扩展被环境锁定 → standalone playwright + 同一 chromium 二进制（M2 同口径）；census.gov 全站 403 bot-wall、en.wikipedia.org 主机不可达 → 2 个来源节点环境拦截（§4）

## 验收结论

`[STATUS: AC]`（audit 协议三值判定）

- **M3 验收标准 AC**：prd2 §10 M3 行「主图 + 4 卷，150–250 节点，`npm run validate` 全绿」——validate 58 节点 / 57 边全绿 ✓（58 系 M3 开工批节点数，150–250 为 M3 完成态目标，本批交付口径 = prd2 §13 M3 两行：L2 两列 + J1 跨卷修订 + V1 数据批）；M2 标准真实数据复跑：bench 合成 p95 0.227ms + 真实数据段 p95 0.014ms，均 < 100ms ✓
- **交付物整体：通过**。无 blocking；2 项小缺陷（D-9 / D-10）+ 登记项确认（§8）

核查点（≤5）：

- 命令链全绿：validate 58/57 0 错 0 警；measure 卷 1 主标轮 1959.4/2000、实排 1993.4（0 灰字降级 / 0 余违规）；bench 双段达标；build gzip 148432B、dist 无 fixture 残留
- 数据独立复算 33 项全过：五卷 13/45/0/0/0、总 58/57；38 新节点字段合规；禁用词 0；出度 ≤5；convergence 恰 2 条；8 条跨卷边逐条在列；master 16；连通 50+8 两分量
- DOM 22/22：卷 1 45 节点 / 41 边（49−8 跨卷）；同列同 x（algol-family 1438 / os 398 / net 510 / relational 1694 = 公式推算）；LOD 两档；前史 chip 恰 2 处、点击开 pre 面板无 BFS dim、history.length 不变；D-8 缩放三键 + 25% − disabled；深链 3 例 + 搜索 1 例；边 tooltip hover/固定/空白收起；六视图 0 console error；fixture 主图 27 边 = 29−2 截断、hub 角标 +2
- 来源抽查 16 URL：11 直接 PASS + 3 Crossref 元数据验证 + 2 环境拦截（非死链）
- 部署链：5 commits 全部 success；B0 run `37226881285`（head `08dd894`）✓、V1 run `37228481970`（head `dc2a12a`）✓；线上 bundle 哈希 = 本地 build

## 1. 命令复验

| 命令 | 结果 |
|---|---|
| `npm run typecheck` | tsc --noEmit 无错 |
| `npm run validate` | nodes 58 / edges 57，全部通过，0 错误 0 警告（J1 双档在 `scripts/validate.ts`：:154 跨卷总量 >8 error、:158 master→master >5 error） |
| `npm run measure` | 卷 1 主标轮 1959.4/2000 ✓ · 带 concepts/实排 1993.4（去灰字 0、余违规 0）；主图段 [1947,1980) 344/396 ✓；前史 2150.3/2160 ✓（M1 记录一致）；连通性段 50+8 两分量、TCP/IP「全表孤立 1 条」= 登记项 |
| `npm run bench` | 合成 250 节点/383 边：deriveLit p95 0.227ms（两次复跑 0.227 / 0.253，均 <100ms）；真实数据 58/57：deriveLit p95 0.014ms、searchNodes p95 0.016ms；口径段自报出度 max 4（ALGOL 60）、convergence 2、跨卷 vol-0→vol-1 = 8，与 §2 独立复算一致 |
| `npm run build` | JS 1 文件 471382B raw / gzip 148432B（31.5%）；vite 自报 471.38kB / 150.12kB；dist grep `syn-` = 0（无 fixture 残留） |

## 2. 数据复算（独立脚本直接读 `data/*.json`，不调用仓库脚本，FAIL COUNT: 0）

- 五卷节点/边：13/8、45/**49**、0/0、0/0、0/0 → 总 58/57 ✓。**vol-1 实际 49 边 ≠ checklist 快照与 commit `dc2a12a` 消息主张的 48 → D-9（§7）**
- 38 新节点列分布（独立归类）：device 11 / arch 1 / os 6 / net 4 / L2_language 11（algol-family 6：fortran / cobol / algol-60 / basic / simula-67 / pascal + scripting / c-family / ml-family / lisp-family / toolchain 各 1）/ relational 3 / nn 2 = 38 ✓——checklist「device 11 / arch 1 / os 6 / net 4 / 语言 11〔algol-family 首用 6 条〕/ relational 3 / nn 2」逐项相符
- 38 新节点字段合规全过：summary ≤60 码点、concepts 3–8、people 2–4、id kebab+尾-year、layer/column 在 meta 注册表、sources ≥1 可解析 URL、checked_at 非空
- 禁用词表 25 条，label 级 0 命中；出度 ≤5 ✓；master 入度 ≤8 ✓；paradigm_shift 总数 ≤8 ✓
- convergence 恰 2 条：algol-60-1960→c-language-1972、lisp-1958→ml-1973，target 入度均 ≥2 ✓；citation 全部含 `https?://` ✓
- pre→v1 跨卷边 8 条逐条在列：shannon→transistor〔enables〕/ edvac→manchester-baby〔enables〕/ colossus→manchester-baby〔enables〕/ church→lisp〔conceptual_inf〕/ mcculloch-pitts→perceptron〔conceptual_inf〕/ **eniac→univac-1〔enables〕/ hollerith→ibm-701〔direct_fork〕/ russell→relational-model〔conceptual_inf〕**（后 3 = 新 ✓）
- master = 16；4 新 master = unix-1971 / relational-model-1970 / c-language-1972 / tcp-ip-1974 ✓；master 全在卷 0/1
- 年份主张抽查 3 处：unix-1971 year=1971 + year_note 含 1969 PDP-7 ✓；email-1971 year_note 含 1971|1972 ✓；ctss-1961 year_note 含 709→7090 ✓
- meta.json：L2_language 8 列（c-family / lisp-family / ml-family / jvm-family / toolchain / scripting / algol-family / dotnet-family）+ preEntryNodes = boole / shannon ✓
- 连通性独立复算：50+8 两分量；桥边 `EDVAC→IBM 701` 不在数据（登记项：被 pre→v1 上限 8/8 挡）✓；桥边 `transistor-1947→ibm-7090-1959` 在数据（50 单分量来源）✓；TCP/IP 为 master 子图孤点（登记项，V2 落 `tcp-ip→www` 消解）✓
- 候选件存在：`docs/m3-candidates-vol1.md`、`data/candidates/vol-1.draft.json` ✓

## 3. 站点 DOM 实测（dev 站 5313，22 项断言全过）

| 组 | 断言 | 结果 |
|---|---|---|
| A1 | 卷 1 视图 45 节点 / 41 边（= 49 − 8 跨卷，分卷页不渲染跨卷边） | ✓ |
| A2 | 同列同 x：algol-family 6 / os 6 / net 4 / relational 3 各自同 x | ✓ |
| A3 | 绝对 x = 公式推算：algol-family 1438 / os 398 / net 510 / relational 1694（laneBase+margin+inset，与 layout.ts 常量一致）——checklist 快照 972/546/592 不符 → D-10（§7） | ✓ 公式自洽 |
| A4 | UNIX 详情框 year_note 含 1969 PDP-7 + 来源外链 | ✓ |
| B1 | LOD 两档：fitView 42% 下 minor 内部块不渲染、51%/76% 两档逐级显形（读数四舍五入边界已避开） | ✓ |
| C1–C3 | 前史 chip：主图恰 2 处（boole-1854 / shannon-1937）；点击 → `#vol=pre&node=…` + 面板开 + 无 BFS dim + history.length 不变；pre 视图无 chip | ✓ |
| D1 | D-8 缩放：−/+/适配三键生效、% 读数同步、25% 处 − disabled | ✓ |
| E1–E4 | 深链 3 例 + 搜索 1 例（univac → `#vol=v1&node=univac-1-1951`） | ✓ |
| F1 | 边 tooltip：hover 出内容（source→target + relation 中文名 + citation）→ 点击固定 → 空白收起 | ✓ |
| G1 | 六视图节点/边数全对（main 16/11、pre 13/8、v1 45/41、v2–v4 0/0）+ 0 console error | ✓ |
| H1–H2 | `?fixture=1` 仍工作：63 master、主图 27 边（= 29 − capInbound 截断 2，逐条比对 = 按 RELATION_PRIORITY 稳定排序取前 8 的独立复刻）、hub 角标 +2、收敛 42 条、0 console error | ✓ |

## 4. 来源抽查（16 URL / 15 节点）

- 11 直接 PASS：打开页面正文支持节点主张（例：email 节点页正文「Ray Tomlinson sends the first email 1971」）
- 3 DOI 经 Crossref API 元数据验证（Codd 关系模型 / Cerf&Kahn TCP / Metcalfe&Boggs Ethernet——标题、作者全对；ACM/IEEE 正文页 403 不可直读）
- 2 环境拦截（非死链，未能人工核验）：census.gov（UNIVAC 来源）全站 403 bot-wall（根域亦 403）；en.wikipedia.org（IBM 7090 来源）主机 000 不可达——IBM 7090 有第二来源 computerhistory.org/revolution/story/111 PASS 覆盖
- 4 个 PARTIAL 措辞修正落点全部确认：CTSS year_note「709→7090」✓；email year_note「1971|1972」✓；algol-60 边 citation「以 BNF **完整**形式化定义」+ summary「首份以 BNF 形式化定义的语言报告」（与「BNF 首现于 ALGOL 58」口径自洽）✓；yacc summary「（CSTR #32）」✓
- 「37 VERIFIED / 4 PARTIAL」总账系执行者 4 会话口径（会话日志不在仓库，未逐条复验 37）；本会话独立抽样 16 URL 与之相容：0 死链、0 不支持主张

## 5. 部署链（GitHub Actions API 直查，gh 未登录走 api.github.com）

- 5 commits 全部 success：`37225422303`(72234f8) / `37226881285`(head 08dd894) / `37226962390`(7dd703f) / `37228481970`(dc2a12a) / `37228563634`(703fba2)
- checklist 主张 B0 run `37226881285` ✓ 存在且 success（注记：head = `08dd894` 而非 B0 末次 `7dd703f`——后者自有 run `37226962390` 亦 success，链完整，非缺陷）；V1 run `37228481970` ✓ head = `dc2a12a`
- 线上 https://jarontam.github.io/philo-tech/ ：index 200；bundle `assets/index-rxwjyopB.js` + `assets/index-BNA3demw.css` 与本地 build 输出哈希一致、均 200

## 6. 文档与 schema 同步

- content-spec v0.12（状态行 M3 V1 批）· §3 跨卷边 bullet：相邻卷对 ≤8（总量）/ ≤5（master→master）〔2026-10-05 M3 修订，原「3–5」〕、下限 3 建设期目标仅 warn、分卷页只画入口/出口标记 ✓
- prd2 v7：§9 表行「相邻卷跨卷边 ≤ 8（总量）/ ≤ 5（master→master，M3 修订）」✓；§13 M3 两行（L2 两列 6→8 704→928px / J1 跨卷修订）✓；§10 M3 行「主图 + 4 卷，150–250 节点，validate 全绿」✓
- ui-spec v0.11：§1 L2 8 列 → 928px（泳道宽公式行）+ 主图 H 2800（段高合计 2713 行）✓；代码落点 `src/lib/volumes.ts`：main 2800（:25）/ pre 2160（:34）/ v1–v4 2000（:35–38）✓
- meta.json L2 8 列 + preEntryNodes、`src/lib/bench-fixture.ts` LANE_COLUMNS 列同步 ✓
- J1「落三处」第三处证实：`scripts/validate.ts` 双档（:154 / :158）✓

## 7. 缺陷清单与下一步

| # | 位置 | 缺陷 | 级别 |
|---|---|---|---|
| D-9 | `data/vol-1.json` + checklist 快照 + commit `dc2a12a` 消息 | vol-1 实际 49 边 ≠ 主张 48。diff 复核：`9eb2a71`→`dc2a12a` 边 8→49（+41），含 `transistor-1947→ibm-7090-1959` 桥边——checklist 自身连通性段引用了该桥边（50 单分量），48 与叙述自相矛盾 | 小 |
| D-10 | checklist 快照「四列同 x（algol-family 6@972 / os 6@546 / net 4@592）」 | 972/546/592 系屏幕坐标（三值互洽于统一缩放 0.410±0.001，含 1px 取整），非布局常量；布局空间 x = 1438/398/510（公式推算 + DOM 实测一致）。口径未注明（D-7 同类） | 小 |

修法建议（不修，留给修复会话）：D-9——checklist 快照 48→49 并补注桥边归属（commit 消息为历史记录不改写）；D-10——快照 x 值注口径（屏幕坐标 + 彼时缩放/视口）或改记布局常量 1438/398/510。

## 8. 登记项确认（登记 ≠ 隐藏，维持登记）

- early machines 8 节点分量：桥边 `EDVAC→IBM 701` 被 pre→v1 上限 8/8 挡，数据中确无该边 ✓
- TCP/IP master 孤点：master 子图无邻边，V2 落 `tcp-ip→www` 后消解 ✓
- 4 个 PARTIAL 来源措辞修正：全部落定（§4）✓
- D-4（fixture 桥边语义 minor）：延 B5 裁定，维持登记
- paradigm bands 与移动端形态：缓办，维持登记

## 9. 下一步

- D-9 / D-10 随文档批修正（不涉数据/代码改动）
- V2 候选（G-A）→ V2 落数据/核验/push → V3 → V4 → B5 校准 + D-4 裁定 → B6 验收 + M4 线上深链

## 10. 修复记录（2026-10-05，修复会话）

| # | 位置 | 修复 |
|---|---|---|
| D-9 | `checklist.md` 快照 + §4 M3 行 · `docs/m3-candidates-vol1.md` 状态行 | 边数 48 → **49**（含后补桥边 `transistor→IBM 7090`；48 = 该边补入前的临时计数）。commit `dc2a12a` 消息为历史记录不改写（按 §7 修法建议） |
| D-10 | `checklist.md` 快照 dev DOM 行 | 改记布局空间常量（`algol-family` 6@1438 / `os` 6@398 / `net` 4@510）+ 口径注（972/546/592 = ~41% 缩放档屏幕坐标，D-7 先例） |

复验：`typecheck` / `validate`（58/57 全绿）/ `measure`（卷 1 主标轮 1959.4/2000 · 实排 1993.4）/ `bench`（合成 p95 <100ms）/ `build` 全过。提交 = `9757fef`（修复批，文档级）+ 本记录随文档批。
