import { z } from 'zod';

export const SessionSchema = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.string().datetime(), // matches ISO 8601 date-time format
});

export type ISession = z.infer<typeof SessionSchema>;
