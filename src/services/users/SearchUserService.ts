import { getRepository } from "typeorm";
import { User } from "../../models/User";

import AppError from '../../errors/AppError'



interface Request {
  id: string;
}

class SearchUserService {


  public async search() {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    return users;

  }

  public async searchByID({ id }: Request): Promise<User> {

    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { id }
    })

    if (!checkUserExists) {
      throw new AppError('User not found', 404);
    }

    return checkUserExists;

  }
}

export { SearchUserService };
