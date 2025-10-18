const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const users = await knex("users").select("id", "name");

  // get units joined to their property's userId (owner)
  const units = await knex("unit as u")
    .join("property as p", "u.propertyId", "p.id")
    .select("u.id as unitId", "p.ownerId as ownerId");

  // console.log(units);

  // Insert tenants
  const tenantsData = [
    {
      id: uuidv4(),
      userId: users[0].id,
      unitId: units[0].unitId,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      dateOfBirth: faker.date.birthdate(),
      currentAddress: faker.location.streetAddress(),
      city: faker.location.city(),
      postalCode: faker.location.countryCode(),
      monthlyRent: 3000,
      emergencyContactName: faker.person.fullName(),
      emergencyContactPhone: faker.phone.number(),
    },
    {
      id: uuidv4(),
      userId: users[0].id,
      unitId: units[1].unitId,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      dateOfBirth: faker.date.birthdate(),
      currentAddress: faker.location.streetAddress(),
      city: faker.location.city(),
      postalCode: faker.location.countryCode(),
      monthlyRent: 2300,
      emergencyContactName: faker.person.fullName(),
      emergencyContactPhone: faker.phone.number(),
    },
    {
      id: uuidv4(),
      userId: users[1].id,
      unitId: units[2].unitId,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      dateOfBirth: faker.date.birthdate(),
      currentAddress: faker.location.streetAddress(),
      city: faker.location.city(),
      postalCode: faker.location.countryCode(),
      monthlyRent: 5000,
      emergencyContactName: faker.person.fullName(),
      emergencyContactPhone: faker.phone.number(),
    },
    {
      id: uuidv4(),
      userId: users[2].id,
      unitId: units[3].unitId,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      dateOfBirth: faker.date.birthdate(),
      currentAddress: faker.location.streetAddress(),
      city: faker.location.city(),
      postalCode: faker.location.countryCode(),
      monthlyRent: 4600,
      emergencyContactName: faker.person.fullName(),
      emergencyContactPhone: faker.phone.number(),
    },
  ];

  const tenants = await knex("tenant").insert(tenantsData).returning("*");

  // // Helper to add months
  const addMonths = (date, months) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  };

  const today = new Date();
  const sixMonthsAgo = addMonths(today, -6);
  const oneYearAgo = addMonths(today, -12);
  const threeMonthsAgo = addMonths(today, -3);
  const sixMonthsFromNow = addMonths(today, 6);
  const oneYearFromNow = addMonths(today, 12);
  const nineMonthsFromNow = addMonths(today, 9);

  const leaseConfigs = [
    { tenantIndex: 0, startDate: oneYearAgo, endDate: oneYearFromNow, monthlyRent: 1500, depositAmount: 500, status: "active" },
    { tenantIndex: 1, startDate: sixMonthsAgo, endDate: sixMonthsFromNow, monthlyRent: 1600, depositAmount: 500, status: "active" },
    { tenantIndex: 2, startDate: threeMonthsAgo, endDate: nineMonthsFromNow, monthlyRent: 1750, depositAmount: 500, status: "active" },
    { tenantIndex: 3, startDate: oneYearAgo, endDate: sixMonthsFromNow, monthlyRent: 2200, depositAmount: 500, status: "expired" },
    { tenantIndex: 0, startDate: threeMonthsAgo, endDate: nineMonthsFromNow, monthlyRent: 2500, depositAmount: 500, status: "active" },
    { tenantIndex: 1, startDate: sixMonthsAgo, endDate: sixMonthsFromNow, monthlyRent: 3500, depositAmount: 500, status: "active" },
    { tenantIndex: 2, startDate: oneYearAgo, endDate: oneYearFromNow, monthlyRent: 4200, depositAmount: 500, status: "active" },
  ];

  // // Build leases
  const leasesToInsert = leaseConfigs.map(cfg => {
    const tenant = tenants[cfg.tenantIndex];
    const availableUnit = units.find(u => u.unitId === tenant.unitId);

    if (!availableUnit) return null;
    return {
      id: uuidv4(), // generate UUID in JS
      unitId: availableUnit.unitId,
      tId: tenant.id,
      startDate: cfg.startDate,
      endDate: cfg.endDate,
      monthlyRent: cfg.monthlyRent,
      status: cfg.status,
      depositAmount: cfg.depositAmount,
    };
  }).filter(Boolean);

  const leases = [];
  // // Insert one by one to avoid SQL Server multi-row issues
  for (const lease of leasesToInsert) {
    const [inserted] = await knex("lease").insert(lease).returning("*");
    leases.push(inserted);
  }

  return { tenants, leases };
};
