import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseCommonEntity } from '../../common/entities/BaseCommonEntity';
import { User } from '../../users/entities/user.entity';
import { Event } from './event.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'events_participants' })
export class EventParticipant extends BaseCommonEntity {
  @Column({ name: 'event_id', type: 'uuid' })
  eventId: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => Event, (event) => event.participants)
  @JoinColumn({ name: 'event_id' })
  @Exclude()
  event: Event;

  @ManyToOne(() => User, (user) => user.participatedInEvents)
  @JoinColumn({ name: 'user_id' })
  @Exclude()
  user: User;
}
