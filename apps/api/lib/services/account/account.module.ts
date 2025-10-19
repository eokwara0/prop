import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { KnexService } from '../knex/knex.service';

@Module({
  providers: [AccountService, KnexService],
  exports: [AccountService],
})
export class AccountModule {}
