import { Injectable, NotFoundException } from '@nestjs/common';
import UserTypeActivityModel from 'lib/models/user.type.activity.model';
import { KnexService } from '../knex/knex.service';
import { IUserTypeActivity } from '@repo/api/index';

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

  constructor(private knex: KnexService) {
    this.model = UserTypeActivityModel.bindKnex(knex.instance);
  }

  /** Create a new user type activity */
  async create(data: UserTypeActivityCreateDto): Promise<IUserTypeActivity> {
    const record = await this.model.query().insert({
      ...data,
      createdAt: new Date().toISOString(),
    });
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
    return records.map(r => r.toJSON() as IUserTypeActivity);
  }

  /** Update a user type activity */
  async update(id: number, data: UserTypeActivityUpdateDto): Promise<IUserTypeActivity> {
    const updated = await this.model.query()
      .patch(data)
      .where('id', id)
      .returning('*');

    if (!updated.length) throw new NotFoundException('UserTypeActivity not found');
    return updated[0].toJSON() as IUserTypeActivity;
  }

  /** Delete a user type activity */
  async delete(id: number): Promise<IUserTypeActivity> {
    const deleted = await this.model.query()
      .delete()
      .where('id', id)
      .returning('*');

    if (!deleted.length) throw new NotFoundException('UserTypeActivity not found');
    return deleted[0].toJSON() as IUserTypeActivity;
  }

  /** Optional: fetch activity with related roles and userType */
  async getWithRelations(id: number) {
    const record = await this.model.query()
      .findById(id)
      .withGraphFetched('[userType, roles]');

    if (!record) throw new NotFoundException('UserTypeActivity not found');
    return record.toJSON();
  }
}
