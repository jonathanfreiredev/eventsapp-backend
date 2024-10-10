import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './create-address.dto';
import { IsUUID } from 'class-validator';

export class UpdateAddressInput extends PartialType(CreateAddressDto) {
  @IsUUID()
  id: string;
}
