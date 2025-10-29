import { Model } from 'objection';
import { Property } from './property.model';
import { Lease } from './lease.model';

class Unit extends Model {
  static get tableName() {
    return 'unit';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['propertyId', 'unitNumber', 'rentAmount'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        propertyId: { type: 'string', format: 'uuid' },

        // Unit info
        unitNumber: { type: 'string', minLength: 1 },
        floor: { type: 'integer', default: 1 },
        bedrooms: { type: 'integer', minimum: 0 },
        bathrooms: { type: 'integer', minimum: 0 },
        squareMeters: { type: ['number', 'null'] },
        isFurnished: { type: 'boolean', default: false },
        petFriendly: { type: 'boolean', default: false },
        hasBalcony: { type: 'boolean', default: false },

        // Rent / status
        rentAmount: { type: 'number', minimum: 0 },
        currency: { type: 'string', default: 'ZAR' },
        status: {
          type: 'string',
          enum: ['vacant', 'occupied', 'maintenance'],
          default: 'vacant',
        },
        tenants: {
          type: 'array',
          items: { type: 'string', format: 'uuid' },
          default: [],
        },
        // Lease availability
        availableFrom: { type: ['string', 'null'], format: 'date' },

        // Metadata
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: ['string', 'null'], format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    return {
      property: {
        relation: Model.BelongsToOneRelation,
        modelClass: Property,
        join: {
          from: 'unit.propertyId',
          to: 'property.id',
        },
      },
      leases: {
        relation: Model.HasManyRelation,
        modelClass: Lease,
        join: {
          from: 'unit.id',
          to: 'lease.unitId',
        },
      },
    };
  }
}

export { Unit };
