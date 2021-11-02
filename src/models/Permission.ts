import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("permissions")
class Permission extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}

export { Permission }
