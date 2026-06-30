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

export const UpdateProfileBodySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  avatar: AvatarSchema.optional()
});

export type UpdateProfileBody = z.infer<typeof UpdateProfileBodySchema>;

export const userContract = c.router({
  getProfile: {
    method: 'GET',
    path: '/user/profile',
    responses: {
      200: UserSchema,
      ...CommonErrors
    },
    summary: 'Get user profile'
  },
  updateProfile: {
    method: 'PATCH',
    path: '/user/profile',
    body: UpdateProfileBodySchema,
    responses: {
      200: UserSchema,
      ...CommonErrors
    },
    summary: 'Update user profile'
  },
  deleteProfile: {
    method: 'DELETE',
    path: '/user/profile',
    body: z.object({}),
    responses: {
      200: z.object({ success: z.literal(true) }),
      ...CommonErrors
    },
    summary: 'Delete user profile (soft-delete)'
  }
});
