import { db } from "@/lib/db";

export async function createCoreTables() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS schemas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      table_name VARCHAR(100) NOT NULL,
      schema_json JSON NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);
}
