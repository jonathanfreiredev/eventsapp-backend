import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesModule } from 'src/addresses/addresses.module';
import { UsersModule } from 'src/users/users.module';
import { EventsParticipantsController } from './controllers/events-participants.controller';
import { EventsController } from './controllers/events.controller';
import { EventParticipant } from './entities/event-participant.entity';
import { Event } from './entities/event.entity';
import { EventsParticipantsService } from './services/events-participants.service';
import { EventsService } from './services/events.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, EventParticipant]),
    UsersModule,
    AddressesModule,
  ],
  controllers: [EventsController, EventsParticipantsController],
  providers: [EventsService, EventsParticipantsService],
})
export class EventsModule {}
