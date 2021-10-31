import { Permission } from '../models/Permission';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Permission)
class PermissionRepository extends Repository<Permission>{

  public async findByName(name: string): Promise<Permission | null> {

    const findPermission = await this.findOne({
      where: { name }
    });

    return findPermission || null;
  }
}

export { PermissionRepository };
