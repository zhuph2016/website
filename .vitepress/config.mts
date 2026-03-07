import { defineConfig } from "vitepress";
// 改成自己的路径
import { set_sidebar } from "./utils/auto_sidebar.mjs";

// 配置 https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/website/",
  head: [["link", { rel: "icon", href: "/website/logo.jpg" }]],
  title: "行走江湖的个人网站",
  description: "A VitePress Site",
  // 在根级别配置，忽略所有死链接检查
  ignoreDeadLinks: true,
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: "/logo.jpg",
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
      { text: "前端", link: "/doc/frontend" },
      { text: "后端", link: "/doc/backend" },
      { text: "面试", link: "/doc/interview" },
      {
        text: "教程",
        items: [
          { text: "若依ruoyi", link: "https://doc.ruoyi.vip/" },
          {
            text: "芋道yudao",
            items: [
              { text: "ruoyi-vue-pro", link: "https://doc.iocoder.cn/" },
              { text: "yudao-cloud", link: "https://cloud.iocoder.cn/" },
            ],
          },
          { text: "马士兵", link: "https://www.mashibing.com/sf/pc.html" },
          { text: "mall", link: "https://www.macrozheng.com/" },
        ],
      },
      {
        text: "其他",
        items: [
          { text: "Ai", link: "/doc/other/ai" },
          { text: "源码", link: "/doc/other/SourceCode" },
          { text: "博客", link: "/doc/other/blog" },
          { text: "算法", link: "/doc/other/DataStructuresAlgorithms" },
        ],
      },
    ],
    sidebar: {
      "/doc/frontend": set_sidebar("/doc/frontend/"),
      "/doc/backend": set_sidebar("/doc/backend/"),
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
      { icon: "gitee", link: "https://gitee.com/zhuph2016/website" },
    ],
    // 底部配置
    footer: {
      copyright: "Copyright@ 2026 penghui Zhu",
    },
  },
});
