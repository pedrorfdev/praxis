import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const clinics = pgTable("clinics", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  slug: text().notNull().unique(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});