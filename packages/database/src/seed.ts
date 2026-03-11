import { db, schema } from "./index";

async function main() {
  console.log("🌱 Rodando Seed...");

  try {
    await db.insert(schema.clinics).values({
      name: "Clínica Praxis Central",
      slug: "praxis-central",
    });

    console.log("✅ Sucesso!");
  } catch (error) {
    console.error("❌ Erro:", error);
  } finally {
    process.exit(0);
  }
}
main();