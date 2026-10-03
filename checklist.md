# 工程 Checklist

状态：2026-10-03 · 依据 `docs/prd2.md`（v3 · schema v5.1）与同日审计（全文见 `subject-matter/prd.md` §13） · 远端 `git@github.com:JaronTam/philo-tech.git`（SSH）

图例：`[x]` 已定或已完成 / `[ ]` 待补充或待开工

> 进度快照（2026-10-03 收尾 · 下次接续点）：blocking 5 项 + F-B-3 修复、§2.3 两项裁定已落；spec 版本 = prd2 v3 · schema v5.1、ui-spec v0.5、content-spec v0.6、master-candidates v0.1（44 条）。下次：① 终审勾 §2.1 / §2.2；② 拍板 §2.4 data 组织 + 内容侧两项（前史 13 选 12–15、禁用词清单定稿）；③ 然后 M0（骨架 + 实测）。

## 0. 基建与仓库（2026-10-03）

- [x] 目录布局：`docs/`（现行规格）、`subject-matter/`（归档，不入库）、`.gitignore`（排除 7 张 jpg 与 `qa.md`、`prd.md`，另含 node_modules/dist）
- [x] GitHub 仓库 `JaronTam/philo-tech`：public（免费账号 Pages 前提）
- [x] 首提交 `0c44673` 推到 `main`，tracking 已设（`main...origin/main`）
- [x] remote 切 SSH：`git@github.com:JaronTam/philo-tech.git`，`ls-remote` 与 `push` 均验证通过
- [ ] Pages source = "GitHub Actions"（与 M0 的 `deploy.yml` 同批设置）

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

> 2026-10-03：`docs/ui-spec.md` / `docs/content-spec.md` 草案已出；同日三轮回填至 v0.4（web 审计 → 4 项落定 → 4 项多信源采集：①②③维持、④ 主图改分段刻度），blocking 修复批升至 v0.5（prd2 v3）。整体审计完成（15 项 findings 登记于 §2.5）——结论：不能直接进 M0，blocking 5 项修完即动工。§2.1 / §2.2 各项经审后勾：与 blocking 相关的条目待修复后终审。

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
- [x] label 语言方案（§11）：label 中文 + 术语英文，或 label/labelEn 双字段（动 schema 需一并定）——定：`label` 中文主标 + `label_en` 英文全称（schema v5.1，2026-10-03）
- [ ] summary / concepts 规格：字数上限、concepts 条数（3–8）、术语写法
- [ ] sources / citation 格式：URL 优先？DOI / 书页？citation 是否可点击
- [ ] 边预算：出入度上限、非源头节点 ≥1 入边、跨卷边数量与入口 / 出口标记
- [ ] master / weight 判据：主图 ~40 节点选取、epic / major / minor 标准
- [ ] 核验流程：写入后打开 sources 逐条确认并留痕（对症"写时未核验"）

### 2.3 先决裁定 —— 写内容前

- [x] 起点年份 = **1854**（布尔）· 前史卷 1854–1946（独立刻度，收 12–15 个渊源节点）· 正卷 1947 起、4 卷不动 · 主图根节点 = 布尔 1854 + 香农 1937（图灵 1936 可选）
  - 调研（2026-10-03，2 个 web 模型交叉 + 抽查复核）：两方同向设前史卷（渊源节点限量、独立刻度）；巴贝奇 1837 随 1854 决定排除；§9 并集已改 [1854, 2027)（见 2.4；2026-10-03 执行）。
  - 已裁决分歧：晶体管首演 12-16（首次放大成功）vs 12-23（贝尔管理层演示、铭牌"发明日"）——年份 1947 不变；布尔 1854 出版社标准著录 = Walton and Maberly（London）。
  - 未采信：web 回答 2（香农年份"1837"错字、Macmillan 署疑误、结构表自相矛盾、未核验仍标 95%）。
- [x] 卷边界年份：1980 / 2000 / 2015 维持（2026-10-03 裁定）——三界对齐断层线（IBM PC 1981 / dot-com 破裂 2000 / TensorFlow、ResNet 2015 入卷 4 首）；改界将连带重算 173 年、55px/年、2360px 与 ui-spec 两表 + prd2 §9；AlexNet 2012 收在卷 3 尾段（可接受，主题词面未动）
- [x] 淘汰分支收不收（Multics / OS/2 类）——收「有活后代的祖先」、不收「死胡同」：Multics 1969 收（→ UNIX），OS/2 1987 不收；判据落 `docs/content-spec.md` §6（v0.6）

### 2.4 工程小项

- [ ] data 组织：单 `data.json` 多人 PR 冲突 → 按卷拆分（`data/vol-1.json` …）
- [ ] id 规则：kebab-case + 年份、全局唯一、发布后不改（深链依赖）
- [ ] 禁用词表：显式清单文件，与 column 注册表同置
- [x] prd2 修订（v3）：§4 卷表加前史卷 1854–1946；§9 并集 → [1854, 2027)（随 A1 = 1854；含卷 4 半开修正）；§4 主图「全局压缩刻度」→ 分段压缩（5 段：3/12/25/35/55 px/年，段高合计 2360px）；§3.1 渊源节点例外（F-B-3）——2026-10-03 执行

### 2.5 整体审计（2026-10-03 完成）

结论：不能直接进 M0（规格本体可支撑绘制代码，但 M0 实测缺输入、卷 4 刻度矛盾、schema 落点卡 M1 类型）。blocking 5 项（2026-10-03 修复完成，改动文件见各行尾注）：

- [x] F-D-2：补 master 候选表（~40 条，最低 `layer` / `year` / `column` 三列）——ui-spec §1 自定 M0 实测输入，仓库内不存在；2026-10-03 修复：新建 `docs/master-candidates.md`（44 条，卷 3 段 / 卷 4 段各 10 条）；`docs/ui-spec.md` §1 补文件指向
- [x] F-D-3：定前史节点 `layer` / `column` 映射（或理论单列）——布尔 / 哥德尔 / 图灵 / 丘奇 / 香农 / McCulloch–Pitts 6 项理论节点无列可挂；2026-10-03 修复：`docs/content-spec.md` §4 定前史单列（理论节点 `column=theory`、`layer` 占位 `L0_hardware`，不参与六泳道布局；硬件节点照常挂泳道）
- [x] F-A-1：定卷 4 区间口径（推荐 `[2015, 2027)` 12 年，与 §9 并集联动）——现写闭区间 12 年 ≠ 表内 11 年；2026-10-03 修复：`docs/ui-spec.md` §1 卷表 / 分段表卷 4 → [2015, 2027)、12 年、55px；`docs/prd2.md` §9 并集 → [1854, 2027)（连带）；checklist 2.4 同步
- [x] F-B-1：schema 增补落点（`label_en` / `checked_at` / `archive_url`），升 v5.1 或撤销增补；2026-10-03 修复（选 a）：`docs/prd2.md` §3.3 增三字段升 v5.1，状态行 + §13 同步；`docs/content-spec.md` §1 同步；checklist 2.2「label 语言方案」定案
- [x] F-D-1：注册表加 `scripting` 列并定 JS 归属；2026-10-03 修复：`docs/content-spec.md` §2 增列 + 归属判据（语言规范 / 实现 → L2-scripting；宿主平台 / 交付物 → L4-web；Node.js 归 L4-web）；L2 示例（ui-spec §1、content-spec §2）改 6×112+32 = 704px

P1 非 blocking：

- [x] F-B-3：渊源节点例外（前史卷收论文 / 著作 / 理论模型）登记进 prd2 §3.1 例外条款，入 2.4 的 prd2 v3 清单；2026-10-03 修复：`docs/prd2.md` §3.1 增例外条款（限前史卷 1854–1946）；checklist 2.4 登记

P2（9 项，M1 中途修）：F-B-2（prd2 §3.2 c-family 例与注册表冲突、C# 无列）· F-B-4（checklist 2.3「主图根节点 = 布尔 + 香农」vs content-spec §3 入度 0 定义）· F-B-5（ui-spec §5 sources 空态不可达，prd2 §9 规则 2 强制 ≥1）· F-B-6（已登记 3 项修订的连带面：prd2 §4 主图年份 / §10 M0 验收 / §6 深链 `vol=` 域；§4、§10 面 2026-10-03 已修，§6 域留 P2）· F-B-7（边预算 3 条无校验器落点）· F-C-1（两份 spec H1 仍「草案 v0.2」；2026-10-03 随本批升 v0.5、prd2 升 v3）· F-E-1（ParadigmBand 渲染缺 spec）· F-E-2（深链 `vol=` 取值域未定义）· F-E-3（交互控件未定义，编辑取舍）

押后登记（2026-10-03：终裁未决 / 递延项，一律不勾）：

- F-D-3 编码终裁（`theory` + `L0_hardware` 占位 vs 哨兵枚举）——死线 = M1 写前史节点前；改判面 3 处（content-spec §4 一行、prd2 §3.3 枚举、master-candidates 6 行）
- Node.js 归属终裁（现 `L4-web`）——死线 = 写该节点前（M1 / M3）；改判面 3 处（content-spec §2 判据行、节点列值、候选表 #30）
- prd2 §0 / §2「1947–2026」表述 + §11 已定行（起点年份 / 双语标签 / 淘汰分支）同步——随 F-B-6 §6 深链面同批（M1 中途 P2）
- 年份抽查（PyTorch 2016、WWW 1991、IC / TPU / ENIAC 备注项）——随 content-spec §5 核验流程 M1 兜底；PyTorch 若改 2017，重跑卷 4 段 TF↔PyTorch 间距判定
- 前史单列 x 槽位（ui-spec 未写）——最迟 M3 主图前补

已登记项（审计标「已登记」，非新发现，不入 findings）：注册表 / 禁用词表的 data 文件未建（checklist 2.4，随 M1 建）

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

开工顺序：specs v0.5–v0.6（2026-10-03 已出并随两批升版，§2.1 / §2.2 全覆盖）→ 整体审计（2026-10-03 完成，见 §2.5）→ 修 blocking 5 项（2026-10-03 完成）→ 终审勾 §2.1 / §2.2 → B4 等余项回填 → M0 → M1。
