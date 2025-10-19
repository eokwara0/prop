import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { KnexService } from '../knex/knex.service';

@Module({
  exports: [SessionService],
  providers: [SessionService, KnexService],
})
export class SessionModule {}
