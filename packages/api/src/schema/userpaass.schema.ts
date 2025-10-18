import { z } from "zod";

export const UserPassSchema = z.object({
  userId: z.string(),
  userTypeId: z.number().int().optional(), // not required in jsonSchema, so optional
  passwordHash: z.string(),
  passwordSalt: z.string().nullable().optional(),
  isActive: z.boolean().optional(), // optional since not in required list
  createdAt: z.string().datetime().optional(),
  lastUsedAt: z.string().datetime().nullable().optional(),
});

export type IUserPass = z.infer<typeof UserPassSchema>;
