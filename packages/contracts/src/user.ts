import { z } from 'zod';
import { c } from './contract';
import { CommonErrors, DateTimeSchema, UserIdSchema } from './common';

const AVATARS = ['bear.png', 'cat.png', 'chicken.png', 'meerkat.png', 'panda.png'] as const;
const AvatarSchema = z.enum(AVATARS);

export type Avatar = z.infer<typeof AvatarSchema>;

export const UserRole = {
  ADMIN: 'admin',
  CLIENT: 'client'
} as const;

export const UserRoleSchema = z.nativeEnum(UserRole);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserSchema = z.object({
  id: UserIdSchema,
  email: z.string().email(),
  name: z.string().min(1).max(100),
  avatar: AvatarSchema,
  role: UserRoleSchema,
  createdAt: DateTimeSchema
});

export type User = z.infer<typeof UserSchema>;

export const UpdateUserBodySchema = z
  .object({
    name: z.string().min(1).max(100).optional(),
    avatar: AvatarSchema.optional()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field (name or avatar) must be provided'
  });

export type UpdateUserBody = z.infer<typeof UpdateUserBodySchema>;

export const userContract = c.router({
  getUser: {
    method: 'GET',
    path: '/user',
    responses: {
      200: UserSchema,
      ...CommonErrors
    },
    summary: 'Get current user'
  },
  updateUser: {
    method: 'PATCH',
    path: '/user',
    body: UpdateUserBodySchema,
    responses: {
      200: UserSchema,
      ...CommonErrors
    },
    summary: 'Update current user'
  },
  deleteUser: {
    method: 'DELETE',
    path: '/user',
    body: z.object({}),
    responses: {
      200: z.object({ success: z.literal(true) }),
      ...CommonErrors
    },
    summary: 'Delete current user'
  }
});
