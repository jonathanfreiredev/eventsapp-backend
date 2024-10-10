import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseCommonEntity } from '../../common/entities/BaseCommonEntity';
import { User } from '../../users/entities/user.entity';
import { Event } from '../../events/entities/event.entity';
import { Reply } from './reply.entity';

@Entity({ name: 'comments' })
export class Comment extends BaseCommonEntity {
  @Column({ name: 'content', type: 'varchar' })
  content: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'commented_by' })
  commentedBy: User;

  @ManyToOne(() => Event, (event) => event.comments)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @OneToMany(() => Reply, (reply) => reply.comment)
  replies: Reply[];
}
