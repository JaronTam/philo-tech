# 工程 Checklist

状态：2026-10-03 · 依据 `docs/prd2.md`（v2 · schema v5）与同日审计（全文见 `subject-matter/prd.md` §13）

图例：`[x]` 规格已定 / `[ ]` 待补充或待开工

## 1. prd2 已定（实现直接引用）

- [x] 坐标系：Y = 年份向下递增；X = `laneBase[layer] + columnOffset[column]` + 避让（prd2 §3.2）
- [x] 节点同一性规则与禁用词（§3.1）
- [x] 数据模型 schema v5：`Node / Edge / ParadigmBand` 字段表（§3.3）
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

### 2.1 UI / 渲染规范 —— M0 前

- [ ] 坐标数值表：lane 宽、column 宽、每卷 px/年、避让方向与间距（§5 "纵向或横向" 未定）
- [ ] 节点形态：纯文本块（名字 + 灰色小字，参考图语法）还是卡片
- [ ] 色板：`accent` 色值、背景 / 正文 / 灰字 / 泳道带 / 网格线 CSS 变量表、中文字体栈
- [ ] 边渲染：线形（正交折线）、箭头有无、`citation` 露出方式（边 hover tooltip）
- [ ] 详情框：容器（侧栏 / popover）、触发方式、`sources` 链接渲染
- [ ] 交互状态优先级：搜索 / BFS / 收敛高亮的叠加与清除规则（M2 前）
- [ ] 卷切换导航与初始视图（M3 前）

### 2.2 内容标准 —— M1 前

- [ ] `column` 注册表（§9 校验依赖；M1 试排的输入）
- [ ] 年份取值规则：以"首个公开可用版本 / 规范发布年"为准，year 与 sources 对账
- [ ] label 语言方案（§11）：label 中文 + 术语英文，或 label/labelEn 双字段（动 schema 需一并定）
- [ ] summary / concepts 规格：字数上限、concepts 条数（3–8）、术语写法
- [ ] sources / citation 格式：URL 优先？DOI / 书页？citation 是否可点击
- [ ] 边预算：出入度上限、非源头节点 ≥1 入边、跨卷边数量与入口 / 出口标记
- [ ] master / weight 判据：主图 ~40 节点选取、epic / major / minor 标准
- [ ] 核验流程：写入后打开 sources 逐条确认并留痕（对症"写时未核验"）

### 2.3 先决裁定 —— 写内容前

- [ ] 起点年份：1947 / 1937 / 1854（决定是否前史段；牵动 §9 卷区间并集 [1947, 2026]）
- [ ] 卷边界年份：1980 / 2000 / 2015 是否合适
- [ ] 淘汰分支收不收（Multics / OS/2 类）

### 2.4 工程小项

- [ ] data 组织：单 `data.json` 多人 PR 冲突 → 按卷拆分（`data/vol-1.json` …）
- [ ] id 规则：kebab-case + 年份、全局唯一、发布后不改（深链依赖）
- [ ] 禁用词表：显式清单文件，与 column 注册表同置

## 3. 文档勘误（qa.md，审计 #1–#5）

- [ ] #1 qa.md:82 —— R/N/E 改为按卷定义（2.jpg：R=实在论、N=唯名论；3.jpg：R=唯理论、E=经验论）
- [ ] #2 qa.md:92 —— "1.jpg" → "3.jpg"
- [ ] #3 qa.md:245 —— 洛克入度 ≈ 1 → ≈ 2（霍布斯实线、笛卡尔虚线）
- [ ] #4 qa.md:393/397/415/447/454 —— "20 行" → 12 行（prd 侧已随 prd2 处理）
- [ ] #5 qa.md:435 —— [cite: 9] 计数：7 次 → 8 次（表格里 6 → 7 处）

## 4. 里程碑（prd2 §10）

- [ ] M0 骨架页：纵轴刻度 + 6 泳道带 + 时间网格
- [ ] M1 20 个手写节点 + 边（关键闸门：语义列对齐肉眼可辨）
- [ ] M2 交互四项（BFS < 100ms @ 250 节点）
- [ ] M3 主图 + 4 卷，150–250 节点（validate 全绿）
- [ ] M4 部署 GitHub Pages（深链可分享）

开工顺序：2.1 前 3 项 → M0；2.2 前 3 项 + 2.3 → M1。
