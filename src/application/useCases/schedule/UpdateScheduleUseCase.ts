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
import { UserMessages } from '../../../utils/commons/messages/_index';
@injectable()
export class UpdateScheduleUseCase implements IUpdateScheduleUseCase {
  constructor(
    @inject(TYPES_SCHEDULE.IScheduleRepository)
    private readonly _repositorySchedule: IScheduleRepository,

    @inject(TYPES_USER.IUserRepository)
    private readonly _repositoryUser: IUserRepository
  ) {}

  async execute(
    id: string,
    payload: UpdateScheduleDto
  ): Promise<HttpResponse<ScheduleModel>> {
    const ScheduleFinded = await this._repositorySchedule.findById(id)
    // if (!ScheduleFinded?.id){
    //   return badRequest(ScheduleMessages.ERROR_Schedule_NOT_FOUND)
    // }

    // let responsible = new UserModel()
    // if(payload?.responsible){
    //   const userFinded = await this._repositoryUser.findById(payload?.responsible?.id)
    //   if (!userFinded?.id){
    //     return badRequest(UserMessages.ERROR_USER_NOT_FOUND)
    //   } else {
    //     responsible = userFinded
    //   }
    // }

    // ScheduleFinded.name =  payload.name
    // ScheduleFinded.address =  payload.address
    // //verificar se usuário é bolsista
    // if(payload?.responsible){
    //   ScheduleFinded.responsible = responsible
    // }
    // await this._repositorySchedule.update(id, ScheduleFinded)

    return ok(ScheduleFinded)
  }
}
