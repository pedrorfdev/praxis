import type { Config } from 'drizzle-kit';

export default {
  schema: "./src/schemas/*.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: "postgres://postgres:password@localhost:5432/praxis",
  },
} satisfies Config;