import { Injectable } from '@nestjs/common';
import knex, { Knex } from 'knex';

@Injectable()
export class KnexService {
  private knex: Knex;

  constructor() {
    this.knex = knex({
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
    });
  }

  get instance():Knex{
    return this.knex;
  }
}
