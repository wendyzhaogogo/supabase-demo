#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

// 颜色输出函数
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
  title: (msg) => console.log(`${colors.cyan}${colors.bright}🚀 ${msg}${colors.reset}`)
};

// 读取环境变量
function loadEnvVars() {
  const envPath = path.join(__dirname, '../.env');
  
  if (!fs.existsSync(envPath)) {
    log.error('环境变量文件不存在: apps/frontend/.env');
    log.info('请先创建环境变量文件：');
    log.info('  cp apps/frontend/.env.example apps/frontend/.env');
    process.exit(1);
  }

  // 简单的.env文件解析
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim().replace(/['"]/g, '');
      }
    }
  });

  // 打印读取到的环境变量（隐藏敏感信息）
  log.info('读取到的环境变量:');
  Object.keys(envVars).forEach(key => {
    if (key.includes('KEY') || key.includes('SECRET')) {
      // 隐藏敏感信息，只显示前几位和后几位
      const value = envVars[key];
      const masked = value.length > 8 ? 
        `${value.substring(0, 4)}...${value.substring(value.length - 4)}` : 
        '***隐藏***';
      log.info(`  ${key}=${masked}`);
    } else {
      log.info(`  ${key}=${envVars[key]}`);
    }
  });

  // 验证必需的环境变量
  const requiredVars = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'];
  const missingVars = requiredVars.filter(varName => !envVars[varName]);
  
  if (missingVars.length > 0) {
    log.error('缺少必需的环境变量:');
    missingVars.forEach(varName => log.error(`  - ${varName}`));
    log.info('请在 apps/frontend/.env 文件中设置这些变量');
    process.exit(1);
  }

  return envVars;
}

// 数据库初始化SQL
const initSQL = `
-- 创建leads表
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  linkedin_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'sent')),
  generated_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 创建触发器
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 启用行级安全性
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 删除现有策略（如果存在）
DROP POLICY IF EXISTS "Enable all operations for development" ON leads;

-- 创建开发环境策略（允许所有操作）
CREATE POLICY "Enable all operations for development" ON leads 
FOR ALL USING (true);
`;

// 测试数据
const testData = [
  {
    name: '张三',
    role: '产品经理',
    company: '阿里巴巴',
    linkedin_url: 'https://linkedin.com/in/zhangsan',
    status: 'draft'
  },
  {
    name: '李四',
    role: '技术总监',
    company: '腾讯',
    linkedin_url: 'https://linkedin.com/in/lisi',
    status: 'draft'
  },
  {
    name: '王五',
    role: '销售经理',
    company: '字节跳动',
    status: 'draft'
  }
];

async function initializeSupabase() {
  log.title('Supabase 数据库初始化');
  
  try {
    // 1. 加载环境变量
    log.info('加载环境变量...');
    const envVars = loadEnvVars();
    
    // 2. 创建Supabase客户端
    log.info('连接到Supabase...');
    const supabase = createClient(
      envVars.NEXT_PUBLIC_SUPABASE_URL,
      envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // 3. 测试连接
    log.info('测试数据库连接...');
    const { data: connectionTest, error: testError } = await supabase
      .from('leads')
      .select('id')
      .limit(1);
    
    if (testError && !testError.message.includes('does not exist')) {
      throw new Error(`数据库连接失败: ${testError.message}`);
    }
    
    log.success('数据库连接成功');

    // 4. 执行初始化SQL
    log.info('创建数据库表和策略...');
    
    // 注意：对于复杂的SQL，我们需要使用rpc或者分别执行
    // 由于Supabase JS客户端限制，我们需要分步执行
    
    // 检查表是否已存在
    const { data: existingTables, error: tableError } = await supabase
      .from('leads')
      .select('id')
      .limit(1);
    
    if (tableError && tableError.message.includes('does not exist')) {
      log.warning('表不存在，需要手动创建。请按照以下步骤操作：');
      log.info('');
      log.info('1. 打开 Supabase Dashboard: https://supabase.com');
      log.info('2. 进入你的项目');
      log.info('3. 点击左侧菜单的 "SQL Editor"');
      log.info('4. 粘贴并运行以下SQL：');
      log.info('');
      console.log(colors.yellow + '---SQL开始---' + colors.reset);
      console.log(initSQL);
      console.log(colors.yellow + '---SQL结束---' + colors.reset);
      log.info('');
      log.info('5. 运行完成后，重新执行此脚本进行验证');
      process.exit(1);
    }
    
    log.success('数据库表已存在');

    // 5. 验证表结构
    log.info('验证表结构...');
    const { data: schemaTest, error: schemaError } = await supabase
      .from('leads')
      .select('id, name, role, company, linkedin_url, status, generated_message, created_at, updated_at')
      .limit(1);
    
    if (schemaError) {
      throw new Error(`表结构验证失败: ${schemaError.message}`);
    }
    
    log.success('表结构验证通过');

    // 6. 检查现有数据
    log.info('检查现有数据...');
    const { data: existingData, error: dataError } = await supabase
      .from('leads')
      .select('*');
    
    if (dataError) {
      throw new Error(`数据查询失败: ${dataError.message}`);
    }
    
    log.info(`当前数据库中有 ${existingData.length} 条记录`);

    // 7. 插入测试数据（如果数据库为空）
    if (existingData.length === 0) {
      log.info('插入测试数据...');
      const { data: insertedData, error: insertError } = await supabase
        .from('leads')
        .insert(testData)
        .select();
      
      if (insertError) {
        throw new Error(`测试数据插入失败: ${insertError.message}`);
      }
      
      log.success(`成功插入 ${insertedData.length} 条测试数据`);
    } else {
      log.info('数据库已有数据，跳过测试数据插入');
    }

    // 8. 最终验证
    log.info('最终验证...');
    const { data: finalData, error: finalError } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (finalError) {
      throw new Error(`最终验证失败: ${finalError.message}`);
    }
    
    log.success('数据库初始化完成！');
    log.info('');
    log.info('数据库状态：');
    log.info(`  - 表名: leads`);
    log.info(`  - 记录数: ${finalData.length}`);
    log.info(`  - 最新记录: ${finalData[0] ? finalData[0].name : '无'}`);
    log.info('');
    log.success('🎉 Supabase初始化成功！现在可以启动应用：');
    log.info('  pnpm dev');

  } catch (error) {
    log.error('初始化失败：');
    log.error(error.message);
    log.info('');
    log.info('故障排除：');
    log.info('1. 检查网络连接');
    log.info('2. 验证Supabase URL和API密钥');
    log.info('3. 确认Supabase项目已启动');
    log.info('4. 检查环境变量文件');
    process.exit(1);
  }
}

// 创建环境变量模板
function createEnvTemplate() {
  const envPath = path.join(__dirname, '../.env');
  const envExamplePath = path.join(__dirname, '../.env.example');
  
  if (!fs.existsSync(envPath) && !fs.existsSync(envExamplePath)) {
    log.info('创建环境变量模板...');
    const envTemplate = `# Supabase 配置
# 从 https://supabase.com 获取这些值
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 后端API地址
NEXT_PUBLIC_API_URL=http://localhost:3001
`;
    
    fs.writeFileSync(envExamplePath, envTemplate);
    fs.writeFileSync(envPath, envTemplate);
    log.success('环境变量模板已创建');
    log.warning('请编辑 apps/frontend/.env 文件，填入正确的Supabase凭证');
  }
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--create-env')) {
    createEnvTemplate();
    return;
  }
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
${colors.cyan}Supabase 数据库初始化脚本${colors.reset}

用法:
  node scripts/init-supabase.js [选项]

选项:
  --create-env    创建环境变量模板文件
  --help, -h      显示此帮助信息

示例:
  node scripts/init-supabase.js --create-env    # 创建环境变量模板
  node scripts/init-supabase.js                 # 初始化数据库
`);
    return;
  }
  
  await initializeSupabase();
}

// 运行主函数
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { initializeSupabase, createEnvTemplate }; 