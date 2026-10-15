# zhuph-take-out

[![gitee](https://img.shields.io/badge/企鹅外卖系统-zhuph--take--out-blue)](https://gitee.com/zhuph/zhuph-take-out)

> 根据苍穹外卖搭建的外卖系统学习项目：后台管理端 + 微信小程序端

- 仓库：<https://gitee.com/zhuph/zhuph-take-out>
- 文档：<https://www.zhuph.takeout.com>

## 项目介绍

`zhuph-take-out` 项目主要用于个人的学习使用。该外卖系统是根据**苍穹外卖**进行学习的记录，资料主要来源于互联网，其中也加入一些个人的修改。

```lua
zhuph-take-out
├── docs -- 文档资料
├── take-out -- 后台管理系统的后端工程
├── take-out-web -- 后台管理系统的前端工程
├── take-out-weixin -- 外卖系统的小程序
└── README.md -- 项目文档
```

## 项目演示

### 后台管理系统（服务端）

访问地址 `http://localhost:8888/#/login`

![1772114443202](/images/takeout.assets/1772114443202.png)

### 小程序（客户端）

![1772114509946](/images/takeout.assets/1772114509946.png)

## 技术选型

### 后端技术

| 技术           | 说明            | 官网                                           |
| -------------- | --------------- | ---------------------------------------------- |
| SpringBoot     | Web应用开发框架 | https://spring.io/projects/spring-boot         |
| SpringSecurity | 认证和授权框架  | https://spring.io/projects/spring-security     |
| MyBatis        | ORM框架         | http://www.mybatis.org/mybatis-3/zh/index.html |

### 前端技术

| 技术       | 说明                  | 官网                                     |
| ---------- | --------------------- | ---------------------------------------- |
| Vue        | 前端框架              | <https://vuejs.org/>                     |
| Vue-router | 路由框架              | <https://router.vuejs.org/>              |
| Vuex       | 全局状态管理框架      | <https://vuex.vuejs.org/>                |
| Element    | 前端UI框架            | <https://element.eleme.io>               |
| Axios      | 前端HTTP框架          | <https://github.com/axios/axios>         |
| v-charts   | 基于Echarts的图表框架 | <https://v-charts.js.org/>               |
| Js-cookie  | cookie管理工具        | <https://github.com/js-cookie/js-cookie> |
| nprogress  | 进度条控件            | <https://github.com/rstacruz/nprogress>  |

### 移动端技术

| 技术         | 说明             | 官网                                      |
| ------------ | ---------------- | ----------------------------------------- |
| Vue          | 核心前端框架     | <https://vuejs.org>                       |
| Vuex         | 全局状态管理框架 | <https://vuex.vuejs.org>                  |
| uni-app      | 移动端前端框架   | <https://uniapp.dcloud.io>                |
| mix-mall     | 电商项目模板     | <https://ext.dcloud.net.cn/plugin?id=200> |
| luch-request | HTTP请求框架     | <https://github.com/lei-mu/luch-request>  |

## 环境搭建

1. 启动 redis

   Redis-x64-5.0.14

   ```shell
   .\redis-server.exe redis.windows.conf
   ```

2. 启动 minio

   ```shell
   .\minio.exe server D:\ProgramFiles\minio\data --console-address "127.0.0.1:9001"
   ```

3. 启动后端工程

   jdk-11.0.2

   API文档 `http://localhost:8080/doc.html`

4. 启动前端工程

   node 16.20.2

   `http://localhost:8888/#/login`

5. 启动微信小程序

## 使用说明

1.  xxxx
2.  xxxx
3.  xxxx
