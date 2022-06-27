import { HttpResponse } from '../../../../utils/commons/protocols/Http';
import { ScheduleModel } from '../../../../models/_index'
import { UpdateScheduleDto } from '../../../../application/dto/scheduleDto/UpdateScheduleDto';

export interface IUpdateScheduleUseCase {
  execute: (
    id: string,
    dto: UpdateScheduleDto
  ) => Promise<HttpResponse<ScheduleModel>>
}
