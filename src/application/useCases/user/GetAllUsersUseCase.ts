import { inject, injectable } from 'inversify'

import { GetAllUsersDto } from '../../../application/dto/userDto/_index'
import { IUserRepository } from '../../../domain/interfaces/repositories/database/_index'
import { IGetAllUsersUseCase } from '../../../domain/interfaces/useCases/user/_index'
import { UserModel } from '../../../models/_index'
import { TYPES_USER } from '../../../main/inversify/types'
// import * as contextRequest from '../../../utils/context/ContextRequest'

@injectable()
export class GetAllUsersUseCase implements IGetAllUsersUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(
    filter: GetAllUsersDto
  ): Promise<UserModel[]> {
    // const user = await this._findUserById.execute(
    //   contextRequest.getAuthUser().id
    // )
    return await this._userRepository.getAllPagging(filter)
  }
}
