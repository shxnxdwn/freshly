import { z } from 'zod';
import { c } from './contract';
import { AddressId, CommonErrors } from './common';

export const AddressSchema = z.object({
    id: AddressId,
    value: z.string().min(5, "Введите адрес"),

    city: z.string().min(1).max(50),
    street: z.string().max(50).nullable(),
    house:  z.string().min(1).max(20),
    block: z.string().max(20).optional(),

    fiasId: z.string().uuid().optional().nullable(),

    entrance: z.string().max(20).optional().nullable(),
    floor: z.string().max(20).optional().nullable(),
    apartment: z.string().max(20).optional().nullable(),

    comment: z.string().max(200).optional(),

    isDefault: z.boolean().default(false),
});

export type TAddress = z.infer<typeof AddressSchema>;

export const CreateAddressBodySchema = AddressSchema.omit({ id: true, isDefault: true });
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
            ...CommonErrors,
        },
        summary: 'Get user addresses',
    },
    createAddress: {
        method: 'POST',
        path: '/addresses',
        body: CreateAddressBodySchema,
        responses: {
            201: AddressSchema,
            ...CommonErrors,
        },
        summary: 'Create address',
    },
    updateAddress: {
        method: 'PATCH',
        path: '/addresses/:id',
        pathParams: AddressParamsSchema,
        body: UpdateAddressBodySchema,
        responses: {
            200: AddressSchema,
            ...CommonErrors,
        },
        summary: 'Update address',
    },
    deleteAddress: {
        method: 'DELETE',
        path: '/addresses/:id',
        pathParams: AddressParamsSchema,
        responses: {
            200: z.object({ success: z.literal(true) }),
            ...CommonErrors,
        },
        summary: 'Delete address',
    },
    setDefaultAddress: {
        method: 'PATCH',
        path: '/addresses/:id/default',
        pathParams: AddressParamsSchema,
        body: z.object({}),
        responses: {
            200: AddressSchema,
            ...CommonErrors,
        },
        summary: 'Set address as default',
    },
});
