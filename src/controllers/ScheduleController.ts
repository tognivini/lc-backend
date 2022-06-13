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
  ICreateScheduleUseCase, 
  IGetAllSchedulesUseCase, 
  IUpdateScheduleUseCase
} from "../domain/interfaces/useCases/schedule/_index";
import { TYPES_SCHEDULE } from "../main/inversify/types";
// import { RequestFilter } from '../../utils/commons/helpers/protocols/Http'
// import { AUTHORIZATION } from '../../utils/commons/resources/constants/AuthorizationScopes'
// import { AdaptResponse } from '../adapters/AdaptHttpResponse'
// import { authorization } from '../middlewares/AuthorizationMiddleware'

@controller("/api/schedule")
export class ScheduleController {
  constructor(
    @inject(TYPES_SCHEDULE.IGetAllSchedulesUseCase)
    private _getAllSchedules: IGetAllSchedulesUseCase,

    @inject(TYPES_SCHEDULE.ICreateScheduleUseCase)
    private _createSchedule: ICreateScheduleUseCase,

    @inject(TYPES_SCHEDULE.IUpdateScheduleUseCase)
    private _updateSchedule: IUpdateScheduleUseCase,
  ) {}
  
  @httpGet("/")
  private async getAll(
    @request() req: express.Request,
    @response() res: express.Response
    ) {
      try {
        return await this._getAllSchedules.execute(req.query);
    } catch (error) {
      return error;
    }
  }

  @httpPost('/create')
  private async create(@request() req: Request, @response() res: Response) {
    try {
      return await this._createSchedule.execute(req.body)
    } catch (error) {
      return error
    }
  }

  @httpPut('/update/:id')
  private async update(@request() req: Request, @response() res: Response) {
    try {
      const { id } = req.params
      return await this._updateSchedule.execute(id, req.body)
      
    } catch (error) {
      return error
    }
  }
}
