# RabbitMQ 核心文档

## 1. 什么是 RabbitMQ？

RabbitMQ 是一个开源的消息代理（Message Broker），实现了高级消息队列协议（AMQP），用于在分布式系统中实现高效、可靠的消息传递。

- 核心作用：解耦系统组件，实现异步通信
- 支持语言：Java、Python、Go、Node.js、.NET 等
- 部署方式：单机、集群、云服务（AWS MQ、Azure Service Bus 等）

---

## 2. 核心概念

| 概念            | 说明                         |
| --------------- | ---------------------------- |
| **Producer**    | 消息生产者，发送消息到交换机 |
| **Consumer**    | 消息消费者，从队列中消费消息 |
| **Exchange**    | 交换机，负责将消息路由到队列 |
| **Queue**       | 消息队列，存储待消费的消息   |
| **Binding**     | 绑定，将队列与交换机关联     |
| **Routing Key** | 路由键，交换机根据它路由消息 |

---

## 3. 交换机类型

1.  **Direct Exchange**
    - 精确匹配 Routing Key
    - 适合一对一的消息路由场景

2.  **Topic Exchange**
    - 支持通配符匹配（`*` 匹配一个词，`#` 匹配多个词）
    - 适合发布/订阅模式

3.  **Fanout Exchange**
    - 广播模式，忽略 Routing Key
    - 适合多消费者订阅同一消息

4.  **Headers Exchange**
    - 根据消息头属性路由
    - 较少使用，灵活性高

---

## 4. 快速开始

### 4.1 安装与启动

```bash
# Docker 方式（推荐）
docker run -d -p 5672:5672 -p 15672:15672 rabbitmq:3-management

# 访问管理界面
# http://localhost:15672
# 默认账号：guest / guest
```

### 4.2 Java 示例（Spring Boot）

**依赖：**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

**配置：**
```yaml
spring:
  rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest
```

**生产者：**
```java
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Producer {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    private final DirectExchange exchange = new DirectExchange("direct.exchange");

    public void sendMessage(String message) {
        rabbitTemplate.convertAndSend(exchange.getName(), "direct.key", message);
    }
}
```

**消费者：**
```java
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class Consumer {
    @RabbitListener(queues = "direct.queue")
    public void handleMessage(String message) {
        System.out.println("收到消息: " + message);
    }
}
```

---

## 5. 高级特性

### 5.1 消息确认（ACK）

- **自动确认**：消息投递后立即确认，可能导致消息丢失
- **手动确认**：消费者处理完成后手动确认，更安全

```java
@RabbitListener(queues = "my.queue")
public void handleMessage(Message message, Channel channel) throws IOException {
    try {
        // 处理消息
        System.out.println("处理消息: " + new String(message.getBody()));
        // 手动确认
        channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
    } catch (Exception e) {
        // 拒绝消息，重新入队
        channel.basicNack(message.getMessageProperties().getDeliveryTag(), false, true);
    }
}
```

### 5.2 死信队列（DLQ）

当消息无法被正常消费时，会被转发到死信队列，用于后续排查和处理。

- 触发条件：消息被拒绝、TTL 过期、队列达到最大长度
- 应用场景：异常消息处理、延迟消息实现

### 5.3 延迟消息

通过插件或死信队列实现消息延迟投递，适用于订单超时、重试机制等场景。

---

## 6. 集群与高可用

- **镜像队列**：将队列镜像到多个节点，提高可用性
- **负载均衡**：通过 HAProxy 或 Nginx 分发连接
- **分区处理**：网络分区时的一致性策略（如 pause_minority）

---

## 7. 监控与运维

- 管理界面：http://localhost:15672
- 常用指标：队列长度、消息速率、消费者数量
- 日志路径：`/var/log/rabbitmq/`（Linux）

---

## 8. 常见问题

1.  **消息丢失**
    - 检查生产者确认机制（publisher confirms）
    - 启用持久化（durable: true）

2.  **消息重复**
    - 消费者幂等设计
    - 使用消息 ID 去重

3.  **性能瓶颈**
    - 优化预取计数（prefetch count）
    - 合理设置队列和交换机数量

---

如果你需要，我可以帮你把这份文档拆分成多个 `.md` 文件，并自动生成 VitePress 侧边栏导航配置，这样就能直接集成到你的网站里。需要我帮你做吗？