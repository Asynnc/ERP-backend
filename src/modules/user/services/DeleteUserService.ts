import { getRepository } from "typeorm";
import { User } from "../model/User";
import AppError from "../../../utils/errors/AppError";

interface Request {
  id: string;
}

class DeleteUserService {
  public async delete({ id }: Request): Promise<void> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { id },
    });

    if (!checkUserExists) {
      throw new Error("User not exists");
    }

    try {
      await userRepository.delete({ id });
    } catch (error) {
      new AppError("Error: ", 404, error);
    }
  }
}

export { DeleteUserService };
