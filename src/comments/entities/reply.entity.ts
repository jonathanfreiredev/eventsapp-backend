import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseCommonEntity } from '../../common/entities/BaseCommonEntity';
import { Comment } from './comment.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'replies' })
export class Reply extends BaseCommonEntity {
  @Column({ name: 'content', type: 'varchar' })
  content: string;

  @ManyToOne(() => Comment, (comment) => comment.replies)
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'replied_by' })
  repliedBy: User;
}
