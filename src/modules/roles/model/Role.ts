import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "../../base/model/BaseEntity";
import { Permission } from "../../permissions/model/Permission";



@Entity("roles")
class Role extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "permissions_roles",
    joinColumns: [{ name: "role_id" }],
    inverseJoinColumns: [{ name: "permission_id" }],
  })
  permissions: Permission[];
}

export { Role }
