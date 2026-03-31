import { z } from 'zod'

export const sessionSchema = z.object({
  id: z.uuid(),
  clinicId: z.uuid(),
  patientId: z.uuid(),
  startAt: z.date(),
  durationInMinutes: z.number().int().default(60),
  content: z.string().optional().nullable().default(''),
  status: z.enum(['in_progress', 'completed']).default('in_progress'),

  billingType: z.enum(['PRIVATE', 'SUBSIDIZED'], {
    error: "Selecione o tipo de cobrança"
  }).default('PRIVATE'),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createSessionSchema = sessionSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    startAt: z.coerce.date({ message: 'Horário de início inválido' }).default(() => new Date()),
    content: z.string().optional().nullable()
  })

export const updateSessionSchema = createSessionSchema.partial()

export type Session = z.infer<typeof sessionSchema>
export type CreateSessionInput = z.infer<typeof createSessionSchema>
export type UpdateSessionInput = z.infer<typeof updateSessionSchema>