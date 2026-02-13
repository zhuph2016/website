import { defineConfig } from "vitepress";
import { set_sidebar } from "./utils/auto_sidebar.mjs"; // 改成自己的路径

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/website/",
  head: [["link", { rel: "icon", href: "/website/logo.jpg" }]],
  title: "行走江湖的个人网站",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.jpg",
    outlineTitle: "文章目录",
    outline: [2, 6],
    // sidebar: false, // 关闭侧边栏
    aside: "left", // 设置右侧侧边栏在左侧显示
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
      {
        text: "主页",
        items: [
          { text: "介绍", link: "/doc/markdown-examples" },
          { text: "示例", link: "/doc/markdown-examples" },
        ],
      },
      { text: "博客", link: "/doc/my-blog" },
      { text: "前端", link: "/doc/front-end" },
      { text: "后端", link: "/doc/backend" },
      { text: "源码", link: "/doc/source-code" },
      { text: "教程", link: "/doc/course" },
      { text: "其他", link: "/doc/other" },
    ],

    sidebar: {
      "/front-end": set_sidebar("/doc/front-end"),
      "/backend": set_sidebar("/doc/backend"),
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
      { icon: "gitee", link: "https://github.com/zhuph2016/website" },
    ],
    // 底部配置
    footer: {
      copyright: "Copyright@ 2026 penghui Zhu",
    },
  },
});
