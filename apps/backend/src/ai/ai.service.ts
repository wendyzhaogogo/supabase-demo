import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { GenerateMessageInput } from './models/generate-message.model';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(
    private configService: ConfigService,
  ) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured');
    }
    this.openai = new OpenAI({ apiKey });
  }

  async generateMessage(input: GenerateMessageInput) {
    const prompt = `Write a short, friendly LinkedIn outreach message to ${input.name}, who is a ${input.role} at ${input.company}. Make it casual and under 500 characters. Focus on building a professional connection and avoid being overly salesy.`;

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
    });

    const generatedMessage = completion.choices[0]?.message?.content?.trim();

    if (!generatedMessage) {
      throw new Error('Failed to generate message');
    }

    return {
      message: generatedMessage,
    };
  }
} 