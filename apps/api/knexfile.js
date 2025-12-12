/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'StrongP@ssword123!',
      database: 'dev_db', // change to your dev DB name
      port: 5432,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'p_m',
      directory: './lib/db/migrations',
      getNewMigrationName: (name) => {
        return `prop_migration_${new Date().toISOString().replace(/[-:.]/g, '')}_${name}.ts`;
      },
      extension: 'js',
    },
    seeds: {
      directory: './lib/db/seeds',
      extension: 'js',
    },
  },

  staging: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 't_db',
      user: 'postgres',
      password: '04041975',
      port: 5432,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'p_m',
      directory: './lib/db/migrations',
      getNewMigrationName: (name) => {
        return `prop_migration_${new Date().toISOString().replace(/[-:.]/g, '')}_${name}.ts`;
      },
      extension: 'js',
    },
    seeds: {
      directory: './lib/db/seeds',
      extension: 'js',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: 'your-prod-postgres-host', // e.g., AWS RDS or Azure Database
      database: 'domio',
      user: 'domio',
      password: 'DHousing123456789$',
      port: 5432,
      ssl: {
        rejectUnauthorized: false, // set true if using valid certs
      },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'p_m',
      directory: './lib/db/migrations',
      getNewMigrationName: (name) => {
        return `prop_migration_${new Date().toISOString().replace(/[-:.]/g, '')}_${name}.ts`;
      },
      extension: 'js',
    },
    seeds: {
      directory: './lib/db/seeds',
      extension: 'js',
    },
  },
};
