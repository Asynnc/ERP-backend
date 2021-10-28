import { Router } from 'express'
import { logRequest } from '../middlewares/logRequest'
import { usersRouter } from './users.routes'

const routes = Router();

routes.use(logRequest);
routes.use('/users', usersRouter)

export { routes }