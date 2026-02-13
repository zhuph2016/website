# Kafka 快速入门
## 1. 核心概念
- **主题(Topic)**：消息分类的逻辑容器，类似数据库的表
- **分区(Partition)**：Topic 的物理拆分，提升并发和存储能力，每个分区有序且不可变
- **副本(Replica)**：分区的备份，保障数据高可用
- **生产者(Producer)**：向 Topic 发送消息的客户端
- **消费者(Consumer)**：从 Topic 读取消息的客户端
- **消费者组(Consumer Group)**：多个消费者组成的组，共同消费一个 Topic 的分区
- **Broker**：Kafka 集群中的单个服务器节点

## 2. 基础操作（命令行）
### 2.1 创建 Topic
```bash
# 创建名为 test_topic 的主题，1个分区，1个副本
kafka-topics.sh --create --topic test_topic \
  --bootstrap-server localhost:9092 \
  --partitions 1 --replication-factor 1
```