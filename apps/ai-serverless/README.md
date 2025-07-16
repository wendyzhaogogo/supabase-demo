# 🤖 AI Serverless Service

专门为Vercel Serverless部署优化的AI消息生成服务。

## 功能特性

- ⚡ **Serverless架构** - 基于Vercel Functions，按需扩展
- 🤖 **AI消息生成** - OpenAI GPT-3.5个性化LinkedIn消息
- ✅ **输入验证** - Zod schema验证
- 🔒 **类型安全** - 完整的TypeScript支持
- 📊 **错误处理** - 统一的错误响应格式

## 技术栈

- **Vercel Functions** - Serverless运行时
- **OpenAI SDK** - AI服务集成
- **Zod** - 数据验证
- **TypeScript** - 类型安全

## 快速开始

### 1. 安装依赖

```bash
cd apps/ai-serverless
pnpm install
```

### 2. 配置环境变量

```bash
# 在Vercel Dashboard中设置
OPENAI_API_KEY=你的OpenAI API密钥
```

### 3. 本地开发

```bash
# 启动本地开发服务器
pnpm dev

# 访问 http://localhost:3000/api/health
```

### 4. 部署

```bash
# 部署到Vercel
pnpm deploy
```

## API接口

### 健康检查

```bash
GET /api/health
```

**响应:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "ai-serverless",
  "version": "1.0.0"
}
```

### 生成AI消息

```bash
POST /api/generate-message
Content-Type: application/json

{
  "name": "张三",
  "role": "产品经理",
  "company": "阿里巴巴"
}
```

**成功响应:**
```json
{
  "success": true,
  "data": {
    "message": "Hi 张三, I noticed your role as 产品经理 at 阿里巴巴...",
    "success": true
  }
}
```

**错误响应:**
```json
{
  "success": false,
  "error": "Validation error: 姓名不能为空"
}
```

## 项目结构

```
apps/ai-serverless/
├── api/                    # Vercel Functions
│   ├── generate-message.ts # AI消息生成API
│   └── health.ts          # 健康检查API
├── src/                   # 源码
│   ├── ai-service.ts      # AI服务逻辑
│   └── types.ts           # 类型定义
├── vercel.json            # Vercel配置
├── package.json           # 依赖配置
└── tsconfig.json          # TypeScript配置
```

## 环境变量

| 变量名 | 描述 | 必需 |
|--------|------|------|
| `OPENAI_API_KEY` | OpenAI API密钥 | ✅ |

## 部署配置

### Vercel配置 (vercel.json)

```json
{
  "version": 2,
  "functions": {
    "api/generate-message.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "OPENAI_API_KEY": "@openai-api-key"
  }
}
```

### 函数超时设置

- `generate-message.ts`: 30秒超时
- 适合OpenAI API调用

## 开发说明

- 使用Zod进行输入验证
- 统一的错误处理格式
- TypeScript类型安全
- 支持本地开发调试

## 与前端集成

前端可以这样调用：

```typescript
const response = await fetch('/api/generate-message', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: '张三',
    role: '产品经理',
    company: '阿里巴巴'
  })
})

const result = await response.json()
if (result.success) {
  console.log('生成的消息:', result.data.message)
}
```

## 优势

- 🚀 **快速部署** - 一键部署到Vercel
- 💰 **成本优化** - 按使用量付费
- 🔄 **自动扩展** - 无需管理服务器
- 🛡️ **安全可靠** - Vercel企业级安全
- 📈 **全球CDN** - 低延迟访问 