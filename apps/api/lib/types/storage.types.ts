import { ApiProperty } from '@nestjs/swagger';
import { File } from 'buffer';
import { IsEnum, IsOptional, IsString, ValidateIf } from 'class-validator';

export enum S3Folder {
  PROPERTIES = 'properties',
  USERS = 'users',
  TENANCIES = 'tenancies',
  PAYMENTS = 'payments',
}

export enum S3SubFolder {
  IMAGES = 'images',
  DOCUMENTS = 'documents',
  PROFILE = 'profile',
  IDENTITY = 'identity',
  AGREEMENTS = 'agreements',
  INSPECTIONS = 'inspections',
  PROOF = 'proof',
}

export class UploadFileDtoWithFile {
  @ApiProperty({ type: 'string', description: 'Any field in your body' })
  someField: string;

  @ApiProperty({ type: 'string', format: 'binary' }) // this is the key
  file: any; // multer handles the file
}

// ✅ Upload Request DTO for NestJS (metadata only)
export class UploadFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;

  @ApiProperty({ enum: S3Folder })
  @IsEnum(S3Folder)
  folder!: S3Folder;

  @ApiProperty({ enum: S3SubFolder })
  @IsEnum(S3SubFolder)
  sub!: S3SubFolder;

  @ApiProperty()
  @IsString()
  tenantId!: string;

  // ✅ Conditional fields depending on folder type
  @ValidateIf((o) => o.folder === S3Folder.PROPERTIES)
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false })
  propertyId?: string;

  @ValidateIf((o) => o.folder === S3Folder.USERS)
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false })
  userId?: string;

  @ValidateIf((o) => o.folder === S3Folder.TENANCIES)
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false })
  tenancyId?: string;

  @ValidateIf((o) => o.folder === S3Folder.PAYMENTS)
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false })
  paymentId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fileName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contentType?: string;
}

// ✅ Type-safe parameters AFTER validation (internal use)
export type S3KeyParams =
  | {
      tenantId: string;
      folder: S3Folder.PROPERTIES;
      propertyId: string;
      sub: S3SubFolder.IMAGES | S3SubFolder.DOCUMENTS;
      fileName?: string;
    }
  | {
      tenantId: string;
      folder: S3Folder.USERS;
      userId: string;
      sub: S3SubFolder.PROFILE | S3SubFolder.IDENTITY;
      fileName?: string;
    }
  | {
      tenantId: string;
      folder: S3Folder.TENANCIES;
      tenancyId: string;
      sub: S3SubFolder.AGREEMENTS | S3SubFolder.INSPECTIONS;
      fileName?: string;
    }
  | {
      tenantId: string;
      folder: S3Folder.PAYMENTS;
      paymentId: string;
      sub: S3SubFolder.PROOF;
      fileName?: string;
    };
