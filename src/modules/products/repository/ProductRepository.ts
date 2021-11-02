import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../model/Product';

@EntityRepository(Product)
class ProductRepository extends Repository<Product>{

  public async findByName(name: string): Promise<Product | null> {

    const findProduct = await this.findOne({
      where: { name }
    });

    return findProduct || null;
  }

}

export { ProductRepository };
