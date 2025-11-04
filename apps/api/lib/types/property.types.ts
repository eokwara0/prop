import { ApiProperty } from '@nestjs/swagger';
import {
  IProperty,
  IPropertyCreateDTO,
  IPropertyStats,
  IPropertyUpdateDto,
  RProperty,
} from '@repo/api/index';

export class ResponseResult<T = any> {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  message: string;
  @ApiProperty({ type: [Object], required: false })
  data?: [any];
}

export class PropertyStatsResult implements IPropertyStats {
  @ApiProperty({ type: String })
  userId: string;
  @ApiProperty({ type: String })
  userName: string;
  @ApiProperty({ type: Number })
  totalProperties: number;
  @ApiProperty({ type: Number })
  propertiesAvailable: number;
  @ApiProperty({ type: Number })
  propertiesRented: number;
  @ApiProperty({ type: Number })
  portfolioValue: number;
}

export class UpdatePropertyResult
  implements Omit<PropertyResult, 'id' | 'ownerId'>
{
  @ApiProperty({ type: String })
  type:
    | 'house'
    | 'apartment'
    | 'townhouse'
    | 'condo'
    | 'duplex'
    | 'commercial'
    | 'land';
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  streetName: string;
  @ApiProperty({ type: Number })
  streetNumber: number;
  @ApiProperty({ type: String })
  suburb: string;
  @ApiProperty({ type: String })
  country: string;
  @ApiProperty({ type: Number })
  bedrooms: number;
  @ApiProperty({ type: Number })
  bathrooms: number;
  @ApiProperty({ type: Boolean })
  hasParking: boolean;
  @ApiProperty({ type: Boolean })
  isFurnished: boolean;
  @ApiProperty({ type: Boolean })
  isForRent: boolean;
  @ApiProperty({ type: Boolean })
  isForSale: boolean;
  @ApiProperty({ type: [String] })
  images: string[];
  @ApiProperty({ type: Boolean })
  isActive: boolean;
  @ApiProperty({ type: String, required: false })
  description?: string;
  @ApiProperty({ type: String, required: false })
  address?: string;
  @ApiProperty({ type: String, required: false })
  city?: string;
  @ApiProperty({ type: String, required: false })
  state?: string;
  @ApiProperty({ type: String, required: false })
  postalCode?: string;
  @ApiProperty({ type: Number, required: false })
  squareFeet?: number;
  @ApiProperty({ type: Number, required: false })
  price?: number;
  @ApiProperty({ type: String, required: false })
  mainImage?: string;
}

export class PropertyResult implements IProperty {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  type:
    | 'house'
    | 'apartment'
    | 'townhouse'
    | 'condo'
    | 'duplex'
    | 'commercial'
    | 'land';
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  streetName: string;
  @ApiProperty({ type: Number })
  streetNumber: number;
  @ApiProperty({ type: String })
  suburb: string;
  @ApiProperty({ type: String })
  country: string;
  @ApiProperty({ type: Number })
  bedrooms: number;
  @ApiProperty({ type: Number })
  bathrooms: number;
  @ApiProperty({ type: Boolean })
  hasParking: boolean;
  @ApiProperty({ type: Boolean })
  isFurnished: boolean;
  @ApiProperty({ type: String })
  ownerId: string;
  @ApiProperty({ type: Boolean })
  isForRent: boolean;
  @ApiProperty({ type: Boolean })
  isForSale: boolean;
  @ApiProperty({ type: [String] })
  images: string[];
  @ApiProperty({ type: Boolean })
  isActive: boolean;
  @ApiProperty({ type: String, required: false })
  description?: string;
  @ApiProperty({ type: String, required: false })
  address?: string;
  @ApiProperty({ type: String, required: false })
  city?: string;
  @ApiProperty({ type: String, required: false })
  state?: string;
  @ApiProperty({ type: String, required: false })
  postalCode?: string;
  @ApiProperty({ type: Number, required: false })
  squareFeet?: number;
  @ApiProperty({ type: Number, required: false })
  price?: number;
  @ApiProperty({ type: String, required: false })
  mainImage?: string;
}

export class RResponse implements RProperty {
  @ApiProperty({ type: Number })
  statusCode: number;
  @ApiProperty({ type: ResponseResult })
  result: {
    id: string;
    message: string;
    data?: [any];
  };
}

export class UpdatePrpopertyDto implements IPropertyUpdateDto {
  @ApiProperty({
    type: String,
    enum: [
      'house',
      'apartment',
      'townhouse',
      'condo',
      'duplex',
      'commercial',
      'land',
    ],
  })
  type:
    | 'house'
    | 'apartment'
    | 'townhouse'
    | 'condo'
    | 'duplex'
    | 'commercial'
    | 'land';

  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  streetName: string;
  @ApiProperty({ type: Number })
  streetNumber: number;
  @ApiProperty({ type: String })
  suburb: string;
  @ApiProperty({ type: String })
  country: string;
  @ApiProperty({ type: Number })
  bedrooms: number;
  @ApiProperty({ type: Number })
  bathrooms: number;
  @ApiProperty({ type: Boolean })
  hasParking: boolean;
  @ApiProperty({ type: Boolean })
  isFurnished: boolean;
  @ApiProperty({ type: String })
  ownerId: string;
  @ApiProperty({ type: Boolean })
  isForRent: boolean;
  @ApiProperty({ type: Boolean })
  isForSale: boolean;
  @ApiProperty({ type: [String] })
  images: string[];
  @ApiProperty({ type: Boolean })
  isActive: boolean;
  @ApiProperty({ type: String, required: false })
  description?: string;
  @ApiProperty({ type: String, required: false })
  address?: string;
  @ApiProperty({ type: String, required: false })
  city?: string;
  @ApiProperty({ type: String, required: false })
  state?: string;
  @ApiProperty({ type: String, required: false })
  postalCode?: string;
  @ApiProperty({ type: Number, required: false })
  squareFeet?: number;
  @ApiProperty({ type: Number, required: false })
  price?: number;
  @ApiProperty({ type: String, required: false })
  mainImage?: string;
  @ApiProperty({ type: 'string', required: true })
  id?: string;
}

export class CreatePropertyDto implements Partial<IPropertyCreateDTO> {
  @ApiProperty({
    type: String,
    enum: [
      'house',
      'apartment',
      'townhouse',
      'condo',
      'duplex',
      'commercial',
      'land',
    ],
  })
  type:
    | 'house'
    | 'apartment'
    | 'townhouse'
    | 'condo'
    | 'duplex'
    | 'commercial'
    | 'land';

  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  streetName: string;
  @ApiProperty({ type: Number })
  streetNumber: number;
  @ApiProperty({ type: String })
  suburb: string;
  @ApiProperty({ type: String })
  country: string;
  @ApiProperty({ type: Number })
  bedrooms: number;
  @ApiProperty({ type: Number })
  bathrooms: number;
  @ApiProperty({ type: Boolean })
  hasParking: boolean;
  @ApiProperty({ type: Boolean })
  isFurnished: boolean;
  @ApiProperty({ type: String })
  ownerId: string;
  @ApiProperty({ type: Boolean })
  isForRent: boolean;
  @ApiProperty({ type: Boolean })
  isForSale: boolean;
  @ApiProperty({ type: [String] })
  images: string[];
  @ApiProperty({ type: Boolean })
  isActive: boolean;
  @ApiProperty({ type: String, required: false })
  description?: string;
  @ApiProperty({ type: String, required: false })
  address?: string;
  @ApiProperty({ type: String, required: false })
  city?: string;
  @ApiProperty({ type: String, required: false })
  state?: string;
  @ApiProperty({ type: String, required: false })
  postalCode?: string;
  @ApiProperty({ type: Number, required: false })
  squareFeet?: number;
  @ApiProperty({ type: Number, required: false })
  price?: number;
  @ApiProperty({ type: String, required: false })
  mainImage?: string;
}
