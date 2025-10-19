import { z } from 'zod';
import { UserTypeActivitySchema } from './user.type.activity.schema';

export const RoleSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  createdAt: z.string().datetime().optional(),
});

export const RoleWithRelationsSchema = RoleSchema.extend({
  userTypeActivities: z.array(UserTypeActivitySchema).optional(),
});

// Type inference
export type IRole = z.infer<typeof RoleSchema>;
export type IRoleWithRelationsSchema = z.infer<typeof RoleWithRelationsSchema>;
