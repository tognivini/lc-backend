import { HttpResponse } from './../../../../utils/commons/protocols/Http';
import { CreateUserDto } from './../../../../application/dto/userDto/CreateUserDto';
import { UserModel } from '../../../../models/_index'

export interface ICreateUserUseCase {
  execute: (
    payload: CreateUserDto
  ) => Promise<HttpResponse<UserModel>>
}
