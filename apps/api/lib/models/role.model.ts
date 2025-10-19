import { Model, RelationMappings } from 'objection';
import UserTypeActivityModel from './user.type.activity.model';

class RoleModel extends Model {
  static override get tableName(): string {
    return 'role';
  }

  static override get idColumn(): string {
    return 'id';
  }

  static override get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'description'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', minLength: 1, maxLength: 255 },
        createdAt: { type: 'string', format: 'date-time' },
      },
    };
  }

  // Optional: relationMappings for user_type_activity or users
  static override get relationMappings(): RelationMappings {
    return {
      userTypeActivities: {
        relation: Model.HasManyRelation,
        modelClass: UserTypeActivityModel,
        join: {
          from: 'role.id',
          to: 'user_type_activity.roleIds', // note: if using integer array
        },
      },
    };
  }
}

export default RoleModel;
