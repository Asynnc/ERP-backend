import { Router } from 'express'
import { AuthenticateUserService } from '../services/auth'

const sessionsRouter = Router();

// Rota responsável por autenticar o usuário
sessionsRouter.post('/', async (request, response) => {

  // Recupera os dados do corpo da requisição
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  // Passa os dados para o serviço de autenticação

  const { user, token } = await authenticateUser.auth({ email, password });

  delete user.password;

  return response.json({ user, token });

})

export { sessionsRouter }
