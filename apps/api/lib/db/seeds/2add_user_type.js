/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("role").del();

  await knex("role").insert([
    { name: "C_A", description: "Create Account" },
    { name: "INV_U", description: "Invite Users" },
    { name: "M_U", description: "Manage Users" },
    { name: "A_P", description: "Add Properties" },
    { name: "E_P", description: "Edit Properties" },
    { name: "V_P", description: "View Properties" },
    { name: "C_L", description: "Create Lease" },
    { name: "E_L", description: "Edit Lease" },
    { name: "V_L", description: "View Lease" },
    { name: "C_R", description: "Collect Rent" },
    { name: "P_R", description: "Pay Rent" },
    { name: "M_REQ", description: "Maintenance Requests" },
    { name: "AP_REQ", description: "Approve Requests" },
    { name: "R_A", description: "Reports & Audit" },
    { name: "APP_S", description: "App Settings" }
  ]);
};
