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
              pool: { min: 10, max: 20 },
            }
          : {
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
