import { Module } from '@nestjs/common';
import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from './entities/reply.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Reply])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
