import { Request, Response, Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateUserAccessControlListService } from '../services/access_control/CreateUserAccessControlListService';

const accessControlRouter = Router();

accessControlRouter.post('/', ensureAuthenticated, async (request: Request, response: Response) => {

  const user_id = request.user.id;
  const { roles, permissions } = request.body;

  const createACL = new CreateUserAccessControlListService();

  const user_ACL = await createACL.execute(
    {
      id: user_id,
      roles,
      permissions
    });

  return response.json(user_ACL)

})

export { accessControlRouter };

