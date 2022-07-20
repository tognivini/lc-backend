import { GetAllLaundrysDto } from "../../../../application/dto/laundryDto/_index";
import { LaundryModel } from "../../../../models/LaundryModel";
import { IBaseRepository } from "./base/IBaseRepository";

export interface ILaundryRepository extends IBaseRepository<LaundryModel> {
  getAvailablelaundrys(request: GetAllLaundrysDto): Promise<LaundryModel[]>;
  getAllPagging(request: GetAllLaundrysDto): Promise<LaundryModel[]>;
}
