import { Module } from '@nestjs/common';
import { EventController } from './infrastructure/event.controller';
import { EventService } from './infrastructure/event.service';
import { EventRepository } from './infrastructure/event.repository';
import { DynamodbModule } from 'src/ dynamodb/dynamodb.module';

@Module({
  imports: [DynamodbModule],
  controllers: [EventController],
  providers: [EventService, EventRepository],
})
export class EventModule {}
