import { LaundryModel,  } from "../../../models/_index";

export class UpdateWashMachineDto {
  public washMachineId?: string;
  public model: string;
  public number: number;
  public inOpperation: boolean;
  // public laundry: LaundryModel;
}
