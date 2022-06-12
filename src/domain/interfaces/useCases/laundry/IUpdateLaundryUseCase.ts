import { HttpResponse } from './../../../../utils/commons/protocols/Http';
import { LaundryModel } from '../../../../models/_index'
import { UpdateLaundryDto } from '../../../../application/dto/laundryDto/UpdateLaundryDto';

export interface IUpdateLaundryUseCase {
  execute: (
    id: string,
    dto: UpdateLaundryDto
  ) => Promise<HttpResponse<LaundryModel>>
}
