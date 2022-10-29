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

import { ICreateUserUseCase, IDeleteUserUseCase, IGetAllUsersUseCase, IUpdateUserUseCase, IGetResponsiblesUseCase } from "../domain/interfaces/useCases/user/_index";
import { TYPES_USER } from "../main/inversify/types";
import { authorization } from "../middlewares/AuthorizationMiddleware";

@controller("/api/user")
export class UserController {
  constructor(
    @inject(TYPES_USER.IGetAllUsersUseCase)
    private _getAllUsers: IGetAllUsersUseCase,

    @inject(TYPES_USER.IGetResponsiblesUseCase)
    private _getResponsiblesUsers: IGetResponsiblesUseCase,

    @inject(TYPES_USER.ICreateUserUseCase)
    private _createUser: ICreateUserUseCase,

    @inject(TYPES_USER.IUpdateUserUseCase)
    private _updateUser: IUpdateUserUseCase,

    @inject(TYPES_USER.IDeleteUserUseCase)
    private _deleteUser: IDeleteUserUseCase,

  ) {}
  
  @httpGet("/", authorization())
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

  @httpGet("/responsibles")
  private async getResponsibles(
    @request() req: express.Request,
    @response() res: express.Response
    ) {
      try {
        return await this._getResponsiblesUsers.execute(req.query);
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

  @httpPut('/update/:id', authorization())
  private async update(@request() req: Request, @response() res: Response) {
    try {
      const { id } = req.params
      return await this._updateUser.execute(id, req.body)
      
    } catch (error) {
      return error
    }
  }

  @httpDelete('/delete/:id', authorization())
  private async delete(@request() req: Request, @response() res: Response) {
    try {
      const { id } = req.params
      return await this._deleteUser.execute(id)
    } catch (error) {
      return error
    }
  }
}
