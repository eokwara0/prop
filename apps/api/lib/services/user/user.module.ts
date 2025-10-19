import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { KnexService } from 'lib/services/knex/knex.service';
import { KnexModule } from 'lib/services/knex/knex.module';

@Module({
  providers: [UserService, KnexService],
  exports: [UserService],
})
export class UserModule {}
