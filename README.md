# 行走江湖的个人网站

基于 **VitePress** 的个人知识库与项目展示网站（足球之家 Excelsior），部署于 GitHub Pages。

## 技术栈

| 技术 | 说明 |
| --- | --- |
| VitePress 1.6 | 文档站点框架（基于 Vite + Vue 3） |
| TypeScript | 站点配置（`.vitepress/config.mts`） |
| GitHub Actions | 自动构建并部署到 GitHub Pages |

## 目录结构

```
website/
├── index.md                    # 首页（Hero + 功能卡片，layout: home）
├── doc/                        # 文档内容（Markdown 源文件）
│   ├── projects/               # 项目展示（7 个：足球家/外卖/点评/商城/AI/Agent/学习笔记）
│   ├── frontend/               # 前端技术笔记
│   ├── backend/                # 后端技术笔记（自动侧边栏）
│   ├── interview/              # 面试（总览 index / 日记 diary / 考点沉淀 questions）
│   ├── ai/                     # AI 技术区（收藏 ai + VitePress 使用参考）
│   └── other/                  # 杂项（源码/博客/数据结构/算法/开源项目）
├── public/                     # 静态资源
│   ├── images/                 # 站点级图片（仅 background/logo；文档专属图在各 md 同级 <主题>.assets/）
│   └── football-home.png       # 首页 Hero 图标（透明 PNG）
├── .vitepress/
│   ├── config.mts              # 站点配置（导航/侧边栏/搜索）
│   ├── theme/                  # 自定义主题（style.css 样式、index.ts）
│   └── utils/auto_sidebar.mjs  # 侧边栏自动生成工具
└── .github/workflows/          # GitHub Actions 部署流水线
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:8088）
npm run dev

# 构建生产版本（输出到 .vitepress/dist）
npm run build

# 本地预览构建产物
npm run preview
```

## 部署

推送到 `master` 分支后，GitHub Actions 自动执行 `vitepress build` 并部署到 GitHub Pages（站点 base 为 `/website/`）。

## 内容维护规范

- **新增项目页**：在 `doc/projects/` 下创建目录与 Markdown 文件，并在 `index.md`（首页卡片）与 `.vitepress/config.mts`（导航）中补充链接。
- **图片规范**：
  - 文档专属图片（截图等）放在对应 Markdown **同级的 `<主题>.assets/` 目录**（如 `redis.assets`），目录命名**小写 kebab-case**（如 `seata.assets`、`mybatis-plus.assets`），禁止大小写混用（Linux 构建环境区分大小写）。
  - 文档内引用使用相对路径：`./<主题>.assets/<文件>`（如 `![x](./redis.assets/a.png)`），本地编辑器与站点构建均可正常显示。
  - 站点级共享资源（logo/背景）放 `public/images/`，引用 `/images/...` 绝对路径。
  - `.assets` 目录已由 `auto_sidebar.mjs` 自动排除，不会出现在网站侧边栏。
- **侧边栏**：`doc/frontend/`、`doc/backend/`、`doc/projects/`、`doc/interview/`、`doc/ai/`、`doc/other/` 均通过 `auto_sidebar.mjs` 自动生成，新增 Markdown 文件后会自动出现，无需手动维护。
