import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import UserTypeActivityModel from 'lib/models/user.type.activity.model';
import { KnexService } from '../knex/knex.service';
import { IUserTypeActivity } from '@repo/api/index';
import { Knex } from 'knex';

export interface UserTypeActivityCreateDto {
  userTypeId: number;
  roleIds: number[];
}

export interface UserTypeActivityUpdateDto {
  roleIds?: number[];
}

@Injectable()
export class UserTypeActivityService {
  private model: typeof UserTypeActivityModel;
  private transaction: Knex.Transaction;
  constructor(private knex: KnexService) {
    this.model = UserTypeActivityModel.bindKnex(knex.instance);
    this.setTransaction();
  }

  private async setTransaction(): Promise<void> {
    this.transaction = await this.knex.transact;
  }

  /** Create a new user type activity */
  async create(data: UserTypeActivityCreateDto): Promise<IUserTypeActivity> {
    const record = await this.model
      .query()
      .insert({
        ...data,
        createdAt: new Date().toISOString(),
      })
      .transacting(this.transaction);
    if (!record) {
      this.transaction.rollback();
      throw new HttpException(
        'Unable to create usertype activity',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.transaction.commit();
    return record.toJSON() as IUserTypeActivity;
  }

  /** Get a user type activity by ID */
  async getById(id: number): Promise<IUserTypeActivity> {
    const record = await this.model.query().findById(id);
    if (!record) throw new NotFoundException('UserTypeActivity not found');
    return record.toJSON() as IUserTypeActivity;
  }

  /** Get all user type activities */
  async getAll(): Promise<IUserTypeActivity[]> {
    const records = await this.model.query();
    return records.map((r) => r.toJSON() as IUserTypeActivity);
  }

  /** Update a user type activity */
  async update(
    id: number,
    data: UserTypeActivityUpdateDto,
  ): Promise<IUserTypeActivity> {
    const updated = await this.model
      .query()
      .patch(data)
      .where('id', id)
      .returning('*')
      .transacting(this.transaction);

    if (!updated.length) {
      this.transaction.rollback();
      throw new NotFoundException('UserTypeActivity not found');
    }
    this.transaction.commit();
    return updated[0].toJSON() as IUserTypeActivity;
  }

  /** Delete a user type activity */
  async delete(id: number): Promise<IUserTypeActivity> {
    const deleted = await this.model
      .query()
      .delete()
      .where('id', id)
      .returning('*')
      .transacting(this.transaction);

    if (!deleted.length) {
      this.transaction.rollback();
      throw new NotFoundException('UserTypeActivity not found');
    }
    this.transaction.commit();
    return deleted[0].toJSON() as IUserTypeActivity;
  }

  /** Optional: fetch activity with related roles and userType */
  async getWithRelations(id: number): Promise<IUserTypeActivity> {
    const record = await this.model.query().findById(id);

    if (!record) throw new NotFoundException('UserTypeActivity not found');
    return record.toJSON() as IUserTypeActivity;
  }
}
