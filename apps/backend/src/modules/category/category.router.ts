import { initServer } from '@ts-rest/fastify';
import { categoryContract } from '@freshly/contracts';
import { categoryService } from './category.service';

const s = initServer();

export const categoryRouter = s.router(categoryContract, {
  getCategories: async () => ({ status: 200, body: await categoryService.getCategories() })
});
