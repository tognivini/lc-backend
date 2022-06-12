import { GetAllWashMachinesDto } from '../../../../application/dto/washMachineDto/_index';
import { WashMachineModel } from '../../../../models/WashMachineModel';
import { IBaseRepository } from './base/IBaseRepository'

export interface IWashMachineRepository
  extends IBaseRepository<WashMachineModel> {
    getAllPagging(
      request: GetAllWashMachinesDto
    ): Promise<WashMachineModel[]>
}
