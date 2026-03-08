# Caffeine

JetCache 是一个 Java 缓存库，旨在提供简洁、高性能且通用的缓存解决方案。它支持多种缓存策略和缓存存储类型，包括本地缓存（如 Caffeine、Guava 等）和分布式缓存（ Redis、Memcached 等）

Caffeine 是一个高性能的 Java 缓存库，受到了 Google Guava 缓存库的启发。它主要用于实现本地缓存，具有高效的缓存命中率和低延迟的特点。Caffeine 提供了灵活的缓存策略和强大的功能，使其成为许多 Java 应用程序的首选缓存解决方案。

1、依赖引入：

```
<!--    Caffeine    -->
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
    <version>3.1.8</version>
</dependency>

<!--    JetCache    -->
<dependency>
    <groupId>com.alicp.jetcache</groupId>
    <artifactId>jetcache-starter-redisson</artifactId>
    <version>2.7.5</version>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-logging</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!--     Redis  -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

2、文件配置：

在配置文件中增加和jetcache有关的配置：

```
jetcache:
  statIntervalMinutes: 1        # 设置统计信息收集的时间间隔为1分钟
  areaInCacheName: false        # 禁用在缓存名称中包含区域名称
  local:
    default:
      type: caffeine            # 使用Caffeine作为本地缓存实现
      keyConvertor: fastjson2   # 使用Fastjson2进行键转换
  remote:
    default:
      type: redisson            # 使用Redisson作为远程缓存实现
      keyConvertor: fastjson2   # 使用Fastjson2进行键转换
      broadcastChannel: ${spring.application.name}  # 广播频道名称设置为Spring应用程序名称
      keyPrefix: ${spring.application.name}         # 键前缀设置为Spring应用程序名称
      valueEncoder: java        # 使用Java进行值编码
      valueDecoder: java        # 使用Java进行值解码
      defaultExpireInMillis: 5000  # 设置默认过期时间为5000毫秒（5秒）
```

3、开启注解

在启动类上增加@EnableMethodCache注解

```
@EnableMethodCache(basePackages = "cn.hollis.nft.turbo")public class Application {}
```