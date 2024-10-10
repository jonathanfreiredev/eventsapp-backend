import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserFavouriteEvent } from './entities/user-favourite-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserFavouriteEvent])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
