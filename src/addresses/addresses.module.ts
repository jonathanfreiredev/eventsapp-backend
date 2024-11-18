import { Module } from '@nestjs/common';
import { AddressesService } from './services/addresses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [AddressesService],
  exports: [AddressesService],
})
export class AddressesModule {}
