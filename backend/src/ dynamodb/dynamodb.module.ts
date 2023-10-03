import { Module } from '@nestjs/common';
import { DynamodbProvider } from './dynamodb.provider';


@Module({
  providers: [DynamodbProvider],
  exports: [DynamodbProvider],
})
export class DynamodbModule {}
