export function validateCreateTablePayload(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid payload");
  }

  if (!payload.table || typeof payload.table !== "string") {
    throw new Error("Table name is required");
  }

  if (!Array.isArray(payload.columns) || !payload.columns.length) {
    throw new Error("Columns are required");
  }

  payload.columns.forEach(col => {
    if (!col.name || typeof col.name !== "string") {
      throw new Error("Invalid column name");
    }

    if (!col.type || typeof col.type !== "string") {
      throw new Error("Invalid column type");
    }

    if (col.values && !Array.isArray(col.values)) {
      throw new Error("Enum values must be array");
    }
  });
}
