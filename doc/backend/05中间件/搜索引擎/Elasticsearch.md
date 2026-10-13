# Elasticsearch

官网：[Elasticsearch：官方分布式搜索和分析引擎 | Elastic](https://www.elastic.co/cn/elasticsearch/)

## 学习笔记

- <https://www.kuangstudy.com/bbs/1354069127022583809>
- <https://www.yuque.com/yingwenerjie/yir85b/cvqw61>
- <https://blog.csdn.net/u011863024/article/details/115721328>
- <https://blog.csdn.net/weixin_42633131/article/details/82902812>
- <https://www.cnblogs.com/arnoLixi/p/10402684.html>

## 相关插件

- **head 插件**：<https://github.com/mobz/elasticsearch-head>
- **Kibana**：[数据的探索、可视化和分析 | Elastic](https://www.elastic.co/cn/kibana/)
- **IK 分词器**：<https://github.com/medcl/elasticsearch-analysis-ik/releases>

下载地址：

- <https://www.elastic.co/cn/downloads/past-releases/elasticsearch-7-17-3>
- <https://get.infini.cloud/elasticsearch/analysis-ik/7.17.3>
- <https://artifacts.elastic.co/downloads/kibana/kibana-7.17.3-windows-x86_64.zip>
- <https://artifacts.elastic.co/downloads/kibana/kibana-8.13.0-windows-x86_64.zip>
- <https://www.elastic.co/cn/downloads/past-releases/elasticsearch-8-13-0>
- <https://www.elastic.co/cn/downloads/elasticsearch>

## 核心概念

Elasticsearch 是一个分布式搜索和分析引擎，基于 Apache Lucene 构建，主要用于全文搜索、结构化搜索和大规模数据分析，是 Elastic Stack（ELK）的一部分，通常与 Logstash 和 Kibana 一起使用。

- **索引(Index)**：类似数据库中的"数据库"，用于存储一类相关文档
- **文档(Document)**：类似数据库中的"行/记录"，JSON 格式的数据单元
- **字段(Field)**：类似数据库中的"列"，文档的属性
- **分片(Shard)**：索引的水平拆分，提升性能和容量
- **副本(Replica)**：分片的备份，提升可用性

## 基础操作

创建索引：

```bash
PUT /my_index
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 1
  }
}
```

## Spring Boot 接入

通过 spring-data 接入。

### 引入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
</dependency>
```

### 增加配置

在 `application.yml` 中增加 ES 连接配置：

```yaml
spring:
  elasticsearch:
    uris: http://<ES服务器IP>:9200
    username: elastic
    password: 123456
```

### 单元测试

```java
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

能运行成功，说明应用已与 ES 完成连通。
