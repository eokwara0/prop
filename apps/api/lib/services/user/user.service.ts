import { Injectable, NotFoundException } from '@nestjs/common';
import { KnexService } from '../knex/knex.service';
import { UserModel } from 'lib/models/user.model';
import { IUser, IUserWithRoles } from '@repo/api/index';

export interface UserCreateDto {
  email: string;
  emailVerified?: string | null;
  name?: string | null;
  image?: string | null;
}

export interface UserUpdateDto {
  email?: string;
  emailVerified?: string | null;
  name?: string | null;
  image?: string | null;
}

@Injectable()
export class UserService {
  private userModel: typeof UserModel;

  constructor(private knex: KnexService) {
    this.userModel = UserModel.bindKnex(knex.instance);
  }

  /** Create a new user */
  async createUser(data: UserCreateDto): Promise<IUser> {
    const user = await this.userModel.query().insert(data);
    return user.toJSON() as IUser;
  }

  /** Get a user by ID */
  async getUserById(id: string): Promise<IUser> {
    const user = await this.userModel.query().findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user.toJSON() as IUser;
  }

  /** Get a user by email */
  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await this.userModel.query().findOne({ email });
    return user ? (user.toJSON() as IUser) : null;
  }

  /** Get all users */
  async getAllUsers(): Promise<IUser[]> {
    const users = await this.userModel.query();
    return users.map((u) => u.toJSON() as IUser);
  }

  /** Update a user */
  async updateUser(id: string, data: UserUpdateDto): Promise<IUser> {
    const updated = await this.userModel
      .query()
      .patch(data)
      .where('id', id)
      .returning('*');

    if (!updated.length) throw new NotFoundException('User not found');
    return updated[0].toJSON() as IUser;
  }

  /** Delete a user */
  async deleteUser(id: string): Promise<IUser> {
    const deleted = await this.userModel
      .query()
      .delete()
      .where('id', id)
      .returning('*');
    if (!deleted.length) throw new NotFoundException('User not found');
    return deleted[0].toJSON() as IUser;
  }

  /** Get a user with related roles */
  async getUserWithRoles(id: string): Promise<IUserWithRoles> {
    const user = await this.userModel
      .query()
      .findById(id)
      .withGraphFetched('roles'); // Make sure relationMappings exists for roles

    if (!user) throw new NotFoundException('User not found');
    return user.toJSON() as IUserWithRoles;
  }

  /** Optional: fetch all relations (accounts, sessions, authenticators) */
  async getUserWithRelations(id: string) {
    const user = await this.userModel
      .query()
      .findById(id)
      .withGraphFetched('[accounts, sessions, authenticators]');

    if (!user) throw new NotFoundException('User not found');
    return user.toJSON();
  }
}
