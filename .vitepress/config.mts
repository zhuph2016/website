import { defineConfig } from "vitepress";
// 改成自己的路径
import { set_sidebar } from "./utils/auto_sidebar.mjs";

// 配置 https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/website/",
  // 注意：head 里的 href 不会自动拼接 base，必须手写含 /website 的完整路径
  head: [["link", { rel: "icon", type: "image/jpeg", href: "/website/images/logo.jpg" }]],
  title: "行走江湖的个人网站",
  description: "行走江湖的个人网站 — Java 后端 / 中间件 / AI 实践 / 项目笔记",
  lang: "zh-CN",
  // 保持死链检查开启，任何新增死链都会让构建失败。
  // 唯一豁免：VitePress 会把脚注定义里的中文内容误判为相对链接（官方已知问题），
  // 此处只放行这一条，其余死链一律构建失败。
  // 注意：VitePress 传给匹配函数的 url 是「已 URL 编码 + 带 ./ 前缀」的完整形式。
  ignoreDeadLinks: [
    (url: string) =>
      decodeURIComponent(url).includes("这是脚注内容示例，可以放参考资料链接"),
  ],
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: "/images/logo.jpg",
    outlineTitle: "文章目录",
    outline: [2, 3],
    // 关闭侧边栏
    // sidebar: false,
    // 文章目录（大纲）显示在页面右侧，参考 aileading.cn 文档站布局
    aside: "right",
    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
    nav: [
      { text: "首页", link: "/index" },
      {
        text: "项目",
        items: [
          { text: "AI探索", link: "/doc/projects/ai/zhuph-ai" },
          { text: "Agent智能体", link: "/doc/projects/agent/zhuph-agent" },
          { text: "学习笔记", link: "/doc/projects/learn/zhuph-learn" },
          { text: "外卖系统", link: "/doc/projects/takeout/zhuph-take-out" },
          { text: "点评系统", link: "/doc/projects/dianping/zhuph-dianping" },
          { text: "商城系统", link: "/doc/projects/mall/zhuph-mall" }
        ],
      },
      { text: "前端", link: "/doc/frontend/" },
      {
        text: "后端",
        items: [
          { text: "开发环境", link: "/doc/backend/01开发环境/00-知识库总览" },
          { text: "基础核心", link: "/doc/backend/02基础核心/Java基础/集合" },
          { text: "开发框架", link: "/doc/backend/03开发框架/Lombok" },
          { text: "数据存储", link: "/doc/backend/04数据存储/MySQL" },
          { text: "中间件", link: "/doc/backend/05中间件/任务调度/Quartz" },
          { text: "运维", link: "/doc/backend/06运维/Linux" },
          { text: "部署", link: "/doc/backend/07部署/Docker" },
          { text: "Python", link: "/doc/backend/08Python/Python" },
        ],
      },
      { text: "面试", link: "/doc/interview/" },
      { text: "AI", link: "/doc/ai/index" },
      {
        text: "其他",
        items: [
          { text: "源码", link: "/doc/other/SourceCode" },
          { text: "博客", link: "/doc/other/blog" },
          { text: "数据结构", link: "/doc/other/DataStructures" },
          { text: "算法", link: "/doc/other/Algorithms" },
          { text: "开源项目", link: "/doc/other/OpenSource" },
        ],
      },
    ],
    sidebar: {
      "/doc/frontend": set_sidebar("/doc/frontend/"),
      // 后端：按分组路径独立侧边栏，进入某分组时左侧只显示该分组内容
      "/doc/backend/01开发环境/": set_sidebar("/doc/backend/01开发环境/"),
      "/doc/backend/02基础核心/": set_sidebar("/doc/backend/02基础核心/"),
      "/doc/backend/03开发框架/": set_sidebar("/doc/backend/03开发框架/"),
      "/doc/backend/04数据存储/": set_sidebar("/doc/backend/04数据存储/"),
      "/doc/backend/05中间件/": set_sidebar("/doc/backend/05中间件/"),
      "/doc/backend/06运维/": set_sidebar("/doc/backend/06运维/"),
      "/doc/backend/07部署/": set_sidebar("/doc/backend/07部署/"),
      "/doc/backend/08Python/": set_sidebar("/doc/backend/08Python/"),
      "/doc/backend": set_sidebar("/doc/backend/"),
      "/doc/projects": set_sidebar("/doc/projects/"),
      "/doc/interview": set_sidebar("/doc/interview/"),
      "/doc/ai": set_sidebar("/doc/ai/"),
      "/doc/other": set_sidebar("/doc/other/"),
    },
    // sidebar: [
    //   {
    //     text: "Examples",
    //     items: [
    //       { text: "Markdown Examples", link: "/doc/markdown-examples" },
    //       { text: "Runtime API Examples", link: "/doc/api-examples" }
    //     ],
    //   },
    //   {
    //     text: "Examples2",
    //     items: [
    //       { text: "Markdown Examples", link: "/doc/markdown-examples" },
    //       { text: "Runtime API Examples", link: "/doc/api-examples" }
    //     ],
    //   },
    // ],

    socialLinks: [
      { icon: "github", link: "https://github.com/zhuph2016/website" },
      { icon: "gitee", link: "https://gitee.com/zhuph/website" },
    ],
    // 底部配置
    footer: {
      copyright: "Copyright@ 2026 penghui Zhu",
    },
  },
});
