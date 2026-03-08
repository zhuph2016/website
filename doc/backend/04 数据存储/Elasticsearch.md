# Elasticsearch
# 1. 核心概念
- **索引(Index)**：类似数据库中的"数据库"，用于存储一类相关文档
- **文档(Document)**：类似数据库中的"行/记录"，JSON 格式的数据单元
- **字段(Field)**：类似数据库中的"列"，文档的属性
- **分片(Shard)**：索引的水平拆分，提升性能和容量
- **副本(Replica)**：分片的备份，提升可用性

# 2. 基础操作
创建索引

```bash
PUT /my_index
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 1
  }
}
```

# 3. 框架接入

Elasticsearch 是一个分布式搜索和分析引擎，基于 Apache Lucene 构建。它主要用于全文搜索、结构化搜索和分析大规模数据，是 Elastic Stack（ELK Stack）的一部分，通常与 Logstash 和 Kibana 一起使用。

1、引入依赖

这里通过 spring-data 接入

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
</dependency>
```

2、增加配置

在 application.yml 中增加 es 的连接配置：

```
spring:
  elasticsearch:
    uris: http://116.xx.xx.29:9200
    username: elastic
    password: 123456
```

3、单元测试

```
package cn.hollis.nft.turbo.collection.infrastructure.repo;

import cn.hollis.nft.turbo.collection.CollectionBaseTest;
import cn.hollis.nft.turbo.collection.domain.entity.Collection;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.DocumentOperations;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.IndexOperations;
import org.springframework.data.elasticsearch.core.SearchOperations;

public class EsCollectionRepositoryTest extends CollectionBaseTest {

    @Autowired
    private ElasticsearchOperations elasticsearchOperations;

    @Test
    public void test() {
        IndexOperations indexOperations = elasticsearchOperations.indexOps(Collection.class);
        Assert.assertEquals("nfturbo_collection", indexOperations.getIndexCoordinates().getIndexName());
    }

}
```

能运行成功，说明我们已经通过应用和 ES 完成了连通！