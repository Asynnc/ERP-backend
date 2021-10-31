import { Product } from '../../models/Product'
import { getRepository } from "typeorm";
import AppError from '../../errors/AppError';

type ProductRequest = {
  name: string;
  description: string;
  price: number;
};

class CreateProductService {
  async execute({ name, description, price }: ProductRequest) {
    const productRepository = getRepository(Product);

    const productExists = await productRepository.findOne({
      where: { name }
    })

    if (!productExists) {
      throw new AppError('Product does not exists', 404)
    }

    const product = productRepository.create({
      name,
      description,
      price
    })

    await productRepository.save(product)

    return product;
  }
}

export { CreateProductService }
