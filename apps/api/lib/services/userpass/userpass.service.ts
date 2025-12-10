import UserPassModel from 'lib/models/user.pass.model';
import { KnexService } from '../knex/knex.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserPass } from '@repo/api/index';
import { Knex } from 'knex';

export interface UserPassCreateDto {
  userId: string;
  userTypeId: number;
  passwordHash: string;
  passwordSalt?: string | null;
  isActive?: boolean;
}

export interface UserPassUpdateDto {
  passwordHash?: string;
  passwordSalt?: string | null;
  isActive?: boolean;
  lastUsedAt?: string | null;
  userTypeId: number;
}

@Injectable()
export class UserPassService {
  private userPassModel: typeof UserPassModel;
  private transaction: Knex.Transaction;
  constructor(private knex: KnexService) {
    this.userPassModel = UserPassModel.bindKnex(knex.instance);
    this.setTransaction();
  }

  private async setTransaction(): Promise<void> {
    this.transaction = await this.knex.transact;
  }
  /** Create a new password record */
  async createUserPass(data: UserPassCreateDto): Promise<IUserPass> {
    const record = await this.userPassModel.transaction(async trx => {
      const rec = await this.userPassModel.query(trx).insert({
        ...data,
        isActive : data.isActive ?? true,
        createdAt: new Date().toISOString()
      });
      return rec
    });


    if (!record) {
      throw new HttpException(
        'Unable to create user pass data',
        HttpStatus.BAD_REQUEST,
      );
    }
    return record.toJSON() as IUserPass;
  }

  /** Get a password record by userId */
  async getUserPass(userId: string): Promise<IUserPass | null> {
    const record = await this.userPassModel.query().findById(userId);
    return record ? (record.toJSON() as IUserPass) : null;
  }

  /** Update a password record */
  async updateUserPass(
    userId: string,
    data: UserPassUpdateDto,
  ): Promise<IUserPass> {
    const updated = await this.userPassModel
      .query()
      .patch(data)
      .where('userId', userId)
      .returning('*')
      .transacting(this.transaction);

    if (!updated.length) {
      this.transaction.rollback();
      throw new NotFoundException('UserPass not found');
    }
    this.transaction.commit();
    return updated[0].toJSON() as IUserPass;
  }

  /** Delete a password record */
  async deleteUserPass(userId: string): Promise<IUserPass> {
    const deleted = await this.userPassModel
      .query()
      .delete()
      .where('userId', userId)
      .returning('*')
      .transacting(this.transaction);

    if (!deleted.length) {
      this.transaction.rollback();
      throw new NotFoundException('UserPass not found');
    }
    this.transaction.commit();
    return deleted[0].toJSON() as IUserPass;
  }
}
