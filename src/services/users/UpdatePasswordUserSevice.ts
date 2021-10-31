import { getRepository } from 'typeorm'
import { User } from '../../models/User'
import AppError from '../../errors/AppError'
import { compare, hash } from 'bcryptjs';



/*

- [x] Verificar se o usuário existe
- [x] Verificar o password é compativel com o password do usuario
- [ ] Verificar se o password é igual ao new password
- [ ] Verificar se existe um new password

*/



interface IRequest {
  password: string,
  newPassword: string,
  user_id: string;
}

class UpdatePasswordUserService {

  public async execute({ password, newPassword, user_id }: IRequest): Promise<User> {

    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (password && !newPassword) {
      throw new AppError('You need to inform the old password to set a new password')
    }


    // Compara a senha informada com a senha que o usuário ja possui
    const checkOldPassword = await compare(password, user.password)

    if (newPassword && user.password) {

      // Verificar a senha antiga é compatível
      if (!checkOldPassword) {
        throw new AppError('Old password does not match')
      }

      if ( password == newPassword ) {
        throw new AppError('Enter a password different from the previous one')
      }

      // Altera para a senha nova
      user.password = await hash(newPassword, 8)

    }
    // Salva a alteração feita
    return userRepository.save(user)
  }

}

export { UpdatePasswordUserService }
