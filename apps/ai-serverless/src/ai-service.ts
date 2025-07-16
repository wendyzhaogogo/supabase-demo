import { OpenAI } from 'openai'
import { GenerateMessageInput, GenerateMessageResult } from './types'

export class AiService {
  private openai?: OpenAI
  private isMock: boolean

  constructor(isMock: boolean = false) {
    this.isMock = isMock
    
    if (!isMock) {
      const apiKey = process.env.OPENAI_API_KEY
      if (!apiKey) {
        throw new Error('OpenAI API key is not configured')
      }
      this.openai = new OpenAI({ apiKey })
    }
  }

  async generateMessage(input: GenerateMessageInput): Promise<GenerateMessageResult> {
    // Mock模式处理
    if (this.isMock) {
      const mockMessage = `你好${input.name}！作为${input.company}的${input.role}，我想和你聊聊我们公司最新的产品和服务。我们正在寻找像你这样有经验的${input.role}来合作。期待你的回复！`
      
      return {
        message: mockMessage,
        success: true
      }
    }

    // 真实AI服务处理
    if (!this.openai) {
      return {
        message: '',
        success: false,
        error: 'OpenAI client not initialized'
      }
    }

    try {
      const prompt = `Write a short, friendly LinkedIn outreach message to ${input.name}, who is a ${input.role} at ${input.company}. Make it casual and under 500 characters. Focus on building a professional connection and avoid being overly salesy.`

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional LinkedIn outreach expert. Write personalized, friendly messages that focus on building genuine connections.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      })

      const generatedMessage = completion.choices[0]?.message?.content?.trim()

      if (!generatedMessage) {
        return {
          message: '',
          success: false,
          error: 'Failed to generate message'
        }
      }

      return {
        message: generatedMessage,
        success: true
      }
    } catch (error) {
      console.error('AI generation error:', error)
      return {
        message: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }
} 