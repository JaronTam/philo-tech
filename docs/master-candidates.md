# Master 候选表（M0 试排输入）

状态：2026-10-03 · v0.1 · 依据 checklist §2.5 F-D-2 与 ui-spec §1 主图实测（M0）· 与 prd2 冲突时以 prd2 为准

- 判据（content-spec §1）：`weight=epic`，或跨 ≥2 泳道的枢纽；主图目标 40±5 条，本表 44 条候选（ui-spec §7 主图上限 ≤45）。
- 取材：prd2 §3.1 正例、content-spec §4 前史候选池（布尔 / 图灵 / 香农等已定项直接入选）、content-spec §2 注册表列。
- 年份口径（content-spec §1）：首个公开可用 / 规范发布年；争议年主标取完成或首次公开演示年，差异入备注。拿不准的标「年份待核」不编数——本版无待核项。
- 高危段覆盖（M0 实测重点）：卷 3 段 [2000, 2015) 10 条；卷 4 段 [2015, 2027) 10 条。
- 前史理论节点（†）：`layer` 取占位值 `L0_hardware`、`column` 取保留列名 `theory`，渲染走前史单列（content-spec §4）。
- 卷界口径：半开 [start, end)，末卷含 2026（[2015, 2027) = 12 年；见 ui-spec §1）。

| # | label | layer | column | year | 备注 |
|---:|---|---|---|---:|---|
| 1 | 布尔《思维规律研究》 | L0_hardware † | theory | 1854 | 根节点（入度 0） |
| 2 | 哥德尔不完备定理 | L0_hardware † | theory | 1931 | |
| 3 | 图灵机 | L0_hardware † | theory | 1936 | 根节点（入度 0）；主图可选源头 |
| 4 | 丘奇 λ 演算 | L0_hardware † | theory | 1936 | |
| 5 | 香农开关电路论文 | L0_hardware † | theory | 1937 | 由 布尔 → 香农（conceptual_inf）入边，非根 |
| 6 | McCulloch–Pitts 神经元模型 | L0_hardware † | theory | 1943 | |
| 7 | ENIAC | L0_hardware | device | 1945 | 完成 1945；公开演示 1946 |
| 8 | 晶体管 | L0_hardware | device | 1947 | 首演 1947-12-16（checklist 2.3 裁决） |
| 9 | Manchester Baby | L0_hardware | device | 1948 | EDVAC 报告 1945 → Baby（enables） |
| 10 | LISP | L2_language | lisp-family | 1958 | |
| 11 | 集成电路 | L0_hardware | device | 1958 | Kilby 演示 1958；Noyce 平面工艺 1959 |
| 12 | UNIX | L1_system | os | 1969 | |
| 13 | 关系模型 | L3_data | relational | 1970 | prd2 §3.1 正例 |
| 14 | Intel 4004 | L0_hardware | device | 1971 | |
| 15 | C 语言 | L2_language | c-family | 1972 | prd2 §3.1 正例 |
| 16 | TCP/IP | L1_system | net | 1974 | prd2 §3.1 正例 |
| 17 | IBM PC | L0_hardware | device | 1981 | |
| 18 | C++ | L2_language | c-family | 1985 | |
| 19 | WWW | L4_delivery | web | 1991 | 提案 1989；公开可用 1991（year 口径） |
| 20 | Linux | L1_system | os | 1991 | |
| 21 | Python | L2_language | scripting | 1991 | |
| 22 | JavaScript | L2_language | scripting | 1995 | |
| 23 | Java | L2_language | jvm-family | 1995 | |
| 24 | HTTP/1.1 | L1_system | net | 1997 | prd2 §3.1 正例 |
| 25 | LLVM | L2_language | toolchain | 2003 | prd2 §3.1 正例 |
| 26 | MapReduce | L3_data | distributed | 2004 | |
| 27 | Amazon S3 | L4_delivery | cloud-api | 2006 | |
| 28 | iPhone | L0_hardware | device | 2007 | |
| 29 | CUDA | L2_language | toolchain | 2007 | content-spec §2 已定 |
| 30 | Node.js | L4_delivery | web | 2009 | F-D-1 判据：宿主平台 → L4-web |
| 31 | Go | L2_language | scripting | 2009 | F-D-1 判据：语言规范 → L2-scripting |
| 32 | AlexNet | L5_ai | nn | 2012 | |
| 33 | Docker | L4_delivery | container | 2013 | |
| 34 | Kubernetes | L4_delivery | container | 2014 | |
| 35 | Rust 1.0 | L2_language | ml-family | 2015 | |
| 36 | TensorFlow | L5_ai | framework | 2015 | |
| 37 | ResNet | L5_ai | nn | 2015 | |
| 38 | PyTorch | L5_ai | framework | 2016 | |
| 39 | AlphaGo | L5_ai | nn | 2016 | 围棋 4:1（2016-03） |
| 40 | TPU v1 | L0_hardware | accelerator | 2016 | 2015 起内部部署；2016 公开 |
| 41 | Transformer | L5_ai | nn | 2017 | prd2 §3.1 正例 |
| 42 | BERT | L5_ai | nn | 2018 | |
| 43 | GPT-3 | L5_ai | nn | 2020 | |
| 44 | Stable Diffusion | L5_ai | nn | 2022 | |

覆盖校验：#25–34 落卷 3 段 [2000, 2015) 计 10 条；#35–44 落卷 4 段 [2015, 2027) 计 10 条；合计 44 条。
