import { UserModel } from './../../../models/UserModel';
import { inject, injectable } from 'inversify'

import { UpdateUserDto } from '../../../application/dto/userDto/_index'
import {
  IUserRepository,
} from '../../../domain/interfaces/repositories/database/_index'
import { TYPES_USER } from '../../../main/inversify/types';
import { okNoDataToReturn, badRequest } from '../../../utils/commons/http/HttpHelper';
import { UserMessages } from '../../../utils/commons/messages/UserMessagesResources';
import { HttpResponse } from '../../../utils/commons/protocols/Http';
import { IDeleteUserUseCase } from '../../../domain/interfaces/useCases/user/_index';
@injectable()
export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly _repositoryUser: IUserRepository
  ) {}

  async execute(
    id: string,
  ): Promise<HttpResponse<UserModel>> {
    const userFinded = await this._repositoryUser.findById(id)
    if (!userFinded?.id){
      return badRequest(UserMessages.ERROR_USER_NOT_FOUND)
    }
    await this._repositoryUser.delete(id)
    return okNoDataToReturn(UserMessages.USER_DELETED)
  }
}
