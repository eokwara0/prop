import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { KnexService } from '../knex/knex.service';

@Module({
  providers: [PropertyService, KnexService],
  exports: [PropertyService],
})
export class PropertyModule {}
