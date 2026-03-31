import { relations } from 'drizzle-orm'
import { pgEnum, pgTable, text, timestamp, uuid, integer } from 'drizzle-orm/pg-core'
import { clinics } from './clinics'
import { patients } from './patients'

export const sessionStatusEnum = pgEnum('session_status', [
  'in_progress',
  'completed',
])

export const billingTypeEnum = pgEnum('billing_type', [
  'PRIVATE',
  'SUBSIDIZED'
])

export const sessions = pgTable('sessions', {
  id: uuid().primaryKey().defaultRandom(),
  clinicId: uuid()
    .references(() => clinics.id, { onDelete: 'cascade' })
    .notNull(),
  patientId: uuid()
    .references(() => patients.id, { onDelete: 'cascade' })
    .notNull(),
  
  startAt: timestamp().defaultNow().notNull(),
  
  durationInMinutes: integer().default(60).notNull(),
  
  billingType: billingTypeEnum().default('PRIVATE').notNull(),
  
  content: text(),
  
  status: sessionStatusEnum().default('in_progress').notNull(),
  
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
})

export const sessionsRelations = relations(sessions, ({ one }) => ({
  clinic: one(clinics, {
    fields: [sessions.clinicId],
    references: [clinics.id],
  }),
  patient: one(patients, {
    fields: [sessions.patientId],
    references: [patients.id],
  }),
}))