const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const seedUsers = [
  {
    id: uuidv4(),
    name: "John Administrator",
    email: "admin@property.com",
    emailVerified: new Date(),
    image: null,
  },
  {
    id: uuidv4(),
    name: "Sarah Manager",
    email: "sarah.manager@property.com",
    emailVerified: new Date(),
    image: null,
  },
  {
    id: uuidv4(),
    name: "Mike Manager",
    email: "mike.manager@property.com",
    emailVerified: new Date(),
    image: null,
  },
  {
    id: uuidv4(),
    name: "Emma Finance",
    email: "emma.finance@property.com",
    emailVerified: new Date(),
    image: null,
  },
];
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  return await knex.transaction(async (trx) => {
    // Clean up in reverse order of dependencies (use trx)
    await trx("lease").del();
    await trx("tenant").del();
    await trx("unit").del();
    await trx("property").del();
    await trx("user_pass").del();
    await trx("authenticator").del();
    await trx("session").del();
    await trx("account").del();
    await trx("users").del();

    // Insert users
    const insertedUsers = await trx("users").insert(seedUsers).returning("*");

    // Get user types and map by name
    const userTypes = await trx("user_type").select("id", "name");
    const userTypeMap = Object.fromEntries(userTypes.map((ut) => [ut.name, ut.id]));

    // Hash a sample password for seeded users
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash("P@ssw0rd!2025", salt);

    // Build user_pass rows using inserted users (map by email)
    const emailMap = Object.fromEntries(insertedUsers.map(u => [u.email, u]));

    const userPassRows = [
      { email: "admin@property.com", type: "Admin" },
      { email: "sarah.manager@property.com", type: "Manager" },
      { email: "mike.manager@property.com", type: "Manager" },
      { email: "emma.finance@property.com", type: "Finance" },
    ].map(({ email, type }) => ({
      userId: emailMap[email].id,
      userTypeId: userTypeMap[type] ?? null,
      passwordHash: hash,
      passwordSalt: salt,
      isActive: true,
      lastUsedAt: new Date(),
    }));

    await trx("user_pass").insert(userPassRows);

    return insertedUsers;
  });
};