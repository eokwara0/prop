import { Model } from 'objection';
import { UserModel } from '../user.model';
import { Property as PP } from '../property.model';

class PropertyStats extends Model {
  static get tableName() {
    return 'user_property_stats'; // view name
  }

  static get idColumn() {
    return 'userId'; // primary key of the view
  }

  // Optional: define JSON schema for validation
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'userName'],

      properties: {
        userId: { type: 'string', format: 'uuid' },
        userName: { type: 'string', maxLength: 255 },
        totalProperties: { type: 'integer' },
        propertiesAvailable: { type: 'integer' },
        propertiesRented: { type: 'integer' },
        portfolioValue: { type: 'number' },
      },
    };
  }

  // Optional: relationMappings if you want to join with other tables
  static get relationMappings() {
    const User = UserModel; // assuming you have a User model
    const Property = PP; // your Property model

    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_property_stats.userId',
          to: 'users.id',
        },
      },
      properties: {
        relation: Model.HasManyRelation,
        modelClass: Property,
        join: {
          from: 'user_property_stats.userId',
          to: 'property.ownerId',
        },
      },
    };
  }
}

export { PropertyStats };
