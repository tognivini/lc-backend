import { UserModel } from "../../../models/UserModel";

export class CreateLaundryDto {
  public name: string;
  public address: string;
  public responsible: UserModel;
  public cep: string;
}
