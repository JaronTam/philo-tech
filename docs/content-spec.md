# Content Spec（草案 v0.13）

状态：2026-10-07 · v0.14（M3 V3 批：§3 跨卷边上限 12 → 32 / master→master 5 → 7〔J7 裁定〕）· v0.13（M3 V2 批：§3 跨卷边总量 8 → 12〔J5 裁定〕）· v0.12（M3 V1 批：§3 跨卷边上限修订 ≤8 总量 / ≤5 master→master〔J1 裁定〕）· v0.11（M3 批：§2 增补两列 `algol-family` / `dotnet-family`〔L2 6 → 8 列，704 → 928px〕）· v0.10（M2 批：§3 注 ≤8 截断在主图渲染层执行）· v0.9（M1 批：§4 前史理论节点编码改 `PRE_theory` 哨兵层〔F-D-3 终裁〕；M1 数据落文 = 前史 13 + 卷 1 七条）· v0.8（§6 禁用词表定稿 25 词 + 匹配规则）· v0.7（前史裁定批：13 条定稿〔−Z3、+罗素《数学原理》1910–13〕；多源头判据入 §3；`哥德尔 → 图灵` 不画）· 与 prd2 冲突时以 prd2 为准 · A1 已定：起点 1854、前史卷 1854–1946

## 1. 节点字段写作规范

字段全集 = prd2 §3.3（schema v5.1：`id` / `label` / `label_en` / `layer` / `column` / `year` / `weight` / `master` / `summary` / `concepts` / `people` / `sources` / `checked_at` / `archive_url`）；本节为写作规范。

| 字段 | 规范 |
|---|---|
| `id` | kebab-case + 年份（`transformer-2017`）；全站唯一；发布后不改（深链依赖） |
| `label` / `label_en` | label 中文主标、术语保留英文原形（LLVM、Transformer、x86）；`label_en` 英文名 / 全称，详情框显示 |
| `layer` | 枚举 `L0_hardware` … `L5_ai`（prd2 §3.3） |
| `column` | 必须命中 §2 注册表（`PRE_theory` 层含保留列 `theory`，§4） |
| `year` | 首个公开可用 / 规范发布年；争议年主标 = 完成或首次公开演示年，发表年入详情框备注（香农 1937 / 1938 记 1937） |
| `summary` | ≤60 字（含标点），陈述句；不评价、不预测；由 `validate` 强制（字符数计数） |
| `concepts` | 3–8 个，英文原形（Self-Attention、POSIX） |
| `people` | 机构或人物 2–4 个 |
| `sources` | ≥1 条可点击 URL；另记 `checked_at`（核验日期，必填）与 `archive_url`（存档链接，可选）；优先级：官方文档 / 规范 > 原始论文（DOI）> 博物馆 / 百科 |
| `weight` | epic = 泳道开创或转折（≈15 条）；major = 主线；minor = 衍生 |
| `master` | 判据 = `weight=epic`，或跨 ≥2 泳道的枢纽；主图 40±5 条 |

## 2. column 注册表

| layer | 初始 column |
|---|---|
| L0_hardware | `device`、`arch`、`accelerator` |
| L1_system | `os`、`net` |
| L2_language | `c-family`、`lisp-family`、`ml-family`、`jvm-family`、`toolchain`、`scripting`、`algol-family`、`dotnet-family` |
| L3_data | `relational`、`nosql`、`distributed` |
| L4_delivery | `web`、`container`、`cloud-api` |
| L5_ai | `nn`、`framework` |
| PRE_theory | `theory`（前史渊源单列；哨兵层，非泳道，限 year < 1947） |

- 注册表 **M1 前冻结 v1**；新增列 = minor 升级并先改此表。
- 新增列（2026-10-05，M3 批）：`algol-family` = 命令式语言奠基线（FORTRAN、ALGOL 60、COBOL、PL/I、BASIC、Pascal、Simula 等）；`dotnet-family` = .NET 平台族（C#、F# 等，与 `jvm-family` 同构）。两列**追加于数组末尾**（既有列 x 位置不变；L3–L5 泳道随 L2 增宽整体右移 112px）。
- 泳道宽由列数决定（L2 = 8 列 → 928px，见 ui-spec §1）。
- 已定（2 份 web 交叉复核维持）：CUDA 归 `L2-toolchain`（nvcc / PTX / runtime，语义同质；GPU→CUDA 跨层边保留）；HTTP 归 `L1-net`（IETF 协议，与 TCP/IP、DNS 同列）。
- 脚本语言归属判据（2026-10-03 定）：语言规范 / 语言实现（JavaScript、V8、Python、Ruby、PHP、Go）→ `L2-scripting`；宿主平台 / 交付物（浏览器、Web API）→ `L4-web`。Node.js 为服务端运行时平台，按此判据归 `L4-web`。

## 3. 边规范

字段（prd2 §3.3）：`source` / `target` / `relation` / `citation`；`relation` ∈ 6 类，禁止新增。

- 源头与入边（2026-10-03 前史裁定，替代原「两条独立源头」定义）：前史卷允许多个源头（入度 0），判据 = 每个源头 ≥1 出边（无孤岛）；正卷无源头，非根节点一律 ≥1 入边。源头 6 条：布尔 1854（→ 香农 1937）、罗素《数学原理》1910–13（→ 哥德尔 1931、→ McCulloch–Pitts 1943）、图灵 1936（→ EDVAC 报告 1945）、Hollerith 1890（→ Harvard Mark I 1944）、ABC 1942（→ ENIAC 1945）、Colossus 1944（→ Baby 1948）。香农 1937 由 `布尔 → 香农` 取得入边、哥德尔 1931 由 `罗素 → 哥德尔` 取得入边，均不算源头；`哥德尔 → 图灵` 不画——Copeland & Fan（2022）考据：《On Computable Numbers》核心思想系独立得出，不构成「可引用的文献级借鉴」（其论文对 Gödel 的 3 处提及用于区分结果）。
- 非根节点 ≥1 入边；出边 ≤5 / 节点；入边上限：主图 ≤8——超限按优先级保留前 8（`paradigm_shift > direct_fork > enables > convergence > conceptual_inf > composition`），节点显示 `+N` 角标，详情框列出全部入边；分卷不限（若 M2 现毛线球，再引入软阈值与按 relation 过滤）；校验器 warning：入边 >10 提示复核。〔M2 执行注：≤8 截断在主图渲染层执行（当前真实数据未触发；`?fixture=1` 压测数据含入边 11 的 hub 覆盖该路径），BFS / 详情框始终用全量边集〕
- 跨卷边：相邻卷对 **≤32 条（总量）**，其中 **master→master ≤7**（= 主图可见部分；非 master 跨卷边在任何视图都不渲染——主图只渲染两端皆 master 的边，分卷视图要求两端同卷。2026-10-07 M3 修订：原「3–5」→ J1 ≤8 → J5 定 **≤12** → J7 定 **≤32**，依据 = V3 批实测线头密度 31 条/对〔2000–2007 生节点同卷无父源〕）。下限 3 为建设期目标（不足仅 warn）；分卷页只画「入口 / 出口」标记。
- `citation` = 一句话依据 + 来源（同 `sources` 格式）；显示于边 tooltip 与详情框。

## 4. 前史卷（1854–1946）

- **渊源节点例外**：前史卷允许「论文 / 著作 / 理论模型」作为节点（如布尔 1854、图灵 1936、香农 1937、EDVAC 报告 1945）；正卷仍只收具体产物或规范。
- 收 13 个渊源节点（独立刻度；2026-10-03 定稿，区间 12–15 内）。
- **理论节点 `layer` / `column` 映射（2026-10-04 终裁，F-D-3）**：前史卷不按六泳道渲染，渊源节点入独立单列——理论节点（布尔 1854、罗素《数学原理》1910–13、哥德尔 1931、图灵 1936、丘奇 λ 演算 1936、香农 1937、McCulloch–Pitts 1943）`layer` = `PRE_theory`（哨兵层，非泳道，不参与六泳道布局与 laneWidth 计算），`column` = `theory`（`PRE_theory` 层注册列，校验器不再特判，限 year < 1947）。前史卷与主图按前史单列渲染。规则只限前史理论节点：正卷节点不受影响；前史硬件节点（ABC / Colossus / Harvard Mark I / ENIAC 等）照常挂对应泳道。
- 定稿清单（2026-10-03 前史裁定，候选池 14 − Z3 1941）：理论 7 —— 布尔 1854、罗素《数学原理》1910–13、哥德尔 1931、图灵 1936、丘奇 λ 演算 1936、香农 1937、McCulloch–Pitts 1943；机器 6 —— Hollerith 1890、ABC 1942、Colossus 1944、Harvard Mark I 1944、ENIAC 1945、EDVAC 报告 1945。Z3 1941 出图原因：唯一「无入边且无出边」的孤岛（独立发明线，不满足源头判据的出边要求）；M3 语言线若延伸（Plankalkül / ALGOL）可回归。
- 主图「前史」入口标记（渲染层概念，与入度无关）：布尔 1854 + 香农 1937（2026-10-03 F-D-4 裁定：图灵机 1936 不入主图，主图前史段孤岛清零；全量见 `docs/master-candidates.md` v0.2）。
- 衔接边例：布尔 1854 → 香农 1937（conceptual_inf）；罗素《数学原理》→ 哥德尔 1931（conceptual_inf）；哥德尔 1931 → 丘奇 λ 演算 1936（conceptual_inf）；香农 1937 → 晶体管 1947（enables）；EDVAC 报告 1945 → Baby 1948（enables）。1948 信息论 / Baby 归卷 1。

## 5. 核验流程

写 → 逐条打开 `sources` 人工确认 → 记 `checked_at`（勾选 / 日期）→ `npm run validate`。来源失效：换源或补 `archive_url`；来源冲突：详情框并列，主标取官方 / 原始论文。

## 6. 禁用词与红线

- 禁用词仅约束节点 `label`（`concepts` 可用英文术语，如 connectionism）。定稿清单 25 词（2026-10-03）：云计算 / SaaS / 连接主义 / 面向对象 / LLM Agents / 向量数据库 / 微服务 / 人工智能 / 机器学习 / 深度学习 / 神经网络 / 大数据 / 物联网 / 移动互联网 / 元宇宙 / 区块链 / AGI / Web 2.0 / PaaS / IaaS / 开源 / DevOps / Serverless / 边缘计算 / 低代码。匹配规则：中文子串命中即拦（「云计算平台」也拦）；拉丁词大小写不敏感；机构不入表（避免误伤 `IBM PC` 等合法 label）；文件落 `data/meta.json`，校验器强制（prd2 §9 规则 6）。
- 事实错误零容忍：宁缺勿编。
- **淘汰分支收录判据（2026-10-03 定）**：收「有活后代的祖先」——被淘汰的产物只要能写出一条到存活节点、可引用文献的 `citation` 边，就收（例：Multics 1969 → UNIX 的 conceptual_inf）；不收「死胡同」——无活后代、只能靠「结局」说明成立的（例：OS/2 1987）不入图；如需收死胡同，先升 schema 加结局字段，另行评估。
