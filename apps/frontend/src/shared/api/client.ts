import { initQueryClient } from '@ts-rest/react-query';
import { Contract } from '@freshly/contracts';

export const client = initQueryClient(Contract, {
  baseUrl: process.env.PUBLIC_API_URL ?? 'http://localhost:3001',
  baseHeaders: {}
});
