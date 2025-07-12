import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { AiService } from './ai.service';
import { GenerateMessageInput, GenerateMessageResult } from './models/generate-message.model';

@Resolver()
export class AiResolver {
  constructor(private readonly aiService: AiService) {}

  @Query(() => String)
  async health(): Promise<string> {
    return 'AI Service is running!';
  }

  @Mutation(() => GenerateMessageResult)
  async generateMessage(
    @Args('input') input: GenerateMessageInput,
  ): Promise<GenerateMessageResult> {
    return await this.aiService.generateMessage(input);
  }
} 