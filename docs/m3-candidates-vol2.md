# M3 卷 2 候选清单（G-A 待批）

状态：2026-10-05 · 草案 = `data/candidates/vol-2.draft.json`（`npm run measure -- --draft` 预检 **0 error / 0 warn**；主标轮需高 1820 / H 2000 ✓ 免拉伸）· 45 = 8 master + 37·获批后落 `data/vol-2.json`

## 0. 待裁定（1 项）

| # | 事项 | 背景 | 提案 |
|---|---|---|---|
| J5 | **跨卷边总量上限 8 → 12**（master→master ≤5 不变） | V2 需 **11 条** pre/v1→v2 边：卷 2 的多条主线植根 v1（GUI ← Alto、RISC ← S/360、CNN ← 感知机/反向传播、SQL-92 ← SQL、C++ ← C、Python ← C、WWW ← TCP/IP、Linux ← UNIX…）。非 master 跨卷边在任何视图都不渲染（J1 已证）→ 无视觉密度成本；主图可见的 master→master 仍 4 条 ≤5 | 放宽至 12（吸收 11 条 + 留 1 余量）；维持 8 则需砍 AI 线（Neocognitron/LeNet）或 SQL-92 或 GUI 链 |

已登记 5 条出卷边中 **4 条保留**（C→C++ / 8086→IBM PC / TCP-IP→WWW / UNIX→Linux），**Apple II→IBM PC 保留**（记为弱边）；另新增 6 条（见 §C）。

## A 节点表（45；`★` = master）

| # | id | label | layer / column | year | w | 判据一句话 | 来源域名（待核） |
|---:|---|---|---|---:|---|---|---|
| 1 | neocognitron-1980 | Neocognitron | L5/nn | 1980 | minor | Fukushima 层级特征网络，CNN 思想前身 | doi.org / scholar |
| 2 | ibm-pc-1981 ★ | IBM PC | L0/device | 1981 | epic | 开放架构个人计算机，PC 产业起点 | ibm.com / computerhistory.org |
| 3 | ms-dos-1981 | MS-DOS | L1/os | 1981 | major | IBM PC 操作系统（微软首个 OS） | microsoft.com / computerhistory.org |
| 4 | berkeley-risc-1981 | Berkeley RISC | L0/arch | 1981 | major | Patterson 精简指令集项目，RISC 浪潮源头 | doi.org / berkeley.edu |
| 5 | compaq-portable-1982 | Compaq Portable | L0/device | 1982 | minor | 首台 PC 兼容机（干净室 BIOS） | computerhistory.org |
| 6 | apple-lisa-1983 | Apple Lisa | L0/device | 1983 | major | 首台商用 GUI 个人计算机 | computerhistory.org / apple.com |
| 7 | macintosh-1984 | Macintosh | L0/device | 1984 | major | GUI 大众化机型 | computerhistory.org / apple.com |
| 8 | c-plus-plus-1985 ★ | C++ | L2/c-family | 1985 | major | C with Classes 商品化（cfront），多范式 | doi.org / stroustrup.com |
| 9 | intel-80386-1985 | Intel 80386 | L0/device | 1985 | major | 32 位 x86，PC 进入 32 位时代 | intel.com |
| 10 | arm-1985 | ARM | L0/arch | 1985 | major | 低功耗 RISC 架构（Acorn），后世移动霸主 | arm.com |
| 11 | mips-r2000-1986 | MIPS R2000 | L0/arch | 1986 | major | 商用 RISC 处理器（Stanford MIPS 血统） | computerhistory.org / doi.org |
| 12 | acorn-archimedes-1987 | Acorn Archimedes | L0/device | 1987 | minor | ARM1 首发机器 | computerhistory.org |
| 13 | sparc-1987 | SPARC | L0/arch | 1987 | major | Sun 的 RISC 架构（Berkeley RISC II 血统） | oracle.com / doi.org |
| 14 | next-workstation-1988 | NeXT 工作站 | L0/device | 1988 | minor | Jobs 的图形工作站（NeXTSTEP） | computerhistory.org |
| 15 | intel-80486-1989 | Intel 80486 | L0/device | 1989 | major | 集成 FPU/缓存的 x86 | intel.com |
| 16 | lenet-1989 | LeNet | L5/nn | 1989 | major | LeCun 用反向传播训练的卷积网络（手写识别） | doi.org / computerhistory.org |
| 17 | windows-3-0-1990 | Windows 3.0 | L1/os | 1990 | major | 首个成功的 Windows GUI 版本 | computerhistory.org / microsoft.com |
| 18 | www-1991 ★ | WWW | L4/web | 1991 | epic | 万维网（CERN 公开），信息时代起点 | w3.org / computerhistory.org |
| 19 | linux-1991 ★ | Linux | L1/os | 1991 | epic | 开源内核，OS 生态新极 | kernel.org / computerhistory.org |
| 20 | python-1991 ★ | Python | L2/scripting | 1991 | major | 通用脚本语言（易读性设计） | python.org |
| 21 | sql-92-1992 | SQL-92 | L3/relational | 1992 | major | SQL 国际标准（ANSI/ISO） | rfc-editor/iso / doi.org |
| 22 | solaris-1992 | Solaris | L1/os | 1992 | minor | Sun 的 UNIX 商业化系统 | oracle.com / computerhistory.org |
| 23 | thinkpad-1992 | ThinkPad | L0/device | 1992 | minor | IBM 经典笔记本线 | lenovo.com / computerhistory.org |
| 24 | mosaic-1993 | Mosaic | L4/web | 1993 | major | 首个流行图形浏览器（NCSA） | computerhistory.org |
| 25 | windows-nt-1993 | Windows NT | L1/os | 1993 | major | 微软 NT 内核系统（Win32 线） | microsoft.com / computerhistory.org |
| 26 | apple-newton-1993 | Apple Newton | L0/device | 1993 | minor | 早期 PDA（移动设备探索） | computerhistory.org |
| 27 | netscape-navigator-1994 | Netscape Navigator | L4/web | 1994 | major | 浏览器商业化（Mosaic 团队） | computerhistory.org |
| 28 | red-hat-linux-1994 | Red Hat Linux | L1/os | 1994 | minor | Linux 发行版商业化 | redhat.com / computerhistory.org |
| 29 | playstation-1994 | PlayStation | L0/device | 1994 | major | 3D 游戏时代（MIPS R3000） | sony.com / computerhistory.org |
| 30 | java-1995 ★ | Java | L2/jvm-family | 1995 | major | 「一次编写到处运行」（JVM） | oracle.com / doi.org |
| 31 | javascript-1995 ★ | JavaScript | L2/scripting | 1995 | major | 浏览器脚本语言（Netscape） | ecma-international.org / computerhistory.org |
| 32 | mysql-1995 | MySQL | L3/relational | 1995 | major | 开源 SQL 数据库（LAMP 环） | mysql.com / oracle.com |
| 33 | apache-http-server-1995 | Apache HTTP Server | L4/web | 1995 | major | 开源 web 服务器（NCSA 血统） | apache.org |
| 34 | ssl-1995 | SSL | L1/net | 1995 | major | 网络加密层（Netscape），HTTPS 基础 | rfc-editor.org / netscape 档案 |
| 35 | windows-95-1995 | Windows 95 | L1/os | 1995 | major | 大众 32 位 Windows（GUI+DOS 线合流） | microsoft.com / computerhistory.org |
| 36 | css-1996 | CSS | L4/web | 1996 | major | 样式与结构分离（W3C） | w3.org |
| 37 | postgresql-1996 | PostgreSQL | L3/relational | 1996 | major | 开源关系数据库（SQL 标准实现） | postgresql.org |
| 38 | http-1-1-1997 ★ | HTTP/1.1 | L1/net | 1997 | major | web 协议标准化（RFC 2068） | rfc-editor.org |
| 39 | ecmascript-1997 | ECMAScript | L2/scripting | 1997 | minor | JS 标准化（ECMA-262） | ecma-international.org |
| 40 | html-4-0-1997 | HTML 4.0 | L4/web | 1997 | minor | 网页标记语言标准化（W3C） | w3.org |
| 41 | mac-os-8-1997 | Mac OS 8 | L1/os | 1997 | minor | Mac OS 线延续 | apple.com / computerhistory.org |
| 42 | lstm-1997 | LSTM | L5/nn | 1997 | minor | 长短期记忆网络（序列建模） | doi.org |
| 43 | imac-1998 | iMac | L0/device | 1998 | major | Apple 消费化回归（全面 USB 化） | apple.com / computerhistory.org |
| 44 | google-search-1998 | Google 搜索 | L4/web | 1998 | major | PageRank 搜索 | google.com / computerhistory.org |
| 45 | windows-98-1998 | Windows 98 | L1/os | 1998 | minor | Win9x 线延续 | microsoft.com |

覆盖：device 12 · arch 4 · os 9 · net 2 · c-family 1 · scripting 3 · jvm-family 1 · relational 3 · web 7 · nn 3 = 45。空列：lisp-family / ml-family / algol-family / dotnet-family / toolchain / nosql / distributed / container / cloud-api / accelerator / framework（该年代无产物或少量备选，见 §G）。

## B 列占用矩阵（同列同年 ≤1 ✓，预检 0 error）

```
L0/arch         1981 1985 1986 1987        L0/device  1981 1982 1983 1984 1985 1987 1988 1989 1992 1993 1994 1998
L1/os           1981 1990 1991 1992 1993 1994 1995 1997 1998      L1/net  1995 1997
L2/scripting    1991 1995 1997             L2/c-family 1985    L2/jvm-family 1995
L3/relational   1992 1995 1996             L4/web     1991 1993 1994 1995 1996 1997 1998
L5/nn           1980 1989 1997
```

## C 边清单（45 节点入边；`[跨]` = 跨卷；`🚩` = 弱边）

| target | source → target | relation | 依据一句话 |
|---|---|---|---|
| neocognitron-1980 | perceptron-1958 → | conceptual_inf [跨] | 层级视觉网络承接感知机传统（Fukushima 自述） |
| ibm-pc-1981 | intel-8086-1978 → | enables [跨] | IBM PC 采用 8086（8088） |
| ms-dos-1981 | ibm-pc-1981 → | enables | PC-DOS 随 IBM PC 发布 |
| berkeley-risc-1981 | ibm-system-360-1964 → | conceptual_inf [跨] 🚩 | RISC 以精简指令集回应 CISC 复杂度（Patterson–Ditzel 1980 批判对象） |
| compaq-portable-1982 | ibm-pc-1981 → | direct_fork | 干净室 BIOS 兼容机（PC 克隆开端） |
| apple-lisa-1983 | xerox-alto-1973 → | conceptual_inf [跨] | GUI/桌面隐喻自 PARC 传入 Apple |
| macintosh-1984 | apple-lisa-1983 → | direct_fork | Mac 为 Lisa 的（降价）后继 |
| c-plus-plus-1985 | c-language-1972 → | direct_fork [跨] | C++ = C with Classes（cfront，Stroustrup） |
| intel-80386-1985 | ibm-pc-1981 → | conceptual_inf 🚩 | PC 平台需求推动 x86 32 位化 |
| arm-1985 | berkeley-risc-1981 → | direct_fork | ARM 设计据 Berkeley RISC 论文（Wilson/Hauser） |
| mips-r2000-1986 | berkeley-risc-1981 → | direct_fork | Stanford MIPS 与 Berkeley RISC 同源（Hennessy） |
| acorn-archimedes-1987 | arm-1985 → | enables | ARM1 首发机器 |
| sparc-1987 | berkeley-risc-1981 → | direct_fork | SPARC 源自 Berkeley RISC II |
| next-workstation-1988 | macintosh-1984 → | conceptual_inf | Jobs 离 Apple 后建 NeXT，延续图形工作站路线 |
| intel-80486-1989 | intel-80386-1985 → | direct_fork | x86 线：486 = 386 + FPU/缓存 |
| lenet-1989 | backpropagation-1974 → | enables [跨] | LeNet 以反向传播训练卷积网络 |
| windows-3-0-1990 | ms-dos-1981 → | enables | Windows 3.0 运行于 DOS（GUI 层） |
| www-1991 | tcp-ip-1974 → | enables [跨] | WWW 运行于 TCP/IP（content-spec §3.4 例） |
| linux-1991 | unix-1971 → | conceptual_inf [跨] | 类 UNIX 内核的重写（Torvalds） |
| python-1991 | c-language-1972 → | enables [跨] | CPython 以 C 实现 |
| sql-92-1992 | sql-1974 → | direct_fork [跨] | SQL 标准系列（SQL-86/89/92） |
| solaris-1992 | sparc-1987 → | enables | Solaris 为 Sun/SPARC 平台系统 |
| thinkpad-1992 | ibm-pc-1981 → | direct_fork | IBM PC 线的便携形态 |
| mosaic-1993 | www-1991 → | enables | Mosaic 为 WWW 的首个流行客户端 |
| windows-nt-1993 | windows-3-0-1990 → | direct_fork | NT 实现 Win32 API（Windows 线兼容） |
| apple-newton-1993 | macintosh-1984 → | conceptual_inf | Apple 移动设备线的起点 |
| netscape-navigator-1994 | mosaic-1993 → | direct_fork | Netscape 由 Mosaic 团队创立（代码续承） |
| red-hat-linux-1994 | linux-1991 → | direct_fork | 发行版：内核打包为产品 |
| playstation-1994 | mips-r2000-1986 → | enables | PS1 采用 MIPS R3000A |
| java-1995 | c-plus-plus-1985 → | conceptual_inf | Java 语法承 C/C++ 传统（去指针/GC） |
| javascript-1995 | www-1991 → | enables | 浏览器网页需要嵌入式脚本 |
| mysql-1995 | sql-92-1992 → | conceptual_inf | 依 SQL 标准的开源实现 |
| apache-http-server-1995 | mosaic-1993 → | direct_fork | Apache 源自 NCSA HTTPd（同源代码线） |
| ssl-1995 | netscape-navigator-1994 → | enables | SSL 随 Netscape 发布（HTTPS 基础） |
| windows-95-1995 | windows-3-0-1990 → | direct_fork | Win9x 线：GUI 延续 |
| windows-95-1995 | ms-dos-1981 → | **convergence** | 第二入边：DOS 线合流（win95 入度 2） |
| css-1996 | www-1991 → | enables | W3C 样式表标准（结构/样式分离） |
| postgresql-1996 | sql-92-1992 → | conceptual_inf | 开源关系数据库按 SQL 标准实现 |
| http-1-1-1997 | www-1991 → | direct_fork | HTTP 协议标准化演进（RFC 2068/2616） |
| ecmascript-1997 | javascript-1995 → | direct_fork | JS 标准化为 ECMA-262 |
| html-4-0-1997 | css-1996 → | conceptual_inf | HTML 4.0 采纳样式表体系（结构/表现分离） |
| mac-os-8-1997 | macintosh-1984 → | direct_fork | Mac OS 线延续 |
| lstm-1997 | lenet-1989 → | conceptual_inf 🚩 | 神经网络复兴期的序列建模（梯度法传统，近似同侪） |
| imac-1998 | macintosh-1984 → | direct_fork | Mac 消费化线（iMac） |
| google-search-1998 | www-1991 → | enables | PageRank 构建于 Web 链接图 |
| windows-98-1998 | windows-95-1995 → | direct_fork | Win9x 线延续 |
| ibm-pc-1981 | apple-ii-1977 → | conceptual_inf [跨] 🚩 | Apple II 验证消费市场，促 IBM 入场（登记边保留） |

## D 预算核算

- 出度 max = **5**（`www-1991`：mosaic / javascript / css / http-1-1 / google-search）≤5 ✓；次高 4（macintosh）✓
- master→master 主图入度 ≤8 ✓；主图节点 16 → 24（+8 新 master）
- **跨卷 vol-1→vol-2 = 11 条**（J5 裁定）：master→master 4 条（c→c++ / tcp-ip→www / unix→linux / c→python）≤5 ✓
- `paradigm_shift`：v2 消耗 0（留 v3/v4）✓ ≤8
- `convergence`：+1（windows-95 入度 2：win3.0 + ms-dos）→ 站内累计 3 条

## E 禁用词预筛

`measure --draft` 内置检查（25 词）→ **0 命中** ✓

## F 来源清单

每节点 ≥1 域名已列于 §A；**全部「待核」**——落数据时按 V1 同法逐条抓取正文核对后记 `checked_at`。

## G 备选（未入 45）

`perl-1987`（脚本语言奠基，父源 sh/perl 线被跨卷额占用）· `haskell-1990`（ml-family 延续，父源 ML 为跨卷）· `dns-1983`（父源 ARPANET 为跨卷）· `gcc-1987`（父源 C 为跨卷；其 `gcc→linux` 线未画）· `smtp-1982` · `db2-1983` · `objective-c-1984` · `windows-98` 备选同族 · `sun-sparcstation-1989` · `game-boy-1989` · `vax-11-780-1977`（v1 备选）· `turbo-pascal-1983` · `visual-basic-1991` · `ie-1995` · `xml-1998` · `wifi-802-11-1997`。
