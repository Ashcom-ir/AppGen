export const MSSQL_TYPE_MAP = {
  //MsSql Types
  /*
    deprecated list
    IMAGE => VARBINARY(MAX)
    MONEY & SMALLMONEY => DECIMAL
    TEXT  => VARCHAR(MAX)
  */
  // Numbers
  smallint: "smallint",
  tinyint: "tinyint",
  int: "int",
  bigint: "bigint",
  float: "float",
  real: "real",
  decimal: (precision = 18, scale = 0) => `DECIMAL(${precision},${scale})`,
  numeric: (precision = 18, scale = 0) => `NUMERIC(${precision},${scale})`,

  // Boolean
  boolean: "bit",

  // Strings (with length options)
  varchar: (len = 64) => `VARCHAR(${len})`,
  maxvarchar: "VARCHAR(MAX)",
  nvarchar: (len = 64) => `NVARCHAR(${len})`,
  maxnvarchar: "NVARCHAR(MAX)",
  char: (len = 64) => `CHAR(${len})`,
  maxchar: "CHAR(MAX)",
  nchar: (len = 64) => `NCHAR(${len})`,
  maxnchar: "NCHAR(MAX)",

  // Deprecated text types (optional)
  TEXT: "TEXT",
  NTEXT: "NTEXT",

  // Date and Time
  date: "DATE",
  datetime: "DATETIME",
  datetime2: "DATETIME2(7)",
  datetimeoffset: "DATETIMEOFFSET(7)",
  smalldatetime: "SMALLDATETIME",
  time: "TIME(7)",
  timestamp: "ROWVERSION", // هشدار: timestamp = rowversion

  // XML
  xml: "XML",

  // UUID
  uuid: "uniqueidentifier",

  // Spatial / Special types
  geography: "GEOGRAPHY",
  geometry: "GEOMETRY",
  hierarchyid: "HIERARCHYID",
  sql_variant: "SQL_VARIANT",
  binary: (len = 255) => `BINARY(${len})`,
  varbinary: (len = 255) => `VARBINARY(${len})`,
  maxbinary: "BINARY(MAX)",
  maxvarbinary: "VARBINARY(MAX)",
  // Enum (شبیه سازی با VARCHAR + CHECK)
  enum: (values = [], name = "value") =>
    `VARCHAR(255) CHECK (${name} IN (${values.map(v => `'${v}'`).join(", ")}))`
};
