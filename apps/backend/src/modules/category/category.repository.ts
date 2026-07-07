import { asc, eq } from 'drizzle-orm';
import { categories, DrizzleClient } from '@freshly/db';

export const categoryRepository = {
  async findAll() {
    return DrizzleClient.select().from(categories).orderBy(asc(categories.name));
  },

  async findBySlug(slug: string) {
    const [row] = await DrizzleClient.select().from(categories).where(eq(categories.slug, slug));
    return row ?? null;
  }
};
