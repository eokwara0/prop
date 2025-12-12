import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { KnexService } from '../knex/knex.service';
import { Property } from 'lib/models/property.model';
import {
  IProperty,
  IPropertyCreateDTO,
  IPropertyStats,
  IPropertyUpdateDto,
  IPropertyWithUnits,
} from '@repo/api/index';
import { PropertyStats } from 'lib/models/views/property.stats.model';

@Injectable()
export class PropertyService {
  private propertyModel = Property;
  private propertyStatModel = PropertyStats;

  constructor(private readonly knexService: KnexService) {
    this.propertyModel = Property.bindKnex(this.knexService.instance);
    this.propertyStatModel = PropertyStats.bindKnex(this.knexService.instance);
  }

  async getOwnerPropertyStats(ownerId: string): Promise<IPropertyStats> {
    const result = await this.propertyStatModel
      .query()
      .where('userId', ownerId)
      .first();
    if (!result) {
      throw new HttpException(
        "unable to get user's stats",
        HttpStatus.BAD_REQUEST,
      );
    }
    return result.toJSON() as IPropertyStats;
  }

  /** ✅ Get all properties */
  async getAll(): Promise<IProperty[]> {
    const result = await this.propertyModel.query();
    return result.map((p) => p.toJSON()) as IProperty[];
  }

  /** ✅ Get property by ID */
  async getById(id: string): Promise<IProperty> {
    const property = await this.propertyModel.query().findById(id);

    if (!property) throw new NotFoundException('Property not found');
    return property.toJSON() as IProperty;
  }

  /** ✅ Create property (with transaction) */
  async create(data: IPropertyCreateDTO): Promise<IProperty> {
    return await this.knexService.instance.transaction(async (trx) => {
      const property = await this.propertyModel.query(trx).insert(data);

      if (!property) {
        throw new HttpException(
          'Failed to create property',
          HttpStatus.EXPECTATION_FAILED,
        );
      }

      return property.toJSON() as IProperty;
    });
  }

  /** ✅ Update property */
  async update(data: IPropertyUpdateDto): Promise<IProperty> {
    const result = await this.knexService.instance.transaction(async (trx) => {
      const updated = await this.propertyModel
        .query(trx)
        .patch({
          ...data,
          squareFeet: Number(data.squareFeet),
          updatedAt: new Date(Date.now()).toISOString(),
        })
        .where('id', data.id)
        .returning('*');

      if (!updated?.length) throw new NotFoundException('Property not found');

      return updated[0].toJSON() as IProperty;
    });
    return result;
  }

  /** ✅ Delete property */
  async remove(id: string): Promise<IProperty> {
    return await this.knexService.instance.transaction(async (trx) => {
      const deleted = await this.propertyModel
        .query(trx)
        .delete()
        .where('id', id)
        .returning('*');

      if (!deleted?.length) throw new NotFoundException('Property not found');
      return deleted[0].toJSON() as IProperty;
    });
  }

  /** ✅ Get property with units */
  async getWithUnits(id: string): Promise<IPropertyWithUnits> {
    const property = await this.propertyModel
      .query()
      .findById(id)
      .withGraphFetched('units');

    if (!property) throw new NotFoundException('Property not found');
    return property.toJSON() as IPropertyWithUnits;
  }
  /** ✅ Get owner properties with related units */
  async getOwnerPropertiesWithUnits(
    ownerId: string,
  ): Promise<IPropertyWithUnits[]> {
    const properties = await this.propertyModel
      .query()
      .where('ownerId', ownerId)
      .withGraphFetched('units');

    return properties.map((p) => p.toJSON()) as IPropertyWithUnits[];
  }

  /** ✅ Get all properties by ownerId */
  async getByOwnerId(ownerId: string): Promise<IProperty[]> {
    const properties = await this.propertyModel
      .query()
      .where('ownerId', ownerId);

    // If empty, return an empty list (not an error)
    return properties.map((p) => p.toJSON()) as IProperty[];
  }
}
