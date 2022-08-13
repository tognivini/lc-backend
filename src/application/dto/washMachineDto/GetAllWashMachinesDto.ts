import { LaundryModel } from "../../../models/_index";

export class GetAllWashMachinesDto {
  public washMachineId?: string
  public laundryId?: string;
  public model?: string;
  public number?: number;
  public inOpperation?: boolean;
  public laundry: LaundryModel;
}
