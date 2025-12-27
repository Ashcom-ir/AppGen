import { db } from "@/lib/db";

/**
 * Create (insert new schema version)
 */
export async function createSchema(schema) {
  await db.execute(
    "INSERT INTO schemas (table_name, schema_json) VALUES (?, ?)",
    [schema.table, JSON.stringify(schema)]
  );
}

/**
 * Get latest schema for a table
 */
export async function getLatestSchema(tableName) {
  const [rows] = await db.execute(
    `
    SELECT schema_json
    FROM schemas
    WHERE table_name = ?
    ORDER BY id DESC
    LIMIT 1
    `,
    [tableName]
  );

  return rows.length ? JSON.parse(rows[0].schema_json) : null;
}

/**
 * Get all versions of a schema (for history / migration)
 */
export async function getSchemaHistory(tableName) {
  const [rows] = await db.execute(
    `
    SELECT id, schema_json, created_at
    FROM schemas
    WHERE table_name = ?
    ORDER BY id ASC
    `,
    [tableName]
  );

  return rows.map(r => ({
    id: r.id,
    schema: JSON.parse(r.schema_json),
    created_at: r.created_at
  }));
}

/**
 * Delete schema history (dangerous – admin only)
 */
export async function deleteSchema(tableName) {
  await db.execute(
    "DELETE FROM schemas WHERE table_name = ?",
    [tableName]
  );
}

/**
 * Export schema (ready for backup)
 */
export async function exportSchema(tableName) {
  const schema = await getLatestSchema(tableName);
  if (!schema) throw new Error("Schema not found");

  return {
    table: tableName,
    schema
  };
}

