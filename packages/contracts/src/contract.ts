import { initContract } from '@ts-rest/core';

type ContractInstance = ReturnType<typeof initContract>;

export const c: ContractInstance = initContract();
