import type { SelectProduct } from '@freshly/db';
import type { Product } from '@freshly/contracts';

export const toProduct = (row: SelectProduct): Product => ({
  id: row.id as Product['id'],
  categoryId: row.categoryId as Product['categoryId'],
  sku: row.sku,
  name: row.name,
  slug: row.slug,
  description: row.description,
  price: row.price,
  salePrice: row.salePrice,
  stock: row.stock,
  imageUrls: row.imageUrls,
  rating: Number(row.rating),
  reviewCount: row.reviewCount,
  isActive: row.isActive,
  deletedAt: row.deletedAt ? row.deletedAt.toISOString() : null,
  createdAt: row.createdAt.toISOString()
});
