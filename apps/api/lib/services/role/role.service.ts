import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import RoleModel from 'lib/models/role.model';
import { KnexService } from '../knex/knex.service';
import { IRole, IRoleWithRelationsSchema } from '@repo/api/index';
import { Knex } from 'knex';

@Injectable()
export class RoleService {
  private roleModel: typeof RoleModel;
  private transaction: Knex.Transaction;

  constructor(private knex: KnexService) {
    this.roleModel = RoleModel.bindKnex(knex.instance);
    this.setTransaction();
  }

  private async setTransaction(): Promise<void> {
    this.transaction = await this.knex.transact;
  }

  /** Get all roles */
  async getAllRoles(): Promise<IRole[]> {
    const roles = await this.roleModel.query();
    return roles.map((r) => r.toJSON() as IRole);
  }

  /** Get a role by ID */
  async getRoleById(id: number): Promise<IRole> {
    const role = await this.roleModel.query().findById(id);
    if (!role) throw new NotFoundException('Role not found');
    return role.toJSON() as IRole;
  }

  /** Create a new role */
  async createRole(data: Omit<IRole, 'id' | 'createdAt'>): Promise<IRole> {
    const role = await this.roleModel
      .query()
      .insert(data)
      .transacting(this.transaction);
    if (!role) {
      this.transaction.rollback();
      throw new HttpException(
        'unable to create role',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    this.transaction.commit();
    return role.toJSON() as IRole;
  }

  /** Update a role by ID */
  async updateRole(
    id: number,
    data: Partial<Omit<IRole, 'id' | 'createdAt'>>,
  ): Promise<IRole> {
    const updated = await this.roleModel
      .query()
      .patch(data)
      .where('id', id)
      .returning('*')
      .transacting(this.transaction);

    if (!updated.length) {
      this.transaction.rollback();
      throw new NotFoundException('Role not found');
    }
    this.transaction.commit();
    return updated[0].toJSON() as IRole;
  }

  /** Delete a role by ID */
  async deleteRole(id: number): Promise<IRole> {
    const deleted = await this.roleModel
      .query()
      .delete()
      .where('id', id)
      .returning('*')
      .transacting(this.transaction);

    if (!deleted.length) {
      this.transaction.rollback();
      throw new NotFoundException('Role not found');
    }
    this.transaction.commit();
    return deleted[0].toJSON() as IRole;
  }

  /** Get all user type activities associated with a role */
  async getRoleWithRelations(id: number): Promise<IRoleWithRelationsSchema> {
    const role = await this.roleModel
      .query()
      .findById(id)
      .withGraphFetched('userTypeActivities');

    if (!role) throw new NotFoundException('Role not found');

    return role.toJSON() as IRoleWithRelationsSchema;
  }
}
