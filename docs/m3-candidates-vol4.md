# M3 卷 4 候选清单（G-A 已批）

状态：2026-10-09 · 草案 = `data/candidates/vol-4.draft.json`（`npm run measure -- --draft` 预检 **0 error / 0 warn**；主标轮需高 **1686.7 / H 2000** ✓ 免拉伸）· 45 = 10 master + 35 · **G-A 已批（2026-10-09）：J10 定年 2017（id `pytorch-2017`）/ J11 批 3 条（P1/P3/P4；P2 降 `conceptual_inf`）/ J12 批 A/B/C 三案**——「跨卷上限」与「孤点」两项未触发（据 §D）· 规格已同步（`content-spec` v0.15 / `prd2` §3.4+§13 / `master-candidates` v0.5）· 待数据批落库

## 0. 裁定（3 项）—— 待 G-A 审批

> 编号按执行口径「从 J10 起按出现序」：年表（J10）→ 跨卷上限（未触发）→ paradigm_shift（J11）→ 列归属（J12）→ 孤点（未触发）。未触发两项的依据见 §D。**G-A 已批（2026-10-09）**：J10 批 / J11 批 3 条（P2 降级）/ J12 批三案——各节加「裁定」行。

### J10 PyTorch 定年 2016 → 2017（年表修正）

- **裁定（2026-10-09 G-A）：批**——定年 2017、id `pytorch-2017`；master `#39` 表行已同步（`master-candidates.md` v0.5，随本批提交）。
- **背景**：S1 定年复核发现 2016-09 起的 alpha 系列为 **invite-only closed alpha**（v0.1.3 README 原文「this is an invite-only closed alpha, and please don't distribute code further」），不满足 content-spec §1「首个公开可用版本」口径；公开可用 = 2017-01-19（官方博文《a-year-in》2018-01-19 原文「Today marks 1 year since PyTorch was released publicly」，datePublished 已复核）。主会话已独立复核（v0.1.3 README 实文 + releases API + 博文）——S1 检阅通过。
- **提案例**：定年 **2017**，id 同步 `pytorch-2017`（`scikit-learn` 改年先例）；`year_note` 提案 = 「2016-09-01 alpha 起为 invite-only closed alpha；2017-01-19 公开发布；2017-02-02 v0.1.6 beta」；master `#39` 表行 2016 → 2017 同步 **留 G-A 后**（本批不改表）；影响注 = 「重跑卷 4 段 TF↔PyTorch 间距判定」（checklist 押后登记明列）。
- **备选案例**：维持 2016（不采——违「公开可用」口径；README 实文 + HN Algolia 2016 全年零真实帖双反证）。
- 四栏：

| 栏 | 内容 |
|---|---|
| 推荐 | 改 2017 + `year_note` 三段式；年表（master 表）与节点（卷 4 草案）改年分两步：草案即刻生效、表行待 G-A |
| 反对 | alpha 曾于 GitHub 可下载（但 README 明令禁止分发，且无公开讨论痕迹）——若判「可获取即公开」则维持 2016（口径之争） |
| 依赖 | G-A 批准为前提（本批不落 `data/vol-4.json`、不改 `master-candidates.md`）；批准后主会话执行表行同步 |
| 冲突 | 与现表 `#39` 行（记 2016）冲突 → 批准后同步；checklist 押后登记（PyTorch 若改 2017 → 重跑间距判定）转为执行项 |

- 依据（≥2 独立源，S1 已直连核验 200）：① `raw.githubusercontent.com/pytorch/pytorch/v0.1.3/README.md`（closed alpha 原文）② `pytorch.org/blog/a-year-in/`（2017-01-19 公开发布）③ `api.github.com` releases（v0.1.1 2016-09-01「alpha-1」/ v0.1.6 2017-02-02「Beta is here」）④ HN Algolia 检索（2016 零帖）

### J11 `paradigm_shift` 首用提案（4 条）

- **裁定（2026-10-09 G-A）：批 3 条（P1/P3/P4）**；**P2 降级 `conceptual_inf`**（自述「合流」不满足「取代主导地位」；同 `lenet→alexnet` 先例，MM 计数不变）；边界句已落 `content-spec` §3（v0.15）+ `prd2` §3.4。
- **背景**：站内 paradigm_shift = 0 条（cap 8，prd2 §9）；V3 明写「留 v4」——本批为首用提案。prd2 §9 明列 paradigm_shift / convergence 两类边「最易编」、须人工复核，故以 4 条带源提案形式交 G-A 逐条裁。
- **提案例**（4 条；relation 均为 paradigm_shift，每边 ≥2 源）：

| # | 边 | 位置 | 一句话 | 来源（≥2） |
|---:|---|---|---|---|
| P1 | `transformer-2017 → gpt-3-2020` | C2 · MM | 预训练规模化（缩放律）成为方法路径新范式 | arXiv 2005.14165（GPT-3）· arXiv 2001.08361（Scaling Laws）· arXiv 2108.07258（Foundation Models 报告） |
| P2 | `alexnet-2012 → alphago-2016` | C1 · MM | 深度 CNN 感知 → 深度强化学习决策（自我对弈）范式 | Nature 2016（nature16961）· Nature News 2016-03（nature.2016.19553） |
| P3 | `gan-2014 → stable-diffusion-2022` | C1 · 非 MM | 生成模型：对抗训练 → 扩散/去噪范式 | arXiv 2006.11239（DDPM）· arXiv 2112.10752（LDM/SD 技术报告） |
| P4 | `gpt-3-2020 → chatgpt-2022` | C2 · 非 MM | 大模型 → 对话式产品（人机交互范式） | TechCrunch 2022-11/12（ChatGPT 发布与采用）· arXiv 2203.02155（InstructGPT / RLHF 对齐线） |

- **备选案例**：减至 2 条（保 P1 + P3，轴线最纯粹）；或「批 P1/P3、P2/P4 降级为 conceptual_inf / enables」（全留待 B5 亦为一案，但 V3 已明写「留 v4」）。
- 四栏：

| 栏 | 内容 |
|---|---|
| 推荐 | 批 4 条（四轴各异：规模化 / 决策 / 生成 / 交互；总 4 ≤ cap 8 余 4；均为 v4 时代公认转折，源充分） |
| 反对 | 首用即 4 条偏进取；P2/P4 与既有关系类（conceptual_inf / enables）边界可争 |
| 依赖 | 批准后需在 content-spec §3 / prd2 §3.4 补 paradigm_shift 用法边界一句（仅标「领域方法路径换代」，不替换血脉语义）——随 G-A 后规格批次落 |
| 冲突 | 与 §C1/§C2 表中同边的关系标注联动：P1/P4 若改判，`gpt-3` 入边与 `chatgpt` 入边须同步改 relation（边数不变） |

- 落点（G-A 批后）：P1 §C2 第 34 行 / P3 §C1 第 30 行 / P4 §C2 第 38 行 = **PS 3 条**；§C1 第 5 行（`alexnet → alphago`）已降 `conceptual_inf`；全站计数 0 → 3（validate 上限 8 ✓）。

### J12 列归属（3 案）

- **裁定（2026-10-09 G-A）：批 A/B/C 三案**——不新增列；draft 落值即为批准值。
- **背景**：三项节点在现注册表下归属有二选/三选空间（v3 `Swift` 案先例 = 判据二选须列裁定）。
- **提案例**：
  - **A 案 · `sycamore-2019`（量子处理器）→ `L0_hardware/accelerator`**——「专用计算加速硬件」语义与 TPU/A100/H100 同列；单节点不为量子题材新增列（新增列 = minor 升版 + `laneWidths` 变宽 + L0 泳道右移，成本落在全站布局）。
  - **B 案 · `chatgpt-2022` → `L4_delivery/web`、`openai-api-2020` → `L4_delivery/cloud-api`**——交付形态判据（同 `wikipedia`/`github` → web；「服务 API 化」同 `amazon-s3` → cloud-api）；「AI 应用层」不另立列，归交付层。
  - **C 案 · `grpc-2016` → `L1_system/net`**——协议栈判据（RPC 框架，HTTP/2 承载；HTTP/SPDY → net 先例）。
- **备选案例**：A 案备选 = 新增列 `quantum`（覆盖后续量子节点预期；代价见四栏「反对」）；B 案备选 = `chatgpt` → `cloud-api`（若按「服务」判）/ 新列 `ai-app`（不采：与 `nn`/`framework` 语义边界重叠）；C 案备选 = `cloud-api`（若按「云服务接口」判）。
- 四栏：

| 栏 | 内容 |
|---|---|
| 推荐 | A/B/C 三案按上述落列（draft 已按此落，`measure` 0 error 已验证占用无冲突） |
| 反对 | 新增 `quantum` 列：1 节点空列、布局变宽、未来若量子线收缩即成死列；`ai-app` 列：与 L5 语义重叠且违「列 = 泳道细分」定位 |
| 依赖 | 若 G-A 选新增列 → 须先改 content-spec §2 注册表 + `data/meta.json`（minor 升版）再落库；本批 draft 值为推荐案 |
| 冲突 | 与「同列同年 ≤1」交互检查：accelerator 列 2016/2019/2020/2022 四节点异年 ✓；若改案须重跑 `measure --draft` |

- 依据（≥2 源）：A：Nature 2019（s41586-019-1666-5，2019-10-23）· Google 官方博文（blog.google，量子霸权公告同日）；B：TechCrunch 2022-11-30（ChatGPT 发布）· OpenAI 官方公告（openai.com，本机 403 → WebSearch 补核）；C：官方文档 grpc.io · `api.github.com` release v1.0.0（2016-08-19）

## A 节点表（45；`★` = master）

| # | id | label | layer / column | year | w | 判据一句话 | 来源域名（待核） |
|---:|---|---|---|---:|---|---|---|
| 1 | rust-1-0-2015 ★ | Rust 1.0 | L2/ml-family | 2015 | major | 内存安全系统语言 1.0（稳定承诺起点） | blog.rust-lang.org / raw.githubusercontent.com |
| 2 | tensorflow-2015 ★ | TensorFlow | L5/framework | 2015 | epic | 谷歌开源深度学习框架（公众可用起点） | api.github.com / techcrunch.com / research.google〔拦〕 |
| 3 | resnet-2015 ★ | ResNet | L5/nn | 2015 | major | 残差网络（超深 CNN，ILSVRC 2015 冠军） | arxiv.org / image-net.org |
| 4 | apple-watch-2015 | Apple Watch | L0/device | 2015 | major | Apple 可穿戴平台（watchOS 基于 iOS） | apple.com |
| 5 | http-2-2015 | HTTP/2 | L1/net | 2015 | major | HTTP/2 标准（RFC 7540，SPDY 演化入标） | rfc-editor.org / ietf.org |
| 6 | graphql-2015 | GraphQL | L4/web | 2015 | major | Facebook 开源查询式 API 规范 | graphql.org / api.github.com |
| 7 | vs-code-2015 | VS Code | L2/toolchain | 2015 | major | 跨平台代码编辑器（Electron 系）；1.0 于 2016-04 | code.visualstudio.com / techcrunch.com |
| 8 | kotlin-1-0-2016 | Kotlin 1.0 | L2/jvm-family | 2016 | major | JetBrains JVM 语言 1.0（2011-08 公布立项入 year_note） | kotlinlang.org / blog.jetbrains.com |
| 9 | dotnet-core-2016 | .NET Core | L2/dotnet-family | 2016 | major | .NET 跨平台开源重写（1.0 GA） | devblogs.microsoft.com / microsoft.com |
| 10 | grpc-2016 | gRPC | L1/net | 2016 | major | 谷歌 RPC 框架 1.0（HTTP/2 承载；2015 开源入 year_note） | grpc.io / api.github.com |
| 11 | helm-2016 | Helm | L4/container | 2016 | major | Kubernetes 包管理器（2.0；2015-10 初版入 year_note） | helm.sh / api.github.com |
| 12 | oculus-rift-2016 | Oculus Rift | L0/device | 2016 | minor | 消费级 VR 头显（CV1 发售，VR 元年） | techcrunch.com / meta.com |
| 13 | alphago-2016 ★ | AlphaGo | L5/nn | 2016 | epic | 深度 RL 击败围棋世界冠军（Nature 论文 + 对局） | nature.com / blog.google |
| 14 | tpu-v1-2016 ★ | TPU v1 | L0/accelerator | 2016 | major | 谷歌自研推理 ASIC（year_note：2015 起内部部署 / 2016-05-18 I/O 公开） | arxiv.org / blog.google / techcrunch.com |
| 15 | c-plus-plus-17-2017 | C++17 | L2/c-family | 2017 | major | C++ 标准修订（ISO/IEC 14882:2017） | iso.org / isocpp.org |
| 16 | webassembly-2017 | WebAssembly | L2/toolchain | 2017 | major | 浏览器字节码标准 MVP（W3C 推荐 2019-12 入 year_note） | w3.org / webassembly.org / infoq.com |
| 17 | istio-2017 | Istio | L4/container | 2017 | major | Kubernetes 服务网格（0.1） | istio.io / api.github.com |
| 18 | ray-2017 | Ray | L3/distributed | 2017 | minor | RISELab 分布式计算框架（ML 细粒度调度） | arxiv.org / hpcwire.com |
| 19 | pytorch-2017 ★ | PyTorch | L5/framework | 2017 | epic | 动态图深度学习框架；**J10 改年**（2017-01 公开，2016 alpha 为封闭内测） | pytorch.org / api.github.com / raw.githubusercontent.com |
| 20 | transformer-2017 ★ | Transformer | L5/nn | 2017 | epic | 注意力架构（《Attention Is All You Need》） | arxiv.org / papers.nips.cc |
| 21 | deno-2018 | Deno | L4/web | 2018 | major | JS/TS 运行时（Node 作者重写线；1.0 于 2020-05 入 year_note） | deno.com / api.github.com |
| 22 | julia-1-0-2018 | Julia 1.0 | L2/scripting | 2018 | minor | 科学计算语言 1.0（LLVM JIT） | julialang.org / api.github.com |
| 23 | jax-2018 | JAX | L5/framework | 2018 | major | 谷歌 numpy 式自动微分框架（XLA 编译化） | api.github.com / jax.readthedocs.io |
| 24 | bert-2018 ★ | BERT | L5/nn | 2018 | major | 双向 Transformer 预训练（NLP 迁移学习转折） | arxiv.org / api.github.com |
| 25 | sycamore-2019 | Sycamore | L0/accelerator | 2019 | major | 量子霸权演示处理器（53 qubit；**J12 A 案**） | nature.com / blog.google |
| 26 | delta-lake-2019 | Delta Lake | L3/distributed | 2019 | minor | Spark 之上湖仓存储层（Databricks 开源） | databricks.com / api.github.com |
| 27 | github-actions-2019 | GitHub Actions | L4/web | 2019 | minor | GitHub 内建 CI/CD（GA；2018-10 公测入 year_note） | github.blog / techcrunch.com |
| 28 | gpt-2-2019 | GPT-2 | L5/nn | 2019 | major | 分阶段释出的大模型（「太危险不发布」公告时刻） | api.github.com / techcrunch.com |
| 29 | nvidia-a100-2020 | NVIDIA A100 | L0/accelerator | 2020 | major | 数据中心 GPU（Ampere + 三代 Tensor Core） | nvidia.com / techcrunch.com |
| 30 | apple-m1-2020 | Apple M1 | L0/arch | 2020 | major | Apple 自研 ARM SoC（Mac 平台迁移） | apple.com |
| 31 | openai-api-2020 | OpenAI API | L4/cloud-api | 2020 | major | GPT-3 API 开放（模型即服务；J12 B 案） | openai.com〔403〕 / techcrunch.com / zdnet.com |
| 32 | macos-big-sur-2020 | macOS Big Sur | L1/os | 2020 | major | macOS 11（Apple 芯片过渡首发系统） | apple.com |
| 33 | vite-2020 | Vite | L2/toolchain | 2020 | minor | 前端构建工具（esbuild/Rollup；1.0 于 2021-02 入 year_note） | vite.dev / registry.npmjs.org |
| 34 | gpt-3-2020 ★ | GPT-3 | L5/nn | 2020 | epic | 缩放律大模型（few-shot 提示范式） | arxiv.org / openai.com〔403〕 |
| 35 | quic-2021 | QUIC | L1/net | 2021 | major | 基于 UDP 的传输协议（RFC 9000） | rfc-editor.org / ietf.org |
| 36 | windows-11-2021 | Windows 11 | L1/os | 2021 | major | NT 内核线大众版本（GA） | microsoft.com / blogs.windows.com |
| 37 | alphafold-2-2021 | AlphaFold 2 | L5/nn | 2021 | major | 蛋白质结构预测（AI for Science 里程碑；CASP14 2020 入 year_note） | nature.com / deepmind.com |
| 38 | http-3-2022 | HTTP/3 | L1/net | 2022 | major | HTTP over QUIC（RFC 9114） | rfc-editor.org / ietf.org |
| 39 | nvidia-h100-2022 | NVIDIA H100 | L0/accelerator | 2022 | minor | Hopper 架构 GPU（LLM 训练硬件线） | nvidia.com / techcrunch.com |
| 40 | langchain-2022 | LangChain | L5/framework | 2022 | minor | LLM 应用框架（链式编排） | api.github.com / langchain.com |
| 41 | chatgpt-2022 | ChatGPT | L4/web | 2022 | major | 对话式 AI 产品（生成式 AI 大众化；J12 B 案） | openai.com〔403〕 / techcrunch.com |
| 42 | stable-diffusion-2022 ★ | Stable Diffusion | L5/nn | 2022 | epic | 开放权重文生图（生成模型大众化） | stability.ai / arxiv.org |
| 43 | llama-2023 | Llama | L5/nn | 2023 | major | 开放权重大模型（开放竞逐线开启） | arxiv.org / ai.meta.com |
| 44 | sora-2024 | Sora | L5/nn | 2024 | major | 视频生成模型（技术报告 2024-02；12 月公开） | openai.com〔403〕 / techcrunch.com |
| 45 | deepseek-r1-2025 | DeepSeek-R1 | L5/nn | 2025 | major | 开放权重推理模型（RL 训练线） | arxiv.org / api.github.com / nature.com |

覆盖：device 2 · arch 1 · accelerator 4 · os 2 · net 4 · toolchain 3 · c-family 1 · dotnet-family 1 · jvm-family 1 · ml-family 1 · scripting 1 · distributed 2 · web 4 · container 2 · cloud-api 1 · nn 11 · framework 4 = 45。空列（卷 4 段内）：lisp-family / algol-family（该年代无产物）；relational / nosql（备选见 §G）。

## B 列占用矩阵（同列同年 ≤1 ✓，预检 0 error）

```
L0_hardware/accelerator   2016 2019 2020 2022   L0_hardware/arch    2020
L0_hardware/device        2015 2016             L1_system/net       2015 2016 2021 2022
L1_system/os              2020 2021             L2_language/c-family 2017
L2_language/dotnet-family 2016                  L2_language/jvm-family 2016
L2_language/ml-family     2015                  L2_language/scripting 2018
L2_language/toolchain     2015 2017 2020        L3_data/distributed 2017 2019
L4_delivery/cloud-api     2020                  L4_delivery/container 2016 2017
L4_delivery/web           2015 2018 2019 2022   L5_ai/framework     2015 2017 2018 2022
L5_ai/nn                  2015 2016 2017 2018 2019 2020 2021 2022 2023 2024 2025
```

- framework 列：TF 2015 / PyTorch 2017（J10 后）/ JAX 2018 / LangChain 2022——2016 空出后未回填（无非候选实的 2016 框架产物）；非 master 入 framework 列已避开 TF 2015 与 PyTorch 2017。
- nn 列：6 master（2015/2016/2017/2018/2020/2022）+ 5 非 master（2019/2021/2023/2024/2025），避开 6 个 master 年 ✓。

## C1 跨卷边（v3 → v4，30 条；`[MM]` = master→master 主图可见；`🚩` = 弱边；`PS` = paradigm_shift〔J11〕）

| # | source → target | relation | 依据一句话 |
|---:|---|---|---|
| 1 | llvm-2003 → rust-1-0-2015 [MM] | enables | rustc 以 LLVM 为编译后端 |
| 2 | cuda-2007 → tensorflow-2015 [MM] | enables | TF GPU 加速以 CUDA/cuDNN 为物质基础（同 `cuda → alexnet` 先例） |
| 3 | alexnet-2012 → resnet-2015 [MM] | conceptual_inf | 深度 CNN 线直接延续（ResNet 论文承 AlexNet） |
| 4 | cuda-2007 → alphago-2016 [MM] | enables | AlphaGo 分布式版以 GPU 集群训练（Nature 方法节） |
| 5 | alexnet-2012 → alphago-2016 [MM] | conceptual_inf | 深度 CNN 感知网络 → AlphaGo 策略/价值网络（文献级延续；RL 合流线，同 `lenet→alexnet` 先例——J11 批：由 paradigm_shift 降级） |
| 6 | cuda-2007 → pytorch-2017 [MM] | enables | PyTorch 以 CUDA 为 GPU 计算层（物质使能） |
| 7 | android-2008 → kotlin-1-0-2016 | enables | Kotlin 以 JVM/Android 为主场（Android 平台使能其生态位） |
| 8 | dotnet-framework-2002 → dotnet-core-2016 | direct_fork | .NET 跨平台开源重写线 |
| 9 | c-plus-plus-11-2011 → c-plus-plus-17-2017 | direct_fork | C++ 标准修订（ISO 线延续） |
| 10 | llvm-2003 → webassembly-2017 | enables | Wasm 出自 asm.js/Emscripten 编译目标线（LLVM 工具链血统） |
| 11 | llvm-2003 → julia-1-0-2018 | enables | Julia JIT 以 LLVM 为编译基础设施 |
| 12 | v8-2008 → deno-2018 | enables | Deno 构建于 V8 |
| 13 | nodejs-2009 → deno-2018 | conceptual_inf | 同一作者（Ryan Dahl）对 Node 设计的反思重写 |
| 14 | spdy-2009 → http-2-2015 | direct_fork | SPDY 演化纳入 HTTP/2 标准（RFC 7540） |
| 15 | spdy-2009 → quic-2021 | conceptual_inf | 谷歌传输线：SPDY/TCP → QUIC/UDP 重做 |
| 16 | rest-2000 → graphql-2015 | conceptual_inf | REST 之外的查询式 API 范式（客户端声明查询） |
| 17 | kubernetes-2014 → helm-2016 | enables | Helm 为 Kubernetes 包管理（k8s 生态使能） |
| 18 | kubernetes-2014 → istio-2017 | enables | Istio 服务网格面向 Kubernetes 编排构建 |
| 19 | spark-2010 → ray-2017 | conceptual_inf | 同源实验室（Berkeley AMPLab/RISELab）线：批处理 → ML 细粒度调度 |
| 20 | spark-2010 → delta-lake-2019 | enables | Delta Lake 构建于 Spark 之上（Databricks 出品） |
| 21 | iphone-2007 → apple-watch-2015 | direct_fork | watchOS 基于 iOS（同 `iphone → ipad` 平台衍生先例） |
| 22 | iphone-2007 → apple-m1-2020 | conceptual_inf 🚩 | Apple 自研芯片线：iPhone 的 A 系列 → M 系列（同源核心） |
| 23 | nvidia-g80-2006 → nvidia-a100-2020 | conceptual_inf 🚩 | 同族 GPU 架构演进线（统一着色器 → Tensor Core 三代） |
| 24 | nvidia-g80-2006 → oculus-rift-2016 | conceptual_inf 🚩 | GPU 立体渲染需求线延伸至消费级 VR |
| 25 | mac-os-x-2001 → macos-big-sur-2020 | direct_fork | UNIX 桌面线延续（Apple 芯片过渡首发系统） |
| 26 | windows-7-2009 → windows-11-2021 | direct_fork | NT 内核线延续（经 8/10，同 `windows-nt → windows-7` 先例） |
| 27 | github-2008 → github-actions-2019 | conceptual_inf | 平台线扩展：代码托管 → 内建 CI/CD |
| 28 | nodejs-2009 → vs-code-2015 | enables | VS Code 以 Electron（Node + Chromium）构建 |
| 29 | nodejs-2009 → vite-2020 | enables | Vite 运行于 Node 生态（构建工具链） |
| 30 | gan-2014 → stable-diffusion-2022 | paradigm_shift PS | 生成模型线：对抗训练 → 扩散/去噪范式（DDPM → LDM/SD） |

## C2 卷内边（v4 → v4，18 条）

| # | source → target | relation | 依据一句话 |
|---:|---|---|---|
| 31 | tensorflow-2015 → tpu-v1-2016 [MM] | enables | TPU 面向 TensorFlow 神经网络负载设计（Google 数据中心） |
| 32 | resnet-2015 → transformer-2017 [MM] | conceptual_inf | Transformer 残差连接明确引用 ResNet |
| 33 | transformer-2017 → bert-2018 [MM] | conceptual_inf | BERT = Transformer 编码器栈的双向预训练 |
| 34 | transformer-2017 → gpt-3-2020 [MM] | paradigm_shift PS | 预训练规模化（缩放律）成为方法路径新范式 |
| 35 | transformer-2017 → stable-diffusion-2022 [MM] | conceptual_inf | SD 的 U-Net 与文本塔（CLIP）均内嵌 Transformer/注意力块 |
| 36 | transformer-2017 → gpt-2-2019 | conceptual_inf | GPT 系列为 Transformer 解码器线 |
| 37 | transformer-2017 → alphafold-2-2021 | conceptual_inf | AF2 核心 Evoformer 为注意力/Transformer 衍生架构 |
| 38 | gpt-3-2020 → chatgpt-2022 | paradigm_shift PS | 大模型 → 对话式产品（人机交互范式；RLHF 对齐线） |
| 39 | gpt-3-2020 → openai-api-2020 | enables | GPT-3 以 API 形式开放（模型即服务） |
| 40 | gpt-3-2020 → llama-2023 | conceptual_inf | 开放权重线：对 GPT 路线的复刻与缩放律校正 |
| 41 | openai-api-2020 → langchain-2022 | enables | LangChain 构建于 LLM API 之上 |
| 42 | quic-2021 → http-3-2022 | direct_fork | HTTP/3 承载于 QUIC（RFC 9114） |
| 43 | nvidia-a100-2020 → nvidia-h100-2022 | direct_fork | 同族数据中心 GPU 继代（Ampere → Hopper） |
| 44 | tpu-v1-2016 → sycamore-2019 | conceptual_inf 🚩 | Google 自研计算芯片线（ASIC → 量子处理器） |
| 45 | stable-diffusion-2022 → sora-2024 | conceptual_inf 🚩 | 生成视觉线模态扩展（图像 → 视频，扩散 Transformer） |
| 46 | llama-2023 → deepseek-r1-2025 | conceptual_inf 🚩 | 开放权重大模型线（推理 RL 路线） |
| 47 | http-2-2015 → grpc-2016 | enables | gRPC 以 HTTP/2 为承载协议 |
| 48 | tensorflow-2015 → jax-2018 | enables | JAX 复用 TF 的 XLA 编译层 |

## D 预算核算

- 出度 max = **5**（`transformer-2017` 顶格：bert / gpt-3 / stable-diffusion / gpt-2 / alphafold-2）；既有顶格节点（`linux-1991` / `www-1991` / `ibm-pc-1981` = 5）未新增 ✓；v3 源最高 4（`llvm-2003` / `cuda-2007`）✓
- 主图入边 ≤8：10 新 master 各 ≥1 MM 入边（`alphago-2016` 2 条）✓；主图 master 子图 **35 节点 / 27 边 → 45 节点 / 38 边**（+6 v3→v4 MM + 5 v4→v4 MM：`resnet → transformer` / `transformer → bert` / `transformer → gpt-3` / `transformer → sd` / `tf → tpu`）
- **跨卷 v3→v4 = 30 条**（cap ≤32，余 2）——**未触发升档提案**（「跨卷上限」J 项不列）；其中 master→master = **6 条**（cap ≤7，余 1）：`llvm→rust` / `cuda→tf` / `alexnet→resnet` / `cuda→alphago` / `alexnet→alphago` / `cuda→pytorch`
- 非 MM 跨卷 24 条：任何视图不渲染、无视觉密度成本（J7 论证沿用）
- `convergence`：+0（`deno` 双入边为 enables + conceptual_inf，不构成「两线合流」语义）→ 站内维持 **5**
- `paradigm_shift`：**批 3 条**（J11 裁定：P1/P3/P4；P2 降 `conceptual_inf`——MM 计数不变）→ 站内 **0 → 3**（cap 8；`scripts/validate.ts:99` 强制）
- **孤点检查**：10 新 master 全部 ≥1 MM 入边（上列）——**未触发修法提案**（「孤点」J 项不列）
- 分卷 H 2000：草稿主标轮需高 **1686.7** ✓（0 违规 / 0 灰字降级 / 0 余违规）
- 主图段 [2015,2027)：55px/年 × 12 = **660px**，10 master（2015–2022）——落库后 `measure` 全量复检（V2/V3 先例）

## E 禁用词预筛

`measure --draft` 内置检查（25 词）→ **0 命中** ✓（`OpenAI` / `ChatGPT` 等不触表；「AGI」子串检查对全部 label 无命中）

## F 来源清单

每节点 ≥1 域名已列于 §A；落库时按 V1/V2 同法逐条抓取正文核对后记 `checked_at`。S1 定年结论 + S2 增补核验如下（本批已直连核验的标注 ✓）：

**F1 十 master 定年（S1，全部 ≥2 源）**——全部维持，唯 PyTorch 改年：
`#36 Rust 1.0` 2015-05-15（blog.rust-lang.org ✓ / raw.githubusercontent.com RELEASES.md ✓）· `#37 TensorFlow` 0.5.0 2015-11-09（api.github.com tag ✓ / techcrunch ✓）· `#38 ResNet` 2015-12-10 arXiv + ILSVRC 2015（arxiv.org ✓ / image-net.org ✓）· `#39 PyTorch` **改 2017-01-19**（详见 J10）· `#40 AlphaGo` 2016-01-27 Nature（nature.com ✓ / blog.google）· `#41 TPU v1` 2016-05-18 公开 + year_note「2015 起内部部署」（arxiv.org ISCA'17 ✓ / techcrunch ✓）· `#42 Transformer` 2017-06-12（arxiv.org ✓ / papers.nips.cc ✓）· `#43 BERT` 2018-10-11/25（arxiv.org ✓ / api.github.com ✓）· `#44 GPT-3` 2020-05-28（arxiv.org ✓ / openai.com〔403，WebSearch 补核〕）· `#45 Stable Diffusion` 2022-08-22 公开权重（stability.ai ✓ / api.github.com ✓）

**F2 S2 增补核验（入选非 master 争议年；≥2 源）**：

| 项 | 结论 | 来源 |
|---|---|---|
| Kotlin | 2016（1.0 发布 2016-02-15；2011-08 公布入 year_note） | kotlinlang.org ✓ / blog.jetbrains.com（1.0 帖 + 2011 帖）✓ |
| WebAssembly | 2017（MVP 共识 2017-02-28 四引擎；Chrome 57 2017-03-14 默认开启；W3C 推荐 2019-12-05 入 year_note） | lists.w3.org 2017Feb/0002 ✓ / infoq.com 2017-03 / w3.org/TR/wasm-core-1 ✓ |
| gRPC | 2016（1.0；2015-02 首次开源入 year_note） | api.github.com release v1.0.0 published 2016-08-19 ✓ / grpc.io（落库核） |
| Helm | 2016（v2.0.0 released 2016-11-17；repo 2015-10-06 创建入 year_note） | api.github.com v2.0.0 ✓ / helm.sh（落库核） |
| Istio | 2017（0.1.0 released 2017-05-10；官宣 2017-05-24） | api.github.com 0.1.0 ✓ / istio.io（页面 JS 渲染，落库换源） |
| Vite | 2020（首个公开版 2020-04；repo created 2020-04-21；1.0 2021-02 入 year_note） | api.github.com ✓ / registry.npmjs.org/vite（0.1.x）/ Vue newsletter 2020-05-11 |
| GitHub Actions | 2019（GA 2019-11-13；2018-10-16 公测入 year_note） | github.blog changelog 2018-10-16 / techcrunch.com 2019-08-08（GA 预告） |
| Julia 1.0 | 2018（2018-08-08） | julialang.org/blog/2018/08/one-point-zero ✓ / api.github.com（落库核） |
| .NET Core | 2016（1.0 GA 2016-06-27） | devblogs.microsoft.com ✓ / microsoft.com（落库核） |
| Apple M1 / macOS Big Sur | 2020-11-10 / 2020-11-12 | apple.com newsroom ×2 ✓ |
| Sycamore | 2019-10-23 | nature.com ✓ / blog.google（落库核） |
| AlphaFold 2 | 2021（Nature 2021-07-15；CASP14 2020 入 year_note） | nature.com ✓ / deepmind.com（落库核） |
| Ray | 2017（首开源 2017；论文 2017-12） | hpcwire.com 2017-03-28 / arxiv.org/abs/1712.05889 |
| Deno | 2018（首版；1.0 2020-05 入 year_note） | api.github.com created 2018-05-15 ✓ / deno.com（落库核） |
| GraphQL | 2015（规范 2015-07 开源） | api.github.com created 2015-07-01 ✓ / graphql.org（落库核） |
| GPT-2 | 2019-02（repo created 2019-02-11） | api.github.com ✓ / techcrunch.com（落库核） |
| JAX | 2018（repo created 2018-10-25；2018-12 发布） | api.github.com ✓ / 官方文档（落库核） |
| Delta Lake | 2019（repo created 2019-04-22；开源公告 2019-04-24） | api.github.com ✓ / databricks.com（落库核） |
| LangChain | 2022-10（repo created 2022-10-17） | api.github.com ✓ / langchain.com（落库核） |
| DeepSeek-R1 | 2025-01-20 | api.github.com created 2025-01-20 ✓ / arxiv.org/abs/2501.12948 / nature.com |
| Llama | 2023-02-24 | arxiv.org/abs/2302.13971 / ai.meta.com（本机超时，落库换源） |
| HTTP/2 · QUIC · HTTP/3 | 2015-05 / 2021-05 / 2022-06（RFC） | rfc-editor.org ×3 ✓ / ietf.org |
| C++17 | 2017（ISO/IEC 14882:2017；投票/出版细节落库核） | iso.org / isocpp.org |
| VS Code | 2015-04-29 公开预览（1.0 2016-04 入 year_note） | code.visualstudio.com / techcrunch.com（落库核） |
| ChatGPT · OpenAI API · Sora · A100 · H100 · Windows 11 · Oculus Rift | 2022-11-30 / 2020-06-11 / 2024 / 2020-05 / 2022 / 2021-10-05 / 2016-03-28（年份无争议，域名见 §A） | 落库逐条核 |

**F3 口径注**：改年/争议处理三项——① PyTorch 2016 → 2017（J10，closed alpha 判据）；② WebAssembly 取「首个公开可用（2017 MVP）」而非 W3C 推荐年 2019（推荐年入 year_note，同 `html5` 反例的差异说明：HTML5 无单一齐发时点、以 Rec 定年；Wasm 有 2017-03 全引擎时点）；③ gRPC / Helm / Vite 等取「首个公开可用/稳定 1.0 年版」+ 更早版本入 year_note（同 `scikit-learn` 先例）。

## G 备选（未入 45）

`keras-2015`（framework/2015 与 TensorFlow 撞列同年）· `ddpm-2020`（nn/2020 与 GPT-3 撞列同年——扩散线改由 `gan → stable-diffusion` paradigm_shift 表达）· `clip-2021`（nn/2021 与 AlphaFold 2 撞列同年）· `vit-2020`（nn/2020 撞 GPT-3）· `stylegan-2019`（nn/2019 撞 GPT-2）· `onnx-2017` / `lightgbm-2017`（framework/2017 撞 PyTorch）· `containerd-2016`（container/2016 撞 Helm）· `gpt-4-2023` / `gemini-2023`（nn/2023 撞 Llama）· `cncf-2015`（机构非产物，不合正卷「具体产物或规范」收录口径）· `ethereum-2015`（列未注册 + 血统源 bitcoin 不在图内，父源线缺）· `tls-1-3-2018`（直连父源 `ssl-1995` 在卷 2，跨卷非相邻不可挂）· `5g-nr-2018`（列归属（电信标准）与父源线均未定，宁缺勿编）· `github-copilot-2021`（与 openai-api/chatgpt 同轴重叠）· `wsl-2016` / `firecracker-2018` / `openai-gym-2016`（可补位，价值次优）· `zig-2016`（无 1.0；llvm 出度近顶）· `clickhouse-2016` / `duckdb-2018` / `cockroachdb-2015`（L3 备补，年份/父源待核）· `flink-2014`（年份越出卷 4）· `kafka-2011` / `mongodb-2009` / `redis-2009`（年份属卷 3 段，本卷不可收）
