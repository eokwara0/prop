import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import SessionModel from 'lib/models/session.model';
import { KnexService } from '../knex/knex.service';
import type { ISession } from '@repo/api/index';
import { Knex } from 'knex';

@Injectable()
export class SessionService {
  private sessionModel: typeof SessionModel;
  private transaction: Knex.Transaction;
  constructor(private knex: KnexService) {
    this.sessionModel = SessionModel.bindKnex(knex.instance);
    this.setTransaction();
  }

  private async setTransaction(): Promise<void> {
    this.transaction = await this.knex.transact;
  }

  /** Create a new session */
  async createSession(data: Partial<ISession>): Promise<ISession> {
    const session = await this.sessionModel
      .query()
      .insert(data)
      .transacting(this.transaction);

    if (!session) {
      this.transaction.rollback();
      throw new HttpException(
        'Unable to create session',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.transaction.commit();
    return session.toJSON() as ISession;
  }

  /** Get session by sessionToken */
  async getSession(sessionToken: string): Promise<ISession | null> {
    const session = await this.sessionModel.query().findById(sessionToken);
    return session ? (session.toJSON() as ISession) : null;
  }

  /** Get all sessions for a user */
  async getSessionsByUserId(userId: string): Promise<ISession[]> {
    const sessions = await this.sessionModel.query().where('userId', userId);
    return sessions.map((s) => s.toJSON() as ISession);
  }

  /** Update a session (e.g., extend expiration) */
  async updateSession(
    sessionToken: string,
    data: Partial<ISession>,
  ): Promise<ISession> {
    const updated = await this.sessionModel
      .query()
      .patch(data)
      .where('sessionToken', sessionToken)
      .returning('*')
      .transacting(this.transaction);

    if (!updated.length) {
      this.transaction.rollback();
      throw new NotFoundException('Session not found');
    }
    this.transaction.commit();
    return updated[0].toJSON() as ISession;
  }

  /** Delete a session by sessionToken */
  async deleteSession(sessionToken: string): Promise<ISession> {
    const deleted = await this.sessionModel
      .query()
      .delete()
      .where('sessionToken', sessionToken)
      .returning('*')
      .transacting(this.transaction);

    if (!deleted.length) {
      this.transaction.rollback();
      throw new NotFoundException('Session not found');
    }
    this.transaction.commit();
    return deleted[0].toJSON() as ISession;
  }

  /** Delete all sessions for a user */
  async deleteSessionsByUserId(userId: string): Promise<ISession[]> {
    const sessions = await this.sessionModel.query().where('userId', userId);
    if (!sessions.length) return [];

    const res = await this.sessionModel
      .query()
      .delete()
      .where('userId', userId)
      .returning('*')
      .transacting(this.transaction);
    if (!res) {
      this.transaction.rollback();
      throw new HttpException(
        'Internal server error, unable to delete user session',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.transaction.commit();
    return sessions.map((s) => s.toJSON() as ISession);
  }
}
