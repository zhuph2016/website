# Elasticsearch 快速入门
## 1. 核心概念
- **索引(Index)**：类似数据库中的"数据库"，用于存储一类相关文档
- **文档(Document)**：类似数据库中的"行/记录"，JSON 格式的数据单元
- **字段(Field)**：类似数据库中的"列"，文档的属性
- **分片(Shard)**：索引的水平拆分，提升性能和容量
- **副本(Replica)**：分片的备份，提升可用性

## 2. 基础操作
### 2.1 创建索引
```bash
PUT /my_index
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 1
  }
}
```