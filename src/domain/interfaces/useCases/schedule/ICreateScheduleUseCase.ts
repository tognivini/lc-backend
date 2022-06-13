import { HttpResponse } from '../../../../utils/commons/protocols/Http';
import { CreateScheduleDto } from '../../../../application/dto/scheduleDto/CreateScheduleDto';
import { ScheduleModel } from '../../../../models/_index'

export interface ICreateScheduleUseCase {
  execute: (
    payload: CreateScheduleDto
  ) => Promise<HttpResponse<ScheduleModel>>
}
