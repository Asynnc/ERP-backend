import { getRepository } from "typeorm";
import AppError from '../../../utils/errors/AppError';
import { Role } from "../model/Role";

interface RoleRequest {
  name: string;
  description: string
}

class CreateRoleService {
  async execute({ name, description }: RoleRequest): Promise<Role> {

    const roleRepository = getRepository(Role);

    if(name.length <= 0 || description.length <= 0){
      throw new AppError("You must provide a name and description to role.");
    }

    const checkRoleExists = await roleRepository.findOne(
      { where: { name } }
    )

    if (checkRoleExists) {
      throw new AppError("Role alredy exists");
    }

    const role = roleRepository.create({ name, description });

    await roleRepository.save(role);

    return role
  }
}

export { CreateRoleService };

