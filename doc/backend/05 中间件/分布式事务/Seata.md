https://seata.apache.org/zh-cn/docs/overview/what-is-seata

# 简介

Seata 是一款开源的分布式事务解决方案，致力于提供高性能和简单易用的分布式事务服务。Seata 将为用户提供了 AT、TCC、SAGA 和 XA 事务模式，为用户打造一站式的分布式解决方案。

![](../../../public/images/Seata.assets/image-7.png)

# 产生背景

1. 早在 2007 年，阿里巴巴和蚂蚁集团内部开发了分布式事务中间件，用于解决电商、支付、物流等业务场景中应用数据的一致性问题。内部项目分别被称为 TXC (Taobao Transaction Constructor)/XTS(eXtended Transaction Service)，该项目几乎在每笔订单的交易支付链路几乎都有使用。

2. 自 2013 年以来，阿里巴巴和蚂蚁集团已在阿里云和金融云上向企业客户分别发布了分布式事务云服务产品 GTS(global transaction service)/DTX(Distributed Transaction-eXtended)，在各个行业领域积累了大量用户。

3. 2019 年 1 月，阿里巴巴集团正式开源了该项目，项目命名为 Fescar (Fast & Easy Commit and Rollback)）。项目开源以来，它受到了众多开发人员的热烈欢迎和赞扬，开源一周收获了超 3k star，曾一度蝉联 GitHub Trending 排行榜第一。

4. 2019 年 4 月，蚂蚁集团数据中间件团队加入了 Fescar 社区。为了创建一个更加开放和中立的社区，Fescar 改名为 Seata（Simple Extensible Autonomous Transaction Architecture），代码仓库从 Alibaba organization 迁移到其独立的 Seata organization。

5. 2019 年 12 月，Seata 开源项目正式发布 1.0.0 GA 版本，标志着项目已基本可生产使用。

6. 2023 年 10 月，为了更好的通过社区驱动技术的演进，阿里和蚂蚁集团正式将 Seata 捐赠给 Apache 基金会，该提案已通过了 Apache 基金会的投票决议，Seata 正式进入 Apache 孵化器。

# 下载

Seata-Server&#x20;

* 下载地址：

<https://github.com/apache/incubator-seata/releases>

* 按版本号精准下载

源码包：[https://github.com/apache/incubator-seata/archive/v2.0.0.zip](https://github.com/apache/incubator-seata/archive/v1.4.2.zip)

二进制包：<https://github.com/apache/incubator-seata/releases/download/v2.0.0/seata-server-2.0.0.zip>

# 安装部署

https://seata.apache.org/zh-cn/docs/ops/deploy-guide-beginner/

## Windows

### 1. 增加 Maven 依赖

```xml
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>最新版</version>
</dependency>
<dependency>
    <groupId>com.alibaba.nacos</groupId>
    <artifactId>nacos-client</artifactId>
    <version>1.2.0及以上版本</version>
</dependency>
```

### 2. Client 端配置中心

进入conf目录，找到application.yml，修改其中的配置：

```yaml
seata:
  config:
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
      group: 'SEATA_GROUP'
      namespace: ''
      username: 'nacos'
      password: 'nacos'
```

### 3. Server 端配置中心

打开“application.yml”文件，同时打开“application.example.yml”文件作为参考

![](../../../public/images/Seata.assets/image-8.png)

在 `conf/application.yaml`加入以下配置, 其余配置参考 [configuration options](https://github.com/apache/incubator-seata/blob/2.x/server/src/main/resources/application.example.yml):

```yaml
seata:
  config:
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
      namespace:
      group: SEATA_GROUP
      context-path:
      username: nacos
      password: nacos
      data-id: seataServer.properties
```



```yaml
server:
  port: 7091

spring:
  application:
    name: seata-server

logging:
  config: classpath:logback-spring.xml
  file:
    path: ${user.home}/logs/seata
  extend:
    logstash-appender:
      destination: 127.0.0.1:4560
    kafka-appender:
      bootstrap-servers: 127.0.0.1:9092
      topic: logback_to_logstash

console:
  user:
    username: seata
    password: seata

seata:
  config:
    # support: nacos, consul, apollo, zk, etcd3
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848  # nacos地址
      namespace:
      group: SEATA_GROUP  # 配置文件的分组
      context-path:
      username: nacos  # nacos用户名
      password: nacos  # nacos密码
      # 这是默认值
      data-id: seataServer.properties  # 配置文件的data id也就是配置文件名加后缀
  registry:
    # support: nacos, eureka, redis, zk, consul, etcd3, sofa
    type: nacos
    nacos:
      application: seata-server   #seata启动后在nacos的服务名
      server-addr: 127.0.0.1:8848  # nacos地址
      group: SEATA_GROUP  # 配置文件的分组
      cluster: default  # 这个歌参数在每个微服务seata时会用到
      username: nacos  # nacos用户名
      password: nacos  # nacos密码
  store:
    # support: file 、 db 、 redis
    mode: file
#  server:
#    service-port: 8091 #If not configured, the default is '${server.port} + 1000'
  security:
    secretKey: SeataSecretKey0c382ef121d778043159209298fd40bf3850a017
    tokenValidityInMilliseconds: 1800000
    ignore:
      urls: /,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.ico,/console-fe/public/**,/api/v1/auth/login
```



### 4. Nacos 配置

* 新建namespace

![](../../../public/images/Seata.assets/image-4.png)

* 新建配置

![](../../../public/images/Seata.assets/image-5.png)

此处 dataId 为 seataServer.properties

![](../../../public/images/Seata.assets/image-6.png)



<span style="color: rgb(143,149,158); background-color: rgb(242,243,245)">Data ID是“application.yml”中的“seata-config-nacos-data-id”；</span> <span style="color: rgb(143,149,158); background-color: rgb(242,243,245)">Group是“application.yml”中的“seata-config-nacos-group”；</span> <span style="color: rgb(143,149,158); background-color: rgb(242,243,245)">配置内容在seata目录中“seata-script-config-center”中的“config.txt”文件中。</span>



配置内容参考 https://github.com/apache/incubator-seata/blob/develop/script/config-center/config.txt 并按需修改保存

```bash
#For details about configuration items, see https://seata.io/zh-cn/docs/user/configurations.html
#Transport configuration, for client and server
transport.type=TCP
transport.server=NIO
transport.heartbeat=true
transport.enableTmClientBatchSendRequest=false
transport.enableRmClientBatchSendRequest=true
transport.enableTcServerBatchSendResponse=false
transport.rpcRmRequestTimeout=30000
transport.rpcTmRequestTimeout=30000
transport.rpcTcRequestTimeout=30000
transport.threadFactory.bossThreadPrefix=NettyBoss
transport.threadFactory.workerThreadPrefix=NettyServerNIOWorker
transport.threadFactory.serverExecutorThreadPrefix=NettyServerBizHandler
transport.threadFactory.shareBossWorker=false
transport.threadFactory.clientSelectorThreadPrefix=NettyClientSelector
transport.threadFactory.clientSelectorThreadSize=1
transport.threadFactory.clientWorkerThreadPrefix=NettyClientWorkerThread
transport.threadFactory.bossThreadSize=1
transport.threadFactory.workerThreadSize=default
transport.shutdown.wait=3
transport.serialization=seata
transport.compressor=none

#Transaction routing rules configuration, only for the client
service.vgroupMapping.default_tx_group=default
#If you use a registry, you can ignore it
service.default.grouplist=127.0.0.1:8091
service.enableDegrade=false
service.disableGlobalTransaction=false

#Transaction rule configuration, only for the client
client.rm.asyncCommitBufferLimit=10000
client.rm.lock.retryInterval=10
client.rm.lock.retryTimes=30
client.rm.lock.retryPolicyBranchRollbackOnConflict=true
client.rm.reportRetryCount=5
client.rm.tableMetaCheckEnable=true
client.rm.tableMetaCheckerInterval=60000
client.rm.sqlParserType=druid
client.rm.reportSuccessEnable=false
client.rm.sagaBranchRegisterEnable=false
client.rm.sagaJsonParser=fastjson
client.rm.tccActionInterceptorOrder=-2147482648
client.tm.commitRetryCount=5
client.tm.rollbackRetryCount=5
client.tm.defaultGlobalTransactionTimeout=60000
client.tm.degradeCheck=false
client.tm.degradeCheckAllowTimes=10
client.tm.degradeCheckPeriod=2000
client.tm.interceptorOrder=-2147482648
client.undo.dataValidation=true
client.undo.logSerialization=jackson
client.undo.onlyCareUpdateColumns=true
server.undo.logSaveDays=7
server.undo.logDeletePeriod=86400000
client.undo.logTable=undo_log
client.undo.compress.enable=true
client.undo.compress.type=zip
client.undo.compress.threshold=64k
#For TCC transaction mode
tcc.fence.logTableName=tcc_fence_log
tcc.fence.cleanPeriod=1h

#Log rule configuration, for client and server
log.exceptionRate=100

#Transaction storage configuration, only for the server. The file, db, and redis configuration values are optional.
store.mode=file
store.lock.mode=file
store.session.mode=file
#Used for password encryption
store.publicKey=

#If `store.mode,store.lock.mode,store.session.mode` are not equal to `file`, you can remove the configuration block.
store.file.dir=file_store/data
store.file.maxBranchSessionSize=16384
store.file.maxGlobalSessionSize=512
store.file.fileWriteBufferCacheSize=16384
store.file.flushDiskMode=async
store.file.sessionReloadReadSize=100

#These configurations are required if the `store mode` is `db`. If `store.mode,store.lock.mode,store.session.mode` are not equal to `db`, you can remove the configuration block.
store.db.datasource=druid
store.db.dbType=mysql
store.db.driverClassName=com.mysql.jdbc.Driver
store.db.url=jdbc:mysql://127.0.0.1:3306/seata?useUnicode=true&rewriteBatchedStatements=true
store.db.user=username
store.db.password=password
store.db.minConn=5
store.db.maxConn=30
store.db.globalTable=global_table
store.db.branchTable=branch_table
store.db.distributedLockTable=distributed_lock
store.db.queryLimit=100
store.db.lockTable=lock_table
store.db.maxWait=5000

#These configurations are required if the `store mode` is `redis`. If `store.mode,store.lock.mode,store.session.mode` are not equal to `redis`, you can remove the configuration block.
store.redis.mode=single
store.redis.single.host=127.0.0.1
store.redis.single.port=6379
store.redis.sentinel.masterName=
store.redis.sentinel.sentinelHosts=
store.redis.sentinel.sentinelPassword=
store.redis.maxConn=10
store.redis.minConn=1
store.redis.maxTotal=100
store.redis.database=0
store.redis.password=
store.redis.queryLimit=100

#Transaction rule configuration, only for the server
server.recovery.committingRetryPeriod=1000
server.recovery.asynCommittingRetryPeriod=1000
server.recovery.rollbackingRetryPeriod=1000
server.recovery.timeoutRetryPeriod=1000
server.maxCommitRetryTimeout=-1
server.maxRollbackRetryTimeout=-1
server.rollbackFailedUnlockEnable=false
server.distributedLockExpireTime=10000
server.xaerNotaRetryTimeout=60000
server.session.branchAsyncQueueSize=5000
server.session.enableBranchAsyncRemove=false
server.enableParallelRequestHandle=false

#Metrics configuration, only for the server
metrics.enabled=false
metrics.registryType=compact
metrics.exporterList=prometheus
metrics.exporterPrometheusPort=9898
```

找到mysql相关的配置，只要这部分就可以了

```yaml

# 下面两行是在原来配置的基础上新增的
service.vgroupMapping.ruoyi-system-group=default
store.mode=db

store.db.datasource=druid
store.db.dbType=mysql
store.db.driverClassName=com.mysql.jdbc.Driver
store.db.url=jdbc:mysql://127.0.0.1:3306/seata?useUnicode=true&rewriteBatchedStatements=true
store.db.user=username
store.db.password=password
store.db.minConn=5
store.db.maxConn=30
store.db.globalTable=global_table
store.db.branchTable=branch_table
store.db.distributedLockTable=distributed_lock
store.db.queryLimit=100
store.db.lockTable=lock_table
store.db.maxWait=5000
```

### 5. 创建数据库及表结构

在数据库实例中创建一个库名为seata的数据库，然后执行<https://github.com/apache/incubator-seata/blob/develop/script/server/db/mysql.sql> 文件中的SQL内容：

```sql
-- -------------------------------- The script used when storeMode is 'db' --------------------------------
-- the table to store GlobalSession data
CREATE TABLE IF NOT EXISTS `global_table`
(
    `xid`                       VARCHAR(128) NOT NULL,
    `transaction_id`            BIGINT,
    `status`                    TINYINT      NOT NULL,
    `application_id`            VARCHAR(32),
    `transaction_service_group` VARCHAR(32),
    `transaction_name`          VARCHAR(128),
    `timeout`                   INT,
    `begin_time`                BIGINT,
    `application_data`          VARCHAR(2000),
    `gmt_create`                DATETIME,
    `gmt_modified`              DATETIME,
    PRIMARY KEY (`xid`),
    KEY `idx_status_gmt_modified` (`status` , `gmt_modified`),
    KEY `idx_transaction_id` (`transaction_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- the table to store BranchSession data
CREATE TABLE IF NOT EXISTS `branch_table`
(
    `branch_id`         BIGINT       NOT NULL,
    `xid`               VARCHAR(128) NOT NULL,
    `transaction_id`    BIGINT,
    `resource_group_id` VARCHAR(32),
    `resource_id`       VARCHAR(256),
    `branch_type`       VARCHAR(8),
    `status`            TINYINT,
    `client_id`         VARCHAR(64),
    `application_data`  VARCHAR(2000),
    `gmt_create`        DATETIME(6),
    `gmt_modified`      DATETIME(6),
    PRIMARY KEY (`branch_id`),
    KEY `idx_xid` (`xid`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- the table to store lock data
CREATE TABLE IF NOT EXISTS `lock_table`
(
    `row_key`        VARCHAR(128) NOT NULL,
    `xid`            VARCHAR(128),
    `transaction_id` BIGINT,
    `branch_id`      BIGINT       NOT NULL,
    `resource_id`    VARCHAR(256),
    `table_name`     VARCHAR(32),
    `pk`             VARCHAR(36),
    `status`         TINYINT      NOT NULL DEFAULT '0' COMMENT '0:locked ,1:rollbacking',
    `gmt_create`     DATETIME,
    `gmt_modified`   DATETIME,
    PRIMARY KEY (`row_key`),
    KEY `idx_status` (`status`),
    KEY `idx_branch_id` (`branch_id`),
    KEY `idx_xid` (`xid`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `distributed_lock`
(
    `lock_key`       CHAR(20) NOT NULL,
    `lock_value`     VARCHAR(20) NOT NULL,
    `expire`         BIGINT,
    primary key (`lock_key`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('AsyncCommitting', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('RetryCommitting', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('RetryRollbacking', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('TxTimeoutCheck', ' ', 0);

-- seata模式需要“undo_log”表，sql文件中没有，但官网提供了，也一并加上。  注意此处0.3.0+ 增加唯一索引 ux_undo_log
CREATE TABLE `undo_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `branch_id` bigint(20) NOT NULL,
  `xid` varchar(100) NOT NULL,
  `context` varchar(128) NOT NULL,
  `rollback_info` longblob NOT NULL,
  `log_status` int(11) NOT NULL,
  `log_created` datetime NOT NULL,
  `log_modified` datetime NOT NULL,
  `ext` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_undo_log` (`xid`,`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```

### 6. 启动Seata服务端

进入“seata/bin”目录，双击“seata-server.bat”，会弹出个黑窗口。

![](../../../public/images/Seata.assets/image-3.png)

然后创建一个目录：`/root/logs/seata/` 之后运行后会打印如下日志：



接下来，打开你的机器的7091和8091端口，通过7091端口可以访问你的seata的管理控制台页面：

输入用户名（默认seata）、密码（默认seata)，即可进入控制台。

![](../../../public/images/Seata.assets/image.png)

同时在nacos上能看到有一个seata的服务注册上去了：

![](../../../public/images/Seata.assets/image-1.png)



## Linux

到机器上，seata/bin目录下，执行：`sh seata-server.sh -h 116.62.53.29` 命令。通过-h指定本地的ip。

![](../../../public/images/Seata.assets/image-2.png)



# 参考文档

https://www.cnblogs.com/RunningSnails/p/18011595

https://seata.apache.org/zh-cn/docs/overview/what-is-seata

https://c.biancheng.net/springcloud/seata.html

https://blog.csdn.net/pi_tiger/article/details/131110412

https://seata.apache.org/zh-cn/docs/overview/history

https://blog.51cto.com/u_14172/13415378

https://seata.apache.org/zh-cn/

https://gitcode.csdn.net/65ec48ec1a836825ed7968fe.html

https://blog.csdn.net/weixin_36027342?type=blog

# 源码地址

