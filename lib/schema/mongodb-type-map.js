export const MONGODB_TYPE_MAP = {
  // Numbers
  int32: "int32",
  int64: "int64",
  double: "double",
  decimal: "decimal128",

  // Boolean
  boolean: "bool",

  // String
  string: "string",

  // Date / Time
  date: "date",
  timestamp: "timestamp",

  // Binary
  binary: "binData",
  objectId: "objectId",

  // Array / Object
  array: "array",
  object: "object",

  // Null / Other
  null: "null",
  regex: "regex",
  minKey: "minKey",
  maxKey: "maxKey"
};
