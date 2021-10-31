import { getRepository } from "typeorm";
import { User } from "../../models/User";
import { compare } from 'bcryptjs'
import AppError from '../../errors/AppError'
import AuthConfig from '../../config/auth';
import { sign } from 'jsonwebtoken';


interface IAuthService {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {

  /*
  - [x] necessario email/senha
  - [x] necessáio tipar
  - [x] Veririfcar se o usuario existe
  - [] Verificar se a senha esta correta
  - [] necessário retornar um token
  */

  // Serviço de autenticacao
  public async auth({ email, password }: IAuthService): Promise<IResponse> {

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email }
    });

    if (!user) {
      throw new AppError('User not found', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password', 401);
    }

    /* Criando um Token com assinatura
    1 - Primeiro parâmetro - Informações que podem ser usadas do usuário (Não coloque credenciais)
    esse parametro chama-se Payload e pode ser descriptografado (Cuidado)
    ex: Permissions, name, id
    2 - Segundo parâmetro - Um segredo que só nossa aplicação conhece.
    O segredo usado foi gerado pelo www.md5.cz, após escolher minha paralavra secreta.
    3 - Terceiro parâmetro - configurações do Token
    */

    const { secret, expiresIn } = AuthConfig.jwt;

    const token = sign({}, secret, {
      // Refere-se a qual usuário pertence o token gerado
      subject: user.id,
      // Tempo de expiração do token
      expiresIn: expiresIn
    })

    return { user, token };
  }

}

export { AuthenticateUserService };
