你需要一份完整的 React 核心文档（MD 格式），我为你整理了一份结构清晰、内容全面的 React 入门到进阶文档，可直接用于 VitePress 展示：

# 两边栏

## 1. React 简介

React 是由 Meta（原 Facebook）开发的开源前端 JavaScript 库，用于构建用户界面，尤其适合构建单页应用（SPA）和复杂交互的组件化界面。

### 核心特性
- **组件化**：将 UI 拆分为独立、可复用的组件
- **声明式**：专注描述 UI 应该呈现的样子，而非手动操作 DOM
- **虚拟 DOM**：通过内存中的虚拟 DOM 提升渲染性能
- **单向数据流**：数据自上而下流动，状态管理更可控
- **跨平台**：可通过 React Native 构建移动端应用，React Server Components 实现服务端渲染

### 适用场景
- 大型单页应用（SPA）
- 复杂交互的后台管理系统
- 跨端应用（Web/移动端）
- 内容频繁更新的动态界面

---

## 2. 快速上手

### 2.1 环境准备
确保已安装 Node.js（v18+）和 npm/pnpm/yarn：
```bash
# 检查 Node 版本
node -v

# 使用 Create React App 快速创建项目（传统方式）
npx create-react-app my-react-app

# 或使用 Vite 创建（推荐，更快）
pnpm create vite my-react-app --template react
cd my-react-app
pnpm install
pnpm run dev
```

### 2.2 第一个 React 组件
```jsx
// src/App.jsx
import { useState } from 'react';

function App() {
  // 状态管理：声明式状态
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>React 计数器示例</h1>
      <p>当前计数：{count}</p>
      {/* 事件处理 */}
      <button onClick={() => setCount(count + 1)}>加 1</button>
      <button onClick={() => setCount(count - 1)}>减 1</button>
    </div>
  );
}

export default App;
```

### 2.3 运行项目
```bash
pnpm run dev # Vite 项目
# 或
npm start # Create React App 项目
```

---

## 3. 核心概念

### 3.1 组件
React 组件分为两种类型：
#### 函数组件（推荐）
```jsx
// 无状态组件（基础）
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// 有状态组件（使用 Hooks）
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

#### 类组件（传统方式）
```jsx
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {this.state.count}
      </button>
    );
  }
}
```

### 3.2 Props（属性）
- 用于组件间传递数据，只读不可修改
- 支持默认值、类型校验：
```jsx
import PropTypes from 'prop-types';

function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>年龄：{props.age || 18}</p>
    </div>
  );
}

// 默认属性
UserCard.defaultProps = {
  age: 18
};

// 类型校验
UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number
};
```

### 3.3 State（状态）
- 组件内部的可变数据，修改会触发组件重新渲染
- 函数组件使用 `useState`，类组件使用 `this.state`
- 状态更新是异步的，批量更新：
```jsx
// 函数组件状态更新
const [user, setUser] = useState({ name: '张三', age: 20 });

// 正确更新对象类型状态
setUser(prev => ({ ...prev, age: prev.age + 1 }));
```

### 3.4 生命周期（函数组件 + Hooks）
| 生命周期阶段 | 对应的 Hook                              | 作用                         |
| ------------ | ---------------------------------------- | ---------------------------- |
| 组件挂载     | useEffect(() => {}, [])                  | 组件首次渲染后执行（仅一次） |
| 组件更新     | useEffect(() => {}, [依赖项])            | 依赖项变化时执行             |
| 组件卸载     | useEffect(() => { return () => {} }, []) | 组件卸载前执行清理操作       |

示例：
```jsx
function DataLoader() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 挂载时请求数据
    const fetchData = async () => {
      const res = await fetch('/api/data');
      const result = await res.json();
      setData(result);
    };
    fetchData();

    // 卸载时清理（如取消请求）
    return () => {
      console.log('组件卸载，清理资源');
    };
  }, []); // 空依赖：仅挂载时执行

  return <div>{data ? JSON.stringify(data) : '加载中...'}</div>;
}
```

---

## 4. 常用 Hooks

### 4.1 基础 Hooks
| Hook         | 作用                                 | 示例                                     |
| ------------ | ------------------------------------ | ---------------------------------------- |
| `useState`   | 声明状态变量                         | `const [count, setCount] = useState(0)`  |
| `useEffect`  | 处理副作用（请求、DOM 操作、定时器） | 见上文生命周期示例                       |
| `useContext` | 跨组件共享数据                       | `const theme = useContext(ThemeContext)` |

### 4.2 进阶 Hooks
#### useReducer
替代 `useState`，适合复杂状态逻辑：
```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

#### useRef
获取 DOM 元素或保存可变值（不触发重渲染）：
```jsx
function InputFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    // 挂载后聚焦输入框
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
}
```

#### useMemo & useCallback
性能优化，避免不必要的重计算/函数重新创建：
```jsx
// useMemo：缓存计算结果
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(a, b);
}, [a, b]);

// useCallback：缓存函数引用
const handleClick = useCallback(() => {
  console.log('点击事件', id);
}, [id]);
```

---

## 5. 组件通信

### 5.1 父子组件通信
- 父传子：通过 Props 传递数据/方法
- 子传父：通过 Props 传递回调函数

示例：
```jsx
// 父组件
function Parent() {
  const [message, setMessage] = useState('');

  const handleChildMsg = (msg) => {
    setMessage(msg);
  };

  return (
    <div>
      <Child onSendMsg={handleChildMsg} parentMsg="父组件数据" />
      <p>子组件传来的消息：{message}</p>
    </div>
  );
}

// 子组件
function Child(props) {
  return (
    <div>
      <p>父组件数据：{props.parentMsg}</p>
      <button onClick={() => props.onSendMsg('子组件的消息')}>发送消息给父组件</button>
    </div>
  );
}
```

### 5.2 跨层级/兄弟组件通信
#### 方式 1：Context API
```jsx
// 创建 Context
const UserContext = createContext();

// 父组件（提供数据）
function App() {
  const [user, setUser] = useState({ name: '张三', role: 'admin' });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Child1 />
      <Child2 />
    </UserContext.Provider>
  );
}

// 子组件（消费数据）
function Child1() {
  const { user } = useContext(UserContext);
  return <p>用户名：{user.name}</p>;
}

function Child2() {
  const { setUser } = useContext(UserContext);
  return <button onClick={() => setUser({ name: '李四', role: 'user' })}>修改用户</button>;
}
```

#### 方式 2：状态管理库（Redux/Zustand/Pinia）
推荐轻量级方案 Zustand：
```bash
pnpm add zustand
```

```jsx
// store.js
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}));

// 任意组件使用
function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  
  return <button onClick={increment}>{count}</button>;
}
```

---

## 6. 路由管理（React Router）

### 6.1 安装
```bash
pnpm add react-router-dom
```

### 6.2 基础使用
```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import User from './pages/User';

function App() {
  return (
    <BrowserRouter>
      {/* 导航链接 */}
      <nav>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
        <Link to="/user/123">用户详情</Link>
      </nav>

      {/* 路由配置 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* 动态路由参数 */}
        <Route path="/user/:id" element={<User />} />
        {/* 404 页面 */}
        <Route path="*" element={<h1>404 页面未找到</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 6.3 路由钩子
```jsx
// 页面组件中获取路由参数
import { useParams, useNavigate } from 'react-router-dom';

function User() {
  // 获取动态参数
  const { id } = useParams();
  // 编程式导航
  const navigate = useNavigate();

  return (
    <div>
      <h1>用户 ID：{id}</h1>
      <button onClick={() => navigate('/')}>返回首页</button>
    </div>
  );
}
```

---

## 7. 常见问题与最佳实践

### 7.1 性能优化
1. **避免不必要的重渲染**：
   - 使用 `React.memo` 缓存组件
   - 使用 `useMemo/useCallback` 缓存计算结果/函数
2. **列表渲染加 key**：
   ```jsx
   {list.map(item => (
     <Item key={item.id} {...item} /> // 用唯一 ID 作为 key，避免索引
   ))}
   ```
3. **懒加载组件**：
   ```jsx
   import { lazy, Suspense } from 'react';
   const LazyComponent = lazy(() => import('./LazyComponent'));
   
   // 使用
   <Suspense fallback={<div>加载中...</div>}>
     <LazyComponent />
   </Suspense>
   ```

### 7.2 常见错误
1. **直接修改 State**：
   ❌ 错误：`state.count = 1`
   ✅ 正确：`setCount(prev => prev + 1)`
2. **Hook 使用规则**：
   - 只能在函数组件/自定义 Hook 中使用
   - 只能在顶层调用，不能在条件/循环中使用
3. **Props 透传问题**：
   使用 Context 或状态管理库替代多层 Props 传递

### 7.3 最佳实践
1. 组件拆分：单一职责，一个组件只做一件事
2. 状态提升：共享状态提升到最近的共同父组件
3. 自定义 Hook：抽离复用的逻辑（如请求、表单处理）
4. 类型校验：使用 TypeScript 或 PropTypes 校验 Props/State
5. 错误边界：捕获组件内的错误，避免整个应用崩溃

---

## 8. 进阶方向
- **React 性能优化**：React.memo、useMemo、useCallback、React.lazy
- **服务端渲染（SSR）**：Next.js
- **静态站点生成（SSG）**：Gatsby、Next.js
- **React 测试**：Jest + React Testing Library
- **状态管理**：Redux Toolkit、Zustand、Jotai
- **样式方案**：CSS Modules、Styled Components、Tailwind CSS

---

### 总结
1. React 核心是**组件化**和**声明式编程**，函数组件 + Hooks 是现代 React 的主流写法；
2. 组件通信可通过 Props（父子）、Context（跨层级）、状态管理库（全局）实现；
3. 性能优化核心是避免不必要的重渲染，合理使用 memo/useMemo/useCallback 等工具。

如果你需要，我可以帮你把这份文档拆分成多个 MD 文件（如 `react-intro.md`、`react-hooks.md` 等），并适配 VitePress 的侧边栏配置，直接集成到你的文档网站中。需要的话可以告诉我！