import type { Category } from '@freshly/contracts';
import type { SelectCategory } from '@freshly/db';

export const toCategory = (row: SelectCategory): Category => ({
  id: row.id as Category['id'],
  name: row.name,
  slug: row.slug,
  imageUrl: row.imageUrl,
  isActive: row.isActive
});
