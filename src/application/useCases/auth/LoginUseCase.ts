import { inject, injectable } from "inversify";

import {
  IUserRepository,
} from "../../../domain/interfaces/repositories/database/_index";

import {
  IAccessTokenGenerateUseCase,
  ILoginUseCase,
} from "../../../domain/interfaces/useCases/auth/_index";
import {
  TYPES_AUTH,
  TYPES_USER,
} from "../../../main/inversify/types";
import { HttpResponse } from "../../../utils/commons/protocols/Http";
import { ok, badRequest } from "../../../utils/commons/http/HttpHelper";
import { UserMessages } from "../../../utils/commons/messages/_index";
import { ResultLoginDto } from "../../dto/authDto/_index";
@injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly _repositoryUser: IUserRepository,

    @inject(TYPES_AUTH.IAccessTokenGenerateUseCase)
    private readonly _accessTokenGenerateUseCase: IAccessTokenGenerateUseCase
  ) {}

  async authenticate(email: string, password: string): Promise<HttpResponse> {
    const userFinded = await this._repositoryUser.findByEmail(email);
    if (!userFinded?.id) {
      return badRequest(UserMessages.ERROR_USER_NOT_FOUND);
    }
    if (userFinded?.password !== password) {
      return badRequest(UserMessages.INVALID_CREDENTIALS);
    }

    const token = await this._accessTokenGenerateUseCase.execute(userFinded);
    return ok(
      new ResultLoginDto(
        userFinded.id,
        userFinded.name,
        userFinded.email,
        token,
        // refreshToken
      )
    );
  }
}
