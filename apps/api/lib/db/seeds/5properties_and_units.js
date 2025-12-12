
const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  return await knex.transaction(async (trx) => {
    // Find a user to be the owner (prefer admin)
    const owner = await trx("users").where({ email: "admin@property.com" }).first();
    if (!owner) throw new Error("Owner user not found; run users seed first");

    const props = [
      {
        id: uuidv4(),
        name: "Sunset Apartments",
        description: faker.lorem.paragraphs(1),
        address: "123 Sunset Boulevard",
        city: faker.location.city(),
        state: faker.location.state(),
        postalCode: faker.location.zipCode(),
        ownerId: owner.id,
        price: 1200000.0,
        mainImage: faker.image.url(),
        isForRent: true,
      },
      {
        id: uuidv4(),
        name: "Riverside Complex",
        description: faker.lorem.paragraphs(1),
        address: "456 River Road",
        city: faker.location.city(),
        state: faker.location.state(),
        postalCode: faker.location.zipCode(),
        ownerId: owner.id,
        price: 800000.0,
        mainImage: faker.image.url(),
        isForRent: true,
      },
      {
        id: uuidv4(),
        name: "Downtown Towers",
        description: faker.lorem.paragraphs(1),
        address: "789 Main Street",
        city: faker.location.city(),
        state: faker.location.state(),
        postalCode: faker.location.zipCode(),
        ownerId: owner.id,
        price: 2000000.0,
        mainImage: faker.image.url(),
        isForRent: false,
      },
    ];

    const insertedProps = await trx("property").insert(props).returning("*");

    // Create some units for each property
    const unitRows = [];
    for (const p of props) {
      for (let i = 1; i <= 4; i++) {
        unitRows.push({
          id: uuidv4(),
          propertyId: p.id,
          unitNumber: String(i).padStart(3, "0"),
          rentAmount: Math.round((1000 + Math.random() * 3000) * 100) / 100,
          status: i % 3 === 0 ? "vacant" : "occupied",
        });
      }
    }

    const insertedUnits = await trx("unit").insert(unitRows).returning("*");

    return { properties: insertedProps, units: insertedUnits };
  });
};