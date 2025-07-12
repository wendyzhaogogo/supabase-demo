# ⚙️ AI Lead Builder - 后端

基于NestJS的GraphQL API服务，提供客户管理和AI消息生成功能。

## 功能特性

- 🔄 **GraphQL API** - 完整的GraphQL查询和变更接口
- 🤖 **AI集成** - OpenAI GPT-3.5消息生成
- ✅ **数据验证** - 输入数据类型验证和清理
- 📊 **结构化响应** - 统一的API响应格式

## 技术栈

- **NestJS** - Node.js企业级框架
- **GraphQL** - API查询语言
- **Apollo Server** - GraphQL服务器
- **TypeScript** - 类型安全
- **Class Validator** - 数据验证
- **OpenAI SDK** - AI服务集成

## 快速开始

```bash
# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 填入你的配置

# 启动开发服务器
pnpm dev

# 访问 GraphQL Playground: http://localhost:3001/graphql
```

## 环境变量

```env
OPENAI_API_KEY=你的OpenAI API密钥
PORT=3001
```

## 可用命令

```bash
# 开发
pnpm dev          # 启动开发服务器（热重载）
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务器
pnpm start:prod   # 生产模式启动

# 代码质量
pnpm lint         # 代码检查
pnpm test         # 运行测试
pnpm test:watch   # 监视模式测试
```

## 项目结构

```
src/
├── ai/                   # AI模块
│   ├── ai.module.ts     # AI模块定义
│   ├── ai.resolver.ts   # GraphQL解析器
│   ├── ai.service.ts    # AI服务逻辑
│   └── models/          # GraphQL模型
├── app.module.ts        # 应用主模块
└── main.ts             # 应用入口
```

## API接口

### GraphQL Schema

#### 查询 (Queries)
```graphql
type Query {
  health: String!
}
```

#### 变更 (Mutations)
```graphql
type Mutation {
  generateMessage(input: GenerateMessageInput!): GenerateMessageResult!
}

input GenerateMessageInput {
  name: String!
  role: String!
  company: String!
}

type GenerateMessageResult {
  message: String!
}
```

## 主要功能

### AI消息生成
- 接收客户信息（姓名、职位、公司）
- 调用OpenAI API生成个性化消息
- 返回生成的LinkedIn外联消息

### GraphQL API
- 完整的GraphQL schema定义
- 自动生成API文档
- GraphQL Playground开发工具
- 类型安全的查询接口

### 数据验证
- 输入参数类型验证
- 必填字段检查
- 错误处理和响应

## 开发说明

- 使用装饰器模式进行依赖注入
- GraphQL Code First方法
- 模块化架构设计
- 异步处理和错误处理
- 环境变量配置管理

## API使用示例

```bash
# 健康检查
curl -X POST http://localhost:3001/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ health }"}'

# 生成AI消息
curl -X POST http://localhost:3001/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation($input: GenerateMessageInput!) { generateMessage(input: $input) { message } }",
    "variables": {
      "input": {
        "name": "张三",
        "role": "产品经理", 
        "company": "阿里巴巴"
      }
    }
  }'
``` 