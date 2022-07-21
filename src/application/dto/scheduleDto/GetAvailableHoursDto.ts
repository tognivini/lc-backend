import { SituationScheduleEnum } from "../../../domain/enums/baseEnums/_index";

export class GetAvailableHoursDto {
  public date: Date;
  public startHour: string;
  public endHour?: string;
  public situation: SituationScheduleEnum;
  public laundryId: string;
  public washMachineId: string;
  public responsibleId: string;
  public clientId: string;
}