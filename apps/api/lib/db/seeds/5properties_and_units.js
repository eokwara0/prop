
const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {

  const user = await knex("users")
    .where("name", "John Administrator")
    .first();

  console.log(user);


  const prop = [
    {
      id: uuidv4(),
      name: "Sunset Apartments",
      description : faker.lorem.text(),
      address: "123 Sunset Boulevard, Los Angeles, CA 90001",
      city: faker.location.city(),
      state: faker.location.state(),
      postalCode : faker.location.countryCode(),
      ownerId: user.id,
      price: 12000000,
      mainImage : faker.image.avatar(),

    },
    {
      id: uuidv4(),
      name: "Riverside Complex",
      description : faker.lorem.text(),
      address: "456 River Road, San Francisco, CA 94102",
      city: faker.location.city(),
      state: faker.location.state(),
      postalCode : faker.location.countryCode(),
      ownerId: user.id,
      price: 12000000,
      mainImage : faker.image.avatar(),
    },
    {
      id: uuidv4(),
      name: "Downtown Towers",
      address: "789 Main Street, New York, NY 10001",
      description : faker.lorem.text(),
      city: faker.location.city(),
      state: faker.location.state(),
      postalCode : faker.location.countryCode(),
      ownerId: user.id,
      price: 12000000,
      mainImage : faker.image.avatar(),
    },
  ];
  // Insert properties
  const properties = await knex("property")
    .insert(prop)
    .returning("*");

  // Insert units
  const units = await knex("unit")
    .insert([
      // Sunset Apartments units
      {
        id: uuidv4(),
        propertyId: prop[0].id,
        unitNumber: "101",
        rentAmount: 1500.00,
        status: "occupied",
      },
      {
        id: uuidv4(),
        propertyId: prop[0].id,
        unitNumber: "102",
        rentAmount: 1600.00,
        status: "occupied",
      },
      {
        id: uuidv4(),
        propertyId: prop[0].id,
        unitNumber: "103",
        rentAmount: 1550.00,
        status: "vacant",
      },
      {
        id: uuidv4(),
        propertyId: prop[0].id,
        unitNumber: "201",
        rentAmount: 1700.00,
        status: "maintenance",
      },
      {
        id: uuidv4(),
        propertyId: prop[0].id,
        unitNumber: "202",
        rentAmount: 1750.00,
        status: "occupied",
      },

      // Riverside Complex units
      {
        id: uuidv4(),
        propertyId: prop[1].id,
        unitNumber: "A1",
        rentAmount: 2200.00,
        status: "occupied",
      },
      {
        id: uuidv4(),
        propertyId: prop[1].id,
        unitNumber: "A2",
        rentAmount: 2100.00,
        status: "vacant",
      },
      {
        id: uuidv4(),
        propertyId: prop[1].id,
        unitNumber: "B1",
        rentAmount: 2400.00,
        status: "vacant",
      },
      {
        id: uuidv4(),
        propertyId: prop[1].id,
        unitNumber: "B2",
        rentAmount: 2500.00,
        status: "occupied",
      },

      // Downtown Towers units
      {
        id: uuidv4(),
        propertyId: prop[2].id,
        unitNumber: "1001",
        rentAmount: 3500.00,
        status: "occupied",
      },
      {
        id: uuidv4(),
        propertyId: prop[2].id,
        unitNumber: "1002",
        rentAmount: 3600.00,
        status: "vacant",
      },
      {
        id: uuidv4(),
        propertyId: prop[2].id,
        unitNumber: "2001",
        rentAmount: 4200.00,
        status: "occupied",
      },
      {
        id: uuidv4(),
        propertyId: prop[2].id,
        unitNumber: "2002",
        rentAmount: 4300.00,
        status: "maintenance",
      },
    ])
    .returning("*");

  return { properties, units };
};