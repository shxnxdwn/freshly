import { c } from './contract';
import { authContract } from './auth';
import { userContract } from './user';
import { categoryContract } from './category';
import { productContract } from './product';
import { reviewContract } from './review';
import { addressContract } from './address';
import { cartContract } from './cart';
import { orderContract } from './order';
import { chatContract } from './chat';

export const contract = c.router(
  {
    auth: authContract,
    user: userContract,
    category: categoryContract,
    product: productContract,
    review: reviewContract,
    address: addressContract,
    cart: cartContract,
    order: orderContract,
    chat: chatContract
  },
  { pathPrefix: '/api/v1' }
);

export type Contract = typeof contract;
