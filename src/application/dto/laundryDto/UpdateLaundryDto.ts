import { UserModel } from "../../../models/_index";

export class UpdateLaundryDto {
  public laundryId?: string;
  public name: string;
  public address: string;
  public cep: string;
  public responsible: UserModel;
}
