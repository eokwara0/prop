import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import multer from 'multer';
import { StorageService } from 'lib/services/storage/storage.service';
import { UploadFileDto } from 'lib';
import { AuthGuard } from 'lib/guards/auth.guard';

@ApiTags('File Management')
@Controller('file')
@UseGuards(AuthGuard)
export class FileController {
  constructor(private readonly ss: StorageService) {}

  /**
   * Upload a file directly via multipart/form-data
   */
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  @ApiConsumes('multipart/form-data')
  @Post('upload')
  async uploadFile(
    @Body() body: UploadFileDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 10 * 1024 * 1024 }) // 10 MB limit
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const { downloadUrl, key } = await this.ss.uploadFileBuffer(
      { ...body, fileName: file.originalname } as any,
      file.buffer,
      file.mimetype,
    );

    return {
      message: '✅ File uploaded successfully',
      key,
      downloadUrl,
    };
  }

  /**
   * Generate a signed upload URL (for frontend uploads)
   */
  @Post('upload-url')
  async generateUploadUrl(@Body() body: UploadFileDto) {
    if (!body.sub || !body.tenantId) {
      throw new HttpException(
        'Missing upload parameters',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { uploadUrl, key } = await this.ss.generateUploadUrl(
      body as any,
      body.contentType ?? 'application/octet-stream',
    );

    return {
      message: '✅ Pre-signed upload URL generated',
      uploadUrl,
      key,
    };
  }

  /**
   * Generate a signed download URL
   */
  @Get('download/:key')
  async getDownloadUrl(@Param('key') key: string) {
    if (!key) {
      throw new HttpException('File key is required', HttpStatus.BAD_REQUEST);
    }

    const url = await this.ss.generateDownloadUrl(key);
    return {
      message: '✅ Pre-signed download URL generated',
      downloadUrl: url,
      expiresInSeconds: 600,
    };
  }

  /**
   * List all files under a specific folder prefix
   * Example: /file/list?prefix=tenants/123/properties/
   */
  @Get('list')
  async listFiles(@Query('prefix') prefix: string) {
    if (!prefix) {
      throw new HttpException('Prefix is required', HttpStatus.BAD_REQUEST);
    }

    const files = await this.ss.listFiles(prefix);
    return {
      message: `✅ Found ${files.length} files`,
      files,
    };
  }

  /**
   * Delete a file from S3 by key
   */
  @Delete('delete/:key')
  async deleteFile(@Param('key') key: string) {
    if (!key) {
      throw new HttpException('File key is required', HttpStatus.BAD_REQUEST);
    }

    const { deleted } = await this.ss.deleteFile(key);
    return {
      message: deleted
        ? '✅ File deleted successfully'
        : '❌ File could not be deleted',
      key,
    };
  }
}
