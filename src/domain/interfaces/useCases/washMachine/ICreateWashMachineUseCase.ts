import { HttpResponse } from './../../../../utils/commons/protocols/Http';
import { CreateWashMachineDto } from './../../../../application/dto/washMachineDto/CreateWashMachineDto';
import { WashMachineModel } from '../../../../models/_index'

export interface ICreateWashMachineUseCase {
  execute: (
    payload: CreateWashMachineDto
  ) => Promise<HttpResponse<WashMachineModel>>
}
