import type { VercelRequest, VercelResponse } from '@vercel/node'
import { AiService } from '../src/ai-service'
import { GenerateMessageSchema, ApiResponse, GenerateMessageResult } from '../src/types'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // 设置CORS头部
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-mock-data')
  res.setHeader('Access-Control-Max-Age', '86400')

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.'
    })
  }

  try {
    // 验证输入
    const validation = GenerateMessageSchema.safeParse(req.body)
    
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: `Validation error: ${validation.error.errors.map(e => e.message).join(', ')}`
      })
    }

    const { name, role, company } = validation.data

    // 判断是否使用mock模式
    const useMockData = process.env.NODE_ENV === 'development' || req.headers['x-mock-data'] === 'true'
    
    // 创建AI服务实例，传入mock参数
    const aiService = new AiService(useMockData)
    
    if (useMockData) {
      console.log('Using mock data for testing...')
    }
    
    // 生成消息
    const result = await aiService.generateMessage({ name, role, company })

    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: result.error || 'Failed to generate message'
      })
    }

    // 返回成功结果
    return res.status(200).json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('API error:', error)
    
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    })
  }
} 