import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../base/model/BaseEntity";

@Entity("products")
class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;
}

export { Product };

