import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsService } from 'src/events/services/events.service';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @Inject(EventsService)
    private eventsService: EventsService,
    @Inject(UsersService)
    private usersService: UsersService,
  ) {}

  async create(userId: string, createCommentDto: CreateCommentDto) {
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const { eventId, ...input } = createCommentDto;

    const comment = this.commentsRepository.create(input);

    comment.event = await this.eventsService.findOne(eventId);

    comment.commentedBy = user;

    return await this.commentsRepository.save(comment);
  }

  async findOne(id: string) {
    return await this.commentsRepository.findOne({
      where: { id },
    });
  }
}
