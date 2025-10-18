import { Model, RelationMappings } from "objection";
import UserTypeModel from "./user.type.model";
import RoleModel from "./role.model";

class UserTypeActivityModel extends Model {
  static override get tableName(): string {
    return "user_type_activity";
  }

  static override get idColumn(): string {
    return "id";
  }

  static override get jsonSchema() {
    return {
      type: "object",
      required: ["userTypeId"],
      properties: {
        id: { type: "integer" },
        userTypeId: { type: "integer" },
        createdAt: { type: "string", format: "date-time" },
      },
    };
  }

  static override get relationMappings(): RelationMappings {
    return {
      userType: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserTypeModel,
        join: {
          from: "user_type_activity.userTypeId",
          to: "user_type.id",
        },
      },
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: RoleModel,
        join: {
          from: "user_type_activity.id",
          through: {
            from: "user_type_activity_role.user_type_activity_id",
            to: "user_type_activity_role.role_id",
          },
          to: "role.id",
        },
      },
    };
  }
}

export default UserTypeActivityModel;
