import { Model, RelationMappings } from "objection";
import UserTypeModel from "./user.type.model";
import { IUserTypeActivity } from "@repo/api/index";

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
      required: ["userTypeId", "roleIds"],
      properties: {
        id: { type: "integer" },
        userTypeId: { type: "integer" },
        roleIds: { type: "string" }, // JSON string
        createdAt: { type: "string", format: "date-time" },
      },
    };
  }

  // Parse roleIds as JSON automatically

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
    };
  }
}

export default UserTypeActivityModel;
