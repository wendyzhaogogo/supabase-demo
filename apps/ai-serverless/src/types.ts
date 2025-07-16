import { z } from 'zod'

// 输入验证schema
export const GenerateMessageSchema = z.object({
  name: z.string().min(1, '姓名不能为空'),
  role: z.string().min(1, '职位不能为空'),
  company: z.string().min(1, '公司不能为空'),
})

export type GenerateMessageInput = z.infer<typeof GenerateMessageSchema>

// 响应类型
export interface GenerateMessageResult {
  message: string
  success: boolean
  error?: string
}

// API响应类型
export interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
} 