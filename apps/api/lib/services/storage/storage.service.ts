import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { S3ClientService } from 'lib/storage/s3.client';
import { S3KeyParams } from 'lib/types/storage.types';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID, UUID } from 'node:crypto';

@Injectable()
export class StorageService {
  private EXPIRY: number;
  constructor(private s3Client: S3ClientService) {
    this.EXPIRY = 60 * 10;
  }

  async uploadFileBuffer(
    params: S3KeyParams,
    fileBuffer: Buffer,
    contentType: string,
  ): Promise<{ key: string; downloadUrl: string }> {
    const key = this.buildS3Key(params);

    await this.s3Client.client.send(
      new PutObjectCommand({
        Bucket: this.s3Client.bucket_,
        Key: key,
        Body: fileBuffer,
        ContentType: contentType,
      }),
    );

    const downloadUrl = await this.generateDownloadUrl(key);
    return { key, downloadUrl };
  }

  async generateUploadUrl(params: S3KeyParams, contentType: string) {
    const key = this.buildS3Key(params);

    const url = await getSignedUrl(
      this.s3Client.client,
      new PutObjectCommand({
        Bucket: this.s3Client.bucket_,
        Key: key,
        ContentType: contentType,
      }),
      { expiresIn: this.EXPIRY },
    );

    return { uploadUrl: url, key };
  }

  async generateDownloadUrl(key: string): Promise<string> {
    return getSignedUrl(
      this.s3Client.client,
      new GetObjectCommand({ Bucket: this.s3Client.bucket_, Key: key }),
      { expiresIn: this.EXPIRY },
    );
  }

  async deleteFile(key: string): Promise<{ deleted: boolean }> {
    await this.s3Client.client.send(
      new DeleteObjectCommand({ Bucket: this.s3Client.bucket_, Key: key }),
    );
    return { deleted: true };
  }

  async listFiles(prefix: string): Promise<string[]> {
    const res = await this.s3Client.client.send(
      new ListObjectsV2Command({
        Bucket: this.s3Client.bucket_,
        Prefix: prefix,
      }),
    );

    return res.Contents?.map((x) => x.Key!) ?? [];
  }
  private buildS3Key(params: S3KeyParams): string {
    const file = params.fileName ?? randomUUID();

    if ('propertyId' in params) {
      return `tenants/${params.tenantId}/properties/${params.propertyId}/${params.sub}/${file}`;
    }
    if ('userId' in params) {
      return `tenants/${params.tenantId}/users/${params.userId}/${params.sub}/${file}`;
    }
    if ('tenancyId' in params) {
      return `tenants/${params.tenantId}/tenancies/${params.tenancyId}/${params.sub}/${file}`;
    }
    if ('paymentId' in params) {
      return `tenants/${params.tenantId}/payments/${params.paymentId}/${params.sub}/${file}`;
    }

    throw new HttpException('❌ Invalid S3 key params', HttpStatus.BAD_REQUEST);
  }
}
