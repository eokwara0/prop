import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { S3ClientService } from 'lib/storage/s3.client';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [S3ClientService],
  exports: [StorageService, S3ClientService],
  providers: [StorageService, S3ClientService, ConfigService],
})
export class StorageModule {}
