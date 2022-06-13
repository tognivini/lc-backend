import { SituationScheduleEnum } from "../../../domain/enums/baseEnums/_index";
import { LaundryModel, UserModel, WashMachineModel } from "../../../models/_index";

export class GetAllSchedulesDto {
  public date: Date;
  public startHour: string;
  public endHour?: string;
  public situation: SituationScheduleEnum;
  public laundry: LaundryModel;
  public washMachine: WashMachineModel;
  public responsible: UserModel;
  public client: UserModel;
}
