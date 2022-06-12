import { HttpResponse } from '../../../../utils/commons/protocols/Http';
import { WashMachineModel } from '../../../../models/_index'
import { UpdateWashMachineDto } from '../../../../application/dto/washMachineDto/UpdateWashMachinesDto';

export interface IUpdateWashMachineUseCase {
  execute: (
    id: string,
    dto: UpdateWashMachineDto
  ) => Promise<HttpResponse<WashMachineModel>>
}
