import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressInput } from '../dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    const newImage = this.addressRepository.create(createAddressDto);
    return await this.addressRepository.save(newImage);
  }

  async update(updateAddressDto: UpdateAddressInput) {
    const { id, ...input } = updateAddressDto;

    const address = await this.addressRepository.findOne({
      where: { id },
    });

    if (!address) {
      throw new Error('Address not found');
    }

    const mergedInput = this.addressRepository.merge(address, input);

    return await this.addressRepository.save(mergedInput);
  }
}
