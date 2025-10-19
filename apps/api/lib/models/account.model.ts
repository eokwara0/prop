import { Model } from 'objection';
import { UserModel } from './user.model';
import { IAccount } from '@repo/api/index';

class AccountModel extends Model implements IAccount {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;

  static get tableName() {
    return 'account';
  }

  static get idColumn() {
    return ['provider', 'providerAccountId'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'type', 'provider', 'providerAccountId'],
      properties: {
        userId: { type: 'string' },
        type: { type: 'string' },
        provider: { type: 'string' },
        providerAccountId: { type: 'string' },
        refresh_token: { type: ['string', 'null'] },
        access_token: { type: ['string', 'null'] },
        expires_at: { type: ['integer', 'null'] },
        token_type: { type: ['string', 'null'] },
        scope: { type: ['string', 'null'] },
        id_token: { type: ['string', 'null'] },
        session_state: { type: ['string', 'null'] },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'account.userId',
          to: 'users.id',
        },
      },
    };
  }
}

export default AccountModel;
