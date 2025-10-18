/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("role", (table) => {
    table.increments("id").primary(); // auto-increment integer
    table.string("name", 255).notNullable(); // e.g., "Property Manager", "Finance Auditor"
    table.string("description", 1000).notNullable();
    table.dateTime("createdAt").defaultTo(knex.fn.now());
    table.unique(["name"]); // prevents duplicate role names
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("role");
};
