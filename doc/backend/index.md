# 后端开发技术文档（精简版）

## 1. 核心技术栈

- **开发语言**：Java（Spring Boot）/ Go / Node.js（Express/NestJS）/ Python（Django/Flask）

- **框架**：Spring Boot 2.x/3.x、MyBatis-Plus、Spring Security（权限）

- **数据库**：MySQL 8.0、Redis（缓存）、MongoDB（非关系型，可选）

- **中间件**：Kafka/RabbitMQ（消息队列）、Elasticsearch（检索，可选）

- **部署工具**：Docker、Docker Compose、Jenkins（CI/CD）

- **API规范**：RESTful API、Swagger/knife4j（接口文档）

## 2. 项目结构规范（以Spring Boot为例）

```plain text
project/
├── src/main/java/com/example/
│   ├── config/          # 配置类（数据库、缓存、安全等）
│   ├── controller/      # 接口层（接收请求、返回响应）
│   ├── service/         # 业务逻辑层（接口+实现）
│   │   └── impl/        # 业务逻辑实现类
│   ├── mapper/          # 数据访问层（MyBatis接口）
│   ├── model/           # 数据模型（实体类、DTO、VO）
│   │   ├── entity/      # 数据库实体
│   │   ├── dto/         # 数据传输对象
│   │   └── vo/          # 视图返回对象
│   ├── utils/           # 工具类（加密、日期、校验等）
│   ├── exception/       # 异常处理（全局异常、自定义异常）
│   └── Application.java # 项目入口类
├── src/main/resources/
│   ├── application.yml  # 全局配置（环境、数据库、缓存等）
│   ├── mapper/          # MyBatis XML映射文件
│   └── static/          # 静态资源（可选）
└── pom.xml              # 依赖管理（Maven）
```

## 3. 核心规范

### 3.1 接口规范（RESTful）

- 请求方式：GET（查询）、POST（新增）、PUT（修改）、DELETE（删除）

- URL命名：全小写、用连字符（-）分隔，如 /api/user/list、/api/user/{id}

- 响应格式（统一封装）：

```json
{
  "code": 200,          // 状态码（200成功、400参数错误、500服务器错误）
  "message": "success", // 提示信息
  "data": {}            // 响应数据（可选）
}
```

### 3.2 代码规范

- 类命名：帕斯卡命名法（PascalCase），如 UserController、UserService

- 方法/变量命名：驼峰命名法（camelCase），如 getUserById、userName

- 注释规范：类上添加类说明，方法上添加参数、返回值说明，关键逻辑添加行注释

- 异常处理：统一全局异常拦截，避免try-catch泛滥，自定义业务异常（如 BusinessException）

### 3.3 数据库规范

- 表命名：前缀+业务模块，全小写、下划线分隔，如 sys_user、blog_article

- 字段命名：全小写、下划线分隔，避免关键字，如 user_id、user_name

- 主键：统一使用自增主键（id），或雪花算法生成分布式ID（分布式项目）

- 索引：给频繁查询的字段（如 user_name、phone）建立索引，避免过度索引

- SQL规范：避免SELECT *，使用参数绑定（防止SQL注入），复杂查询拆分

## 4. 核心功能实现示例

### 4.1 接口开发（Spring Boot）

```java
// Controller层
@RestController
@RequestMapping("/api/user")
@Tag(name = "用户管理", description = "用户CRUD接口")
public class UserController {

    @Autowired
    private UserService userService;

    // 查询单个用户
    @GetMapping("/{id}")
    @Operation(summary = "根据ID查询用户")
    public ResultVo<UserVO> getUserById(@PathVariable Long id) {
        UserVO user = userService.getById(id);
        return ResultVo.success(user);
    }

    // 新增用户
    @PostMapping
    @Operation(summary = "新增用户")
    public ResultVo<Void> addUser(@RequestBody @Valid UserDTO userDTO) {
        userService.add(userDTO);
        return ResultVo.success();
    }
}
```

### 4.2 缓存使用（Redis）

```java
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private StringRedisTemplate redisTemplate;

    private static final String CACHE_KEY_USER = "user:id:";

    @Override
    public UserVO getById(Long id) {
        // 先查缓存
        String cacheKey = CACHE_KEY_USER + id;
        String cacheValue = redisTemplate.opsForValue().get(cacheKey);
        if (StrUtil.isNotBlank(cacheValue)) {
            return JSON.parseObject(cacheValue, UserVO.class);
        }

        // 缓存未命中，查数据库
        User user = userMapper.selectById(id);
        if (user == null) {
            throw new BusinessException("用户不存在");
        }

        // 存入缓存（设置过期时间，避免缓存雪崩）
        redisTemplate.opsForValue().set(cacheKey, JSON.toJSONString(user), 1, TimeUnit.HOURS);
        return BeanUtil.copyProperties(user, UserVO.class);
    }
}
```

## 5. 性能优化

- **缓存优化**：热点数据缓存（Redis），避免缓存穿透、击穿、雪崩

- **数据库优化**：合理索引、分表分库（海量数据）、SQL优化、读写分离

- **接口优化**：接口防抖、限流（Redis/ZooKeeper），批量操作替代循环操作

- **并发优化**：使用线程池、避免锁竞争，高并发场景用分布式锁

## 6. 部署与运维

- **打包部署**：Maven打包为jar包，Docker容器化部署，配置Dockerfile

- **环境配置**：区分开发（dev）、测试（test）、生产（prod）环境，使用环境变量

- **日志管理**：使用SLF4J+Logback，按级别输出日志，关键操作记录日志

- **监控告警**：集成Prometheus+Grafana，监控服务状态、接口性能、数据库状态

## 7. 安全规范

- 接口权限：使用Token（JWT）认证，结合Spring Security控制接口访问权限

- 数据安全：敏感数据（密码）加密存储（BCrypt），接口传输使用HTTPS

- 防攻击：防止SQL注入、XSS攻击、CSRF攻击，参数校验（JSR380）

这份文档涵盖了后端开发核心内容，需要我帮你**补充某类语言（如Go/Node.js）的专属示例**，让文档更贴合你的技术栈吗？