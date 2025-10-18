import { Injectable, NotFoundException } from '@nestjs/common';
import RoleModel from 'lib/models/role.model';
import { KnexService } from '../knex/knex.service';
import { IRole, IRoleWithRelationsSchema } from '@repo/api/index';

@Injectable()
export class RoleService {
  private roleModel: typeof RoleModel;

  constructor(private knex: KnexService) {
    this.roleModel = RoleModel.bindKnex(knex.instance);
  }

  /** Get all roles */
  async getAllRoles(): Promise<IRole[]> {
    const roles = await this.roleModel.query();
    return roles.map(r => r.toJSON() as IRole);
  }

  /** Get a role by ID */
  async getRoleById(id: number): Promise<IRole> {
    const role = await this.roleModel.query().findById(id);
    if (!role) throw new NotFoundException('Role not found');
    return role.toJSON() as IRole;
  }

  /** Create a new role */
  async createRole(data: Omit<IRole, 'id' | 'createdAt'>): Promise<IRole> {
    const role = await this.roleModel.query().insert(data);
    return role.toJSON() as IRole;
  }

  /** Update a role by ID */
  async updateRole(id: number, data: Partial<Omit<IRole, 'id' | 'createdAt'>>): Promise<IRole> {
    const updated = await this.roleModel.query()
      .patch(data)
      .where('id', id)
      .returning('*');

    if (!updated.length) throw new NotFoundException('Role not found');
    return updated[0].toJSON() as IRole;
  }

  /** Delete a role by ID */
  async deleteRole(id: number): Promise<IRole> {
    const deleted = await this.roleModel.query()
      .delete()
      .where('id', id)
      .returning('*');

    if (!deleted.length) throw new NotFoundException('Role not found');
    return deleted[0].toJSON() as IRole;
  }

  /** Get all user type activities associated with a role */
  async getRoleWithRelations(id: number): Promise<IRoleWithRelationsSchema> {
    const role = await this.roleModel.query()
      .findById(id)
      .withGraphFetched('userTypeActivities');

    if (!role) throw new NotFoundException('Role not found');

    return role.toJSON() as IRoleWithRelationsSchema;
  }
}
