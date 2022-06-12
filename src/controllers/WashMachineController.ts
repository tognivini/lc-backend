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
  ICreateWashMachineUseCase, 
  IGetAllWashMachinesUseCase, 
  IUpdateWashMachineUseCase
} from "../domain/interfaces/useCases/washMachine/_index";
import { TYPES_WASH_MACHINE } from "../main/inversify/types";
// import { RequestFilter } from '../../utils/commons/helpers/protocols/Http'
// import { AUTHORIZATION } from '../../utils/commons/resources/constants/AuthorizationScopes'
// import { AdaptResponse } from '../adapters/AdaptHttpResponse'
// import { authorization } from '../middlewares/AuthorizationMiddleware'

@controller("/api/wash-machine")
export class WashMachineController {
  constructor(
    @inject(TYPES_WASH_MACHINE.IGetAllWashMachinesUseCase)
    private _getAllWashMachines: IGetAllWashMachinesUseCase,

    @inject(TYPES_WASH_MACHINE.ICreateWashMachineUseCase)
    private _createWashMachine: ICreateWashMachineUseCase,

    @inject(TYPES_WASH_MACHINE.IUpdateWashMachineUseCase)
    private _updateWashMachine: IUpdateWashMachineUseCase,
  ) {}
  
  @httpGet("/")
  private async getAll(
    @request() req: express.Request,
    @response() res: express.Response
    ) {
      try {
        return await this._getAllWashMachines.execute(req.query);
    } catch (error) {
      return error;
    }
  }

  @httpPost('/create')
  private async create(@request() req: Request, @response() res: Response) {
    try {
      return await this._createWashMachine.execute(req.body)
    } catch (error) {
      return error
    }
  }

  @httpPut('/update/:id')
  private async update(@request() req: Request, @response() res: Response) {
    try {
      const { id } = req.params
      return await this._updateWashMachine.execute(id, req.body)
      
    } catch (error) {
      return error
    }
  }
}
