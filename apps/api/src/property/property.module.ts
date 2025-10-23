import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { SServiceModule } from 'lib/services';

@Module({
  imports:[SServiceModule],
  controllers: [PropertyController]
})
export class PropertyModule {}
