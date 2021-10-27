import { getRepository } from 'typeorm';
import { User } from '../models/User';

import { hash } from 'bcryptjs';

/* 
1 - Se o usuario existe - verificar se o email já está cadastrado
2 - Se o usuario não existe - cadastrar
3 - Criptografar a senha
4 - Salvar no banco de dados
*/

interface Request {
  name: string;
  email: string;
  password: string;
}


class CreateUserService {

  public async execute({ name, email, password }: Request ): Promise<User> {

    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email, 
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;

  }


}

export { CreateUserService };