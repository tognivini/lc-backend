import { HttpResponse } from './../../../../utils/commons/protocols/Http';
import { GetAllLaundrysDto } from '../../../../application/dto/laundryDto/_index'
import { LaundryModel } from '../../../../models/_index'

export interface IGetAllLaundrysUseCase {
  execute: (
    filter: GetAllLaundrysDto
  ) => Promise<HttpResponse<LaundryModel[]>>
}
