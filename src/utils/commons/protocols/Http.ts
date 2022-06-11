export type HttpResponse<TObjct = any> = {
    success: boolean
    statusCode: number
    data: TObjct
    messages: Array<string>
  }
  