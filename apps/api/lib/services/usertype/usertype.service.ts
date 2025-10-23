import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import UserTypeModel from 'lib/models/user.type.model';
import { KnexService } from '../knex/knex.service';
import { IUserType } from '@repo/api/index';
import { Knex } from 'knex';

export interface UserTypeCreateDto {
  name: string;
}

export interface UserTypeUpdateDto {
  name?: string;
}

@Injectable()
export class UserTypeService {
  private userTypeModel: typeof UserTypeModel;
  private transaction: Knex.Transaction;
  constructor(private knex: KnexService) {
    this.userTypeModel = UserTypeModel.bindKnex(knex.instance);
    this.setTransaction();
  }

  private async setTransaction(): Promise<void> {
    this.transaction = await this.knex.transact;
  }

  /** Create a new user type */
  async createUserType(data: UserTypeCreateDto): Promise<IUserType> {
    const record = await this.userTypeModel
      .query()
      .insert({
        ...data,
        createdAt: new Date().toISOString(),
      })
      .transacting(this.transaction);
    if (!record) {
      this.transaction.rollback();
      throw new HttpException(
        'Unable to create usertype',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.transaction.commit();
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
    return records.map((r) => r.toJSON() as IUserType);
  }

  /** Update a user type */
  async updateUserType(
    id: number,
    data: UserTypeUpdateDto,
  ): Promise<IUserType> {
    const updated = await this.userTypeModel
      .query()
      .patch(data)
      .where('id', id)
      .returning('*')
      .transacting(this.transaction);

    if (!updated.length) {
      this.transaction.rollback();
      throw new NotFoundException('UserType not found');
    }
    this.transaction.commit();
    return updated[0].toJSON() as IUserType;
  }

  /** Delete a user type */
  async deleteUserType(id: number): Promise<IUserType> {
    const deleted = await this.userTypeModel
      .query()
      .delete()
      .where('id', id)
      .returning('*')
      .transacting(this.transaction);

    if (!deleted.length) {
      this.transaction.rollback();
      throw new NotFoundException('UserType not found');
    }
    this.transaction.commit();
    return deleted[0].toJSON() as IUserType;
  }
}
