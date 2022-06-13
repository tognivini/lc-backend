import { Entity, Column, OneToOne, JoinColumn, ManyToOne, ManyToMany, OneToMany } from "typeorm";
import { ModelBase } from "./base/ModelBase";
import { LaundryModel } from "./LaundryModel";
import { ScheduleModel } from "./_index";


@Entity("wash_machine")
export class WashMachineModel extends ModelBase {
  @Column({ name: "model", nullable: false })
  model: string;

  @Column({ name: "number", nullable: false })
  number: number;

  @Column({ name: "in_opperation", nullable: false })
  inOpperation: boolean;

  @ManyToOne(() => LaundryModel, (laundry) => laundry.washMachines, { nullable: false })
  @JoinColumn({ name: 'laundry_id'})
  laundry: LaundryModel

  @OneToMany(() => ScheduleModel, (schedule) => schedule.laundry)
  schedule: ScheduleModel[]
}

