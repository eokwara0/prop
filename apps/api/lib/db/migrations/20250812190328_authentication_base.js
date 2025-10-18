/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // user table
  await knex.schema.createTable("users", (table) => {
    table
      .uuid("id")
      .primary()
      .defaultTo(knex.raw("NEWID()")); // MSSQL GUID generator

    table.string("name", 255);
    table.string("email", 255).unique();
    table.dateTime("emailVerified");
    table.string("image", 500);
  });

  // account table
  await knex.schema.createTable("account", (table) => {
    table
      .uuid("userId")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.string("type", 100).notNullable();
    table.string("provider", 100).notNullable();
    table.string("providerAccountId", 255).notNullable();

    table.string("refresh_token", 500);
    table.string("access_token", 500);
    table.integer("expires_at");
    table.string("token_type", 100);
    table.string("scope", 500);
    table.string("id_token", 500);
    table.string("session_state", 500);

    table.primary(["provider", "providerAccountId"]);
  });

  // session table
  await knex.schema.createTable("session", (table) => {
    table.string("sessionToken", 255).primary();
    table
      .uuid("userId")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.dateTime("expires").notNullable();
  });

  // verificationToken table
  await knex.schema.createTable("verificationToken", (table) => {
    table.string("identifier", 255).notNullable();
    table.string("token", 255).notNullable();
    table.dateTime("expires").notNullable();

    table.primary(["identifier", "token"]);
  });

  // authenticator table
  await knex.schema.createTable("authenticator", (table) => {
    table.string("credentialID", 255).notNullable().unique();
    table
      .uuid("userId")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.string("providerAccountId", 255).notNullable();
    table.string("credentialPublicKey", 1000).notNullable();
    table.integer("counter").notNullable();
    table.string("credentialDeviceType", 100).notNullable();
    table.boolean("credentialBackedUp").notNullable();
    table.string("transports", 255);

    table.primary(["userId", "credentialID"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("authenticator");
  await knex.schema.dropTableIfExists("verificationToken");
  await knex.schema.dropTableIfExists("session");
  await knex.schema.dropTableIfExists("account");
  await knex.schema.dropTableIfExists("users");
};
