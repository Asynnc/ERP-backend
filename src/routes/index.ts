import { Router } from 'express';
import { logRequest } from '../middlewares/logRequest';
import { usersRouter } from './users.routes';
import { sessionsRouter } from './sessions.routes';
import { productsRouter } from './products.routes';
import { rolesRouter } from './roles.routes';
import { permissionsRouter } from './permissions.routes';

const routes = Router();

routes.use(logRequest);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/products', productsRouter);
routes.use('/roles', rolesRouter)
routes.use('/permissions', permissionsRouter)




export { routes }
