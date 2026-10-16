## 1. Redis入门

### 1.1 Redis简介

Redis是一个基于**内存**的key-value结构数据库。Redis 是互联网技术领域使用最为广泛的**存储中间件**。

**官网：** https://redis.io

**中文网：** https://www.redis.net.cn/

**key-value结构存储：**

![](./redis.assets/image-20221130173459174.png)

**主要特点：**

- 基于内存存储，读写性能高  
- 适合存储热点数据（热点商品、资讯、新闻）
- 企业应用广泛

Redis是用C语言开发的一个开源的高性能键值对(key-value)数据库，官方提供的数据是可以达到100000+的QPS（每秒内查询次数）。它存储的value类型比较丰富，也被称为结构化的NoSql数据库。

NoSql（Not Only SQL），不仅仅是SQL，泛指**非关系型数据库**。NoSql数据库并不是要取代关系型数据库，而是关系型数据库的补充。

**关系型数据库(RDBMS)：**

- Mysql
- Oracle
- DB2
- SQLServer

**非关系型数据库(NoSql)：**

- Redis
- Mongo db
- MemCached

### 1.2 客户端连接命令

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

### 1.3 客户端图形工具

默认提供的客户端连接工具界面不太友好，同时操作也较为麻烦，接下来，引入一个Redis客户端图形工具。

<img src="./redis.assets/image-20221130183746355.png" alt="image-20221130183746355" style="zoom:50%;" /> 

**新建连接**

<img src="./redis.assets/image-20221130192210418.png" alt="image-20221130192210418" style="zoom: 33%;" />  

**连接成功** 

<img src="./redis.assets/image-20221130192310916.png" alt="image-20221130192310916" style="zoom: 33%;" />  

## 2. Redis部署

**四种部署方式对比：**

| 部署方式 | 节点组成 | 自动故障转移 | 数据分片 | 主要作用 | 适用场景 |
| --- | --- | --- | --- | --- | --- |
| 单机部署 | 1 个节点 | ❌ | ❌ | 快速上手 | 开发测试、小规模应用 |
| 主从部署 | 1 主 + N 从 | ❌ 需人工切换 | ❌ | 数据冗余、读扩展 | 读写分离 |
| 哨兵部署 | 1 主 + N 从 + 哨兵集群 | ✅ | ❌ | 自动故障转移 | 生产高可用 |
| 集群部署 | N 主 + N 从 | ✅ | ✅ 16384 个哈希槽 | 分片 + 高可用 | 大数据量、高并发 |

### 2.1 windows部署

#### 2.1.1 Redis下载

Redis安装包分为windows版和Linux版：

- Windows版下载地址：https://github.com/microsoftarchive/redis/releases
- Linux版下载地址： https://download.redis.io/releases/

#### 2.1.2 Redis安装

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

#### 2.1.3 Redis服务启动与停止

**redis-server.exe redis.windows.conf**

<img src="./redis.assets/image-20221130181950351.png" alt="image-20221130181950351" style="zoom:50%;" /> 

Redis服务默认端口号为 **6379** ，通过快捷键**Ctrl + C** 即可停止Redis服务

当Redis服务启动成功后，可通过客户端进行连接。

### 2.2 单机部署

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

::: warning 直接启动无法后台运行
上面的启动方式无法在后台运行，退出之后直接关闭了 Redis 服务，所以还需要针对 Redis 做一些设置。
:::

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

### 2.3 主从部署（Master-Slave Replication）

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

### 2.4 哨兵部署（Sentinel）

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

### 2.5 集群部署（Cluster）

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
# 连接一个主节点进行写数据
redis-cli info replication
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

### 2.6 文件目录与配置汇总

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

## 3. Redis数据类型

### 3.1 五种常用数据类型介绍

Redis存储的是key-value结构的数据，其中key是字符串类型，value有5种常用的数据类型：

- 字符串 string
- 哈希 hash
- 列表 list
- 集合 set
- 有序集合 sorted set / zset

### 3.2 各种数据类型特点

<img src="./redis.assets/image-20221130190150749.png" alt="image-20221130190150749" style="zoom:50%;" /> 

**解释说明：**

- 字符串(string)：普通字符串，Redis中最简单的数据类型
- 哈希(hash)：也叫散列，类似于Java中的HashMap结构
- 列表(list)：按照插入顺序排序，可以有重复元素，类似于Java中的LinkedList
- 集合(set)：无序集合，没有重复元素，类似于Java中的HashSet
- 有序集合(sorted set/zset)：集合中每个元素关联一个分数(score)，根据分数升序排序，没有重复元素


## 4. Redis常用命令

https://redis.io/docs/latest/commands/

### 4.1 字符串操作命令

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

### 4.2 哈希操作命令

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

### 4.3 列表操作命令

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

### 4.4 集合操作命令

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

### 4.5 有序集合操作命令

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

### 4.6 通用命令

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
## 5.在Java中操作Redis

### 5.1 Redis的Java客户端

前面我们讲解了Redis的常用命令，这些命令是我们操作Redis的基础，那么我们在java程序中应该如何操作Redis呢？这就需要使用Redis的Java客户端，就如同我们使用JDBC操作MySQL数据库一样。

Redis 的 Java 客户端很多，常用的几种：

- Jedis
- Lettuce
- Spring Data Redis

Spring 对 Redis 客户端进行了整合，提供了 Spring Data Redis，在Spring Boot项目中还提供了对应的Starter，即 spring-boot-starter-data-redis。

我们重点学习**Spring Data Redis**。

### 5.2 Spring Data Redis使用方式

#### 5.2.1 介绍

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



#### 5.2.2 环境搭建

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

当前配置类不是必须的，因为 Spring Boot 框架会自动装配 RedisTemplate 对象，但是默认的key序列化器为

JdkSerializationRedisSerializer，导致我们存到Redis中后的数据和原始数据有差别，故设置为

StringRedisSerializer序列化器。


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


#### 5.2.3 操作常见类型数据

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

## 6. Spring Boot 整合 Redis（实战）

### 6.1 依赖引入

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### 6.2 增加配置

```yaml
spring:
  data:
    redis:
      host: r-xxxx.redis.rds.aliyuncs.com # Redis的Host
      port: 6379                          # Redis服务器连接端口
      password: xxxx                      # Redis服务器连接密码（默认为空）
```

### 6.3 单元测试

```java
import cn.hollis.NFTurbo.NfTurboApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {NfTurboApplication.class})
public class RedisTest {
    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    public void testRedisConnect() {
        redisTemplate.opsForValue().set("test", "test");
        Assert.assertTrue(redisTemplate.opsForValue().get("test").equals("test"));

        if (redisTemplate.opsForValue().get("test").equals("test")) {
            System.out.println("redis connect success");
        }
    }
}
```

测试相关依赖：

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

![1772936077937](./redis.assets/1772936077937.png)

## 7. Redisson

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
## 8. 参考资料
https://www.cnblogs.com/liuqingzheng/p/9831331.html

https://github.com/tporadowski/redis/releases/

https://db-engines.com/en/

https://redis.io/
