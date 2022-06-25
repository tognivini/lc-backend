import * as express from "express"
import * as bodyParser from "body-parser"
import * as cors from 'cors'
import { createConnection } from 'typeorm';
import { InversifyExpressServer } from 'inversify-express-utils'
import { container } from './main/inversify/inversify.config'
import { Application } from 'express'

createConnection();
const router = express.Router({
    caseSensitive: false,
    mergeParams: false,
    strict: false,
  })


const server = new InversifyExpressServer(container, router)


server.setConfig((application: Application) => {
    application.use(bodyParser.urlencoded({ extended: true }))
    application.use(bodyParser.json())
    application.set('case sensitive routing', false)
    application.use(cors())
    // application.use(httpContext.middleware)
    // application.use(loggingRequests())
  })
  const port = process.env.PORT || 3333
  const app = server.build()
  app.listen(port, () => {
    console.log(`Servidor ativo em http://localhost:3333`)
  })
