import { c } from './contract';
import { userContract } from './user';
import { authContract } from './auth';
import { categoryContract } from './category';
import { productContract } from './product';
import { reviewContract } from './review';
import { addressContract } from './address';
import { cartContract } from './cart';
import { orderContract } from './order';
import { supportContract } from './support';

export const Contract = c.router(
    {
        user: userContract,
        auth: authContract,
        category: categoryContract,
        product: productContract,
        review: reviewContract,
        address: addressContract,
        cart: cartContract,
        order: orderContract,
        support: supportContract,
    },
    { pathPrefix: '/api/v1' }
);

export type TContract = typeof Contract;

export * from './common';
export * from './address';
export * from './auth';
export * from './avatar';
export * from './cart';
export * from './category';
export * from './order';
export * from './product';
export * from './review';
export * from './support';
export * from './user';
