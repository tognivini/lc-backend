import { HttpResponse } from '../../../../utils/commons/protocols/Http';
import { GetAvailableHoursDto } from '../../../../application/dto/scheduleDto/_index'

export interface IGetAvailableHoursUseCase {
  execute: (
    filter: GetAvailableHoursDto
  ) => Promise<HttpResponse<Object[]>>
}
