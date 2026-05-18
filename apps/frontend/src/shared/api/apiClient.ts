import { initClient } from '@ts-rest/core';
import { Contract } from '@freshly/contracts';

export const apiClient = initClient(Contract, {
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
  baseHeaders: {}
});
