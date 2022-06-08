import { PermissionsModel } from './PermissionsModel';
import { Entity, Column, OneToOne } from "typeorm";
import { PermissionTypeEnum } from "../domain/enums/userEnums/_index";
import { ModelBase } from "./base/ModelBase";

@Entity("user")
export class UserModel extends ModelBase {
  @Column({ name: "email", nullable: false })
  email: string;

  @Column({ name: "phone_number", nullable: false })
  phoneNumber: string;

  @Column({ name: "name", nullable: false })
  name: number;

  @Column({ name: "type_person", nullable: false })
  password: string;

  // @OneToOne(
  //   () => PermissionsModel,
  //   (Permissions) => Permissions.user
  // )
  // permissions: PermissionsModel
  // //criar relação com tabela permissao
  // @Column({
  //   type: "varchar",
  //   nullable: true,
  //   name: "permission",
  // })
  // permission: PermissionTypeEnum;
}

