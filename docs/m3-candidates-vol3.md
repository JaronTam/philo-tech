# M3 卷 3 候选清单（待 G-A 审批）

状态：2026-10-07 · 草案 = `data/candidates/vol-3.draft.json`（`npm run measure -- --draft` 预检 **0 error / 0 warn**；主标轮需高 1886.7 / H 2000 ✓ 免拉伸）· 45 = 10 master + 35 · **J7 已批（2026-10-07）**：上限 ≤32 / MM ≤7 已落三处（content-spec §3 v0.14 / prd2 §9+§13 / `validate.ts`）· **J8 已按多源综合结论落 `c-family`**（4 源，见 §0）· **J9 已批 A 案**：`ibm-pc-1981 → iphone-2007`（0 warn）· **已落库**：`data/vol-3.json` 45 节点 / 51 边

## 0. 裁定（3 项）—— 全部已定（J7 批 32/7；J8 = `c-family`；J9 批 A 案）

| # | 事项 | 背景 | 提案 |
|---|---|---|---|
| J7 | **跨卷边上限再升：总量 12 → 32；master→master 5 → 7**（v2→v3 对）——**已批（2026-10-07）** | 卷 3 早期节点（2000–2007 生）在本卷内无可挂父源——卷内首个节点即 2000 年，血统全部植根 v2（PC / Web 时代）；实需 **31 条**：MM 6 条（主图可见）+ 非 MM 25 条（任何视图不渲染，「无视觉密度成本」同 J1/J5 论证）。J5 先例 = 需 11 条 → 上限 12（+1 余量） | 升 **≤32 / MM ≤7**（31 + 1 / 6 + 1 余量）→ 已落三处。（备选·维持 12 未采：需砍 19 条 → 本卷缩编至 ~26 节点） |
| J8 | `Swift` 2014 列归属 | **多源复核（2026-10-07，4 源）**：① Lattner（本人 site / TechCrunch 转引）：「drawing ideas from Objective-C, Rust, Haskell, Ruby, Python, C#, CLU, and far too many others to list」；② Apple 官方书 TSPL 原版自述：「builds on the best of C and Objective-C, without the constraints of C compatibility」；③ `swift.org/about`（官方）：「safer than C-based languages」+「named parameters brought forward from Objective-C」；④ 独立课件（USC CSE 330）：「multi-paradigm」「introduced as an alternative to using Objective-C」。判据二选：c-family（生态位）vs ml-family（设计血统，Lattner 列表含 Rust/Haskell 为反证侧） | **c-family**（生态位判据：官方自述承接 C/ObjC + 取代 ObjC 之生态位；项目先例 `C# → dotnet-family` / `Java → jvm-family` / `Node.js → L4-web` 均按生态位判，非设计血统）—— 已按此落库（2026-10-07） |
| J9 | iPhone 主图连通边 | **为何需裁定**：主图只渲染两端皆 master 的边（J1 已证）——iPhone 的既有边（`ios→iphone` / `iphone→ipad`）另一端均非 master → iPhone 在主图 = 0 度孤点；J6（`IBM PC` 升 `8086`）/ V1（`TCP/IP` 补 `tcp-ip→www`）先例均把主图孤点当缺陷修。修法三条且各带代价：加 MM 边（语义弱）/ 换 master（动 45 条触顶表）/ 接受孤点（破先例）→ 故列裁定 | **A 案已批（2026-10-07）：`ibm-pc-1981 → iphone-2007`**（conceptual_inf 🚩 弱边：个人计算平台移动化延伸；0 warn、相邻卷、零规格改动，同 `Apple II → IBM PC` 弱边先例）。落库时否决 `unix-1971 → iphone-2007`（非相邻跨卷 = 首例，2 条常驻 warn 结构性不可补齐）；血统事实改存 `ios` summary（「基于 Mac OS X 技术」）。备选 C（升 `mac-os-x` 为 master）因动触顶表未采 |

## A 节点表（45；`★` = master）

| # | id | label | layer / column | year | w | 判据一句话 | 来源域名（待核） |
|---:|---|---|---|---:|---|---|---|
| 1 | mac-os-x-2001 | Mac OS X | L1/os | 2001 | major | NeXT 血统的商品化 UNIX 桌面系统 | apple.com / computerhistory.org |
| 2 | rest-2000 | REST | L4/web | 2000 | major | Fielding 博士论文总结的 Web 架构风格 | ics.uci.edu / doi.org |
| 3 | c-sharp-2000 | C# | L2/dotnet-family | 2000 | major | 微软 .NET 平台旗舰语言（PDC 公开） | microsoft.com / docs |
| 4 | sqlite-2000 | SQLite | L3/relational | 2000 | minor | 嵌入式 SQL 引擎（无处不在的数据库） | sqlite.org |
| 5 | wikipedia-2001 | 维基百科 | L4/web | 2001 | major | 协作编辑百科（wiki 模式大众化） | wikipedia.org / computerhistory.org |
| 6 | dotnet-framework-2002 | .NET Framework | L2/dotnet-family | 2002 | major | 微软托管运行时平台（CLR） | microsoft.com |
| 7 | llvm-2003 ★ | LLVM | L2/toolchain | 2003 | major | 模块化编译器基础设施（后成 Clang 生态） | llvm.org / doi.org |
| 8 | amd64-2003 | AMD64 | L0/arch | 2003 | major | x86 64 位扩展（Opteron 首发） | amd.com |
| 9 | gfs-2003 | GFS | L3/distributed | 2003 | major | 谷歌集群文件系统（大数据存储奠基） | doi.org / research.google |
| 10 | firefox-2004 | Firefox | L4/web | 2004 | major | Mozilla 开源浏览器（IE 垄断终结者） | mozilla.org |
| 11 | ubuntu-2004 | Ubuntu | L1/os | 2004 | minor | Debian 系 Linux 发行版大众化 | ubuntu.com |
| 12 | mapreduce-2004 ★ | MapReduce | L3/distributed | 2004 | epic | 分布式批处理范式（Hadoop 之魂） | doi.org / research.google |
| 13 | git-2005 | Git | L2/toolchain | 2005 | major | 分布式版本控制（Linux 内核催生） | git-scm.com / kernel.org |
| 14 | nvidia-g80-2006 | NVIDIA G80 | L0/accelerator | 2006 | major | 统一着色器 GPU（GPGPU 起点） | nvidia.com / doi.org |
| 15 | bigtable-2006 | BigTable | L3/nosql | 2006 | major | 宽列分布式存储模型（HBase 之祖） | doi.org / research.google |
| 16 | hadoop-2006 | Hadoop | L3/distributed | 2006 | major | 开源 MapReduce + HDFS 栈（大数据代名词） | hadoop.apache.org |
| 17 | dbn-2006 | DBN | L5/nn | 2006 | minor | 深度信念网络（深度网络复兴起点） | doi.org / science.org |
| 18 | amazon-s3-2006 ★ | Amazon S3 | L4/cloud-api | 2006 | epic | 对象存储即服务（云基础设施起点） | aws.amazon.com |
| 19 | iphone-2007 ★ | iPhone | L0/device | 2007 | epic | 智能手机时代（多点触控 + 应用生态） | apple.com / computerhistory.org |
| 20 | ios-2007 | iOS | L1/os | 2007 | major | Apple 移动系统（首发 iPhone OS） | apple.com |
| 21 | clojure-2007 | Clojure | L2/lisp-family | 2007 | minor | JVM 上的 Lisp 方言（并发设计） | clojure.org |
| 22 | cuda-2007 ★ | CUDA | L2/toolchain | 2007 | epic | GPU 通用计算平台（GPGPU 编程标准） | nvidia.com / docs.nvidia.com |
| 23 | dynamo-2007 | Dynamo | L3/distributed | 2007 | minor | Amazon 高可用键值存储设计（Cassandra 之源） | doi.org / aws.amazon.com |
| 24 | scikit-learn-2010 | scikit-learn | L5/framework | 2010 | minor | Python 科学计算栈（统计学习工具）；核验改年：首个公开发布 2010-02-01（2007 GSoC 入 year_note） | scikit-learn.org / jmlr.org |
| 25 | v8-2008 | V8 | L2/scripting | 2008 | major | JS 高性能引擎（Chrome 首发） | v8.dev / chromium.org |
| 26 | android-2008 | Android | L1/os | 2008 | major | 开源移动系统（Linux 内核） | android.com / computerhistory.org |
| 27 | github-2008 | GitHub | L4/web | 2008 | major | Git 托管平台（协作开发中心） | github.com / computerhistory.org |
| 28 | lxc-2008 | LXC | L4/container | 2008 | minor | Linux 容器工具（cgroups/namespaces） | linuxcontainers.org |
| 29 | cassandra-2008 | Cassandra | L3/nosql | 2008 | minor | 宽列 + 去中心化合流的分布式数据库 | cassandra.apache.org / doi.org |
| 30 | spdy-2009 | SPDY | L1/net | 2009 | minor | HTTP 性能改良协议（HTTP/2 前身） | chromium.org / rfc-editor.org |
| 31 | go-2009 ★ | Go | L2/scripting | 2009 | major | 谷歌系统语言（并发内建，GC） | go.dev |
| 32 | nodejs-2009 ★ | Node.js | L4/web | 2009 | major | 服务端 JavaScript 运行时（V8 + 事件循环） | nodejs.org |
| 33 | windows-7-2009 | Windows 7 | L1/os | 2009 | major | NT 内核线大众版本 | microsoft.com |
| 34 | ipad-2010 | iPad | L0/device | 2010 | major | 平板计算品类确立 | apple.com / computerhistory.org |
| 35 | risc-v-2010 | RISC-V | L0/arch | 2010 | minor | 开放指令集架构（Berkeley 出身） | riscv.org / berkeley.edu |
| 36 | spark-2010 | Spark | L3/distributed | 2010 | major | 内存化集群计算（MapReduce 改进） | spark.apache.org / doi.org |
| 37 | c-plus-plus-11-2011 | C++11 | L2/c-family | 2011 | major | C++ 现代标准（lambda / 移动语义） | iso.org / isocpp.org |
| 38 | typescript-2012 | TypeScript | L2/scripting | 2012 | major | JS 超集（可选的静态类型） | typescriptlang.org / microsoft.com |
| 39 | alexnet-2012 ★ | AlexNet | L5/nn | 2012 | epic | ImageNet 夺冠 CNN（深度网络时代引爆点） | doi.org |
| 40 | raspberry-pi-2012 | Raspberry Pi | L0/device | 2012 | minor | 低价单板计算机（教育 / 创客） | raspberrypi.com |
| 41 | docker-2013 | Docker | L4/container | 2013 | epic | 容器镜像化交付（开发-运维范式） | docker.com |
| 42 | html5-2014 | HTML5 | L4/web | 2014 | major | Web 平台标准（W3C 推荐） | w3.org |
| 43 | swift-2014 | Swift | L2/c-family | 2014 | major | Apple 现代系统语言（接 Objective-C 位） | swift.org / apple.com |
| 44 | gan-2014 | GAN | L5/nn | 2014 | major | 对抗生成网络（生成模型转折） | doi.org / arxiv.org |
| 45 | kubernetes-2014 | Kubernetes | L4/container | 2014 | epic | 容器编排标准（Borg 血统） | kubernetes.io / cncf.io |

覆盖：device 3 · arch 2 · accelerator 1 · os 5 · net 1 · c-family 2 · lisp-family 1 · scripting 3 · toolchain 3 · dotnet-family 2 · relational 1 · nosql 2 · distributed 5 · web 6 · container 3 · cloud-api 1 · nn 3 · framework 1 = 45。空列：ml-family / jvm-family / algol-family（该年代无产物或备选见 §G）。

## B 列占用矩阵（同列同年 ≤1 ✓，预检 0 error）

```
L0_hardware/accelerator   2006            L0_hardware/arch    2003 2010
L0_hardware/device        2007 2010 2012  L1_system/net       2009
L1_system/os              2001 2004 2007 2008 2009
L2_language/c-family      2011 2014        L2_language/dotnet-family 2000 2002
L2_language/lisp-family   2007             L2_language/scripting     2008 2009 2012
L2_language/toolchain     2003 2005 2007
L3_data/distributed       2003 2004 2006 2007 2010
L3_data/nosql             2006 2008        L3_data/relational  2000
L4_delivery/cloud-api     2006             L4_delivery/container 2008 2013 2014
L4_delivery/web           2000 2001 2004 2008 2009 2014
L5_ai/framework           2007             L5_ai/nn            2006 2012 2014
```

## C1 跨卷边（v2 → v3，31 条；`[MM]` = master→master 主图可见；`🚩` = 弱边）

| # | source → target | relation | 依据一句话 |
|---:|---|---|---|
| 1 | c-plus-plus-1985 → llvm-2003 [MM] | enables | LLVM 以 C++ 实现并提供 C/C++ 编译基础设施 |
| 2 | c-plus-plus-1985 → c-plus-plus-11-2011 | direct_fork | C++ 标准委员会修订（C++0x） |
| 3 | c-plus-plus-1985 → go-2009 [MM] | conceptual_inf | Go 诞生于对 C++ 服务端复杂度的回应（Pike 自述） |
| 4 | javascript-1995 → v8-2008 | enables | V8 为 JavaScript 高性能引擎 |
| 5 | javascript-1995 → typescript-2012 | direct_fork | TypeScript 为 JS 超集（编译到 JS） |
| 6 | javascript-1995 → nodejs-2009 [MM] | enables | Node.js 运行 JavaScript（V8 引擎） |
| 7 | linux-1991 → android-2008 | enables | Android 基于 Linux 内核 |
| 8 | linux-1991 → ubuntu-2004 | direct_fork | 发行版：内核打包为产品（同 `red-hat` 先例） |
| 9 | linux-1991 → git-2005 | enables | Torvalds 为 Linux 内核协作开发 Git |
| 10 | linux-1991 → lxc-2008 | enables | LXC 基于 Linux cgroups / namespaces |
| 11 | http-1-1-1997 → amazon-s3-2006 [MM] | enables | S3 以 HTTP/REST API 暴露对象存储 |
| 12 | http-1-1-1997 → spdy-2009 | direct_fork | SPDY 为 HTTP 传输改良线（HTTP/2 前身） |
| 13 | java-1995 → c-sharp-2000 | conceptual_inf | C# 设计与 Java 同期竞位（VM 平台语言） |
| 14 | java-1995 → clojure-2007 | enables | Clojure 运行于 JVM（Java 平台） |
| 15 | java-1995 → mapreduce-2004 [MM] | enables 🚩 | MapReduce 主流实现（Hadoop 栈）运行于 JVM |
| 16 | lenet-1989 → alexnet-2012 | conceptual_inf | 卷积网络血统（LeNet → AlexNet 文献引用） |
| 17 | lenet-1989 → dbn-2006 | conceptual_inf 🚩 | 神经网络复兴期（梯度法传统，近似同侪，同 v2 `lstm` 先例） |
| 18 | netscape-navigator-1994 → firefox-2004 | direct_fork | Mozilla/Firefox 源自 Netscape 开源代码 |
| 19 | html-4-0-1997 → html5-2014 | direct_fork | HTML 标准演进（WHATWG/W3C） |
| 20 | apache-http-server-1995 → rest-2000 | conceptual_inf | REST 出自 HTTP/Apache 设计者 Fielding |
| 21 | mosaic-1993 → wikipedia-2001 | conceptual_inf 🚩 | 图形浏览器普及催生 Web 协作内容形态 |
| 22 | google-search-1998 → gfs-2003 | enables | 搜索规模驱动 GFS 集群存储 |
| 23 | next-workstation-1988 → mac-os-x-2001 | direct_fork | NeXTSTEP 成为 Mac OS X 基础（收购 NeXT） |
| 24 | intel-80386-1985 → amd64-2003 | direct_fork | x86 64 位扩展（AMD64） |
| 25 | berkeley-risc-1981 → risc-v-2010 | direct_fork | RISC-V 出自 Berkeley（RISC 血统） |
| 26 | playstation-1994 → nvidia-g80-2006 | conceptual_inf 🚩 | 游戏图形需求推动 GPU 统一着色器架构 |
| 27 | ibm-pc-1981 → iphone-2007 [MM] | conceptual_inf | 个人计算平台的移动化延伸（J9 A 案 🚩 弱边；同 `Apple II → IBM PC` 先例） |
| 28 | sql-92-1992 → sqlite-2000 | conceptual_inf | 嵌入式 SQL 引擎实现（同 `mysql` 先例） |
| 29 | python-1991 → scikit-learn-2010 | enables | scikit-learn 为 Python 库 |
| 30 | arm-1985 → raspberry-pi-2012 | enables | Raspberry Pi 采用 ARM 平台 |
| 31 | windows-nt-1993 → windows-7-2009 | direct_fork | NT 内核线延续 |

## C2 卷内边（v3 → v3，20 条）

| # | source → target | relation | 依据一句话 |
|---:|---|---|---|
| 32 | mac-os-x-2001 → ios-2007 | direct_fork | iOS 基于 Mac OS X（Apple 自述） |
| 33 | ios-2007 → iphone-2007 | enables | iPhone 首发搭载 iPhone OS |
| 34 | iphone-2007 → ipad-2010 | direct_fork | iPad 放大 iPhone（同 OS 线） |
| 35 | llvm-2003 → swift-2014 | enables | Swift 编译器建于 LLVM |
| 36 | c-sharp-2000 → dotnet-framework-2002 | conceptual_inf | C# 为 .NET 平台旗舰语言（同期设计） |
| 37 | nvidia-g80-2006 → cuda-2007 | enables | CUDA 随 G80 架构首发 |
| 38 | gfs-2003 → bigtable-2006 | enables | BigTable 以 GFS 为存储层 |
| 39 | gfs-2003 → hadoop-2006 | conceptual_inf | HDFS 借鉴 GFS 设计 |
| 40 | mapreduce-2004 → hadoop-2006 | **convergence** | 第二入边：MapReduce 计算 + GFS 存储合流 |
| 41 | bigtable-2006 → cassandra-2008 | conceptual_inf | Cassandra 数据模型基于 BigTable |
| 42 | dynamo-2007 → cassandra-2008 | **convergence** | 第二入边：去中心化（Dynamo）+ 宽列（BigTable）合流 |
| 43 | amazon-s3-2006 → dynamo-2007 | conceptual_inf 🚩 | AWS 存储基础设施的另一线 |
| 44 | mapreduce-2004 → spark-2010 | conceptual_inf | RDD 论文对 MapReduce 的内存化改进 |
| 45 | git-2005 → github-2008 | enables | GitHub 以 Git 为核心 |
| 46 | v8-2008 → nodejs-2009 | enables | Node.js 构建于 V8 |
| 47 | lxc-2008 → docker-2013 | direct_fork | Docker 初版基于 LXC |
| 48 | docker-2013 → kubernetes-2014 | conceptual_inf | 容器编排兴起（Borg 血统） |
| 49 | cuda-2007 → alexnet-2012 [MM] | enables | AlexNet 以 CUDA 训练（物质使能，非概念借鉴） |
| 50 | dbn-2006 → alexnet-2012 | conceptual_inf | 深度网络复兴传统（Hinton） |
| 51 | alexnet-2012 → gan-2014 | conceptual_inf | 深度网络上的生成模型转折 |

## D 预算核算

- 出度 max = **5**（`linux-1991`：既有 1〔red-hat〕+ 新 4 = 顶格 ≤5）；次高 4（`c-plus-plus-1985` / `javascript-1995`）✓；卷内 max = 2（`gfs` / `mapreduce`）✓
- 主图入边 ≤8：新 master 各 1 条 MM 入边 ✓；主图 master 子图 **25 节点 / 19 边 → 35 节点 / 27 边**（+6 跨卷 MM + 2 卷内 MM：`cuda → alexnet` / `docker → kubernetes`）
- **跨卷 v2→v3 = 31 条**（J7 已批：上限 ≤32）；其中 master→master = **6 条**（J7 已批：上限 ≤7）：`c++→llvm` / `c++→go` / `js→nodejs` / `http→s3` / `java→mapreduce` / `ibm-pc→iphone`
- `convergence`：+2（`hadoop` / `cassandra`）→ 站内 3 → **5**
- `paradigm_shift`：v3 消耗 0（留 v4）→ 站内 0/8
- 分卷 H 2000：草稿主标轮需高 **1886.7** ✓（0 违规 / 0 灰字降级 / 0 余违规）
- 主图段 [2000,2015)：35px/年 × 15 = **525px**，10 个 master（2003–2014）——落库后 `measure` 全量复检（V2 段 [1980,2000) 445/500 先例）

## E 禁用词预筛

`measure --draft` 内置检查（25 词）→ **0 命中** ✓（另：`iPhone` / `iPad` / `Android` 等机构 / 产品名不触表）

## F 来源清单

每节点 ≥1 域名已列于 §A；落库时按 V1/V2 同法逐条抓取正文核对后记 `checked_at`（2026-10-07）。年份口径复核结论 3 项：`scikit-learn` 定 **2010**（首个公开发布 2010-02-01；2007 GSoC 立项入 `year_note`，id 同步 `-2010`）· `spark` 定 **2010**（2010 开源；RDD 论文 2012 入 `year_note`）· `cuda` 定 **2007**（SDK 发布；2006-11 随 G80 宣布入 `year_note`）——均按「首个公开可用版本」定年。

## G 备选（未入 45）

`windows-xp-2001`（同列同年与 `mac-os-x-2001` 冲突；今回取 macOS 线保 iOS 血统——可下批换）· `windows-2000`（NT 线可选锚点）· `imagenet-2009`（数据集；父源线弱）· `mongodb-2009` / `redis-2009`（同列同年互斥 + 父源待定）· `google-chrome-2008`（同列同年与 `github-2008` 冲突）· `caffe-2013` / `npm-2010` / `mariadb-2009` / `aws-lambda-2014` / `dynamodb-2012`（卷内可挂父源，备补）· `kindle-2007`（同列同年与 `iphone-2007` 冲突）· `xbox-360-2005` · `windows-vista-2006`（年份口径分歧）· `scala-2004` / `kotlin-2011`（jvm-family 线）· `hive-2008` / `pig-2006`（Hadoop 生态）· `kafka-2011` · `elasticsearch-2010` · `wordpress-2003` · `youtube-2005` · `facebook-2004` · `itunes-store-2003` · `bitcoin-2008`（列归属待议）。
