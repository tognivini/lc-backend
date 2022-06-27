import { inject, injectable } from 'inversify'

import { ILaundryRepository, IUserRepository } from '../../../domain/interfaces/repositories/database/_index'

import { ICreateLaundryUseCase } from '../../../domain/interfaces/useCases/laundry/_index'
import { LaundryModel, UserModel } from '../../../models/_index'
import { TYPES_LAUNDRY, TYPES_USER } from '../../../main/inversify/types'
import { CreateLaundryDto } from '../../dto/laundryDto/_index'
import { HttpResponse } from '../../../utils/commons/protocols/Http';
import { badRequest, ok } from '../../../utils/commons/http/HttpHelper'
import { UserMessages } from '../../../utils/commons/messages/_index'
@injectable()
export class CreateLaundryUseCase implements ICreateLaundryUseCase {
  constructor(
    @inject(TYPES_LAUNDRY.ILaundryRepository)
    private readonly _repositoryLaundry: ILaundryRepository,

    @inject(TYPES_USER.IUserRepository)
    private readonly _repositoryUser: IUserRepository,
  ) {}

  async execute(
    payload: CreateLaundryDto
  ): Promise<HttpResponse<LaundryModel>> {
    
    let responsible = new UserModel()
    if(payload?.responsible){
      const userFinded = await this._repositoryUser.findById(payload?.responsible?.id)
      if (!userFinded?.id){
        return badRequest(UserMessages.ERROR_USER_NOT_FOUND)
      } else {
        responsible = userFinded
      }
    }
    
    const laundry = new LaundryModel()
    
    laundry.name = payload.name
    laundry.address = payload.address
    laundry.responsible = responsible
    const laundryInserted = await this._repositoryLaundry.add(laundry)

    return ok(laundryInserted)
  }
}
