import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreateReplyDto } from '../dto/create-reply.dto';
import { Reply } from '../entities/reply.entity';
import { CommentsService } from './comments.service';

@Injectable()
export class RepliesService {
  constructor(
    @InjectRepository(Reply)
    private repliesRepository: Repository<Reply>,
    @Inject(CommentsService)
    private commentsService: CommentsService,
    @Inject(UsersService)
    private usersService: UsersService,
  ) {}

  async create(userId: string, createReplyDto: CreateReplyDto) {
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const { commentId, ...input } = createReplyDto;

    const reply = this.repliesRepository.create(input);

    reply.comment = await this.commentsService.findOne(commentId);

    reply.repliedBy = user;

    return await this.repliesRepository.save(reply);
  }
}
