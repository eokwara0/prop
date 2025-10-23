import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { IProperty } from '@repo/api/index';
import { AuthGuard } from 'lib/guards/auth.guard';
import { PropertyService } from 'lib/services/property/property.service';
import {
  CreatePropertyDto,
  PropertyResult,
  RResponse,
} from 'lib/types/property.types';

@UseGuards(AuthGuard)
@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @ApiOkResponse({ type: CreatePropertyDto })
  @Post()
  async create(@Body() dto: CreatePropertyDto): Promise<RResponse> {
    console.log('DTO', dto);
    const res = await this.propertyService.create(dto);
    return {
      statusCode: 201,
      result: {
        id: res.id,
        message: 'Property created successfully',
      },
    };
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<PropertyResult> {
    return (await this.propertyService.getById(id)) as PropertyResult;
  }

  @Get('owner/:ownerId')
  async getByOwner(@Param('ownerId') ownerId: string): Promise<IProperty[]> {
    const res = await this.propertyService.getByOwnerId(ownerId);
    return res;
  }
}
