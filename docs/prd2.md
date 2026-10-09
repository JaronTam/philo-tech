# 技术史图谱站 PRD

状态：v7 · 冻结 schema v5.3（2026-10-05：M3 批〔§3.2 L2 增 `algol-family` / `dotnet-family` 两列，6 → 8 列〕；M2 批〔§6 搜索域补 `label_en`；§10 M2 验收注测量口径；`year_note` 字段（只增不删）〕，见 §13）· 素材见 subject-matter/0–6.jpg

## 0. 一句话

把 1854–2026 的计算机技术史，按参考哲学图谱的排版语法，做成一个可查谱系的静态图谱站，部署到 GitHub Pages。

## 1. 目标与非目标

**目标**

1. 复刻参考图的**谱系可读性**：一屏之内看清"谁派生自谁、谁使能了谁"。
2. 覆盖 6 条抽象层泳道、约 150–250 个节点。
3. 四项交互：上下游追溯、搜索、深链、收敛高亮。
4. 纯静态，GitHub Pages 部署，无服务端。

**非目标**

- 不做账号、不做数据库、不做协作编辑。
- 不做 WebGL / 3D。节点量级 250，DOM/SVG 渲染无压力。
- 不自动抓取维基百科。内容人工写（见 §9）。
- 不做"技术趋势预测""技术选型对比"这类衍生功能。

## 2. 从参考素材继承什么

参考素材是 1 张总图（0.jpg）+ 6 张分卷（1–6.jpg），共用一套图例。要继承的是排版语法，不是内容：

| 参考图的做法 | 本站对应 |
|---|---|
| 时间在纵轴，向下递增（1.jpg 左缘 BC6世纪→4世纪） | Y 轴 = 年份，向下递增 |
| 横轴留给语义列（爱利亚学派成一列：巴门尼德/芝诺/麦里梭） | X 轴 = 抽象层泳道 + 泳道内语义列 |
| 节点 = 人物 | 节点 = 具体技术产物/规范 |
| 泳道 = 学派 | 泳道 = 抽象层 |
| 灰色小字 = 该人物的观点 | 灰色小字 = 该技术的核心术语 |
| 实线 = 师承/同宗，虚线 = 影响，粗体 = 重要人物，斜体 = 体系外 | 见 §3.5 视觉编码 |
| 总图只画主干，分卷各带独立时间刻度（1.jpg 一世纪一格，5.jpg 十年一格） | 主图 + 4 卷，每卷独立纵轴刻度 |

**每卷独立刻度是硬需求**：1854–2026 跨度 173 年，若全局线性，2015–2026（节点最密）拿到的纵向空间与 1947–1958 相同。

## 3. 核心决策（冻结）

### 3.1 节点同一性规则

这是全项目最重要的一条。不遵守，图会塌成范畴错误。

**是节点**：有明确诞生年份、可追溯到具名源头、可被后续技术直接引用的**具体技术产物或规范**。

正例：C 语言(1972)、TCP/IP(1974)、关系模型(1970)、LLVM(2003)、Transformer(2017)、HTTP/1.1(1997)。

**不是节点**：

| 类别 | 例子 | 去处 |
|---|---|---|
| 范式 / 品类 / 思潮 | 云计算、SaaS、连接主义、面向对象、LLM Agents、向量数据库 | 背景高亮带（`ParadigmBand`） |
| 机构 / 团队 | OpenAI、Google Research、贝尔实验室 | 节点详情框元数据（`people`） |
| 论文 | Attention Is All You Need | 节点详情框元数据（`sources`） |
| 单一特性 | cgroups、namespace | 仅当它本身是独立产物时才是节点；否则并入宿主节点 |

判据一句话：**"它有没有自己的诞生年份和可引用的源头？"** 没有就是品类，不是节点。

**例外（限前史卷 1854–1946）**：渊源节点允许「论文 / 著作 / 理论模型」入图（如布尔 1854、图灵 1936、香农 1937、EDVAC 报告 1945）；正卷仍只收具体产物或规范（写作细则见 content-spec §4）。

四轮评审里，这条规则被自己的输出违反过两次（LLM Agents、Vector Database），所以 §9 的校验器会强制检查。

### 3.2 坐标系

```
Y 轴（纵） = 年份，向下递增
X 轴（横） = 泳道基准 + 语义列偏移

X = laneBase[layer] + columnOffset[column] + 避让偏移
Y = volumeScale[volume].y(year)     // 每卷独立刻度
```

`column` 是四轮方案都没提、但决定成败的字段。参考图的可读性来自语义列——洛克/贝克莱/休谟成一整列，巴门尼德/芝诺/麦里梭成一整列。没有 `column`，同泳道的节点会被年份打散，列对齐结构上不可能成立。

例：L2 泳道内，`column` 可取 `c-family`（C、C++）、`lisp-family`（Lisp、Scheme、Clojure）、`ml-family`（ML、Haskell、Rust）、`jvm-family`（Java）、`algol-family`（FORTRAN、ALGOL 60、COBOL、Pascal）、`dotnet-family`（C#、F#）。后两列 = M3 批按「新增列 = minor 升级」流程新增（2026-10-05，见 content-spec §2；L2 6 → 8 列）。

### 3.3 数据模型（v5.1）

```ts
type Layer =
  | 'L0_hardware'   // 半导体 / 体系结构
  | 'L1_system'     // 操作系统 / 网络协议
  | 'L2_language'   // 语言 / 编译器 / 运行时
  | 'L3_data'       // 数据库 / 分布式数据
  | 'L4_delivery'   // Web / 容器 / 交付
  | 'L5_ai'         // 深度学习 / 大模型
  | 'PRE_theory';   // 前史渊源（哨兵层，非泳道）：仅 theory 单列，限 year < 1947（content-spec §4）

type Relation =
  | 'enables'         // 物质或架构使能：source 使 target 成为可能
  | 'direct_fork'     // 派生 / 分支
  | 'conceptual_inf'  // 概念影响 / 启发
  | 'paradigm_shift'  // 范式替代
  | 'convergence'     // 收敛：≥2 条入边指向同一 target
  | 'composition';    // 组合抽象：target 由 source 组合而成

interface Node {
  id: string;
  label: string;
  label_en: string;         // 英文名 / 全称（详情框显示）
  layer: Layer;             // X 泳道
  column: string;           // X 泳道内语义列，人工指定
  year: number;             // Y 轴
  weight: 'epic' | 'major' | 'minor';
  master: boolean;          // 是否进主图
  summary: string;
  concepts?: string[];      // 灰色小字
  people?: string[];        // 机构 / 人物，元数据
  sources: string[];        // 必填，≥1
  checked_at: string;       // 来源核验日期（必填，ISO）
  archive_url?: string;     // 存档链接（可选，来源失效时用）
}

interface Edge {
  source: string;
  target: string;
  relation: Relation;
  citation: string;         // 必填：该关系成立的依据出处
}

interface ParadigmBand {
  id: string;               // 如 'cloud-computing'
  label: string;            // '云计算'
  from: number;
  to: number | null;        // null = 至今
  layers: Layer[];          // 覆盖哪些泳道
}
```

**v5 相对 v4 的两处改动**：`enabled_by` → `enables`（v4 的命名与 `source → target` 方向矛盾，`enabled_by → Intel 4004` 读作"IC 被 4004 使能"）；新增 `column`。删除 `era`（可由 `year` 推出，两个真相源会打架）。

**v5.1 相对 v5**：新增 `label_en` / `checked_at` / `archive_url` 三个字段（只增不删，既有字段语义不变）。

**v5.2 相对 v5.1**（2026-10-04，F-D-3 终裁）：`Layer` 增补哨兵值 `PRE_theory`（只增不删）——前史理论节点由「`L0_hardware` 占位」改为挂 `PRE_theory` 层 + `theory` 列，数据不再谎报泳道；渲染细节见 content-spec §4。

### 3.4 关系类型的用法边界

加类型不解决分类，只换堆积处——四轮里边的错误在 `direct_fork`/`composition`/`enabled_by` 之间搬了三次家。所以给每条类型划边界：

| 关系 | 成立条件 | 不成立的反例（四轮中实际出现过） |
|---|---|---|
| `enables` | target 缺了 source 就无法存在 | AlexNet→ResNet（是架构后继，不是使能） |
| `direct_fork` | 有共享代码或共享设计血统 | UNIX→Linux（重写，非 fork）、C→Java（跳过 C++ 与 Simula/Smalltalk） |
| `conceptual_inf` | 有可引用的文献级借鉴 | CUDA→AlexNet（是物质使能，不是概念借鉴） |
| `paradigm_shift` | 后者取代前者的主导地位——限「领域方法路径换代」（不替换血脉语义；血脉线走 `direct_fork` / `conceptual_inf`）；2026-10-09 M3 V4 批 J11 收窄 | WWW→Docker（无关，编造） |
| `convergence` | target 入度 ≥ 2 | MapReduce→Kafka/Spark（1→2 发散，方向反） |
| `composition` | target 由 source 组合而成 | TCP/IP→WWW（WWW 跑在 TCP/IP 上，是使能） |

### 3.5 视觉编码

| 关系 | 线型 | 权重 |
|---|---|---|
| `enables` | 实线，stroke-width 2.5 | 最重 |
| `direct_fork` | 实线，1.5 | 中 |
| `conceptual_inf` | 虚线 4,4 | 中 |
| `paradigm_shift` | accent 色单线 2，全站 ≤ 8 条 | 中，靠稀有度而非粗细取胜 |
| `convergence` | 实线，入端收束成漏斗 | 中 |
| `composition` | 点线 2,2 | 轻 |

| weight | 字号 | 字重 |
|---|---|---|
| `epic` | 16px | 700 |
| `major` | 14px | 500 |
| `minor` | 12px | 400 |

`paradigm_shift` 用 accent 色而非粗线：参考图那条醒目红线标记的是**一条特殊叙事线**（马克思主义谱系），不是一个边类。把整个边类画成最粗的线会制造毛线球。

## 4. 分卷与主图

| 卷 | 年份 | 主题 | 预期节点 |
|---|---|---|---|
| 主图 | 1854–2026 | 只画 `master: true` | 约 40 |
| 前史 | 1854–1946 | 渊源：逻辑与计算理论 → 早期机器（独立刻度） | 12–15 |
| 卷 1 | 1947–1980 | 主机 / 早期网络 / 语言奠基 | 40–60 |
| 卷 2 | 1980–2000 | PC / OOP / Web | 40–60 |
| 卷 3 | 2000–2015 | 云 / 分布式数据 / 移动 | 40–60 |
| 卷 4 | 2015–2026 | 大模型 / 现代栈 | 40–60 |

主图用分段压缩刻度（5 段，段界 = 卷界；6.8/12/25/35/55 px/年，段高合计 2713px〔容器 2800〕，见 ui-spec §1；前史段数值经 M0/M1 两轮实测修订），每卷用各自的线性刻度。卷与卷之间靠跨卷边连接（如 卷1 的 UNIX → 卷2 的 Linux），跨卷边在分卷页以"入口/出口"标记渲染，不画完整连线。

## 5. 布局

**v1 不引入 ELK，也不引入 dagre。**

坐标是确定性的：X 由 `layer` + `column` 决定，Y 由 `year` 决定。这不是图布局问题，是带边的散点图。唯一的算法需求是**同列内避让**：同 `column` 内年份相近的节点需要纵向或横向错开，按 `year` 排序后贪心分配即可，20 行代码。

引入 ELK 反而会破坏列对齐——`LAYER_SWEEP` 最小化交叉，但不保证"洛克/贝克莱/休谟成一列"。

若 M1 试排后发现同列避让效果不可接受，再评估 ELK 的 `fixed` 模式（保留给定坐标）。

## 6. 交互

| 交互 | 行为 | 实现 |
|---|---|---|
| 上下游追溯 | 点节点，BFS 提取祖先链与影响链，其余节点与边 α=0.1 | 图数据在内存，BFS 双向各一次 |
| 搜索 | 索引 `label` / `label_en` / `concepts` / `people`（M2 批补 `label_en`，判归 ui-spec §5），选中后平移视口并高亮 | 客户端索引，250 节点无需服务端 |
| 深链 | 状态写入 URL：`/#vol=<main\|pre\|v1..v4>&node=<id>`（缺省 `vol=main`） | hash 路由，无依赖 |
| 收敛高亮 | 一键高亮所有 `convergence` 边及其多源 | 过滤 `relation === 'convergence'` |

上游追溯是参考图的核心用途（查师承），优先级最高。

## 7. 技术栈

| 组件 | 选型 | 理由 |
|---|---|---|
| 构建 | Vite + TypeScript | 输出静态 bundle，GitHub Pages 直接托管 |
| 渲染 | React + React Flow | 自带 pan/zoom/minimap；节点位置由 §5 计算后传入 |
| 样式 | TailwindCSS | 无额外状态需求，v1 不引入 Zustand |
| 数据 | `data.json` + TS 类型 | 与渲染完全解耦，便于 PR 扩充 |

## 8. 部署

`.github/workflows/deploy.yml`，注意缩进层级：

```yaml
name: Deploy Graph Site to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install & Build
        run: |
          npm ci
          npm run build

      - name: Validate data
        run: npm run validate

      - name: Upload Artifacts
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

仓库需设为 public（免费账号的 Pages 前提），Pages source 设为 "GitHub Actions"。

## 9. 内容生产流程

**内容人工写，不用 LLM 生成。** 依据：四轮里模型产出的 MVT 表（C 交付 12 行、D 交付 20 行），错 8–10 处，且全部属于"可查证但未查证"——TPU v1 是推理专用芯片、Borg 论文发表于 2015 年、FAISS 诞生于 2017 年，每条都能用一次搜索在 5 分钟内确认。

流程：

1. 写节点，填 `sources`（≥1 条可点击的 URL）。
2. 写边，填 `citation`（该关系成立的依据）。
3. 跑 `npm run validate`，规则见下。
4. 人工复核所有 `paradigm_shift` 与 `convergence` 边——这两类最容易编。

`validate.ts` 强制规则：

| 规则 | 拦截的错误类型 |
|---|---|
| 每条 edge 的 source/target 存在于 nodes | 悬空引用 |
| 每个 node 的 `sources.length >= 1` | 无出处节点 |
| 每条 edge 的 `citation` 非空 | 编造的边（TPU v1→Transformer 那类） |
| `convergence` 边的 target 入度 ≥ 2 | 方向反了的收敛（MapReduce→Kafka/Spark 那类） |
| `paradigm_shift` 全站 ≤ 8 条 | 边类爆炸 |
| `node.label` 不在禁用词表（云计算/SaaS/连接主义/向量数据库/…） | 违反 §3.1 节点规则 |
| `year` 落在卷区间并集（含前史卷 = [1854, 2027)） | 年份越界（如写入 2027） |
| 每条 edge 的 `source.year ≤ target.year` | 时间倒流（Borg 2015→K8s 2014 那类） |
| `column` 在 `layer` 下已声明 | 拼写漂移导致的隐性列分裂 |
| `node.summary` 字符数 ≤ 60（含标点；M1 验收 B1 补） | summary 超限 |
| 每条 edge 的 `citation` 含可点击 URL（`https?://`；M2 批补） | citation 无来源链接（tooltip / 详情框无法给外链） |
| 主图（两端皆 `master`）单节点入边 ≤ 8 | 主图入边爆炸 |
| 相邻卷跨卷边 ≤ 32（总量）/ ≤ 7（master→master，M3 修订 J7）——下限 3 为建设期目标，不足仅 warn | 跨卷边失控 |

校验器能拦住结构性错误，拦不住事实错误（如"TPU v1 支持训练"）。事实靠第 1、2 步的出处。

## 10. 里程碑与验收

| 里程碑 | 交付 | 验收标准 |
|---|---|---|
| M0 | 骨架页：空数据，画出 1854–2026 纵轴刻度（含前史卷，主图按分段刻度）、6 条泳道带、时间网格 | 时间刻度与年份对得上；泳道分隔可辨 |
| M1 | 20 个手写节点 + 边 | **语义列对齐肉眼可辨**（同 `column` 的节点成一列） |
| M2 | 交互四项 | 上下游追溯在 250 节点下响应 < 100ms（测量口径 = `npm run bench` 合成 250 节点 p95 + dev fixture 实排，见 ui-spec §7；M3 真实数据复跑〔B5 批已完成：真实 193 节点 / 203 边 p95 0.036ms〕） |
| M3 | 主图 + 4 卷，150–250 节点 | `npm run validate` 全绿 |
| M4 | 部署 GitHub Pages | 线上可访问，深链可分享 |

M1 是关键闸门：如果列对齐在 M1 站不住，整个坐标系要重做，不能带着问题进 M3。

## 11. 未决事项

> 已定（2026-10-03/04，遗留登记）：起点年份 = 1854（含前史卷 1854–1946）；双语标签 = `label` 中文主标 + `label_en`；淘汰分支 = 收「有活后代者」（content-spec §6）；卷边界年份 = 1980 / 2000 / 2015 维持。剩余未决 = 移动端形态（v1 桌面优先，M3 后按需）。

| 事项 | 选项 | 影响 | 状态 |
|---|---|---|---|
| 起点年份 | 1947 晶体管 / 1937 香农 / 1854 布尔代数 | 决定是否需要"前史卷"。参考图有源头节点（米利都学派），计算机史的对应物是布尔—香农 | 已定 1854（2026-10-03） |
| 双语标签 | 中文标签 + 英文副标 / 纯英文 / 纯中文 | 素材是中文，术语是英文 | 已定 `label` + `label_en`（2026-10-03） |
| 移动端形态 | 缩放平移 / 单列列表视图 | 参考图 900×6139，手机不可读 | 未决（M3 后按需） |
| 是否收录被淘汰的分支 | 收（Multics/OS/2/OpenStack 早期形态）/ 不收 | 参考图无淘汰分支（哲学学派不消亡），技术史大量存在 | 已定「有活后代者收」（2026-10-03） |
| 卷边界年份 | 1980 / 2000 / 2015 是否合适 | 影响每卷的节点密度 | 已定维持（2026-10-03） |

## 12. 素材版权

0–6.jpg 未标注出处，作为格式参考无碍；若要嵌入站内作为示例页，需先确认来源许可。

## 13. 修订记录

**v2 相对 v1**——2026-10-03 审计（对象：prd.md + qa.md；7 项异常全文见 subject-matter/prd.md §13）对本文件条款的修订共 3 处：

| 审计项 | 位置 | 修订 |
|---|---|---|
| #6 | §3.3、§3.4 | convergence 判据由"入度 ≥2，出度 1"改为"target 入度 ≥ 2"（与 §9 唯一校验一致）；§3.3 注释同步去除"一出" |
| #7 | §9 | 规则 7 更正为"year 落在卷区间并集"并换示例；新增校验"每条 edge 的 `source.year ≤ target.year`"拦截时间倒流 |
| #4（关联） | §9 | 内容生产流程依据："四轮里模型产出的 20 行验证表"更正为"MVT 表（C 交付 12 行、D 交付 20 行）" |

#1、#2、#3、#5 位于 qa.md 判定文本，不涉及本文件条款，未体现。

**v3 相对 v2**（2026-10-03，blocking 修复批，依据 checklist §2.5）：

| 项 | 位置 | 修订 |
|---|---|---|
| F-B-1 | §3.3 | Node 增补 `label_en` / `checked_at` / `archive_url`，schema 升 v5.1（只增不删） |
| F-B-3 | §3.1 | 增渊源节点例外条款（限前史卷 1854–1946：论文 / 著作 / 理论模型可入图） |
| F-A-1 | §9 | `year` 校验并集 → [1854, 2027)（含前史卷 + 卷 4 半开修正） |
| F-B-6 | §4、§10 | §4 加前史卷行、主图年份 1854–2026、主图改分段压缩刻度（3/12/25/35/55，合 2360px）；§10 M0 验收改含前史与分段口径 |

**v4 相对 v3**（2026-10-03，M0 实测批）：§4 主图分段刻度按 master 候选表 44 条试排修订——前史段 3 → 6.3px/年（段高 279 → 586，理论单列 6 节点堆叠），段高合计 2360 → 2667px（容器 2400 → 2750）；前史卷 H 2000 → 2160（ui-spec §1 同步）。其余段维持。

**v5 相对 v4**（2026-10-04，M1 批，依据 checklist M1 实测）：

| 项 | 位置 | 修订 |
|---|---|---|
| F-D-3 | §3.3 | `Layer` 增补 `PRE_theory` 哨兵层，schema 升 v5.2（只增不删） |
| 实测 | §4 | 前史段 6.3 → 6.8px/年（真实 20 节点主标轮缺口 39.2 → 0），段高合计 2667 → 2713px（容器 2750 → 2800） |
| F-B-6 | §0、§2、§6 | 年份表述 1947–2026 → 1854–2026；深链 `vol=` 域定 `main\|pre\|v1..v4`（缺省 main） |
| F-B-2 | §3.2 | c-family 示例与注册表对齐（C/C++；Java → jvm-family；C# 暂无槽位） |
| F-B-7 | §9 | 校验器 +2：主图入边 ≤ 8、相邻卷跨卷边 ≤ 5 |
| — | §11 | 已定项登记（起点年份 / 双语标签 / 淘汰分支 / 卷界） |
| M2 | §3.3 | `TechNode` 增可选 `year_note`（争议年备注），schema v5.3（只增不删） |
| M2 | §6 | 搜索域补 `label_en`（消 ui-spec §5 冲突，判归 ui-spec） |
| M2 | §9 | 校验器 +1：`citation` 含可点击 URL（`https?://`）；旧注「citation 可点击性等 M2 后启用」据此收敛 |
| M2 | §10 | M2 验收注测量口径（`npm run bench` 250 节点合成图 p95 < 100ms + dev fixture 实排；M3 复跑） |
| M3 | §3.2 | L2 增补两列 `algol-family`（FORTRAN / ALGOL 60 / COBOL / PL/I / BASIC / Pascal / Simula）与 `dotnet-family`（C# / .NET / F#）——「C#/.NET 暂无槽位」条款落定；泳道 L2 6 → 8 列（704 → 928px，ui-spec §1 同步） |
| M3 | §9 | 跨卷边上限修订（J1 裁定）：相邻卷 ≤5 → **≤8（总量）/ ≤5（master→master）**——非 master 跨卷边在任何视图不渲染，纯血统用途；卷首节点（UNIVAC / IBM 701 / 关系模型）父源在 pre 卷所需 |
| M3 | §9 | 跨卷边上限再修订（J5 裁定，V2 批）：总量 8 → **12**（master→master 仍 ≤5）——45 节点/卷下多线植根前卷（GUI / RISC / CNN / SQL 标准 / 语言链），实测 V2 需 11 条/对 |
| M3 | §9 | 跨卷边上限三修（J7 裁定，V3 批）：总量 12 → **32**（master→master 5 → **7**）——V3（2000–2015）早期节点（2000–2007 生）同卷无父源，血统全部植根 v2（PC / Web 时代），实测需 31 条 / MM 6 条；非 master 跨卷边任何视图不渲染 |
| M3 | §10 | M2 行测量口径「M3 真实数据复跑」完成（B5 批：真实 193 节点 / 203 边 p95 0.036ms，报告段不设 gate） |
| M3 | §3.4 | `paradigm_shift` 成立条件收窄（J11 裁定，V4 准备批）：限「领域方法路径换代」——target 范式取代 source 在其领域的主导方法路径，不替换血脉语义；首用 3 条（`transformer → gpt-3` 架构创新 → 规模化 / `gan → stable-diffusion` 对抗 → 扩散 / `gpt-3 → chatgpt` 补全交互 → 对话 + 对齐），站内 0 → 3（§9 上限 8 不变） |
