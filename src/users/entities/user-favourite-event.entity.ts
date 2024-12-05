import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseCommonEntity } from '../../common/entities/BaseCommonEntity';
import { Event } from '../../events/entities/event.entity';
import { User } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users_favourite_events' })
export class UserFavouriteEvent extends BaseCommonEntity {
  @Column({ name: 'event_id', type: 'uuid' })
  eventId: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => Event, (event) => event.favouriteOfUsers)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @ManyToOne(() => User, (user) => user.favouriteEvents)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
