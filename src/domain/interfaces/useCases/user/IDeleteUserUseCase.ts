import { HttpResponse } from './../../../../utils/commons/protocols/Http';
import { UserModel } from '../../../../models/_index'

export interface IDeleteUserUseCase {
  execute: (
    id: string,
  ) => Promise<HttpResponse<UserModel>>
}
