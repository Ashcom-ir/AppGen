export const User_SCHEMAS = [
  {
    table: "users",
    columns: [
      { name: "email", type: "email", required: true },
      { name: "password", type: "string", required: true },
      { name: "role", type: "string" }
    ]
  }
];