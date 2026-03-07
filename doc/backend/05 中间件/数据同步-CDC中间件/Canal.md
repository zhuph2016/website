# 简介

Canal 是由阿里巴巴开源的分布式数据库同步系统，主要用于实现MySQL数据库的日志解析和实时增量数据订阅与消费，广泛应用于数据库变更消息的捕获、数据迁移、缓存更新等场景。

![](/images/Canal.assets/image.png)

基于日志增量订阅和消费的业务包括

* 数据库镜像

* 数据库实时备份

* 索引构建和实时维护(拆分异构索引、倒排索引等)

* 业务 cache 刷新

* 带业务逻辑的增量数据处理

当前的 canal 支持源端 MySQL 版本包括 5.1.x , 5.5.x , 5.6.x , 5.7.x , 8.0.x

# 产生背景

译意为水道/管道/沟渠，主要用途是基于 MySQL 数据库增量日志解析，提供增量数据订阅和消费

早期阿里巴巴因为杭州和美国双机房部署，存在跨机房同步的业务需求，实现方式主要是基于业务 trigger 获取增量变更。从 2010 年开始，业务逐步尝试数据库日志解析获取增量变更进行同步，由此衍生出了大量的数据库增量订阅和消费业务。

# 工作原理

**MySQL主备复制原理**

MySQL master 将数据变更写入二进制日志( binary log, 其中记录叫做二进制日志事件binary log events，可以通过 show binlog events 进行查看)

MySQL slave 将 master 的 binary log events 拷贝到它的中继日志(relay log)

MySQL slave 重放 relay log 中事件，将数据变更反映它自己的数据

**canal 工作原理**

canal 模拟 MySQL slave 的交互协议，伪装自己为 MySQL slave ，向 MySQL master 发送dump 协议

MySQL master 收到 dump 请求，开始推送 binary log 给 slave (即 canal )

canal 解析 binary log 对象(原始为 byte 流)

**Canal咋实现的？**
&#x20;说白了，它靠的是MySQL的binlog。要让Canal跑起来，MySQL得满足两个条件：

1. binlog得开着，格式还得是`ROW`（记录最全的那种）。

2. 得给Canal整一个专用账号，权限得有`REPLICATION SLAVE`和`REPLICATION CLIENT`。

# 安装部署

## Windows

* 下载地址：

<https://github.com/alibaba/canal/releases>&#x20;

![](/images/Canal.assets/image-1.png)

### **Deployer**

**服务端 canal.deployer**

* 作用&#x20;

连上MySQL，掏出binlog解析完再丢给客户端。`canal.properties`管全局，`instance.properties`管具体实例（比如MySQL地址、账号）。

* 修改实例配置

&#x20;conf/example/instance.properties

```yaml
# 配置 slaveId 自定义,不等于 mysql 的 server Id 即可 ；伪装成从库的slaveId，不能与MySQL重复
canal.instance.mysql.slaveId=10 
# 数据库地址:自己的数据库ip+端口
canal.instance.master.address=127.0.0.1:3306 
 
# 数据库用户名和密码 
canal.instance.dbUsername=xxx 
canal.instance.dbPassword=xxx
#代表数据库的编码方式对应到 java 中的编码类型，比如 UTF-8，GBK , ISO-8859-1
canal.instance.connectionCharset = UTF-8
 
# 指定库和表，这里的 .* 表示 canal.instance.master.address 下面的所有数据库
canal.instance.filter.regex=.*\\..*
```

分别修改slaveId,address,dbUsername,dbPassword这四个内容

* 启动报错

<span style="color: rgb(143,149,158); background-color: inherit">在bin/目录下控制台启动startup.bat,出现报错</span>

```sql
D:\...\canal.deployer-1.1.6\bin>startup.bat
.......
com.alibaba.otter.canal.deployer.CanalLauncher
Unrecognized VM option 'PermSize=128m'
Error: Could not create the Java Virtual Machine.
Error: A fatal exception has occurred. Program will exit.
```

-XX:**PermSize**和-XX:MaxPermSize是Java 7及之前版本用于设置永久代（Permanent Generation）内存的参数。

从Java 8开始，永久代被移除，改用元空间（Metaspace），因此旧参数不再有效。若你的Java版本是8或更高，需删除或替换此参数

java -Xms128m -Xmx512m -XX:PermSize=128m ...其他参数...

java -Xms128m -Xmx512m -XX:**MetaspaceSize**=128m ...其他参数...

![](/images/Canal.assets/image-2.png)

### **Adapter**

**适配器 canal.adapter**

* 作用

把Deployer扔来的数据收拾收拾，变成业务能用的格式，比如塞进Kafka、更新Elasticsearch。支持插拔式，想咋整就咋整。

* 应用场景

对接上游消息，包括kafka、rocketmq、canal-server

实现mysql数据的增量同步

实现mysql数据的全量同步

下游写入支持mysql、es、hbase

* application.yml

此处只展示修改的配置

```yaml
canal.conf:
  consumerProperties:
          # 单机配置属性
          # canal.tcp.server.host: 127.0.0.1:11111
  # 此配置数据库信息与canal-server配置的数据库信息相同
  srcDataSources:
          defaultDs:
            url: jbdc:mysql://127.0.0.1:3306/canal_test
            username: canal
            password: canal
  # 配置 ES信息
  canalAdapters:
    groups:
      outerAdapters: 
              - name: logger
              - name: es7
                hosts: http://127.0.0.1:9200
                properties:
                        mode: rest
                        security.auth: es账号:es密码
                        cluster.name: es的名字
```

* 适配器表映射文件

cd conf/es7/

cp mytest\_user.yml canal\_test\_order.yml

rm biz\_order.yml customer.yml mytest\_user.yml

vi canal\_test\_order.yml

```yaml
dataSourceKey: defaultDS
destination: example
groupId: g1
esMapping:
  _index: canal_test_order
  _id: _id
# 这个必须要加，源文件没有
  _type: _doc
  upsert: true
#  pk: id
  sql: "select
        a.id as _id,
        a.order_no as orderNo,
        a.order_name as orderName
        from t_order a"
#  objFields:
#    _labels: array:;
  etlCondition: "where a.c_time>={}"
  commitBatch: 3000
```

## Linux

```plain&#x20;text
# canal-server
https://github.com/alibaba/canal/releases/download/canal-1.1.5/canal.deployer-1.1.5.tar.gz
# canal-adapter
https://github.com/alibaba/canal/releases/download/canal-1.1.5/canal.adapter-1.1.5.tar.gz
```

# MySQL配置

```python

# MySQL配置文件  编辑my.cnf  
[mysqld]  
log-bin=mysql-bin  # 开binlog  
binlog-format=ROW  # 必须是ROW，别写错  
server_id=1 # 配置 MySQL replaction 需要定义，不要和 canal 的 slaveId 重复
#注：如果canal监听的是mysql slave库, 请在slave库加上如下配置
--logs-slave-updates

# 查看配置是否生效
show variables like 'log_bin'; # 是否开启binlog
log_bin        ON             
show variables like 'binlog_format'; # binlog模式
binlog_format        ROW

# 授权canal连接MySQL的账号具有作为MySQL slave的权限，如果有账号可以直接grant 建个Canal用户  
mysql> CREATE USER 'canal'@'%' IDENTIFIED BY 'canal';  
mysql> GRANT SELECT, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'canal'@'%';  
mysql> FLUSH PRIVILEGES;  
```

# Elasticsearch

主要考虑 MySQL插入数据，ES同步新增记录

索引关联

# 参考文档

https://blog.csdn.net/2301_81016208/article/details/147965087

https://developer.aliyun.com/article/891362

[Spring Boot整合Canal实战：Deployer与Adapter详细配置](https://juejin.cn/post/7478881352694628386)

https://zhuanlan.zhihu.com/p/567936879

# 源码地址

