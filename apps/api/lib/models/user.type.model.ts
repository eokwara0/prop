import { Model } from "objection";

class UserTypeModel extends Model {

  static override get tableName(): string {
    return "user_type";
  }

  static override get idColumn(): string {
    return "id";
  }

  static override get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        createdAt: { type: "string", format: "date-time" },
      },
    };
  }

  // Add relations here later if needed (e.g. User, UserTypeActivity, etc.)
}

export default UserTypeModel;
