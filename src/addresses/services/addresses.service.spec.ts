import { Test, TestingModule } from '@nestjs/testing';
import { AddressesService } from './addresses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Address } from '../entities/address.entity';
import { Repository } from 'typeorm';

describe('AddressesService', () => {
  let service: AddressesService;
  let addressRepository: Repository<Address>;

  const mockAddressRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    merge: jest.fn(),
  };

  const mockAddress = {
    id: '1',
    street: 'Calle de la princesa',
    city: 'Madrid',
    country: 'Spain',
    zip: '12345',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressesService,
        { provide: getRepositoryToken(Address), useValue: mockAddressRepository },
      ],
    }).compile();

    service = module.get<AddressesService>(AddressesService);
    addressRepository = module.get<Repository<Address>>(getRepositoryToken(Address));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new address', async () => {
      const createAddressDto = {
        street: 'Calle de la princesa',
        city: 'Madrid',
        country: 'Spain',
        zip: '12345',
      };

      mockAddressRepository.create.mockReturnValue(createAddressDto);
      mockAddressRepository.save.mockResolvedValue(mockAddress);

      const result = await service.create(createAddressDto);

      expect(addressRepository.create).toHaveBeenCalledWith(createAddressDto);
      expect(addressRepository.save).toHaveBeenCalledWith(createAddressDto);
      expect(result).toEqual(mockAddress);
    });
  });

  describe('update', () => {
    it('should update an existing address if found', async () => {
      const updateAddressInput = { street: 'Calle de la reina' };

      mockAddressRepository.findOne.mockResolvedValue(mockAddress);
      mockAddressRepository.merge.mockReturnValue({ ...mockAddress, ...updateAddressInput });
      mockAddressRepository.save.mockResolvedValue({ ...mockAddress, ...updateAddressInput });

      const result = await service.update('1', updateAddressInput);

      expect(addressRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(addressRepository.merge).toHaveBeenCalledWith(mockAddress, updateAddressInput);
      expect(addressRepository.save).toHaveBeenCalledWith({
        ...mockAddress,
        ...updateAddressInput,
      });
      expect(result).toEqual({ ...mockAddress, ...updateAddressInput });
    });

    it('should throw an error if the address is not found', async () => {
      mockAddressRepository.findOne.mockResolvedValue(null);

      await expect(service.update('999', { street: 'Unknown' })).rejects.toThrow(
        'Address not found',
      );

      expect(addressRepository.findOne).toHaveBeenCalledWith({ where: { id: '999' } });
    });
  });
});
