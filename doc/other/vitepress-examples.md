---
outline: deep
---

# VitePress 功能使用参考

> 本文档由站点脚手架自带的示例文档（原 `doc/bak/`）整理而来，构造 AI 主题的常见使用场景，作为日常写作参考。
> 覆盖能力：语法高亮（Shiki）、自定义容器、代码组、表格、任务列表、脚注、运行时 API（useData）等。

## 语法高亮（Shiki）

VitePress 内置 [Shiki](https://github.com/shikijs/shiki) 语法高亮，支持行高亮（`{4}` 高亮第 4 行、`{3,6}` 高亮第 3 和 6 行）：

```python{3,6}
# 调用大模型 API 的常见写法
import requests

def chat(prompt: str) -> str:
    resp = requests.post(API_URL, json={"prompt": prompt}, timeout=30)
    return resp.json()["answer"]
```

常见语言：`python` / `js` / `ts` / `bash` / `java` / `vue` 等，直接在围栏代码块上写语言名即可。

## 自定义容器

::: info 信息框
适合放背景说明：本页由站点脚手架示例整理而来，用于日常写作参考。
:::

::: tip 提示框
适合放小技巧：例如「模型温度 temperature 调低一点，输出会更稳定」。
:::

::: warning 警告框
适合放注意事项：例如「免费额度有限，批量调用前先确认计费方式」。
:::

::: danger 危险框
适合放风险提示：例如「切勿在生产环境直接使用明文 API Key」。
:::

::: details 折叠详情
点击展开：这里适合放长代码或长说明，例如某次调用的完整请求日志、长表格等。
:::

## 代码组（Tabs）

同一个功能的多语言写法，用代码组切换展示：

::: code-group

```python
# Python
import openai
client = openai.OpenAI(api_key=API_KEY)
resp = client.chat.completions.create(
    model="qwen-max",
    messages=[{"role": "user", "content": "你好"}],
)
print(resp.choices[0].message.content)
```

```js
// JavaScript
const OpenAI = require('openai')
const client = new OpenAI({ apiKey: API_KEY })
const resp = await client.chat.completions.create({
  model: 'qwen-max',
  messages: [{ role: 'user', content: '你好' }],
})
console.log(resp.choices[0].message.content)
```

```bash
# 命令行（curl）
curl https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"qwen-max","input":{"messages":[{"role":"user","content":"你好"}]}}'
```

:::

## 表格

| 模型 | 上下文长度 | 适用场景 | 备注 |
| --- | --- | --- | --- |
| qwen-max | 32K | 复杂推理 | 效果最强 |
| qwen-plus | 32K | 日常对话 | 性价比高 |
| qwen-turbo | 8K | 简单问答 | 响应最快 |

## 任务列表

- [x] 读完脚手架示例文档
- [x] 构造 AI 主题使用场景
- [ ] 按需补充新的功能示例

## 脚注

VitePress 支持脚注写法[^1]，适合补充出处、资料链接或说明。

[^1]: 这是脚注内容示例，可以放参考资料链接或补充说明。

## 运行时 API（useData）

在 Markdown 中直接使用 `<script setup>` 引入 VitePress 运行时 API，即可读取当前页面的站点、主题、页面与 Frontmatter 数据：

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

### Theme Data

<pre>{{ theme }}</pre>

### Page Data

<pre>{{ page }}</pre>

### Page Frontmatter

<pre>{{ frontmatter }}</pre>

## More

完整能力清单见官方文档：[Markdown 扩展](https://vitepress.dev/zh/guide/markdown) 与 [运行时 API](https://vitepress.dev/zh/reference/runtime-api)。
