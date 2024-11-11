import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsObject } from 'class-validator';
import { UpdateAddressInput } from 'src/addresses/dto/update-address.dto';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(
  OmitType(CreateEventDto, ['address']),
) {
  @IsObject()
  address: UpdateAddressInput;
}
