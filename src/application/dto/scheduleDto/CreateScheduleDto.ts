import { SituationScheduleEnum } from "../../../domain/enums/baseEnums/_index";
import { UserModel } from "../../../models/UserModel";
import { LaundryModel, WashMachineModel } from "../../../models/_index";

export class CreateScheduleDto {
  public date: string;
  public startHour: string;
  public endHour?: string;
  public situation?: SituationScheduleEnum;
  public laundry: LaundryModel;
  public washMachine: WashMachineModel;
  public responsible: UserModel;
  public client: UserModel;
}
