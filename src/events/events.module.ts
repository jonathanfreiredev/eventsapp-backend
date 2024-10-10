import { Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { EventsController } from './controllers/events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventParticipant } from './entities/event-participant.entity';
import { Event } from './entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventParticipant])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
