exports.up = async function (knex) {
  await knex.schema.raw(`
    CREATE VIEW user_property_stats AS
    WITH rentedProps AS (
      SELECT DISTINCT un."propertyId"
      FROM "unit" un
      INNER JOIN "lease" l ON un.id = l."unitId"
      WHERE l.status = 'active'
    )
    SELECT 
      u.id AS "userId",
      u.name AS "userName",

      COUNT(DISTINCT p.id) AS "totalProperties",

      SUM(COALESCE(p.price, 0)) AS "portfolioValue",

      COUNT(DISTINCT CASE 
        WHEN p."isForRent" = TRUE THEN p.id 
      END) AS "propertiesAvailable",

      COUNT(DISTINCT rp."propertyId") AS "propertiesRented"

    FROM users u
    LEFT JOIN property p ON p."ownerId" = u.id
    LEFT JOIN rentedProps rp ON rp."propertyId" = p.id
    GROUP BY u.id, u.name;
  `);
};

exports.down = async function (knex) {
  await knex.schema.raw(`DROP VIEW user_property_stats`);
};
