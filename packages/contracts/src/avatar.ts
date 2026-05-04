import { z } from 'zod';

export const AVATARS = [
    'bear.png',
    'cat.png',
    'chicken.png',
    'meerkat.png',
    'panda.png',
] as const;

export const AvatarSchema = z.enum(AVATARS);
export type TAvatar = z.infer<typeof AvatarSchema>;
