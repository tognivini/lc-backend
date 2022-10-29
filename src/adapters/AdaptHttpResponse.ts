import { Response } from 'express'

import { serverError } from '../utils/commons/http/HttpHelper'
import { HttpResponse } from '../utils/commons/protocols/Http'
import { Messages } from '../utils/commons/messages/MessagesResources'

export class AdaptResponse {
  constructor(private readonly _res: Response) {}

  adapt = (response: HttpResponse) => {
    if (response) {
      return this._res
        .status(response.statusCode)
        .json({ data: response.data, messages: response.messages })
    } else {
      return this._res.status(500).json({ messages: Messages.INTERNAL_ERROR })
    }
  }

  adaptQuery<TModel>(body: TModel) {
    if (body && body['data']) {
      return this._res.status(200).json(body)
    } else {
      return this._res.status(200).json({ data: body })
    }
  }

  adaptError = (error: Error) => {
    console.log(error)
    return this.adapt(serverError(error))
  }
}
