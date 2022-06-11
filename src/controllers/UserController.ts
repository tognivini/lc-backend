import * as express from "express";
import { Request, Response } from 'express'
import { inject } from "inversify";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  request,
  response,
} from "inversify-express-utils";

import { GetAllUsersDto } from "../application/dto/userDto/_index";
import { IUpdateUserUseCase } from "../domain/interfaces/useCases/user/IUpdateUserUseCase";
import { ICreateUserUseCase, IGetAllUsersUseCase } from "../domain/interfaces/useCases/user/_index";
import { TYPES_USER } from "../main/inversify/types";
// import { RequestFilter } from '../../utils/commons/helpers/protocols/Http'
// import { AUTHORIZATION } from '../../utils/commons/resources/constants/AuthorizationScopes'
// import { AdaptResponse } from '../adapters/AdaptHttpResponse'
// import { authorization } from '../middlewares/AuthorizationMiddleware'

@controller("/api/user")
export class UserController {
  constructor(
    @inject(TYPES_USER.IGetAllUsersUseCase)
    private _getAllUsers: IGetAllUsersUseCase,

    @inject(TYPES_USER.ICreateUserUseCase)
    private _createUser: ICreateUserUseCase,

    @inject(TYPES_USER.IUpdateUserUseCase)
    private _updateUser: IUpdateUserUseCase,
  ) {}
  
  @httpGet("/")
  private async getAll(
    @request() req: express.Request,
    @response() res: express.Response
    ) {
      try {
        return await this._getAllUsers.execute(req.query);
    } catch (error) {
      return error;
    }
  }

  @httpPost('/create')
  private async create(@request() req: Request, @response() res: Response) {
    try {
      return await this._createUser.execute(req.body)
    } catch (error) {
      return error
    }
  }

  @httpPut('/update/:id')
  private async update(@request() req: Request, @response() res: Response) {
    try {
      const { id } = req.params
      return await this._updateUser.execute(id, req.body)
      
    } catch (error) {
      return error
    }
  }


  // @httpGet('/', (''))
  // private async getAll(
  //   @request() req,
  //   @response() res: Response
  // ) {
  //   try {
  //     console.log('___entrando controller___')
  //     return new (res).adaptQuery(
  //       await this._getAllUsers.execute(req.query)
  //     )
  //   } catch (error) {
  //     return new (res).adaptError(error)
  //   }
  // }

  // @httpGet('/', authorization(AUTHORIZATION.KM_TRAVELED.READ))
  // private async getAll(
  //   @request() req: RequestFilter<GetAllUsersDto>,
  //   @response() res: Response
  // ) {
  //   try {
  //     return new AdaptResponse(res).adaptQuery(
  //       await this._getAllUsers.execute(req.query)
  //     )
  //   } catch (error) {
  //     return new AdaptResponse(res).adaptError(error)
  //   }
  // }

  // @httpPut('/:id', authorization(AUTHORIZATION.KM_TRAVELED.EDIT))
  // private async update(@request() req: Request, @response() res: Response) {
  //   try {
  //     const { id } = req.params
  //     return new AdaptResponse(res).adapt(
  //       await this._updateKmTraveled.execute(id, req.body)
  //     )
  //   } catch (error) {
  //     return new AdaptResponse(res).adaptError(error)
  //   }
  // }

  // @httpDelete('/', authorization(AUTHORIZATION.KM_TRAVELED.DELETE))
  // private async delete(@request() req: Request, @response() res: Response) {
  //   try {
  //     return new AdaptResponse(res).adapt(
  //       await this._deleteKmTraveled.execute(req.body)
  //     )
  //   } catch (error) {
  //     return new AdaptResponse(res).adaptError(error)
  //   }
  // }
}
