import { getRepository } from "typeorm";
import { Permission } from "../../models/Permission";
import { Role } from "../../models/Role";

import AppError from '../../errors/AppError'



type RolePermissionRequest = {
  role_id: string;
  permissions: string[];
};

export class CreateRolePermissionService {
  async execute({
    role_id,
    permissions,
  }: RolePermissionRequest): Promise<Role> {


    const roleRepo = getRepository(Role);
    const permissionsRepo = getRepository(Permission)

    const role = await roleRepo.findOne(role_id);

    if (!role) {
      throw new AppError("Role does not exists!");
    }

    const permissionsExists = await permissionsRepo.findByIds(
      permissions
    );

    role.permissions = permissionsExists;

    await roleRepo.save(role);

    return role;
  }
}
