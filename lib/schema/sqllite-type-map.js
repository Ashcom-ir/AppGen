export const SQLITE_TYPE_MAP = {
//SQLite Types
  // Integer types (all map to INTEGER affinity)
  int: "INTEGER",
  // Floating point / decimal
  float: "REAL",
  // Boolean
  boolean: "INTEGER", // conventionally 0 = false, 1 = true
  // String types (all map to TEXT affinity)
  text: "TEXT",
  // Enum (stored as TEXT)
  enum: (values = []) => `TEXT CHECK(value IN (${values.map(v => `'${v}'`).join(",")}))`,
  // Binary / blob
  blob: "BLOB"
};
