import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { KnexService } from '../knex/knex.service';

@Module({
  providers: [RoleService, KnexService],
  exports: [RoleService],
})
export class RoleModule {}
