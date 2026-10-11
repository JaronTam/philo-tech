# UI 优化批 4「收口验收」第三方验收报告（2026-10-11）

> 验收对象 = UI 优化批 `3`（分层批）+ 批 `3.5`（微批）+ 总收口；基线 HEAD = `ba9b667`（批 `3.5` 残余裁定入档）。
> 口径真源 = `docs/ui-opt-scope.md` §9（批 `4` 行）+ `docs/ui-opt-b35-scope.md` §0/§2/§4 + ui-spec v0.17。
> 只读纪律：未改仓库任何文件（唯一写入 = 本报告）；验收脚本 / worktree 均在 `.playwright-mcp/`（gitignored）。

## 0. 结论

**[STATUS: AC]（无条件通过）** —— 核查点（≤5）：

1. 五命令全绿且与待验读数逐项一致：`validate` 193/203 + `例外台账 17 = tie 6 + override 11`；`measure` 复跑 `2` 次逐字节同（md5 `b4f23fe168aa09e28b6ca43303a72ada`），合计 2713.4/[3] 0 块/[4] 主图 3·pre 1·v1 5·v2 1·v3 0·v4 0；`bench` 合成 p95 0.209ms / 真实 0.034ms；`build` gzip 180.44kB（头部 `index-CKfnBdma.js`）。
2. 独立复算四项全对：批 `3` 跨层边 3/1/5/1/0/0（去重 9）+ 实现对拍不一致 0；台账 17 = tie 6 + override 11 + 冗余 0；几何对拍六视图 × 20,000 随机点 + 全路径逐点共 ~140k 采样点与自写 hypot 实现不一致 **0**；完全遮挡严格口径（零自赢点）= 主图/pre/v1/v2/v3 **0**、v4 **1**（`transformer→stable-diffusion`，4px 与 1px 两种步长同结论）。
3. dev DOM（zoom `0.7505`）六视图计数 45/38 · 13/8 · 45/41 · 45/36 · 45/20 · 45/18 与待验一致；F5 收敛矩阵 0/0 · 0/0 · 2/4 · 1/2 · 2/4 · 0/0 逐项一致；D-20 hover ≥6 条独立验证全对（含 `russell→godel` 反例转正）+ tsd 探针归 `GPT-3 → Llama`；交互回归 `9/9` + 平移不弹不误 pin；层态矩阵与 `measure [4]` 逐项一致 + 标记不可点；六视图 `0` console error / `0` warning。
4. `J-E3` 负径 `4/4` EXIT=1（删 tie 1 / 删 override 2 / 冗余注入 1，temp 副本）+ 还原 EXIT=0；线上 HTTP 200、assets sha256 与本地 build 逐字节同、六视图 + hover + 深链 + 收敛按钮全对、`0` console error；部署链 `6/6` run success 且 head sha 与批件一一对应。
5. §9 裁定复核成立：`Stable Diffusion` 详情框「入边」含 `Transformer · 概念影响 · 2017`（+ citation）且行可点击；tsd 全程精确重合三配对独立确认（段级共线包含 + 零自赢采样点两种方法互证）。

**新增缺陷：`0`（`D-20` 未占用，编号续至 `D-20` 待用）。** 登记项 +`1`（`J-E2` 扇出走廊口径注记，§7.3）；既有登记项 `10` 条逐条复扫「未扩展 / 未恶化」。

## 1. 命令复验（先跑再比）

| 命令 | 实测（2026-10-11，HEAD `ba9b667`） | 待验 | 判定 |
|---|---|---|---|
| `typecheck` | 无错（EXIT 0） | 无错 | ✓ |
| `validate` | `nodes 193 / edges 203` 全绿 0 错 0 警；信息行尾 `例外台账 17 = tie 6 + override 11` | 同 | ✓ |
| `measure` | 复跑 `2` 次 md5 `b4f23fe168aa09e28b6ca43303a72ada`（逐字节同）；合计主标轮 2435.6 / 带 concepts 2726.6 / 现有 2713.4；[3] 旧式 95 → 新路由 0 块；[4] main 3 · pre 1 · v1 5 · v2 1 · v3 0 · v4 0（实例 10 / 去重 9）；主图行原文一致 | md5 `b4f23fe1…` 同 | ✓ |
| `bench` | 断言 6 组全过；合成 p95 0.209ms（p50 0.110 / max 1.98）；真实 p95 0.034ms | 0.21 / 0.03（±0.03） | ✓ |
| `build` | `index-CKfnBdma.js` 575.70kB / gzip 180.44kB；`index-BHVkBGWX.css` gzip 5.37kB | 575.70 / 180.44 | ✓ |

基线对照（worktree 独立 `npm ci` + `npm run build`，`.playwright-mcp/wt-b4-b3base` @ `250badc` / `wt-b4-b35base` @ `4cb1a6b`）：

| 状态 | raw | Vite gzip | GNU gzip -9（本验收） |
|---|---|---|---|
| 批 `2` 尾（b2 报告 / 待验） | 571,777B（批 `2` 头 sha `index-CnHfoC3Z` 与本地 worktree 构建**同哈希**） | 179.10kB | 176.68kB |
| 批 `3` 尾（`4cb1a6b`） | 574,582B | 180.01kB | 177.57kB |
| 批 `3.5` 尾（`ba9b667`，最终态复测） | 575,701B | 180.44kB | 178.03kB |

增量口径：raw +2,805B（批 `3`）+1,119B（批 `3.5`）；Vite gzip 步进 +0.91 / +0.43kB = 待验口径一致。**注记**：GNU gzip 绝对值与 Vite/.NET 口径恒定差 ~2.4kB（批 `2` 报告登记项④同源，非新增偏差）；批 `2` 基线**重建哈希 `index-CnHfoC3Z` 与 b2 验收记录逐字同**，证明构建确定性跨会话复现。

## 2. 独立复算（自写实现，与主会话脚本无复用）

脚本：`.playwright-mcp/b4-recompute.mts`（A/B 节）、`b4-verdict.mts`、`b4-occ-final.mts`、`b4-probe.mts`、`b4-decisive.mts`。

### 2.1 批 `3` 跨层边（独立派生，不复用 `buildPlaneMarkers`）

自写派生（每跨层边 → 本层端点 1 标记；`(dir, edgeId)` 归组）六视图 = 主图 `3` · pre `1` · v1 `5` · v2 `1` · v3 `0` · v4 `0`（实例 `10` / 去重 `9`）；按平面入/出分解与 `measure [4]` **逐字同**（主图：罗素线 入0/出1 · UNIX 线 入0/出2 · TCP/IP 线 入1/出0 · CUDA 线 入2/出0）；实现 `buildPlaneMarkers` vs 独立派生 48 组合不一致 **0**。

### 2.2 `J-E3` 例外台账独立重建

`buildLineageIndex(nodes, edges, {…meta, lineageExceptions:{}})` 派生基线 → 逐条分类：tie `6` / override `11` / 冗余 `0` / 总数 `17`——**与待验一致**。tie 明细 = `harvard-mark-1-1944` / `hollerith-tabulator-1890` / `ibm-701-1952` / `ibm-704-1954` / `ibm-system-360-1964` / `os-360-1966`（6 条全部派生未定 ✓）；override 明细 = `adaline-1960` / `backpropagation-1974` / `delta-lake-2019` / `mapreduce-2004` / `mcculloch-pitts-1943` / `neocognitron-1980` / `perceptron-1958` / `python-1991` / `ray-2017` / `scikit-learn-2010` / `spark-2010`（11 条，含待验所列 NN 链 + Python/scikit-learn + MapReduce/Spark/Ray/Delta Lake，另 `adaline-1960` 亦为 CUDA 线覆盖——NN 链 `5` 条 + `python`/`scikit-learn` `2` 条 = CUDA 线 `7` 条，`mapreduce`/`spark`/`ray`/`delta-lake` `4` 条 = TCP/IP 线；待验原文「NN 链 + python + scikit-learn → cuda（8 条）」的 `8` 未独立复现，按本复算为 `7 + 4 = 11`——**明细归类口径注记，非缺陷**，总数 17 与三类计数为硬口径）。`baseIdx.unresolved`（空例外下未归属）= `6`，恰为 tie 型集合——「tie 型 = 基线无归属」分类自洽。

### 2.3 `J-E2` 几何对拍（自写 hypot + 显式端点早退实现）

六视图各 20,000 随机种子点（域 = 渲染节点包围盒外扩 30，mulberry32 seed `20261011`）+ 全路径每 2px 逐点对拍：v4 另做 1,984 采样点全对角线对拍——**合计 ~140k 点不一致 `0`**。合成用例：同线双 id 两序均归字典序小者 ✓；阈值边界 `d=10 → null`（严格 `<`）✓ / `d≈9.999 → a` ✓；（自写合成脚本首版漏传第二边坐标一度误报 `b 更近`，修正后 ✓——本报告只记已复现读数）。渲染边数（自建管线 = `placeWithDegradation` + `buildRouteScaffold` + `routeEdge` + 主图 `capInbound(…,8)`）= `38 / 8 / 41 / 36 / 20 / 18`，与待验一致。

### 2.4 完全遮挡复算（严格口径 = 零自赢点）

沿各边可见路径 `route.points` 采样（step = 4/zoom 与 1/zoom 两档，zoom 0.7505），判「`nearestEdge` = 本边」：

| 视图 | 严格口径（零自赢 = 全程被覆盖） | 待验 | 判定 |
|---|---|---|---|
| 主图 / pre / v1 / v2 / v3 | `0` / `0` / `0` / `0` / `0` | 0 | ✓ |
| v4 | `1` = `transformer-2017->stable-diffusion-2022`（自赢 `0/168`，1px 步长同结论） | 1（tsd） | ✓ |

两档步长同结论 → 排除「采样漏段」。tsd 精确重合独立确认（段级共线 + 区间包含判定）：seg1 被 `alphafold-2` 覆盖（与其共享 `(2480,407.33)→(2536,407.33)`）· seg2（`x=2536` 竖段 y∈[407.33,1166.67]）被 `gpt-3→llama` 竖段 [887.33,1333.33] 与 `alphafold-2` 竖段 [407.33,1000] 相继覆盖 · seg3 被 `openai-api→langchain` 末段（y=1166.67）覆盖——**全程被覆盖成立**，非采样漏段。

### 2.5 复算工具链自身缺陷披露（不影响结论）

首版复算脚本 `b4-recompute.mts` 的 D 节（完全遮挡）出现**同文件内自相矛盾**：内联统计报 bert 自赢 `11/43`，紧邻循环却把 bert 判入「全程让位」集合，且集合成员在不同运行间漂移（出现 bert 在列 / 不在列两种输出）。已定位于该脚本自身的状态缺陷（三个独立脚本 `b4-verdict` / `b4-occ-strict` / `b4-occ-final` 与该脚本 A/B/C 节的全部结论互相一致，唯 D 节输出不可复现）。**本报告 D 节结论一律以三脚本互证读数为准**；该缺陷属验收工具自身，不涉及产品代码（产品侧 `nearestEdge` 经 2.3 节 ~140k 点对拍 0 不一致）。披露备查，防止后续会话误引 `b4-recompute` D 节旧输出。

## 3. dev DOM 断言（zoom `0.7505`，六视图，Playwright MCP）

环境：遗留 5199 vite 复用（验真命中 `nearestEdge` + `onCanvasPointerMove` ×2）；每视图断言前重载 / 切视图，读数实时解析 `.react-flow__viewport` 变换。zoom 用真实鼠标 wheel 设定（合成 `WheelEvent` 不被 RF 采纳——本验收环境注记）。

### 3.1 六视图计数矩阵

main `45` 节点 / `38` 边 · pre `13/8` · v1 `45/41` · v2 `45/36` · v3 `45/20` · v4 `45/18`——**逐项 = 待验** ✓。

### 3.2 F5 收敛矩阵（批 `3.5` 核心）

| 视图 | 亮边 / 亮节点（实测） | 待验 | 按钮 |
|---|---|---|---|
| 主图 / 前史 / v4 | `0/0`、`0/0`、`0/0` | 同 | disabled + title「本视图无 convergence 边（收敛边出现在卷 1–3）」✓ |
| v1 | `2/4` = `algol-60→c-language` + `lisp→ml`（暗 39 边 / 41 节点，dim = `0.1`） | 2/4 | 文案「收敛 2」 |
| v2 | `1/2` = `ms-dos→windows-95` | 1/2 | 「收敛 1」 |
| v3 | `2/4` = `mapreduce→hadoop` + `dynamo→cassandra` | 2/4 | 「收敛 2」 |

逐项一致；节点 dim 断言口径 = 节点子树内 inline `opacity: 0.1` 存在性（RF 虚拟化下须先平移到目标节点，踩坑记录见 §3.5）。

### 3.3 D-20 hover 抽查（自选点 ≥6，独立选点法：边 SVG 路径 `getScreenCTM` 屏幕采样）

| 边 | hover 结果 | 判定 |
|---|---|---|
| 主图 `cuda-2007→alexnet-2012` | `CUDA → AlexNet · 使能` | ✓ |
| 主图 `russell→godel`（反例转正） | `罗素《数学原理》 → 哥德尔不完备定理 · 概念影响` | ✓（旧命中层口径下为 `russell→relational-model`） |
| pre `ABC→ENIAC` | `ABC → ENIAC · 概念影响` | ✓ |
| v1 `ibm-704→7090` | `IBM 704 → IBM 7090 · 直接分支` | ✓ |
| v2 `ms-dos→win3.0` | `MS-DOS → Windows 3.0 · 使能` | ✓ |
| v3 `mapreduce→hadoop` | `MapReduce → Hadoop · 收敛` | ✓ |
| tsd 残余探针（v4 `(2536,1100)`） | `GPT-3 → Llama · 概念影响` | ✓（= §2.4 复算，裁定 A 登记面） |

v4 扇出区实测附记（供 §7.3）：`transformer` 5 出边共享前缀段上 hover 归 `transformer→alphafold-2`（字典序小者）；`transformer→bert/gpt-2/gpt-3` 的自赢采样点分别 `11/43`、`11/74`、`11/105`（尾段可命中），`transformer→stable-diffusion` 自赢 `0/168`。

### 3.4 交互回归（`9` 项全过）

hover 显示 ✓ · 未固定离开 180ms 收起（实测 `60ms 在` / `360ms 无`）✓ · 点击固定（含「已固定」）✓ · 固定态移开保留 ✓ · hover 他边替换固定态 ✓ · 点空白清 ✓ · 指针在节点块内不弹边 tip ✓ · 平移中不弹且松开不误 pin ✓ · 未固定移入 tooltip 保活（`cancelHideTip`）✓。六视图 `0` console error / `0` warning（含 `window.error` / `unhandledrejection` 挂钩）。

### 3.5 批 `3` 层态矩阵（回归）

- 选择器选项 = 「全部层」+ 当前视图内家系（声明序）：主图 `8` 项 / pre `4` / v1 `7` / v2 `6` / v3 `6` / v4 `5`——与 lineages 声明序一致 ✓。
- 选层 → 仅渲染该家系节点（主图布尔线 `5` / 罗素线 `5` / UNIX 线 `8` / CUDA 线 `13` 节点）；**坐标零重排**（同节点切换前后 `translate` 逐字同）✓。
- 标记矩阵（`[data-plane-marker]` × 全平面）与 `measure [4]` **逐项一致**：主图 罗素线 出 `1`（title「出口 · CUDA 线：罗素《数学原理》 → McCulloch–Pitts 模型（概念影响）」）· UNIX 线 出 `2` · TCP/IP 线 入 `1` · CUDA 线 入 `2`；pre 1；v1 5（布尔线 出 `4` / 罗素线 出 `1` / UNIX 线 入 `3` / TCP/IP 线 入 `1` / Intel 8086 线 入 `1`）；v2 1；v3 / v4 `0`。
- **标记不可点**：标记中心 `elementFromPoint` = 宿主节点内 svg → 点击选中宿主节点（面板「节点详情：C 语言」），标记不拦截指针 ✓。
- 环境注记：切换层后画布视口保持原 zoom/pan（不自动 fit）——线上、dev 行为一致；卷外家系节点在 v4 上不进入渲染视口（RF 虚拟化，非批 `3`/`3.5` 引入，见 §7.2 注记）。

## 4. `validate` 正 / 负两径（`J-E3`，temp 副本法）

正面：现数据全绿（§1）。负面（`data/ src/ scripts/` 复制至 temp，`npx tsx <temp>/scripts/validate.ts`，逐例改 `temp/data/meta.json` 后还原）：

| 例 | EXIT | 报错（关键词） |
|---|---|---|
| 删 tie 型 `harvard-mark-1-1944` | `1` | 「例外 16 条 ≠ 17」+「tie 型 5 条 ≠ 6」 |
| 删 override 型 `python-1991` | `1` | 「例外 16 条 ≠ 17」+「override 型 10 条 ≠ 11」 |
| 删 override 型 `spark-2010` | `1` | 同上 |
| 冗余注入 `python-1991 → unix-1971` | `1` | 「override 型 10 条 ≠ 11」+「`python-1991 → unix-1971`：冗余（派生基线已归 unix-1971，例外可删）」 |

还原后复跑 EXIT=0。**`4/4` 与待验逐字一致。**

## 5. 回归 grep 清单

| 检查项 | 实测 | 判定 |
|---|---|---|
| `git diff 250badc HEAD -- data/` | 空 | ✓ |
| `git diff 250badc HEAD -- src/lib/layout.ts` | 空 | ✓ |
| `git diff 4cb1a6b HEAD -- src/lib/route.ts` | 仅 `Route.points`（接口注释 + `points: best.points` 返回）；路由判据零改动 | ✓ |
| `git diff 4cb1a6b HEAD -- src/components/TechEdge.tsx` | 仅删透明命中层（`stroke="transparent" stroke-width={14}` 已不存在）+ 注释同步；rough / 精确两分支逻辑不变 | ✓ |
| `grep -n "onPaneClick\|onEdgeClick\|onEdgeMouseEnter\|onEdgeMouseLeave" src/App.tsx` | 3 行命中但**全为注释文案**（`490` / `520` 行「沿 RF onEdgeMouseLeave 语义」「原 RF onPaneClick 语义」）；无实际 RF 边事件绑定 | ✓（附录口径） |
| `grep -n "data-node-id" src/App.tsx` | 命中 `closest('[data-node-id]')` 节点贴边抑制（`493` 行） | ✓ |
| `git diff 4cb1a6b HEAD -- scripts/validate.ts` | 仅例外台账段（计数 + 分类 + 冗余逐条）；既有三查不动 | ✓ |
| 三处版本行 | `ui-spec` 状态行 v0.17（标题行不带版本号 = D-15 类回归无）；`content-spec` / `prd2` 本批（`250badc..HEAD`）零 diff | ✓ |
| `docs/ui-opt-scope.md` | 状态行含批 `3` 落地 + 批 `3.5` 完成 + 批 `4` 未动；§9 批 `3`/`3.5` 完成段（残余裁定 A + 批件链 + runs）齐备 | ✓ |
| `docs/ui-opt-b35-scope.md` | 状态行含「已完成 + 残余裁定 A」+ §4 完成读数 | ✓ |
| `checklist.md` 快照 | 首条 = 批 `3.5` 段（`e4a7a67` / `512d410` / `fd73b04` + runs + tsd 裁定 A） | ✓ |

## 6. 线上冒烟与部署链

- `https://jarontam.github.io/philo-tech/` HTTP **200**；asset 引用 `index-CKfnBdma.js` / `index-BHVkBGWX.css`；线上 JS sha256 `ce3961598b3aaa3a9d0999b8610b92558a69de6720be3e02e0f27289386c690e` 与本地 `dist` **逐字节同**（待验 sha256 一致）。
- 线上 DOM：六视图计数与 dev 一致（45/38 · 13/8 · 45/41 · 45/36 · 45/20 · 45/18）；v1 收敛按钮「收敛 2」；主图 hover `TensorFlow → TPU v1 · 使能`；深链 `#vol=v4&node=transformer-2017`（面板开 + 节点居中出现 180px 偏移 = 面板让位公式生效）与 `#vol=pre&node=atanasoff-berry-computer-1942`（面板「节点详情：ABC」+ 出边列 ENIAC 行）/ `#vol=v4&node=stable-diffusion-2022`（入边 `2`）均正常；`0` console error。
- 部署链（`api.github.com` 免鉴权逐条核，`6/6`）：

| run | head sha | conclusion |
|---|---|---|
| `38141060842` | `86ec141` | success |
| `38141277055` | `5cfb097` | success |
| `38144890561` | `e4a7a67` | success |
| `38144986233` | `512d410` | success |
| `38145060595` | `fd73b04` | success |
| `38145240815` | `ba9b667` | success |

## 7. 裁定复核（tsd · A 接受登记 · 批 `4` 复核项）

### 7.1 替代入口可达性实测（成立）

线上 + dev 双环境：v4 选 `Stable Diffusion` → 详情框**「入边（2）」列含 `Transformer · 概念影响 · 2017`** + citation「SD 的 U-Net 与文本塔（CLIP）均内嵌 Transformer/注意力块」+ 来源链接，行可点击（`button` 语义，点击追溯源节点）；数据与 tooltip 同源（同一 `edge.data`）。残余归属 = §2.4 复算（全程精确重合、零距离平局按 id 序让位）成立。

### 7.2 登记成立判定

登记成立 → **复核通过**。支撑：① tsd 在几何口径下自赢 `0/168`（严格口径唯一残余，两种采样步长同结论）；② 全程精确重合段级确认（§2.4）；③ 替代入口可达（§7.1）；④ 残余数 `1` 的前提经三脚本互证（§2.5 披露的工具链缺陷不影响）。**不建议启动 C 案（走廊分道）**——路由全量重算 + 批 `1` 确定性基线重验成本高，且当前残余有可用替代入口，主会话两次否决有理。

### 7.3 新增登记项（`J-E2` 扇出走廊口径注记，非缺陷）

「完全遮挡」指标为**零自赢点**严格口径（`0/0/…/1` 成立）；但 v4 `transformer` 扇出区存在**部分覆盖**边：`bert` / `gpt-2` / `gpt-3` 自赢率仅 `25.6%` / `14.9%` / `10.5%`（前缀段共享、尾段可区分；对照：主图 `unix-1971→c-language` 等大量边 100% 自赢），hover 体验上这些边在前缀走廊内「事实上难命中」。该现象 = 共享走廊几何的性质（与登记残余同源），**未达「完全遮挡」阈值故不入 D-20 类缺陷**；登记为口径注记供后续会话参考（若要彻底消解须 C 案走廊分道，成本见 §7.2）。

## 8. 缺陷清单（`D-20` 续）

**本批新增 `0` 条**（`D-20` 未被占用，编号维持续至 `D-20` 待用）。验收过程中主会话无既有缺陷回归；1 处验收工具自身缺陷见 §2.5（非产品代码）。

## 9. 文档一致性

`ui-spec` v0.17 状态行 ✓（标题行无版本号）；`ui-opt-scope.md` §9 批 `3` / `3.5` 完成段 + 状态行 ✓；`ui-opt-b35-scope.md` 状态行（已完成 + 残余裁定 A）✓；`checklist.md` 快照首条 ✓；`content-spec` / `prd2` 批内零 diff ✓。`ui-opt-scope.md` 状态行「批 `4` 收口验收未动」→ 本报告入档后应更新为「批 `4` 已验收 `[STATUS: AC]`（报告 `docs/ui-opt-b4-acceptance.md`）」——属**验收后的收口动作**，由主会话执行（本会话只读纪律不代改）。

## 10. 下一步（UI 优化批关档判定）

- **关档条件成立**：批 `1`–`3.5` 全部落地并有独立 AC 报告（b1 / b2 / 本报告含批 `3` + `3.5`）；批 `4` 收口验收 `[STATUS: AC]` 无条件通过；登记项 `10` 条 + 新增 `1` 条均「未扩展 / 未恶化」且非缺陷；线上与本地逐字节同、部署链全绿。
- **建议**：① 本报告入档（`docs/ui-opt-b4-acceptance.md`）+ `ui-opt-scope.md` 状态行收口（§9 提示）；② UI 优化批宣布关档，移动端维持不做（已裁）；③ §7.3 注记连同既有登记项挂账，不启动修复批（无 D-xx）。

## 修复记录

（留空——验收未新增缺陷；修复由原会话另开修复批。）
