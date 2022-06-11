import { HttpResponse } from './../../../../utils/commons/protocols/Http';
import { UpdateUserDto } from './../../../../application/dto/userDto/UpdateUserDto';
import { UserModel } from '../../../../models/_index'

export interface IUpdateUserUseCase {
  execute: (
    id: string,
    dto: UpdateUserDto
  ) => Promise<HttpResponse<UserModel>>
}
