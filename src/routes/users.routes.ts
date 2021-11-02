import { Request, Response, Router } from 'express';
import multer from 'multer';
import UploadConfig from '../config/uploads';
import { ensureAuthenticated } from '../utils/middlewares/ensureAuthenticated';
import { CreateUserService } from '../modules/user/services/CreateUserService';
import { DeleteUserService } from '../modules/user/services/DeleteUserService';
import { SearchUserService } from '../modules/user/services/SearchUserService';
import { UpdateAvatarUserService } from '../modules/user/services/UpdateAvatarUserService';
import { UpdatePasswordUserService } from '../modules/user/services/UpdatePasswordUserSevice';

const usersRouter = Router();
const upload = multer(UploadConfig);

// Rota responsável por criar um usuário
usersRouter.post('/', async (request: Request, response: Response) => {


  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password })

  delete user.password;

  return response.json(user)

})

// Rota responsável por listar todos os usuários
usersRouter.get('/', ensureAuthenticated, async (request: Request, response: Response) => {

  const findUser = new SearchUserService();
  const users = await findUser.search();

  return response.json(users);

})

// Rota responsável por listar um usuário específico
usersRouter.get('/find/:id', ensureAuthenticated, async (request: Request, response: Response) => {

  const { id } = request.params

  const findUser = new SearchUserService();
  const user = await findUser.searchByID({ id })

  delete user.password;

  return response.json(user)

})

// Rota responsável por atualizar o avatar do usuário
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request: Request, response: Response) => {

  // // Obter os dados do arquivo enviado
  // console.log(request.file)

  // Iniciar o serviço para atualizar o avatar
  const updateAvatarUserService = new UpdateAvatarUserService();
  // Criar o usuário
  const user = await updateAvatarUserService.update({
    user_id: request.user.id,
    avatarFileName: request.file.filename
  })

  delete user.password;

  return response.json(user);

})

// Rota responsável por deletar um usuário
usersRouter.delete('/', ensureAuthenticated, async (request: Request, response: Response) => {
  const deleteUserService = new DeleteUserService();

  const { id } = request.body

  await deleteUserService.delete({ id })

  return response.json({ message: 'User has been deleted' })
})

// Rota responsável por alterar a senha do usuário
usersRouter.post('/settings/security',  ensureAuthenticated, async (request: Request, response: Response) => {

  const { password, newPassword } = request.body;

  const updatePasswordUse = new UpdatePasswordUserService();

  const user = await updatePasswordUse.execute({
    user_id: request.user.id,
    password,
    newPassword,
  });

  delete user.password;

  return response.json(user);
})

export { usersRouter };
