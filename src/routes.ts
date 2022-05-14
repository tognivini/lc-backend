// import { UserController } from "./controller/UserController"
import { Router, Request, Response } from "express"

// export const Routes = [{
//     method: "get",
//     route: "/users",
//     controller: UserController,
//     action: "all"
// }, {
//     method: "get",
//     route: "/users/:id",
//     controller: UserController,
//     action: "one"
// }, {
//     method: "post",
//     route: "/users",
//     controller: UserController,
//     action: "save"
// }, {
//     method: "delete",
//     route: "/users/:id",
//     controller: UserController,
//     action: "remove"
// }]
const routes = Router()

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'Hello World'})
})

export default routes