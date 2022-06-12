import { WashMachineModel, UserModel } from '../../../models/_index';
import { inject, injectable } from 'inversify'

import { UpdateWashMachineDto } from '../../dto/washMachineDto/_index'
import {
  IWashMachineRepository, IUserRepository,
} from '../../../domain/interfaces/repositories/database/_index'
import { IUpdateWashMachineUseCase } from '../../../domain/interfaces/useCases/washMachine/IUpdateWashMachineUseCase'
import { TYPES_WASH_MACHINE, TYPES_USER } from '../../../main/inversify/types';
import { ok, badRequest } from '../../../utils/commons/http/HttpHelper';
// import { WashMachineMessages } from '../../../utils/commons/messages/washMachineMessagesResources';
import { HttpResponse } from '../../../utils/commons/protocols/Http';
import { UserMessages } from '../../../utils/commons/messages/_index';
@injectable()
export class UpdateWashMachineUseCase implements IUpdateWashMachineUseCase {
  constructor(
    @inject(TYPES_WASH_MACHINE.IWashMachineRepository)
    private readonly _repositoryWashMachine: IWashMachineRepository,

    @inject(TYPES_USER.IUserRepository)
    private readonly _repositoryUser: IUserRepository
  ) {}

  async execute(
    id: string,
    payload: UpdateWashMachineDto
  ): Promise<HttpResponse<WashMachineModel>> {
    const WashMachineFinded = await this._repositoryWashMachine.findById(id)
    // if (!WashMachineFinded?.id){
    //   return badRequest(WashMachineMessages.ERROR_WashMachine_NOT_FOUND)
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

    // WashMachineFinded.name =  payload.name
    // WashMachineFinded.address =  payload.address
    //verificar se usuário é bolsista
    // if(payload?.responsible){
    //   WashMachineFinded.responsible = responsible
    // }
    await this._repositoryWashMachine.update(id, WashMachineFinded)

    return ok(WashMachineFinded)
  }
}
