import type { Category } from '@freshly/contracts';
import { categoryRepository } from './category.repository';
import { toCategory } from './category.mapper';

export class CategoryService {
  public async getCategories(): Promise<Category[]> {
    const rows = await categoryRepository.findAll();
    return rows.map(toCategory);
  }
}

export const categoryService = new CategoryService();
