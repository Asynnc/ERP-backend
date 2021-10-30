import { Request, Response, Router } from 'express';
import UploadConfig from '../config/uploads';
import multer from 'multer';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateUserService } from '../services/users/CreateUserService';
import { SearchUserService } from '../services/users/SearchUserService';
import { UpdateAvatarUserService } from '../services/users/UpdateAvatarUserService';



const usersRouter = Router();

const upload = multer(UploadConfig);


// Rota responsável por criar um usuário
usersRouter.post('/', async (request, response) => {


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

usersRouter.get('/find/:id', ensureAuthenticated,  async (request: Request, response: Response) => {

  const { id } = request.params

  const findUser = new SearchUserService();
  const user = await findUser.searchByID({ id })

  delete user.password;

  return response.json(user)

})

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar') ,async (request: Request, response: Response) => {

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

export { usersRouter };
