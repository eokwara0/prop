import { Injectable, NotFoundException } from '@nestjs/common';
import AuthenticatorModel from 'lib/models/authenticator.model';
import { KnexService } from '../knex/knex.service';
import { IAuthenticator } from '@repo/api/index';
import { Knex } from 'knex';

@Injectable()
export class AuthenticatorService {
  private authenticatorModel: typeof AuthenticatorModel;
  private transaction: Knex.Transaction;

  constructor(private knex: KnexService) {
    this.authenticatorModel = AuthenticatorModel.bindKnex(knex.instance);
    this.setTranscation();
  }

  async setTranscation() {
    this.transaction = await this.knex.transact;
  }

  /** Create a new authenticator credential */
  async createCredential(data: IAuthenticator): Promise<IAuthenticator | null> {
    const cred = this.authenticatorModel
      .query()
      .insert(data)
      .transacting(this.transaction);
    if (!cred) {
      this.transaction.rollback();
      return null;
    }
    this.transaction.commit();
    return (await cred).toJSON() as IAuthenticator;
  }

  /** Get all credentials for a user */
  async getCredentialsByUserId(userId: string): Promise<IAuthenticator | null> {
    const res = await this.authenticatorModel
      .query()
      .where('userId', userId)
      .first();
    if (!res) {
      return null;
    }
    return res.toJSON() as IAuthenticator;
  }

  /** Get a single credential by its ID and userId */
  async getCredential(
    userId: string,
    credentialID: string,
  ): Promise<IAuthenticator | null> {
    const credential = await this.authenticatorModel
      .query()
      .where('credentialID', credentialID)
      .andWhere('userId', userId)
      .first();
    if (!credential) {
      return null;
    }
    return credential.toJSON() as IAuthenticator;
  }

  /** Update the counter after a successful authentication */
  async updateCounter(
    userId: string,
    credentialID: string,
    counter: number,
  ): Promise<IAuthenticator | null> {
    const updated = await this.authenticatorModel
      .query()
      .patch({ counter })
      .where({ userId, credentialID })
      .returning('*')
      .transacting(this.transaction);

    if (!updated.length) {
      this.transaction.rollback();
      throw new NotFoundException('Credential not found');
    }

    this.transaction.commit();
    return updated[0].toJSON() as IAuthenticator;
  }

  /** Delete a credential */
  async deleteCredential(
    userId: string,
    credentialID: string,
  ): Promise<IAuthenticator | null> {
    const deleted = await this.authenticatorModel
      .query()
      .delete()
      .where({ userId, credentialID })
      .returning('*')
      .transacting(this.transaction);

    if (!deleted.length) {
      this.transaction.rollback();
      throw new NotFoundException('Credential not foundd');
    }

    this.transaction.commit();
    return deleted[0].toJSON() as IAuthenticator;
  }

  /** Find credential by providerAccountId (optional helper) */
  async findByProviderAccountId(
    providerAccountId: string,
  ): Promise<IAuthenticator | null> {
    const res = await this.authenticatorModel
      .query()
      .where('providerAccountId', providerAccountId)
      .first();
    if (!res) return null;
    return res.toJSON() as IAuthenticator;
  }
}
