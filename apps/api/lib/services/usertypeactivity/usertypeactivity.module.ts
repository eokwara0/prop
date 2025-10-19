import { Module } from '@nestjs/common';
import { UserTypeActivityService } from './usertypeactivity.service';
import { KnexService } from '../knex/knex.service';

@Module({
  providers: [UserTypeActivityService, KnexService],
  exports: [UserTypeActivityService],
})
export class UsertypeactivityModule {}
