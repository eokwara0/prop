import { Injectable } from '@nestjs/common';
import knex, { Knex } from 'knex';

@Injectable()
export class KnexService {
  private knex: Knex;

  constructor() {
    try {
      this.knex = knex(
        process.env.NODE_ENV === 'production'
          ? {
              client: 'pg',
              connection: {
                host: process.env.DB_HOST || 'your-prod-postgres-host',
                port: Number(process.env.DB_PORT) || 5432,
                database: process.env.DB_NAME || 'domio',
                user: process.env.DB_USER || 'domio',
                password: process.env.DB_PASSWORD || 'DHousing123456789$',
                ssl:
                  process.env.DB_SSL === 'true'
                    ? { rejectUnauthorized: false }
                    : undefined,
              },
              pool: { min: 10, max: 20 },
            }
          : {
              client: 'pg',
              connection: {
                host: process.env.DB_HOST || 'localhost',
                port: Number(process.env.DB_PORT) || 5432,
                database: process.env.DB_NAME || 'dev_db',
                user: process.env.DB_USER || 'postgres',
                password: process.env.DB_PASSWORD || 'StrongP@ssword123!',
              },
              pool: { min: 2, max: 10 },
            },
      );
    } catch (error) {
      console.log('Knex initialization error:', error);
    }
  }

  get instance(): Knex {
    return this.knex;
  }

  get transact(): Promise<Knex.Transaction> {
    return this.knex.transaction();
  }
}
