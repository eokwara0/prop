import { Model } from 'objection';
import { Unit } from './unit.model';

class Property extends Model {
  static override get tableName() {
    return 'property';
  }

  static override get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'ownerId'], // 👈 address can be optional (matches your migration)

      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string', minLength: 1 },
        description: { type: 'string' },
        address: { type: ['string', 'null'] },
        city: { type: ['string', 'null'] },
        state: { type: ['string', 'null'] },
        postalCode: { type: ['string', 'null'] },
        country: { type: 'string' },
        type: {
          type: 'string',
          enum: [
            'house',
            'apartment',
            'townhouse',
            'condo',
            'duplex',
            'commercial',
            'land',
          ],
        },
        bedrooms: { type: 'integer', minimum: 0 },
        bathrooms: { type: 'integer', minimum: 0 },
        squareFeet: { type: ['number', 'null'] },
        hasParking: { type: 'boolean' },
        isFurnished: { type: 'boolean' },
        ownerId: { type: 'string', format: 'uuid' },
        price: { type: ['number', 'null'] },
        isForRent: { type: 'boolean' },
        isForSale: { type: 'boolean' },
        mainImage: { type: ['string', 'null'] },
        images: { type: 'array', items: { type: 'string' } },
        isActive: { type: 'boolean' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: ['string', 'null'], format: 'date-time' },
      },
    };
  }

  // Relations
  static get relationMappings() {
    return {
      units: {
        relation: Model.HasManyRelation,
        modelClass: Unit,
        join: {
          from: 'property.id',
          to: 'unit.propertyId',
        },
      },
    };
  }
}

export { Property };
