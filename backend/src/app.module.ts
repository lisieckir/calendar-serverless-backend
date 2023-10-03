import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { DynamodbModule } from './ dynamodb/dynamodb.module';

@Module({
  imports: [EventModule, DynamodbModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
