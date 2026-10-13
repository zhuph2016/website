# zhuph-agent

<p>
  <a href="https://gitee.com/zhuph/zhuph-agent"><img src="https://img.shields.io/badge/智能体项目-zhuph--agent-blue" alt="zhuph智能体项目"></a>
</p>

项目地址：[https://gitee.com/zhuph/zhuph-agent](https://gitee.com/zhuph/zhuph-agent)

一个仓库同时包含前端和后端，clone 下来两边都齐全。

## 目录结构

```
zhuph-agent/
├── agent-frontend/     # Next.js 16 + assistant-ui（React 聊天 UI，端口 3000）
└── agent-backend/      # Python LangGraph（agent 逻辑，端口 8000）
```

## 项目架构

- **`agent-backend/`** — FastAPI + LangGraph 后端（uv 管理依赖，Python >= 3.11）
  - 模块划分：`src/graph.py` 组装 graph、`src/tools.py` 全部工具、`src/db.py` 只读查询层、
    `src/llm.py` 模型实例、`src/config.py` 集中配置；`src/agent.py` 只是兼容 re-export 层
  - `src/server.py` 用 FastAPI 把 graph 暴露为 HTTP 接口
  - `POST /api/chat`：SSE 流式返回模型增量；`GET /health`：健康检查
  - `dev.ps1` 封装了 `uvicorn src.server:app --reload --port 8000`（并负责 UTF-8）
- **`agent-frontend/`** — Next.js 16 + assistant-ui 聊天界面（React 19，Turbopack）
  - 用 `useLocalRuntime` + 自定义 `ChatModelAdapter`（`lib/chat.ts`）直连 FastAPI 的 SSE 接口

## 启动

### 首次安装（新机器 clone 后）

```bash
# 后端
cd agent-backend
uv sync
cp .env.example .env     # 填 LLM_API_KEY（OPENAI_API_KEY 也认，见后端 README 配置表）

# 前端
cd agent-frontend
npm install
cp .env.example .env     # NEXT_PUBLIC_API_URL，通常保持默认即可
```

### 日常启动（两个终端）

**终端 1 — 后端（:8000）**

```bash
cd agent-backend
.\dev.ps1
```

`dev.ps1` 内部：设置 `PYTHONUTF8=1`，调用 `.venv\Scripts\uvicorn.exe src.server:app --reload --port 8000`。
注意这是 PowerShell 脚本，需在 PowerShell 里执行（或 `powershell -File ./dev.ps1`）。

**终端 2 — 前端（:3000）**

```bash
cd agent-frontend
npm run dev    # next dev --turbopack
```

打开 `http://localhost:3000`。

## 约定

- 前端通过 `agent-frontend/.env` 连后端：`NEXT_PUBLIC_API_URL=http://localhost:8000`。
- 前后端消息协议：`POST /api/chat`，body `{ messages: [{role, content}] }`，SSE 返回：
  - `data: {"delta": "..."}` 文本增量 → `data: [DONE]` 结束；出错 `data: {"error": "..."}`
  - `data: {"ui": {toolCallId, toolName, args}}` 生成式 UI（模型调用 show_table/show_chart/show_card 时推送），
    前端转成 tool-call 部件，由 `generative-ui.tsx` 注册的 uiComponents 渲染（图表色板用 globals.css 预置的 --chart-1~5）
  - `data: {"tool": {toolCallId, toolName, args?, result?, error?}}` 普通工具进度
    （web_search / fetch_url / query_db）：前端按 toolCallId 合并成同一张卡片，
    由 `tool-fallback.aui.tsx` 渲染。生成式 UI 工具只走 `ui` 事件、不走这个通道。
- 改 agent 逻辑 → 工具改 `agent-backend/src/tools.py`、查询层 `src/db.py`、模型 `src/llm.py`、
  配置 `src/config.py`、流程/checkpointer/middleware `src/graph.py`、共享 HTTP 客户端 `src/http.py`；
  改 HTTP 接口 → `agent-backend/src/server.py`；
  改 UI → `agent-frontend/`。`src/agent.py` 只是兼容 re-export 层，不要往里加逻辑。
- 后端两条硬约定（写错都不报错，只会静默出问题）：
  1. graph 用 `create_agent`，system prompt 的参数名是 **`system_prompt=`**（不是旧的 `prompt=`）。
  2. 工具跑在 async 链路上，**不能有阻塞式 I/O**：网络用 `httpx.AsyncClient`（走 `src/http.py`
     的共享客户端），同步库用 `anyio.to_thread.run_sync`。否则一次慢请求会堵死整个 event loop
     （连 `/health` 都不响应）。
- 前端代码风格：`npm run lint`（oxlint + oxfmt），`npm run lint:fix` 自动修复。
  格式规则由 `agent-frontend/.oxfmtrc.json` 定义。
- 行尾统一 LF，由仓库根 `.gitattributes` 强制（`* text=auto eol=lf`）。这是为了让
  oxfmt 的校验能通过——它会把文件规范化为 LF，而本机 `core.autocrlf=true` 会展开成 CRLF。
- `agent-backend/langgraph.json` 与 langgraph-cli **当前不可用**（`graph` 是惰性代理对象，
  无法被 Studio 内省）；FastAPI 启动不依赖它们。详见 `docs/现状复核与优化计划.md`。
- 排查/优化记录见 `docs/`。

详见各自目录下的 README。
