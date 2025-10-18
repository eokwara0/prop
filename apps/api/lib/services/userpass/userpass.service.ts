import UserPassModel from 'lib/models/user.pass.model';
import { KnexService } from '../knex/knex.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserPass } from '@repo/api/index';

export interface UserPassCreateDto {
  userId: string;
  userTypeId : number;
  passwordHash: string;
  passwordSalt?: string | null;
  isActive?: boolean;
}

export interface UserPassUpdateDto {
  passwordHash?: string;
  passwordSalt?: string | null;
  isActive?: boolean;
  lastUsedAt?: string | null;
  userTypeId : number
}

@Injectable()
export class UserPassService {
  private userPassModel: typeof UserPassModel;

  constructor(private knex: KnexService) {
    this.userPassModel = UserPassModel.bindKnex(knex.instance);
  }

  /** Create a new password record */
  async createUserPass(data: UserPassCreateDto): Promise<IUserPass> {
    const record = await this.userPassModel.query().insert({
      ...data,
      isActive: data.isActive ?? true,
      createdAt: new Date().toISOString(),
    });
    return record.toJSON() as IUserPass;
  }

  /** Get a password record by userId */
  async getUserPass(userId: string): Promise<IUserPass | null> {
    const record = await this.userPassModel.query().findById(userId);
    return record ? (record.toJSON() as IUserPass) : null;
  }

  /** Update a password record */
  async updateUserPass(userId: string, data: UserPassUpdateDto): Promise<IUserPass> {
    const updated = await this.userPassModel.query()
      .patch(data)
      .where('userId', userId)
      .returning('*');

    if (!updated.length) throw new NotFoundException('UserPass not found');
    return updated[0].toJSON() as IUserPass;
  }

  /** Delete a password record */
  async deleteUserPass(userId: string): Promise<IUserPass> {
    const deleted = await this.userPassModel.query()
      .delete()
      .where('userId', userId)
      .returning('*');

    if (!deleted.length) throw new NotFoundException('UserPass not found');
    return deleted[0].toJSON() as IUserPass;
  }
}
