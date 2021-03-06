import { UserModel } from './../../../../models/UserModel';
import { GetAllUsersDto } from './../../../../application/dto/userDto/_index';
import { IBaseRepository } from './base/IBaseRepository'

export interface IUserRepository
  extends IBaseRepository<UserModel> {
  getAllPagging(
    request: GetAllUsersDto
  ): Promise<UserModel[]>
  delete(id: string): Promise<void>

  findByEmail(email: string): Promise<UserModel>
}
