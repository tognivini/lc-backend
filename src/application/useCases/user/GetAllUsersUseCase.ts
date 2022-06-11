import { inject, injectable } from 'inversify'

import { GetAllUsersDto } from '../../../application/dto/userDto/_index'
import { IUserRepository } from '../../../domain/interfaces/repositories/database/_index'
import { IGetAllUsersUseCase } from '../../../domain/interfaces/useCases/user/_index'
import { UserModel } from '../../../models/_index'
import { TYPES_USER } from '../../../main/inversify/types'

@injectable()
export class GetAllUsersUseCase implements IGetAllUsersUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(
    filter: GetAllUsersDto
  ): Promise<UserModel[]> {
    return await this._userRepository.getAllPagging(filter)
  }
}
