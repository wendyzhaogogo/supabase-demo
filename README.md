# 🚀 AI Lead Builder

一个现代化的LinkedIn客户管理和AI消息生成工具，使用Next.js前端和Vercel Serverless AI服务。

## 🏗️ 项目架构

```
supabase-demo/
├── apps/
│   ├── frontend/          # Next.js前端应用
│   └── ai-serverless/     # Vercel Serverless AI服务
└── packages/
    └── shared/            # 共享类型定义
```

## 🎯 主要功能

- **客户管理** - 使用Supabase存储客户信息
- **AI消息生成** - 基于客户信息生成个性化LinkedIn消息
- **状态跟踪** - 管理消息状态（草稿/已批准/已发送）
- **响应式设计** - 适配桌面和移动端

## 🛠️ 技术栈

### 前端 (apps/frontend)
- **Next.js 15** - React全栈框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Supabase** - 数据库和认证
- **REST API** - 与AI服务通信

### AI服务 (apps/ai-serverless)
- **Vercel Functions** - 无服务器部署
- **OpenAI SDK** - AI消息生成
- **TypeScript** - 类型安全
- **Zod** - 输入验证

## 🚀 快速开始

### 1. 安装依赖
```bash
pnpm install
```

### 2. 配置环境变量

#### 前端配置 (apps/frontend/.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase密钥
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### AI服务配置 (apps/ai-serverless/.env.local)
```env
OPENAI_API_KEY=你的OpenAI API密钥
```

### 3. 启动开发环境

```bash
# 启动AI服务 (端口3001)
pnpm dev:ai-serverless

# 新终端启动前端 (端口8000)
pnpm dev:frontend
```

访问 http://localhost:8000 开始使用

## 📦 可用命令

```bash
# 开发
pnpm dev                    # 启动所有服务
pnpm dev:frontend          # 启动前端
pnpm dev:ai-serverless     # 启动AI服务

# 构建
pnpm build                 # 构建所有项目
pnpm build:frontend        # 构建前端
pnpm build:ai-serverless   # 构建AI服务

# 部署
pnpm deploy:ai-serverless  # 部署AI服务到Vercel

# 代码质量
pnpm lint                  # 代码检查
pnpm type-check           # 类型检查
pnpm clean                # 清理构建文件
```

## 🌐 部署

### AI服务部署
AI服务使用Vercel Functions，支持自动部署：

```bash
# 部署到Vercel
pnpm deploy:ai-serverless
```

### 前端部署
前端可以部署到任何静态托管服务：

```bash
# 构建
pnpm build:frontend

# 部署到Vercel、Netlify等
```

## 🔧 开发说明

- 使用pnpm workspace管理多包项目
- 前端使用REST API与AI服务通信
- AI服务提供无服务器函数API
- 所有代码使用TypeScript确保类型安全
- 支持热重载开发

## 📝 项目结构

```
apps/
├── frontend/              # Next.js前端应用
│   ├── src/
│   │   ├── app/          # 页面路由
│   │   ├── components/   # React组件
│   │   └── lib/          # 工具库
│   └── package.json
└── ai-serverless/         # Vercel Serverless AI服务
    ├── api/              # API路由
    ├── src/              # 源代码
    └── package.json

packages/
└── shared/               # 共享类型定义
    └── src/
        └── index.ts
```

## 🤝 贡献

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## �� 许可证

MIT License 