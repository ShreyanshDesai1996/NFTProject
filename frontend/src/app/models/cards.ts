import { z } from 'zod';

export const Card = z
    .object({
        text: z.string(),
        route: z.string(),
    })
    .strict();
export type Card = z.infer<typeof Card>;
