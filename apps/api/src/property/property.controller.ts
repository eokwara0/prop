import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, OmitType } from '@nestjs/swagger';
import { IProperty } from '@repo/api/index';
import { AuthGuard } from 'lib/guards/auth.guard';
import { PropertyService } from 'lib/services/property/property.service';
import {
  CreatePropertyDto,
  PropertyResult,
  PropertyStatsResult,
  RResponse,
  UpdatePropertyResult,
  UpdatePrpopertyDto,
} from 'lib/types/property.types';

@UseGuards(AuthGuard)
@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @ApiOkResponse({ type: [CreatePropertyDto] })
  @Post()
  async create(@Body() dto: CreatePropertyDto): Promise<RResponse> {
    const res = await this.propertyService.create(dto);
    return {
      statusCode: 201,
      result: {
        id: res.id,
        message: 'Property created successfully',
      },
    };
  }

  @ApiOkResponse({ type:  UpdatePropertyResult })
  @ApiBody({ type: UpdatePrpopertyDto })
  @HttpCode(201)
  @Patch('update')
  async updateProperty(
    @Body() data: UpdatePrpopertyDto,
  ): Promise<UpdatePropertyResult> {
    return (await this.propertyService.update(data)) as UpdatePropertyResult;
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<PropertyResult> {
    return (await this.propertyService.getById(id)) as PropertyResult;
  }

  @ApiOkResponse({ type: [PropertyResult] })
  @Get('owner/:ownerId')
  async getByOwner(
    @Param('ownerId') ownerId: string,
  ): Promise<PropertyResult[]> {
    const res = await this.propertyService.getByOwnerId(ownerId);
    return res as PropertyResult[];
  }

  @ApiOkResponse({ type: PropertyStatsResult })
  @Get('owner/stats/:ownerId')
  async getOwnerStats(
    @Param('ownerId') ownerId: string,
  ): Promise<PropertyStatsResult> {
    return (await this.propertyService.getOwnerPropertyStats(
      ownerId,
    )) as PropertyStatsResult;
  }
}
