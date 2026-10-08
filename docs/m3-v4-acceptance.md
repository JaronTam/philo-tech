# M3 V4 批工作验收报告

- 日期：2026-10-09 · 基线提交：`98282c2`（M3 卷 4 批 = `87e6176` 准备批（J10 PyTorch 定年 2017 + 卷 4 候选清单）+ `8d43623` 数据批（`data/vol-4.json` 45 节点 / 48 边）+ `98282c2` checklist 收口，自 V3 收口后，已推 origin/main，工作树干净）· 复核方式：独立会话实测（五命令复跑 + 独立数据复算脚本 32 项〔自写 `.mjs` 直读 `data/*.json`，不 import 仓库脚本〕 + dev 站 Playwright MCP DOM 断言 + 来源抽查 26 URL / 19 节点 / 4 组主题 + 部署链 GitHub API 3 runs 核对 + 线上 bundle 哈希比对；全程未改仓库文件，唯一写入 = 本报告）
- 复验命令：`npm run typecheck` / `validate` / `measure` / `bench` / `build`（Node 24.18.0）；dev 站 `npm run dev -- --port 5321 --strictPort`
- 环境偏差（非缺陷）：WebFetch 多域被拦 → curl + UA / WebSearch 补核；403 bot 墙 5 域（`openai.com`〔3 URL〕、`blogs.windows.com`、`microsoft.com`、`iso.org` / `isocpp.org`〔本轮未直连，走 WebSearch〕）；`raw.githubusercontent.com/pytorch/.../v0.1.3/README.md` 首查 http=000（瞬断）→ 重试 200，非死链；Playwright MCP 本批可用（无旧会话占用）

## 验收结论

`[STATUS: AC]`（audit 协议三值判定）

- **M3 V4 批交付物：通过**。数据批 45 节点 / 48 边全量落库；validate 193/203 全绿 0 warn；measure 卷 4 主标轮 1686.7/2000、实排 1720.7（0 灰字降级 / 0 余违规）；DOM 实测全绿（六视图 + 深链 + LOD 口径实测复现）；来源抽查 0 死链；部署链 3 runs success。1 项小缺陷（D-14，无 blocking，修法建议见 §7）
- 核验总账抽验（执行方 4 组会话口径 45/45 = 41 VERIFIED / 4 PARTIAL / 4 修正闭合）：本会话独立抽样与总账相容；4 修正项（`vite` / `kotlin` / `webassembly` / `quic` 四条 year_note）数据侧 + 外部源逐项确认（§2 末 / §4）；「另 12 处来源 URL 换源/规范化」未逐项复核（会话日志不在仓库），本轮 26 URL 抽查 0 死链与之相容

核查点（≤5）：

- 命令链全绿：validate 193/203 0 错 0 警；measure 卷 4 主标轮 1686.7/2000、实排 1720.7（0 灰字 / 0 违规）、主图段 [2015,2027) 425/660、master 子图 45/38；全表孤立 0；连通 185+8 两分量；bench p95 0.205ms（快照 0.207，同量级波动）；build vite 自报 gzip 175.63kB（JS）+ 5.29（CSS）＝ 快照读数
- 数据独立复算 32 项：1 FAIL（D-14 回归串复活×1）；其余全过——五卷 13/8·45/49·45/47·45/51·45/48 → 193/203；vol-4 字段合规；禁用词 0；出度 ≤5（`transformer-2017` 恰 5）；跨卷 v3→v4 30 条 + MM 6 逐条在列；`paradigm_shift` 恰 3；`convergence` 维持 5；year_note 19 条逐条核对；候选件 §A/§C/draft 0 差异
- DOM 全绿：六视图计数（main 45+1 grid/38、pre 13/8、v1 45/41、v2 45/36、v3 45/20、v4 45/18）0 console error / 0 warning；LOD 口径实测（卷 4 fit 0.32 → 37 节点、zoom ≥0.5 → 45）；深链 3 例 + flash + history 0 增量 + 无效 id 提示；chip 恰 2；同列同 x 三列与布局公式逐像素一致；主图段 [2015,2027) 10 master 无碰撞
- 来源抽查 26 URL / 19 节点 / 4 组主题：0 死链；403 bot 墙经 WebSearch 补核；争议年 10+ 条独立复核（含 pytorch 三段式全 3 日期、c++17 投票/出版拆分、kotlin 07-19、wasm 02-28、oculus 三日期、vite 无 1.x 稳定版）；候选件 §F2 两处结论双侧核实
- 部署链：`87e6176` → run `37807781169` / `8d43623` → run `37811798270` / `98282c2` → run `37818304334` 全 success；线上 bundle sha256 = 本地 build 产物

## 1. 命令复验

| 命令 | 结果 |
|---|---|
| `npm run typecheck` | tsc --noEmit 无错 |
| `npm run validate` | nodes 193 / edges 203，全部通过，0 错误 0 警告（强制档行号：`:100` paradigm_shift >8 error、`:127` 主图入边 >8 error、`:157` 跨卷总量 >32 error、`:158` 下限 <3 warn、`:161` master→master >7 error） |
| `npm run measure` | 卷 4 主标轮 1686.7/2000 ✓ · 带 concepts/实排 1720.7（去灰字 0、余违规 0）；主图段 [2015,2027) 主标轮 425 / 现有 660 ✓（带 concepts 459）；[1854,1947) 主标轮 −31.2px 容器余量吸收（M1 既有）；master 子图 45 节点 / 38 边；全表孤立 0；连通性 185+8 两分量（early machines 8 维持） |
| `npm run bench` | p95 0.205ms（本会话复跑；快照主张 0.207ms——同量级波动，均 < 100ms；真实数据 193/203 · 出度 max 5 · 跨卷 vol-3→vol-4 30 复跑一致） |
| `npm run build` | `dist/assets/index-BkfKTroL.js` 562,260B；vite 自报 562.26kB / gzip 175.63kB；CSS 25,820B / gzip 5.29kB——与快照主张逐字节一致（文件名内容哈希 `BkfKTroL`，见 §5） |

## 2. 数据复算（独立脚本直接读 `data/*.json`，不调用仓库脚本，FAIL COUNT: 1）

- 五卷节点/边：13/8、45/49、45/47、45/51、**45/48** → 总 **193/203** ✓（与 validate 一致）
- vol-4 字段合规（45 节点逐项）：id kebab + 尾 `-year` ✓、summary ≤60 码点 ✓、concepts 3–8 ✓、people 2–4 ✓（V3 D-12 型未复发）、sources ≥1 可解析 URL（`new URL` 全通）✓、`checked_at` 全 45 = `2026-10-09` ✓
- 禁用词 25 词 label 级 0 命中（全站 193 节点）✓；出度 ≤5：全站 max = 5（`ibm-pc-1981` / `www-1991` / `linux-1991` / `transformer-2017`——新顶格恰 5）✓；时间序 source.year ≤ target.year 全站 0 倒流 ✓；无悬空 id / 无重复 id / 无重复边 ✓
- 跨卷：v3→v4 = **30** 逐条在列、全部相邻卷对（全站跨卷对 0-1:8 / 1-2:11 / 2-3:31 / 3-4:30，**无非相邻跨卷边**）✓；MM = **6** = `llvm→rust` / `cuda→tf` / `alexnet→resnet` / `cuda→alphago` / `alexnet→alphago` / `cuda→pytorch` ✓；主图 master 入边 max = 2（`alphago-2016`，来源 `cuda-2007` + `alexnet-2012`）✓
- vol-4 relation 分布 = enables 18 / conceptual_inf 19 / direct_fork 8 / paradigm_shift 3（合 48）✓；v4→v4 = 18 ✓
- `paradigm_shift` 全站恰 3 且逐条 = `transformer→gpt-3` / `gan→stable-diffusion` / `gpt-3→chatgpt` ✓；`alexnet→alphago` = `conceptual_inf`（J11 降级）✓；`convergence` 全站维持 5（algol-60→c / lisp→ml / ms-dos→win95 / mapreduce→hadoop / dynamo→cassandra）✓；`deno` 双入边 = enables + conceptual_inf，不构成 convergence ✓
- 回归点（prompt §2-6）：旧串 13 条中 **12 条 0 出现**；**1 条命中 → D-14**：`microsoft.com/en-us/windows/windows-11` 出现于 `data/vol-4.json:990`（边 `windows-7-2009 → windows-11-2021` citation，全仓库唯一命中）。修正后新串 5 条全在（`2020-04-21` / `2021-02-16` / `2011-07-19` / `2017-02-28` / `2014 年大规模部署`）✓；对应旧串 4 条 0 出现（`1.0 于 2021-02` / `2011-08 公布` / `MVP 2017-03 全引擎` / `自 2013 年起公开部署`）✓
- 三对 sources↔citation 同步（D-11 根因复查）：`macos-big-sur-2020` / `openai-api-2020` / `sora-2024` 节点源与对应边 citation 两处一致 ✓ 3/3
- year_note：vol-4 共 **19** 条（13 必带 + 6 §F3 推断）逐条核对全过——三段式 `pytorch-2017`（2016-09-01 invite-only closed alpha / 2017-01-19 公开 / 2017-02-02 v0.1.6）、`tpu-v1-2016`（2015 内部 / 2016-05-18）、`kotlin` / `webassembly`（02-28 + 2019-12-05）/ `grpc` / `helm` / `vite` / `github-actions` / `deno` / `vs-code` / `alphafold-2` / `sora` / `c-plus-plus-17` + §F3 六条（`rust` 2012-01-20 / `julia` 2012-02 / `dotnet-core` 2014-11-12 / `apple-watch` 2014-09-09 + 2015-04-24 / `oculus-rift` 三日期 / `quic`）
- 候选件一致性：`docs/m3-candidates-vol4.md` §A 45 id = 数据 45 **set-eq** ✓；§C 48 行（C1 30 + C2 18）逐边对数据（去 `🚩`/`[MM]`/`PS` 标记后 relation 全对）✓；`data/candidates/vol-4.draft.json` 45 条骨架字段（id/label/label_en/layer/column/year/weight/master）与数据 **0 差异** ✓；状态行 = 「**已落库**：`data/vol-4.json` 45 节点 / 48 边（2026-10-09）」✓
- 候选件 §F2 两处（按边界未改，主会话待裁——验收方独立核实两结论均成立）：
  - ① `vite` 行「1.0 2021-02」：npm registry 逐版本核对——**无任何 1.x 稳定版**（1.0.0 仅 beta×12 + rc×13），首个稳定版 **2.0.0 = 2021-02-16**；`vite.dev/blog/announcing-vite2` 200 含「February 16, 2021 / Vite 2.0 / stable」；`0.1.0 = 2020-04-21` ✓——数据层 `vite-2020` note 正确
  - ② `kotlin` 行「2011-08 公布」：实为 **2011-07-19**（JVM Language Summit，JetBrains《Ten Years of Kotlin!》+ JVM Language Summit wiki + ADTmag 3 源）——数据层正确

## 3. 站点 DOM 实测（dev 站 5321，Playwright MCP 断言全过）

| 组 | 断言 | 结果 |
|---|---|---|
| A1 | 六视图计数（先放大到 zoom ≥0.5，LOD 口径）：main 45 tech + 1 grid 背景层 / 38 边；pre 13/8；v1 45/41（49−8）；v2 45/36（47−11）；v3 45/20（51−31）；v4 45/18（48−30） | ✓ |
| A2 | 0 console error / 0 warning（全流程 3 条 messages 均 info 级） | ✓ |
| A3 | LOD 口径实测（本批新增确认）：卷 4 fit 缩放 0.32 < 0.5 → 8 minor 隐藏、DOM 计 37 节点；放大至 0.554 → 45 节点；concepts 在 0.61 隐藏、0.878 显形（`TechBlock.tsx` :44 `minor && zoom<0.5` 返回 null 精确） | ✓ 非缺陷 |
| B1 | 同列同 x 三列（卷 4 布局空间）：nn 11 @ x=2430、net 4 @ x=510、accelerator 4 @ x=254——绝对 x = 布局公式复算（CANVAS_MARGIN 24 / COLUMN_WIDTH 112 / LANE_EXTRA_PAD 32 / inset 6；L2 8 列 928px：2430 = 24+368×2+928+368×2+6、510 = 24+368+112+6、254 = 24+2×112+6），系布局空间坐标（非屏幕坐标，同 D-7/D-10 口径先例） | ✓ 公式自洽 |
| B2 | 主图段 [2015,2027) 10 master 无碰撞：y = yForYear（55px/年）+ 避让 ≤+19px；同列区间两两无重叠（converted 布局 y：2053.4 / 2108.4 / 2163.4 / 2237.4〔+19 避让〕/ 2328.4 / 2438.4） | ✓ |
| C1 | 深链 `#vol=v4&node=pytorch-2017`：面板开（aria-label「节点详情：PyTorch」）+ year_note 三段式全渲染（2016-09-01 / invite-only / 2017-01-19 / 2017-02-02 / v0.1.6）；`.tech-flash` 出现并于 ~700ms 消隐 | ✓ |
| C2 | 深链 `#vol=v4&node=chatgpt-2022`：面板 + 入边 GPT-3「范式转移」+ citation `arxiv.org/abs/2203.02155` 链接渲染；web 列 x = 2062（布局公式 2056+6） | ✓ |
| C3 | 无效 id `#vol=v4&node=bogus-xyz`：notice「节点不存在」+ 面板保持关闭 | ✓ |
| C4 | 居中公式两模式：窄视口 929px（inset.x=0）cx=464.5 = 容器 cx、cy 精确（zoom ≥0.75 时 ±0.8px）；宽视口 1920px（inset.x=360）cx=780 = 容器 cx 960 − 180 = SIDE_PANEL_PX/2——`App.tsx` panelInsets 精确复现 | ✓（附注见 §8） |
| C5 | `history.length`：真实点击节点（docker-2013）面板切换 + hash replaceState 写回，增量 0；深链 hashchange 增量 0 | ✓ |
| D1 | 前史 chip 恰 2（`boole-laws-of-thought-1854` / `shannon-switching-circuits-1937`） | ✓ |

## 4. 来源抽查（26 URL / 19 节点 / 4 组主题）

- A AI/大模型（5 直接 200 + 3 WebSearch 补核）：`raw.githubusercontent.com/openai/gpt-2/master/model_card.md`（gpt-2）· `raw.githubusercontent.com/langchain-ai/langchain/master/CITATION.cff`（langchain）· `pytorch.org/blog/a-year-in/`（含「1 year since … released publicly」）· `raw.githubusercontent.com/pytorch/pytorch/v0.1.3/README.md`（200，含「invite-only closed alpha」原文）· api.github.com releases 复核（`v0.1.1` published 2016-09-01「alpha-1 release」/ `v0.1.6` published 2017-02-02「Beta is here.」）；`openai.com/index/openai-api|chatgpt/` + `…/video-generation-models-as-world-simulators/` 403 bot 墙 → WebSearch 补核 ✓
- B 硬件/芯片（4 直接 200）：`developer.nvidia.com/blog/nvidia-ampere-architecture-in-depth/`（A100）· `nvidia.com/en-us/data-center/technologies/hopper-architecture/`（H100）· `roadtovr.com/3-years-ago-the-oculus-rift-dk1-shipped-heres-a-quick-look-back/`（DK1）· `arxiv.org/abs/1704.04760`（TPU v1 ISCA，含 2015 / inference）✓
- C 系统/网络/交付（6 直接 200 + 1 WebSearch）：`rfc-editor.org/rfc/rfc9000`（QUIC）· `chromium.org/quic/`（JS 渲染页 200，「2014 年大规模部署」经 WebSearch 复核：SIGCOMM 2017 综述「wide-scale deployment … 2014」）· `learn.microsoft.com/…/windows11-release-information`（200；GA 2021-10-05 经 WebSearch 复核）· `blogs.windows.com/…/introducing-windows-11/` 403 bot 墙 → WebSearch 补核 · `github.blog/news-insights/product-news/universe-day-one/`（GitHub Actions）✓
- D 语言/平台/工具（8 直接 200 + 1 解析）：`blog.rust-lang.org/2015/05/15/Rust-1.0/` + `raw.githubusercontent.com/rust-lang/rust/master/RELEASES.md` · `kotlinlang.org/` + `blog.jetbrains.com/kotlin/2016/02/kotlin-1-0-released-…` · `webassembly.org/` · `vite.dev/blog/announcing-vite2` + `registry.npmjs.org/vite`（node 逐版本解析）· `apple.com/newsroom/2020/11/macos-big-sur-is-here/` · `apple.com/newsroom/2014/09/09Apple-Unveils-Apple-Watch-…/` + `…/2015/03/09Apple-Watch-Available-in-Nine-Countries-on-April-24/` ✓
- 争议年 10+ 条独立复核：`pytorch` 三段式 3 日期全过（v0.1.3 实文 + a-year-in + releases API）· `c-plus-plus-17` 2017-09-06 全票通过（Herb Sutter）+ 2017-12 出版（ISO/IEC 14882:2017）· `kotlin` 2011-07-19 · `webassembly` 2017-02-28 四引擎共识（W3C 邮件列表）· `oculus-rift` 三日期（2012-08 Kickstarter / 2013-03 DK1 / 2016-03-28 出货）· `vite` 2.0 = 2021-02-16 + 无 1.x 稳定版 · `quic` 2014 大规模部署 · `windows-11` GA 2021-10-05 · `sora-2024` 2024-02 报告 / 2024-12-09 公开 · `tpu-v1-2016` 2015 内部部署 ✓
- 环境拦截域：`openai.com` / `blogs.windows.com` / `microsoft.com` 403（bot 墙，WebSearch 补核存活）；`papers.nips.cc` / `en.wikipedia.org` 本轮未直连（备案域）；无死链
- 「45/45 = 41 VERIFIED / 4 PARTIAL / 4 修正」总账系执行方口径（会话日志不在仓库）；本会话 26 URL 独立抽样 0 死链、0 不支持主张；4 修正项逐项确认（§2 末）

## 5. 部署链（GitHub Actions API 直查，gh 未登录走 api.github.com 免鉴权）

- `87e6176` → run `37807781169` success ✓；`8d43623` → run `37811798270` success ✓；`98282c2` → run `37818304334` success ✓——三个 run 号、head 与主会话预取一致，独立复核成立（api.github.com 本轮未触 403）
- 线上 https://jarontam.github.io/philo-tech/ ：index 200；线上 `assets/index-BkfKTroL.js`（562,260B）sha256 `e36bb1870115a326aa63a1c77baa367b860636e5d0ecc786936285bb16320d2b` = 本地 `npm run build` 产物逐字节一致；CSS sha256 `5ba08cac…` 与 V3 验收同哈希（数据批未动样式，自洽）

## 6. 文档与 schema 同步

- `content-spec` 状态行 v0.15（M3 V4 准备批：§3 `paradigm_shift` 用法边界句〔J11「领域方法路径换代」+ 首用 3 条〕）✓；§3 边界句与数据落点一致 ✓
- `prd2`：§3.4 `paradigm_shift` 行「2026-10-09 M3 V4 批 J11 收窄」✓；§13 修订记录 M3 行 J10/J11（含「首用 3 条、站内 0 → 3」）✓；§9 上限行仍为 ≤8 ✓
- `master-candidates.md` v0.5：#39 PyTorch 行 = **2017**（J10 判据句）✓
- `checklist.md`：顶部快照切 V4 段（run `37811798270` / 45 节点 / 48 边 / 30 跨卷 / MM 6 / ps 3 / 193·203 / measure 全文数字 / bench 0.207 / build 175.63）与 §4 M3 行（`87e6176` + `8d43623` 落位）——逐项与 §1 复验读数一致 ✓
- `docs/m3-candidates-vol4.md` 状态行「**已落库**：`data/vol-4.json` 45 节点 / 48 边（2026-10-09）」✓
- 改动边界核对（git）：`8d43623` 只动 `data/vol-4.json` + 候选件状态行 1 行（1124+/3−）；`87e6176` 动候选件 + draft + 规格四文件；`98282c2` 只动 `checklist.md`——与 prompt §6 边界注一致 ✓

## 7. 缺陷清单与下一步

| # | 位置 | 缺陷 | 级别 |
|---|---|---|---|
| D-14 | `data/vol-4.json:990`（边 `windows-7-2009 → windows-11-2021` citation） | 被替换旧 URL 在边 citation 复活：`https://www.microsoft.com/en-us/windows/windows-11`（prompt §2-6「不得出现」13 串中唯一命中）。节点 `windows-11-2021` sources 已换源（`blogs.windows.com` + `learn.microsoft.com`），边 citation 未同步——与 V3 D-11 同根因（数据批重写该节点时只换了节点源）；该域本机 403 bot 墙 | 小 |

修法建议（不修，留给修复会话）：D-14——该边 citation URL 换为节点现源之一（建议 `https://blogs.windows.com/windowsexperience/2021/06/24/introducing-windows-11/` 或 `https://learn.microsoft.com/en-us/windows/release-health/windows11-release-information`），换后重跑 13 串回归 grep 确认全 0；可顺带加一条「节点源换源时同步全部同节点引用边 citation」的检查项（D-11 二次复发，同位置型缺陷第三次出现）。

## 8. 登记项确认（登记 ≠ 隐藏，维持登记）

- LOD 口径（卷视图 fit <0.5 时 8 minor 隐藏）：本批 DOM 实测复现（0.32 → 37、≥0.5 → 45），ui-spec §7 口径确认，非缺陷 ✓
- 深链居中附注（新登记）：zoom <0.75 时 concepts 被 LOD 隐藏，块高估算（含灰字预留）与渲染高之差使可视块中心较公式点上偏 ~(est−rendered)/2×zoom ≈ 10px（0.61 档实测）；zoom ≥0.75 时精确（±0.8px）——估算式布局既有口径（同 D-7/D-10 先例），非缺陷
- `pytorch-2017` year_note「2016-09-01 alpha 起」措辞：复核 v0.1.3 README 实文 + releases API（v0.1.1 = 2016-09-01）无硬伤 ✓
- `deepseek-r1-2025` people 含 `Liang Wenfeng`（创始人/CEO，非论文作者）：people = 2 条合规，按「机构或人物」字段惯例保留（同 `Steve Jobs` 先例）——观察项，维持 ✓
- 主图 [1854,1947) 主标轮 −31.2px（M1 既有，容器余量吸收）✓
- early machines 8 节点分量（连通 185+8 两分量）✓
- 环境拦截域（§4 记录，非死链）；`en.wikipedia.org` 留源属备案允许（本批 2 节点）✓
- bench 波动 0.205 / 0.207ms（<100ms 内正常）✓

## 9. 下一步

- D-14 留给修复会话（本会话按纪律只记不修）
- 路线（照 checklist 待办）：D-14 修复批 → B5 校准 + D-4 裁定 → B6 验收 + M4 线上深链

## 10. 修复记录

（留空——待修复会话填写）
