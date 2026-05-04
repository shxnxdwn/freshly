import { z } from 'zod';
import { c } from './contract';
import { UserId, IsoDateSchema, CommonErrors } from './common';
import { AvatarSchema } from './avatar';

export const UserRoleSchema = z.enum(['admin', 'user']);
export type TUserRole = z.infer<typeof UserRoleSchema>;

export const UserSchema = z.object({
    id: UserId,
    email: z.string().email(),
    name: z.string().min(1).max(15),
    avatar: AvatarSchema.default('cat.png'),
    roles: z.array(UserRoleSchema).default(['user']),
    createdAt: IsoDateSchema,
});

export type TUser = z.infer<typeof UserSchema>;

export const UpdateProfileBodySchema = UserSchema.pick({
    name: true,
    avatar: true,
}).partial();

export type TUpdateProfileBody = z.infer<typeof UpdateProfileBodySchema>;

export const userContract = c.router({
    getProfile: {
        method: 'GET',
        path: '/user/profile',
        responses: {
            200: UserSchema,
            ...CommonErrors,
        },
        summary: 'Get user profile',
    },
    updateProfile: {
        method: 'PATCH',
        path: '/user/profile',
        body: UpdateProfileBodySchema,
        responses: {
            200: UserSchema,
            ...CommonErrors,
        },
        summary: 'Update user profile',
    },
});
