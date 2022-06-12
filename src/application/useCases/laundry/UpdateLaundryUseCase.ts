import { LaundryModel } from './../../../models/_index';
import { inject, injectable } from 'inversify'

import { UpdateUserDto } from '../../../application/dto/userDto/_index'
import {
  ILaundryRepository,
} from '../../../domain/interfaces/repositories/database/_index'
import { IUpdateLaundryUseCase } from '../../../domain/interfaces/useCases/laundry/IUpdateLaundryUseCase'
import { TYPES_LAUNDRY } from '../../../main/inversify/types';
import { ok, badRequest } from '../../../utils/commons/http/HttpHelper';
import { LaundryMessages } from '../../../utils/commons/messages/LaundryMessagesResources';
import { HttpResponse } from '../../../utils/commons/protocols/Http';
@injectable()
export class UpdateLaundryUseCase implements IUpdateLaundryUseCase {
  constructor(
    @inject(TYPES_LAUNDRY.ILaundryRepository)
    private readonly _repositoryLaundry: ILaundryRepository
  ) {}

  async execute(
    id: string,
    dto: UpdateUserDto
  ): Promise<HttpResponse<LaundryModel>> {
    const laundryFinded = await this._repositoryLaundry.findById(id)
    if (!laundryFinded?.id){
      return badRequest(LaundryMessages.ERROR_LAUNDRY_NOT_FOUND)
    }

    laundryFinded.name =  dto.name

    await this._repositoryLaundry.update(id, laundryFinded)

    return ok(laundryFinded)
  }
}
