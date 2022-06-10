import { ContainerModule } from 'inversify'

import { UserController } from '../../../controllers/UserController'
import {
  GetAllUsersUseCase,
} from '../../../application/useCases/user/_index'
import { UserRepository } from '../../../database/repositories/_index'
import { TYPES_USER } from './types.user'
import { CreateUserUseCase } from '../../../application/useCases/user/CreateUserUseCase'

export const bindingsUser = new ContainerModule((bind) => {
  require('../../../controllers/UserController')
  bind<UserController>(TYPES_USER.UserController).to(
    UserController
  )
  
  bind<GetAllUsersUseCase>(TYPES_USER.IGetAllUsersUseCase).to(
    GetAllUsersUseCase
  )

  bind<UserRepository>(TYPES_USER.IUserRepository).to(
    UserRepository
  )

  bind<CreateUserUseCase>(TYPES_USER.ICreateUserUseCase).to(CreateUserUseCase)
})
