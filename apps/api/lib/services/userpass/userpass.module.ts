import { Module } from '@nestjs/common';
import { UserPassService } from './userpass.service';
import { KnexService } from '../knex/knex.service';

@Module({
    providers : [UserPassService,KnexService],
    exports : [UserPassService]
})
export class UserpassModule {}
