import { z } from "zod";

export const TenantSchema = z.object({
  id: z.string().uuid().optional(), // DB generated
  userId: z.string().uuid(),
  
  // Personal info
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().nullable().optional(),
  dateOfBirth: z.string().refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }).nullable().optional(),
  idNumber: z.string().nullable().optional(),

  // Address info
  currentAddress: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  postalCode: z.string().nullable().optional(),
  country: z.string().default("South Africa"),

  // Lease / unit info
  unitId: z.string().uuid(),
  monthlyRent: z.number().nonnegative().nullable().optional(),
  isActive: z.boolean().default(true),

  // Emergency contact
  emergencyContactName: z.string().nullable().optional(),
  emergencyContactPhone: z.string().nullable().optional(),

  // Metadata
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().nullable().optional(),
});

export type ITenant = z.infer<typeof TenantSchema>;