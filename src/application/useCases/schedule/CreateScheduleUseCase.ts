import { inject, injectable } from 'inversify'

import { ILaundryRepository, IScheduleRepository, IUserRepository, IWashMachineRepository } from '../../../domain/interfaces/repositories/database/_index'

import { ICreateScheduleUseCase } from '../../../domain/interfaces/useCases/schedule/_index'
import { LaundryModel, ScheduleModel, UserModel, WashMachineModel } from '../../../models/_index'
import { TYPES_LAUNDRY, TYPES_SCHEDULE, TYPES_USER, TYPES_WASH_MACHINE } from '../../../main/inversify/types'
import { CreateScheduleDto } from '../../dto/scheduleDto/_index'
import { HttpResponse } from '../../../utils/commons/protocols/Http';
import { SituationScheduleEnum } from './../../../domain/enums/baseEnums/SituationScheduleEnum';
import { badRequest, ok } from '../../../utils/commons/http/HttpHelper'
import { LaundryMessages, UserMessages, WashMachineMessages } from '../../../utils/commons/messages/_index'
@injectable()
export class CreateScheduleUseCase implements ICreateScheduleUseCase {
  constructor(
    @inject(TYPES_SCHEDULE.IScheduleRepository)
    private readonly _repositorySchedule: IScheduleRepository,

    @inject(TYPES_USER.IUserRepository)
    private readonly _repositoryUser: IUserRepository,

    @inject(TYPES_LAUNDRY.ILaundryRepository)
    private readonly _repositoryLaundry: ILaundryRepository,

    @inject(TYPES_WASH_MACHINE.IWashMachineRepository)
    private readonly _repositoryWashMachine: IWashMachineRepository,
  ) {}

  async execute(
    payload: CreateScheduleDto
  ): Promise<HttpResponse<ScheduleModel>> {
    
    let client = new UserModel()
    if(payload?.client){
      const userFinded = await this._repositoryUser.findById(payload?.client?.id)
      if (!userFinded?.id){
        return badRequest(UserMessages.ERROR_USER_NOT_FOUND)
      } else {
        client = userFinded
      }
    }

    let laundry = new LaundryModel()
    if(payload?.laundry){
      const LaundryFinded = await this._repositoryLaundry.findById(payload?.laundry?.id)
      if (!LaundryFinded?.id){
        return badRequest(LaundryMessages.ERROR_LAUNDRY_NOT_FOUND)
      } else {
        laundry = LaundryFinded
      }
    }

    let washMachine = new WashMachineModel()
    if(payload?.washMachine){
    const washMachineFinded = await this._repositoryWashMachine.findById(payload?.washMachine?.id)
    if (!washMachineFinded?.id){
      return badRequest(WashMachineMessages.ERROR_WASH_MACHINE_NOT_FOUND)
    } else if(washMachineFinded.inOpperation === false){
      return badRequest(WashMachineMessages.ERROR_WASH_MACHINE_NOT_IN_OPPERATION)
    } else {
      washMachine = washMachineFinded
    }
  }
    
    const schedule = new ScheduleModel()
    
    schedule.date = payload.date
    schedule.startHour = payload.startHour
    schedule.endHour = payload.endHour
    schedule.situation = SituationScheduleEnum.NAO_INICIADO
    schedule.laundry = laundry
    schedule.washMachine = washMachine
    schedule.responsible = laundry?.responsible
    schedule.client = client

    const scheduleInserted = await this._repositorySchedule.add(schedule)

    return ok(scheduleInserted)
  }
}
