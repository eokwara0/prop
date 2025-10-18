import { Injectable, NotFoundException } from '@nestjs/common';
import { KnexService } from '../knex/knex.service';
import VerificationTokenModel from 'lib/models/verificationtoken';
import { IVerificationToken } from '@repo/api/index';

@Injectable()
export class VerificationTokenService {
  private model: typeof VerificationTokenModel;

  constructor(private readonly knex: KnexService) {
    this.model = VerificationTokenModel.bindKnex(knex.instance);
  }

  /** Create a new verification token */
  async create(data: IVerificationToken): Promise<IVerificationToken> {
    const record = await this.model.query().insert(data);
    return record.toJSON() as IVerificationToken;
  }

  /** Get a token by identifier and token value */
  async getToken(identifier: string, token: string): Promise<IVerificationToken> {
    const record = await this.model.query().findOne({ identifier, token });
    if (!record) throw new NotFoundException('Verification token not found');
    return record.toJSON() as IVerificationToken;
  }

  /** Find all tokens (optional, mostly for admin/debug) */
  async getAll(): Promise<IVerificationToken[]> {
    const records = await this.model.query();
    return records.map(r => r.toJSON() as IVerificationToken);
  }

  /** Delete a token after use */
  async delete(identifier: string, token: string): Promise<IVerificationToken> {
    const deleted = await this.model
      .query()
      .delete()
      .where({ identifier, token })
      .returning('*');

    if (!deleted.length) throw new NotFoundException('Verification token not found');
    return deleted[0].toJSON() as IVerificationToken;
  }

  /** Delete all expired tokens (optional cleanup) */
  async deleteExpired(): Promise<number> {
    const now = new Date().toISOString();
    const count = await this.model.query().delete().where('expires', '<', now);
    return count;
  }
}
