# M3 V3 批工作验收报告

- 日期：2026-10-07 · 基线提交：`749c5cf`（M3 卷 3 批 = `2cd97d1` 准备批（J7 上限 + 候选清单）+ `9ca8ba3` 数据批（`data/vol-3.json` 45 节点 / 51 边）+ `749c5cf` checklist 收口，自 V2 收口后，已推 origin/main，工作树干净）· 复核方式：独立会话实测（命令复跑 + 独立数据复算脚本 + 自驱 CDP headless chrome DOM 断言 + 来源抽查 22 URL / 17 节点 / 4 组主题 + 部署链 GitHub API 核对 + 线上 bundle 哈希比对；全程未改仓库文件，唯一写入 = 本报告）
- 复验命令：`npm run typecheck` / `validate` / `measure` / `bench` / `build`（Node 24.x）；dev 站 `npm run dev -- --port 5319 --strictPort`
- 环境偏差（非缺陷）：Playwright MCP 浏览器被旧会话（1af074bb）占用 → 自启 ms-playwright chromium-1228 headless（CDP 9333）+ 零依赖 Node 24 WebSocket 客户端驱动；WebFetch 多域被拦 → curl + UA；以下域本机 http=000（环境拦截，非死链）：`en.wikipedia.org`、`research.google`、`docker.com`、`blog.chromium.org`、`ics.uci.edu`、`source.android.com`、`android.com`、`android-developers.googleblog.com`；`dl.acm.org` / `science.org` 403 bot-wall；`papers.nips.cc` 需 `--ssl-no-revoke`

## 验收结论

`[STATUS: AC]`（audit 协议三值判定）

- **M3 V3 批交付物：通过**。数据批 45 节点 / 51 边全量落库；validate 148/155 全绿 0 warn；DOM 实测全绿；来源抽查 0 死链；部署链 2 runs success。3 项小缺陷（D-11 / D-12 / D-13，均无 blocking，修法建议见 §7）
- 核验总账抽验（执行方 4 组会话口径 45/45 = 14 VERIFIED / 27 PARTIAL / 4 修正）：本会话独立抽样与总账相容；4 修正项数据侧逐项确认

核查点（≤5）：

- 命令链全绿：validate 148/155 0 错 0 警；measure 卷 3 主标轮 1886.7/2000、实排 1920.7（0 灰字 / 0 违规）；[2000,2015) 510/525；master 子图 35/27；全表孤立 0；连通 140+8 两分量；bench p95 0.206ms；build vite 自报 gzip 167.08kB
- 数据独立复算 30+ 项：2 FAIL（D-11 边 citation 死链复活、D-12 people=1×7）；其余全过——五卷 13/8·45/49·45/47·45/51·0/0 → 148/155；字段合规；禁用词 0；出度 ≤5（`linux-1991` 恰 5）；跨卷 v2→v3 31 条 + MM 6 逐条在列；convergence 恰 2；paradigm_shift v3=0；year_note 13 处抽查；候选件 §A/§C set-eq
- DOM 全绿：六视图计数（main 35+1 grid/27、pre 13/8、v1 45/41、v2 45/36、v3 45/20、v4 0/0）0 console error；同列同 x 三列（toolchain 1214 / container 2174 / distributed 1918 = 布局公式精确复算）；深链 3 例 + 闪烁 300–600ms + history.length 不变 + 无效 id 提示；居中公式精确；chip 恰 2；LOD 两档
- 来源抽查 22 URL / 17 节点：18 直接 200 + 4 重印 DOI 元数据核验（CACM 51(1) 2008 / TOCS 26(2) 2008 / CACM 60(6) 2017 / CACM 63(11) 2020）
- 部署链：`9ca8ba3` → run `37626983024` success、`749c5cf` → run `37627411017` success；线上 bundle sha256 = 本地 build

## 1. 命令复验

| 命令 | 结果 |
|---|---|
| `npm run typecheck` | tsc --noEmit 无错 |
| `npm run validate` | nodes 148 / edges 155，全部通过，0 错误 0 警告（J7 双档在 `scripts/validate.ts`：:154 跨卷总量 >32 error、:155 下限 <3 warn、:158 master→master >7 error） |
| `npm run measure` | 卷 3 主标轮 1886.7/2000 ✓ · 带 concepts/实排 1920.7（去灰字 0、余违规 0）；主图段 [2000,2015) 510/525 ✓（concepts 轮 563 > 525 越段入空卷 4 段——复核无实际碰撞，已知口径）；[1854,1947) 主标轮 −31.2px 容器余量吸收（M1 既有）；master 子图 35/27；全表孤立 0；连通性 140+8 两分量（early machines 8 节点分量 = 登记项） |
| `npm run bench` | p95 0.206ms（本会话复跑；先前一次 0.221ms，均 < 100ms） |
| `npm run build` | JS 1 文件 532317B raw；vite 自报 532.32kB / gzip 167.08kB；checklist 快照主张 gzip ≈166.26KB——本会话 7 种测量排列均无法复现 → D-13（§7） |

## 2. 数据复算（独立脚本直接读 `data/*.json`，不调用仓库脚本，FAIL COUNT: 2）

- 五卷节点/边：13/8、45/49、45/47、**45/51**、0/0 → 总 148/155 ✓（与 validate 一致）
- vol-3 字段合规：id kebab+尾-year ✓、summary ≤60 码点 ✓、concepts 3–8 ✓、layer/column 在 meta 注册表 ✓、sources ≥1 可解析 URL ✓、checked_at 非空 ✓；**people 2–4 ✗：7 节点 people 长度 =1（`sqlite-2000`:D. Richard Hipp / `dotnet-framework-2002`:Microsoft / `amd64-2003`:AMD / `nvidia-g80-2006`:NVIDIA / `amazon-s3-2006`:Amazon Web Services / `clojure-2007`:Rich Hickey / `windows-7-2009`:Microsoft）——站内 people=1 总数恰 7、全部来自本批，validator 未校验 people 长度 → D-12（§7）**
- 禁用词表 25 条，label 级 0 命中 ✓；出度 ≤5（`linux-1991` 恰 5）✓；master 入度 ≤8 ✓；时间序 source.year ≤ target.year ✓；无悬空 id、无重复 id/边 ✓
- 跨卷：v2→v3 31 条逐条在列 ✓、全部相邻卷对 ✓；master→master 6 = `c++→llvm` / `c++→go` / `js→nodejs` / `http→s3` / `java→mapreduce` / `ibm-pc→iphone`（J9 弱 conceptual_inf 落点）✓；无非相邻跨卷边 ✓
- convergence 恰 2 条：`hadoop-2006 ← gfs-2003 + mapreduce-2004`、`cassandra-2008 ← bigtable-2006 + dynamo`，target 入度均 ≥2 ✓
- paradigm_shift：v3 = 0、站内总数 ≤8 ✓
- 回归点：全仓库 grep `scikit-learn-2007` = 0 ✓；`data/vol-3.json` 无 `apple.com/newsroom/2001/03/24` / `llvm.org/pubs/2004-01-30` / `kubernetes.io/blog/2014/06/announcing-kubernetes` ✓；**但 `amd.com/system/files/TechDocs/24592.pdf`（边 `intel-80386-1985→amd64-2003` 的 citation）与 `research.google/pubs/pub27898`（边 `gfs-2003→bigtable-2006` 的 citation）各 1 处出现 → D-11（§7）**；`pub51` 保留（gfs 节点源）✓
- year_note 口径抽查 13 处全过：`ios-2007`（2010-06-07 更名）/ `iphone-2007`（发布 01-09 / 上市 06-29）/ `ipad-2010` / `amd64-2003`（Opteron 04-22）/ `c-sharp-2000`（2000-07 PDC）/ `cuda-2007` / `scikit-learn-2010`（2007 GSoC + 2010-02-01）/ `spark-2010` / `hadoop-2006` / `cassandra-2008` / `kubernetes-2014`（06-06 提交 / 06-10 公布）/ `c-plus-plus-11-2011`（08-12 投票 / 09-01 出版）/ `html5-2014`
- 候选件一致性：`docs/m3-candidates-vol3.md` §A 45 id 与数据 set-eq ✓、§C 51 边与数据 set-eq ✓；`data/candidates/vol-3.draft.json` 45 节点且 `scikit-learn` 行 = `-2010` ✓
- master 10 逐 id = 快照：`llvm-2003` / `mapreduce-2004` / `amazon-s3-2006` / `iphone-2007` / `cuda-2007` / `nodejs-2009` / `go-2009` / `alexnet-2012` / `docker-2013` / `kubernetes-2014` ✓

## 3. 站点 DOM 实测（dev 站 5319，自驱 CDP chrome 断言全过）

| 组 | 断言 | 结果 |
|---|---|---|
| A1 | 六视图计数：main 35 tech + 1 grid 背景层 / 27 边；pre 13/8；v1 45/41（49−8）；v2 45/36（47−11）；v3 45/20（51−31 跨卷，分卷页不渲染跨卷边）；v4 0/0 | ✓ |
| A2 | 0 console error / 0 exception（全流程 Log + Runtime 双通道监听） | ✓ |
| B1 | 同列同 x 三列：toolchain（`llvm-2003`/`cuda-2007`）同 x=1214、container（`docker-2013`/`kubernetes-2014`）同 x=2174、distributed（`hadoop-2006`/`spark-2010`）同 x=1918 | ✓ |
| B2 | 绝对 x = 布局公式复算（`src/lib/layout.ts` 常量：COLUMN_WIDTH 112 / LANE_EXTRA_PAD 32 / MIN_LANE_COLS 3 / inset 6）：1214 = 24+368+368+4×112+6、2174 = 24+368+368+928+368+112+6、1918 = 24+368+368+928+2×112+6——公式与 DOM 逐像素一致，系布局空间坐标（非屏幕坐标） | ✓ 公式自洽 |
| C1 | 深链 `#vol=v3&node=scikit-learn-2010`：面板开 + year_note 含 GSoC + people 含 Cournapeau + `.tech-flash` 在 300–600ms 窗口出现（居中后闪烁） | ✓ |
| C2 | 点击另一节点（ios-2007）：面板切换、`history.length` 增量 0 | ✓ |
| C3 | 深链 `#vol=v3&node=iphone-2007`：面板 + 双日期（2007-01-09 / 2007-06-29） | ✓ |
| C4 | 无效 id `#vol=v3&node=bogus-xyz`：notice 提示 + 面板保持关闭 | ✓ |
| C5 | 居中公式：窄视口 914×711（NARROW_MQ 命中）iphone-2007 rect cx=457.0=vw/2、cy=228.6=355.5−126.9（inset.y = 0.45×canvas 564 = 253.8，半值 126.9）——`App.tsx` panelInsets 精确复现 | ✓ |
| D1 | LOD 两档：90% 档 minor（`sqlite-2000`）渲染 + concepts div（font-size 11px）渲染；62% 档 minor 渲染 + concepts 无；43% 档 minor 无——`TechBlock.tsx` :44（minor zoom<0.5 不渲染）/:88（concepts zoom≥0.75）精确 | ✓ |
| E1 | 前史 chip 恰 2 处（`boole-1854` / `shannon-1937`） | ✓ |

## 4. 来源抽查（22 URL / 17 节点 / 4 组主题）

- A 语言链（5 直接 200）：`releases.llvm.org/1.0`（llvm-2003）/ `go.dev/doc/faq`（go-2009）/ Stroustrup FAQ（c-plus-plus-11-2011）/ `webstore.iec.ch/en/publication/21240`（ISO/IEC 14882:2011）/ Swift 2014 发布页（swift-2014）✓
- B 数据系统（4 直接 200 + 1 WebSearch 补核）：`usenix.org/osdi-04`（mapreduce）/ `usenix.org/osdi-06`（bigtable）/ `hadoop CHANGES.0.1.0`（hadoop-2006）/ `sqlite.org/chronology.html`（sqlite-2000）✓；`research.google` pub51（gfs-2003）环境拦截 → WebSearch 确认存活
- C 交付/基础设施（6 直接 200）：`press.aboutamazon.com/2006/3/amazon-web-services-launches`（amazon-s3-2006）/ `lwn.net/Articles/907613` / `kubernetes.io/blog/2018/06/06/4-years-of-k8s`（kubernetes-2014）/ `riscv.org/about/history/` / `pcper.com`（nvidia-g80-2006）/ `docs.docker.com`（docker-2013，WebSearch 补核）✓
- D AI 链（3 直接 200）：`scikit-learn.org/stable/about.html`（scikit-learn-2010）/ CUDA archive（cuda-2007）/ `papers.nips.cc` AlexNet（需 `--ssl-no-revoke`）✓
- 4 重印 DOI：302→dl.acm.org 403 bot-wall，经 WebSearch 元数据核验标题/作者/卷期全对——mapreduce CACM 51(1) Jan 2008 / bigtable TOCS 26(2) Jun 2008 / alexnet CACM 60(6) Jun 2017 / gan CACM 63(11) Nov 2020 ✓
- 环境拦截域 8 个（`en.wikipedia.org` 等，§状态行）记明——非死链，WebSearch 补核均存活
- 「45/45 = 14 VERIFIED / 27 PARTIAL / 4 修正」总账系执行方 4 组会话口径（会话日志不在仓库，未逐条复验 45）；本会话独立抽样 22 URL 与之相容：0 死链、0 不支持主张

## 5. 部署链（GitHub Actions API 直查，gh 未登录走 api.github.com）

- `2cd97d1`（准备批）0 runs：与 `9ca8ba3` 同分钟推入 → 合并为单 run（V1 期间同口径先例，非缺陷）
- `9ca8ba3` → run `37626983024` success ✓；`749c5cf` → run `37627411017` success ✓——checklist 快照两个 run 号与 head 均属实
- 线上 https://jarontam.github.io/philo-tech/ ：index 200；下载线上 `assets/*.js` / `assets/*.css` 与本地 `npm run build` 产物 sha256 逐一比对一致（JS `1bf13876cae3387beb73f6bad093af354d9c7ea699885831450fbbd79eb509e1`、CSS `5ba08cac49bc03cec57e85231878dbee8e5eec4a9c4db2261db70acc12d1e66d`）

## 6. 文档与 schema 同步

- content-spec v0.14（状态行 M3 V3 批）· §3 跨卷边：相邻卷对 ≤32（总量）/ ≤7（master→master）+ J1（≤8/≤5）→J5（≤12/≤5）→J7 沿革 ✓
- prd2：§9 表行（≤32/≤7，J7）✓；§13 第 3 条 M3 行（J7 三修：12→32 / 5→7，实测 31 条 / MM 6 条）✓
- validate.ts 双档：`> 32` error（:154）/ `> 7` error（:158）+ `< 3` warn（:155）✓；顺带发现 :114 注释仍写「相邻卷跨卷边 ≤5」（陈旧注释，纯文档性 remark，非缺陷）
- checklist.md 快照 V3 段 + §4 M3 行全部落位 ✓（run 号 / J7 / J8（Swift→c-family）/ J9（ibm-pc→iphone 弱 conceptual_inf）/ 待办 V4 候选 → B5 校准 + D-4 裁定 → B6 验收 + M4 线上深链）；唯一不符 = build gzip 166.26KB → D-13

## 7. 缺陷清单与下一步

| # | 位置 | 缺陷 | 级别 |
|---|---|---|---|
| D-11 | `data/vol-3.json`（边 citation） | 2 处被替换死链在边 citation 复活：`amd.com/system/files/TechDocs/24592.pdf`（边 `intel-80386-1985→amd64-2003`）+ `research.google/pubs/pub27898`（边 `gfs-2003→bigtable-2006`）。prompt §2-6 回归点要求这两 URL「不得出现」——数据批重写该两条边 citation 时未清 | 小 |
| D-12 | `data/vol-3.json`（7 节点 people 字段） | 7 节点 people 长度 =1（`sqlite-2000` / `dotnet-framework-2002` / `amd64-2003` / `nvidia-g80-2006` / `amazon-s3-2006` / `clojure-2007` / `windows-7-2009`），content-spec §1 要求 2–4；站内 people=1 总数恰 7、全部来自本批；validator 未校验 people 长度，validate 全绿下漏过 | 小 |
| D-13 | `checklist.md` 快照 | build gzip 主张 ≈166.26KB 与任何现测量不符（vite 自报 167.08kB；本会话 7 种排列实测均 ≠166.26KB）——纯文档漂移 | 小 |

修法建议（不修，留给修复会话）：D-11——2 处 citation 换活源（amd64 边用 Opteron 发布报道，bigtable 边用 OSDI-06 页或 `pub63` 等活链），换后重跑 §2-6 回归 grep 确认 6 条 URL 全 0；D-12——二选一：(a) validator 加 people 2–4 档 + 本批 7 节点补第二人（机构节点用机构+代表人物，单人项目用作者+合著者，口径确认后）；(b) 若认定单人/单机构节点 1 人合理，修订 content-spec §1 记裁例（sqlite 单人项目等），再同步 validator；D-13——checklist 改记当前 build 输出（167.08kB，vite 自报）并注口径。

## 8. 登记项确认（登记 ≠ 隐藏，维持登记）

- `2cd97d1` 无独立 run（与 `9ca8ba3` 合并为单 run）——V1 同口径先例 ✓
- 主图 [1854,1947) 主标轮 −31.2px（M1 既有，容器余量吸收）✓
- [2000,2015) concepts 轮 563 > 525——越段入空卷 4 段，复核无实际碰撞 ✓
- early machines 8 节点分量（连通 140+8 两分量，非孤立）✓
- `ios` summary「基于 Mac OS X 技术」= J9 血统表述落点，非错误 ✓
- bench p95 0.206 / 0.221ms 两次波动（<100ms 内正常）✓
- 环境拦截域 8 个（§4，WebSearch 补核存活，非死链）✓
- 4 修正项数据侧确认：scikit-learn 改年 2010 + id 同步 / c-sharp 月份 07 / c++11 日期拆分 / kubernetes 换源 ✓

## 9. 下一步

- D-11 / D-12 / D-13 留给修复会话（本会话按纪律只记不修）
- 路线（照 checklist 待办）：V4 候选（G-A）→ V4 落数据/核验/push → B5 校准 + D-4 裁定 → B6 验收 + M4 线上深链

## 10. 修复记录（2026-10-07，修复会话）

| # | 位置 | 修复 |
|---|---|---|
| D-11 | `data/vol-3.json` 边 citation（2 处） | `intel-80386 → amd64` 边 → `pcper.com` Opteron 报道（2003-04-22 首发）；`gfs → bigtable` 边 → USENIX OSDI-06 页；6-URL 回归 grep 全 0（`pub51` 保留属预期） |
| D-12 | `data/vol-3.json` 7 节点 + `scripts/validate.ts` | 补第二人（规格 §1 的 2–4）：`sqlite-2000` +SQLite Consortium / `dotnet-framework-2002` +Anders Hejlsberg / `amd64-2003` +Hector Ruiz / `nvidia-g80-2006` +Jen-Hsun Huang / `amazon-s3-2006` +Andy Jassy / `clojure-2007` +Alex Miller / `windows-7-2009` +Steven Sinofsky；validator 增 people 2–4 档（防再发） |
| D-13 | `checklist.md` 快照 | build gzip → **167.12kB**（修复批复测；原 166.26 系修复前读数）；顺带清 `validate.ts` :114 陈旧注释（评审 remark） |

复验：`typecheck` 无错 / `validate` 148/155 全绿（含新 people 档）/ `measure` 卷 3 1886.7/2000 · 主图段 [2000,2015) 510/525 · master 子图 35/27 / `build` gzip 167.12kB 全过。提交 = `0a7bbd3`（修复批）；本记录随文档批。
