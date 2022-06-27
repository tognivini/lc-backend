import { inject, injectable } from 'inversify'

import { IWashMachineRepository, ILaundryRepository } from '../../../domain/interfaces/repositories/database/_index'

import { ICreateWashMachineUseCase } from '../../../domain/interfaces/useCases/washMachine/_index'
import { WashMachineModel, LaundryModel,  } from '../../../models/_index'
import { TYPES_WASH_MACHINE, TYPES_LAUNDRY } from '../../../main/inversify/types'
import { CreateWashMachineDto } from '../../dto/washMachineDto/_index'
import { HttpResponse } from '../../../utils/commons/protocols/Http';
import { badRequest, ok } from '../../../utils/commons/http/HttpHelper'
import { LaundryMessages } from '../../../utils/commons/messages/_index'
@injectable()
export class CreateWashMachineUseCase implements ICreateWashMachineUseCase {
  constructor(
    @inject(TYPES_WASH_MACHINE.IWashMachineRepository)
    private readonly _repositoryWashMachine: IWashMachineRepository,

    @inject(TYPES_LAUNDRY.ILaundryRepository)
    private readonly _repositoryLaundry: ILaundryRepository,
  ) {}

  async execute(
    payload: CreateWashMachineDto
  ): Promise<HttpResponse<WashMachineModel>> {
    
    let laundry = new LaundryModel()
    if(payload?.laundry){
      const LaundryFinded = await this._repositoryLaundry.findById(payload?.laundry?.id)
      if (!LaundryFinded?.id){
        return badRequest(LaundryMessages.ERROR_LAUNDRY_NOT_FOUND)
      } else {
        laundry = LaundryFinded
      }
    }
    
    const washMachine = new WashMachineModel()
    
    washMachine.model = payload.model
    washMachine.number = payload.number
    washMachine.inOpperation = payload.inOpperation
    washMachine.laundry = laundry
    const washMachineInserted = await this._repositoryWashMachine.add(washMachine)

    return ok(washMachineInserted)
  }
}
