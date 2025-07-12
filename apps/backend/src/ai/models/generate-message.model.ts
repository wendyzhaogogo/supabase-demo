import { ObjectType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class GenerateMessageInput {
  @Field()
  name: string;

  @Field()
  role: string;

  @Field()
  company: string;
}

@ObjectType()
export class GenerateMessageResult {
  @Field()
  message: string;
} 