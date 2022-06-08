import { Entity, Column, OneToOne } from "typeorm";
import { PermissionsTypeEnum } from "../domain/enums/baseEnums/_index";
import { ModelBase } from "./base/ModelBase";
import { UserModel } from "./UserModel";

@Entity("permissions")
export class PermissionsModel extends ModelBase {
  @Column({
    type: "varchar",
    nullable: true,
    name: "type",
  })
  type: PermissionsTypeEnum;
}

