# Redis 学习笔记

## 1. Redis入门

### 1.1 简介

Redis 全称 **REmote DIctionary Server**（远程字典服务），是一个完全开源的、高性能的 Key-Value 数据库。是一个基于**内存**的 key-value 结构数据库，使用 C 语言开发、开源、高性能，官方数据可达 100000+ QPS（每秒查询次数），是互联网技术领域应用最广泛的**存储中间件**。它存储的 value 类型比较丰富，也被称为结构化的 NoSql 数据库。

**官网：** https://redis.io

**中文网：** https://www.redis.net.cn/

**key-value 结构存储：**

<img src="./redis.assets/image-20221130173459174.png" alt="key-value结构存储" style="zoom:50%;" />

**主要特点：**

- 基于内存存储，读写性能高
- 适合存储热点数据（热点商品、资讯、新闻）
- 企业应用广泛

NoSql（Not Only SQL），不仅仅是 SQL，泛指**非关系型数据库**。NoSql 数据库并不是要取代关系型数据库，而是关系型数据库的补充。

**关系型数据库(RDBMS)：**

- Mysql
- Oracle
- DB2
- SQLServer

**非关系型数据库(NoSql)：**

- Redis
- Mongo db
- MemCached

**深入理解**

<img src="./redis.assets/redis_qa_official.png" alt="官网关于 Redis 的问答" style="zoom:50%;" />

**核心总结：**

- **数据结构复杂**：相比传统 K-V 型数据库，Redis 能够支撑更复杂的数据类型，已经远远超出了缓存的范围，可以实现很多复杂的业务场景，并且还在不断发展更多的业务场景；
- **数据保存在内存，但是持久化到硬盘**：数据全部保存在内存，读写性能非常高，是集中式缓存的不二之选；数据又持久化到硬盘，意味着 Redis 上保存的数据非常安全，目前完全可以当做一个数据库来用。

所以，官方对 Redis 的作用已经定位成三个方面：**Cache（缓存）**、**Database（数据库）**、**Vector Search（向量搜索）**。

<img src="./redis.assets/redis_cloud_positioning.png" alt="Redis Cloud 官方定位截图" style="zoom:50%;" />

### 1.2 客户端连接

**redis-cli.exe**

<img src="./redis.assets/image-20221130182207020.png" alt="image-20221130182207020" style="zoom:50%;" /> 

通过redis-cli.exe命令默认连接的是本地的redis服务，并且使用默认6379端口。也可以通过指定如下参数连接：

- -h ip地址
- -p 端口号
- -a 密码（如果需要）

设置Redis服务密码，修改redis.windows.conf

```
requirepass 123456
```

**注意：**

- 修改密码后需要重启Redis服务才能生效
- Redis配置文件中 # 表示注释

重启Redis后，再次连接Redis时，需加上密码，否则连接失败。

```
redis-cli.exe -h localhost -p 6379 -a 123456
```

<img src="./redis.assets/image-20221130183253539.png" alt="image-20221130183253539" style="zoom:50%;" /> 

此时，-h 和 -p 参数可省略不写。

### 1.3 图形工具

默认提供的客户端连接工具界面不太友好，同时操作也较为麻烦，接下来，引入一个Redis客户端图形工具。

<img src="./redis.assets/image-20221130183746355.png" alt="image-20221130183746355" style="zoom:50%;" /> 

**新建连接**

<img src="./redis.assets/image-20221130192210418.png" alt="image-20221130192210418" style="zoom: 33%;" />  

**连接成功** 

<img src="./redis.assets/image-20221130192310916.png" alt="image-20221130192310916" style="zoom: 33%;" />  

### 1.4 Redis 生态：2024 年的 Redis

在 2023 年之前，Redis 是一个纯粹的开源数据库；近两年 Redis 正在进行华丽的蜕变，从一个缓存产品变成一整套生态服务。

**产品与服务体系：**

| 产品 | 说明 |
| --- | --- |
| Redis OSS | 传统开源服务体系（以前常用的开源体系） |
| Redis Stack | 基于 Redis OSS 打造的更完整技术栈，在 OSS 功能基础上提供高级扩展功能 |
| Redis Cloud | 云服务，基于 AWS、Azure 等公有云，提供一整套完整的企业服务 |
| Redis Enterprise | 企业级收费产品服务 |
| Redis Insight | Redis 官方推出的安装管理套件 / 图形化客户端 |

**要点：**

- **Redis Insight**：官方图形化客户端，以往使用 Redis 需要寻找各种第三方客户端，现在开箱即用；并且 Redis Insight 也可以在 Redis Cloud 上直接使用；
- 功能层面目前形成了 **Redis OSS** 与 **Redis Stack** 两套服务体系：OSS 是传统开源体系，Stack 基于 OSS 打造、提供更高级的扩展功能（基于 Redis Cloud 提供服务）。

## 2. Redis部署

**四种部署方式对比：**

| 部署方式 | 节点组成 | 自动故障转移 | 数据分片 | 主要作用 | 适用场景 |
| --- | --- | --- | --- | --- | --- |
| 单机部署 | 1 个节点 | ❌ | ❌ | 快速上手 | 开发测试、小规模应用 |
| 主从部署 | 1 主 + N 从 | ❌ 需人工切换 | ❌ | 数据冗余、读扩展 | 读写分离 |
| 哨兵部署 | 1 主 + N 从 + 哨兵集群 | ✅ | ❌ | 自动故障转移 | 生产高可用 |
| 集群部署 | N 主 + N 从 | ✅ | ✅ 16384 个哈希槽 | 分片 + 高可用 | 大数据量、高并发 |

### 2.1 Windows

#### 2.1.1 Redis 下载

Redis安装包分为windows版和Linux版：

- Windows版下载地址：https://github.com/microsoftarchive/redis/releases
- Linux版下载地址： https://download.redis.io/releases/

#### 2.1.2 Redis 安装

**1）在Windows中安装Redis**

Redis的Windows版属于绿色软件，直接解压即可使用，解压后目录结构如下：

<img src="./redis.assets/image-20221130180657152.png" alt="image-20221130180657152" style="zoom:50%;" /> 

**windows后台启动redis操作步骤**

1. 下载安装redis
官网下载，解压即安装

2. 安装redis服务到任务管理器【执行完该步骤，检查任务管理器服务一栏，会出现redis服务】

redis-server --service-install redis.windows.conf --loglevel verbose

3. 启动服务【可以打开任务管理器的服务，找到redis手动开启】
redis-server --service-start

4. 停止服务【可以打开任务管理器的服务，找到redis手动关闭】
redis-server --service-stop

#### 2.1.3 Redis 服务启动与停止

**redis-server.exe redis.windows.conf**

<img src="./redis.assets/image-20221130181950351.png" alt="image-20221130181950351" style="zoom:50%;" /> 

Redis服务默认端口号为 **6379** ，通过快捷键**Ctrl + C** 即可停止Redis服务

当Redis服务启动成功后，可通过客户端进行连接。

### 2.2 单机

#### 2.2.1 检查安装 gcc 环境

Redis 由 C 语言编写，运行需要 C 环境，因此需要先安装 gcc。

```shell
# 关闭防火墙
systemctl stop firewalld.service
# 查看防火墙状态
firewall-cmd --state
# 卸载防火墙（可选）
yum remove firewalld
# 检查 gcc 版本
gcc --version
# 安装 gcc
yum install gcc
```

#### 2.2.2 下载安装 Redis

```shell
# 安装应用养成良好习惯，文件归类
mkdir -p /opt/software/redis
# 进入 redis 文件夹，使用 wget 下载
cd /opt/software/redis
wget https://download.redis.io/redis-stable.tar.gz
# 解压下载的 redis 包
tar -xzf redis-stable.tar.gz
# 进入 redis-stable 目录，使用 make install 编译并安装
# 安装完成后 /usr/local/bin 会生成相应的服务
cd redis-stable
make install
# 检查是否成功生成
ll /usr/local/bin
```

安装后 `/usr/local/bin` 下生成的文件：

| 文件 | 说明 |
| --- | --- |
| redis-benchmark | 性能测试工具 |
| redis-check-aof | 修复有问题的 AOF 文件 |
| redis-check-rdb | 修复有问题的 RDB 文件 |
| redis-sentinel | 哨兵（集群/高可用使用） |
| redis-server | Redis 服务器启动命令 |
| redis-cli | 客户端，操作入口 |

#### 2.2.3 启动 Redis

```shell
# Redis 源码路径下启动
./src/redis-server
# 使用 /usr/local/bin 路径下启动（该目录下）
redis-server
```

> **注意：直接启动无法后台运行。** 上面的启动方式无法在后台运行，退出之后直接关闭了 Redis 服务，所以还需要针对 Redis 做一些设置。

#### 2.2.4 配置 Redis

```shell
# 修改当前 Redis 目录下的 redis.conf 文件（vim 打开后没有行号可输入 ":set number"）
vim redis.conf
```

需要修改的内容（行号对应 Redis 7.2.5 默认配置）：

| 配置项 | 设置值 | 行号 | 说明 |
| --- | --- | --- | --- |
| `bind` | `* -:::*` | 87 | 修改 bind 项，支持远程连接 |
| `daemonize` | `yes` | 309 | 开启守护进程，后台运行 |
| `logfile` | `/opt/software/redis/redis-stable/redis.log` | 355 | 指定日志文件目录 |
| `dir` | `/opt/software/redis` | 510 | 指定工作目录 |
| `requirepass` | `1qaz@WSX` | 1044 | 给默认用户设置密码（redis-cli 连接时需密码校验，自行学习可不设置） |
| `protected-mode` | `no` | 111 | 允许远程连接；**如果不设置密码必须将此设置关闭** |

修改完成后，使用配置文件启动 Redis，并用 redis-cli 连接测试。由于配置了安全密码，连接后需要先验证密码，否则报错：

```shell
redis-server redis.conf
redis-cli
auth 1qaz@WSX
```

#### 2.2.5 退出或关闭 Redis

```shell
# 退出 redis（仅退出客户端）
quit
# 关闭 redis 服务
redis-cli shutdown
```

### 2.3 主从Master-Slave

主从复制，是指将一台 Redis 服务器的数据，复制到其他的 Redis 服务器。前者称为**主节点（Master）**，后者称为**从节点（Slave）**；数据的复制是**单向**的，只能由主节点到从节点。默认情况下，每台 Redis 服务器都是主节点；一个主节点可以有多个从节点（或没有从节点），但一个从节点只能有一个主节点。

**整体架构（1 主 2 从）：**

```text
           客户端
    读/写 ↓        ↓ 读
   ┌───────────┐
   │  主节点    │ 192.168.75.129:6379
   │ (Master)  │
   └───────────┘
  同步 ↓       ↓ 同步
┌─────────┐ ┌─────────┐
│ 从节点   │ │ 从节点   │
│ .131:6379│ │ .132:6379│
└─────────┘ └─────────┘
```

#### 2.3.1 主从复制的作用

- **a）数据冗余**：主从复制实现了数据的热备份，是持久化之外的一种数据冗余方式。
- **b）故障恢复**：当主节点出现问题时，可以由从节点提供服务，实现快速的故障恢复；实际上是一种服务的冗余。
- **c）负载均衡**：在主从复制的基础上配合读写分离，主节点提供写服务、从节点提供读服务（写 Redis 时应用连接主节点，读 Redis 时应用连接从节点），分担服务器负载；尤其是在写少读多的场景下，通过多个从节点分担读负载，可以大大提高 Redis 服务器的并发量。
- **d）高可用基石**：主从复制还是哨兵和集群能够实施的基础，因此说主从复制是 Redis 高可用的基础。

#### 2.3.2 主从复制部署

主节点不需要做任何改变，从节点都需要修改配置加上主节点信息：

```shell
# 从节点 redis.conf 中添加主节点信息
replicaof 192.168.75.129 6379
```

配置完成后，在主库检查从节点信息：

```
127.0.0.1:6379> info Replication
# Replication
role:master
connected_slaves:2
slave0:ip=192.168.75.131,port=6379,state=online,offset=270,lag=1
slave1:ip=192.168.75.132,port=6379,state=online,offset=270,lag=1
...
```

#### 2.3.3 主从复制的缺点

- **复制延时、信号衰减**：所有的写操作都是先在 master 上操作，然后同步更新到 slave 上，从 master 同步到 slave 机器上有一定的延迟；系统繁忙时延迟问题更严重，slave 机器数量增加也会加剧该问题。
- **master 挂了怎么办**：默认情况下，不会在 slave 节点中自动重选一个 master，每次都要人工干预。

### 2.4 哨兵Sentinel

Redis 的主从复制主要用于实现数据的冗余备份和读分担，并不是为了提供高可用性。因此在系统高可用方面，单纯的主从架构无法很好的保证整个系统高可用。

#### 2.4.1 哨兵模式的原理

Redis 哨兵模式是通过在独立的哨兵节点上运行特定的哨兵进程来实现的。这些哨兵进程监控主从节点的状态，并在发现故障时自动完成故障发现和转移，并通知应用方，实现高可用性。

**架构示意：**

```text
        客户端 / 应用方
              ↑ 通知新主节点
      ┌─────────────────┐
      │ 哨兵集群 Sentinel×3 │（奇数个）
      └─────────────────┘
    监控 ↓           ↓ 监控
  ┌──────────┐   ┌──────────┐
  │ 主节点    │   │ 从节点 ×N │
  │ .129:6379│   └──────────┘
  └──────────┘
```

#### 2.4.2 哨兵工作流程

- **领导者选举**：启动时每个哨兵节点执行选举过程，其中一个哨兵节点被选为领导者（leader），负责协调其他哨兵节点。
  - 选举过程：每个在线的哨兵节点都可以成为领导者，向其它哨兵发 `is-master-down-by-addr` 命令，征求判断并要求将自己设置为领导者；其它哨兵可同意或拒绝；若票数 `>= num(sentinels)/2 + 1` 则成为领导者，否则继续选举。
- **监控主从节点**：哨兵节点通过发送命令周期性地检查主从节点的健康状态（主节点是否在线、从节点是否同步等）。发现主节点不可用，触发一次故障转移。
- **故障转移**：主节点被判定不可用后，哨兵会从当前从节点中选出一个新的主节点，并将其他从节点切换到新的主节点，系统继续提供服务而无需人工介入。
- **故障检测**：sentinel 向 master 发送心跳 PING 确认是否存活，若 master 在"一定时间范围"内不回应 PONG 或回复错误消息，该 sentinel 主观（单方面）认为 master 已不可用。
- **从节点筛选**：过滤掉不健康的（下线或断线）、没有回复过哨兵 ping 响应的从节点；选择从节点优先级最高的；选择复制偏移量最大（复制最完整）的从节点。当主节点出现故障，由领导者负责处理故障转移。
- **客户端重定向**：哨兵节点会通知客户端新的主节点的位置，使其能够与新的主节点建立连接并发送请求，确保客户端无缝切换。
- **从节点监控**：从节点出现故障时哨兵可将其下线，恢复正常后重新将其加入集群。

#### 2.4.3 客观下线

当主观下线的节点是主节点时，该哨兵节点会通过指令 `sentinel is-master-down-by-addr` 寻求其它哨兵节点对主节点的判断，当超过 **quorum（选举）个数**时，哨兵节点认为该主节点确实有问题，即**客观下线**（大部分哨兵节点都同意下线操作）。

#### 2.4.4 哨兵模式部署

**架构：** 3 台机器（`192.168.75.129/131/132`），每台各部署 1 个哨兵（端口 `26379`），监控主节点 `192.168.75.129:6379`。

主从配置无需修改，3 个机器都需要修改 `sentinel.conf` 配置，配置完成之后先从主节点开始启动哨兵，3 个机器配置相同：

```shell
# sentinel.conf 需要修改的内容（行号对应 Redis 7.2.5 默认配置）
protected-mode no                                # 第6行，关闭保护模式
daemonize yes                                    # 第15行，指定 sentinel 为后台启动
logfile /opt/software/redis/redis-stable/sentinel.log   # 第34行，指定日志存放路径
dir /opt/software/redis                          # 第73行，指定数据库存放路径
sentinel monitor mymaster 192.168.75.129 6379 2  # 第93行，监控主节点；mymaster 为主节点名称；最后的 2 表示至少需要 2 个哨兵节点同意才能判定主节点故障并进行故障转移
sentinel down-after-milliseconds mymaster 30000  # 第134行，判定服务器 down 掉的时间周期，默认 30000 毫秒（30 秒）
sentinel failover-timeout mymaster 180000        # 第234行，故障节点的最大超时时间为 180000（180 秒）
```

启动后检查哨兵状态：

```shell
redis-cli -p 26379 info sentinel
# master0:name=mymaster,status=ok,address=192.168.75.129:6379,slaves=2,sentinels=3
```

#### 2.4.5 故障转移演练

```shell
# 故障模拟：可以杀掉主节点的进程，也可以直接停掉主节点服务
ps aux | grep redis
redis-cli shutdown

# 观察哨兵日志，129 主节点下线，重新选举 131 为主节点
tail -f sentinel.log

# 重新启动 129 服务并观察日志，129 加入主从，此时主节点为 131 服务
redis-server redis.conf
tail -f sentinel.log
redis-cli -p 26379 info sentinel

# 停止哨兵
redis-cli -p 26379 shutdown
```

哨兵日志关键行（故障转移过程）：

```text
+sdown master mymaster 192.168.75.129 6379             # 主观下线
+new-epoch 4                                            # 新一轮选举
+vote-for-leader a04107c0b37ab2b32d852cd1d719a57f1a7b89877 4   # 投票选举领导者
+odown master mymaster 192.168.75.129 6379 quorum 3/2  # 客观下线
+switch-master mymaster 192.168.75.129 6379 192.168.75.131 6379  # 131 为新主节点
```

触发哨兵选举之后，会在后台更改 `redis.conf` 与 `sentinel.conf`（文件末尾追加 `# Generated by CONFIG REWRITE` 生成的内容，如 `replicaof 192.168.75.131 6379`），可以检查每台机器的文件末尾数据。

#### 2.4.6 哨兵使用建议与局限

**哨兵使用建议：**

- 哨兵节点的数量应为多个，哨兵本身应该集群，保证高可用
- 哨兵节点数应该是**奇数**
- 各个哨兵结点的配置应一致
- 如果哨兵节点部署在 Docker 等容器里面，尤其要注意端口号的正确映射

**哨兵模式并不能保证数据零丢失：**

1. **复制延迟**：从节点的数据是异步复制自主节点的，主节点故障时从节点可能还没完全同步最新数据，从而导致数据丢失。
2. **故障检测和转移时间**：Sentinel 检测到主节点故障并执行故障转移需要一定时间，期间主节点可能已接收一些写操作，但这些操作尚未被复制到从节点。
3. **网络分区**：发生网络分区（网络分裂）时，一部分节点可能与主节点失去联系；若此时主节点继续处理写操作，网络恢复之前这些操作可能不会被复制到从节点。
4. **多个从节点同时故障**：所有从节点同时故障或在故障转移之前与主节点失联时，主节点故障时将没有可用的从节点来提升为主节点。

### 2.5 集群Cluster

Redis 集群是 Redis 的一种**分布式运行模式**，通过分片（sharding）提供数据的自动分区和管理，实现数据的高可用性和可扩展性。

- 集群模式下，数据被分割成多个部分（称为**槽或 slots**），分布在多个 Redis 节点上；
- 集群中的节点分为主节点和从节点：**主节点**负责读写请求和集群信息的维护；**从节点**只进行主节点数据和状态信息的复制。

#### 2.5.1 Redis 集群的作用

- **数据分区（数据分片）**：集群最核心的功能。数据分散到多个节点，一方面突破了 Redis 单机内存大小的限制，存储容量大大增加；另一方面每个主节点都可以对外提供读服务和写服务，大大提高了集群的响应能力。
  - 单机内存过大还会带来其他问题：bgsave 和 bgrewriteaof 的 fork 操作可能导致主进程阻塞；主从环境下主机切换时可能导致从节点长时间无法提供服务；全量复制阶段主节点的复制缓冲区可能溢出。
- **高可用**：集群支持主从复制和主节点的自动故障转移（与哨兵类似）；当任一节点发生故障时，集群仍然可以对外提供服务。

#### 2.5.2 数据分片（哈希槽）

Redis 集群引入了**哈希槽**的概念：

- Redis 集群有 **16384 个哈希槽**（编号 0-16383）；
- 集群的每个节点负责一部分哈希槽；
- 每个 Key 通过 **CRC16 校验后对 16384 取余**来决定放置哪个哈希槽，再根据这个值找到对应的节点，自动跳转到该节点上进行存取操作。

以 3 个节点组成的集群为例：

| 节点 | 负责的哈希槽范围 |
| --- | --- |
| 节点 A | 0 - 5460 |
| 节点 B | 5461 - 10922 |
| 节点 C | 10923 - 16383 |

**主从复制模型：** 集群中具有 A、B、C 三个节点，如果节点 B 失败，整个集群会因缺少 5461-10922 这个范围的槽而不可用；为每个节点添加从节点 A1、B1、C1 后（三主三从），B 失败时集群选举 B1 为新的主节点继续服务；当 B 和 B1 都失败后，集群将不可用。

#### 2.5.3 集群部署

**集群环境：** 三主三从模式，3 台机器各部署 2 个 Redis 节点：`6379`（主）+ `6380`（从）。

```shell
# 创建集群配置文件夹，将下面的配置复制过去（另外两个机器重复这个过程）
mkdir -p /opt/software/redis/redis-stable/cluster
mkdir -p /opt/software/redis/cluster
vim ./cluster/redis_6379.conf
vim ./cluster/redis_6380.conf
```

**6379 配置（redis_6379.conf）：**

```shell
# 允许所有的IP地址
bind * -::*
# 后台运行
daemonize yes
# 允许远程连接
protected-mode no
# 开启集群模式
cluster-enabled yes
# 集群节点超时时间
cluster-node-timeout 5000
# 配置数据存储目录
dir "/opt/software/redis/cluster"
# 开启AOF持久化
appendonly yes
# 端口
port 6379
# log日志
logfile "/opt/software/redis/redis-stable/cluster/redis6379.log"
# 集群配置文件
cluster-config-file nodes-6379.conf
# AOF文件名
appendfilename "appendonly6379.aof"
# RDB文件名
dbfilename "dump6379.rdb"
```

**6380 配置（redis_6380.conf）：** 与 6379 相同，仅修改：`port 6380`、`logfile ".../redis6380.log"`、`cluster-config-file nodes-6380.conf`、`appendfilename "appendonly6380.aof"`、`dbfilename "dump6380.rdb"`。

```shell
# 配置文件准备完成之后，启动所有 redis 服务（用 cluster 配置文件）
redis-server ./cluster/redis_6379.conf
redis-server ./cluster/redis_6380.conf
# 检查服务
ps aux | grep redis

# 创建三主三从集群模式，每一个主节点带一个从节点
redis-cli --cluster create --cluster-replicas 1 \
  192.168.75.129:6379 192.168.75.129:6380 \
  192.168.75.131:6379 192.168.75.131:6380 \
  192.168.75.132:6379 192.168.75.132:6380

# 查看集群信息
redis-cli cluster info
# 查看单个节点信息
redis-cli info replication
# 查看集群节点身份信息
redis-cli cluster nodes
```

集群创建成功后的槽位分配与主从分布（关键输出）：

```text
>>> Performing hash slots allocation on 6 nodes...
Master[0] -> Slots 0 - 5460
Master[1] -> Slots 5461 - 10922
Master[2] -> Slots 10923 - 16383
Adding replica 192.168.75.131:6380 to 192.168.75.129:6379
...
Can I set the above configuration? (type 'yes' to accept): yes
>>> Nodes configuration updated
>>> Sending CLUSTER MEET messages to join the cluster
Waiting for the cluster to join
```

#### 2.5.4 集群数据读写

```shell
# 连接任意一个主节点（不加 -c 时，key 不在当前节点的槽位会报 MOVED）
redis-cli -h 192.168.75.129 -p 6379
```

直接连接读写可能会报 `MOVED` 错误——因为不同节点的槽位不同，提示去对应节点写入：

```
127.0.0.1:6379> set k1 v1
(error) MOVED 12706 192.168.75.132:6379
127.0.0.1:6379> set k2 v2
OK
```

开启路由规则 `-c` 后，重新写入数据恢复正常（自动跳转到槽位所在节点）：

```shell
redis-cli -c
# -> Redirected to slot [12706] located at 192.168.75.132:6379
set k1 b1
OK
```

#### 2.5.5 模拟故障转移

```shell
# 注意机器 ip 的区分
# 将 129 机器的主节点干掉（129 的 6379 服务）
redis-cli -p 6379 shutdown
# 查看 129 机器从节点工作日志（131 的 6380 日志）
cat redis6380.log
# 切换到 132 机器查看当前集群节点信息，131:6380 已经升为主节点
redis-cli cluster nodes
# 重新启动 129.6379 服务
redis-server ./cluster/redis_6379.conf
# 查看 129.6379 的节点信息，主节点变为从节点
redis-cli -p 6379 info replication
# 观察 131.6380 日志，129.6379 重新加入集群
```

**停止集群服务：**

```shell
redis-cli -p 6379 shutdown
redis-cli -p 6380 shutdown
```

### 2.6 文件目录与配置

**文件目录：**

| 目录 | 说明 |
| --- | --- |
| `/opt/software/redis/` | Redis 应用 |
| `/opt/software/redis/redis-stable` | Redis 应用根目录（源码解压目录） |
| `/opt/software/redis/cluster` | Redis 集群应用文件目录（日志、快照等信息） |
| `/opt/software/redis/redis-stable/cluster` | Redis 集群配置文件存放路径 |

**各部署方式的配置文件：**

| 部署方式 | 配置文件 | 所在目录 |
| --- | --- | --- |
| 单机 | `redis.conf` | `/opt/software/redis/redis-stable` |
| 主从 | `redis.conf`（从节点额外加 `replicaof`） | `/opt/software/redis/redis-stable` |
| 哨兵 | `sentinel.conf` | `/opt/software/redis/redis-stable` |
| 集群 | `cluster/redis_6379.conf`、`cluster/redis_6380.conf` | `/opt/software/redis/redis-stable/cluster` |

## 3. Redis 数据类型与常用命令

> 完整命令列表参考官方文档：https://redis.io/docs/latest/commands/

### 3.1 数据类型总览

Redis 存储的是 key-value 结构的数据，其中 key 是字符串类型，value 分为 5 种常用数据类型和 4 种扩展数据类型。

**常用数据类型：**
<img src="./redis.assets/image-20221130190150749.png" alt="五种常用数据类型特点速览" style="zoom:50%;" />
- 字符串 string
- 哈希 hash
- 列表 list
- 集合 set
- 有序集合 sorted set / zset

**扩展数据类型：**

- 位图 bitmap（基于 String，按位标记 0/1）
- 基数统计 HyperLogLog（基于 String，概率型去重计数）
- 地理位置 Geo（底层 ZSet，存储经纬度）
- 消息流 stream（Redis 5.0 引入，消息队列）

**数据类型一览：**

| 类型 | 底层实现 | 特点 | 典型场景 | 类似 Java 结构 |
| --- | --- | --- | --- | --- |
| string | 动态字符串 SDS | 最基础类型，可存文本/数字/二进制 | 缓存、计数器、分布式锁 | String |
| hash | 哈希表（小数据量用压缩列表） | field-value 映射 | 对象缓存 | HashMap |
| list | 快速列表 quicklist | 有序、可重复，双端操作 | 消息队列、列表 | LinkedList |
| set | 哈希表（全整数小集合用整数集合） | 无序、不重复 | 标签、点赞、共同关注 | HashSet |
| zset | 跳表 + 哈希表（小数据量用压缩列表） | 不重复、带 score 排序 | 排行榜 | TreeMap + 跳表 |
| bitmap | 基于 String | 按位存 0/1，极省内存 | 签到、在线状态、布隆过滤器 | BitSet |
| HyperLogLog | 基于 String | 概率型基数统计，误差约 0.81%，固定约 12KB | UV 统计 | — |
| Geo | 基于 ZSet | geohash 编码存经纬度 | 附近的人/商家、距离计算 | — |
| stream | radix tree（基数树） | 消息流，支持消费者组、ACK | 消息队列 | — |

### 3.2 string 字符串

Redis 中字符串类型常用命令：

- **SET** key value                               设置指定key的值
- **GET** key                                     获取指定key的值
- **SETEX** key seconds value              设置指定key的值，并将 key 的过期时间设为 seconds 秒
- **SETNX** key value                         只有在 key 不存在时设置 key 的值
- **MSET** key value [key value ...]        批量设置多个字符串键值对
- **MGET** key [key ...]                      批量获取多个字符串键值
- **APPEND** key value                       向 key 对应的 value 末尾追加字符串
- **STRLEN** key                                获取字符串长度
- **INCR** key                                    将 key 中存储的数字值加 1（原子操作）
- **DECR** key                                    将 key 中存储的数字值减 1（原子操作）
- **INCRBY** key increment                  将 key 中存储的数字值加上增量 increment
- **DECRBY** key decrement                 将 key 中存储的数字值减去增量 decrement

更多命令可以参考Redis中文网：https://www.redis.net.cn

**命令示例：**

```shell
> set name zhangsan
OK
> get name
zhangsan
> mset name lisi age 18        # 批量存储
OK
> mget name age                # 批量获取
lisi
18
> setex code 60 1234           # 设置值并指定 60 秒过期
OK
> setnx name wangwu            # name 已存在，设置失败返回 0
0
> append name " hello"         # 追加字符串，返回新字符串长度
10
> strlen name
10
> incr counter                 # 计数器自增
1
> incrby counter 10
11
> decr counter
10
```

> 原子加减常用在点赞数、库存、访问量等计数场景：`INCR` 系列命令是原子的，在高并发下不会出现数据错乱。

### 3.3 hash 哈希

Redis hash 是一个string类型的 field 和 value 的映射表，hash特别适合用于存储对象，常用命令：

- **HSET** key field value                    将哈希表 key 中的字段 field 的值设为 value
- **HSETNX** key field value               只有在字段 field 不存在时设置值
- **HGET** key field                          获取存储在哈希表中指定字段的值
- **HMSET** key field value [field value ...]   在一个哈希表 key 中存储多个键值对
- **HMGET** key field [field ...]          批量获取哈希表 key 中多个 field 的值
- **HDEL** key field [field ...]            删除存储在哈希表中的指定字段
- **HLEN** key                                   返回哈希表 key 中字段的数量
- **HKEYS** key                                 获取哈希表中所有字段
- **HVALS** key                                 获取哈希表中所有值
- **HGETALL** key                              获取哈希表 key 中所有的字段和值
- **HINCRBY** key field increment       为哈希表 key 中字段 field 的值加上增量 increment

<img src="./redis.assets/image-20221130193121969.png" alt="image-20221130193121969" style="zoom: 67%;" /> 

**命令示例：**

```shell
> hset user name zhangsan
1
> hset user age 18
1
> hget user name
zhangsan
> hmset user phone 13800000000 email zs@qq.com
OK
> hmget user name age phone
zhangsan
18
13800000000
> hgetall user
name
zhangsan
age
18
phone
13800000000
email
zs@qq.com
> hlen user
4
> hincrby user age 1             # 年龄 +1
19
> hkeys user
name
age
phone
email
> hdel user email
1
```

> 对象缓存场景：`HSET user:1001 name roy balance 1888`，一个 key 存一个对象的多个字段，比用 String 拼 JSON 更省内存、读写更高效。

### 3.4 list 列表

Redis 列表是简单的字符串列表，按照插入顺序排序，常用命令：

- **LPUSH** key value [value ...]       将一个或多个值插入到列表头部（左端）
- **RPUSH** key value [value ...]       将一个或多个值插入到列表尾部（右端）
- **LPOP** key                               移除并获取列表第一个元素
- **RPOP** key                               移除并获取列表最后一个元素
- **LRANGE** key start stop              获取列表指定范围内的元素（0 ~ -1 表示全部）
- **LINDEX** key index                       通过索引获取列表中的元素
- **LLEN** key                                获取列表长度
- **BLPOP** key [key ...] timeout      移出并获取列表的第一个元素，列表为空时阻塞等待 timeout 秒（timeout=0 一直阻塞）
- **BRPOP** key [key ...] timeout      移出并获取列表的最后一个元素，列表为空时阻塞等待 timeout 秒

<img src="./redis.assets/image-20221130193332666.png" alt="image-20221130193332666" style="zoom: 67%;" /> 

**命令示例：**

```shell
> lpush list01 a b c d           # 依次从左端插入，最终顺序 d c b a
4
> rpush list01 e f               # 从右端插入
6
> lrange list01 0 -1             # 查看全部元素
d
c
b
a
e
f
> lpop list01                    # 弹出左端元素
d
> rpop list01                    # 弹出右端元素
f
> llen list01
4
> lindex list01 0
c
> lrange list01 0 -1
c
b
a
e
```

> 组合玩法：栈（Stack）= LPUSH + LPOP；队列（Queue）= LPUSH + RPOP；阻塞队列（Blocking MQ）= LPUSH + BRPOP。常见应用：视频列表、签到列表、排队叫号、简化版消息队列。

### 3.5 set 集合

Redis set 是string类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据，常用命令：

- **SADD** key member [member ...]     向集合添加一个或多个成员（重复成员自动忽略）
- **SREM** key member [member ...]     移除集合中一个或多个成员
- **SMEMBERS** key                         返回集合中的所有成员
- **SCARD** key                              获取集合的成员数
- **SISMEMBER** key member              判断 member 是否存在于集合中
- **SRANDMEMBER** key [count]          从集合中随机选出 count 个成员（不删除）
- **SPOP** key [count]                       从集合中随机弹出 count 个成员（删除）
- **SINTER** key [key ...]                    返回所有给定集合的交集
- **SUNION** key [key ...]                   返回所有给定集合的并集
- **SDIFF** key [key ...]                      返回第一个集合与其他集合的差集

<img src="./redis.assets/image-20221130193532735.png" alt="image-20221130193532735" style="zoom: 67%;" /> 

**命令示例：**

```shell
> sadd like:1001 u001 u002 u003    # 点赞集合
3
> sadd like:1001 u001              # 重复成员忽略，返回 0
0
> scard like:1001                  # 点赞人数
3
> sismember like:1001 u001         # 是否点过赞
1
> smembers like:1001
u001
u002
u003
> sadd A a b c
3
> sadd B b c d
3
> sinter A B                       # 交集 → 共同关注
b
c
> sunion A B                       # 并集 → 朋友圈的人
a
b
c
d
> sdiff A B                        # 差集 → 推荐好友（A 有而 B 没有）
a
```

> 典型应用：微信抽奖（SADD 参与 + SRANDMEMBER/SPOP 抽奖）、点赞/收藏/标签（SADD/SREM/SISMEMBER/SCARD）、社交关系（SINTER 共同关注、SDIFF 推荐好友）。

### 3.6 zset 有序集合

Redis有序集合是string类型元素的集合，且不允许有重复成员。每个元素都会关联一个double类型的分数，集合根据分数升序排序。常用命令：

- **ZADD** key score member [score member ...]    向有序集合添加一个或多个成员（带分数）
- **ZRANGE** key start stop [WITHSCORES]          按分数升序返回指定索引区间内的成员
- **ZREVRANGE** key start stop [WITHSCORES]      按分数降序返回指定索引区间内的成员
- **ZSCORE** key member                               返回指定成员的分数
- **ZINCRBY** key increment member                 对指定成员的分数加上增量 increment
- **ZCARD** key                                          获取有序集合的成员数
- **ZRANK** key member                                 返回指定成员的排名（升序，从 0 开始）
- **ZREM** key member [member ...]                移除有序集合中的一个或多个成员
- **ZUNIONSTORE** destkey numkeys key [key ...]   计算多个有序集合的并集并存入 destkey
- **ZINTERSTORE** destkey numkeys key [key ...]   计算多个有序集合的交集并存入 destkey

<img src="./redis.assets/image-20221130193951036.png" alt="image-20221130193951036" style="zoom: 67%;" /> 

**完整命令演示（字符串 → 哈希 → 列表 → 集合 → 有序集合串联演练）：**

```shell
> 127.0.0.1@6379 connected!
> set name kunkun
OK
> setex code 10 1234
OK
> get code
null
> set name ikun
OK
> setnx name ikun
0
> hset user name zhangsan
1
> hset user age 18
1
> hget user name
zhangsan
> hget user age
18
> hdel user age
1
> hget user age
null
> hget user name
zhangsan
> hset user age 18
1
> hset user phone 1123456
1
> hkeys user
name
age
phone
> hvals user
zhangsan
18
1123456
> hgetall user
name
zhangsan
age
18
phone
1123456
> lpush list01 sing dance rap basketball cai
5
> lpush list01 java go python
8
> lpush list01 java go python
11
> lrange 0 10
ERR wrong number of arguments for 'lrange' command
> lrange list01 0 10
python
go
java
python
go
java
cai
basketball
rap
dance
sing
> lrange list01 0 -1
python
go
java
python
go
java
cai
basketball
rap
dance
sing
> sadd A go java
2
> sadd B java python
2
> smemeber A
ERR unknown command `smemeber`, with args beginning with: `A`, 
> smembers A
go
java
> zadd C 99 zhangsan 88 lisi 100 wangwu
3
> zrange C 0 -1
lisi
zhangsan
wangwu
> zadd C 77 zhaoliu
1
> zrange C 0 -1
zhaoliu
lisi
zhangsan
wangwu
> zincrby C 10  lisi
98
> zrange C 0 -1
zhaoliu
lisi
zhangsan
wangwu
> zrange C 0 -1 withscores
zhaoliu
77
lisi
98
zhangsan
99
wangwu
100
> zrem C wangwu
1
> zrange C 0 -1 withscores
zhaoliu
77
lisi
98
zhangsan
99
```

> 典型应用：排行榜（ZINCRBY 点击/热度 +1，ZREVRANGE 取 TopN）、热搜榜、游戏积分榜。

### 3.7 bitmap 位图

Bitmap（位图）并不是一种新的数据类型，而是基于 **String** 类型实现的一组"位"操作：字符串的每个字节会被拆成 8 个 bit（二进制位），可以用一个 bit 表示一种状态（0 或 1），因此在"状态标记"类场景下比 String/Set 等类型节省大量内存。offset 从 0 开始，一个 key 最多可以存 2^32-1 个 bit（约 512MB）。

![1792160921957](redis.assets/1792160921957.png)

```
key  →  [ 0 | 1 | 0 | 0 | 0 | ... ]
offset:  0   1   2   3   4
```

- **SETBIT** key offset value                    将 key 对应二进制数组 offset 位置的值设为 value（value 只能是 0 或 1）
- **GETBIT** key offset                           返回 key 对应二进制数组 offset 位置的值（0 或 1）
- **BITCOUNT** key [start end [BYTE|BIT]]      统计二进制数组中值为 1 的 bit 个数（可限定字节/位范围）
- **BITPOS** key bit [start [end [BYTE|BIT]]] 返回二进制数组中第一个值为 bit（0/1）的 offset 位置
- **BITOP** AND|OR|XOR|NOT destkey key [key ...]  对多个 bitmap 做位运算（与/或/异或/非），结果存入 destkey

**命令示例：**

```shell
> setbit bits:demo 0 1        # 将第 0 位设为 1，返回该位原来的值
0
> setbit bits:demo 3 1
0
> getbit bits:demo 0          # 查看第 0 位的值
1
> getbit bits:demo 1          # 第 1 位未设置，为 0
0
> bitcount bits:demo          # 统计值为 1 的位个数
2
> bitpos bits:demo 1          # 第一个值为 1 的位
0
> bitpos bits:demo 0          # 第一个值为 0 的位
1
> setbit bits:demo 100 1      # offset 超过 1 字节时，字符串自动扩展
0
> strlen bits:demo            # 底层仍是字符串：100/8=12.5 → 13 字节
13
> bitcount bits:demo
3
```

**每日签到场景（对应课程案例）：**

![1792160889506](redis.assets/1792160889506.png)

```shell
> setbit dailycheck:1 100 1   # 1号用户第100天完成了签到
0
> bitcount dailycheck:1       # 统计1号用户的签到次数
1
> bitpos dailycheck:1 1       # 第一次签到的位置（即第100天）
100
```

**BITOP 位运算示例（统计连续在线用户）：**

```shell
> setbit online:monday 1 1    # 周一在线用户 id=1
0
> setbit online:monday 2 1
0
> setbit online:tuesday 2 1   # 周二在线用户 id=2
0
> setbit online:tuesday 3 1
0
> bitop and online:common online:monday online:tuesday   # 周一周二都在线的用户
1
> getbit online:common 2      # id=2 两天都在线
1
> getbit online:common 1      # id=1 仅周一在线
0
```
布隆过滤器 不存在，一定不存在；如果存在，则有可能存在，需要查库！！！

> 典型应用：每日签到（SETBIT 按天置位 + BITCOUNT 统计签到次数、BITPOS 找首次签到）优点：**快速、高效、节省空间**——1 个用户一年签到只需 365 bit ≈ 46 字节，1000 万用户在线状态仅需约 1.25MB。
> 
> 用户在线/活跃统计（BITOP 位运算求交集）
> 
> 布隆过滤器雏形。

### 3.8 Hyperloglog 基数统计

HyperLogLog 是一种**概率型数据结构**，用于统计一个集合中不重复元素的个数（基数统计），典型应用场景是根据用户访问记录统计网站的 UV。它不存储元素本身，固定占用约 12KB 内存，标准误差约 0.81%，以极小的误差换取了巨大的内存节省。

- **PFADD** key element [element ...]          向 HyperLogLog 添加一个或多个元素（重复元素自动去重）
- **PFCOUNT** key [key ...]                    统计 HyperLogLog 中不重复元素的个数（可传多个 key 合并统计）
- **PFMERGE** destkey sourcekey [sourcekey ...]   将多个 HyperLogLog 数据整合成一条记录，存入 destkey

**命令示例：**

```shell
> pfadd visitlog 192.168.65.111 192.168.65.112 192.168.65.111   # 添加用户访问记录（重复 IP 自动去重）
1
> pfadd visitlog 192.168.65.113
1
> pfcount visitlog                                              # 统计不同的独立访客（UV）
3
> pfadd visitlog:day1 192.168.65.111 192.168.65.112            # 第一天访问记录
1
> pfadd visitlog:day2 192.168.65.112 192.168.65.113            # 第二天访问记录
1
> pfmerge visitlog:week visitlog:day1 visitlog:day2            # 将多天记录合并成一条
OK
> pfcount visitlog:week                                         # 整周独立访客数
3
```

> 典型应用：网站 UV 统计、注册 IP 数统计、关键词去重计数等海量去重统计场景。内存极小（固定约 12KB）、统计极快，但结果有约 0.81% 的标准误差；需要精确去重计数时应改用 Set。

### 3.9 Geo 地理位置

Geo 类型用于存储地理位置信息（经度、纬度），底层实现是 ZSet（分数为 geohash 编码），常用来实现"附近的人 / 商家 / 景点"等 LBS 场景。

![1792160864260](redis.assets/1792160864260.png)

- **GEOADD** key [NX|XX] [CH] longitude latitude member [longitude latitude member ...]   添加一个或多个地点（参数顺序：经度 纬度 成员名）
- **GEOPOS** key member [member ...]          返回一个或多个地点的经纬度
- **GEODIST** key member1 member2 [M|KM|FT|MI]    计算两个地点之间的距离（单位默认 m）
- **GEORADIUS** key longitude latitude radius M|KM|FT|MI [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count [ANY]] [ASC|DESC] [STORE key|STOREDIST key]    以指定经纬度为圆心、radius 为半径查询附近地点（Redis 6.2+ 已不推荐，改用 GEOSEARCH）
- **GEOSEARCH** key FROMMEMBER member|FROMLONLAT longitude latitude BYRADIUS radius M|KM|FT|MI|BYBOX width height M|KM|FT|MI [ASC|DESC] [COUNT count [ANY]] [WITHCOORD] [WITHDIST] [WITHHASH]    按"圆心+半径"或"矩形框"搜索附近地点（Redis 6.2+ 推荐）

**命令示例（添加长沙商家地址）：**

```shell
> geoadd changsha 113.017489 28.200454 火车站                 # 添加地点：经度 纬度 成员名
1
> geoadd changsha 112.96903 28.201195 橘子洲 113.017031 28.199706 赛格广场 113.017004 28.197677 国储
3
> geopos changsha 火车站                                       # 返回地点的经纬度
> geodist changsha 火车站 橘子洲 m                            # 计算两个地点之间的距离（单位 M|KM|FT|MI，默认 m）
> geosearch changsha frommember 火车站 byradius 2 km withdist withcoord   # 查找火车站 2km 范围内的地点
```

> 典型应用：附近的人/商家/景点（GEOADD 存坐标 + GEOSEARCH 按半径或矩形框搜索）、两点距离计算（GEODIST）。经纬度可通过百度地图坐标拾取器获取：https://api.map.baidu.com/lbsapi/getpoint/index.html。注意 GEORADIUS / GEORADIUSBYMEMBER 在 Redis 6.2+ 已不推荐，统一用 GEOSEARCH 替代。

### 3.10 stream 流

Stream 是 Redis 5.0 引入的**消息队列**类型，被称为"Redis 版的 MQ"——兼具**阻塞队列 + pub/sub** 的能力，支持消息持久化、消费者组、ACK 确认。企业应用相对较少（生产环境一般直接用 Kafka、RabbitMQ 等专业 MQ）。

![1792160372912](redis.assets/1792160372912.png)

- **XADD** key [NOMKSTREAM] [MAXLEN|MINID [=|~] threshold [LIMIT count]] *|id field value [field value ...]    往队列末尾发布一条消息（`*` 表示让系统自动生成 ID）
- **XDEL** key id [id ...]                            删除队列中的一条或多条消息
- **XLEN** key                                        获取队列的长度
- **XRANGE** key start end [COUNT count]              按 ID 范围查询队列中的消息（`-` 表示队首，`+` 表示队尾）
- **XGROUP** CREATE key group id|$ [MKSTREAM]         创建消费者组（`0` 从队列头部开始消费，`$` 从队列尾部即新消息开始消费）
- **XREADGROUP** GROUP group consumer [COUNT count] STREAMS key >|id    消费者组读取消息（`>` 表示从第一条未被消费过的消息消费，也可以指定具体 ID）
- **XPENDING** key group                              查看消费者组的消费进度（待确认消息）

**命令示例：**

```shell
> xadd mystream * name loulan name roy name admin   # 创建队列并添加消息，* 由系统自动生成 ID（毫秒时间戳-序号）
"1713000000000-0"
> xlen mystream                                     # 获取队列长度
1
> xrange mystream - +                               # 查看队列全部消息（- 队首，+ 队尾）
"1713000000000-0"
name
loulan
name
roy
name
admin
> xadd mystream * name zhang
"1713000001000-0"
> xgroup create mystream groupA 0                   # 创建消费者组 groupA，0 表示从队头开始消费（$ 则只消费新消息）
OK
> xreadgroup group groupA consumer1 count 2 streams mystream >   # consumer1 从第一条未被消费的消息开始消费 2 条
1) 1) "mystream"
   2) 1) 1) "1713000000000-0"
         2) 1) "name"
            2) "loulan"
            3) "name"
            4) "roy"
            5) "name"
            6) "admin"
      2) 1) "1713000001000-0"
         2) 1) "name"
            2) "zhang"
> xpending mystream groupA                           # 查看消费进度（2 条待确认）
1) (integer) 2
2) "1713000000000-0"
3) "1713000001000-0"
4) 1) 1) "consumer1"
      2) "2"
```

> 典型应用：轻量级消息队列、事件流日志。相比 List 阻塞队列和 pub/sub，Stream 支持消息回溯、消费者组独立消费、消费确认（XACK），可靠性更高；课程定位"了解即可"，企业中一般直接用 Kafka / RabbitMQ。

### 3.10 通用命令

Redis的通用命令是不分数据类型的，都可以使用的命令：

- KEYS pattern         查找所有符合给定模式( pattern)的 key 
- EXISTS key           检查给定 key 是否存在
- TYPE key             返回 key 所储存的值的类型
- DEL key              该命令用于在 key 存在是删除 key
- RENAME key newkey    重命名 key
- PING                 测试连接
- EXPIRE key seconds   设置 key 的存活时间（秒）
- TTL key              查看 key 剩余存活时间
- SELECT index         切换数据库（默认 16 个库，0-15）
- DBSIZE               统计当前库 key 数量
- FLUSHDB              清空当前库

**TTL 返回值的含义：**

`-1`：表示该 `key` 存在但没有设置过期时间（永久有效）。

`-2`：表示该 `key` 不存在，或者已经过期。

正数：表示该 `key` 还剩余的存活秒数。

## 4. 在 Java 中操作 Redis

### 4.1 Redis 的 Java 客户端

前面我们讲解了Redis的常用命令，这些命令是我们操作Redis的基础，那么我们在java程序中应该如何操作Redis呢？这就需要使用Redis的Java客户端，就如同我们使用JDBC操作MySQL数据库一样。

Redis 的 Java 客户端很多，常用的几种：

- Jedis
- Lettuce
- Spring Data Redis

Spring 对 Redis 客户端进行了整合，提供了 Spring Data Redis，在Spring Boot项目中还提供了对应的Starter，即 spring-boot-starter-data-redis。

我们重点学习**Spring Data Redis**。

### 4.2 Spring Data Redis 使用方式

#### 4.2.1 介绍

Spring Data Redis 是 Spring 的一部分，提供了在 Spring 应用中通过简单的配置就可以访问 Redis 服务，对 Redis 底层开发包进行了高度封装。在 Spring 项目中，可以使用Spring Data Redis来简化 Redis 操作。

网址：https://spring.io/projects/spring-data-redis

<img src="./redis.assets/image-20210927143741458.png" alt="image-20210927143741458" style="zoom: 33%;" /> 

Spring Boot提供了对应的Starter，maven坐标：

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

Spring Data Redis中提供了一个高度封装的类：**RedisTemplate**，对相关api进行了归类封装,将同一类型操作封装为operation接口，具体分类如下：

- ValueOperations：string数据操作
- SetOperations：set类型数据操作
- ZSetOperations：zset类型数据操作
- HashOperations：hash类型的数据操作
- ListOperations：list类型的数据操作



#### 4.2.2 环境搭建

进入到sky-server模块

**1). 导入Spring Data Redis的maven坐标(已完成)**

```xml
<dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

**2). 配置Redis数据源**

在application-dev.yml中添加

```yaml
sky:
  redis:
    host: localhost
    port: 6379
    password: 123456
    database: 10
```

**解释说明：**

database:指定使用Redis的哪个数据库，Redis服务启动后默认有16个数据库，编号分别是从0到15。

可以通过修改Redis配置文件来指定数据库的数量。

在application.yml中添加读取application-dev.yml中的相关Redis配置

```yaml
spring:
  profiles:
    active: dev
  redis:
    host: ${sky.redis.host}
    port: ${sky.redis.port}
    password: ${sky.redis.password}
    database: ${sky.redis.database}
```


**3). 编写配置类，创建RedisTemplate对象**

```java
package com.sky.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
@Slf4j
public class RedisConfiguration {

    @Bean
    public RedisTemplate redisTemplate(RedisConnectionFactory redisConnectionFactory){
        log.info("开始创建redis模板对象...");
        RedisTemplate redisTemplate = new RedisTemplate();
        //设置redis的连接工厂对象
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        //设置redis key的序列化器
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        return redisTemplate;
    }
}
```

**解释说明：**

当前配置类不是必须的，因为 Spring Boot 框架会自动装配 RedisTemplate 对象。但默认的 key 序列化器为 `JdkSerializationRedisSerializer`，会把 key 序列化成带二进制前缀的不可读内容，导致存到 Redis 中后的数据和原始数据有差别，因此需要设置为 `StringRedisSerializer`。

**补充：RedisTemplate 中文乱码 / 序列化问题**

上面的配置只设置了 key 的序列化器，value 仍使用默认的 `JdkSerializationRedisSerializer`（中文会变成不可读的二进制内容）。如果 value 直接存字符串，建议 key、value 都用 `StringRedisSerializer`；如果 value 存 Java 对象，推荐用 `GenericJackson2JsonRedisSerializer` 序列化为 JSON：

```java
@Bean
public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
    RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
    redisTemplate.setConnectionFactory(redisConnectionFactory);

    StringRedisSerializer stringSerializer = new StringRedisSerializer();
    GenericJackson2JsonRedisSerializer jsonSerializer = new GenericJackson2JsonRedisSerializer();

    // key、hashKey 用字符串序列化，保证 Redis 中可读
    redisTemplate.setKeySerializer(stringSerializer);
    redisTemplate.setHashKeySerializer(stringSerializer);
    // value 存对象用 JSON 序列化（纯字符串场景可直接用 StringRedisSerializer）
    redisTemplate.setValueSerializer(jsonSerializer);
    redisTemplate.setHashValueSerializer(jsonSerializer);

    redisTemplate.afterPropertiesSet();
    return redisTemplate;
}
```

> 注意：`GenericJackson2JsonRedisSerializer` 要求被序列化对象存在无参构造；若 value 只存字符串，把 `setValueSerializer` 换成 `StringRedisSerializer` 即可。


**4). 通过RedisTemplate对象操作Redis**

在test下新建测试类

```java
package com.sky.test;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.*;

@SpringBootTest
public class SpringDataRedisTest {
    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    public void testRedisTemplate(){
        System.out.println(redisTemplate);
        //string数据操作
        ValueOperations valueOperations = redisTemplate.opsForValue();
        //hash类型的数据操作
        HashOperations hashOperations = redisTemplate.opsForHash();
        //list类型的数据操作
        ListOperations listOperations = redisTemplate.opsForList();
        //set类型数据操作
        SetOperations setOperations = redisTemplate.opsForSet();
        //zset类型数据操作
        ZSetOperations zSetOperations = redisTemplate.opsForZSet();
    }
}
```

测试：

<img src="./redis.assets/image-20221130205351403.png" alt="image-20221130205351403" style="zoom:50%;" /> 

说明RedisTemplate对象注入成功，并且通过该RedisTemplate对象获取操作5种数据类型相关对象。

上述环境搭建完毕后，接下来，我们就来具体对常见5种数据类型进行操作。


#### 4.2.3 操作常见类型数据

**RedisTemplate 操作接口与数据类型对应关系：**

| 操作接口 | 对应数据类型 |
| --- | --- |
| `opsForValue()` | string（bitmap 也通过它的 `setBit()` / `getBit()` 操作） |
| `opsForHash()` | hash |
| `opsForList()` | list |
| `opsForSet()` | set |
| `opsForZSet()` | zset 有序集合 |
| `opsForGeo()` | Geo 地理位置 |
| `opsForHyperLogLog()` | HyperLogLog 基数统计 |
| `opsForStream()` | stream 消息流 |
| `delete()` / `hasKey()` / `keys()` / `type()` 等 | 通用命令 |

> bitmap 没有独立的操作接口，位操作通过 `opsForValue().setBit()`、`getBit()` 完成；这也是 RedisTemplate 中 bit 没有单独 opsFor 类型的原因。

**1). 操作字符串类型数据**

```java
    /**
     * 操作字符串类型的数据
     */
    @Test
    public void testString(){
        // set get setex setnx
        redisTemplate.opsForValue().set("name","小明");
        String city = (String) redisTemplate.opsForValue().get("name");
        System.out.println(city);
        redisTemplate.opsForValue().set("code","1234",3, TimeUnit.MINUTES);
        redisTemplate.opsForValue().setIfAbsent("lock","1");
        redisTemplate.opsForValue().setIfAbsent("lock","2");
    }

```


**2). 操作哈希类型数据**

```java
    /**
     * 操作哈希类型的数据
     */
    @Test
    public void testHash(){
        //hset hget hdel hkeys hvals
        HashOperations hashOperations = redisTemplate.opsForHash();

        hashOperations.put("100","name","tom");
        hashOperations.put("100","age","20");

        String name = (String) hashOperations.get("100", "name");
        System.out.println(name);

        Set keys = hashOperations.keys("100");
        System.out.println(keys);

        List values = hashOperations.values("100");
        System.out.println(values);

        hashOperations.delete("100","age");
    }

```



**3). 操作列表类型数据**

```java
    /**
     * 操作列表类型的数据
     */
    @Test
    public void testList(){
        //lpush lrange rpop llen
        ListOperations listOperations = redisTemplate.opsForList();

        listOperations.leftPushAll("mylist","a","b","c");
        listOperations.leftPush("mylist","d");

        List mylist = listOperations.range("mylist", 0, -1);
        System.out.println(mylist);

        listOperations.rightPop("mylist");

        Long size = listOperations.size("mylist");
        System.out.println(size);
    }

```


**4). 操作集合类型数据**

```java
    /**
     * 操作集合类型的数据
     */
    @Test
    public void testSet(){
        //sadd smembers scard sinter sunion srem
        SetOperations setOperations = redisTemplate.opsForSet();

        setOperations.add("set1","a","b","c","d");
        setOperations.add("set2","a","b","x","y");

        Set members = setOperations.members("set1");
        System.out.println(members);

        Long size = setOperations.size("set1");
        System.out.println(size);

        Set intersect = setOperations.intersect("set1", "set2");
        System.out.println(intersect);

        Set union = setOperations.union("set1", "set2");
        System.out.println(union);

        setOperations.remove("set1","a","b");
    }

```


**5). 操作有序集合类型数据**

```java
    /**
     * 操作有序集合类型的数据
     */
    @Test
    public void testZset(){
        //zadd zrange zincrby zrem
        ZSetOperations zSetOperations = redisTemplate.opsForZSet();

        zSetOperations.add("zset1","a",10);
        zSetOperations.add("zset1","b",12);
        zSetOperations.add("zset1","c",9);

        Set zset1 = zSetOperations.range("zset1", 0, -1);
        System.out.println(zset1);

        zSetOperations.incrementScore("zset1","c",10);

        zSetOperations.remove("zset1","a","b");
    }

```

**6). 通用命令操作**

```java
    /**
     * 通用命令操作
     */
    @Test
    public void testCommon(){
        //keys exists type del
        Set keys = redisTemplate.keys("*");
        System.out.println(keys);

        Boolean name = redisTemplate.hasKey("name");
        Boolean set1 = redisTemplate.hasKey("set1");

        for (Object key : keys) {
            DataType type = redisTemplate.type(key);
            System.out.println(type.name());
        }

        redisTemplate.delete("mylist");
    }

```

### 4.3 生产环境配置要点

4.2 的环境搭建基于教学项目（sky-server）。标准 Spring Boot 项目中，不需要自定义 `sky.redis.*` 前缀再用 `${}` 占位符引用，直接使用官方标准前缀即可。

> **配置前缀版本说明：** Spring Boot 2.x 使用 `spring.redis.*`，Spring Boot 3.x 起改为 `spring.data.redis.*`，注意与自己的 Boot 版本对应。

**1）依赖**

即 4.2.1 引入的 `spring-boot-starter-data-redis`，无需重复引入。

**2）标准配置（application.yml）**

```yaml
spring:
  data:
    redis:
      host: r-xxxx.redis.rds.aliyuncs.com   # Redis 的 Host
      port: 6379                            # 连接端口
      password: xxxx                        # 连接密码（默认为空）
      database: 0                           # 数据库编号（默认 0-15）
```

**3）连接验证（单元测试）**

```java
// 启动类替换为自己项目的 Application 类
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {Application.class})
public class RedisTest {
    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    public void testRedisConnect() {
        redisTemplate.opsForValue().set("test", "test");
        Assert.assertTrue(redisTemplate.opsForValue().get("test").equals("test"));
        System.out.println("redis connect success");
    }
}
```

测试相关依赖（JUnit 4 与 Spring Boot 3.x 兼容写法；直接使用 `spring-boot-starter-test` 时默认已含 JUnit 5）：

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13.1</version>
    <scope>test</scope>
</dependency>

<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>6.0.8</version>
    <scope>test</scope>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-test</artifactId>
    <version>3.1.5</version>
    <scope>test</scope>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

<img src="./redis.assets/1772936077937.png" alt="连接测试成功" style="zoom:50%;" />

## 5. Redis线程模型

> 参考《深入理解 Redis 线程模型》。核心结论：整体线程模型 = **客户端多线程 + 服务端核心单线程**，依靠复合指令、事务、Pipeline、Lua 脚本、Function 等机制保证指令原子性；同时要重点关注 Bigkey 对单线程模型造成的阻塞风险。

### 5.1 Redis 到底是单线程还是多线程？

这是 Redis 面试中最经典的问题，几乎伴随 Redis 的整个发展过程。一句话结论：**客户端多线程，服务端核心单线程**。

#### 5.1.1 客户端多线程：维护 Socket 连接

Redis 为了支撑大量客户端同时连接，使用**多线程维护与客户端的 Socket 连接**，`redis.conf` 中的 `maxclients` 控制最大连接数：

```
# 默认最大连接数 10000，超过后新连接会被拒绝
maxclients 10000
```

#### 5.1.2 服务端单线程：主线程处理网络 IO 与键值读写

服务端响应网络 IO 和键值对读写的请求，统一由一个**主线程**完成。Redis 基于 **epoll 实现 IO 多路复用**，让一个主线程同时响应多个客户端 Socket 连接的请求：

- 并发请求被转成**串行执行** → 天然没有 MySQL 那种脏读、幻读、不可重复读的并发问题；
- 串行化 + 基于内存工作的极高性能 → 让 Redis 成为很多并发问题的解决工具。

#### 5.1.3 线程模型的版本演进

| 版本 | 线程模型 |
| --- | --- |
| Redis 4.x 及以前 | 纯单线程 |
| Redis 5.x（2018-10 核心重构） | 大重构为后台多线程机制打基础 |
| Redis 6.x / 7.x | 引入全新多线程机制提升后台工作；网络 IO 支持 `io-threads` 多线程读写 |
| Redis 7.x | RDB/AOF 持久化、`unlink` 异步删除、集群数据同步、`FLUSHALL` 异步等耗时操作都由额外线程执行 |

```
# redis.conf 中可配置网络 IO 线程数（默认关闭，建议 4 核以上机器开启）
io-threads 4
```

现代 CPU 早已是多核架构，Redis 若一直单线程就无法发挥多核 CPU 的优势；且耗时操作必然影响主线程，所以**多线程是必然结果**，只不过为了保持快速，Redis 在多线程上走得非常谨慎。

#### 5.1.4 为什么核心线程坚持单线程？

1. **CPU 通常不是 Redis 的瓶颈**：性能瓶颈大部分是内存和网络，核心线程改多线程的要求并不急切；
2. **减少上下文切换**：单线程避免了线程上下文切换的性能消耗；
3. **避免资源竞争**：核心线程若改为多线程并发执行，必然带来资源竞争，极大增加业务复杂性，反而影响执行效率。

### 5.2 Redis 如何保证指令原子性

核心读写操作是单线程串行处理的，多个客户端同时读写只会排队串行。但**单条指令的原子性 ≠ 一个客户端多步操作的原子性**——针对单个客户端，Redis 并没有像 MySQL 事务那样保证同一客户端的操作整体原子性，多步操作之间仍可能被其他客户端的指令"加塞"。针对不同业务场景，Redis 提供了多种控制指令原子性的思路。

#### 5.2.1 复合指令

Redis 内部提供很多复合指令，一条指令干了多个指令的活，天然保持原子性：

- `MSET` / `HMSET`：批量设置
- `GETSET`：取值并赋新值
- `SETNX`：不存在才设置（分布式锁的常用基础）
- `SETEX`：设置值并指定过期时间

```bash
127.0.0.1:6379> MSET k1 v1 k2 v2
OK
```

#### 5.2.2 Redis 事务（MULTI / EXEC）

| 命令 | 作用 |
| --- | --- |
| `MULTI` | 开启事务 |
| `EXEC` | 执行事务 |
| `DISCARD` | 放弃事务 |
| `WATCH` | 监听 key，key 有变化后事务不执行 |
| `UNWATCH` | 取消监听（只在当前客户端生效） |

```bash
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379(TX)> set k2 2
QUEUED
127.0.0.1:6379(TX)> incr k2
QUEUED
127.0.0.1:6379(TX)> get k2
QUEUED
127.0.0.1:6379(TX)> EXEC
1) OK
2) (integer) 3
3) "3"
```

> 开启事务后，所有操作返回 `QUEUED`，表示只是排好了队，等到 `EXEC` 后一起执行。

**Redis 事务 ≠ 数据库事务**：它**不保证事务中的指令一起成功或一起失败**，只保证事务中的原子操作**一起执行，不会被其他指令加塞**。

```bash
# lpop 是针对 list 的操作，现在对 string 类型的 k2 操作，必然报错
127.0.0.1:6379(TX)> lpop k2
QUEUED
127.0.0.1:6379(TX)> incr k2
QUEUED
127.0.0.1:6379(TX)> EXEC
1) OK
2) (integer) 3
3) "3"
4) (error) WRONGTYPE Operation against a key holding the wrong kind of value
5) (integer) 4
6) "4"
```

可以看到：某条指令报错**不会让整个事务回滚，也不影响后面指令的执行**。

**事务失败如何"回滚"——回滚的是操作，不是数据：**

- 在 `EXEC` 执行前失败（指令敲错、参数不对）→ 整个事务的操作都不会执行；
- 在 `EXEC` 执行后失败（如 key 类型不对）→ 事务中其他操作正常执行，不受影响。

**执行过程中的注意点：**

1. 只要客户端执行了 `EXEC`，之后即使连接断开，事务也会一直执行下去；
2. 事务可能造成数据不一致：`EXEC` 后 Redis 先将事务中所有操作记录到 AOF 文件，再执行具体操作。若记录后、执行中服务非正常宕机（崩溃或被 kill -9），AOF 记录与数据不符，下次启动会报错，需用 `redis-check-aof` 工具修复（移除不完整的事务操作记录）；
3. `WATCH` 机制可以进一步保证事务执行前某个 key 不被修改；`UNWATCH` 取消监听只在当前客户端有效。

#### 5.2.3 Pipeline 管道

**核心作用：优化 RTT（Round-Trip Time）**。RTT 指指令数据包从 Client → Server → Client 的往返时间，指令越频繁 RTT 消耗越可观。Pipeline 的思路简单明了：**将客户端多个指令打包，一起推送给服务端**，一次往返完成多笔操作。

```bash
# command.txt 中包含多条指令，一次管道批量执行
[root@localhost ~]# cat command.txt | redis-cli -a 123qweasd --pipe
All data transferred. Waiting for the last reply...
Last reply received from server.
errors: 0, replies: 4
```

**注意点：**

1. **Pipeline 不具备原子性**：只是将多条命令发送到服务端，最终仍可能被其他客户端的指令加塞（虽然概率较小），所以不建议在 Pipeline 中做复杂的数据操作；
2. 执行复合指令和事务会**阻塞其他命令执行**，而执行 Pipeline 不会；
3. Pipeline 执行过程中会**阻塞当前客户端**，不建议拼装过多指令——指令过多会使客户端阻塞太久，且服务端需要回复繁忙客户端、占用大量内存；
4. 适合在**非热点时段**做大批量数据调整任务（如批量写入）。

#### 5.2.4 Lua 脚本（最常用）

Redis 事务和 Pipeline 对原子性问题都有"水土不服"的地方，且都只是对现有指令进行拼凑，无法承载自定义复杂逻辑。因此企业中用到更多的是 **Lua 脚本**，也是 Redis 7 版本着重调整的功能。

Lua 是一种小巧的脚本语言，最大特点是**单线程模型**，天然适合 Redis、Nginx 这类单线程中间件做功能定制——**在 Redis 中执行一段 Lua 脚本，天然就是原子性的**（Redis 7.x 支持 Lua 5.1）。

**执行方式：**

```bash
# EVAL：script 为脚本，numkeys 指定键名参数个数，
# KEYS[i] 访问键名参数，ARGV[i] 访问附加参数（均以 1 为基址）
127.0.0.1:6379> eval "return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}" 2 key1 key2 first second
1) "key1"
2) "key2"
3) "first"
4) "second"

# 脚本内使用 redis.call() 调用 Redis 命令
# 调整 1 号商品的库存：若库存小于 10 就设置为 10
127.0.0.1:6379> set stock_1 1
OK
127.0.0.1:6379> eval "local initcount = redis.call('get', KEYS[1]) local a = tonumber(initcount) local b = tonumber(ARGV[1]) if a >= b then redis.call('set', KEYS[1], a) return 1 end redis.call('set', KEYS[1], b) return 0 " 1 "stock_1" 10
(integer) 0
127.0.0.1:6379> get stock_1
"10"
```

**使用注意点：**

1. **不要在脚本中出现死循环和耗时运算**，否则 Redis 会阻塞、不再接受其他命令（这一点与 Pipeline 不同，Pipeline 不会阻塞服务端）。Redis 有配置参数控制 Lua 脚本最长执行时间，**默认 5 秒**；超时后 Redis 对其他操作返回 `BUSY` 错误，此时只允许执行 `SCRIPT KILL`、`FUNCTION KILL`、`SHUTDOWN NOSAVE` 等少量命令：

```
# redis.conf：控制 EVAL 脚本、Function 的最大执行时间（默认 5000ms）
lua-time-limit 5000
# busy-reply-threshold 5000   # 旧名称，现在是别名
```

2. **尽量使用只读脚本**：只读脚本是 Redis 7 新增，表示不修改数据集的脚本，加只读标志后用 `EVAL_RO` 触发；不允许执行任何修改数据集的操作，可随时用 `SCRIPT KILL` 停止；好处是能限制某些用户的操作，且可转移到备份节点执行、减轻主节点压力；
3. **热点脚本可以缓存到服务端**：`SCRIPT LOAD` 将脚本缓存到服务端并返回 SHA1 校验和，之后用 `EVALSHA` 直接执行，省去每次传输脚本内容：

```bash
127.0.0.1:6379> SCRIPT LOAD "return 'Immabe a cached script'"
"c664a3bf70bd1d45c4284ffebb65a6f2299bfc9f"
127.0.0.1:6379> EVALSHA c664a3bf70bd1d45c4284ffebb65a6f2299bfc9f 0
"Immabe a cached script"
```

#### 5.2.5 Redis Function（Redis 7+）

如果觉得开发 Lua 脚本有困难，Redis 7 之后提供了另一种解法——**Redis Function**：将一些功能声明成统一的函数，提前加载到 Redis 服务端（可由管理员加载），客户端直接调用即可，无需关心函数实现。

**Function 更大的好处：Function 中可以嵌套调用其他 Function**，从而更有利于代码复用；相比之下 Lua 脚本无法复用。

**示例**：在服务器上新增 `mylib.lua` 文件（注意：第一行是指定函数的命名空间，**不是注释，不能少**）：

```lua
#!lua name=mylib

local function my_hset(keys, args)
    local hash = keys[1]
    local time = redis.call('TIME')[1]
    return redis.call('HSET', hash, '_last_modified_', time, unpack(args))
end

redis.register_function('my_hset', my_hset)
```

加载并调用：

```bash
[root@localhost myredis]# cat mylib.lua | redis-cli -a 123qweasd -x FUNCTION LOAD REPLACE
"mylib"
127.0.0.1:6379> FUNCTION LIST
1) 1) "library_name"
   2) "mylib"
   3) "engine"
   4) "LUA"
   5) "functions"
   6) 1) 1) "name"
      2) "my_hset"
...
127.0.0.1:6379> FCALL my_hset 1 myhash myfield "some value" another_field "another value"
(integer) 3
127.0.0.1:6379> HGETALL myhash
1) "_last_modified_"
2) "1717748001"
3) "myfield"
4) "some value"
5) "another_field"
6) "another value"
```

**Function 注意点：**

1. Function 同样可以进行只读调用；
2. 集群中使用时，目前版本需要在**各个节点手动加载一次**，Redis 不会在集群中自动同步；
3. Function 缓存在服务端，不建议加载太多太大；
4. Function 和 Script 一样有一系列管理指令，`help @scripting` 自行了解。

#### 5.2.6 原子性机制对比

| 机制 | 是否原子 | 特点 | 适用场景 |
| --- | --- | --- | --- |
| 复合指令 | 是 | 一条指令完成多步操作 | 简单批量读写 |
| Redis 事务 | 是（一起执行不被加塞，但不回滚失败指令） | MULTI/EXEC 排队执行，支持 WATCH | 需要"不被加塞"的批量操作 |
| Pipeline | 否 | 多命令打包发送，优化 RTT，不阻塞服务端 | 非热点时段大批量数据调整 |
| Lua 脚本 | 是 | 可承载自定义复杂逻辑，天然原子 | 高并发复杂业务（最常用） |
| Redis Function | 是 | 函数化、可嵌套复用，Redis 7+ | 替代复杂 Lua 脚本 |

> 以上机制本质都是**改变 Redis 指令执行顺序**的方式。实际项目中 Lua 脚本通常用得最多，在很多追求极致性能的高并发场景中担任重要角色；但其他方式也需要了解，真实业务场景下才有更多方案可选。

### 5.3 Redis 中的 Bigkey 问题

**Bigkey** 指占用空间非常大的 key，例如一个 list 包含 200W 个元素，或一个 string 里放一篇文章。基于 Redis **单线程为主**的核心机制，操作这些 Bigkey 非常容易造成**服务阻塞**，实际项目中一定要特殊关照。

Redis 客户端提供了两个扩展参数，帮助快速发现 Bigkey：

```bash
# 找出元素很多（复杂度高）的 key
redis-cli --bigkeys
# 找出占用内存很大的 key
redis-cli --memkeys
```

### 5.4 线程模型总结

1. Redis 整体还是**多线程**的，只是后台执行指令的**核心线程是单线程**，整个线程模型以单线程为主，不同客户端的各种指令依次排队执行；
2. 这种以单线程为主的模型相比其他中间件非常简单，让 Redis 处理线程并发问题简单高效，甚至在很多复杂业务场景下成为**并发控制工具**；但这不意味着没有并发问题——**选择合理的指令执行方式**非常重要；
3. 简单的线程模型本身**不利于发挥多线程的并发优势**，而 Redis 的应用场景又通常与高性能深度绑定，所以使用时要时刻思考指令执行方式（复合指令、事务、Pipeline、Lua、Function），才能最大限度发挥 Redis 高性能的优势。

## 6. Redisson

Redisson 是架设在 Redis 之上的 Java 驻内存数据网格（In-Memory Data Grid），提供了比 RedisTemplate 更丰富的分布式能力：**分布式锁**（可重入锁、公平锁、读写锁、RedLock）、分布式集合（Map/Set/Queue）、限流器（RRateLimiter）、延迟队列、布隆过滤器、分布式对象等。最常用的场景是**分布式锁**——内置看门狗（Watchdog）机制，在锁即将到期且业务未执行完时自动续期，避免锁提前过期。

引入依赖：

```xml
<!-- Redisson -->
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson-spring-boot-starter</artifactId>
    <version>3.24.3</version>
</dependency>
```

增加配置：

```yaml
spring:
  redis:
    redisson:
      config: |
        singleServerConfig:
          idleConnectionTimeout: 10000
          connectTimeout: 10000
          timeout: 3000
          retryAttempts: 3
          retryInterval: 1500
          password: '<密码>'
          subscriptionsPerConnection: 5
          clientName: null
          address: "redis://r-xxxx.redis.rds.aliyuncs.com:6379"
          subscriptionConnectionMinimumIdleSize: 1
          subscriptionConnectionPoolSize: 50
          connectionMinimumIdleSize: 24
          connectionPoolSize: 64
          database: 0
          dnsMonitoringInterval: 5000
        threads: 16
        nettyThreads: 32
        codec: !<org.redisson.codec.JsonJacksonCodec> {}
        transportMode: "NIO"
```

## 7. 参考资料

- [Redis 官方网站](https://redis.io/)
- [Redis 官方命令文档](https://redis.io/docs/latest/commands/)
- [Redis 中文网](https://www.redis.net.cn/)
- [Redis Windows 版下载（tporadowski 维护，推荐）](https://github.com/tporadowski/redis/releases/)
- [Redis Windows 旧版下载（microsoftarchive 归档）](https://github.com/microsoftarchive/redis/releases)
- [DB-Engines 数据库流行度排名](https://db-engines.com/en/)
- [Redis 教程博客（刘清政）](https://www.cnblogs.com/liuqingzheng/p/9831331.html)
