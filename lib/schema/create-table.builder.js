import { TYPE_MAP } from "./type-map";
import { validateCreateTablePayload } from "./validators";

export function buildCreateTableSQL(payload) {
  const { table, columns } = payload;

  validateCreateTablePayload(payload);
  const cols = columns.map(col => {

    let sqlType = TYPE_MAP[col.type];
    if (!sqlType) {
      throw new Error(`Unsupported column type: ${col.type}`);
    }

    // enum support
    if (typeof sqlType === "function") {
      if (!Array.isArray(col.values)) {
        throw new Error("Enum values required");
      }
      sqlType = sqlType(col.values);
    }

    return `
      \`${col.name}\`
      ${sqlType}
      ${col.required ? "NOT NULL" : "NULL"}
    `;
  });

  return `
    CREATE TABLE IF NOT EXISTS \`${table}\` (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ${cols.join(",")}
    )
  `;
}
