/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("user_type_activity", (table) => {
    table.increments("id").primary();

    table
      .integer("userTypeId")
      .notNullable()
      .references("id")
      .inTable("user_type")
      .onDelete("CASCADE");

    // Store multiple role IDs as JSON string
    table.string("roleIds", 2000).notNullable(); // JSON serialized array

    table.dateTime("createdAt").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("user_type_activity");
};
