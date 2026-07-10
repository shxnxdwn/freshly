import type { User } from '@freshly/contracts';
import type { SelectUser } from '@freshly/db';

export const toUser = (row: SelectUser): User => ({
  id: row.id as User['id'],
  email: row.email,
  name: row.name,
  avatar: row.avatar,
  role: row.role,
  createdAt: row.createdAt.toISOString()
});
