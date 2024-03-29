
import { getRepository } from "typeorm";
import AppError from '../../../utils/errors/AppError';
import { Product } from "../model/Product";

type ProductRequest = {
  name: string;
  description: string;
  price: number;
};

class CreateProductService {
  async execute({ name, description, price }: ProductRequest): Promise<Product> {
    const productRepository = getRepository(Product);

    const productExists = await productRepository.findOne({
      where: { name }
    })

    if (productExists) {
      throw new AppError('Product already exists')
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

export { CreateProductService };

