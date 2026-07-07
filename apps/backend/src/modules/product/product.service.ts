import type { Product, ProductId, ProductsQuery } from '@freshly/contracts';
import { productRepository } from './product.repository';
import { toProduct } from './product.mapper';
import { NotFoundError } from '../../errors/app-error';
import { categoryRepository } from '../category/category.repository';

export class ProductService {
  public async getProducts(query: ProductsQuery) {
    const { page, limit, categorySlug, search, sort, onSale } = query;
    const offset = (page - 1) * limit;

    let categoryId: Product['categoryId'] | undefined;

    if (categorySlug) {
      const category = await categoryRepository.findBySlug(categorySlug);
      if (!category) {
        return { items: [], total: 0, page, limit, hasNext: false, hasPrev: page > 1 };
      }
      categoryId = category.id as Product['categoryId'];
    }

    const filters = { categoryId, search, onSale };

    const [rows, total] = await Promise.all([
      productRepository.findMany({ ...filters, sort, limit, offset }),
      productRepository.count(filters)
    ]);

    return {
      items: rows.map(toProduct),
      total,
      page,
      limit,
      hasNext: offset + rows.length < total,
      hasPrev: page > 1
    };
  }

  public async getProductBySlug(slug: string): Promise<Product> {
    const row = await productRepository.findBySlug(slug);
    if (!row) throw new NotFoundError('Product not found');
    return toProduct(row);
  }

  public async findById(productId: ProductId): Promise<Product | null> {
    const row = await productRepository.findById(productId);
    return row ? toProduct(row) : null;
  }

  public async findByIds(productIds: ProductId[]): Promise<Product[]> {
    const rows = await productRepository.findByIds(productIds);
    return rows.map(toProduct);
  }
}

export const productService = new ProductService();
