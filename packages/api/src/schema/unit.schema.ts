import { z } from "zod";

export const UnitSchema = z.object({
  id: z.string().uuid().optional(), // DB-generated
  propertyId: z.string().uuid(),
  unitNumber: z.string().min(1),
  floor: z.number().int().nonnegative().default(1),
  bedrooms: z.number().int().nonnegative().default(0),
  bathrooms: z.number().int().nonnegative().default(0),
  squareMeters: z.number().nullable().optional(),
  isFurnished: z.boolean().default(false),
  petFriendly: z.boolean().default(false),
  hasBalcony: z.boolean().default(false),
  rentAmount: z.number().nonnegative(),
  currency: z.string().default("ZAR"),
  status: z.enum(["vacant", "occupied", "maintenance"]).default("vacant"),
  availableFrom: z.string()
    .refine((val) => !val || !isNaN(Date.parse(val)), { message: "Invalid date" })
    .nullable()
    .optional(),
  
  // Tenants array (UUIDs)
  tenants: z.array(z.string().uuid()).default([]),

  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().nullable().optional(),
});

export type IUnit = z.infer<typeof UnitSchema>;