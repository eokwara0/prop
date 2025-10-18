import { Module } from '@nestjs/common';
import { UserTypeService } from './usertype.service';
import { KnexService } from '../knex/knex.service';

@Module({
    providers : [UserTypeService,KnexService],
    exports : [UserTypeService]
})
export class UsertypeModule {}
