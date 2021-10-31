import { Request, Response, Router } from 'express'
import { CreateProductService } from '../services/products/CreateProductService'

const productsRouter = Router();

productsRouter.post('/', async (request: Request, response: Response) => {

  const { name, description, price } = request.body;

  const createProduct = new CreateProductService();

  const product = await createProduct.execute({ name, description, price })

  return response.json(product)

})

export { productsRouter }
