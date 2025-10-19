import { Model } from 'objection';
import { UserModel } from './user.model';
// assuming you have a User model

export default class UserPassModel extends Model {
  static get tableName() {
    return 'user_pass';
  }

  static get idColumn() {
    return 'userId'; // since your migration sets userId as primary key
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'passwordHash', 'passwordSalt'],
      properties: {
        userId: { type: 'string' },
        userTypeId: { type: ['integer', 'null'] },
        passwordHash: { type: 'string' },
        passwordSalt: { type: ['string', 'null'] },
        isActive: { type: 'boolean' },
        createdAt: { type: 'string', format: 'date-time' },
        lastUsedAt: { type: ['string', 'null'], format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'user_pass.userId',
          to: 'users.id',
        },
      },
    };
  }
}
