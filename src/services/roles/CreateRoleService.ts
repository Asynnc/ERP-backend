import { getRepository } from "typeorm";
import AppError from '../../errors/AppError';
import { Role } from "../../models/Role";

interface RoleRequest {
  name: string;
  description: string
}

class CreateRoleService {
  async execute({ name, description }: RoleRequest): Promise<Role> {

    const roleRepository = getRepository(Role);

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

