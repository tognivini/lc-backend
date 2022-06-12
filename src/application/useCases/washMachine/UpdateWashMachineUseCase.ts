import { WashMachineModel, LaundryModel } from '../../../models/_index';
import { inject, injectable } from 'inversify'

import { UpdateWashMachineDto } from '../../dto/washMachineDto/_index'
import {
  IWashMachineRepository, ILaundryRepository,
} from '../../../domain/interfaces/repositories/database/_index'
import { IUpdateWashMachineUseCase } from '../../../domain/interfaces/useCases/washMachine/IUpdateWashMachineUseCase'
import { TYPES_WASH_MACHINE, TYPES_LAUNDRY } from '../../../main/inversify/types';
import { ok, badRequest } from '../../../utils/commons/http/HttpHelper';
import { HttpResponse } from '../../../utils/commons/protocols/Http';
import { LaundryMessages, WashMachineMessages } from '../../../utils/commons/messages/_index';
@injectable()
export class UpdateWashMachineUseCase implements IUpdateWashMachineUseCase {
  constructor(
    @inject(TYPES_WASH_MACHINE.IWashMachineRepository)
    private readonly _repositoryWashMachine: IWashMachineRepository,

    @inject(TYPES_LAUNDRY.ILaundryRepository)
    private readonly _repositoryLaundry: ILaundryRepository
  ) {}

  async execute(
    id: string,
    payload: UpdateWashMachineDto
  ): Promise<HttpResponse<WashMachineModel>> {
    const washMachineFinded = await this._repositoryWashMachine.findById(id)
    if (!washMachineFinded?.id){
      return badRequest(WashMachineMessages.ERROR_WASH_MACHINE_NOT_FOUND)
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
    washMachineFinded.model =  payload.model
    washMachineFinded.number =  payload.number
    washMachineFinded.inOpperation =  payload.inOpperation
    if(payload?.laundry){
      washMachineFinded.laundry = laundry
    }
    await this._repositoryWashMachine.update(id, washMachineFinded)

    return ok(washMachineFinded)
  }
}
