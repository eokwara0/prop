import { Model } from 'objection';
import { UserModel } from './user.model';

class SessionModel extends Model {
  static get tableName() {
    return 'session';
  }

  static get idColumn() {
    return 'sessionToken';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['sessionToken', 'userId', 'expires'],
      properties: {
        sessionToken: { type: 'string' },
        userId: { type: 'string' },
        expires: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'session.userId',
          to: 'users.id',
        },
      },
    };
  }
}
export default SessionModel;
