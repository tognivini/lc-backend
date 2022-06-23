import { inject, injectable } from 'inversify'
import { PermissionsTypeEnum } from '../../../domain/enums/baseEnums/_index'

import {
  IAccessTokenData,
  IAccessTokenGenerateUseCase,
} from '../../../domain/interfaces/useCases/auth/IAccessTokenGenerataUseCase'
import { ITokenJWTGenerateUseCase } from '../../../domain/interfaces/useCases/auth/ITokenJWTGenerateUseCase'
import {
  TYPES_AUTH,
} from '../../../main/inversify/types'
import { UserModel } from '../../../models/_index'

@injectable()
export class AccessTokenGenerateUseCase implements IAccessTokenGenerateUseCase {
  constructor(
    @inject(TYPES_AUTH.ITokenJWTGenerateUseCase)
    private _tokenJWTGenerateUseCase: ITokenJWTGenerateUseCase,
  ) {}

  async execute(user: UserModel): Promise<string> {

    // pegar permissao de user
    return this._tokenJWTGenerateUseCase.execute<IAccessTokenData>(
      {
        userId: user.id,
        PermissionType: PermissionsTypeEnum.CLIENTE,
      },
      process.env.JWT_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    )
  }
}
