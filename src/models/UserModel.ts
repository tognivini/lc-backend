import { LaundryModel } from './LaundryModel';
import { UserPermissionsModel } from './UserPermissionsModel';
import { Entity, Column, OneToOne, ManyToMany, OneToMany } from "typeorm";
import { ModelBase } from "./base/ModelBase";
import { EncryptionTransformer } from "typeorm-encrypted";
import { MyEncryptionTransformerConfig } from './base/encryption-config'
import { ScheduleModel } from "./_index";


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

  @OneToMany(() => ScheduleModel, (schedule) => schedule.laundry)
  schedule: ScheduleModel[]

  @OneToOne(() => UserPermissionsModel, (userPermission) => userPermission.user)
  userPermission: UserPermissionsModel

  @OneToMany(() => LaundryModel, (laundry) => laundry.responsible)
  laundry: LaundryModel[]
}

