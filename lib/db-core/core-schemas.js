export const CORE_SCHEMAS = [
  {
    table: "contacts",
    columns: [
      { name: "name", type: "string", required: true },
      { name: "email", type: "email" },
      { name: "age", type: "number" },
      { name: "price", type: "float" },
      { name: "birth_date", type: "date" },
      { name: "created_at", type: "datetime" },
      { name: "status", type: "enum", values: ["active", "inactive"] },
      { name: "meta", type: "json" }
    ]
  },

  {
    table: "users",
    columns: [
      { name: "email", type: "email", required: true },
      { name: "password", type: "string", required: true },
      { name: "role", type: "string" }
    ]
  },
  {
    table: "settings",
    columns: [
      { name: "email", type: "email", required: true },
      { name: "password", type: "string", required: true },
      { name: "role", type: "string" }
    ]
  }

];
