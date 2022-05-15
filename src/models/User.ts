import { Entity, Column } from "typeorm";
import { PermissionTypeEnum } from "../domain/enums/userEnums/_index";
import { ModelBase } from "./base/ModelBase";

@Entity("user")
export class User extends ModelBase {
  @Column({ name: "email", nullable: false })
  email: string;

  @Column({ name: "phone_number", nullable: false })
  phoneNumber: string;

  @Column({ name: "name", nullable: false })
  name: number;

  @Column({ name: "type_person", nullable: false })
  password: string;

  @Column({
    type: "varchar",
    nullable: true,
    name: "permission",
  })
  permission: PermissionTypeEnum;
}
