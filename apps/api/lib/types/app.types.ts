export enum Role {
  C_A = "C_A",         // Create Account
  INV_U = "INV_U",     // Invite Users
  M_U = "M_U",         // Manage Users
  A_P = "A_P",         // Add Properties
  E_P = "E_P",         // Edit Properties
  V_P = "V_P",         // View Properties
  C_L = "C_L",         // Create Lease
  E_L = "E_L",         // Edit Lease
  V_L = "V_L",         // View Lease
  C_R = "C_R",         // Collect Rent
  P_R = "P_R",         // Pay Rent
  M_REQ = "M_REQ",     // Maintenance Requests
  AP_REQ = "AP_REQ",   // Approve Requests
  R_A = "R_A",         // Reports & Audit
  APP_S = "APP_S"      // App Settings
}


export enum UserType {
  Admin = "Admin",
  Tenant = "Tenant",
  Manager = "Manager",
  Finance = "Finance",
}