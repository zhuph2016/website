# 足球家 Football Home

> 足球垂直领域一体化平台：新闻资讯 · 赛程数据 · 球迷社区 · 电商商城
> 后端统一包名前缀：`com.zph.footballhome`，Maven groupId：`com.zph.footballhome`

[![gitee](https://img.shields.io/badge/足球家系统-football--home-blue)](https://gitee.com/zhuph/football-home)
![version](https://img.shields.io/badge/version-1.0.0-blue)
![jdk](https://img.shields.io/badge/JDK-17-orange)
![spring-boot](https://img.shields.io/badge/Spring%20Boot-3.2.x-green)
![vue](https://img.shields.io/badge/Vue-3-42b883)
![android](https://img.shields.io/badge/Android-Kotlin%20%7C%20Compose-3ddc84)

## 前言

`football-home` 项目主要用于个人的学习使用。

## 目录

- [一、项目介绍](#一项目介绍)
- [二、技术栈](#二技术栈)
- [三、工程结构](#三工程结构)
- [四、快速开始](#四快速开始)
- [五、开发规范](#五开发规范)
- [六、当前进度](#六当前进度)
- [七、文档导航](#七文档导航)
- [八、许可证](#八许可证)

---

## 一、项目介绍

「足球家」是一个足球垂直领域平台，包含三个端：

| 端         | 说明                                                         | 技术栈                                                    |
| ---------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| PC 管理端  | 管理员运维：系统监控、数据维护、内容管理                     | Vue3 + Vite + TypeScript + Element Plus + Pinia + Axios   |
| PC 用户端  | C 端用户：新闻、比赛、数据、商城、社区                       | Vue3 + Nuxt3 + TypeScript + TailwindCSS（SSR）            |
| 移动端 App | 足球资讯与球迷社区 App，首页/新闻/视频/数据/个人中心五大模块 | Kotlin + Jetpack Compose + Material3 + Hilt + Navigation3 |

---

## 二、技术栈

### 后端

| 分类 | 组件                                    |
| ---- | --------------------------------------- |
| 基础 | JDK 17、Maven 多模块                    |
| 框架 | Spring Boot 3.2.x、Spring Cloud Alibaba |
| 网关 | Spring Cloud Gateway（8082）            |
| ORM  | MyBatis-Plus 3.5.x                      |
| 存储 | MySQL 8.0、Redis 7.x                    |
| 消息 | RocketMQ（可选，预留）                  |
| 任务 | XXL-Job 2.4.x                           |
| 鉴权 | Spring Security + JWT（无状态）         |
| 文档 | Knife4j（OpenAPI 3）                    |
| 工具 | Hutool、Lombok                          |

### 前端

| 端     | 组件                                                         |
| ------ | ------------------------------------------------------------ |
| 管理端 | 基于 vue-vben-admin 5.7（pnpm + turbo monorepo）：Vue 3、Vite、TypeScript、Element Plus（`apps/web-ele`）、Pinia、TailwindCSS |
| 用户端 | Nuxt 3.11、TypeScript、TailwindCSS、Nitro（服务端代理）      |

### 移动端（Android）

| 分类     | 选型                                                       |
| -------- | ---------------------------------------------------------- |
| UI       | Jetpack Compose（BOM 2026.03.01）+ Material3               |
| 架构     | 多模块 MVVM + Repository 模式                              |
| 导航     | Navigation3（类型安全路由）                                |
| 依赖注入 | Hilt 2.59.2                                                |
| 网络     | Retrofit 3 + OkHttp 5 + kotlinx.serialization + Chucker    |
| 本地存储 | MMKV（登录态/用户信息/搜索历史）、Room（收藏/购物车/订单） |
| 图片     | Coil 2.7                                                   |

> 移动端后端对接 `football-home-server-app`（`http://10.0.2.2:8281/`，dev 模拟器）。

---

## 三、工程结构

```text
football-home/
├── pom.xml                                    # 父 POM（packaging=pom，统一插件与版本）
├── CHANGELOG.md                               # 版本变更记录
├── README.md
│
├── football-home-dependencies/                # 依赖管理 BOM（所有三方版本唯一来源）
│
├── football-home-common/                      # 通用基础层
│   └── com.zph.footballhome.common
│       ├── core/                              # 常量、R 结果封装、PageParam/PageResult、异常、枚举
│       ├── redis/                             # Redis 配置与工具
│       ├── mybatis/                           # MyBatis-Plus 配置、字段自动填充
│       ├── security/                          # JwtUtils、JwtAuthenticationFilter、UserContext、LoginUser、Inner
│       └── web/                               # 全局异常、跨域、Jackson、OpenAPI 配置
│
├── football-home-module/                      # 业务模块集合（api 实体层 + biz 实现层）
│   ├── football-home-module-system/           # 系统管理（三端通用）：用户/角色/菜单/部门/字典/日志/通知/OSS
│   ├── football-home-module-member/           # C 端会员：注册登录、主队关注、赛事预约提醒
│   ├── football-home-module-news/             # 新闻资讯：栏目、文章、评论、推荐
│   ├── football-home-module-match/            # 比赛赛事：联赛/球队/赛程/战报/图文直播
│   ├── football-home-module-data/             # 数据统计：积分榜、射手榜、历史数据
│   ├── football-home-module-mall/             # 商城：SKU 商品、库存防超卖、订单状态机、售后
│   ├── football-home-module-video/            # 博客文章：创作者「懂球号」内容
│   ├── football-home-module-community/        # 聊天社区：圈子、帖子、点赞评论
│   ├── football-home-module-gallery/          # 足球图库：照片墙、赛事图集
│   ├── football-home-module-home/             # 首页聚合：推荐流、Banner、快捷入口
│   └── football-home-module-tool/             # 工具模块：JWT 生成、压测脚本等
│
├── football-home-server/                      # 启动模块集合
│   ├── football-home-server-gateway/          # 网关（8082，路由转发、跨域、后续限流/鉴权扩展点）
│   ├── football-home-server-admin/            # PC 管理端服务（8083）
│   ├── football-home-server-portal/           # PC 用户端服务（8181）
│   ├── football-home-server-app/              # 移动端 API 服务（8281，复用 member/news/match/data/mall/community 等模块做裁剪适配）
│   ├── football-home-server-monitor/          # 监控中心（8084，Spring Boot Admin）
│   └── football-home-server-job/              # 定时任务执行器（8085，XXL-Job，赛程同步/数据统计等）
│
├── football-home-ui-admin/                    # 管理端前端（vue-vben-admin monorepo，主应用 apps/web-ele）
│   ├── apps/web-ele/                          # Element Plus 版应用（对接 8083 管理端 API）
│   ├── packages/ / internal/                  # vben 官方组件包与构建配置
│   └── .npmrc                                # pnpm store/cache 固定在项目内
│
├── football-home-ui-portal/                   # 用户端前端（Nuxt3 + TailwindCSS）
│
├── football-home-ui-app/                     # 移动端 Android（Kotlin + Jetpack Compose，多模块 MVVM）
│   ├── app/                                  # 壳：Application / MainActivity / AppNavHost
│   ├── build-logic/                          # Gradle 约定插件（application/library/feature/hilt/compose）
│   ├── core/                                 # common/model/network/datastore/database/data/designsystem/ui/util/result
│   └── feature/                              # 业务特性模块（首页/新闻/视频/数据/个人中心等）
│
└── doc/                                      # 项目文档
    ├── requirements/                         # 需求文档
    ├── bugs/                                 # Bug 修改记录
    ├── sql/                                  # SQL 脚本（建表/初始化/升级）
    └── scripts/                              # 辅助脚本
```

---

## 四、快速开始

### 0. 基础设施（先于一切服务）

| 组件                     | 说明                                                         |
| ------------------------ | ------------------------------------------------------------ |
| MySQL 8.0                | 执行 `doc/sql/` 下脚本完成建库表与初始化（`football_home_schema.sql` + `football_home_data.sql`） |
| Redis 7.x                | 缓存 / 登录态辅助，默认 `localhost:6379`                     |
| XXL-Job 调度中心（可选） | 使用 job 模块时部署，默认 `localhost:8080/xxl-job-admin`     |

> 数据库连接等配置在各 server 模块的 `application-dev.yml` 中调整。

### 1. 后端服务（按序启动）

| 顺序 | 模块                         | 端口 | 作用                                                         |
| ---- | ---------------------------- | ---- | ------------------------------------------------------------ |
| 1    | football-home-server-gateway | 8082 | 统一入口：路由转发、跨域、后续限流/鉴权扩展点                |
| 2    | football-home-server-admin   | 8083 | 管理端 API：登录认证、系统用户/角色/菜单管理、内容与数据维护接口 |
| 2    | football-home-server-portal  | 8181 | 用户端 API：新闻、赛程、数据、商城、社区（与 admin 并行启动） |
| 2    | football-home-server-app     | 8281 | 移动端 API：复用各业务模块做裁剪适配                         |
| 3    | football-home-server-monitor | 8084 | Spring Boot Admin 监控：查看各服务健康/指标（可选）          |
| 3    | football-home-server-job     | 8085 | XXL-Job 执行器：赛程同步、数据统计等定时任务（可选，需调度中心） |

后端一键构建：

```bash
mvn clean package -DskipTests
# 或仅编译验证
mvn clean compile
```

单个服务启动示例（IDE 中直接运行各 Application 主类也可）：

```bash
java -jar football-home-server/football-home-server-admin/target/football-home-server-admin-1.0.0.jar
```

### 2. 前端服务

| 顺序 | 工程                    | 端口 | 代理目标                                           | 启动命令                       |
| ---- | ----------------------- | ---- | -------------------------------------------------- | ------------------------------ |
| 1    | football-home-ui-admin  | 3083 | `/api → http://localhost:8083`（vite.config.ts）   | `pnpm install && pnpm dev:ele` |
| 1    | football-home-ui-portal | 3181 | `/api → http://localhost:8181`（Nitro 服务端代理） | `npm install && npm run dev`   |

> 管理端要求 Node ≥ 22.18 / pnpm ≥ 11（`npx pnpm@11.16.0` 可用）；构建：`pnpm build:ele`。

#### football-home-ui-portal 门户

**首页**

![img.png](/images/football-home.assets/img.png)

**新闻**

![img_1.png](/images/football-home.assets/img_1.png)

**视频**

![img_2.png](/images/football-home.assets/img_2.png)

**图库**

![img_3.png](/images/football-home.assets/img_3.png)

**赛程**

![img_4.png](/images/football-home.assets/img_4.png)

**数据**

![img_5.png](/images/football-home.assets/img_5.png)

**商城**

![img_6.png](/images/football-home.assets/img_6.png)

**社区**

![img_7.png](/images/football-home.assets/img_7.png)

#### football-home-ui-admin 管理后台

**首页**

![img_8.png](/images/football-home.assets/img_8.png)

**菜单**

![img_9.png](/images/football-home.assets/img_9.png)

**文件管理**

![img_10.png](/images/football-home.assets/img_10.png)

**系统监控**

![img_11.png](/images/football-home.assets/img_11.png)

**首页管理**

![img_12.png](/images/football-home.assets/img_12.png)

**商品管理**

![img_13.png](/images/football-home.assets/img_13.png)

**社区管理**

![img_14.png](/images/football-home.assets/img_14.png)

**会员管理**

![img_15.png](/images/football-home.assets/img_15.png)

**AI 会话**

![img_16.png](/images/football-home.assets/img_16.png)

### 3. 移动端（Android）

```bash
cd football-home-ui-app
# 使用 Android Studio 打开，或命令行构建
./gradlew assembleDebug
```

> 要求 Android Studio Hedgehog+ / JDK 17+ / Gradle 8.x；模拟器访问后端使用 `10.0.2.2:8281`。

### 4. 访问入口

| 入口                       | 地址                                                  |
| -------------------------- | ----------------------------------------------------- |
| 管理端前端                 | `http://localhost:3083` （默认账号 `admin / admin123`） |
| 用户端前端                 | `http://localhost:3181`                                 |
| 管理端 API 文档（Knife4j） | `http://localhost:8083/doc.html`                        |
| 网关                       | `http://localhost:8082`                                 |

---

## 五、开发规范

- **统一响应**：`R<T>`（code=200 成功），分页用 `PageParam` / `PageResult`
- **鉴权**：请求头 `Authorization: Bearer <token>`；接口用 `@PreAuthorize("hasAuthority('xxx:yyy:zzz')")` 控权
- **实体**：统一 `@Data @Accessors(chain = true)`；逻辑删除 `del_flag`（0 正常 1 删除）
- **管理端登录流**：`/auth/login`（取 accessToken）→ `/auth/me`（用户信息）→ `/auth/codes`（权限码），由 vben auth store 串联
- **管理端按钮级权限**：使用 vben 的 `AccessControl` / `v-access:code` 组件与指令（权限码来自 `/auth/codes`）
- **新业务模块**：按 `xxx-api`（实体/DTO/VO）+ `xxx-biz`（controller/service/mapper）双层结构扩展
- **Bug 修复**：commit message 写 `fix: xxx (BUG-00x)`，详细记录见 `doc/bugs/`，版本摘要见 `CHANGELOG.md`

---

## 六、当前进度

### 后端

- [x] 工程骨架（Maven 多模块，编译通过）
- [x] common 基础层（core/redis/mybatis/security/web）
- [x] system 系统管理（登录认证 / 用户模板）
- [x] 12 个业务模块 api/biz 双层结构搭建
- [x] SQL 基础表结构与初始化数据（含升级脚本）
- [ ] system 模块剩余 CRUD（角色/菜单/字典/日志/通知/OSS）
- [ ] mall 订单状态机、库存防超卖、售后工单
- [ ] match 赛程日历/预约提醒、member 主队关注、community 圈子社区
- [ ] gallery 足球图库、home 首页聚合、tool 工具模块业务实现

### 管理端前端（football-home-ui-admin）

- [x] 工程切换为 vue-vben-admin（apps/web-ele）
- [x] 对接真实登录 `/auth/*`，构建通过
- [ ] 业务页面改造（dashboard、system/user 等替换 demo 页面）

### 用户端前端（football-home-ui-portal）

- [x] 首页/新闻/赛程/商城/社区骨架
- [x] 接口降级示例数据，构建通过
- [ ] 各模块真实接口对接与页面完善

### 移动端（football-home-ui-app）

- [x] 工程骨架（Kotlin + Jetpack Compose，多模块 MVVM + Hilt + Navigation3）
- [x] core 层（network/datastore/database/data/designsystem/ui/util/result）
- [ ] 业务特性模块开发（首页/新闻/视频/数据/个人中心）

---

## 七、文档导航

| 文档         | 路径                | 说明                           |
| ------------ | ------------------- | ------------------------------ |
| 需求文档     | `doc/requirements/` | 产品需求、PRD、需求变更        |
| Bug 修改记录 | `doc/bugs/`         | Bug 详细记录 + 轻量日志表      |
| SQL 脚本     | `doc/sql/`          | 建表、初始化数据、版本升级脚本 |
| 辅助脚本     | `doc/scripts/`      | JWT 生成、压测脚本等           |
| 版本变更     | `CHANGELOG.md`      | 按版本记录新增/变更/修复/移除  |

---

## 八、许可证

本项目为个人学习练习作品，暂未附加开源许可证。
