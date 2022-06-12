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

import { 
  ICreateLaundryUseCase, 
  IGetAllLaundrysUseCase, 
  IUpdateLaundryUseCase
} from "../domain/interfaces/useCases/laundry/_index";
import { TYPES_LAUNDRY } from "../main/inversify/types";
// import { RequestFilter } from '../../utils/commons/helpers/protocols/Http'
// import { AUTHORIZATION } from '../../utils/commons/resources/constants/AuthorizationScopes'
// import { AdaptResponse } from '../adapters/AdaptHttpResponse'
// import { authorization } from '../middlewares/AuthorizationMiddleware'

@controller("/api/laundry")
export class LaundryController {
  constructor(
    @inject(TYPES_LAUNDRY.IGetAllLaundrysUseCase)
    private _getAllLaundrys: IGetAllLaundrysUseCase,

    @inject(TYPES_LAUNDRY.ICreateLaundryUseCase)
    private _createLaundry: ICreateLaundryUseCase,

    @inject(TYPES_LAUNDRY.IUpdateLaundryUseCase)
    private _updateLaundry: IUpdateLaundryUseCase,
  ) {}
  
  @httpGet("/")
  private async getAll(
    @request() req: express.Request,
    @response() res: express.Response
    ) {
      try {
        return await this._getAllLaundrys.execute(req.query);
    } catch (error) {
      return error;
    }
  }

  @httpPost('/create')
  private async create(@request() req: Request, @response() res: Response) {
    try {
      return await this._createLaundry.execute(req.body)
    } catch (error) {
      return error
    }
  }

  @httpPut('/update/:id')
  private async update(@request() req: Request, @response() res: Response) {
    try {
      const { id } = req.params
      return await this._updateLaundry.execute(id, req.body)
      
    } catch (error) {
      return error
    }
  }
}
