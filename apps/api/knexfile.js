// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mssql',
    connection: {
      server: 'localhost',
      user: 'sa',
      password: 'StrongP@ssword123!',
      database: 'master', // or your DB name
      port: 1433,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    },
    migrations: {
      tableName: 'p_m',
      directory: './lib/db/migrations',
      getNewMigrationName: (m) => {
        return `prop_migration_${new Date().toISOString().replace(/[-:.]/g, '')}_${m}.ts`;
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
      database: 't_db',
      user: 'postgres',
      password: '04041975',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'p_m',
      directory: './lib/db/migrations',
      getNewMigrationName: (m) => {
        return `prop_migration_${new Date().toISOString().replace(/[-:.]/g, '')}_${m}.ts`;
      },
      extension: 'js',
    },
    seeds: {
      directory: './lib/db/seeds',
      extension: 'js',
    },
  },

  production: {
    client: 'mssql',
    connection: {
      database: 'domio',
      server: 'domio.database.windows.net',
      user: 'domio',
      password: 'DHousing123456789$',
      options: {
        encrypt: true,
        trustServerCertificate: false,
        enableArithAbort: true,
      },
      port: 1433,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'p_m',
      directory: './lib/db/migrations',
      getNewMigrationName: (m) => {
        return `prop_migration_${new Date().toISOString().replace(/[-:.]/g, '')}_${m}.ts`;
      },
      extension: 'js',
    },
    seeds: {
      directory: './lib/db/seeds',
      extension: 'js',
    },
  },
};
