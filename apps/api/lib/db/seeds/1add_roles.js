/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_type").del();
  await knex("user_type").insert([
    {  name: "Admin" },
    {  name: "Manager" },
    {  name: "Tenant" },
    { name: "Finance" },
  ]);
};
