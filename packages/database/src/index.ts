import { drizzle } from 'drizzle-orm/postgres'
import postgres from 'postgres'

import * as patientsSchema from "./schemas/patients";

export const schema = { ...patientsSchema };

// URL de conexão (usando os dados do Docker)
const connectionString = process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/praxis";

// Cliente de conexão (Single Connection para migrations ou Pool para a API)
const client = postgres(connectionString);
export const db = drizzle(client, { schema });

// Tipos úteis para o resto do projeto
export type Patient = typeof patientsSchema.patients.$inferSelect;
export type NewPatient = typeof patientsSchema.patients.$inferInsert;