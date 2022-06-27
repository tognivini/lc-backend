import { HttpResponse } from '../../../utils/commons/protocols/Http';
import { inject, injectable } from 'inversify'

import { GetAllSchedulesDto } from '../../dto/scheduleDto/_index'
import { IGetAllSchedulesUseCase } from '../../../domain/interfaces/useCases/schedule/_index'
import { ScheduleModel } from '../../../models/_index'
import { TYPES_SCHEDULE } from '../../../main/inversify/types'
import { IScheduleRepository } from '../../../domain/interfaces/repositories/database/_index'
import { ok } from '../../../utils/commons/http/HttpHelper';

@injectable()
export class GetAllSchedulesUseCase implements IGetAllSchedulesUseCase {
  constructor(
    @inject(TYPES_SCHEDULE.IScheduleRepository)
    private readonly _scheduleRepository: IScheduleRepository,
  ) {}

  async execute(
    filter: GetAllSchedulesDto
  ): Promise<HttpResponse<ScheduleModel[]>> {
    const schedules = await this._scheduleRepository.getAllPagging(filter)
    return ok(schedules)
  }
}
