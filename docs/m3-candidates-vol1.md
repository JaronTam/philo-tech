# M3 卷 1 候选清单（G-A 待批）

状态：2026-10-05 · **G-A 已批**（J1 跨卷边 ≤8/≤5 · J2 UNIX 1971 · J3 四项 epic · J4 接受三条弱边）+ 已落数据（`data/vol-1.json` 45 节点 / 48 边；validate 58/57 全绿）· 草案 = `data/candidates/vol-1.draft.json`（`npm run measure -- --draft` 预检 0 error / 0 warn；主标轮需高 1959.4 / H 2000 ✓ 免拉伸）· 45 = 现有 7 + 新增 38

## 0. 待裁定（4 项）——已批（2026-10-05，全按提案）

落数据时的两处实测修正：① `transistor → IBM 7090`（enables，全晶体管化大型机）补入边清单以连通「半导体/微机」与「主机/软件」两分量（连通性 37+13 → 50 节点单分量）；② 早期机器群（8 节点：图灵机 / EDVAC / Baby / Mark 1 / Colossus / ENIAC / UNIVAC / ABC）的桥边 = `EDVAC → IBM 701`，被 pre→v1 上限（8/8）挡，维持登记（M1 起即有该分量）。

| # | 事项 | 背景 | 提案 |
|---|---|---|---|
| J1 | **跨卷边上限修订**（pre→v1 需 8 条，规范现 ≤5） | 卷首节点（UNIVAC/IBM 701/关系模型）唯一诚实父源在 pre 卷；非 master 跨卷边在任何视图都不渲染（主图只渲染两端皆 master，分卷视图要求两端同卷）→ 纯血统用途，无视觉密度成本 | content-spec §3 + prd2 §9 + validate 改「相邻卷跨卷边 ≤8（总量）；其中 master→master ≤5（主图可见）」 |
| J2 | **UNIX 年份 1969 → 1971** | UNIX 1969 与 Multics 1969 同列（os）同年 → 触「同列同年」挤压；content-spec §1 口径 = 首个公开可用版本年（UNIX v1 手册 1971-11） | 主标 1971 + `year_note`：「1969 于 PDP-7 首版；1971 首版手册公开」 |
| J3 | **epic 配额** | 提案 4 项新 epic（FORTRAN / UNIX / C / TCP-IP）→ 站内 epic 累计 12（≈15 预算，v2–v4 余 3） | 维持 4 项；若需为 WWW/Transformer 留量 → FORTRAN 降 major |
| J4 | **弱边接受**（3 条） | 见 §C 表内 ★ 标记：Alto←CTSS、6502←8080、COBOL←FORTRAN 为「影响级」边，均可引证但非强因果 | 接受（保留叙事连贯）或换 §G 备选 |

## A 节点表（45；列 `weight` 提案值，`★` = master）

| # | id | label | layer / column | year | w | 判据一句话 | 来源域名（待核） |
|---:|---|---|---|---:|---|---|---|
| 1 | transistor-1947 ★ | 晶体管 | L0/device | 1947 | epic | 现有 | nobelprize.org |
| 2 | manchester-baby-1948 ★ | Manchester Baby | L0/device | 1948 | major | 现有 | curation.cs.manchester.ac.uk |
| 3 | manchester-mark-1-1949 | Manchester Mark 1 | L0/device | 1949 | major | 现有 | curation.cs.manchester.ac.uk |
| 4 | univac-1-1951 | UNIVAC I | L0/device | 1951 | major | 首台商用电子计算机（Eckert–Mauchly 脱离 ENIAC 后创立） | computerhistory.org / smithsonianmag.com |
| 5 | ibm-701-1952 | IBM 701 | L0/device | 1952 | major | IBM 首台商用科学计算机，打孔卡业务转入电子计算 | ibm.com/ibm/history |
| 6 | ibm-704-1954 | IBM 704 | L0/device | 1954 | major | 首台量产磁芯存储计算机，FORTRAN 目标机 | ibm.com/ibm/history |
| 7 | fortran-1957 | FORTRAN | L2/algol-family | 1957 | epic | 首个高级程序设计语言（Backus, IBM 704） | ibm.com / softwarepreservation.org |
| 8 | integrated-circuit-1958 ★ | 集成电路 | L0/device | 1958 | epic | 现有 | ti.com / nobelprize.org |
| 9 | cobol-1959 | COBOL | L2/algol-family | 1959 | major | 商业数据处理标准语言（CODASYL） | computerhistory.org |
| 10 | ibm-7090-1959 | IBM 7090 | L0/device | 1959 | minor | 全晶体管大型机，CTSS 宿主 | ibm.com/ibm/history |
| 11 | algol-60-1960 | ALGOL 60 | L2/algol-family | 1960 | major | 首份形式化语言报告（BNF），后续语言语法祖本 | doi.org（Revised Report） |
| 12 | adaline-1960 | ADALINE | L5/nn | 1960 | minor | 首个自适应线性神经元（Widrow–Hoff 学习律） | DOI（Widrow & Hoff 1960） |
| 13 | perceptron-1958 | 感知机 | L5/nn | 1958 | major | 现有 | doi.org |
| 14 | lisp-1958 ★ | LISP | L2/lisp-family | 1958 | epic | 现有 | doi.org |
| 15 | ctss-1961 | CTSS | L1/os | 1961 | major | 首个实用分时系统（MIT，演示多用户交互） | computerhistory.org / mit.edu |
| 16 | basic-1964 | BASIC | L2/algol-family | 1964 | major | 面向非专业学生的交互语言（Kemeny–Kurtz） | doi.org / dartmouth.edu |
| 17 | ibm-system-360-1964 | IBM System/360 | L0/arch | 1964 | major | 首个系列化兼容指令集架构，主机产业标准 | ibm.com/ibm/history |
| 18 | pdp-8-1965 | PDP-8 | L0/device | 1965 | major | 首台量产小型机（晶体管化、低价） | computerhistory.org |
| 19 | os-360-1966 | OS/360 | L1/os | 1966 | major | 首个大规模 OS 家族（软件危机之源，Brooks） | ibm.com/ibm/history |
| 20 | simula-67-1967 | Simula 67 | L2/algol-family | 1967 | major | 首个面向对象语言（类/继承），ALGOL 60 扩展 | doi.org（Dahl–Nygaard） |
| 21 | arpanet-1969 | ARPANET | L1/net | 1969 | major | 首个分组交换网络，互联网祖先 | internetsociety.org / computerhistory.org |
| 22 | multics-1969 | Multics | L1/os | 1969 | major | 分时/安全/文件系统的系统化设计，UNIX 前身 | multicians.org |
| 23 | relational-model-1970 ★ | 关系模型 | L3/relational | 1970 | major | Codd 论文：以谓词逻辑/集合论定义数据关系 | doi.org（Codd 1970） |
| 24 | pascal-1970 | Pascal | L2/algol-family | 1970 | major | 结构化教学语言（Wirth），ALGOL 系延续 | doi.org / computerhistory.org |
| 25 | pdp-11-1970 | PDP-11 | L0/device | 1970 | major | 影响最深的小型机（UNIX 宿主、C 的目标机） | computerhistory.org |
| 26 | unix-1971 ★ | UNIX | L1/os | 1971 | epic | 首个广泛传播的可移植 OS（贝尔实验室） | bell-labs.com / doi.org |
| 27 | intel-4004-1971 ★ | Intel 4004 | L0/device | 1971 | epic | 现有 | intel.com |
| 28 | email-1971 | 电子邮件 | L1/net | 1971 | minor | ARPANET 网络邮件（Tomlinson @ 符号） | computerhistory.org |
| 29 | sh-1971 | Unix shell | L2/scripting | 1971 | minor | 首个命令解释器脚本语言（Thompson shell） | bell-labs.com |
| 30 | c-language-1972 ★ | C 语言 | L2/c-family | 1972 | epic | 系统级可移植语言，UNIX 重写而生 | bell-labs.com / doi.org |
| 31 | ml-1973 | ML | L2/ml-family | 1973 | major | 首个带类型推断的函数式语言（Milner, LCF） | doi.org |
| 32 | ethernet-1973 | 以太网 | L1/net | 1973 | major | 局域网标准（Metcalfe, PARC） | doi.org（Metcalfe–Boggs） |
| 33 | xerox-alto-1973 | Xerox Alto | L0/device | 1973 | major | 首台个人工作站（GUI/鼠标/位图） | computerhistory.org |
| 34 | tcp-ip-1974 ★ | TCP/IP | L1/net | 1974 | epic | 互联网互联协议族（Cerf–Kahn） | doi.org |
| 35 | sql-1974 | SQL | L3/relational | 1974 | major | System R 关系查询语言（SEQUEL） | doi.org |
| 36 | intel-8080-1974 | Intel 8080 | L0/device | 1974 | major | 首款广泛使用的 8 位微处理器（Altair/CP/M） | intel.com |
| 37 | backpropagation-1974 | 反向传播 | L5/nn | 1974 | minor | Werbos 论文：多层网络反向传播训练 | werbos 论文档案（umich/nsf） |
| 38 | cpm-1974 | CP/M | L1/os | 1974 | major | 首个微机 OS 标准（Kildall, 8080） | computerhistory.org |
| 39 | scheme-1975 | Scheme | L2/lisp-family | 1975 | minor | 极简 λ 演算方言（Sussman–Steele） | dspace.mit.edu（AI Memo） |
| 40 | mos-6502-1975 | MOS 6502 | L0/device | 1975 | major | 廉价 8 位 CPU，家用机浪潮芯片 | computerhistory.org / 6502.org |
| 41 | yacc-1975 | yacc | L2/toolchain | 1975 | minor | 编译器构造工具（Johnson, UNIX） | bell-labs.com |
| 42 | apple-ii-1977 | Apple II | L0/device | 1977 | major | 首款大众消费计算机（Wozniak） | apple.com / computerhistory.org |
| 43 | vms-1977 | OpenVMS | L1/os | 1977 | minor | VAX 旗舰 OS（RSX 团队设计） | vmssoftware.com / computerhistory.org |
| 44 | intel-8086-1978 | Intel 8086 | L0/device | 1978 | major | x86 架构起点（IBM PC 之 CPU 前身） | intel.com |
| 45 | oracle-1979 | Oracle | L3/relational | 1979 | major | 首个商用关系数据库（SQL 产品化） | oracle.com / computerhistory.org |

覆盖：device 16 · arch 1 · os 6 · net 4 · algol-family 6 · c-family 1 · lisp-family 2 · ml-family 1 · scripting 1 · toolchain 1 · relational 3 · nn 3 = 45。空的列：jvm-family / dotnet-family / nosql / distributed / web / container / cloud-api / accelerator / framework（该年代无对应产物，符合预期）。

## B 列占用矩阵（同列同年 ≤1 ✓）

```
L0/arch         1964
L0/device       1947 1948 1949 1951 1952 1954 1958 1959 1965 1970 1971 1973 1974 1975 1977 1978
L1/net          1969 1971 1973 1974
L1/os           1961 1966 1969 1971 1974 1977
L2/algol-family 1957 1959 1960 1964 1967 1970
L2/c-family     1972      L2/lisp-family 1958 1975     L2/ml-family 1973
L2/scripting    1971      L2/toolchain   1975
L3/relational   1970 1974 1979
L5/nn           1958 1960 1974
```

## C 边清单（新增 38 节点的入边；`★` = 弱边待 J4）

| target | source → target | relation | 依据一句话 |
|---|---|---|---|
| univac-1-1951 | eniac-1945 → | enables | Eckert–Mauchly 团队以 ENIAC/EDVAC 经验建造 UNIVAC（跨卷） |
| ibm-701-1952 | hollerith-tabulator-1890 → | direct_fork | IBM 由打孔卡数据处理线转入电子计算（跨卷） |
| ibm-704-1954 | ibm-701-1952 → | direct_fork | 704 为 701 后继：磁芯存储 + 索引寄存器 |
| fortran-1957 | ibm-704-1954 → | enables | FORTRAN 为 704 设计（Backus 团队） |
| cobol-1959 | fortran-1957 → ★ | conceptual_inf | FORTRAN 证明自动编程可行，商业语言随后（CODASYL） |
| ibm-7090-1959 | ibm-704-1954 → | direct_fork | 7090 为 704 线全晶体管化后继 |
| algol-60-1960 | fortran-1957 → | conceptual_inf | ALGOL 58/60 讨论吸收 FORTRAN 实践，语法形式化（BNF） |
| adaline-1960 | perceptron-1958 → | conceptual_inf | Widrow 自适应学习律延续感知机学习规则线 |
| ctss-1961 | ibm-7090-1959 → | enables | CTSS 建于 MIT IBM 7090 |
| basic-1964 | fortran-1957 → | conceptual_inf | BASIC 语法取自 FORTRAN（Kemeny–Kurtz，面向学生） |
| ibm-system-360-1964 | ibm-704-1954 → | direct_fork | IBM 主机线集大成：兼容系列架构 |
| pdp-8-1965 | transistor-1947 → | enables | 晶体管化使小型机（低价、低耗）成为可能 |
| os-360-1966 | ibm-system-360-1964 → | enables | OS/360 为 S/360 系列而写 |
| simula-67-1967 | algol-60-1960 → | direct_fork | Simula 为 ALGOL 60 的仿真扩展（类/继承） |
| arpanet-1969 | ctss-1961 → | conceptual_inf | ARPA 网络动因 = 分时计算机资源共享（Licklider） |
| multics-1969 | ctss-1961 → | conceptual_inf | Multics 分时设计承 CTSS 经验（同一 MIT 社区） |
| relational-model-1970 | russell-principia-mathematica-1910 → | conceptual_inf | Codd 以谓词逻辑定义关系演算（跨卷） |
| pascal-1970 | algol-60-1960 → | conceptual_inf | Wirth 以 ALGOL 60 为基设计 Pascal |
| pdp-11-1970 | pdp-8-1965 → | direct_fork | DEC 小型机线（PDP-8 → PDP-11） |
| unix-1971 | multics-1969 → | conceptual_inf | Thompson/Ritchie 在 Multics 参与者带动下做简化版（content-spec §6 例） |
| email-1971 | arpanet-1969 → | enables | 网络邮件随 ARPANET 主机间文件传输演化 |
| sh-1971 | unix-1971 → | enables | shell 为 UNIX 交互环境而造 |
| c-language-1972 | unix-1971 → | enables | C 为在 PDP-11 上重写 UNIX 而设计 |
| c-language-1972 | algol-60-1960 → | **convergence** | 第二入边（ALGOL→BCPL→C 血统）——多源汇聚标记 |
| ml-1973 | algol-60-1960 → | enables | ML 语法取 ALGOL 块结构（LCF 证明器元语言） |
| ml-1973 | lisp-1958 → | **convergence** | 函数式传统（λ 演算→Lisp）汇入 ML——多源汇聚标记 |
| ethernet-1973 | arpanet-1969 → | conceptual_inf | Metcalfe 由 ARPANET/ALOHAnet 经验设计以太网 |
| xerox-alto-1973 | ctss-1961 → ★ | conceptual_inf | PARC 个人工作站承接 ARPA 分时社区交互计算议程 |
| tcp-ip-1974 | arpanet-1969 → | enables | TCP/IP 为 ARPANET 互联而设计（取代 NCP） |
| sql-1974 | relational-model-1970 → | enables | SEQUEL 实现关系模型查询（System R） |
| intel-8080-1974 | intel-4004-1971 → | direct_fork | Intel 微处理器线（4004 → 8008 → 8080） |
| backpropagation-1974 | perceptron-1958 → | conceptual_inf | 多层训练问题源自感知机局限（Werbos） |
| cpm-1974 | intel-8080-1974 → | enables | CP/M 为 8080 机器而写 |
| scheme-1975 | lisp-1958 → | direct_fork | Scheme 为 Lisp 的极简 λ 演算方言 |
| mos-6502-1975 | intel-8080-1974 → ★ | conceptual_inf | 第二代 8 位 μP（成本崩溃线） |
| yacc-1975 | c-language-1972 → | enables | yacc 用 C 实现、服务 UNIX 工具链 |
| apple-ii-1977 | mos-6502-1975 → | enables | Apple II 采用 6502 |
| vms-1977 | pdp-11-1970 → | conceptual_inf | VMS 由 RSX-11M（PDP-11）团队设计 |
| intel-8086-1978 | intel-8080-1974 → | direct_fork | 8086 = x86 起点，8080 线延续 |
| oracle-1979 | sql-1974 → | enables | Oracle 首个商用 SQL 关系数据库 |

写于 vol-2（出卷边 5 条，V2 批落文，先登记）：`c-language-1972 → c-plus-plus-1985` direct_fork；`intel-8086-1978 → ibm-pc-1981` enables；`tcp-ip-1974 → www-1991` enables；`unix-1971 → linux-1991` conceptual_inf；`apple-ii-1977 → ibm-pc-1981` conceptual_inf。

## D 预算核算（对预检输出复算）

- 出度 max = 4（algol-60）≤5 ✓；次高 3（arpanet / ctss / ibm-704 / intel-8080）✓
- master→master 主图入度 max = 1 ✓ ≤8；主图节点 12 → 16（+UNIX/关系模型/C/TCP-IP）
- 跨卷 pre→v1：现有 5 + 新 3 = **8**（> 现上限 5 → J1 裁定）
- 跨卷 v1→v2：5 条（见上）✓ 3–5
- `paradigm_shift`：v1 消耗 0（留 v3/v4）✓ ≤8
- `convergence`：2 条（c-language / ml）→「收敛」toggle 在真实数据首次可用（M2 起 disabled）

## E 禁用词预筛

`measure --draft` 内置检查（25 词子串匹配）→ **0 命中** ✓（label 全表见 §A）

## F 来源清单

每节点 ≥1 域名已列于 §A（官方 > DOI > 博物馆/百科）；**全部「待核」**——写数据时逐条打开确认后记 `checked_at`（content-spec §5），失效换源或补 `archive_url`。

## G 备选（未入 45，可换入）

`altair-8800-1975`（Altair 8800，↔ MOS 6502 换位候选）· `unix-v7-1979`（UNIX v7 传播版）· `vax-11-780-1977`（与 Apple II 同列同年，需换位）· `cdc-6600-1964`（超级计算机线）· `cray-1-1976` · `plankalkul-1948/1972`（年份口径未裁，前史语言线延伸）· `modula-2-1978` · `ibm-1401-1959` · `ingres-1974` · `make-1976` · `cdc-6600`、`cray-1` 因父源弱未入。
