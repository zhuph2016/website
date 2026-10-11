import { defineConfig } from "vitepress";
// 改成自己的路径
import { set_sidebar } from "./utils/auto_sidebar.mjs";

// 配置 https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/website/",
  head: [["link", { rel: "icon", href: "/images/logo.jpg" }]],
  title: "行走江湖的个人网站",
  description: "A VitePress Site",
  // 在根级别配置，忽略所有死链接检查
  ignoreDeadLinks: true,
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: "/images/logo.jpg",
    outlineTitle: "文章目录",
    outline: [1, 6],
    // 关闭侧边栏
    // sidebar: false,
    // 设置右侧侧边栏在左侧显示
    aside: "left",
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
      { text: "前端", link: "/doc/frontend" },
      { text: "后端", link: "/doc/backend" },
      { text: "面试", link: "/doc/interview" },
      { text: "AI", link: "/doc/ai/ai" },
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
