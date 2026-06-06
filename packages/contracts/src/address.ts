import { z } from 'zod';
import { c } from './contract';
import { AddressId, CommonErrors } from './common';

export const AddressSchema = z.object({
  id: AddressId,
  label: z.string().min(1).max(50).nullable(),
  value: z.string().min(5).max(255),
  city: z.string().min(1).max(100),
  street: z.string().min(1).max(150),
  house: z.string().min(1).max(20),
  housing: z.string().max(20).nullable(),
  entrance: z.string().max(10).nullable(),
  floor: z.string().max(10).nullable(),
  apartment: z.string().max(20).nullable(),
  intercom: z.string().max(50).nullable(),
  comment: z.string().max(300).nullable(),
  fiasId: z.string().uuid().nullable(),
  isDefault: z.boolean(),
  latitude: z.number().min(-90).max(90).nullable(),
  longitude: z.number().min(-180).max(180).nullable()
});

export type TAddress = z.infer<typeof AddressSchema>;

export const CreateAddressBodySchema = AddressSchema.omit({ id: true });
export type TCreateAddressBody = z.infer<typeof CreateAddressBodySchema>;

export const UpdateAddressBodySchema = CreateAddressBodySchema.partial();
export type TUpdateAddressBody = z.infer<typeof UpdateAddressBodySchema>;

const AddressParamsSchema = z.object({ id: AddressId });

export const addressContract = c.router({
  getAddresses: {
    method: 'GET',
    path: '/addresses',
    responses: {
      200: z.array(AddressSchema),
      ...CommonErrors
    },
    summary: 'Get addresses'
  },
  createAddress: {
    method: 'POST',
    path: '/addresses',
    body: CreateAddressBodySchema,
    responses: {
      201: AddressSchema,
      ...CommonErrors
    },
    summary: 'Add new address'
  },
  updateAddress: {
    method: 'PATCH',
    path: '/addresses/:id',
    pathParams: AddressParamsSchema,
    body: UpdateAddressBodySchema,
    responses: {
      200: AddressSchema,
      ...CommonErrors
    },
    summary: 'Edit address'
  },
  deleteAddress: {
    method: 'DELETE',
    path: '/addresses/:id',
    pathParams: AddressParamsSchema,
    body: z.object({}),
    responses: {
      200: z.object({ success: z.literal(true) }),
      ...CommonErrors
    },
    summary: 'Delete address'
  },
  setDefaultAddress: {
    method: 'PATCH',
    path: '/addresses/:id/default',
    pathParams: AddressParamsSchema,
    body: z.object({}),
    responses: {
      200: AddressSchema,
      ...CommonErrors
    },
    summary: 'Set address as default'
  }
});
