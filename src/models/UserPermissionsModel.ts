import { Entity, OneToOne, JoinColumn, Column } from "typeorm";
import { PermissionsTypeEnum } from "../domain/enums/baseEnums/_index";
import { ModelBase } from "./base/ModelBase";
import { UserModel } from "./UserModel";

@Entity("user_permissions")
export class UserPermissionsModel extends ModelBase {
  @OneToOne(() => UserModel,  { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserModel

  @Column({
    type: "varchar",
    nullable: true,
    name: "type",
  })
  type: PermissionsTypeEnum;
}

