import { ListBucketsCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

export class S3ClientService {
  private s3: S3Client;
  private bucket: string;

  constructor(private config: ConfigService) {
    this.bucket = 'domio';
    console.log(
      process.env.MINIO_REGION,
      process.env.MINIO_ENDPOINT,
      process.env.MINIO_SECRET_KEY,
    );
    this.s3 = new S3Client({
      region: process.env.MINIO_REGION,
      endpoint: process.env.MINIO_ENDPOINT,
      credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY,
        secretAccessKey: process.env.MINIO_SECRET_KEY,
      },
      forcePathStyle: true, //
    });
  }

  get bucket_() {
    return this.bucket;
  }
  get client() {
    return this.s3;
  }
  private async testConnection() {
    try {
      const result = await this.s3.send(new ListBucketsCommand({}));
      console.log('connected! Buckets: ', result.Buckets);
    } catch (err) {
      console.error('Connection failed', err);
    }
  }
}
