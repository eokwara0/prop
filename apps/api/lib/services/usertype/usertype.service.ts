import { Injectable, NotFoundException } from '@nestjs/common';
import UserTypeModel from 'lib/models/user.type.model';
import { KnexService } from '../knex/knex.service';
import { IUserType } from '@repo/api/index';

export interface UserTypeCreateDto {
  name: string;
}

export interface UserTypeUpdateDto {
  name?: string;
}

@Injectable()
export class UserTypeService {
  private userTypeModel: typeof UserTypeModel;

  constructor(private knex: KnexService) {
    this.userTypeModel = UserTypeModel.bindKnex(knex.instance);
  }

  /** Create a new user type */
  async createUserType(data: UserTypeCreateDto): Promise<IUserType> {
    const record = await this.userTypeModel.query().insert({
      ...data,
      createdAt: new Date().toISOString(),
    });
    return record.toJSON() as IUserType;
  }

  /** Get a user type by ID */
  async getUserTypeById(id: number): Promise<IUserType> {
    const record = await this.userTypeModel.query().findById(id);
    if (!record) throw new NotFoundException('UserType not found');
    return record.toJSON() as IUserType;
  }

  /** Get all user types */
  async getAllUserTypes(): Promise<IUserType[]> {
    const records = await this.userTypeModel.query();
    return records.map(r => r.toJSON() as IUserType);
  }

  /** Update a user type */
  async updateUserType(id: number, data: UserTypeUpdateDto): Promise<IUserType> {
    const updated = await this.userTypeModel.query()
      .patch(data)
      .where('id', id)
      .returning('*');

    if (!updated.length) throw new NotFoundException('UserType not found');
    return updated[0].toJSON() as IUserType;
  }

  /** Delete a user type */
  async deleteUserType(id: number): Promise<IUserType> {
    const deleted = await this.userTypeModel.query()
      .delete()
      .where('id', id)
      .returning('*');

    if (!deleted.length) throw new NotFoundException('UserType not found');
    return deleted[0].toJSON() as IUserType;
  }
}
