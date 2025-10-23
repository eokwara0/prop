import { z } from 'zod';

export const RPropertySchema = z.object({
  statusCode: z.number(),
  result: z.object({
    id: z.string(),
    message: z.string(),
  }),
});

export type RProperty = z.infer<typeof RPropertySchema>;
