# UI 优化批 1（几何批）第三方验收报告

- 日期：2026-10-10 · 基线提交：`80c324c`（HEAD = docs route.ts 注释措辞）；批 1 几何批 = `a6f31e5` + 补记 `f034fe4`（deploy run 记录）；批前基线 = `5b6e79e`（裁定文档批）；工作树验收前后干净 · 复核方式：独立会话实测（五命令复跑 + 独立复算脚本〔自写判交器 + 自写旧式点列 + worktree 基线 y 回归 + K7 正/负面〕+ dev 站 Playwright MCP DOM 断言（zoom 校准 0.7505）+ 线上冒烟 + 部署链 GitHub API 直查；全程未改仓库文件，唯一写入 = 本报告〔脚本/截图/临时目录均在 `.playwright-mcp/`，gitignored〕）
- 复验命令：`npm run typecheck` / `validate` / `measure` / `bench` / `build`（Node 24.18.0）；dev 站复用端口 5199 既有 vite 进程（主会话遗留，grep 确认服务树含 HEAD 新接线后只读复用，未另起实例）
- 环境偏差（非缺陷）：api.github.com 本轮免鉴权可用（未触 403）；Playwright MCP 本批可用

## 验收结论

`[STATUS: AC]`（audit 协议三值判定）

- **UI 优化批 1 交付物：通过**。`J-A1` 降级扩展 + 不动点、`J-A3` 统一几何路由、`J-A2` knockout、`K7` 校验、`measure`「边穿字」指标全部落地且验收数字独立复现；**0 新增缺陷**（D-20 起无条目，修复记录留空）；登记项 4 条（§7，均非批引入）

核查点（≤5）：

- 命令链全绿：validate 193/203 0 错 0 警（K7 两条硬错对现数据全过）；measure 合计 2713.4、pre 实排 2150.3（去灰字 7 / 余违规 0，批前 6/1）、[3] 边穿字段旧式 95 → 新 0（目标 ≤10）；bench 合成 p95 0.204ms / 真实 0.037ms；build gzip 177.05kB
- y 回归（worktree @ 批前基线 vs HEAD 同脚本两树）：唯一变动 = pre `colossus-1944` Δ−7.55px；violations 1 → 0；降级 6 → 7（新增 `ABC`）
- 边穿字独立复算：自写判交器 + 自写旧式点列 = 旧式 95（逐视图 40/6/17/22/6/4）、退化 25（9/0/7/2/6/1）、端点违例 0、斜段 0；新式自报 0 vs 独立判交 68 → 91 次舍入贴边命中 penY 全 ≤ 4.848e-3px（< 0.005px 半舍入单位），canvas 未舍入口径 = 0
- DOM（zoom 0.7505）：六视图计数全对；边穿字 0.025px 阈值口径 = 0；KO 底衬 238/238；端点对齐 ≤2px（22px 例外 = 2 节点 / 11 边，批前既有）；交互全过；0 console error
- 部署链 3 runs success（`a6f31e5` → `38055939650` / `f034fe4` → `38056025835` / `80c324c` → `38056169000`）；线上 assets 与 brief 预取一致；线上深链实测面板开

## 1. 命令复验

| 命令 | 结果 |
|---|---|
| `npm run typecheck` | tsc --noEmit 无错 |
| `npm run validate` | nodes 193 / edges 203 全绿 0 错 0 警；K7 新增硬错（`validate.ts:87` `[同列同年]` 条数 >2、`:94` 上方 label-only 块高 >20px）对现数据 0 命中（正面复算见 §2） |
| `npm run measure` | 合计 2713.4 ✓；pre 主标轮 2150.3/2160、实排 2150.3（去灰字 7、余违规 0——批前 6 灰字 / 1 违规）；[3] 边穿字段（`measure.ts:255`，口径 = 全量 block 无 LOD、目标 ≤10 不设 gate）：旧式 95 → 新 0，逐视图 40/6/17/22/6/4；退化 9/0/7/2/6/1 |
| `npm run bench` | 合成 p95 0.204ms / 真实 0.037ms（均 <100ms；与快照主张一致） |
| `npm run build` | vite 自报 gzip ≈177.05kB（JS 主包；批前基线 175.63kB，+1.4kB = route.ts + knockout 增量） |

## 2. 独立复算（先算后比，不预设本文数字）

- **y 回归**：`route-dump.mts` 同一脚本跑两树（批前 `5b6e79e` worktree vs HEAD）逐节点 y 快照——**唯一差异 = pre `colossus-1944` Δ−7.55px**（J-A1 残压消解白名单）；violations 1 → 0；degraded 6 → 7（新增 `ABC`）——与 checklist 快照逐项一致
- **边穿字**：`b1-crossing-check.mts`（自写 slab 判交器 + 自写旧式点列；真实 `routeEdge` 仅作输入）——legacy(mine) **95** 恰 = 旧式 95，逐视图 40/6/17/22/6/4 ✓；degenerate **25** = 9/0/7/2/6/1 ✓；端点违例 0；斜段 0；route(mine) 68 vs 自报 0 → 舍入探针（`b1-rounding-probe.mts`）解释：**91 次命中 max penY 4.848e-3px、>0.005px 计数 0** → 全部 = 2 位小数舍入贴边命中（未舍入点列在块边界上/外 ≤0.005px，舍入后进入块内）；**canvas 未舍入口径严格判交 = 0** ✓
- **确定性**：y dump 2 次 md5 `169678fc36c13b7649015aedc5ce13fc`；routes dump 2 次 md5 `580f2b52641edad093f3085fe79cc574`；measure 输出 2 次逐字节一致（与快照 md5 `256277e3` / `63efe2c7` 数值不可比——dump 结构不同，各自 2 次自比逐字节同）
- **K7 正面**：现数据同年对恰 2 组——`PRE_theory/theory@1936`（丘奇 λ 演算 / 图灵机，上方 h=20）、`L0_hardware/device@1944`（Colossus / Harvard Mark I，上方 h=20）——均恰 = AVOID_LIMIT 边界 ≤20 ✓
- **K7 负面**：temp 目录（复制 `data/ src/ scripts/ package.json`）造 3 节点同列同年 → validate **EXIT=1** 含 `[同列同年]` ✓

## 3. 站点 DOM 实测（dev 站 5199，zoom 校准 0.7505）

zoom 校准法：对 `.react-flow__pane` 派发 wheel，`deltaY = -100 * ln(0.7505/当前) / ln(1.148698354997035)`（各视图 fit 缩放 main 0.2925、其余 0.3782–0.4095 → 0.7505，恰 0.75 浮点可能不渲染故取 0.7505）。viewport transform 为 style `translate(px,px) scale(z)` 格式（非 matrix）。

| 组 | 断言 | 结果 |
|---|---|---|
| A1 | 六视图计数：main 45/38、pre 13/8、v1 45/41、v2 45/36、v3 45/20、v4 45/18 | ✓ |
| A2 | 0 console error / 0 warning（全流程） | ✓ |
| B1 | 边穿字：穿透阈值 0.025px 口径（主会话口径）六视图 0/0/0/0/0/0；严格 0.001px = 8 命中（v1×3 / v3×1 / v4×4）pen 全 ≤0.004px = 舍入贴边（§2 同机制） | ✓ 口径见 §7 |
| B2 | KO 底衬：238/238 块矩形不透明底衬 = 所处背景色（`--lane-a` / `--lane-b` 数值解析比对） | ✓ |
| B3 | 端点对齐：基线 ≤2px；例外 22px = `transformer-2017`（main 3 边 + v4 5 边）+ `berkeley-risc-1981`（v2 3 边）= **2 节点 / 3 视图出现 / 11 边**——`estimateBlockHeight` charW 估算 epic label 折 2 行（估 74px vs 渲染 52px）；另 2.001–2.004px × 13 边 = 估算 concepts 行 +4px vs 渲染 margin 2px——两者批前既有（y 回归证明 blockH 零变） | ✓ 登记项 |
| C1 | hover：本块渐变淡底 + 邻居 2（linux-1991 / c-language-1972）淡底；mouseout 清除 | ✓ |
| C2 | click 节点 → 面板开；Esc 关面板、选中保持（by design）；再 Esc 清 | ✓ |
| C3 | 缩放控件：放大 0.7505 → 0.9006（90%）、适配 → 0.2925（29%，主图 fit） | ✓ |
| C4 | 深链 `#vol=v2&node=macintosh-1984`：面板开 + 自动切卷；深链无 BFS dim；真实点击 → BFS 点亮 dim 30 节点 | ✓ |
| C5 | 截图 ×6 存 `.playwright-mcp/b1-shot-{main,pre,v1,v2,v3,v4}.png` | ✓ |

## 4. 线上冒烟

- https://jarontam.github.io/philo-tech/ ：index 200；assets `index-Bl_LlRHP.js` / `index-C9m32AgH.css` 与 brief 预取一致（内容哈希 = HEAD 部署产物）
- 深链 `#vol=v2&node=macintosh-1984` 线上实测：面板开（「Macintosh · Apple Macintosh ×1984 · … GUI 大众化的…」）、45 节点 / 36 边、hash 保持 ✓

## 5. 回归 grep

- `legacyPath`：定义 `route.ts:176` + 唯一使用 `TechEdge.tsx:30`（`d.route?.path ?? legacyPath(...)` fallback）——旧式仅作兜底 ✓
- `degenerate`：`route.ts:38`（类型）+ `:278`（逐边退化判定）✓
- `REPAIR_PASS_MAX = 8`（`layout.ts:241`，不动点迭代上限）✓
- `AVOID_LIMIT = 20`（`layout.ts:11`）+ K7 两条硬错（`validate.ts:87` / `:94`）✓
- knockout：`TechBlock.tsx:13/:77`（注释 + 底衬 div）+ `layout.ts:57`（背景取值函数，不硬编码）✓
- `measure` [3] 边穿字段：`measure.ts:255`（口径 + 目标 ≤10 不设 gate）✓
- 全 src 命中 22 处分布 5 文件，均在预期位置；无残留旧路由实现引用 ✓
- dev 服务器验真：服务树 grep `d.route?.path ?? legacyPath` 命中 → 复用 5199 端口的进程确实在服务 HEAD ✓

## 6. 部署链（GitHub Actions API 直查，gh 未登录走 api.github.com 免鉴权）

- `a6f31e5` → run `38055939650` success ✓；`f034fe4` → run `38056025835` success ✓；`80c324c` → run `38056169000` success ✓——三 run 号、head_sha、标题与 brief 预取逐项一致，独立复核成立（本轮未触 403 限速）

## 7. 缺陷清单与下一步

| # | 位置 | 缺陷 | 级别 |
|---|---|---|---|
| — | — | **无新增缺陷**（D-20 起无条目；修复记录留空） | — |

登记项（登记 ≠ 隐藏，维持登记）：

- **舍入阈值口径**：路径串 2 位小数舍入，严格判交（0.001px）下 canvas 复算 = 0、DOM = 8 命中（pen 全 ≤0.004px）；0.025px 阈值 = 0。阈值取值属口径选择（brief 已注），本报告验收口径 = 未舍入 canvas 严格判交 0 + DOM 0.025px 阈值 0
- **端点 22px**（§3 B3）：2 节点 / 11 边，`estimateBlockHeight` charW 折行估差（74 vs 52px）——批前既有，非批引入；修法建议 = 批 2–3 内修正折行模型或对齐渲染 margin（二选一，不属批 1 验收面，本会话按纪律只记不修）
- **orphan 边** `intel-8086-1978 → ibm-pc-1981`（vol-2 边、source 节点在 vol-1）：渲染层两端同视图过滤 → 永不可见；数据层既有（批 1 未动 `data/`）
- **一次未复现**：深链测试中 `#vol=v3` 短暂出现一次（后续未复现，观察项）

## 8. 文档一致性

- `checklist.md` 顶部快照：批 1 完成记录（`a6f31e5` + run `38055939650` + J-A1/J-A3/J-A2/K7/measure/specs 六件 + 五命令读数 + 确定性 md5 + DOM 结论）与 §1/§2 复验逐项一致 ✓；待办行「批 1 完成 · 待第三方验收」与开工序一致 ✓
- `docs/ui-opt-scope.md` §9 开工表：批 1 收口注（violations 1 → 0 / 边穿字 95 → 0 / 确定性逐字节同 / DOM 0 穿字 + 0 console error）与复验一致；§8 决策表 14 项全闭 ✓
- specs 版本行三处与快照一致：`ui-spec` v0.14（§2 knockout 例外 + 边路由配方）、`content-spec` v0.17（§3 K7 两条硬错）、`prd2` v7.1（§9 校验器 +2）✓
- 改动边界（git）：`a6f31e5` = 12 文件 469+/32−（src 5 + scripts 2 + docs 4 + checklist）；`f034fe4` 仅 checklist.md 1 行；`80c324c` 仅 route.ts 注释——批后无代码再动 ✓
- 本报告 = 唯一新增仓库文件 ✓

## 9. 下一步

- 批 2（血统 `J-B` + `J-C`：家系表 + `rough.js` 手绘，验收口径 = 家系表 6 源 / 8 树 / 0 歧义 + gzip +8,927B 内）→ 批 3（分层 `J-D1` + `J-D2`）→ 批 4（收口验收，惯例第三方）
- 端点 22px 登记项可在批 2–3 内顺带处理或维持登记（本会话按纪律只记不修）

## 10. 修复记录

（0 缺陷，无修复）
