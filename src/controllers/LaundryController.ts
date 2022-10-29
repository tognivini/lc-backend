import * as express from "express";
import { Request, Response } from "express";
import { inject } from "inversify";
import {
  controller,
  // httpDelete,
  httpGet,
  httpPost,
  httpPut,
  request,
  response,
} from "inversify-express-utils";
import { PermissionTypeEnum } from "../domain/enums/userEnums/PermissionTypeEnum";

import {
  ICreateLaundryUseCase,
  IGetAllLaundrysUseCase,
  IGetAvailableLaundrysUseCase,
  IUpdateLaundryUseCase,
} from "../domain/interfaces/useCases/laundry/_index";
import { TYPES_LAUNDRY } from "../main/inversify/types";
import { authorization } from "../middlewares/AuthorizationMiddleware";

@controller("/api/laundry")
export class LaundryController {
  constructor(
    @inject(TYPES_LAUNDRY.IGetAllLaundrysUseCase)
    private _getAllLaundrys: IGetAllLaundrysUseCase,

    @inject(TYPES_LAUNDRY.IGetAvailableLaundrysUseCase)
    private _getAvailableLaundrys: IGetAvailableLaundrysUseCase,

    @inject(TYPES_LAUNDRY.ICreateLaundryUseCase)
    private _createLaundry: ICreateLaundryUseCase,

    @inject(TYPES_LAUNDRY.IUpdateLaundryUseCase)
    private _updateLaundry: IUpdateLaundryUseCase
  ) {}

  @httpGet("/", authorization())
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

  @httpGet("/get-available", authorization())
  private async getAvailable(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      return await this._getAvailableLaundrys.execute(req.query);
    } catch (error) {
      return error;
    }
  }

  @httpPost("/create", authorization(PermissionTypeEnum.ADMIN))
  private async create(@request() req: Request, @response() res: Response) {
    try {
      return await this._createLaundry.execute(req.body);
    } catch (error) {
      return error;
    }
  }

  @httpPut("/update/:id", authorization(PermissionTypeEnum.ADMIN))
  private async update(@request() req: Request, @response() res: Response) {
    try {
      const { id } = req.params;
      return await this._updateLaundry.execute(id, req.body);
    } catch (error) {
      return error;
    }
  }
}
