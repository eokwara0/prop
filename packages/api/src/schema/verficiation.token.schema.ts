import { z } from "zod";

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.string().datetime(), // ISO 8601 date-time string
});

export type IVerificationToken = z.infer<typeof VerificationTokenSchema>;
