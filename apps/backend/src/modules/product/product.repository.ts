import { and, asc, desc, eq, ilike, inArray, isNull, or, sql, type SQL } from 'drizzle-orm';
import type { CategoryId, ProductId, ProductSort } from '@freshly/contracts';
import { DrizzleClient, products } from '@freshly/db';

const notDeleted = isNull(products.deletedAt);
const isActive = eq(products.isActive, true);

const SORT_MAP: Record<ProductSort, SQL> = {
  price_asc: asc(products.price),
  price_desc: desc(products.price),
  rating: desc(products.rating),
  newest: desc(products.createdAt)
};

export type ProductFilters = {
  categoryId?: CategoryId;
  search?: string;
  onSale?: boolean;
};

export type FindManyParams = {
  sort?: ProductSort;
  limit: number;
  offset: number;
} & ProductFilters;

const buildConditions = (filters: ProductFilters) => {
  const conditions = [notDeleted, isActive];

  if (filters.categoryId) {
    conditions.push(eq(products.categoryId, filters.categoryId));
  }
  if (filters.search) {
    conditions.push(
      or(ilike(products.name, `%${filters.search}%`), ilike(products.description, `%${filters.search}%`))!
    );
  }
  if (filters.onSale) {
    conditions.push(sql`${products.salePrice} IS NOT NULL`);
  }

  return conditions;
};

export const productRepository = {
  async findById(id: ProductId) {
    const [row] = await DrizzleClient.select()
      .from(products)
      .where(and(eq(products.id, id), notDeleted));
    return row ?? null;
  },

  async findByIds(ids: ProductId[]) {
    if (ids.length === 0) return [];

    return DrizzleClient.select()
      .from(products)
      .where(and(inArray(products.id, ids), notDeleted));
  },

  async findBySlug(slug: string) {
    const [row] = await DrizzleClient.select()
      .from(products)
      .where(and(eq(products.slug, slug), notDeleted));
    return row ?? null;
  },

  async findMany(params: FindManyParams) {
    return DrizzleClient.select()
      .from(products)
      .where(and(...buildConditions(params)))
      .orderBy(SORT_MAP[params.sort ?? 'newest'])
      .limit(params.limit)
      .offset(params.offset);
  },

  async count(filters: ProductFilters) {
    const [{ count }] = await DrizzleClient.select({ count: sql<number>`count(*)::int` })
      .from(products)
      .where(and(...buildConditions(filters)));

    return count;
  }
};
