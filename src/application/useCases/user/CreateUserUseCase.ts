import { inject, injectable } from 'inversify'

import { IUserPermissionsRepository, IUserRepository } from '../../../domain/interfaces/repositories/database/_index'

import { ICreateUserUseCase } from '../../../domain/interfaces/useCases/user/_index'
import { UserModel, UserPermissionsModel } from '../../../models/_index'
import { TYPES_USER, TYPES_USER_PERMISSIONS } from '../../../main/inversify/types'
import { CreateUserDto } from '../../dto/userDto/_index'
import { PermissionsTypeEnum } from '../../../domain/enums/baseEnums/PermissionsTypeEnum'
import { HttpResponse } from './../../../utils/commons/protocols/Http';
import { ok } from '../../../utils/commons/http/HttpHelper'
@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly _repositoryUser: IUserRepository,

    @inject(TYPES_USER_PERMISSIONS.IUserPermissionsRepository)
    private readonly _repositoryUserPermissions: IUserPermissionsRepository
  ) {}

  async execute(
    payload: CreateUserDto
  ): Promise<HttpResponse<UserModel>> {
    const user = new UserModel()
    user.email = payload.email
    user.phoneNumber = payload.phoneNumber
    user.name = payload.name
    user.password = payload.password

    const userInserted = await this._repositoryUser.add(user)

    const userPermissions = new UserPermissionsModel()
    userPermissions.user = userInserted
    userPermissions.type = PermissionsTypeEnum.CLIENTE

    await this._repositoryUserPermissions.add(userPermissions)
    return ok(userInserted)
  }
}
