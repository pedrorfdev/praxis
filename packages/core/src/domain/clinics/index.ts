import { z } from 'zod';

export const clinicSchema = z.object({
  id: z.uuid(),
  name: z.string()
    .min(3, "O nome da clínica deve ter no mínimo 3 caracteres")
    .max(100, "Nome muito longo"),
  slug: z.string()
    .min(3, "O slug deve ter no mínimo 3 caracteres")
    .regex(/^[a-z0-9-]+$/, "O slug deve conter apenas letras minúsculas, números e hífens"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createClinicSchema = clinicSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateClinicSchema = createClinicSchema.partial();

export type Clinic = z.infer<typeof clinicSchema>;
export type CreateClinicInput = z.infer<typeof createClinicSchema>;
export type UpdateClinicInput = z.infer<typeof updateClinicSchema>;