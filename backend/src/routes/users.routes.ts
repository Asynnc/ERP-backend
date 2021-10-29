import { Router } from 'express';

import { CreateUserService } from '../services/users/CreateUserService'
import { SearchUserService } from '../services/users/SearchUserService';

const usersRouter = Router();


// Rota responsável por criar um usuário
usersRouter.post('/', async (request, response) => {


  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password })

  delete user.password;

  return response.json(user)

})

// Rota responsável por listar todos os usuários
usersRouter.get('/', async (request, response) => {

  const findUser = new SearchUserService();
  const users = await findUser.search();

  return response.json(users);

})

usersRouter.get('/find/:id', async (request, response) => {

  const { id } = request.params

  const findUser = new SearchUserService();
  const user = await findUser.searchByID({ id })

  delete user.password;

  return response.json(user)

})

export { usersRouter };
