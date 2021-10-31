import { getRepository } from "typeorm";
import { User } from "../../models/User";
import AppError from '../../errors/AppError';
import path from "path";
import uploadConfig from '../../config/uploads'
import fs from 'fs';



interface iRequest {
  user_id: string;
  avatarFileName: string;
}

class UpdateAvatarUserService {

  public async update({ user_id, avatarFileName }: iRequest): Promise<User> {

    // Iniciar baseado no modelo de User
    const userRepository = getRepository(User)

    // Verificar se o usuário é válido
    const user = await userRepository.findOne(user_id)

    if (!user) {
      throw new AppError('Only Authenticated users can change avatar', 401)
    }

    if (user.avatar) {
      // Buscar pelo arquivo do avatar do usuário.
      // Escolhe onde vai ser salvo, e qual avatar será removido
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)

      // Verificar se o arquivo existe
      // Usar o FS do node como uma promisse com a função stat
      // Também verificamos o status do arquivo
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists){
        // Deletamos do sistema passando o unlink e o caminho de onde ele se encontra
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    // Pegar a instancia do usuário
    user.avatar = avatarFileName;
    // Salvamos diretamente
    await userRepository.save(user);

    return user;

  }

}

export { UpdateAvatarUserService }
