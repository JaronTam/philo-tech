# 工程 Checklist

状态：2026-10-10 · 依据 `docs/prd2.md`（v7 · schema v5.3）与审计（全文见 `subject-matter/prd.md` §13） · 远端 `git@github.com:JaronTam/philo-tech.git`（SSH）

图例：`[x]` 已定或已完成 / `[ ]` 待补充或待开工

> 进度快照（2026-10-10 UI 优化批 · 下次接续点）：**UI 优化批（2026-10-10）：登记完成 → ① 探针 `P1` / `P2` 已跑（2026-10-10，结果入范围件 §7：前史违规 `1 → 0` 两径〔② 降级扩展 / ③ 28px 档〕，边界 = `k=3` 簇 32 档内无解；家系全局归属歧义 `66/193`；接口草案 + 跨平面边字段清单）→ 下次接续点 = ② 三套几何讨论（§6：`L0`–`L3` 阶梯 + `6` 个待裁小问）→ ③ 逐条裁定**：范围件 `docs/ui-opt-scope.md`（审计基线 + 根因 + `7` 个裁点 `J-A1` / `J-A2` / `J-A3` / `J-B` / `J-C` / `J-D1` / `J-D2` + 预排落批序）；关键数字 = 文字重叠 `1` 处（残压 `7.55px`）/ 边穿字 `66` 块（竖穿 `46` + 横穿 `20`；跨泳道仅 `5`）/ 主图血统 `8` 棵树（`0` 歧义）/ 路由探针 `66 → 10` 块 / roughjs gzip `8,927`B；证据 = 真实函数探针 + `.playwright-mcp/` 截图三张（`pre-colossus-overlap` / `v2-knockout-test` / `main-lineage-color-demo`）；本批纯文档，未动 `src/` / `data/` / specs。**2026-10-09 M3 V2 回顾批**：**B6 验收 + M4 线上深链验收完成 → M3 / M4 双 `[STATUS: AC]`、M3 关档**（`docs/m3-b6-acceptance.md`，基线 `ba0a519`：五命令复跑 + 独立数据复算 FAIL COUNT 0〔relation = enables 73 / conceptual_inf 71 / direct_fork 51 / convergence 5 / paradigm_shift 3〕+ dev DOM 32/32〔trace lit 9 / dim 36 与复算一致；收敛 3 master；LOD 三档；深链 6 抽〕+ 线上 29/29〔assets sha256 与本地 build 逐字节一致〕+ 来源 30 URL 0 死链 + 部署链 12/12 runs success；**1 小缺陷 D-15** = `ui-spec` / `content-spec` 标题行版本号与状态行不一致〔纯文档漂移，先于本批存在〕→ **已修 `6768278`**（标题行去版本号，口径 A = 版本真源唯一 = 状态行；报告 §10 已回填）；**V2 无独立验收报告 = 流程缺口**〔报告 §8 备案，不阻塞关档；已由 2026-10-09 V2 回顾批补验，见后〕；推送 `b0c93ab`，deploy run `37923450191` success）。**D-15 修复批完成**（`6768278`，deploy run `37923737949` success：标题行去版本号；报告 §10 回填）。**B0 回顾性第三方验收 `[STATUS: AC]`**（`docs/m3-b0-acceptance.md`，worktree @ `7dd703f` 复跑：五命令全绿〔build 清洗后逐字节复现 `index-Dntz4j5O.js` / gzip 141.54kB〕+ 数据独立复算 FAIL 0〔20/16 · 连通 7/6/5/2〕+ `--draft` 正/错两径〔EXIT=0/1〕+ DOM 全过〔chip 2 处 · 缩放 ×1.2 阶梯 + 0.75 舍入边界 · L2 928px〕+ 部署链 2/2 success；**2 小缺陷** D-16〔`content-spec:36` 右移 112 → 224〕/ D-17〔Pitts label 候选池对齐数据〕→ 修复 `bc5ad07`；口径注记 = 「预检 6 项」系粗分组（细 8 类）；环境注记 = Tailwind v4 扫描未 ignore 文件致 build 哈希偏移 → ignore `data/candidates/tmp-*`；**代码零差异事实**：`7dd703f → HEAD` 间 B0 代码（`src/**` / `measure.ts` / `bench-bfs.ts` / `meta.json` / lock）除 `validate.ts` 15 行外 ZERO DIFF；收口推送 `27ed476`（run `37928763422`）· 补记 `83dc212`（run `37929164556`）· 进度同步 `a2699aa`（run `37929791790`）均 success）。**V2 回顾性第三方验收 `[STATUS: AC]`**（`docs/m3-v2-acceptance.md`，worktree @ `f154e1c` 复跑：五命令全绿〔build `index-BeBc7OY4.js` 503.04kB / gzip 158.53kB——哈希与字节全同〕+ 独立复算 FAIL 0〔103/104 · 45/47 · 跨卷 8/11 · convergence 3 · 连通 95+8 · J6 三处一致〕+ DOM 六视图计数全对〔主图 25/19 · 卷 2 45/36〕+ 来源 30 URL 0 死链〔28×200 / 2×403 + 6 DOI Crossref；ARM2 / BackRub 两条重点口径成立〕；**2 小缺陷** D-18〔`validate.ts:114` 时点注释滞后——已被 `0a7bbd3`/J7 覆盖，记档无修复〕/ D-19〔`m3-candidates-vol2.md` §D master→master 4 → 5（+J6）〕→ 修复 `d663942`；注记 = run head `2fb4040`（批尾口径）/ 核验分类 33+2≠45（跨批粒度）；**验收覆盖 = 100%**（M0–M2 / V1–V4 / B0 / B6 / V2）；收口推送 `6acda45`（`d663942` + 入档同推，run `37934711793`）· 补记 `528554b`（run `37934866344`）均 success）。剩 = 无未闭项（V2 缺口已补验 → 验收覆盖 = 100%；移动端 = 不做〔2026-10-09 明确〕））——**B5 校准批完成**（范围件 `docs/m3-b5-scope.md`；**J13 批 B** = 有向（祖先 ∪ 后代）trace 语义 = 现状、**零代码改动**——呈报初稿「无向 185/193 lit」系复算脚本建模错误，已更正记档（真实 `deriveLit`：任意起点 lit 中位 15/193；master 起点 lit 中位 21/193〔其中 master 中位 8/45〕）→ **D-4 关档**；**J14 批 A** = 维持 185 + 8 两分量（孤岛 8 节点 = 图灵机 1936 / ABC 1942 / Colossus 1944 / ENIAC 1945 / EDVAC 报告 1945 / Baby 1948 / Mark 1 1949 / UNIVAC I 1951；岛内 7 边 / 跨边 0）；G5 同步 = `ui-spec` v0.13（§1 注记 25 → **45 条 master** 终值 + §7 真实复跑完成注）/ `prd2` §10 M2 行 + §13 行；G2 DOM 全过（六视图 0 console error；主图 45 master；卷 1–4 45 节点〔LOD：v4 41% 渲染 37 = 去 minor 8；85% 45〕；trace 实测 click Transformer → lit 9 / dim 36〔罗素 → M–P → 感知机 → … → ResNet → Transformer 血统链〕；收敛真实可用点亮 3 master〔LISP / C 语言 / MapReduce〕+ 三态互斥；深链 6 抽；`pytorch-2017` year_note 三段式；fixture `+2` 防御路径有效、`+N` 真实不可达登记）；五命令全绿（validate 193/203 · measure 合计 2713.4 · bench 真实 p95 0.041ms / 合成 0.207ms · build gzip 175.63KB）；推送 `8906db8`，deploy run `37919852470` success）。剩 = **B6 第三方验收 + M4 线上深链**）——**V4 数据批完成并上线**（`8d43623`，deploy run `37811798270` success：`data/vol-4.json` 45 节点 / 48 边〔v3→v4 跨卷 30 条（≤32 上限内）/ MM 6；J11 `paradigm_shift` 首用 3 条 = `transformer→gpt-3` / `gan→stable-diffusion` / `gpt-3→chatgpt`〔P2 降级 conceptual_inf〕〕；核验 4 组并行 45/45 = 41 VERIFIED / 4 PARTIAL / 4 修正闭合〔`vite` / `kotlin` / `webassembly` / `quic` 四条 year_note；另 12 处换源〕；`validate` 193/203 全绿 0 warn；`measure` 卷 4 主标轮 1686.7/2000、实排 1720.7（0 灰字降级 / 0 余违规）、主图段 [2015,2027) 425/660、master 子图 45 节点 / 38 边、全表孤立 0；连通性 185+8 两分量维持（early machines 8 不变）；dev DOM：主图 45 master / 卷 4 45 节点（LOD 口径：zoom ≥0.5 计数）、深链 `#vol=v4&node=pytorch-2017` 三段式 year_note、0 console error；`bench` p95 0.207ms；`build` gzip 175.63KB。**V4 准备批**（`87e6176`，deploy run `37807781169` success）：J10 PyTorch 定年 2016 → 2017〔closed alpha 判据；公开可用 2017-01-19〕/ J11 边界句落 `content-spec` v0.15 + `prd2` §3.4 / J12 列归属 A/B/C〔`sycamore`→accelerator / `chatgpt`→web + `openai-api`→cloud-api / `grpc`→net〕；候选件 `docs/m3-candidates-vol4.md` + `data/candidates/vol-4.draft.json`。环境备案（本批增补）：`tensorflow.org` / `cloud.google.com` / `httpwg.org` / `web.archive.org` 本机不可达；`openai.com` / `iso.org` / `isocpp.org` / `microsoft.com` 403 bot 墙（核验走 WebSearch 补核）。**V4 第三方验收 `[STATUS: AC]`**（`docs/m3-v4-acceptance.md`：命令复跑 + 数据独立复算 32 项 + DOM 六视图断言 + 来源抽查 26 URL + 部署链 3 runs 核对；1 小缺陷 D-14（边 citation 残留旧串，V3 D-11 同根因）→ 修复 `f06dd6d` + 报告入档 `1da2370`；`§F2` 两处验收独立核实成立后已同步（`vite` 无 1.x 稳定版、2.0 = 2021-02-16；`kotlin` = 2011-07-19）；`content-spec` §5 增换源同步规则 v0.16；验收/修复批 deploy runs `37820747974` / `37822768263` 均 success）。待办：**B5 校准〔范围缺文档定义——开工前定，候选 = D-4 裁定 + M3 全量后复跑项〕+ D-4 裁定 → B6 验收 + M4 线上深链**）——**V3 数据批完成并上线**（`9ca8ba3`，deploy run `37626983024` success：`data/vol-3.json` 45 节点 / 51 边〔v2→v3 跨卷 31 条 / MM 6；convergence +2 = hadoop〔GFS+MapReduce〕/ cassandra〔BigTable+Dynamo〕〕；核验 4 组并行 45/45 = 14 VERIFIED / 27 PARTIAL / 4 修正闭合〔`scikit-learn` 改年 2010 + id 同步 / `c-sharp` 月份 07 / `c++11` 日期拆分〔08-12 投票、09-01 出版〕/ `kubernetes` 换源〕；`validate` 148/155 全绿 0 warn；`measure` 卷 3 主标轮 1886.7/2000、实排 1920.7（0 灰字降级 / 0 余违规）、主图段 [2000,2015) 510/525 ✓（带 concepts 563 越段由空卷 4 段吸收）、主图 master 子图 35 节点 / 27 边、全表孤立 0；连通性 140+8 两分量维持（早期机器群 8 不变）；dev DOM：主图 35 master / 卷 3 45 节点、深链 `#vol=v3&node=scikit-learn-2010` 居中 + 抽屉面板 + `year_note` 渲染、0 console error；`build` gzip 167.12kB（D-13 修正：原 166.26 系修复前读数）。**J7**（批）：跨卷边 v2→v3 上限 12 → 32 / master→master 5 → 7（落 content-spec §3 v0.14 / prd2 §9+§13 / `validate.ts` 双档）；**J8**：`Swift` 2014 → `c-family`（4 源综合：Lattner / TSPL / swift.org / USC 课件）；**J9**：A 案 `ibm-pc-1981 → iphone-2007`（🚩 弱边；落库时否决 `unix → iphone`〔跨 2 卷非相邻，2 条 warn 不可补齐〕，血统入 `ios` summary）。候选件入档：`docs/m3-candidates-vol3.md` + `data/candidates/vol-3.draft.json`。环境备案：`wikipedia` / `research.google` / `docker.com` / `blog.chromium.org` 本机不可达（核验走 WebSearch / 只读代理）；master 候选表维持 45 触顶。**V3 第三方验收 `[STATUS: AC]`**（`docs/m3-v3-acceptance.md`：命令复跑 + 数据独立复算 30+ 项 + DOM 断言 + 来源抽查 22 URL + 部署链 2 runs 核对；3 小缺陷 D-11 边 citation 死链×2 / D-12 people=1×7 / D-13 gzip 口径 → 修复 `0a7bbd3` + 报告入档 `23e2c76`；验收/修复批 deploy runs `37643020950` / `37644455788` 均 success）。待办：**V4 候选（G-A）→ V4 → B5 校准 + D-4 裁定 → B6 验收 + M4 线上深链**）——**V2 数据批完成并上线**（`f154e1c`，deploy run `37233431046`〔head `2fb4040` = 批尾〕success：`data/vol-2.json` 45 节点 / 47 边〔提交 `7ef829a` 文案「48 边」系误计〕；来源核验 45/45 = 33 VERIFIED + 2 PARTIAL〔`Archimedes` ARM2 口径修正 / `google` 本机网络屏蔽 → Stanford BackRub 页为主源〕；`validate` 103/104 全绿；`measure` 卷 2 主标轮 1820/2000、实排 1854（0 灰字降级 / 0 余违规）、主图段 [1980,2000) 445/500 ✓、主图 master 子图 25 节点 / 19 边、全表孤立 0；连通性 95+8 两分量维持；**J6**（追加裁定）：`intel-8086-1978` 升 master 消解主图 `IBM PC` 孤点〔候选表 44→45，触顶 ≤45〕）——**V1 数据批完成并上线**（`dc2a12a`，deploy run `37228481970` success）——卷 1 补齐 **45 节点 / 49 边**（新增 38：device 11 / arch 1 / os 6 / net 4 / 语言 11〔新列 `algol-family` 首用 6 条〕/ relational 3 / nn 2；4 新 master = UNIX 1971〔J2 裁定，year_note 记 1969 PDP-7〕/ 关系模型 / C 语言 / TCP-IP → 主图 16 master / 11 边；49 含后补桥边 `transistor→IBM 7090`——D-9 修正，48 系该边补入前的计数）。J1 修订落三处（content-spec §3 → v0.12 / prd2 §9+§13 / `validate.ts` 双档：总量 ≤8 + master→master ≤5）；pre→v1 跨卷边 8 条（新 3：ENIAC→UNIVAC / Hollerith→701 / 罗素→关系模型）；convergence 2 条首现（C←ALGOL 血统、ML←Lisp）→「收敛」toggle 真实数据首次可用。来源核验 = 4 并行会话逐条抓取正文（WebFetch 域屏蔽 → curl+WebSearch；37 VERIFIED / 4 PARTIAL，修正口径：CTSS 709→7090 入 year_note / email 1971|1972 入 year_note / BNF 首发 ALGOL 58 / yacc 依 CSTR #32）。实测：validate 58/57 全绿；measure 卷 1 主标轮 1959.4/2000、实排 1993.4（0 灰字降级 / 0 余违规，免拉伸）；主图段 [1947,1980) 344/396；连通性 37+13 → 50 节点单分量（+`transistor→IBM 7090` 桥边），早期机器群 8 节点维持登记（桥边 `EDVAC→IBM 701` 被 pre→v1 上限 8/8 挡）；master 孤点 TCP/IP（V2 落 `tcp-ip→www` 后消解）；dev DOM：45 节点、四列同 x（布局空间 `algol-family` 6@1438 / `os` 6@398 / `net` 4@510；972/546/592 系 ~41% 缩放档屏幕坐标——D-10 口径注，同 D-7 先例）、UNIX 详情含 year_note + 来源链接、0 console error。候选件入档：`docs/m3-candidates-vol1.md`（G-A 已批）+ `data/candidates/vol-1.draft.json`。**V1 第三方验收 `[STATUS: AC]`**（`docs/m3-v1-acceptance.md`：命令复跑 + 数据独立复算 33 项 + DOM 22 项 + 来源抽查 16 URL + 部署链 5 runs 核对；2 小缺陷 D-9 边数 48→49〔后补桥边计数〕/ D-10 x 坐标口径 → 修复 `9757fef` + 报告入档 `e0358a8`）。待办：**V3 候选（G-A）→ V4 → B5 校准 + D-4 裁定 → B6 验收 + M4 线上深链**；V2 出卷边 5 条已落（C→C++ / 8086→IBM PC / TCP-IP→WWW / UNIX→Linux / Apple II→IBM PC）。B0 代码准备批（前史 chip / `D-8` 缩放 / `measure --draft` / bench 真实段 / L2 双列）已完成并上线（`4bef487` + `08dd894` + `7dd703f`，deploy run `37226881285`）。Node.js 归属终裁 = 维持 `L4-web`（§2 押后登记已关）。

## 0. 基建与仓库（2026-10-03）

- [x] 目录布局：`docs/`（现行规格）、`subject-matter/`（归档，不入库）、`.gitignore`（排除 7 张 jpg 与 `qa.md`、`prd.md`，另含 node_modules/dist）
- [x] GitHub 仓库 `JaronTam/philo-tech`：public（免费账号 Pages 前提）
- [x] 首提交 `0c44673` 推到 `main`，tracking 已设（`main...origin/main`）
- [x] remote 切 SSH：`git@github.com:JaronTam/philo-tech.git`，`ls-remote` 与 `push` 均验证通过
- [x] Pages source = "GitHub Actions"——2026-10-03 用户已设；首跑验证 = push `b52eed2` → run `37128586547` success → 站点 `https://jarontam.github.io/philo-tech/` HTTP 200（资源路径正确）

## 1. prd2 已定（实现直接引用）

- [x] 坐标系：Y = 年份向下递增；X = `laneBase[layer] + columnOffset[column]` + 避让（prd2 §3.2）
- [x] 节点同一性规则与禁用词（§3.1）
- [x] 数据模型 schema v5.1：`Node / Edge / ParadigmBand` 字段表（§3.3；v5 → v5.1 增补见 §2.5 F-B-1）
- [x] 6 类关系与成立边界：`enables / direct_fork / conceptual_inf / paradigm_shift / convergence / composition`（§3.4）
- [x] 视觉编码：线型 / 线宽 / 字号 / 字重（§3.5）
- [x] 主图 + 4 卷结构与年份区间（§4）
- [x] 布局方案：v1 不引入 ELK / dagre，column + 同列避让（§5）
- [x] 交互四项：上下游追溯 / 搜索 / 深链 / 收敛高亮（§6）
- [x] 技术栈：Vite + TS + React Flow + Tailwind，data.json 解耦（§7）
- [x] 部署：GitHub Actions（upload-pages-artifact + deploy-pages，Node 22）（§8）
- [x] 内容流程与 9 条校验规则（§9）
- [x] 里程碑 M0–M4 与验收标准（§10）
- [x] 版权口径：素材仅作格式参考（§12）

## 2. 待补充（动手前）

> 2026-10-03：`docs/ui-spec.md` / `docs/content-spec.md` 草案已出；同日三轮回填至 v0.4（web 审计 → 4 项落定 → 4 项多信源采集：①②③维持、④ 主图改分段刻度），blocking 修复批升至 v0.5（prd2 v3）。整体审计完成（15 项 findings 登记于 §2.5）——结论：不能直接进 M0，blocking 5 项修完即动工。§2.1 / §2.2 各项经审后勾：与 blocking 相关的条目待修复后终审（2026-10-03 二轮：15 项全部终审勾讫）。

### 2.1 UI / 渲染规范 —— M0 前

> 2026-10-03 终审：7 项全部由 `docs/ui-spec.md` 落值（逐项勾）；终审补 3 处残留空白——详情框触发方式、三态互斥与「选中」定义、citation 可点击，已写入 ui-spec §2/§4/§5（v0.6）。

- [x] 坐标数值表：lane 宽、column 宽、每卷 px/年、避让方向与间距（§5 "纵向或横向" 未定）——定：column 112px、lane 宽 = max(列数,3)×112+32、避让取纵向微调 ≤±20px（ui-spec §1）
- [x] 节点形态：纯文本块（名字 + 灰色小字，参考图语法）还是卡片——定：纯文本块，无边框无填充（ui-spec §2）
- [x] 色板：`accent` 色值、背景 / 正文 / 灰字 / 泳道带 / 网格线 CSS 变量表、中文字体栈——`accent = #C0392B`，9 个 token + 中西文双字体栈（ui-spec §3）
- [x] 边渲染：线形（正交折线）、箭头有无、`citation` 露出方式（边 hover tooltip）——正交折线、无箭头、tooltip 含 citation 且 URL 可点击（ui-spec §2）
- [x] 详情框：容器（侧栏 / popover）、触发方式、`sources` 链接渲染——右侧 360px 面板、触发 = 单击节点 / 深链、外链 `_blank`（ui-spec §4）
- [x] 交互状态优先级：搜索 / BFS / 收敛高亮的叠加与清除规则（M2 前）——三态互斥（后启动者胜）+「选中」统一定义（ui-spec §5）
- [x] 卷切换导航与初始视图（M3 前）——顶栏 6 项（主图 / 前史 / 卷 1–4）、初始 = 主图 fitView（ui-spec §6）

### 2.2 内容标准 —— M1 前

> 2026-10-03 终审：8 项全部由 `docs/content-spec.md` 落值（v0.6，label 方案前置已勾）；注册表 / 禁用词表的 data 文件仍随 M1 建（见 §2.4）。

- [x] `column` 注册表（§9 校验依赖；M1 试排的输入）——6 层 19 列 + 保留列 `theory`（content-spec §2/§4）
- [x] 年份取值规则：以"首个公开可用版本 / 规范发布年"为准，year 与 sources 对账——争议年主标 = 完成或首次公开演示年，差异入备注（content-spec §1）
- [x] label 语言方案（§11）：label 中文 + 术语英文，或 label/labelEn 双字段（动 schema 需一并定）——定：`label` 中文主标 + `label_en` 英文全称（schema v5.1，2026-10-03）
- [x] summary / concepts 规格：字数上限、concepts 条数（3–8）、术语写法——summary ≤60 字陈述句、concepts 3–8 条英文原形、people 2–4（content-spec §1）
- [x] sources / citation 格式：URL 优先？DOI / 书页？citation 是否可点击——sources ≥1 可点击 URL（官方 > 原始论文 DOI > 博物馆 / 百科）；citation = 一句话依据 + 来源，含 URL 可点击（content-spec §1/§3 + ui-spec §2）
- [x] 边预算：出入度上限、非源头节点 ≥1 入边、跨卷边数量与入口 / 出口标记——出边 ≤5、主图入边 ≤8（超限优先级截断 + `+N` 角标）、跨卷边相邻卷 3–5 条（content-spec §3）
- [x] master / weight 判据：主图 ~40 节点选取、epic / major / minor 标准——epic ≈15 条；master = epic 或跨 ≥2 泳道枢纽，40±5（content-spec §1）
- [x] 核验流程：写入后打开 sources 逐条确认并留痕（对症"写时未核验"）——写 → 逐条确认 → 记 `checked_at` → `npm run validate`；失效换源或补 `archive_url`（content-spec §5）

### 2.3 先决裁定 —— 写内容前

- [x] 起点年份 = **1854**（布尔）· 前史卷 1854–1946（独立刻度，收 12–15 个渊源节点）· 正卷 1947 起、4 卷不动 · 主图根节点 = 布尔 1854 + 香农 1937（图灵 1936 可选）
  - 调研（2026-10-03，2 个 web 模型交叉 + 抽查复核）：两方同向设前史卷（渊源节点限量、独立刻度）；巴贝奇 1837 随 1854 决定排除；§9 并集已改 [1854, 2027)（见 2.4；2026-10-03 执行）。
  - 已裁决分歧：晶体管首演 12-16（首次放大成功）vs 12-23（贝尔管理层演示、铭牌"发明日"）——年份 1947 不变；布尔 1854 出版社标准著录 = Walton and Maberly（London）。
  - 未采信：web 回答 2（香农年份"1837"错字、Macmillan 署疑误、结构表自相矛盾、未核验仍标 95%）。
- [x] 卷边界年份：1980 / 2000 / 2015 维持（2026-10-03 裁定）——三界对齐断层线（IBM PC 1981 / dot-com 破裂 2000 / TensorFlow、ResNet 2015 入卷 4 首）；改界将连带重算 173 年、55px/年、2360px 与 ui-spec 两表 + prd2 §9；AlexNet 2012 收在卷 3 尾段（可接受，主题词面未动）
- [x] 淘汰分支收不收（Multics / OS/2 类）——收「有活后代的祖先」、不收「死胡同」：Multics 1969 收（→ UNIX），OS/2 1987 不收；判据落 `docs/content-spec.md` §6（v0.6）
- [x] 前史节点定稿（2026-10-03 前史裁定）：13 条 = 理论 7（含新增 罗素《数学原理》1910–13）+ 机器 6；Z3 1941 出图（唯一孤岛）；`哥德尔 → 图灵` 不画（Copeland & Fan 2022）；多源头判据「源头 ≥1 出边」入 content-spec §3；清单入 §4（v0.7）

### 2.4 工程小项

- [x] data 组织：单 `data.json` 多人 PR 冲突 → 按卷拆分——定（2026-10-03）：`data/vol-0.json`（前史）+ `vol-1..4.json`，每卷含 `nodes` / `edges`，跨卷边归 target 卷；`data/meta.json` 放 bands / column 注册表 / 禁用词表；合并与校验构建期一次完成
- [x] id 规则：kebab-case + 年份、全局唯一、发布后不改（深链依赖）——落 content-spec §1（2026-10-03）
- [x] 禁用词表：显式清单文件，与 column 注册表同置（`data/meta.json`）——定稿 25 词（2026-10-03，content-spec §6 v0.8：初始 7 + 新增 18；子串匹配、拉丁大小写不敏感、机构不入表）
- [x] prd2 修订（v3）：§4 卷表加前史卷 1854–1946；§9 并集 → [1854, 2027)（随 A1 = 1854；含卷 4 半开修正）；§4 主图「全局压缩刻度」→ 分段压缩（5 段：3/12/25/35/55 px/年，段高合计 2360px）；§3.1 渊源节点例外（F-B-3）——2026-10-03 执行

### 2.5 整体审计（2026-10-03 完成）

结论：不能直接进 M0（规格本体可支撑绘制代码，但 M0 实测缺输入、卷 4 刻度矛盾、schema 落点卡 M1 类型）。blocking 5 项（2026-10-03 修复完成，改动文件见各行尾注）：

- [x] F-D-2：补 master 候选表（~40 条，最低 `layer` / `year` / `column` 三列）——ui-spec §1 自定 M0 实测输入，仓库内不存在；2026-10-03 修复：新建 `docs/master-candidates.md`（44 条，卷 3 段 / 卷 4 段各 10 条）；`docs/ui-spec.md` §1 补文件指向
- [x] F-D-3：定前史节点 `layer` / `column` 映射（或理论单列）——布尔 / 哥德尔 / 图灵 / 丘奇 / 香农 / McCulloch–Pitts 6 项理论节点无列可挂；2026-10-03 修复：`docs/content-spec.md` §4 定前史单列（理论节点 `column=theory`、`layer` 占位 `L0_hardware`，不参与六泳道布局；硬件节点照常挂泳道）
- [x] F-A-1：定卷 4 区间口径（推荐 `[2015, 2027)` 12 年，与 §9 并集联动）——现写闭区间 12 年 ≠ 表内 11 年；2026-10-03 修复：`docs/ui-spec.md` §1 卷表 / 分段表卷 4 → [2015, 2027)、12 年、55px；`docs/prd2.md` §9 并集 → [1854, 2027)（连带）；checklist 2.4 同步
- [x] F-B-1：schema 增补落点（`label_en` / `checked_at` / `archive_url`），升 v5.1 或撤销增补；2026-10-03 修复（选 a）：`docs/prd2.md` §3.3 增三字段升 v5.1，状态行 + §13 同步；`docs/content-spec.md` §1 同步；checklist 2.2「label 语言方案」定案
- [x] F-D-1：注册表加 `scripting` 列并定 JS 归属；2026-10-03 修复：`docs/content-spec.md` §2 增列 + 归属判据（语言规范 / 实现 → L2-scripting；宿主平台 / 交付物 → L4-web；Node.js 归 L4-web）；L2 示例（ui-spec §1、content-spec §2）改 6×112+32 = 704px〔M3 B0（2026-10-05）：L2 再增 `algol-family` / `dotnet-family` → 8 列 = 928px，content-spec §2 / ui-spec §1 / prd2 §3.2 同步〕

P1 非 blocking：

- [x] F-B-3：渊源节点例外（前史卷收论文 / 著作 / 理论模型）登记进 prd2 §3.1 例外条款，入 2.4 的 prd2 v3 清单；2026-10-03 修复：`docs/prd2.md` §3.1 增例外条款（限前史卷 1854–1946）；checklist 2.4 登记

二轮补充（2026-10-03 前史裁定批）：

- [x] F-D-4（P1）：master 子图孤岛——裁定 ①（2026-10-03）：`docs/master-candidates.md` 升 v0.2——+罗素《数学原理》1910–13（theory）、+EDVAC 报告 1945（`L0_hardware` / `arch`）；−图灵机 1936、−ENIAC 1945（仍在前史卷 13 条内）。复验（`npm run measure`）：master 44 条下**前史孤立 = 无**；全表孤立 34 条 = 正卷边集未写（M1/M3 复跑）。

M0 实测记录（2026-10-03，报告 = `npm run measure`）：

- 主图分段：前史段 3 → 6.3px/年（段高 279 → 586，理论单列 6 节点堆叠）· 卷 1/2/4 段 ✓ · 卷 3 段按 LOD 主标块高 ✓（放大读、灰字显形时 Docker ↔ K8s 缺 38px，随 M1 复看）；段高合计 2360 → 2667（容器 2750，prd2 v4）；前史段主标轮缺口 59.2px 由容器余量 83px 吸收，灰字预留轮缺口 195.2px 不吸收（M1 带真实 concepts 复跑；口径已落 ui-spec §1）
- 分卷：前史卷 H 2000 → 2160（按 13 条定稿试排，px/年 23.2；残余 = 1936–37 簇同源，需高 2170 − H 2160 ≈ 10px）· 卷 1–4 H 2000 ✓（基于 master 子集，M3 全量后复跑）
- M1 待办（随肉眼闸门）：理论列 1936–43 簇（丘奇 λ 演算 / 香农 / M–P）微调后缺口 ≤ 3px（master v0.2 去图灵机后收窄）；`McCulloch–Pitts 神经元模型` 标签 3 行致块底越段界——M1 写作时压到 ≤ 2 行 → **2026-10-04 落定：见下「M1 实测记录」**

M1 实测记录（2026-10-04 · 输入 = 真实数据 20 节点 / 16 边 · 报告 = `npm run measure`）：

- 主图前史段 6.3 → 6.8px/年（段高 632.4）：主标轮需高 663.6，越段 31.2px = `McCulloch–Pitts 模型` 块底（理论列下方空列，无碰撞）→ 由容器余量吸收（2800 − 2713.4 = 86.6px）；理论列 1936–43 簇缺口清零（0 违规）；卷 1 段 ✓（主标轮 308 / 396）；卷 2–4 段空（本批无数据）。容器 2750 → 2800。
- 前史卷 H 2160 维持 ✓（主标轮需高 2150.3，0 违规）；卷 1 H 2000 ✓（1474.5）；逐条 sources 核验（checked_at = 2026-10-04；DOI ×8 解析 302 全通，官方 / 博物馆页 200）。
- 带 concepts 轮结构性缺口（±20px 上限之外）：主图理论簇 3 处、卷 1 段 device 1 处、前史卷 4 处 → 落实「灰字降级」机制（两遍放置：缺口节点去 concepts 重排）；实排余违规 = 前史卷 Colossus ↔ Harvard Mark I 7.5px（行盒级，12px 字号 + 20px 行高下字形不碰，接受）。
- `validate`：20 / 16 全绿（新增校验：主图入边 ≤8、相邻卷跨卷边 ≤5 = 5 条 ✓）；`build` gzip 135.1KB（< 500 预算）；六视图（主图 / 前史 / 卷 1–4）dev 无 console error。
- 列对齐肉眼闸门（DOM 断言 + 截图复核）：theory 列 6 条同 x、device 列 4 条同 x、arch / lisp-family 各归列；同列边走右侧旁路、跨列边走横-竖-横；LOD 生效（fitView 0.29 隐藏灰字、0.79 显形、minor 0.5 以下隐藏）。

M1 第三方验收（2026-10-04 · 报告 = `docs/m1-acceptance.md`〔含 §8 修复记录〕 · 独立会话实测）：

- 结论 `[STATUS: AC]`：列对齐闸门 DOM 实测复现（主图 theory 6 @ x=569 / device 4 @ x=611；前史 theory 7、device 5 同 x）；六视图 0 error / 0 warning；三命令全绿（build gzip 135.21KB）；measure 数值与 checklist 逐项一致。
- B1（小，已修）：`manchester-baby-1948` summary 63 字符 > content-spec §1 上限 60；修法 = summary 压至 58 字符 + `validate.ts` 补长度校验（prd2 §9 表 +1 条；回归实测：63 字符 → 1 error，压回 → 全绿）；连带修 `measure` master 子图输出措辞（「N 条」→「N 节点 / M 边」，报告 §2 消歧义）。
- B2（登记，已排期）：节点单击无详情框——M1 范围外（ui-spec §4 已定 spec）；已排入 M2 里程碑行，避免落空。
- B3（登记）：relation 仅用 3/6 类（conceptual_inf 8 / enables 6 / direct_fork 2）——20 节点规模正常，其余三类预期出现在卷 3–4。

M0 第三方验收（2026-10-03 · 报告 = `docs/m0-acceptance.md`）：

- 结论：有条件通过（骨架无功能缺陷）；4 项必须修 + 6 项可延后已修毕（含 convergence 校验器挪出边循环 + 回归实测：假阳消 / 真阳保留），四命令复绿（build gzip 129.9KB）
- 事实面补核（4.1–4.3）：① 罗素 → 哥德尔（哥德尔 1931 论文标题即 Principia Mathematica，主源自证）· 罗素 → M–P（zbMATH 引文表含 Principia 1925）；② 图灵 1936 独立于哥德尔（Copeland & Fan 2022，10.1007/s00283-022-10177-y）——`哥德尔 → 图灵` 不画依据闭合；③ ABC → ENIAC（Honeywell v. Sperry Rand 1973-10-19 判决原文，国会记录 GPO-CRECB-1974-pt2）
- 仍延后：TechBlock weight 映射（随 M1 真实数据）；节点级 `checked_at` 留痕按 content-spec §5 随 M1 执行

M0 批交付物（复核用，基线 = `eef87dd`；已成批推送 = `f0950ab` + `b52eed2`）：

- 文档：`docs/prd2.md`（v4）· `docs/ui-spec.md`（v0.7）· `docs/content-spec.md`（v0.8）· `docs/master-candidates.md`（v0.2）· 本 checklist
- 代码：`src/lib/{types,volumes,layout,data}.ts` · `src/components/{GridLayer,TechBlock,Toolbar}.tsx` · `src/App.tsx` · `src/main.tsx` · `src/index.css` · `scripts/{validate,measure}.ts`
- 数据 / 工程：`data/{meta,vol-0..4,master-candidates}.json` · `.github/workflows/deploy.yml` · `package.json` / `tsconfig.json` / `vite.config.ts` / `index.html` / `.gitignore`

M1 批交付物（复核用，基线 = `b52eed2`；已成批提交 = `da20600` + `400e9d3` + `12ad43b` + `f3ae01e`，未推送）：

- 文档：`docs/prd2.md`（v5 · schema v5.2）· `docs/ui-spec.md`（v0.9）· `docs/content-spec.md`（v0.9）· `docs/master-candidates.md`（v0.3）· `docs/m1-acceptance.md`（含 §8 修复记录）· 本 checklist
- 代码：`src/components/TechEdge.tsx`（新增）· `src/App.tsx` · `src/components/{TechBlock,Toolbar}.tsx` · `src/lib/{types,volumes,layout,data}.ts` · `scripts/{validate,measure}.ts`
- 数据：`data/vol-0.json`（13 节点 / 8 边）· `data/vol-1.json`（7 节点 / 8 边）· `data/meta.json`（+`PRE_theory` 注册列）· `data/master-candidates.json`（theory 行改 `PRE_theory`）

M2 批交付物（复核用，基线 = `9eb2a71`；已成批提交 = `c6ef0ce`（feat）+ `6c9bb3b`（docs）+ `3dec5f7`（提交号）+ `98bfb92`（验收修复）+ `6a6d0fd`（验收报告 + 修复记录入档）+ `aa528e6`（提交号补全），已推 `9eb2a71..aa528e6`）：

- 文档：`docs/m2-acceptance.md`（验收报告 + §7 修复记录）· `docs/ui-spec.md`（v0.10：§8 控件布局 + §2/§4/§5/§7 落值）· `docs/prd2.md`（v6 · schema v5.3：`year_note`、§6 搜索域 +`label_en`、§9 +1 规则、§10 测量口径）· `docs/content-spec.md`（v0.10：§3 截断层级注）· 本 checklist
- 代码（新增）：`src/lib/{graph,url,labels,interaction,bench-fixture}.ts` · `src/components/{DetailPanel,SearchBox,EdgeTooltip,FlowBridge}.tsx` · `scripts/bench-bfs.ts`
- 代码（修改）：`src/App.tsx`（状态机 + RF 事件接线 + 深链 + 居中）· `src/components/{TechBlock,TechEdge,Toolbar}.tsx` · `src/lib/{data,types}.ts` · `src/index.css`（面板/抽屉/tooltip/flash）· `scripts/validate.ts`（+citation URL 规则）· `package.json`（`bench`）
- 数据：无改动（真实数据 20/16 不变）

P2（8 项，M1 中途修 —— 2026-10-04 M1 批处置完毕）：F-B-2（**已修**：prd2 §3.2 c-family 示例对齐注册表——C/C++；Java → jvm-family；C# 暂无槽位、收录前先改注册表）· F-B-4（2026-10-03 前史裁定已消：术语拆分——「图论源头」〔前史 6 条〕vs「主图前史入口」渲染标记；content-spec §3 改写）· F-B-5（**已修**：ui-spec §5 空态标注「防御性、正常数据不可达」）· F-B-6（**已修**：§6 深链 `vol=` 域定 `main|pre|v1..v4`〔缺省 main〕；§0 / §2 年份表述改 1854–2026；§11 已定项登记）· F-B-7（**已修**：validate.ts 落 2 条——主图入边 ≤8、相邻卷跨卷边 ≤5〔下限 3 建设期降 warn〕）· F-C-1（**已修**：两份 spec H1 随 M0 修复批升版）· F-E-1（**已修**：ui-spec §2 补 ParadigmBand 渲染一句）· F-E-2（**已修**：同 F-B-6 §6 域）· F-E-3（**已修**：ui-spec §8 控件布局落值——顶栏右侧槽 = 搜索框〔180px，下拉≤8 行〕+「收敛」toggle〔空态 disabled〕；M2 批）

押后登记（2026-10-03：终裁未决 / 递延项，一律不勾）：

- ~~F-D-3 编码终裁（`theory` + `L0_hardware` 占位 vs 哨兵枚举）~~——2026-10-04 裁定：**哨兵枚举** `PRE_theory`（schema v5.2；改判面 5 处已同步：content-spec §4 / prd2 §3.3 / master-candidates v0.3 六行 / types.ts + meta.json / validate.ts 去特判）
- ~~Node.js 归属终裁（现 `L4-web`）~~——2026-10-05 裁定：**维持 `L4-web`**（F-D-1 判据「宿主平台 / 交付物 → L4-web」，Node.js 为服务端运行时平台）；改判面 0 处，候选表 #30 维持
- ~~prd2 §0 / §2「1947–2026」表述 + §11 已定行（起点年份 / 双语标签 / 淘汰分支）同步~~——已随 F-B-6（M1 中途 P2）落：prd2 §0 `:7` / §2 `:39` 已 1854–2026、§11 已定行 `:319–322` + `:361` 在（2026-10-09 核对划除）
- 年份抽查（PyTorch 2016、WWW 1991、IC / TPU / ENIAC 备注项）——随 content-spec §5 核验流程 M1 兜底；PyTorch 若改 2017，重跑卷 4 段 TF↔PyTorch 间距判定。〔2026-10-04 部分：集成电路 1958（Kilby 1958-09-12 演示，TI 官方史）、ENIAC 1945（Penn 工程史页）已随 M1 核验；PyTorch / WWW / TPU 不在 M1 切片，留 M3 写作时核〕〔2026-10-09 全闭：PyTorch 改 2017（J10——2016 alpha 为 invite-only closed alpha，公开 2017-01-19）且 TF↔PyTorch 间距复检通过（卷 4 段主标轮 425/660）；TPU v1 随 V4 S1 复核（`year_note` = 2015 起内部部署 / 2016-05-18 公开）；WWW 1991 随 V2 批 45/45 核验〕
- ~~前史单列 x 槽位（ui-spec 未写）~~——2026-10-03 M0 已补：视图含理论节点时最左增设 144px 单列（ui-spec §1 v0.7 + `src/lib/layout.ts`）

已登记项（审计标「已登记」，非新发现，不入 findings）：~~注册表 / 禁用词表的 data 文件未建~~——已办（M1）：`data/meta.json` 建成，§2.4 两行已勾（2026-10-09 核对划除）

## 3. 文档勘误（qa.md，审计 #1–#5）

- [ ] #1 qa.md:82 —— R/N/E 改为按卷定义（2.jpg：R=实在论、N=唯名论；3.jpg：R=唯理论、E=经验论）
- [ ] #2 qa.md:92 —— "1.jpg" → "3.jpg"
- [ ] #3 qa.md:245 —— 洛克入度 ≈ 1 → ≈ 2（霍布斯实线、笛卡尔虚线）
- [ ] #4 qa.md:393/397/415/447/454 —— "20 行" → 12 行（prd 侧已随 prd2 处理）
- [ ] #5 qa.md:435 —— [cite: 9] 计数：7 次 → 8 次（表格里 6 → 7 处）

## 4. 里程碑（prd2 §10）

- [x] M0 骨架页：纵轴刻度 + 6 泳道带 + 时间网格——2026-10-03 完成：Vite 8 + TS 7 + React 19 + React Flow 12 + Tailwind 4 脚手架；主图 / 前史 / 卷 1–4 六视图（主图分段刻度）；master 候选表试排开关；`validate` / `measure` 脚本；`deploy.yml`（prd2 §8）已入库。验收：刻度与年份对得上、泳道分隔可辨（dev 实测截图核对）。残留 = ↑快照所列 3 项。
- [x] M1 20 个手写节点 + 边（关键闸门：语义列对齐肉眼可辨）——2026-10-04 完成：前史 13 定稿全写 + 卷 1 七条（闭合集：晶体管 / Baby / Mark 1 / 集成电路 / 感知机 / LISP / Intel 4004）落 `data/vol-0.json` / `vol-1.json`；16 条边（跨卷 5）；`validate` 全绿；列对齐 DOM 断言（theory 6 条同 x = 569、device 4 条同 x = 611）+ dev 截图复核（0.79–1.03 缩放）；六视图无 console error；build gzip 135.1KB
- [x] M2 交互四项 + 详情框——2026-10-05 完成：上下游追溯（双向 BFS 全链、非相关 α=0.1、全局边集）、搜索（label/label_en/concepts/people、前缀>子串>其余排序、≤8 行下拉、Enter 选中、无结果提示、跨卷自动切卷、命中闪烁+居中）、深链（`#vol=&node=` 解析/写回 replaceState、非 master 自动切卷、无效 id「节点不存在」、手改 URL 生效）、收敛高亮（convergence 边及两端、非参与 dim、与搜索/BFS 三态互斥）；详情框（360px 侧栏 / <1024px 45vh 抽屉、焦点管理 + Esc 归还、入边全列 + 出边 + citation 可点击 + 核验行 + `+N`）；边 tooltip（自定义浮层、点击固定、180ms 收起）；控件布局 F-E-3（顶栏右侧 = 搜索 + 收敛 toggle）。验收证据：`npm run bench` p95 0.21ms（250 节点合成图，p95 > 100ms 则退出码 1）；DOM 实测 20 项全过（居中 780/780 ±0、Esc 焦点归还、深链矩阵 5 例、tooltip 链接、抽屉 900px 补偿居中 ±0、六视图 0 error、history.length 不变、三态互斥 3 例）；view 纯函数断言 6 组。〔口径注（D-7）：`780`、`569/611` 系 ~1920 视口下 fitView 屏幕坐标，非布局常量；1440 视口对应 323/366〕
- [x] M3 主图 + 4 卷，150–250 节点（validate 全绿）——2026-10-05 开工：B0 代码准备批完成并上线（前史 chip / `D-8` 缩放 / `measure --draft` / bench 真实段 / L2 双列）；**B0 回顾性验收 `[STATUS: AC]`**（2026-10-09，`docs/m3-b0-acceptance.md`；D-16/D-17 → 修复 `bc5ad07`）；**V1 数据批完成**（45 节点 / 49 边，`dc2a12a` + D-9 计数修正，deploy run `37228481970`）；**V2 数据批完成**（45 节点 / 47 边，`f154e1c`，deploy run `37233431046`，J6：8086 升 master）；**V3 数据批完成**（45 节点 / 51 边，`9ca8ba3`，deploy run `37626983024`，J7/J8/J9：上限 32 / `Swift`=c-family / `ibm-pc→iphone`）；**V3 第三方验收 `[STATUS: AC]`**（`docs/m3-v3-acceptance.md`；D-11/D-12/D-13 → 修复 `0a7bbd3`）；**V4 准备批**（`87e6176`：J10 PyTorch 定年 2017 / J11 paradigm_shift 首用 3 条 / J12 列归属 A/B/C）+ **V4 数据批完成**（45 节点 / 48 边，`8d43623`，deploy run `37811798270`）——全站 193 节点 / 203 边；**V4 第三方验收 `[STATUS: AC]`**（`docs/m3-v4-acceptance.md`；D-14 → 修复 `f06dd6d`）；**B5 校准批完成**（`docs/m3-b5-scope.md`：J13 = B〔有向 trace 维持现状，D-4 关档〕/ J14 = A〔维持两分量〕；全量定稿数字 + G2 DOM + 五命令全绿）；**B6 验收 `[STATUS: AC]`（2026-10-09，`docs/m3-b6-acceptance.md`）**：validate 193 节点 / 203 边全绿（193 ∈ [150, 250]）+ 独立复算 FAIL COUNT 0 + dev DOM 32/32 + 线上 29/29 + 部署链 12/12 runs success；1 小缺陷 D-15（标题行版本号漂移）→ 修复 `6768278`（报告 §10 回填）；V2 无独立验收报告 = 流程缺口（报告 §8 备案，不阻塞；**已由 2026-10-09 V2 回顾批补验 `[STATUS: AC]`**——`docs/m3-v2-acceptance.md`；D-18/D-19 → 修复 `d663942`）→ **M3 关档**
- [x] M4 部署 GitHub Pages（深链可分享）——部署链 2026-10-03 已提前验证（run `37128586547`）；2026-10-05 M2 批上线后深链已线上可用（`#vol=&node=`）；2026-10-09 全量数据已上线（193 节点 / 203 边，V4 收口 run `37822996376`）；**2026-10-09 B6 批线上深链验收 `[STATUS: AC]`**（线上 200 + assets 200 且 sha256 与本地 build 逐字节一致；深链 6 抽 29/29：面板开 / 选中描边 / hash 精确 / `history.length` 不增 / LOD 正常 / 0 console error；缩放控件线上可用）→ **M4 关档**
- [ ] UI 优化批（2026-10-10 登记待裁）：范围件 `docs/ui-opt-scope.md`（审计基线 + 根因 + `7` 裁点 `J-A1` / `J-A2` / `J-A3` / `J-B` / `J-C` / `J-D1` / `J-D2`）；开工序 = ~~两个探针（§6.1）~~ **`P1` / `P2` 探针完成（2026-10-10，结果入范围件 §7）** → 三套几何讨论（§6，下次）→ 待裁定 → 落批 → 验收（`J-A3` 起新增 `measure`「边穿字」指标）

开工顺序：specs v0.5–v0.7（2026-10-03 已出并随四批升版，§2.1 / §2.2 全覆盖）→ 整体审计（2026-10-03 完成，见 §2.5）→ 修 blocking 5 项（2026-10-03 完成）→ 终审勾 §2.1 / §2.2（2026-10-03 二轮完成）→ §2.4 裁定 + 前史定稿（2026-10-03 二轮完成）→ 禁用词清单定稿（2026-10-03）→ M0（2026-10-03 完成：骨架 + 实测）→ M1（2026-10-04 完成：20 节点 + 边 + 列对齐闸门）→ M2（2026-10-05 完成：交互四项 + 详情框 + bench）→ M3（2026-10-09 完成：193 节点 / 203 边全量 + B5 校准 + B6 验收 `[STATUS: AC]`）→ M4（2026-10-09 完成：线上深链验收 `[STATUS: AC]`）→ B0 回顾性补验（2026-10-09 完成：`docs/m3-b0-acceptance.md` `[STATUS: AC]` + D-16/D-17 修复 `bc5ad07`）→ V2 回顾性补验（2026-10-09 完成：`docs/m3-v2-acceptance.md` `[STATUS: AC]` + D-18 记档 / D-19 修复 `d663942`；**验收覆盖 = 100%**）→ UI 优化批（2026-10-10 登记：范围件 `docs/ui-opt-scope.md`；`P1` / `P2` 探针完成〔结果入 §7，2026-10-10〕；`7` 裁点待定，下次 = 三套几何讨论）。
