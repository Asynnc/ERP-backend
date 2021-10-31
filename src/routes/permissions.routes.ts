import { Request, Response, Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreatePermissionService } from '../services/permissions/CreatePermissionService';

const permissionsRouter = Router();

permissionsRouter.post('/', ensureAuthenticated, async (request: Request, response: Response) => {

  const { name, description } = request.body;

  const createPermission = new CreatePermissionService();

  const product = await createPermission.execute({ name, description })

  return response.json(product)

})

export { permissionsRouter };

