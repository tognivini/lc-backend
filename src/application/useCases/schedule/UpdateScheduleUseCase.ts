import { ScheduleModel, UserModel } from '../../../models/_index';
import { inject, injectable } from 'inversify'

import { UpdateScheduleDto } from '../../dto/scheduleDto/_index'
import {
  IScheduleRepository, IUserRepository,
} from '../../../domain/interfaces/repositories/database/_index'
import { IUpdateScheduleUseCase } from '../../../domain/interfaces/useCases/schedule/IUpdateScheduleUseCase'
import { TYPES_SCHEDULE, TYPES_USER } from '../../../main/inversify/types';
import { ok, badRequest } from '../../../utils/commons/http/HttpHelper';
// import { ScheduleMessages } from '../../../utils/commons/messages/ScheduleMessagesResources';
import { HttpResponse } from '../../../utils/commons/protocols/Http';
import { ScheduleMessages, UserMessages } from '../../../utils/commons/messages/_index';
@injectable()
export class UpdateScheduleUseCase implements IUpdateScheduleUseCase {
  constructor(
    @inject(TYPES_SCHEDULE.IScheduleRepository)
    private readonly _repositorySchedule: IScheduleRepository,
  ) {}

  async execute(
    id: string,
    payload: UpdateScheduleDto
  ): Promise<HttpResponse<ScheduleModel>> {
    const ScheduleFinded = await this._repositorySchedule.findById(id)
    if (!ScheduleFinded?.id){
      return badRequest(ScheduleMessages.ERROR_SCHEDULE_NOT_FOUND)
    }
    ScheduleFinded.situation =  payload.situation
    await this._repositorySchedule.update(id, ScheduleFinded)

    return ok(ScheduleFinded)
  }
}
