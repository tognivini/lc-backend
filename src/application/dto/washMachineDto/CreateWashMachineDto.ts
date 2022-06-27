import { LaundryModel } from "../../../models/LaundryModel";

export class CreateWashMachineDto {
  public model: string;
  public number: number;
  public inOpperation: boolean;
  public laundry: LaundryModel;
}
