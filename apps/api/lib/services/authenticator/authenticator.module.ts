import { Module } from '@nestjs/common';
import { AuthenticatorService } from './authenticator.service';
import { KnexService } from '../knex/knex.service';

@Module({
  exports: [AuthenticatorService],
  providers: [AuthenticatorService, KnexService],
})
export class AuthenticatorModule {}
