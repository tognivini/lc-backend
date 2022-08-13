import { Entity, Column, OneToOne, JoinColumn, ManyToMany, CreateDateColumn, ManyToOne } from "typeorm";
import { ModelBase } from "./base/ModelBase";
import { SituationScheduleEnum } from "../domain/enums/baseEnums/_index";
import { LaundryModel, WashMachineModel } from "./_index";
import { UserModel } from "./UserModel";


@Entity("schedule")
export class ScheduleModel extends ModelBase {
  @CreateDateColumn({ name: 'date', nullable: false })
  date: string

  @Column({ name: "start_hour", nullable: false })
  startHour: string;

  @Column({ name: "end_hour", nullable: true })
  endHour: string;

  @Column({
    type: "varchar",
    nullable: true,
    name: "situation",
  })
  situation: SituationScheduleEnum;

  @ManyToOne(() => LaundryModel, (laundry) => laundry.schedule, { nullable: false })
  @JoinColumn({ name: 'laundry_id'})
  laundry: LaundryModel

  @ManyToOne(() => WashMachineModel, (washMachine) => washMachine.schedule, { nullable: false })
  @JoinColumn({ name: 'wash_machine_id'})
  washMachine: WashMachineModel

  @ManyToOne(() => UserModel, (responsible) => responsible.schedule, { nullable: false })
  @JoinColumn({ name: 'responsible_id'})
  responsible: UserModel

  @ManyToOne(() => UserModel, (client) => client.schedule, { nullable: false })
  @JoinColumn({ name: 'client_id'})
  client: UserModel
}

