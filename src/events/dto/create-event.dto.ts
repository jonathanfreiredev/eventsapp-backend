import {
  IsDate,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';
import { CategoryType } from '../entities/event.entity';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsNumber()
  capacity: number;

  @IsEnum(CategoryType)
  category: CategoryType;

  @IsObject()
  address: CreateAddressDto;
}
