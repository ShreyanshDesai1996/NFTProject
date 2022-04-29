import { z } from 'zod';
export const WhatsappUser = z
    .object({
        whatsappName: z.string(),
        assignedName: z.string(),
        phone: z.string(),
        keycloakUserId: z.string(),
        emailAddress: z.string(),
        broadcastListSubs: z.string().array(),
        broadcastListUnSubs: z.string().array(),
        botState: z.string(),
        botEnabled: z.boolean(),
        createdAt: z.string(),
    })
    .strict();
export type WhatsappUser = z.infer<typeof WhatsappUser>;

export const UsersResponse = z
    .object({
        content: WhatsappUser.array(),
        totalPages: z.number(),
        totalElements: z.number(),
    })
    .strict();

export type UsersResponse = z.infer<typeof UsersResponse>;

export const User = z
    .object({
        userName: z.string(),
        keycloakUserId: z.string(),
        emailAddress: z.string(),
        firstName: z.string(),
        lastName: z.string(),
    })
    .strict();
export type User = z.infer<typeof User>;

export const UsersFilter = z
    .object({
        pageIndex: z.number(),
        pageSize: z.number(),
        searchText: z.string(),
    })
    .strict();
export type UsersFilter = z.infer<typeof UsersFilter>;
