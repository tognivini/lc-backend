import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { ModelBase } from "./base/ModelBase";
import { LaundryModel } from "./LaundryModel";


@Entity("wash_machine")
export class WashMachineModel extends ModelBase {
  @Column({ name: "model", nullable: false })
  model: string;

  @Column({ name: "number", nullable: false })
  number: number;

  @Column({ name: "in_opperation", nullable: false })
  inOpperation: boolean;

  @OneToOne(() => LaundryModel, { nullable: false })
  @JoinColumn({ name: 'laundry_id'})
  laundry: LaundryModel
}

