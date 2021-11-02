import { getRepository } from "typeorm";
import AppError from '../../../utils/errors/AppError';
import { Permission } from "../model/Permission";

interface PermissionRequest {
  name: string;
  description: string
}

class CreatePermissionService {
  async execute({ name, description }: PermissionRequest): Promise<Permission> {

    const permissionRepository = getRepository(Permission);

    if(name.length <= 0 || description.length <= 0){
      throw new AppError("You must provide a name and description to permission.");
    }

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

