import { z } from "zod";

export const UserTypeActivitySchema = z.object({
  id: z.number().int().optional(),
  userTypeId: z.number().int(),
  roleIds: z.array(z.number().int()).min(1),
  createdAt: z.string().datetime().optional(),
});

export type IUserTypeActivity = z.infer<typeof UserTypeActivitySchema>;
