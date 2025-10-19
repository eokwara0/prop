import { Injectable, NotFoundException } from '@nestjs/common';
import AccountModel from 'lib/models/account.model';
import { KnexService } from '../knex/knex.service';
import { IAccount } from '@repo/api/index';

@Injectable()
export class AccountService {
  private accountModel: typeof AccountModel;

  constructor(private knex: KnexService) {
    this.accountModel = AccountModel.bindKnex(knex.instance);
  }

  /** Find account by provider + providerAccountId */
  async findByProvider(
    provider: string,
    providerAccountId: string,
  ): Promise<IAccount | null> {
    const account = await this.accountModel
      .query()
      .where('provider', provider)
      .andWhere('providerAccountId', providerAccountId)
      .first();
    return (account.toJSON() as IAccount) || null;
  }

  /** Find all accounts for a user */
  async findByUserId(userId: string): Promise<IAccount | null> {
    return (
      await this.accountModel.query().where('userId', userId).first()
    ).toJSON() as IAccount;
  }

  /** Create a new account */
  async createAccount(data: IAccount): Promise<IAccount | null> {
    const res = await this.accountModel.query().insert(data);
    return res.toJSON();
  }

  /** Update an account's tokens */
  async updateTokens(
    provider: string,
    providerAccountId: string,
    tokens: Partial<
      Pick<
        IAccount,
        | 'refresh_token'
        | 'access_token'
        | 'expires_at'
        | 'token_type'
        | 'scope'
        | 'id_token'
        | 'session_state'
      >
    >,
  ): Promise<IAccount | null> {
    const updated = await this.accountModel
      .query()
      .patch(tokens)
      .where({ provider, providerAccountId })
      .returning('*');

    if (!updated.length) {
      throw new NotFoundException('Account not found');
    }

    return updated[0].toJSON() as IAccount;
  }

  /** Upsert account (create if not exists, else update tokens) */
  async upsertAccount(data: IAccount): Promise<IAccount | null> {
    const existing = await this.findByProvider(
      data.provider,
      data.providerAccountId,
    );
    if (existing) {
      // Update tokens
      return this.updateTokens(data.provider, data.providerAccountId, data);
    } else {
      return this.createAccount(data);
    }
  }

  /** Delete an account */
  async deleteAccount(
    provider: string,
    providerAccountId: string,
  ): Promise<IAccount | null> {
    const deleted = await this.accountModel
      .query()
      .delete()
      .where({ provider, providerAccountId })
      .returning('*');

    if (!deleted.length) {
      throw new NotFoundException('Account not found');
    }

    return deleted[0].toJSON() as IAccount;
  }
}
