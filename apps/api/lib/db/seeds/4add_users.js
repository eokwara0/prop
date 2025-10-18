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
        id:uuidv4(),
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
  // Clean up in reverse order of dependencies
  await knex("lease").del();
  await knex("tenant").del();
  await knex("unit").del();
  await knex("property").del();
  await knex("user_pass").del();
  await knex("authenticator").del();
  await knex("session").del();
  await knex("account").del();
  await knex("users").del();

  // Insert users
  const users = await knex("users")
    .insert( seedUsers)
    .returning("*");

  // Get user types
  const userTypes = await knex("user_type").select("id", "name");
  const userTypeMap = Object.fromEntries(
    userTypes.map((ut) => [ut.name, ut.id])
  );

  // Insert user passwords (using bcrypt hash for 'password123')
  // Note: In production, use actual bcrypt library to hash passwords
  // This is a placeholder hash - you should generate real hashes
   
  const salt = await bcrypt.genSalt(20);
   const hash = await bcrypt.hash("P@$$123w0rD#01" , salt);

  const sampleHash = hash; // Replace with actual bcrypt hash

  await knex("user_pass").insert([
    {
      userId: seedUsers[0].id,
      userTypeId: userTypeMap["Admin"],
      passwordHash: sampleHash,
      passwordSalt: salt,
      isActive: true,
      lastUsedAt: new Date(),
    },
    {
      userId: seedUsers[1].id,
      userTypeId: userTypeMap["Manager"],
      passwordHash: sampleHash,
      passwordSalt: salt,
      isActive: true,
      lastUsedAt: new Date(),
    },
    {
      userId: seedUsers[2].id,
      userTypeId: userTypeMap["Manager"],
      passwordHash: sampleHash,
      passwordSalt: salt,
      isActive: true,
      lastUsedAt: null,
    },
    {
      userId: seedUsers[3].id,
      userTypeId: userTypeMap["Finance"],
      passwordHash: sampleHash,
      passwordSalt: salt,
      isActive: true,
      lastUsedAt: new Date(),
    },
  ]);

  return users;
};