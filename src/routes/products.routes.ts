import { Request, Response, Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { can, is } from '../middlewares/permissions';
import { CreateProductService } from '../services/products/CreateProductService'
import { SearchProductsService } from '../services/products/SearchProductService'

const productsRouter = Router();

productsRouter.post('/', ensureAuthenticated, can(["create_product"]), is(["Advanced User"]), async (request: Request, response: Response) => {

  const { name, description, price } = request.body;

  const createProduct = new CreateProductService();

  const product = await createProduct.execute({ name, description, price })

  return response.json(product)

})


// Rota responsável por listar todos os produtos
productsRouter.get('/', ensureAuthenticated, async (request: Request, response: Response) => {

  const findProduct = new SearchProductsService();
  const product = await findProduct.search();

  return response.json(product);

})

export { productsRouter }
