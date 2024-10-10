import { IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  street: string;

  @IsOptional()
  streetTwo?: string;

  @IsString()
  city: string;

  @IsString()
  zip: string;

  @IsString()
  country: string;
}
