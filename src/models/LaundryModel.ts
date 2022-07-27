import { WashMachineModel } from './WashMachineModel';
import { Entity, Column, OneToOne, JoinColumn, OneToMany, ManyToOne, ManyToMany } from "typeorm";
import { ModelBase } from "./base/ModelBase";
import { ScheduleModel, UserModel } from "./_index";


@Entity("laundry")
export class LaundryModel extends ModelBase {
  @Column({ name: "name", nullable: false })
  name: string;

  @Column({ name: "address", nullable: false })
  address: string;

  @Column({ name: "cep", nullable: false })
  cep: string;

  @OneToOne(() => UserModel, { nullable: true })
  @JoinColumn({ name: 'responsible_id'})
  responsible: UserModel

  @OneToMany(() => WashMachineModel, (washMachines) => washMachines.laundry)
  washMachines: WashMachineModel[]

  @OneToMany(() => ScheduleModel, (schedule) => schedule.laundry)
  schedule: ScheduleModel[]
}

