import { c } from './contract';
import { userContract } from './user';

export const Contract = c.router(
    { user: userContract },
    { pathPrefix: '/api/v1' }
);

export type TContract = typeof Contract;

export * from './common';
export * from './user';
export * from './avatar';
