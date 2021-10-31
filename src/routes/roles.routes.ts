import { Request, Response, Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateRoleService } from '../services/roles/CreateRoleService';

const rolesRouter = Router();

rolesRouter.post('/', ensureAuthenticated, async (request: Request, response: Response) => {

  const { name, description } = request.body;

  const createRole = new CreateRoleService();

  const product = await createRole.execute({ name, description })

  return response.json(product)

})

export { rolesRouter };

