/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("user_pass", (table) => {
    // FK to user table (GUID/UUID type)
    table
      .uuid("userId")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    // FK to user_type table (int ID)
    table
      .integer("userTypeId")
      .notNullable()
      .references("id")
      .inTable("user_type")
      .onDelete("CASCADE");

    // password fields
    table.string("passwordHash", 500).notNullable();
    table.string("passwordSalt", 500); // optional, depending on strategy

    table.boolean("isActive").defaultTo(true);

    // timestamps
    table.dateTime("createdAt").defaultTo(knex.fn.now()); // MSSQL equivalent
    table.dateTime("lastUsedAt");

    // index & PK
    table.index(["userId"], "idx_userPassword_userId");
    table.primary(["userId"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("user_pass");
};
