import { Model } from 'objection';
import { Unit } from './unit.model';
import { Tenant } from './tenant.model';

class Lease extends Model {
  static get tableName() {
    return 'lease';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['unitId', 'tenantId', 'startDate', 'monthlyRent'],
      properties: {
        id: { type: 'string', format: 'uuid' },

        // Relationships
        unitId: { type: 'string', format: 'uuid' },
        tenantId: { type: 'string', format: 'uuid' },

        // Lease details
        startDate: { type: 'string', format: 'date' },
        endDate: { type: ['string', 'null'], format: 'date' },
        monthlyRent: { type: 'number', minimum: 0 },
        currency: { type: 'string', default: 'ZAR' },
        depositAmount: { type: ['number', 'null'], minimum: 0 },
        paymentFrequency: {
          type: 'string',
          enum: ['monthly', 'weekly', 'yearly'],
          default: 'monthly',
        },

        // Status
        status: {
          type: 'string',
          enum: ['active', 'terminated', 'pending'],
          default: 'active',
        },

        // Notes
        notes: { type: ['string', 'null'] },

        // Metadata
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: ['string', 'null'], format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    return {
      unit: {
        relation: Model.BelongsToOneRelation,
        modelClass: Unit,
        join: {
          from: 'lease.unitId',
          to: 'unit.id',
        },
      },
      tenant: {
        relation: Model.BelongsToOneRelation,
        modelClass: Tenant,
        join: {
          from: 'lease.tenantId',
          to: 'tenant.id',
        },
      },
    };
  }
}

export { Lease };
