import { z } from 'zod';

// Zod schema
export const userPropertyStatsSchema = z.object({
  userId: z.string().uuid(),
  userName: z.string().max(255),
  totalProperties: z.number().int().nonnegative(),
  propertiesAvailable: z.number().int().nonnegative(),
  propertiesRented: z.number().int().nonnegative(),
  portfolioValue: z.number().nonnegative(),
});

// Type inferred from the Zod schema
export default userPropertyStatsSchema;
export type IPropertyStats = z.infer<typeof userPropertyStatsSchema>;
