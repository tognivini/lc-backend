import { Entity, OneToOne, JoinColumn } from "typeorm";
import { ModelBase } from "./base/ModelBase";
import { PermissionsModel } from "./PermissionsModel";
import { UserModel } from "./UserModel";

@Entity("user_permissions")
export class UserPermissionsModel extends ModelBase {
  @OneToOne(() => UserModel,  { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserModel

  @OneToOne(() => PermissionsModel)
  @JoinColumn({ name: 'permission' })
  Permission: PermissionsModel
}

