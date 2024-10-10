import { Column, Entity, OneToMany } from 'typeorm';
import { BaseCommonEntity } from '../../common/entities/BaseCommonEntity';
import { UserFavouriteEvent } from './user-favourite-event.entity';
import { Event } from '../../events/entities/event.entity';
import { EventParticipant } from '../../events/entities/event-participant.entity';

@Entity({ name: 'users' })
export class User extends BaseCommonEntity {
  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', length: 200, unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @OneToMany(
    () => UserFavouriteEvent,
    (userFavouriteEvent) => userFavouriteEvent.user,
  )
  favouriteEvents: UserFavouriteEvent[];

  @OneToMany(
    () => EventParticipant,
    (eventParticipant) => eventParticipant.user,
  )
  participatedInEvents: EventParticipant[];

  @OneToMany(() => Event, (event) => event.organiser)
  organisedEvents: Event[];
}
