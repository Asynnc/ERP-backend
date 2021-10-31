import { getRepository } from "typeorm";
import AppError from '../../errors/AppError';
import { Permission } from "../../models/Permission";

interface PermissionRequest {
  name: string;
  description: string
}

class CreatePermissionService {
  async execute({ name, description }: PermissionRequest): Promise<Permission | Error> {

    const permissionRepository = getRepository(Permission);

    const checkPermissionExists = await permissionRepository.findOne(
      { where: { name } }
    )

    if (checkPermissionExists) {
      throw new AppError("Permission alredy exists");
    }

    const permission = permissionRepository.create({ name, description });

    await permissionRepository.save(permission);

    return permission
  }
}

export { CreatePermissionService };

