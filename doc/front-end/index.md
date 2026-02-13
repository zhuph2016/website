# 前端开发技术文档（精简版）

## 1. 核心技术栈
- **HTML5**：语义化标签、表单增强、多媒体支持
- **CSS3**：Flexbox/Grid 布局、动画、响应式设计
- **JavaScript (ES6+)**：模块化、异步编程、新特性
- **框架/库**：Vue 3 / React 18 / TypeScript
- **构建工具**：Vite / Webpack / Rollup
- **包管理**：npm / pnpm / yarn

---

## 2. 项目结构规范
```
project/
├── public/           # 静态资源（不参与构建）
├── src/
│   ├── assets/       # 图片、字体、样式
│   ├── components/   # 可复用组件
│   ├── pages/        # 页面组件
│   ├── utils/        # 工具函数
│   ├── api/          # 接口请求封装
│   ├── store/        # 状态管理
│   ├── router/       # 路由配置
│   └── main.js       # 入口文件
├── .eslintrc.js      # 代码规范配置
├── .prettierrc       # 代码格式化配置
└── vite.config.js    # 构建配置
```

---

## 3. 代码规范
### 3.1 HTML
- 使用语义化标签（`<header>`, `<nav>`, `<main>`, `<footer>`）
- 类名采用 BEM 命名规范：`block__element--modifier`
- 图片必须添加 `alt` 属性，保证可访问性

### 3.2 CSS
- 优先使用 Flexbox/Grid 布局，避免浮动
- 样式按功能分组：重置 → 基础 → 布局 → 组件
- 使用 CSS 变量统一管理主题色、间距等

```css
:root {
  --primary-color: #1890ff;
  --spacing-base: 8px;
}
```

### 3.3 JavaScript
- 使用 `const`/`let` 替代 `var`，避免变量提升
- 异步操作优先使用 `async/await`，而非回调函数
- 函数遵循单一职责原则，参数不超过 3 个
- 模块导出使用 ES6 `export`/`import`

```javascript
// 推荐
const fetchData = async () => {
  const res = await api.get('/data');
  return res.data;
};

// 不推荐
function fetchData() {
  return api.get('/data').then(res => res.data);
}
```

---

## 4. 性能优化
- **资源压缩**：图片使用 WebP 格式，启用 Gzip/Brotli 压缩
- **代码分割**：按路由/组件懒加载，减少首屏体积
- **缓存策略**：静态资源设置长期缓存，HTML 文件协商缓存
- **关键渲染路径**：内联关键 CSS， defer 非关键脚本

```javascript
// 路由懒加载示例（Vue）
const Home = () => import('./pages/Home.vue');
```

---

## 5. 可访问性 (a11y)
- 为所有交互元素添加 `aria-label` 或 `aria-labelledby`
- 确保键盘导航可用，避免 `tabindex="-1"` 滥用
- 颜色对比度符合 WCAG 2.1 AA 标准（至少 4.5:1）
- 表单控件必须关联 `<label>` 标签

---

## 6. 调试与测试
- 使用 Chrome DevTools 进行性能分析和断点调试
- 单元测试：Jest / Vitest
- E2E 测试：Cypress / Playwright
- 代码质量：ESLint + Prettier 强制规范

---

## 7. 部署与构建
- 构建命令：`npm run build`
- 产物目录：`dist/`
- 部署平台：GitHub Pages / Vercel / Netlify / Nginx
- 环境变量：使用 `.env` 文件管理，避免硬编码

```bash
# .env.production
VITE_API_BASE_URL=https://api.example.com
```

---

如果你需要，我可以帮你把这份文档扩展成更详细的 **团队前端开发规范手册**，包含更多示例和最佳实践。需要我帮你扩展吗？
