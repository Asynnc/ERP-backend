import { Request, Response, Router } from 'express'
import { CreateProductService } from '../services/products/CreateProductService'

const productsRouter = Router();

productsRouter.post('/', async (request: Request, response: Response) => {

  const { name, description, price } = request.body;

  const createUser = new CreateProductService();

  const user = await createUser.execute({ name, description, price })

  return response.json(user)

})

export { productsRouter }
