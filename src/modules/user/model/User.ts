import {
  Entity,
  Column,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { BaseEntity } from '../../base/model/BaseEntity';
import { Permission } from '../../permissions/model/Permission';
import { Role } from '../../roles/model/Role';




@Entity('users')
class User extends BaseEntity {

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: "users_roles",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "role_id" }],
  })
  roles: Role[];

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "users_permissions",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "permission_id" }],
  })
  permissions: Permission[];

}

export { User }
