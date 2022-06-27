import { HttpResponse } from '../../../../utils/commons/protocols/Http';
import { GetAllSchedulesDto } from '../../../../application/dto/scheduleDto/_index'
import { ScheduleModel } from '../../../../models/_index'

export interface IGetAllSchedulesUseCase {
  execute: (
    filter: GetAllSchedulesDto
  ) => Promise<HttpResponse<ScheduleModel[]>>
}
