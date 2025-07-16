# 🎨 AI Lead Builder - 前端

基于Next.js的现代化前端应用，提供直观的客户管理和AI消息生成界面。

## 功能特性

- 📋 **客户管理** - 添加、查看、编辑客户信息
- 💬 **AI消息生成** - 一键生成个性化LinkedIn消息
- 📊 **状态跟踪** - 管理消息状态（草稿/已批准/已发送）
- 📱 **响应式设计** - 适配桌面和移动端
- ⚡ **实时更新** - 动态更新客户数据

## 技术栈

- **Next.js 15** - React全栈框架
- **React 19** - 用户界面库
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **shadcn/ui** - UI组件库
- **REST API** - 与AI服务通信
- **Supabase** - 数据库连接

## 快速开始

```bash
# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入你的配置

# 启动开发服务器
pnpm dev

# 访问 http://localhost:8000
```

## 环境变量

```env
NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase密钥
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 可用命令

```bash
# 开发
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务器

# 代码质量
pnpm lint         # 代码检查
pnpm type-check   # 类型检查

# 工具
pnpm clean        # 清理构建文件
```

## 项目结构

```
src/
├── app/              # Next.js App Router页面
├── components/       # React组件
│   ├── forms/       # 表单组件
│   ├── tables/      # 表格组件
│   ├── pages/       # 页面组件
│   └── ui/          # UI基础组件
├── lib/             # 工具库
│   ├── api.ts       # REST API服务
│   ├── supabase.ts  # Supabase客户端
│   └── utils.ts     # 工具函数
└── styles/          # 全局样式
```

## 主要功能

### 客户管理
- 添加新客户（姓名、职位、公司、LinkedIn）
- 查看客户列表
- 更新客户状态

### AI消息生成
- 基于客户信息生成个性化消息
- 支持编辑和保存生成的消息
- 一键复制到剪贴板

### 用户界面
- 现代化设计语言
- 深色/浅色模式支持
- 响应式布局
- 加载状态和错误提示

## 开发说明

- 所有组件都用TypeScript编写
- 使用shadcn/ui组件系统
- REST API集成
- ESLint + Prettier代码规范
- 支持热重载开发 