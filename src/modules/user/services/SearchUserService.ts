import { getRepository } from "typeorm";
import AppError from '../../../utils/errors/AppError';
import { User } from "../model/User";




interface Request {
  id: string;
}

class SearchUserService {


  public async search(): Promise<User[]> {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    return users;

  }

  public async searchByID({ id }: Request): Promise<User> {

    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { id },
      relations: ["roles","permissions"]
    })

    if (!checkUserExists) {
      throw new AppError('User not found', 404);
    }

    return checkUserExists;

  }
}

export { SearchUserService };
