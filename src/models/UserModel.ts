import { Entity, Column, OneToOne } from "typeorm";
import { PermissionTypeEnum } from "../domain/enums/userEnums/_index";
import { ModelBase } from "./base/ModelBase";
import { EncryptionTransformer } from "typeorm-encrypted";
import { MyEncryptionTransformerConfig } from './base/encryption-config'


@Entity("user")
export class UserModel extends ModelBase {
  @Column({ name: "email", nullable: false })
  email: string;

  @Column({ name: "phone_number", nullable: false })
  phoneNumber: string;

  @Column({ name: "name", nullable: false })
  name: string;

  @Column({
    type: "varchar",
    nullable: false,
    name: "password",
    transformer: new EncryptionTransformer(MyEncryptionTransformerConfig)
  })
  password: string;
}

