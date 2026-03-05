import { pgTable, uuid, varchar, timestamp, date, text } from "drizzle-orm/pg-core";

export const patients = pgTable("patients", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  
  name: varchar("name", { length: 255 }).notNull(),
  birthDate: date("birth_date").notNull(),
  notes: text("notes"), 
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});