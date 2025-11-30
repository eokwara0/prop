exports.up = async function (knex) {
  // property table
  await knex.schema.createTable("property", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("NEWID()"));
    table.uuid("ownerId").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.string("name", 255).notNullable();
    table.string("description", 2000);
    table.string("address", 500);
    table.string("city", 255);
    table.string("state", 255);
    table.string("postalCode", 50);
    table.string("country", 100).notNullable().defaultTo("South Africa");
    table.string("streetName", 255).defaultTo("");
    table.integer("streetNumber").defaultTo(10);
    table.string("suburb", 255).defaultTo("suburb");
    table.string("type", 50).notNullable().defaultTo("house"); // replace enum
    table.string("lat").nullable().defaultTo("0.000");
    table.string("lon").nullable().defaultTo("0.000");
    table.integer("bedrooms").defaultTo(0);
    table.integer("bathrooms").defaultTo(0);
    table.decimal("squareFeet", 12, 2).nullable();
    table.boolean("hasParking").defaultTo(false);
    table.boolean("isFurnished").defaultTo(false);
    table.decimal("price", 12, 2).nullable();
    table.boolean("isForRent").defaultTo(true);
    table.boolean("isForSale").defaultTo(false);
    table.string("mainImage", 500);
    table.string("images", 4000).defaultTo("[]"); // JSON string
    table.boolean("isActive").defaultTo(true);
    table.dateTime("createdAt").defaultTo(knex.fn.now());
    table.dateTime("updatedAt").nullable();
  });

  // units table
  await knex.schema.createTable("unit", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("NEWID()"));
    table.uuid("propertyId").notNullable().references("id").inTable("property").onDelete("CASCADE");
    table.string("unitNumber", 50).notNullable();
    table.integer("floor").defaultTo(1);
    table.integer("bedrooms").defaultTo(0);
    table.integer("bathrooms").defaultTo(0);
    table.decimal("squareMeters", 10, 2).nullable();
    table.boolean("isFurnished").defaultTo(false);
    table.boolean("petFriendly").defaultTo(false);
    table.boolean("hasBalcony").defaultTo(false);
    table.decimal("rentAmount", 10, 2).notNullable();
    table.string("currency", 10).defaultTo("ZAR");
    table.string("status", 50).defaultTo("vacant"); // replace enum
    table.string("tenants", 4000).defaultTo("[]"); // JSON array
    table.date("availableFrom").nullable();
    table.dateTime("createdAt").defaultTo(knex.fn.now());
    table.dateTime("updatedAt").nullable();
  });

//   // tenant table
  await knex.schema.createTable("tenant", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("NEWID()"));
    table.uuid("userId").notNullable().references("id").inTable("users");
    table.string("firstName", 255).notNullable();
    table.string("lastName", 255).notNullable();
    table.string("email", 255).unique().notNullable();
    table.string("phoneNumber", 50);
    table.date("dateOfBirth").nullable();
    table.string("idNumber", 50);
    table.string("currentAddress", 500);
    table.string("city", 255);
    table.string("postalCode", 50);
    table.string("country", 100).defaultTo("South Africa");
    table.uuid("unitId").notNullable().references("id").inTable("unit").onDelete("CASCADE");
    table.decimal("monthlyRent", 10, 2).nullable();
    table.boolean("isActive").defaultTo(true);
    table.string("emergencyContactName", 255);
    table.string("emergencyContactPhone", 50);
    table.dateTime("createdAt").defaultTo(knex.fn.now());
    table.dateTime("updatedAt").nullable();
  });

//   // lease table
  await knex.schema.createTable("lease", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("NEWID()"));
    table.uuid("unitId").notNullable().references("id").inTable("unit").onDelete("CASCADE");
    table.uuid("tId").notNullable().references("id").inTable("tenant");
    table.date("startDate").notNullable();
    table.date("endDate").nullable();
    table.decimal("monthlyRent", 10, 2).notNullable();
    table.string("currency", 10).defaultTo("ZAR");
    table.decimal("depositAmount", 10, 2).nullable();
    table.string("paymentFrequency", 50).defaultTo("monthly");
    table.string("status", 50).defaultTo("active");
    table.string("notes", 2000);
    table.dateTime("createdAt").defaultTo(knex.fn.now());
    table.dateTime("updatedAt").nullable();
  });

};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("lease");
  await knex.schema.dropTableIfExists("tenant");
  await knex.schema.dropTableIfExists("unit");
  await knex.schema.dropTableIfExists("property");
};
