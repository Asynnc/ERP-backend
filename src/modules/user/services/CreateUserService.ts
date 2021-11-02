import { hash } from "bcryptjs";
import { getRepository } from "typeorm";
import AppError from "../../../utils/errors/AppError";
import { User } from "../model/User";

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    if (name.length <= 0 || email.length <= 0) {
      throw new AppError("You must provide a name, email and password", 401);
    }

    if (password.length <= 5) {
      throw new AppError(
        "Your password must contain at least 6 characters.",
        400,
      );
    }

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError("Email address already used", 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    try {
      await userRepository.save(user);
    } catch (error) {
      throw new AppError("Error: ", 400, error);
    }
    return user;
  }
}

export { CreateUserService };
