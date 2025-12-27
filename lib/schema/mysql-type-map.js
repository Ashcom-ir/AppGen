export const MYSQL_TYPE_MAP = {
  // Numbers
  bit: "BIT",
  tinyint: "TINYINT",
  mediumint: "MEDIUMINT",
  int: "INT",
  bigint: "BIGINT",
  float: "FLOAT",
  double: "DOUBLE",
  decimal: (precision = 10, scale = 0) => `DECIMAL(${precision},${scale})`,

  // Boolean
  boolean: "TINYINT(1)",

  // String / Text
  varchar: (len = 255) => `VARCHAR(${len})`,
  char: (len = 31) => `CHAR(${len})`,
  tiny_text: "TINYTEXT",
  text: "TEXT",
  med_text: "MEDIUMTEXT",
  longtext: "LONGTEXT",

  // Binary / Blob
  binary: (len = 255) => `BINARY(${len})`,
  varbinary: (len = 255) => `VARBINARY(${len})`,
  blob: "BLOB",
  tinyblob: "TINYBLOB",
  mediumblob: "MEDIUMBLOB",
  longblob: "LONGBLOB",

  // Date / Time
  date: "DATE",
  time: "TIME",
  datetime: "DATETIME",
  timestamp: "TIMESTAMP",
  year: "YEAR",

  // JSON
  json: "JSON",

  // UUID
  uuid: "CHAR(36)",

  // Enum / Set
  enum: (values = []) =>
    `ENUM(${values.map(v => `'${v}'`).join(",")})`,
  set: (values = []) =>
    `SET(${values.map(v => `'${v}'`).join(",")})`,

  // Spatial / Geometry types
  point: "POINT",
  linestring: "LINESTRING",
  polygon: "POLYGON",
  geometry: "GEOMETRY",
  multipoint: "MULTIPOINT",
  multilinestring: "MULTILINESTRING",
  multipolygon: "MULTIPOLYGON",
  geometrycollection: "GEOMETRYCOLLECTION",

  // Unknown / fallback
  unknown: "unknown"
};
