/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("user_type_activity").del();


  // Get the role mapping
  const data = await knex("user_type").select("id" , "name");

  // Get all role IDs by name
  const roles = await knex("role").select("id", "name");
  const roleMap = Object.fromEntries(roles.map(r => [r.name, r.id]));

  // console.log(data , roles , roleMap);

  await knex("user_type_activity").insert([
    // Admin gets everything
    { userTypeId: 1, roleIds: JSON.stringify(roles.map(r => r.id)) },

    // Manager
    {
      userTypeId: 2,
      roleIds: JSON.stringify([
        roleMap["INV_U"], roleMap["M_U"], roleMap["A_P"],
        roleMap["E_P"], roleMap["V_P"], roleMap["C_L"],
        roleMap["E_L"], roleMap["V_L"], roleMap["C_R"],
        roleMap["M_REQ"], roleMap["AP_REQ"]
      ])
    },

    // Tenant
    {
      userTypeId: 3,
      roleIds: JSON.stringify([
        roleMap["V_P"], roleMap["V_L"],
        roleMap["P_R"], roleMap["M_REQ"]
      ])
    },

    // Finance
    {
      userTypeId: 4,
      roleIds: JSON.stringify([
        roleMap["C_R"], roleMap["R_A"],
        roleMap["AP_REQ"], roleMap["V_P"], roleMap["V_L"]
      ])
    }
  ]);
};
   