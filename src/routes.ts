import { Router, Request, Response } from "express"
import { GetAllUsersController } from "./controller/GetAllUsersController"

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'Hello World'})
})

routes
  .route("/all")
  .get(new GetAllUsersController().handle)
//   .post(new CreatePlatformsController().handle);


export default routes