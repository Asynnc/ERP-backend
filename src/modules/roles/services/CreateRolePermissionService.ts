import { getRepository } from "typeorm";
import AppError from '../../../utils/errors/AppError';
import { Permission } from "../../permissions/model/Permission";
import { Role } from "../model/Role";

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
