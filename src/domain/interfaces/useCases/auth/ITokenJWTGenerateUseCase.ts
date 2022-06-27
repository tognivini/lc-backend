import * as jwt from 'jsonwebtoken';

export interface ITokenJWTGenerateUseCase {
  execute<TData = any>(
    data: TData,
    key: string,
    options?: jwt.SignOptions
  ): string
}
