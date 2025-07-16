#!/bin/bash

# 部署测试脚本
echo "🚀 开始部署测试..."

# 检查是否在正确的目录
if [ ! -f "pnpm-workspace.yaml" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
pnpm install

# 构建前端
echo "🔨 构建前端..."
pnpm --filter frontend build

# 检查构建结果
if [ -d "apps/frontend/out" ]; then
    echo "✅ 构建成功！输出目录: apps/frontend/out"
    echo "📁 构建文件:"
    ls -la apps/frontend/out/
else
    echo "❌ 构建失败！"
    exit 1
fi

# 测试本地预览
echo "🌐 启动本地预览服务器..."
echo "访问地址: http://localhost:8000"
echo "按 Ctrl+C 停止服务器"
cd apps/frontend && pnpm start 