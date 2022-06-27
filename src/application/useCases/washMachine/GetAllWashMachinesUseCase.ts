import { HttpResponse } from '../../../utils/commons/protocols/Http';
import { inject, injectable } from 'inversify'

import { GetAllWashMachinesDto } from '../../dto/washMachineDto/_index'
import { IGetAllWashMachinesUseCase } from '../../../domain/interfaces/useCases/washMachine/_index'
import { WashMachineModel } from '../../../models/_index'
import { TYPES_WASH_MACHINE } from '../../../main/inversify/types'
import { ok } from '../../../utils/commons/http/HttpHelper';
import { IWashMachineRepository } from '../../../domain/interfaces/repositories/database/_index';

@injectable()
export class GetAllWashMachinesUseCase implements IGetAllWashMachinesUseCase {
  constructor(
    @inject(TYPES_WASH_MACHINE.IWashMachineRepository)
    private readonly _WashMachineRepository: IWashMachineRepository,
  ) {}

  async execute(
    filter: GetAllWashMachinesDto
  ): Promise<HttpResponse<WashMachineModel[]>> {
    const washMachines = await this._WashMachineRepository.getAllPagging(filter)
    return ok(washMachines)
  }
}
