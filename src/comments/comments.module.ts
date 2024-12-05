import { Module } from '@nestjs/common';
import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from './entities/reply.entity';
import { Comment } from './entities/comment.entity';
import { RepliesService } from './services/replies.service';
import { EventsModule } from 'src/events/events.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Reply]), EventsModule, UsersModule],
  controllers: [CommentsController],
  providers: [CommentsService, RepliesService],
})
export class CommentsModule {}
