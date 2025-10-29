import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { StorageModule } from 'lib/services/storage/storage.module';
import { StorageService } from 'lib/services/storage/storage.service';

@Module({
  imports : [StorageModule],
  providers: [ StorageService],
  controllers: [FileController]
})
export class FileModule {}
