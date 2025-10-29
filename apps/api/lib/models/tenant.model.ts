import { Model } from 'objection';
import { Lease } from './lease.model';

class Tenant extends Model {
  static override get tableName() {
    return 'tenant';
  }

  static override get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'firstName', 'lastName', 'email', 'unitId'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        userId: { type: 'string', format: 'uuid' },

        // Personal info
        firstName: { type: 'string', minLength: 1 },
        lastName: { type: 'string', minLength: 1 },
        email: { type: 'string', format: 'email' },
        phoneNumber: { type: ['string', 'null'] },
        dateOfBirth: { type: ['string', 'null'], format: 'date' },
        idNumber: { type: ['string', 'null'] }, // national ID / passport

        // Address info
        currentAddress: { type: ['string', 'null'] },
        city: { type: ['string', 'null'] },
        postalCode: { type: ['string', 'null'] },
        country: { type: 'string', default: 'South Africa' },

        // Lease / unit info
        unitId: { type: 'string', format: 'uuid' },
        monthlyRent: { type: ['number', 'null'], minimum: 0 },
        isActive: { type: 'boolean', default: true },

        // Emergency contact
        emergencyContactName: { type: ['string', 'null'] },
        emergencyContactPhone: { type: ['string', 'null'] },

        // Metadata
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: ['string', 'null'], format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    return {
      leases: {
        relation: Model.HasManyRelation,
        modelClass: Lease,
        join: {
          from: 'tenant.id',
          to: 'lease.tenantId',
        },
      },
    };
  }
}

export { Tenant };
