import { inject, injectable } from 'inversify'

import { GetResponsiblesDto } from '../../../application/dto/userDto/_index'
import { IUserRepository } from '../../../domain/interfaces/repositories/database/_index'
import { IGetResponsiblesUseCase } from '../../../domain/interfaces/useCases/user/_index'
import { UserModel } from '../../../models/_index'
import { TYPES_USER } from '../../../main/inversify/types'

@injectable()
export class GetResponsiblesUseCase implements IGetResponsiblesUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(
    filter: GetResponsiblesDto
  ): Promise<UserModel[]> {
    const responsibles = await this._userRepository.getResponsibles(filter)
    return responsibles
  }
}
