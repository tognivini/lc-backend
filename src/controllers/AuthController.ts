import { Request, Response } from 'express'
import { inject } from 'inversify'
import {
  controller,
  httpPost,
  request,
  response,
} from 'inversify-express-utils'
import { ILoginUseCase } from '../domain/interfaces/useCases/auth/_index'

// import { IRefreshTokenRequestUseCase } from '../../domain/interfaces/useCases/auth'
// import { ILoginUserUseCase } from '../../domain/interfaces/useCases/auth/ILoginUserUseCase'

import { TYPES_AUTH } from '../main/inversify/auth/types.auth'
@controller('/api/auth')
export class AuthController {
  constructor(
    @inject(TYPES_AUTH.ILoginUseCase)
    private _login: ILoginUseCase,
  ) {}

  @httpPost('/login')
  private async login(@request() req: Request, @response() res: Response) {
    try{
        const { email, password } = req.body
        return await this._login.authenticate(email, password)
    } catch (error) {
        return error
    }
  }
}
