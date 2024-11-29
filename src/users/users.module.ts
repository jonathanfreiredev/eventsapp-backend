import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';
import { UsersController } from './controllers/users.controller';
import { UserFavouriteEvent } from './entities/user-favourite-event.entity';
import { User } from './entities/user.entity';
import { UsersFavouriteEventsService } from './services/users-favourite-events.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserFavouriteEvent]), forwardRef(() => EventsModule)],
  controllers: [UsersController],
  providers: [UsersService, UsersFavouriteEventsService],
  exports: [UsersService],
})
export class UsersModule { }
