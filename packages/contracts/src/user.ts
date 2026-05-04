import { z } from 'zod';
import { contract } from "./contract";
import { UserId, IsoDate, CommonErrors } from './common';

export const UserRole = z.enum(['admin', 'user']);

export type UserRole = z.infer<typeof UserRole>;

export const PredefinedAvatars = z.enum(['bear.png', 'cat.png', 'chicken.png', 'meerkat.png', 'panda.png']);

export const UserSchema = z.object({
    id: UserId,
    email: z.string().email(),
    name: z.string().min(1).max(15),
    avatar: PredefinedAvatars.default('cat.png'),
    roles: z.array(UserRole).default(['user']),
    createdAt: IsoDate,
});

export type User = z.infer<typeof UserSchema>;

export const UpdateProfileBody = UserSchema.pick({
    name: true,
    avatar: true
}).partial();

export type UpdateProfileBody = z.infer<typeof UpdateProfileBody>;

export const userContract = contract.router({
    getProfile: {
        method: 'GET',
        path: 'user/profile',
        responses: {
            200: UserSchema,
            ...CommonErrors,
        },
        summary: 'Get user profile',
    },
    updateProfile: {
        method: 'PATCH',
        path: 'user/profile',
        body: UpdateProfileBody,
        responses: {
            200: UserSchema,
            ...CommonErrors,
        },
        summary: 'Update user profile',
    },
});
