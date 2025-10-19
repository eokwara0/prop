import { Injectable, NotFoundException } from '@nestjs/common';
import SessionModel from 'lib/models/session.model';
import { KnexService } from '../knex/knex.service';
import type { ISession } from '@repo/api/index';

@Injectable()
export class SessionService {
  private sessionModel: typeof SessionModel;

  constructor(private knex: KnexService) {
    this.sessionModel = SessionModel.bindKnex(knex.instance);
  }

  /** Create a new session */
  async createSession(data: Partial<ISession>): Promise<ISession> {
    const session = await this.sessionModel.query().insert(data);
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
      .returning('*');

    if (!updated.length) throw new NotFoundException('Session not found');
    return updated[0].toJSON() as ISession;
  }

  /** Delete a session by sessionToken */
  async deleteSession(sessionToken: string): Promise<ISession> {
    const deleted = await this.sessionModel
      .query()
      .delete()
      .where('sessionToken', sessionToken)
      .returning('*');

    if (!deleted.length) throw new NotFoundException('Session not found');
    return deleted[0].toJSON() as ISession;
  }

  /** Delete all sessions for a user */
  async deleteSessionsByUserId(userId: string): Promise<ISession[]> {
    const sessions = await this.sessionModel.query().where('userId', userId);
    if (!sessions.length) return [];

    await this.sessionModel.query().delete().where('userId', userId);
    return sessions.map((s) => s.toJSON() as ISession);
  }
}
