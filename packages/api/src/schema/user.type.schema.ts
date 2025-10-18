import { z } from "zod";

export const UserTypeSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1).max(255),
  createdAt: z.string().datetime().optional(),
});

export type IUserType = z.infer<typeof UserTypeSchema>;
