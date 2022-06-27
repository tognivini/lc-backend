import { HttpResponse } from './../../../../utils/commons/protocols/Http';
import { CreateLaundryDto } from './../../../../application/dto/laundryDto/CreateLaundryDto';
import { LaundryModel } from '../../../../models/_index'

export interface ICreateLaundryUseCase {
  execute: (
    payload: CreateLaundryDto
  ) => Promise<HttpResponse<LaundryModel>>
}
