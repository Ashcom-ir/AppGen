export const POSTGRESQL_TYPE_MAP = {
  // Numbers
  small_number: "SMALLINT",
  tiny_number: "SMALLINT",
  number: "INTEGER",
  big_number: "BIGINT",
  float: "REAL",
  double: "DOUBLE PRECISION",
  decimal: (precision = 10, scale = 0) => `NUMERIC(${precision},${scale})`,

  // Boolean
  boolean: "BOOLEAN",

  // String / Text
  varchar: (len = 255) => `VARCHAR(${len})`,
  char: (len = 31) => `CHAR(${len})`,
  text: "TEXT",

  // Binary / Blob
  bytea: "BYTEA",

  // Date / Time
  date: "DATE",
  time: "TIME",
  timetz: "TIMETZ",
  timestamp: "TIMESTAMP",
  timestamptz: "TIMESTAMPTZ",
  interval: "INTERVAL",

  // JSON
  json: "JSON",
  jsonb: "JSONB",

  // UUID
  uuid: "UUID",

  // Enum
  enum: (name, values = []) =>
    `CREATE TYPE ${name} AS ENUM (${values.map(v => `'${v}'`).join(", ")});`,

  // Spatial / Geometry (PostGIS)
  point: "POINT",
  line: "LINE",
  lseg: "LSEG",
  box: "BOX",
  path: "PATH",
  polygon: "POLYGON",
  circle: "CIRCLE",
  geometry: "GEOMETRY",
  geography: "GEOGRAPHY",

  // Unknown / fallback
  unknown: "TEXT"
};
