const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  return await knex.transaction(async (trx) => {
    // Load users and units
    const users = await trx("users").select("id", "email");
    const units = await trx("unit").select("id");

    if (units.length < 4) throw new Error("Not enough units seeded; run properties/units seed first");

    // Create tenants (assign to existing users and units)
    const tenantsData = [
      {
        id: uuidv4(),
        userId: users[0].id,
        unitId: units[0].id,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        dateOfBirth: faker.date.birthdate({ min: 18, max: 65 }),
        currentAddress: faker.location.streetAddress(),
        city: faker.location.city(),
        postalCode: faker.location.zipCode(),
        monthlyRent: 3000,
        emergencyContactName: faker.person.fullName(),
        emergencyContactPhone: faker.phone.number(),
      },
      {
        id: uuidv4(),
        userId: users[0].id,
        unitId: units[1].id,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        dateOfBirth: faker.date.birthdate({ min: 18, max: 65 }),
        currentAddress: faker.location.streetAddress(),
        city: faker.location.city(),
        postalCode: faker.location.zipCode(),
        monthlyRent: 2300,
        emergencyContactName: faker.person.fullName(),
        emergencyContactPhone: faker.phone.number(),
      },
      {
        id: uuidv4(),
        userId: users[1]?.id || users[0].id,
        unitId: units[2].id,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        dateOfBirth: faker.date.birthdate({ min: 18, max: 65 }),
        currentAddress: faker.location.streetAddress(),
        city: faker.location.city(),
        postalCode: faker.location.zipCode(),
        monthlyRent: 5000,
        emergencyContactName: faker.person.fullName(),
        emergencyContactPhone: faker.phone.number(),
      },
      {
        id: uuidv4(),
        userId: users[2]?.id || users[0].id,
        unitId: units[3].id,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        dateOfBirth: faker.date.birthdate({ min: 18, max: 65 }),
        currentAddress: faker.location.streetAddress(),
        city: faker.location.city(),
        postalCode: faker.location.zipCode(),
        monthlyRent: 4600,
        emergencyContactName: faker.person.fullName(),
        emergencyContactPhone: faker.phone.number(),
      },
    ];

    const insertedTenants = await trx("tenant").insert(tenantsData).returning("*");

    // Helper to add months
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
    ];

    const leasesToInsert = leaseConfigs.map(cfg => {
      const tenant = insertedTenants[cfg.tenantIndex];
      const unit = units[cfg.tenantIndex];
      if (!tenant || !unit) return null;
      return {
        id: uuidv4(),
        unitId: unit.id,
        tId: tenant.id,
        startDate: cfg.startDate,
        endDate: cfg.endDate,
        monthlyRent: cfg.monthlyRent,
        status: cfg.status,
        depositAmount: cfg.depositAmount,
      };
    }).filter(Boolean);

    const insertedLeases = await trx("lease").insert(leasesToInsert).returning("*");

    // Optionally update unit status for active leases
    for (const lease of insertedLeases) {
      if (lease.status === "active") {
        await trx("unit").where({ id: lease.unitId }).update({ status: "occupied" });
      }
    }

    return { tenants: insertedTenants, leases: insertedLeases };
  });
};
