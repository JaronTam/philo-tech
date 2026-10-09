# Master 候选表（M0 试排输入）

状态：2026-10-09 · v0.5（M3 V4 准备批：PyTorch 定年 2016 → 2017〔J10 裁定——2016-09 起 alpha 为 invite-only closed alpha；公开可用 = 2017-01-19〕）· v0.4（J6 裁定：+Intel 8086 1978——主图 `IBM PC` 孤点消解；44 → 45 条候选〔触顶 ≤45〕）· v0.3（F-D-3 终裁：theory 行 `layer` 改 `PRE_theory` 哨兵层）· v0.2（F-D-4：+罗素 +EDVAC 报告、−图灵机 −ENIAC）· 依据 checklist §2.5 F-D-2 / F-D-4 与 ui-spec §1 主图实测 · 与 prd2 冲突时以 prd2 为准

- 判据（content-spec §1）：`weight=epic`，或跨 ≥2 泳道的枢纽；主图目标 40±5 条，本表 45 条候选（ui-spec §7 主图上限 ≤45）。
- 取材：prd2 §3.1 正例、content-spec §4 前史候选池（布尔 / 图灵 / 香农等已定项直接入选）、content-spec §2 注册表列。
- 年份口径（content-spec §1）：首个公开可用 / 规范发布年；争议年主标取完成或首次公开演示年，差异入备注。拿不准的标「年份待核」不编数——本版无待核项。
- 高危段覆盖（M0 实测重点）：卷 3 段 [2000, 2015) 10 条；卷 4 段 [2015, 2027) 10 条。
- 前史理论节点（†）：`layer` = `PRE_theory`（哨兵层）、`column` = `theory`，渲染走前史单列（content-spec §4，v0.3 起）。
- 卷界口径：半开 [start, end)，末卷含 2026（[2015, 2027) = 12 年；见 ui-spec §1）。
- **v0.2（2026-10-03，F-D-4 裁定 ①）**：+罗素《数学原理》1910–13（† theory）、+EDVAC 报告 1945（`L0_hardware` / `arch`）；−图灵机 1936、−ENIAC 1945——两者主图边端点（哥德尔链 / ABC）均非 master，留在主图即成孤点；节点本身仍在前史卷 13 条定稿内（content-spec §4）。改后主图前史段孤岛清零。
- **v0.4（2026-10-05，J6 裁定）**：+Intel 8086（1978，L0_hardware / device）——V2 数据落库后主图 `IBM PC` 为 0 度孤点（邻居 8086 / Apple II / MS-DOS 全非 master）；升 8086 后主图新增 `8086 → IBM PC` 边、孤点清零。44 → 45 条候选（触顶 ≤45）。

| # | label | layer | column | year | 备注 |
|---:|---|---|---|---:|---|
| 1 | 布尔《思维规律研究》 | PRE_theory † | theory | 1854 | 源头（入度 0） |
| 2 | 罗素《数学原理》 | PRE_theory † | theory | 1910 | 源头；1910–13 三卷，取首卷 |
| 3 | 哥德尔不完备定理 | PRE_theory † | theory | 1931 | |
| 4 | 丘奇 λ 演算 | PRE_theory † | theory | 1936 | |
| 5 | 香农开关电路论文 | PRE_theory † | theory | 1937 | 由 布尔 → 香农（conceptual_inf）入边，非源头 |
| 6 | McCulloch–Pitts 神经元模型 | PRE_theory † | theory | 1943 | M1 数据落文时标签压为「McCulloch–Pitts 模型」（块高 ≤2 行）；B0 验收修复批（2026-10-09）将 `master-candidates.json` 同步为压缩后 label（消 D-17 对账失配） |
| 7 | EDVAC 报告 | L0_hardware | arch | 1945 | 存储程序体系结构规范；层 / 列映射 M1 复核维持 L0_hardware / arch |
| 8 | 晶体管 | L0_hardware | device | 1947 | 首演 1947-12-16（checklist 2.3 裁决） |
| 9 | Manchester Baby | L0_hardware | device | 1948 | EDVAC 报告 1945 → Baby（enables） |
| 10 | LISP | L2_language | lisp-family | 1958 | |
| 11 | 集成电路 | L0_hardware | device | 1958 | Kilby 演示 1958；Noyce 平面工艺 1959 |
| 12 | UNIX | L1_system | os | 1969 | |
| 13 | 关系模型 | L3_data | relational | 1970 | prd2 §3.1 正例 |
| 14 | Intel 4004 | L0_hardware | device | 1971 | |
| 15 | C 语言 | L2_language | c-family | 1972 | prd2 §3.1 正例 |
| 16 | TCP/IP | L1_system | net | 1974 | prd2 §3.1 正例 |
| 17 | Intel 8086 | L0_hardware | device | 1978 | J6：主图孤点消解（→ IBM PC）|
| 18 | IBM PC | L0_hardware | device | 1981 | J6 后主图入边 = Intel 8086 |
| 19 | C++ | L2_language | c-family | 1985 | |
| 20 | WWW | L4_delivery | web | 1991 | 提案 1989；公开可用 1991（year 口径） |
| 21 | Linux | L1_system | os | 1991 | |
| 22 | Python | L2_language | scripting | 1991 | |
| 23 | JavaScript | L2_language | scripting | 1995 | |
| 24 | Java | L2_language | jvm-family | 1995 | |
| 25 | HTTP/1.1 | L1_system | net | 1997 | prd2 §3.1 正例 |
| 26 | LLVM | L2_language | toolchain | 2003 | prd2 §3.1 正例 |
| 27 | MapReduce | L3_data | distributed | 2004 | |
| 28 | Amazon S3 | L4_delivery | cloud-api | 2006 | |
| 29 | iPhone | L0_hardware | device | 2007 | |
| 30 | CUDA | L2_language | toolchain | 2007 | content-spec §2 已定 |
| 31 | Node.js | L4_delivery | web | 2009 | F-D-1 判据：宿主平台 → L4-web |
| 32 | Go | L2_language | scripting | 2009 | F-D-1 判据：语言规范 → L2-scripting |
| 33 | AlexNet | L5_ai | nn | 2012 | |
| 34 | Docker | L4_delivery | container | 2013 | |
| 35 | Kubernetes | L4_delivery | container | 2014 | |
| 36 | Rust 1.0 | L2_language | ml-family | 2015 | |
| 37 | TensorFlow | L5_ai | framework | 2015 | |
| 38 | ResNet | L5_ai | nn | 2015 | |
| 39 | PyTorch | L5_ai | framework | 2017 | J10 裁定：2016 alpha 为邀请制封闭内测；公开可用 2017-01-19 |
| 40 | AlphaGo | L5_ai | nn | 2016 | 围棋 4:1（2016-03） |
| 41 | TPU v1 | L0_hardware | accelerator | 2016 | 2015 起内部部署；2016 公开 |
| 42 | Transformer | L5_ai | nn | 2017 | prd2 §3.1 正例 |
| 43 | BERT | L5_ai | nn | 2018 | |
| 44 | GPT-3 | L5_ai | nn | 2020 | |
| 45 | Stable Diffusion | L5_ai | nn | 2022 | |

覆盖校验：#26–35 落卷 3 段 [2000, 2015) 计 10 条；#36–45 落卷 4 段 [2015, 2027) 计 10 条；合计 45 条。前史段（≤1946）7 条：布尔 / 罗素 / 哥德尔 / 丘奇 / 香农 / M–P / EDVAC 报告。
