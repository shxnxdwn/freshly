import { z } from 'zod';
import { c } from './contract';
import { CommonErrors } from './common';
import { UserSchema } from './user';

export const LoginBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export type TLoginBody = z.infer<typeof LoginBodySchema>;

export const RegisterBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(72),
    name: z.string().min(1).max(15),
});

export type TRegisterBody = z.infer<typeof RegisterBodySchema>;

export const AuthResponseSchema = z.object({
    accessToken: z.string(),
    csrfToken: z.string(),
    expiresIn: z.number().int().positive(),
    user: UserSchema,
});

export type TAuthResponse = z.infer<typeof AuthResponseSchema>;

export const RefreshResponseSchema = AuthResponseSchema.omit({ user: true });
export type TRefreshResponse = z.infer<typeof RefreshResponseSchema>;

export const authContract = c.router({
    register: {
        method: 'POST',
        path: '/auth/register',
        body: RegisterBodySchema,
        responses: {
            201: AuthResponseSchema,
            ...CommonErrors,
        },
        summary: 'Register new user',
    },
    login: {
        method: 'POST',
        path: '/auth/login',
        body: LoginBodySchema,
        responses: {
            200: AuthResponseSchema,
            ...CommonErrors,
        },
        summary: 'Login',
    },
    refresh: {
        method: 'POST',
        path: '/auth/refresh',
        body: z.object({}),
        headers: z.object({
            'x-csrf-token': z.string(),
        }),
        responses: {
            200: RefreshResponseSchema,
            ...CommonErrors,
        },
        summary: 'Refresh access token',
    },
    logout: {
        method: 'POST',
        path: '/auth/logout',
        body: z.object({}),
        headers: z.object({
            'x-csrf-token': z.string(),
        }),
        responses: {
            200: z.object({ success: z.literal(true) }),
            ...CommonErrors,
        },
        summary: 'Logout',
    },
});
