import { HttpResponse } from '../../../../utils/commons/protocols/Http';
import { GetAllWashMachinesDto } from '../../../../application/dto/washMachineDto/_index'
import { WashMachineModel } from '../../../../models/_index'

export interface IGetAllWashMachinesUseCase {
  execute: (
    filter: GetAllWashMachinesDto
  ) => Promise<HttpResponse<WashMachineModel[]>>
}
