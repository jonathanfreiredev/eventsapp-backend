import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Address } from '../../addresses/entities/address.entity';
import { BaseCommonEntity } from '../../common/entities/BaseCommonEntity';
import { EventParticipant } from './event-participant.entity';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { UserFavouriteEvent } from '../../users/entities/user-favourite-event.entity';

export enum CategoryType {
  Music = 'Music',
  Sports = 'Sports',
  Workshop = 'Workshop',
  Art = 'Art',
  FoodAndDrink = 'Food & Drink',
  Business = 'Business',
  Languages = 'Languages',
  Festival = 'Festival',
  Travel = 'Travel',
  Outdoors = 'Outdoors',
  Social = 'Social',
}

@Entity({ name: 'events' })
export class Event extends BaseCommonEntity {
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description?: string;

  @Column({ name: 'start_date', type: 'timestamptz' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamptz' })
  endDate: Date;

  @Column({ name: 'capacity', type: 'int' })
  capacity: number;

  @Column({ name: 'category', type: 'enum', enum: CategoryType })
  category: CategoryType;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToMany(() => UserFavouriteEvent, (user) => user.event)
  favouriteOfUsers: UserFavouriteEvent[];

  @OneToMany(() => EventParticipant, (user) => user.event)
  participants: EventParticipant[];

  @ManyToOne(() => User, (user) => user.organisedEvents)
  @JoinColumn({ name: 'organiser_id' })
  organiser: User;

  @OneToMany(() => Comment, (comment) => comment.event)
  comments: Comment[];
}
