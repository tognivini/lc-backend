import { WashMachineModel } from './WashMachineModel';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { ModelBase } from "./base/ModelBase";
import { UserModel } from "./_index";


@Entity("laundry")
export class LaundryModel extends ModelBase {
  @Column({ name: "name", nullable: false })
  name: string;

  @Column({ name: "address", nullable: false })
  address: string;

  @OneToOne(() => UserModel, { nullable: true })
  @JoinColumn({ name: 'responsible_id'})
  responsible: UserModel

  @OneToMany(() => WashMachineModel, (washMachines) => washMachines.laundry)
  washMachines: WashMachineModel[]
}

