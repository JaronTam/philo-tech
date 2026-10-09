# M3 B6 验收 + M4 线上深链验收报告

- 日期：2026-10-09 · 基线提交：`ba0a519`（工作树 clean；B5 批 = `8906db8` 主件 + `ba0a519` 补记）· 复核方式：独立会话实测（五命令复跑 + 独立数据复算脚本〔纯 JSON 统计 + 真实 `deriveLit` 两路〕+ dev 站 DOM 断言 32 项 + 线上深链断言 29 项 + 来源死链抽查 30 URL + 部署链 12 runs API 核对；全程未改仓库文件、无提交，唯一写入 = 本报告）
- 复验命令：`npm run typecheck` / `validate` / `measure` / `bench` / `build`；dev 站 = `http://localhost:5199/philo-tech/`（端口 5199 被主会话遗留 vite dev 进程占用〔PID 1520，同命令 `vite --port 5199 --strictPort`〕——实测其服务当前工作树〔vol-4.json 当前内容 + dev 模式 index〕后直接使用，未另起重复实例）；浏览器 = standalone playwright-core 1.61.0 + chromium-1228（Playwright MCP 浏览器被环境锁定 → M2 先例；本机 ms-playwright 缓存的 1228 与 playwright 1.61.0 配对）
- 环境偏差（非缺陷）：`github.com` 网页域连接超时（20s，`api.github.com` 200 / `raw.githubusercontent.com` 200，域级拦截）；`gutenberg.org` 首试 TLS 抖动 000 → 重试 200

## 验收结论

- **M3 `[STATUS: AC]`**：prd2 §10 M3 行「主图 + 4 卷，150–250 节点，`npm run validate` 全绿」——validate 193 节点 / 203 边全绿（0 warn）；193 ∈ [150, 250]；六视图 DOM 实测主图 45 master / 前史 13 / 卷 1–4 各 45；五命令全绿；数据独立复算 FAIL COUNT: 0
- **M4 `[STATUS: AC]`**：prd2 §10 M4 行「部署 GitHub Pages，线上可访问，深链可分享」——线上 HTTP 200；资源 200 且与本地 build 产物 sha256 逐字节一致；线上深链 6 抽全过（面板开 / 选中描边 / hash 精确 / `history.length` 不增 / zoom 75% / 0 console error）；部署链 12/12 runs success
- 缺陷：**D-15（小·文档，先于本批存在）**——`content-spec` / `ui-spec` 标题行版本号与状态行不一致（§7）；无 blocking；其余均为偏差项 / 环境项 / 登记项（§2 / §3 / §5 / §7）

核查点（≤5）：

- 命令链全绿：validate 193/203 0 错 0 警；measure 合计 2713.4 / 分卷全过（前史实排 2167.5 · 余违规 1 = Colossus↔Harvard Mark I 7.5px，定稿口径）；bench 合成 p95 0.200ms + 真实 193 节点 p95 0.038ms（gate 100ms）；build gzip 175.63KB（预算 500KB）
- 数据独立复算全过：五卷 13/45/45/45/45（边 8/49/47/51/48）；master 45（pre 7 + v1 10 + v2 8 + v3 10 + v4 10）；跨卷 8/11/31/30；连通 185 + 8（岛内 7 边 / 跨边 0）；trace 真实 `deriveLit` 中位 15/193、master 21/193（8/45）——B5 定稿数字逐项复现
- dev DOM 32/32：六视图节点数（LOD 口径 zoom ≥ 60% 计数）、trace lit 9 / dim 36（lit 集与独立复算一致）、收敛点亮 3 master + 三态互斥、深链 6 抽（history 2→2）、缩放三键 + 25% 钳制、fixture 63 节点 + `+2`、0 console error
- 线上 M4 29/29：与 dev 同套断言在线上生产构建复现（含 6 条深链）；assets `index-ftHh4CJ1.js` / `index-C9m32AgH.css` sha256 = 本地 build 逐字节一致
- 部署链 12/12：B0→B5 全链 run 全部 success 且 head sha 与各批提交一致（§6）

## 1. 命令复验

| 命令 | 结果 |
|---|---|
| `npm run typecheck` | tsc --noEmit 无错 |
| `npm run validate` | nodes 193 / edges 203，全部通过（0 错误 0 警告） |
| `npm run measure` | 主图 5 段 663.6/632.4（缺 31.2，已定稿吸收）· 392/396 · 445/500 · 510/525 · 425/660；合计 2713.4 / 容器 2800（`src/lib/volumes.ts` main `height: 2800` 交叉核对）；分卷：前史 2150.3/2160（实排 2167.5 · 去灰字 6 · 余违规 1 = Colossus ↔ Harvard Mark I 7.5px）· 卷 1 1959.4/2000（实排 1993.4）· 卷 2 1820/2000（1854）· 卷 3 1886.7/2000（1920.7）· 卷 4 1686.7/2000（1720.7）；灰字降级：主图 4 + 2 · 前史 6 · 卷 1–4 = 0；master 子图 45 节点 / 38 边；全表孤立 0；连通性 185 + 8 |
| `npm run bench` | 合成 250 节点/383 边：deriveLit（5000 次）p50 0.106ms / p95 0.200ms < 100ms gate；真实 193/203：p95 0.038ms（口径 0.036–0.041 区间内）；出度 max 5（`ibm-pc-1981`）/ 入度 max 3（`alexnet-2012`）；convergence 5；跨卷 8/11/31/30 |
| `npm run build` | gzip 175.63KB（预算 500KB）；产物 `dist/assets/index-ftHh4CJ1.js`（562.28 kB raw）/ `index-C9m32AgH.css`；dist grep `syn-` / `makeSyntheticGraph` = 0（无 fixture 残留） |

偏差注（非缺陷）：合成 p95 本会话读数 0.200ms（B5 范围件 0.208 / checklist 0.207）——单次计时跑动差异，均 < gate；主图 fit zoom 本机 30%（prompt 29% 系另一视口读数）。

## 2. 数据独立复算（独立脚本直接读 `data/*.json`；trace 语义调用真实 `src/lib/graph.ts` `deriveLit`；FAIL COUNT: 0）

- 总量：193 节点 / 203 边；分卷 `vol-0..4` = 13/45/45/45/45（边 8/49/47/51/48，合计 203 ✓）；master = 45（pre 7 + v1 10 + v2 8 + v3 10 + v4 10）✓
- relation 分布（自算）：`enables` 73 / `conceptual_inf` 71 / `direct_fork` 51 / `convergence` 5 / `paradigm_shift` 3（= 203）；`paradigm_shift` 3 条 = `transformer-2017→gpt-3-2020` / `gan-2014→stable-diffusion-2022` / `gpt-3-2020→chatgpt-2022` ✓；`convergence` 5 条 = `algol-60→c-language` / `lisp→ml` / `ms-dos→windows-95` / `mapreduce→hadoop` / `dynamo→cassandra`（target 入度均 ≥ 2）✓
- 跨卷边 8 / 11 / 31 / 30（≤32 ✓）；跨卷 master→master 4 / 5 / 6 / 6（≤7 ✓）；master 子图 45 节点 / 38 边；主图 master 入度 max 2（`alphago-2016`，≤8 ✓）；全局出度 max 5（`ibm-pc-1981` / `www-1991` / `linux-1991`）/ 入度 max 3（`alexnet-2012`）✓
- 连通性 185 + 8：孤岛 8 = 图灵机 1936 / ABC 1942 / Colossus 1944 / ENIAC 1945 / EDVAC 报告 1945 / Manchester Baby 1948 / Mark 1 1949 / UNIVAC I 1951；岛内 7 边（图灵机→EDVAC / ABC→ENIAC / ENIAC→EDVAC / EDVAC→Baby / Colossus→Baby / ENIAC→UNIVAC / Baby→Mark 1）/ 跨边 0；岛内 master 2（`edvac-report-1945` / `manchester-baby-1948`）——与 B5 范围件 J14 现状逐项一致
- id：0 重复 / 0 非 kebab-case / 0 缺 `-year` 后缀 ✓
- 字段规则：summary ≤60 码点 0 违规；people 2–4 0 违规；sources ≥1 且全为 `http(s)` URL 0 违规；citation 全含可点击 URL 0 违规 ✓
- 禁用词：25 词 label 级 0 命中（content-spec §6 口径 = 仅约束 `label`）✓。附注：全字段扫描见 summary / year_note / citation / concepts 命中（如「开源」「深度学习」「神经网络」）——设计内允许（validate 仅强制 label）；`AGI` 在 `paging` / `Kutaragi` 命中系大小写不敏感子串假阳。非缺陷
- **trace 语义（J13，真实 `deriveLit` 复算）**：任意起点 lit 中位 15 / 193（p90 33 / max 139 / min 2）；master 起点 lit 中位 21 / 193，其中 master 中位 8 / 45（p90 13 / max 26）；样例 `transformer-2017` 29（master 9）· `transistor-1947` 117（master 26）· `chatgpt-2022` 20（master 7）· `eniac-1945` 6（master 2）——与 B5 范围件 §0 更正后数字逐项一致（有向语义，非无向）
- `checked_at`：20×`2026-10-04` / 83×`2026-10-05` / 45×`2026-10-07` / 45×`2026-10-09`（按卷：vol-0 全 10-04；vol-1 = 7×10-04 + 38×10-05；vol-2 全 10-05；vol-3 全 10-07；vol-4 全 10-09）——各卷值 = 对应批次日期，无超前验收日值；prompt「checked_at（2026-10-09）」按「验收日读数」理解核对，无异常
- 抽样 6 节点（每卷 1 + 主图 1）：`boole-laws-of-thought-1854`（1854 · gutenberg.org · 10-04）· `transistor-1947`（1947 · nobelprize.org · 10-04）· `ibm-pc-1981`（1981 · ibm.com + computerhistory.org · 10-05）· `llvm-2003`（2003 · llvm.org + releases.llvm.org · 10-07）· `pytorch-2017`（2017 · pytorch.org ×2 + raw.githubusercontent.com · 10-09 · year_note 三段式 = 2016-09-01 closed alpha / 2017-01-19 公开 / 2017-02-02 v0.1.6 beta ✓）· `transformer-2017`（2017 · arxiv.org + papers.nips.cc · 10-09）

## 3. 站点 DOM 实测（dev 站 5199，32/32 断言全过）

| 组 | 断言 | 结果 |
|---|---|---|
| A1 | 主图 fit 30%：45 master 全渲染（无 minor 权重 master）+ concepts 全藏（<0.75） | ✓ |
| A2 | 前史：fit 38% 渲染 11（去 minor 2）→ zoom 66% 时 13 | ✓ |
| A3 | 卷 1–4：fit 42% 渲染 37/32/34/37 → zoom 60%（实际 >0.5）时各 45 | ✓ |
| A4 | 卷 4 三档 LOD：fit 42% 去 minor 8 → 37；zoom 86% 时 45/45 含 concepts | ✓ |
| B1 | trace：click Transformer → lit 9 / dim 36；lit 集 = 罗素《数学原理》/ McCulloch–Pitts 模型 / CUDA / AlexNet / ResNet / Transformer / BERT / GPT-3 / Stable Diffusion（与 §2 独立复算完全一致）；详情框开 | ✓ |
| B2 | 收敛 toggle 真实可用（非 disabled，title「高亮 5 条收敛边及其多源」）→ 点亮 3 master（`lisp-1958` / `c-language-1972` / `mapreduce-2004`）；trace 三态互斥（trace 激活时 aria-pressed=false；收敛激活后 transformer 转 dim）；再点关闭 dim=0 | ✓ |
| C1 | 缩放控件（D-8）：fit 30% → + 36% → − 30% 三键生效；缩小至 25% 处 − disabled（minZoom 钳制） | ✓ |
| D1 | 深链 6 抽：面板开（label 逐一核对）+ 选中描边 `solid 2px rgb(192,57,43)` + hash 精确保持 + `history.length` 2→2（不增）+ 居中 zoom 75% + 0 console error | ✓ ×6 |
| E1 | fixture `?fixture=1`（dev 专有）：63 节点全渲染 + `+2` 入边截断角标（登记：真实数据 max 入度 3 → `+N` 不可达，非缺陷）+ 0 console error | ✓ |
| F1 | 六视图切换 0 console error（逐视图计数全 0） | ✓ |

## 4. 线上深链验收（M4）

- 线上 `https://jarontam.github.io/philo-tech/` HTTP 200；`assets/index-ftHh4CJ1.js` / `assets/index-C9m32AgH.css` 均 200，且与本地 `npm run build` 产物 **sha256 逐字节一致**（`fa5e963c…` / `5ba08cac…`）——同一构建上线的强证据（线上 bundle 哈希 = 本地 build）
- 线上深链 6 抽（同 §3 D1 六条 URL）→ 面板开 / 选中描边 / hash 精确 / `history.length` 2→2 / zoom 75% / LOD 正常 / 0 console error；缩放控件线上可用（fit 30% → + 36% → − 30%；25% 钳制）——**29/29 断言全过**（生产构建与 dev 行为一致）

## 5. 来源抽查（死链 30 URL）

- 域法抽查 23 URL / 23 域（V4 报告 §5 同口径）：`pytorch.org` / `raw.githubusercontent.com` / `rfc-editor.org` / `nature.com` / `arxiv.org` / `apple.com` / `nobelprize.org` / `computerhistory.org` / `llvm.org` / `doi.org` / `mozilla.org` / `sqlite.org` / `postgresql.org` / `ibm.com` / `developer.nvidia.com` / `kubernetes.io` / `go.dev` / `jax.readthedocs.io` / `kotlinlang.org` / `julialang.org` / `apache.org` 等 —— 22 × 200（含 `gutenberg.org` 首试 TLS 抖动 000 → 重试 200、`apache.org` 补测 200）；1 × `github.com/about` 连接超时（域级环境拦截：`api.github.com` 200、`raw.githubusercontent.com` 200，非死链）
- 抽样 6 节点全部 sources 7 URL 逐一 200：ibm.com/history/personal-computer · computerhistory.org/timeline/1981 · releases.llvm.org/1.0/docs/ReleaseNotes.html · pytorch.org/blog/a-year-in · raw.githubusercontent.com/pytorch/pytorch/v0.1.3/README.md · arxiv.org/abs/1706.03762 · papers.nips.cc/paper/7181-attention-is-all-you-need
- 汇总：30 URL 中 29 条 200 + 1 条域级环境超时（`github.com` 网页域，API 域正常）；0 死链。prompt 例举的 `blog.google` / `api.github.com`（节点源）在 `data/` 中无出现（`api.github.com` 仅用于部署链核对，§6 已验 200）

## 6. 部署链（GitHub Actions API 直查，`gh` 未登录走 api.github.com）

- 一次列表调用（`actions/runs?per_page=100`，共 27 runs）核对全部 12 个 run 号：**全部 `completed` / `success`**

| 批 | run id | head sha |
|---|---|---|
| B5 | `37919852470` / `37919949764` | `8906db8` / `ba0a519` |
| V4 数据批 / 验收 / 修复 / 收口 | `37811798270` / `37820747974` / `37822768263` / `37822996376` | `8d43623` / `1da2370` / `8d950a4` / `421315d` |
| V3 数据批 / 验收 / 修复 | `37626983024` / `37643020950` / `37644455788` | `9ca8ba3` / `23e2c76` / `eff70e1` |
| V2 | `37233431046` | `2fb4040` |
| V1 | `37228481970` | `dc2a12a` |
| B0 | `37226881285` | `08dd894` |

- API 用量注：本会话核对消耗 2 次调用（列表 1 + 根探测 1；核对时点余 54/60）；`ba0a519`（B5 补记）run 存在且 success，收口链闭合

## 7. 缺陷清单与下一步

| # | 位置 | 缺陷 | 级别 |
|---|---|---|---|
| D-15 | `docs/ui-spec.md:1` + `docs/content-spec.md:1` | 标题行版本号与状态行不一致：ui-spec 标题「（草案 v0.11）」vs 状态行 v0.13；content-spec 标题「（草案 v0.13）」vs 状态行 v0.16。V2 / B5 批仅升状态行，标题行自 B0（08dd894）冻结——纯文档漂移，先于本批存在（前四轮验收未记）。版本真源 = 状态行（各报告引用口径一致） | 小 |

修法建议（不修，留给修复会话）：两文件标题行去版本号（与 `prd2` 标题同形）或同步至状态行版本；随文档批落。

偏差项 / 环境项 / 登记项（非缺陷，备案）：

- `166.26` 于 `checklist.md:7` 命中 1 处（prompt 预期 0）——上下文 = V3 段「`build` gzip 167.12kB（D-13 修正：原 166.26 系修复前读数）」，系修复批**有意保留的历史注记**（当前快照值 = 167.12kB 正确）；判读：偏差成立、语义合法，非缺陷
- `github.com` 网页域连接超时（环境）；Playwright MCP 浏览器被锁定 → standalone playwright（M2 先例）；5199 端口被主会话遗留进程占用 → 实测其服务当前工作树后复用（同 prompt 端口）
- fixture `+N` 真实不可达（真实数据 max 入度 3 < cap 8）：维持登记项（B5 G2 口径）

## 8. 文档一致性

- `checklist.md` 快照 B5 段 + §4 M3 行：trace 中位 15/193、master 21/193（8/45）、J14 185+8、G5 同步、五命令读数（validate 193/203 · measure 2713.4 · bench 真实 0.041ms / 合成 0.207ms · build gzip 175.63KB）、`8906db8` + run `37919852470` —— 与本会话实测逐项一致 ✓
- `docs/ui-spec.md` 状态行 v0.13（§1 注记 25 → 45 条 master 终值 + §7 真实复跑完成注）✓；§1 注记「M3 = 45 条 master〔V4 终值：pre 7 + v1 10 + v2 8 + v3 10 + v4 10〕」✓（标题行版本号见 D-15）
- `docs/prd2.md` §10：M3 行「主图 + 4 卷，150–250 节点 / validate 全绿」+ M4 行「部署 GitHub Pages / 线上可访问，深链可分享」✓；§13 M3 行「M2 行测量口径『M3 真实数据复跑』完成（B5 批：真实 193 节点 / 203 边 p95 0.036ms）」✓
- `docs/m3-b5-scope.md`：J13 批 B / J14 批 A + 更正记录（无向误建模已更正）+ §2 定稿数字——与 §1/§2 实测全部一致 ✓
- 回归点 grep：`microsoft.com/en-us/windows/windows-11` → `data/` 0 命中（D-14 修复不变量成立）✓（`docs/m3-v4-acceptance.md` 内历史记录合法）；`25 条 master` → ui-spec 正文 §1 = 0 命中，全仓库恰 2 处合法（ui-spec 状态行 v0.12 历史条 + `m3-b5-scope` G5 叙述）✓；`scripts/tmp-*` 残留 0（`scripts/` 仅 3 文件 + 工作树 clean）✓
- V2 无独立第三方验收报告（`docs/` 下仅 v1/v3/v4）——checklist 未记原因。判读：流程缺口（V2 轮未按 V1/V3/V4 口径切第三方验收；非数据缺陷），记此备案；建议在 M3 关档行补注或维持现状

## 9. 下一步

- B6 结论回主会话入 checklist（M3 关档行补 B6 验收 + 本报告 + M4 线上深链验收记录）→ **M3 / M4 全期闭合**
- D-15 随文档修复批（标题行去版本或同步；§10 修复记录由修复会话回填）
- V2 验收报告缺口：流程备案（§8），不阻塞关档

## 10. 修复记录（留空）
