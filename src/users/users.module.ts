import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserFavouriteEvent } from './entities/user-favourite-event.entity';
import { UsersFavouriteEventsService } from './services/users-favourite-events.service';
import { UsersFavouriteEventsController } from './controllers/users-favourite-events.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserFavouriteEvent])],
  controllers: [UsersController, UsersFavouriteEventsController],
  providers: [UsersService, UsersFavouriteEventsService],
  exports: [UsersService],
})
export class UsersModule {}
