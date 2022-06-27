import { LaundryModel, UserModel } from './../../../models/_index';
import { inject, injectable } from 'inversify'

import { UpdateLaundryDto } from '../../../application/dto/laundryDto/_index'
import {
  ILaundryRepository, IUserRepository,
} from '../../../domain/interfaces/repositories/database/_index'
import { IUpdateLaundryUseCase } from '../../../domain/interfaces/useCases/laundry/IUpdateLaundryUseCase'
import { TYPES_LAUNDRY, TYPES_USER } from '../../../main/inversify/types';
import { ok, badRequest } from '../../../utils/commons/http/HttpHelper';
import { LaundryMessages } from '../../../utils/commons/messages/LaundryMessagesResources';
import { HttpResponse } from '../../../utils/commons/protocols/Http';
import { UserMessages } from '../../../utils/commons/messages/_index';
@injectable()
export class UpdateLaundryUseCase implements IUpdateLaundryUseCase {
  constructor(
    @inject(TYPES_LAUNDRY.ILaundryRepository)
    private readonly _repositoryLaundry: ILaundryRepository,

    @inject(TYPES_USER.IUserRepository)
    private readonly _repositoryUser: IUserRepository
  ) {}

  async execute(
    id: string,
    payload: UpdateLaundryDto
  ): Promise<HttpResponse<LaundryModel>> {
    const laundryFinded = await this._repositoryLaundry.findById(id)
    if (!laundryFinded?.id){
      return badRequest(LaundryMessages.ERROR_LAUNDRY_NOT_FOUND)
    }

    let responsible = new UserModel()
    if(payload?.responsible){
      const userFinded = await this._repositoryUser.findById(payload?.responsible?.id)
      if (!userFinded?.id){
        return badRequest(UserMessages.ERROR_USER_NOT_FOUND)
      } else {
        responsible = userFinded
      }
    }

    laundryFinded.name =  payload.name
    laundryFinded.address =  payload.address
    //verificar se usuário é bolsista
    if(payload?.responsible){
      laundryFinded.responsible = responsible
    }
    await this._repositoryLaundry.update(id, laundryFinded)

    return ok(laundryFinded)
  }
}
