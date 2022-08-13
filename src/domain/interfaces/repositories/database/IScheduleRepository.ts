import { GetAllSchedulesDto, GetAvailableHoursDto } from '../../../../application/dto/scheduleDto/_index';
import { ScheduleModel } from '../../../../models/ScheduleModel';
import { IBaseRepository } from './base/IBaseRepository'

export interface IScheduleRepository
  extends IBaseRepository<ScheduleModel> {
    getAvailableHoursPagging(
      request: GetAvailableHoursDto
    ): Promise<ScheduleModel[]>

    getAllPagging(
      request: GetAllSchedulesDto
    ): Promise<ScheduleModel[]>
}
