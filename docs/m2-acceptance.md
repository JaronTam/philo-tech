# M2 批工作验收报告

- 日期：2026-10-05 · 基线提交：`3dec5f7`（M2 = `c6ef0ce` feat + `6c9bb3b` docs + `3dec5f7`，工作树干净，未推送）· 复核方式：独立会话实测（命令复跑 + dev 站 DOM 断言 47 项 + 数据/文档抽核；全程未改仓库文件、无提交，唯一写入 = 本报告）
- 复验命令：`npm run typecheck` / `validate` / `measure` / `bench` / `build`（Node 24.18 / npm 11.19）；dev 站 `npm run dev -- --port 5199 --strictPort`，Playwright DOM 断言
- 环境偏差（非缺陷）：Playwright MCP 扩展被环境锁定，改用 standalone playwright + 同一 chromium 二进制（chromium-1228）

## 验收结论

`[STATUS: AC]`（audit 协议三值判定）

- **M2 验收标准 AC**：prd2 §10 M2 行「上下游追溯在 250 节点下响应 < 100ms」——`npm run bench` p95 0.206ms（250 节点 / 383 边合成图，p95 > 100ms 退出码 1 的语义核对通过）；交互四项 + 详情框 DOM 实测全过（§3）。
- **交付物整体：通过**。无 blocking；1 项小缺陷 + 5 项登记（§5）。

核查点（≤5）：

- 交互四项可用 + 三态互斥（BFS/搜索选中/收敛高亮，后启动者胜；详情框不参与互斥）；「选中」= 2px accent 描边 + 开面板 + 平移居中（宽屏节点中心 = (W−360)/2 ±5px；抽屉模式竖向补偿 0.45×画布高）
- 详情框 360px / <1024px 45vh 抽屉；入边全列不受 ≤8 截断影响 + 出边 + citation 可点 + 核验行；Esc 关面板且焦点回节点、高亮保留；点空白清全部
- 搜索域含 label_en、Enter 选中、无结果「无匹配节点」、跨卷命中自动切卷；深链矩阵 7 例全过（#vol=v1&node 留卷 / 非 master 自动切卷 / 无效 id 提示留主图 / #vol=zzz 归一化 / 仅 #vol= 无面板 / 手改 URL 生效 / replaceState 不增 history.length）
- 边 tooltip：hover 出 source→target + relation 中文名 + citation 可点；平移/空白收起；点击固定【缺陷：pin 失效，D-3】
- bench p95 0.206ms < 100ms；build gzip 合计 146.29KB < 500KB；`dist/` 无 fixture 引用；validate 20/16 全绿；六视图 0 console error

## 1. 命令复验

| 命令 | 结果 |
|---|---|
| `npm run typecheck` | tsc --noEmit 无错 |
| `npm run validate` | nodes 20 / edges 16，全部通过（含 M2 新增「citation 含可点击 URL」规则） |
| `npm run measure` | 与 checklist「M1 实测记录」逐项一致：段高 632.4 / 主标轮需高 663.6 / 前史 2160 vs 需高 2150.3 / 卷 1 2000 vs 1474.5 / 余违规 1 处 7.5px / master 子图 12 节点 9 边 |
| `npm run bench` | 正确性断言 6 组全过（trace / cap / convergence / search）；250 节点 / 383 边：deriveLit p50 0.107ms / p95 0.206ms / max 1.847ms；searchNodes p95 0.124ms；脚本复用 `src/lib/graph.ts`（非复制实现）核对通过；退出码语义 = p95 超 100ms 时非零（checklist §4 声明，脚本核对一致） |
| `npm run build` | JS gzip 140.92KB + CSS 4.88KB + HTML 0.49KB = 146.29KB < 500KB 预算；`dist/` grep `syn-` = 0（无 fixture chunk） |

## 2. 数据 / 文档抽核

- `data/` 无改动（`git diff HEAD -- data/` 空）；`checked_at` 全 2026-10-04（M1 已验，M2 未触数据）
- prd2 v6 · schema v5.3（`year_note` 在 types.ts:26，validate 不报）· ui-spec v0.10 · content-spec v0.10 · checklist 2026-10-05 快照——版本与规则条数对齐
- checklist §4 M2 行数字主张逐项复算：250 节点 383 边 p95 0.21ms（实测 0.206ms ✓）；fixture 62 节点实排 ✓；convergence 42 条 ✓；hub 入边 11 ✓；主图边 27 = 29−(10−8) 截断 ✓
- M1 两处修复实测：边 `inactive` → pointer-events 修复后边可 hover 出 tooltip ✓（J2）；节点 wrapper `pointer-events:none` 下节点可点 + 空白点击仍清选中 ✓（J1）

## 3. 站点 DOM 实测（dev 站 5199，47 项断言全过）

### 3.1 交互四项与状态机

- 单击（卷 1 晶体管）：面板开 + 2px accent 描边 + BFS dim（lisp 0.1 / 布尔 1）✓
- 搜索选中替换 BFS（后启动者胜）；面板开关不参与互斥 ✓
- 收敛高亮（fixture）：42 条边参与者 lit、非参与者 dim（syn-000 0.1）✓；点节点后 BFS 替换收敛（toggle 复位 + 自身 0.1→1 反转）✓；真实数据收敛按钮 disabled + title ✓
- fixture 下 BFS 追溯 dim 不可达：deriveLit 沿全量 g（App.tsx:170），中间节点桥接血统致 62/62 master 全 lit → 缺陷 D-4（§5）

### 3.2 详情框

- 360px + role=complementary + 焦点入面板；宽屏居中 = (W−360)/2 ±5px（1440 视口实测通过；checklist「±0」系彼时 1920 视口口径，未复测该视口）
- 抽屉（<1024px 宽）：45vh（按 viewport）+ 节点中心竖向补偿 0.45×画布高 ✓
- 内容：label / 核验行 / 入边全列（fixture hub 11 条不受 ≤8 截断影响）/ 出边 / citation 链接可点 / 入边行点击跳转 ✓
- Esc：面板关 + 焦点回节点 + 高亮保留 ✓；点空白：清全部（dim 恢复 + 描边消失）✓

### 3.3 搜索与深链

- label_en 命中 + Enter 选中（开面板+描边）；跨卷命中显示卷名 + Enter 自动切卷；无结果「无匹配节点」；搜索框内 Esc 只关下拉（stopPropagation）✓
- 深链矩阵 7 例全过（见核查点）

### 3.4 边 tooltip

- hover：`source → target` + relation 中文名 + citation 链接可点 ✓；移开 180ms 收起 ✓；平移收起 ✓
- 点击固定：显「已固定」✓，但移开后 180ms 仍收起 → pin 失效，D-3（§5）

### 3.5 布局与 LOD 回归（M1 闸门）

- 主图 theory 6 条同 x、device 4 条同 x（布局 x = 30 / 174 = CANVAS_MARGIN 24 + inset 6 / + THEORY_COLUMN_WIDTH 144）；前史 theory 7 同 x、device 5 同 x；卷 1 7 节点；卷 2–4 空态 ✓
- M1 记录 569/611 口径：彼时 ~1920 宽视口 fitView 屏幕坐标（Δ42 = 144×zoom 0.2925，内部自洽）；本会话 1440 视口实测 323/366；布局常量未变 → 口径未注明，D-7（§5）
- LOD：zoom < 0.75 藏 concepts → 放大后出现；< 0.5 藏 minor 整节点 → 放大后出现；降级节点恒不显示 ✓
- 六视图 0 console error ✓

### 3.6 fixture 视图

- `?fixture=1` 仅 dev；62 节点实排（63 master 中 syn-248-2027 year 越界被布局丢弃 → D-6）；主图边 27（29−截断 2）；hub `+N` 角标 = 2；收敛 toggle 42 条 ✓
- 防御性路径（sources 空态、入边超限）经 fixture 覆盖判定通过——**真实数据不可达**（20 节点无超限入边），M3 全量数据后复测
- `dist/` 构建产物不含 fixture（§1）✓

## 4. 文档与 schema 同步

- prd2 v6 / ui-spec v0.10 / content-spec v0.10 / checklist 状态行一致 ✓
- schema v5.3：types.ts:26 `year_note?` 存在，validate 全绿 ✓
- types.ts:1 注释仍写「schema v5.1」→ D-5（§5）

## 5. 缺陷清单与下一步

| # | 位置 | 缺陷 | 级别 |
|---|---|---|---|
| D-3 | `src/App.tsx` hideTipSoon（328–343）/ `src/components/EdgeTooltip.tsx` | 边 tooltip 点击固定（pin）失效：pinTip 置 pinned=true，但移开 180ms 后 hideTipSoon 无条件 `setEdgeTip(null)`；EdgeTooltip 自身 onMouseLeave 同样无条件收起，无 pinned 防护。违反 ui-spec §2「点击固定；固定后移开不收起」 | 小 |
| D-4 | `src/App.tsx:170` `deriveLit(highlight, null, g)` | fixture 下 BFS 追溯全 lit（62/62 master dim=0）：deriveLit 沿全量 g，中间节点桥接血统。真实数据主图无 minor 桥接不受影响（B1/E1 dim 正常）；「全血统」语义可辩护，ui-spec/prd2 未规定视图内追溯 | 登记 |
| D-5 | `src/lib/types.ts:1` | 注释「schema v5.1」陈旧（实现 v5.3） | 登记 |
| D-6 | fixture 生成器 | year 越界（syn-248 得 2027 > 段上限 2026）→ 被布局丢弃，62 ≠ 63 master。生成器与布局 year 窗口不一致；dev 压测视图未受实质影响 | 登记 |
| D-7 | checklist §4 M2 行 / m1-acceptance §3.1 | 569/611、居中 780 系彼时 ~1920 视口 fitView 屏幕坐标（非布局常量），口径未注明；数字内部自洽可复现 | 登记 |
| D-8 | 无桌面缩放入口 | 主图 fitView zoom < 0.75 时 concepts 正向 UI 不可达（无缩放控件；ctrl+wheel = pinch 缩放可用但不可发现）。CDP 实测 zoom 机制工作 | 登记 |

D-3 修复建议：hideTipSoon 增 `tip.pinned` 短路（或 EdgeTooltip onMouseLeave 判 pinned），固定态清除留给点空白/平移路径。D-5/D-6 建议随修复会话顺手处理；D-4 在 minor 节点入主图前无实害，M3 数据扩展时复查。

## 6. 下一步（M3）

- D-3 pin 修复（唯一违反 ui-spec 明文的实测缺陷）→ 修复会话；D-5/D-6 同批
- M3 全量 150–250 节点：bench 真实数据复跑（bench 口径已注明「M3 真实数据复跑」）；入边超限防御路径转真实复测
- 主图前史入口标记（ui-spec §6，独立 chip）已登记 M3

## 7. 修复记录（2026-10-05，修复会话）

| # | 位置 | 修复 |
|---|---|---|
| D-3 | `src/App.tsx`（`hideTipSoon` / `showTip`） | 固定态短路：180ms 收起回调改 `setEdgeTip((t) => (t?.pinned ? t : null))`；`showTip` 对「重新 hover 已固定同一条边」保持固定态与锚点位置。清除路径不变（点空白 / 平移 / 切卷 / 节点选中）。回归实测 6 项：hover 出 tooltip → 点击显「已固定」→ 移开 600ms 仍在 → 重 hover 仍固定 → 点空白清除 → 平移清除；未固定 hover 仍 180ms 收起（两路径互不回归） |
| D-5 | `src/lib/types.ts:1` | 注释 schema v5.1 → v5.3 |
| D-6 | `src/lib/bench-fixture.ts` | year 生成加 `Math.min(2026, …)` 钳制；复验 = 250 节点 year ∈ [1854, 2026]、`>2026` 计数 0、master 63 全可布局（原 62：`syn-248` 越界被布局丢弃） |
| D-7 | `checklist.md` §4 M2 行 | 口径注：`569/611`、`780` 系 ~1920 视口下 fitView 屏幕坐标（非布局常量；1440 视口实测 323/366）；`m1-acceptance.md` 作为历史记录不改，口径澄清以 checklist 注 + 本记录为准 |
| D-4 / D-8 | — | 不改，维持登记（D-4：minor 节点入主图前无实害，M3 数据扩展时复查；D-8：缩放控件随 M3 交互批评估） |

复验：`typecheck` / `validate`（20/16 全绿）/ `measure` / `bench`（p95 0.206ms < 100ms）/ `build`（gzip 140.95KB）全过；提交 = `98bfb92`（fix）+ 本记录随文档批。
