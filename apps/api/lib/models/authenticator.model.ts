import { Model } from "objection";
import { UserModel } from "./user.model";

class AuthenticatorModel extends Model {
  static get tableName() {
    return "authenticator";
  }

  static get idColumn() {
    return ["userId", "credentialID"];
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "credentialID",
        "userId",
        "providerAccountId",
        "credentialPublicKey",
        "counter",
        "credentialDeviceType",
        "credentialBackedUp",
      ],
      properties: {
        credentialID: { type: "string" },
        userId: { type: "string" },
        providerAccountId: { type: "string" },
        credentialPublicKey: { type: "string" },
        counter: { type: "integer" },
        credentialDeviceType: { type: "string" },
        credentialBackedUp: { type: "boolean" },
        transports: { type: ["string", "null"] },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "authenticator.userId",
          to: "users.id",
        },
      },
    };
  }
}

export default AuthenticatorModel;
