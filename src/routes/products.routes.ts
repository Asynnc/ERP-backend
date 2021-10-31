import { Router } from 'express'
import { CreateProductService } from '../services/products/CreateProductService'

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {

  const { name, description, price } = request.body;

  const productService = new CreateProductService();

  const product = productService.execute({
    name,
    description,
    price
  })

  return response.json(product);

})

export { sessionsRouter }
