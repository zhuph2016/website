# Sentinel

**Sentinel** 是阿里巴巴开源的**轻量级流量治理组件**，核心解决微服务架构中的**流量过载、服务雪崩、依赖故障**问题，是微服务稳定性保障的主流方案。

## 一、核心定位与发展

- **定位**：以流量为切入点，提供**流量控制、熔断降级、系统保护、热点防护**等能力，守护服务稳定性。
- **发展历程**：         
  - 2012年诞生，阿里内部用于流量控制。
  - 2018年开源，成为Spring Cloud Alibaba生态标配。
  - 2019年后推出C++、Go、Rust等多语言版本，适配云原生。

## 二、核心概念

- **资源（Resource）**：被保护的对象，如API接口、方法、数据库操作、远程调用等。
- **规则（Rule）**：定义保护策略，包括**流控规则、熔断规则、系统规则、热点规则**。
- **Slot 链**：Sentinel的核心处理模型，通过责任链模式依次执行**统计、规则校验、流量控制**等逻辑。

## 三、核心功能详解

### 1. 流量控制（Flow Control）

限制资源的访问速率，防止突发流量击垮服务。

- **控制维度**：QPS、并发线程数、调用关系。
- **流控模式**：         
  - **直接拒绝**：超阈值立即返回（默认）。
  - **预热（Warm Up）**：冷启动时阈值缓慢提升，适合秒杀场景。
  - **排队等待（漏桶）**：请求匀速通过，削峰填谷。
- **流控效果**：快速失败、排队、预热排队。

### 2. 熔断降级（Circuit Breaking）

当依赖服务异常时，自动切断调用，避免级联失败（雪崩）。

- **熔断策略**： 
  - **慢调用比例**：响应超时比例超过阈值。
  - **异常比例/异常数**：错误率或错误数超过阈值。
- **状态机**：**关闭 → 打开 → 半开 → 关闭**。

### 3. 热点参数限流（Param Flow）

针对请求中的**热点参数**（如商品ID、用户ID）单独限流，精细化防护。

### 4. 系统自适应保护（System Protection）

监控**CPU、Load、内存、线程数**等系统指标，自动调整流量，防止服务器整体崩溃。

### 5. 其他能力

- **黑白名单**：基于IP或来源控制访问。
- **授权规则**：基于调用方身份鉴权。
- **实时监控**：秒级指标采集，Dashboard可视化。

## 四、技术架构

- **核心层**：资源定义、规则管理、Slot 链、统计与判断。
- **适配层**：与Spring Cloud、Dubbo、gRPC、Web等框架集成。
- **控制台（Dashboard）**：规则配置、实时监控、熔断状态管理。
- **扩展层**：SPI机制，支持自定义规则、数据源（Nacos/Apollo）、监控上报。

## 五、核心优势

- **轻量高性能**：核心包小，性能损耗低，支持百万级QPS。
- **功能全面**：覆盖限流、熔断、热点、系统保护等全场景。
- **生态完善**：无缝集成主流微服务框架，多语言支持。
- **动态规则**：无需重启服务，实时调整策略。
- **可视化**：Dashboard直观监控与管理。

## 六、典型应用场景

- **电商秒杀**：限制商品接口QPS，热点商品单独限流。
- **微服务调用链**：熔断下游异常服务，防止雪崩。
- **消息队列削峰**：控制消费速度，保护下游系统。
- **API网关**：全局流量控制与认证。
- **云原生**：K8s中Pod级流量治理，适配弹性扩缩容。

## 七、与Hystrix对比

| 特性         | Sentinel                          | Hystrix              |
| ------------ | --------------------------------- | -------------------- |
| **社区状态** | 活跃维护                          | 已停更               |
| **核心能力** | 限流、熔断、热点、系统保护        | 熔断、线程隔离       |
| **隔离策略** | 信号量隔离（轻量）                | 线程池/信号量        |
| **流控算法** | 滑动窗口、令牌桶、漏桶            | 有限                 |
| **规则动态** | 支持                              | 不支持               |
| **监控粒度** | 秒级                              | 秒级                 |
| **生态**     | Spring Cloud Alibaba、Dubbo、Go等 | Spring Cloud Netflix |

## 八、快速入门（Spring Boot）

1. **引入依赖**         `<dependency> ``    <groupId>com.alibaba.cloud</groupId> ``    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId> ``</dependency>`
2. **配置Dashboard**         `spring.cloud.sentinel.transport.dashboard=localhost:8080`
3. **定义资源（注解）**         `@SentinelResource(value = "hello", blockHandler = "helloBlockHandler") ``public String hello() { ``    return "Hello Sentinel"; ``}`
4. **启动Dashboard**（jar包运行）         `java -jar sentinel-dashboard.jar`
5. **访问控制台**：`http://localhost:8080`，配置流控/熔断规则。

## 九、总结

Sentinel是**微服务流量治理的事实标准**，以其轻量、高效、功能全面的特点，成为替代Hystrix的首选方案。它不仅能解决流量过载问题，更能通过熔断降级、系统保护等机制，构建高可用的分布式系统。

## 十、安装sentinel dashboard

从https://github.com/alibaba/Sentinel/releases 下载dashboard的jar文件

通过以下命令在机器上启动：

```
nohup java -Dserver.port=8080 -Dcsp.sentinel.dashboard.server=localhost:8080 -Dproject.name=sentinel-dashboard -jar sentinel-dashboard.jar &
```

如果8080被占用，就换一个其他的端口号即可。

启动后可以通过IP:8080访问控制台，控制台账号密码默认都是sentinel