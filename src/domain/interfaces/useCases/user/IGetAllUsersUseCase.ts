import { GetAllUsersDto } from '../../../../application/dto/userDto/_index'
import { UserModel } from '../../../../models/_index'

export interface IGetAllUsersUseCase {
  execute: (
    filter: GetAllUsersDto
  ) => Promise<UserModel[]>
}
