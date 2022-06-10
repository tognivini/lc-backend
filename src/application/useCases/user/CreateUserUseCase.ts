import { inject, injectable } from 'inversify'

import { IUserRepository } from '../../../domain/interfaces/repositories/database/_index'

import { ICreateUserUseCase } from '../../../domain/interfaces/useCases/user/_index'
import { UserModel } from '../../../models/_index'
import { TYPES_USER } from '../../../main/inversify/types'
import { CreateUserDto } from '../../dto/userDto/_index'
@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly repositoryUser: IUserRepository
  ) {}

  async execute(
    payload: CreateUserDto
  ): Promise<UserModel> {
    // const dateStart = new Date(dto.startDate)
    // const dateEnd = new Date(dto.endDate)
  
    const user = new UserModel()
    user.email = payload.email
    user.phoneNumber = payload.phoneNumber
    user.name = payload.name
    user.password = payload.password

    // const searchConsultant = await this.repositoryUser.findById(
    //   dto.consultantId
    // )
    // if (!searchConsultant)
    //   return badRequest(userMessages.ERROR_USER_NOT_FOUND)

    const userInserted = await this.repositoryUser.add(user)
    return userInserted
  }
}
