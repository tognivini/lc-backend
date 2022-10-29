import { PermissionTypeEnum } from "./../domain/enums/userEnums/PermissionTypeEnum";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import { unauthorized } from "../utils/commons/http/HttpHelper";
import { AdaptResponse } from "../adapters/AdaptHttpResponse";

interface IDecodedToken {
  userId: string;
  permissionType: PermissionTypeEnum;
}

export function authorization(role?: PermissionTypeEnum) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers["authorization"];
      if (!token) {
        return new AdaptResponse(res).adapt(unauthorized());
      } else if (token) {
        const tokenResponse = jwt.verify(
          token,
          process.env.JWT_KEY
        ) as IDecodedToken;
        //Se role for obrigatório
        if (role) {
          //Validação de token valido com role
          if (tokenResponse?.userId && tokenResponse?.permissionType === role) {
            next();
            return;
          } else {
            return new AdaptResponse(res).adapt(unauthorized());
          }
        } else {
          //Validação simples de token valido
          if (tokenResponse?.userId) {
            next();
            return;
          } else {
            return new AdaptResponse(res).adapt(unauthorized());
          }
        }
      }
    } catch (error) {
      return new AdaptResponse(res).adapt(unauthorized());
    }
  };
}
