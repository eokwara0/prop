import { z } from "zod";
import { RoleSchema } from "./role.schema";

export const IUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  emailVerified: z.date().nullable(),
  name: z.string().nullable().optional(),
  image: z.string().url().nullable().optional(),
});


export const UserWithRoles  = IUserSchema.extend({
  roles: z.array(RoleSchema).nullable().optional(),
})
// Type inference
export type IUser = z.infer<typeof IUserSchema>;
export type IUserWithRoles = z.infer<typeof UserWithRoles>;