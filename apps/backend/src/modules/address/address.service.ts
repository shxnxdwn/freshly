import type { Address, AddressId, CreateAddressBody, UpdateAddressBody, UserId } from '@freshly/contracts';
import { addressRepository } from './address.repository';
import { toAddress } from './address.mapper';
import { NotFoundError } from '../../errors/app-error';

export class AddressService {
  public async getAddresses(userId: UserId): Promise<Address[]> {
    const rows = await addressRepository.findAllByUserId(userId);
    return rows.map(toAddress);
  }

  public async createAddress(userId: UserId, body: CreateAddressBody): Promise<Address> {
    const row = await addressRepository.create(userId, body);
    return toAddress(row);
  }

  public async updateAddress(userId: UserId, addressId: AddressId, body: UpdateAddressBody): Promise<Address> {
    const row = await addressRepository.update(addressId, userId, body);
    if (!row) throw new NotFoundError('Address not found');
    return toAddress(row);
  }

  public async deleteAddress(userId: UserId, addressId: AddressId): Promise<void> {
    const row = await addressRepository.delete(addressId, userId);
    if (!row) throw new NotFoundError('Address not found');
  }
}

export const addressService = new AddressService();
