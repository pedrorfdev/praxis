import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { schemas } from "./schemas/index";  

const connectionString = "postgresql://admin:password123@localhost:5432/praxis_db";
const client = postgres(connectionString);

export const db = drizzle(client, { 
  schema: schemas, 
  casing: "snake_case" 
});


export { schemas as schema };