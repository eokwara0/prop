import { Module } from '@nestjs/common';
import { VerificationTokenService } from './verificationtoken.service';
import { KnexService } from '../knex/knex.service';

@Module({
    providers : [VerificationTokenService,KnexService],
    exports : [VerificationTokenService]
})
export class VerificationtokenModule {}
