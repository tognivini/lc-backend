import { injectable } from 'inversify'
import * as jwt from 'jsonwebtoken';

import { ITokenJWTGenerateUseCase } from '../../../domain/interfaces/useCases/auth/_index'

@injectable()
export class TokenJWTGenerateUseCase implements ITokenJWTGenerateUseCase {
  execute(data: any, key: string, options: jwt.SignOptions): string {
    return jwt.sign(data, key, options)
  }
}
