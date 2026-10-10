# UI 优化批 2（血统批 + 手绘批）第三方验收报告

- 日期：2026-10-11 · 基线提交：HEAD = `c30c018`（docs 补记）；批 2 血统批 + 手绘批 = `c98e386`（deploy run 38063905583）；批前基线 = `4350867`（批 1 验收报告入档）· 工作树验收前后干净 · 复核方式：独立会话实测（五命令复跑 + 独立复算脚本〔自写 8 树多源 BFS / 三规则实验 / 例外表审计 / CIEDE2000 色板 / rough dump / 深引交叉 build〕+ dev 站 Playwright MCP DOM 断言（zoom 校准 0.7505）+ `validate` 正负两径〔含 17 例外逐一删除扫描〕+ 线上冒烟 + 部署链 GitHub API 直查；全程未改仓库文件，唯一写入 = 本报告〔脚本 / 输出 / 截图 / worktree 均在 `.playwright-mcp/`（gitignored）或系统 temp〕）
- 复验命令：`npm run typecheck` / `validate` / `measure` / `bench` / `build`（Node 24.18.0）；gzip 口径 = GNU gzip -6（主会话读数 = .NET GZipStream，绝对值有压缩器差异，增量口径可比）
- 环境偏差（非缺陷）：api.github.com 本轮免鉴权可用（未触 403）

## 验收结论

`[STATUS: AC]`（audit 协议三值判定）

- **UI 优化批 2 交付物：通过**。`J-B` 家系表 + 归属派生 + 血统色、`J-C` rough 手绘全部落地且验收数字独立复现；**0 新增缺陷**（D-20 起无新条目，§10 修复记录留空）；偏差项 / 口径注记 F1–F6（§7，均非缺陷）；登记项 5 条（§7）

核查点（≤5）：

- 命令链全绿：validate 193/203 全绿 + 家系行 `8 条 · 归属 193/193（例外 17，其中 master 3）· master 45 与 8 树分区基线偏离 0`；measure 2713.4 / 边穿字 95→0；build gzip 177,142 B（基线 175,040 B，增量 **+2,102 B ≤ +8,927 B**）
- 独立复算 8 树硬口径 **45/45 · 并列 0**（分区 boole=5 russell=6 edvac=2 unix=10 tcp=6 intel=3 cuda=11 docker=2，声明根与复算根一致）；三规则实验 163/0/30、177/16/0、消解 9/16（残余 6 = IBM 链）；终表对拍 193/193 不一致 0；Intel 4004 master 冻结保布尔线
- 例外表 **17/17 语义成立**（命名 3 + 链内聚齐 8 + 残余 6）；「链内聚齐 8」判定属 §8 J-B「首批入」授权裁量范围
- 色板独立 CIEDE2000（Sharma 校验 2.0425/2.8615 精确）：对比度 4.81:1 / 两两 ΔE00 18.42 / accent 17.26 + 21.01° / ink-soft 20.99 全达标；dim 复合 8-bit 实测 1.901/1.909（F3，非阻塞）
- rough 确定性：dump 2 跑 md5 同（`ab45e5fa52ddec540143dc7c782f4a58` · 77,399 B）；135 条 rough 边 id；端点违例 0；六视图 35/3 · 7/1 · 36/5 · 35/1 · 20/0 · 18/0；部署链 2 runs success + 线上资产逐字节一致

## 1. 命令复验

| 命令 | 结果 |
|---|---|
| `npm run typecheck` | tsc --noEmit 无错 |
| `npm run validate` | nodes 193 / edges 203 全绿 0 错 0 警；家系行 = `家系：8 条 · 归属 193/193（例外 17 条，其中 master 3）· master 45 与 8 树分区基线偏离 0` |
| `npm run measure` | 合计 2713.4 ✓；[3] 边穿字段：旧式 95 → 新 0 ✓；连通性 185 + 8 两分量、master 子图 45 节点 / 38 边、前史孤立无 —— 与批 1 同 |
| `npm run bench` | 合成 p95 0.212ms / 真实 deriveLit p95 0.031ms（3860 次，p50 0.010 / max 0.967）、searchNodes p95 0.063ms —— 均 <100ms（prompt 读数 0.20 / 0.036，F4 注） |
| `npm run build` | dist `index-CnHfoC3Z.js` 571,777 B；GNU gzip -6 = **177,142 B**（批前基线 wt-b2base @`4350867` 同法 = 175,040 B）→ **增量 +2,102 B = +2.05kB ≤ 预算 +8,927 B** ✓（主会话 .NET 口径 177.05 → 179.10kB，增量同向一致） |

## 2. 独立复算（先算后比，不预设本文数字）

- **master 8 树硬口径**（自写 master 子图有向多源 BFS）：45 master / 38 master-master 边 → **8 根、全归属 45/45、并列 0、未覆盖 0**；声明根 vs 复算根一致 true；分区 boole=5 russell=6 edvac=2 unix=10 tcp=6 intel=3 cuda=11 docker=2 —— 与 prompt 预期逐项一致
- **三规则实验**（自写实现，与 `src/lib/lineage.ts` 对拍）：
  - 前向「最近树根」：明确 **163 / 并列 0 / 不可达 30** ✓；「不可达应全部为树根上游祖先」→ **否**：30 中仅 11 为祖先（ABC / ENIAC / 图灵机 / Berkeley RISC / Hollerith / IBM 701 / IBM 704 / System/360 / MIPS R2000 / NVIDIA G80 / PlayStation），**19 非祖先**（acorn-archimedes / algol-60 / arm / basic / cobol / colossus / fortran / harvard-mark-1 / nvidia-a100 / nvidia-h100 / oculus-rift / os-360 / pascal / raspberry-pi / risc-v / simula-67 / solaris / sparc / univac-1）—— F1；弃用理由独立判定**成立**：ARPANET 前向归属被主干拉进布尔线（实测输出确认）、Multics 同（可达且落布尔），网络 / 分时节点归布尔线 = 语义反例
  - 无向「最近树根」（采用规则）：明确 **177 / 并列 16 / 无归属 0** ✓；并列 16 = Apple Lisa / Apple Newton / 反向传播 / CTSS / Harvard Mark I / Hollerith / IBM 701 / IBM 704 / IBM 7090 / IBM System/360 / iMac / 集成电路 / Mac OS 8 / Macintosh / OS/360 / Xerox Alto
  - 主进边判据：落地流水线（master 冻结优先）**消解 9/16 = 56.3%**，残余 6 = IBM 链（hollerith-tabulator-1890 / harvard-mark-1-1944 / ibm-701-1952 / ibm-704-1954 / ibm-system-360-1964 / os-360-1966）；**无冻结变体 10/16 = 62.5%**（第 10 个 = 集成电路，master，两口径均落布尔）—— F2：prompt 的 62.5% = 变体读数，落地管线为 9/16，**残余 6 相同、终表归属不变**
  - 终表对拍：自算派生 + 例外表 vs 真实 `buildLineageIndex` → **193/193、不一致 0、未消解 0**；例外 17 条全部改判；master 45 无例外基线 vs 8 树分区偏离 = **0** ✓
- **Intel 4004 口径**：无向距 8086 根 2 步 < 布尔根 4 步（会落 8086 线）；master=true、不在例外表 → 实现按规则 1 冻结保**布尔线** ✓（分歧存在、实现行为与口径一致）
- **例外表 17 条审计**（逐条语义判定，全部**成立**）：命名 3（mcculloch-pitts-1943 / python-1991 → CUDA：NN 学派源头 + AI 栈载体叙事；mapreduce-2004 → TCP/IP：数据栈同色）；链内聚齐 8（perceptron-1958 / adaline-1960 / backpropagation-1974 / neocognitron-1980 / scikit-learn-2010 → CUDA、spark-2010 / ray-2017 / delta-lake-2019 → TCP/IP —— 各节点派生本 unambiguous 归 russell/unix，例外防族内断裂）；残余 6 → 布尔线（无例外即并列未消解，链连续性经 IBM 7090 / CTSS 派生已归布尔）——质证点「链内聚齐 8 超命名 3」：判定**属 §8 J-B「首批入」授权裁量**（备案 1 防族内断裂即为此设），不构成超授权
- **色板抽检**（自实现 sRGB 线性化 → Lab + WCAG + CIEDE2000，Sharma 用例 2.0425 / 2.8615 精确自检）：对 `--lane-a #f4f4f0` 最小对比度 **4.81:1**（CUDA × lane-a）✓；8 色两两最小 ΔE00 **18.42**（Intel8086 × CUDA）✓；dim 0.1 复合（0.1·C + 0.9·bg 逐通道）最小 ΔE00 = 2.24(bg) / 2.18(lane-a)，**8-bit 量化（浏览器实渲染）后 = 1.901 / 1.909 < 2.0**（F3）；accent 最小 ΔE00 **17.26** + 色相距 **21.01°**（布尔）✓；ink-soft 最小 **20.99**（TCP/IP）✓ —— 阈值口径 4.5:1 / 15 / 2 / 15 且 20° / 20 独立判定：dim 阈值 2.0 为抽检口径，唯一未达对（TCP/IP × Intel8086，同色系青蓝相邻）依赖路径结构区分，**非阻塞**
- **rough 确定性**：自写 dump（六视图全部边 rough 路径串，归一 + 去重）复跑 2 次 md5 逐字节同 = `ab45e5fa52ddec540143dc7c782f4a58` · 77,399 B（主会话快照 md5 `6c894736…` 为不同 dump 口径，各自 2 次自比逐字节同——与批 1 md5 口径处理一致）；rough 边去重 **135** 条 ✓；六视图 rough/精确 = 35/3 · 7/1 · 36/5 · 35/1 · 20/0 · 18/0；**端点保持违例（>0.05px）= 0**
- **深引路线交叉验证**：入口 `'roughjs'` build = 185,386 B（增量 +10,346 B **> 8,927 超预算**，主会话「入口不可 tree-shake」主张方向成立）；深引 `roughjs/bin/renderer` + 自序列化 ops = 177,142 B（+2,102 B 达标）；同折线固定 seed 下 `renderer.linearPath(points, false, opts)` 与 `generator.path(d, opts)` ops/d 串**逐字节同**（两者共用同一 renderer 原语）✓

## 3. 站点 DOM 实测（dev 站 5199，zoom 校准 0.7505）

| 组 | 断言 | 结果 |
|---|---|---|
| A1 | 六视图计数：main 45/38、pre 13/8、v1 45/41、v2 45/36、v3 45/20、v4 45/18（v3 DOM 节点 34 = LOD：zoom 0.4095 < 0.5 minor 隐藏，口径正常） | ✓ |
| A2 | 0 console error / 0 warning（全流程） | ✓ |
| B1 | rough 二分：main 38 = 35 rough + 3 精确 = 3 条命名例外跨家系边（russell→M-P / c→python / java→mapreduce）；pre 7+1（同 russell→M-P）；v1 36+5（ibm-704→fortran / ctss→arpanet / ctss→multics / lisp→ml / intel-4004→8080）；v2 35+1（macintosh→next）；v3/v4 全 rough —— 与「手绘 = lineageEdge ∨ 追溯 lit 收敛边」口径一致 | ✓ |
| B2 | 跨家系边：`--ink-soft` rgb(107,107,107) + 精确路径渲染（不手绘、不用家系色） | ✓ |
| B3 | 颜色映射：8 token 逐一声明；`unix-1971` 标签 = `--lineage-4 #057238`（dev + 线上双测） | ✓ |
| B4 | 命中层：strokeWidth 14 transparent、**精确路径**（手绘抖动不扩命中区） | ✓ |
| B5 | 五交互态：hover #00000008 + 邻居 #00000004；selected 2px --accent；BFS / 搜索 / 收敛 dim 0.1（互斥）；dim 挂 inner `<g opacity>`（rough）vs `<path opacity>`（precise） | ✓ |
| B6 | 交互态 d 串不变：同一边 dim / lit / 追溯开关前后 rough d 串逐字节同（不重抖） | ✓ |
| B7 | LOD：minor 节点 zoom < 0.5 隐藏、concepts < 0.75 隐藏 | ✓ |

## 4. `validate` 家系三查正 / 负两径

- **正面**：现数据全绿（信息行见 §1）✓
- **负面**（temp 目录复制 `data/ src/ scripts/ package.json`，node_modules junction，逐例还原 meta.json）：
  - **① 删一条例外**：prompt 例 `mcculloch-pitts-1943` → **EXIT=0「全部通过」≠ prompt 期望「并列未消解」**——M-P 为 master 颜色型例外（删除后 master 冻结派生 russell，无并列产生，且 treeDivergence 检查例外无关）→ F1/F6。**17 例逐一删除扫描**：6/17 EXIT=1「并列未消解」= 恰为 IBM 链 6 例外（harvard-mark-1 / hollerith / ibm-701 / ibm-704 / ibm-system-360 / os-360）；11/17 EXIT=0 静默通过（3 master 颜色型 + 8 链内聚齐型）→ F6
  - **② `color` → `--lineage-9`**：EXIT=1，1 error `edvac-report-1945：--lineage-9 未在 src/index.css 声明` ✓
  - **③ `lineages[2].id` → 非树根 master `intel-4004-1971`**：EXIT=1，9 errors 含期望串 `master 未被任何家系树覆盖：edvac-report-1945 / manchester-baby-1948` + 8 条 edvac 树孤儿「无归属」✓
  - **边界（例外指向不存在家系 `boole-x`）**：EXIT=1 `adaline-1960 → boole-x：家系不存在` ✓

## 5. 回归 grep（反向检查，逐项对照 prompt §5）

| 检查项 | 结果 |
|---|---|
| `git diff 4350867 HEAD -- data/vol-*.json src/lib/layout.ts src/lib/route.ts` | **空** ✓（未动布局 / 路由 / 卷数据） |
| `git diff 4350867 HEAD -- data/meta.json` | 仅尾部新增 `lineages`（8）+ `lineageExceptions`（17）两键；`preEntryNodes` 内容逐字未变（仅尾逗号因新增键而改）→「既有键零改动」成立 ✓ |
| `git diff 4350867 HEAD -- package.json` | 仅 `dependencies` +1 行 `"roughjs": "^4.6.6"`；`package-lock.json` pin 实效 `4.6.6` ✓ |
| `grep -n "paradigm_shift" src/components/TechEdge.tsx` | 无 `--accent`（色随家系），线宽 2 保留 ✓ |
| `grep -rn "var(--accent)" src/components/` | 仅 TechBlock.tsx :72（选中描边）/ :120（闪烁）/ :142 / :143（+N / 前史 chip）4 处，无边描边用途 ✓ |
| `grep -c "lineage" src/index.css` | 8（= `--lineage-1..8` 声明行）≥ 8 ✓ |
| 三处版本行 | ui-spec 状态行 v0.15（标题行无版本号，D-15 类回归不犯）✓；content-spec v0.17 / prd2 v7.1 未动 ✓ |
| `docs/ui-opt-scope.md` | 状态行 + §9 末注含批 2「已完成 / 待第三方验收」✓ |
| `checklist.md` 快照 | 首条含批 2 段 + `c98e386` + run `38063905583` ✓ |
| `grep -rn "7,748\|8927\|8,927" docs/` | 预算数字出现于 ui-opt-scope.md §1/§8/§9（历史裁定文本，合法）✓ |

## 6. 线上冒烟与部署链

- `https://jarontam.github.io/philo-tech/` HTTP 200；assets = `index-CnHfoC3Z.js`（571,777 B，**与本地 build 逐字节同**）/ `index-BHVkBGWX.css` ✓
- 深链 `#vol=main&node=unix-1971`：血统色 + rough 渲染 ✓；受控复测 2 次干净、0 console error ✓
- 部署链 GitHub API：run `38063905583`（head `c98e386`）**success** / run `38064096410`（head `c30c018` docs 补记）**success** ✓
- 登记项：一次未复现 `#vol=v1` 深链面板异常（受控复测 2 次不复现，单次观测，非缺陷）

## 7. 缺陷清单（D-20 续）

**0 新增缺陷**。偏差项 / 口径注记（F 系列，均非缺陷）：

- **F1（偏差项）**：(a) prompt §4「不可达 30 应全部为树根上游祖先」不准——实测 19/30 非祖先（清单见 §2，含 IBM 链 6 例外节点）；(b) prompt §7 ① 以 `mcculloch-pitts-1943` 为例期望「并列未消解」，实测 EXIT=0——该例为 master 颜色型例外，删除不产生并列
- **F2（口径注记）**：prompt 的消解率 62.5% = 无 master 冻结变体读数（10/16，第 10 个 = 集成电路）；落地流水线（规则 1 冻结优先）= 9/16 = 56.3%；残余 6 与终表归属两口径一致，无行为差异
- **F3（偏差项）**：dim 0.1 复合最小 ΔE00——正确 Lab 空间计算 = 2.24 / 2.18（≠ prompt 2.22，2.22 为 Lab 空间直接混色的不可复现读数）；浏览器实渲染 8-bit 量化 = **1.901 / 1.909 < 2.0** 抽检阈值；最差对为同色系青蓝（TCP/IP × Intel8086），非阻塞
- **F4（口径注记）**：bench 真实 deriveLit p95 本跑 0.031ms vs prompt 0.036ms vs 前跑 0.041ms（合成 0.200–0.212ms）——运行间噪声，全部远低于 100ms 预算
- **F5（口径注记）**：主图 convergence 高亮 = 3 亮节点（c-language-1972 / lisp-1958 / mapreduce-2004）**0 亮边**——全站 5 条 convergence 边（algol-60→c / lisp→ml / ms-dos→win95 / mapreduce→hadoop / dynamo→cassandra）全部含 minor 端点，master→master 收敛边 = 0，主图（master 子图）不渲染其边；非缺陷，属主图口径的既有渲染语义
- **F6（偏差项）**：`validate` 例外删除扫描 11/17 不可见（EXIT=0）——校验器口径 = 表完整性 + 归属覆盖 + 8 树一致（`validate.ts` 家系段注释），例外语义不在其范围；可检出 6 例恰为并列型（IBM 链）。例外语义正确性由本验收 §2 审计承担（17/17 成立）。可选加强：为 8 链内聚齐型例外加「派生源唯一性」静态断言（批 3 议题）

继承：**D-20** 命中层遮挡 7 边（批 1 既有，本批未涉及）。

登记项（非缺陷）：① 一次未复现 `#vol=v1` 深链异常（§6）；② prompt §9.4 rough 净贡献 ≈0.91kB 分解（178.19kB 中间态）为主会话读数，本验收独立复现总增量 +2,102 B 与入口差 8,244 B，未独立复现该分解；③ CTSS→boole 口径注记：CTSS 经 IBM 7090 拓扑归布尔线，精神继承者 UNIX 为独立树根——拓扑强制结果，非缺陷；④ gzip 基线绝对值：GNU gzip 175,040 B vs 主会话 .NET 177.05kB，压缩器差异，增量口径一致；⑤ prompt §9.3 深引内部 API：`roughjs/bin/renderer` 非文档 API 面，但 `.d.ts` 随包发布可类型校验，依赖 `^4.6.6` 由 package-lock pin `4.6.6` 实效锁定，风险受控

## 8. 文档一致性

ui-spec.md 状态行 v0.15（标题行无版本号）✓；content-spec.md v0.17 / prd2.md v7.1 未动 ✓；ui-opt-scope.md 状态行「批 2 已落地（待第三方验收）」+ §9 末注含批 2 读数 ✓；checklist.md 首条快照含批 2 段 + c98e386 + run 38063905583 ✓；预算 8,927 出现在 scope §1/§8/§9 历史裁定文本 ✓。

## 9. 下一步（批 3 分层）

批 3 = 分层（scope.md 规划）。建议附带项（本批登记，不阻塞）：F5 主图收敛高亮过滤（无亮边的亮节点 dim-only 或跳过）、D-20 命中层遮挡 7 边、F6 校验器例外语义静态断言（可选）。

## 10. 修复记录

（留空 —— 0 新增缺陷，无修复批需求。）
