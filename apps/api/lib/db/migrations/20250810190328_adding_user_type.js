/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.dropTableIfExists("user_type");

  await knex.schema.createTable("user_type", (table) => {
    table.increments("id").primary(); // auto-increment integer
    table.string("name", 255).notNullable().unique(); // Admin, Manager, Tenant, Finance
    table.dateTime("createdAt").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("user_type");
};
