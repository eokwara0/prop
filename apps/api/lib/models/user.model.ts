import { Model } from 'objection';
import { BaseModel } from './base.model';
import type { IUser } from '@repo/api/index';
import AccountModel from './account.model';
import AuthenticatorModel from './authenticator.model';
import SessionModel from './session.model';

export class UserModel extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        id: { type: 'string' },
        name: { type: ['string', 'null'] },
        email: { type: ['string', 'null'] },
        emailVerified: { type: ['string', 'null'], format: 'date-time' },
        image: { type: ['string', 'null'] },
      },
    };
  }

  static get relationMappings() {
    // Require here to avoid circular dependencies

    return {
      accounts: {
        relation: Model.HasManyRelation,
        modelClass: AccountModel,
        join: {
          from: 'users.id',
          to: 'account.userId',
        },
      },

      sessions: {
        relation: Model.HasManyRelation,
        modelClass: SessionModel,
        join: {
          from: 'users.id',
          to: 'session.userId',
        },
      },

      authenticators: {
        relation: Model.HasManyRelation,
        modelClass: AuthenticatorModel,
        join: {
          from: 'users.id',
          to: 'authenticator.userId',
        },
      },
    };
  }
}
