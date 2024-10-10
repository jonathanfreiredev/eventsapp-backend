import { Column, Entity } from 'typeorm';
import { BaseCommonEntity } from '../../common/entities/BaseCommonEntity';

@Entity({ name: 'addresses' })
export class Address extends BaseCommonEntity {
  @Column({
    name: 'street',
    type: 'varchar',
    length: 250,
    default: '',
  })
  street: string;

  @Column({ name: 'city', type: 'varchar', length: 30, default: '' })
  city: string;

  @Column({ name: 'zip', type: 'varchar', length: 100, default: '' })
  zip: string;

  @Column({ name: 'country', type: 'varchar', length: 100, default: '' })
  country: string;
}
