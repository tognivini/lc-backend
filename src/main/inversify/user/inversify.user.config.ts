import { ContainerModule } from 'inversify'

import { UserController } from '../../../controllers/UserController'
import { UserRepository } from '../../../database/repositories/_index'
import { TYPES_USER } from './types.user'
import { 
  GetAllUsersUseCase, 
  CreateUserUseCase, 
  UpdateUserUseCase, 
  DeleteUserUseCase,
  GetResponsiblesUseCase
} from '../../../application/useCases/user/_index'

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

  bind<UpdateUserUseCase>(TYPES_USER.IUpdateUserUseCase).to(
    UpdateUserUseCase
  )

  bind<CreateUserUseCase>(TYPES_USER.ICreateUserUseCase).to(CreateUserUseCase)

  bind<DeleteUserUseCase>(TYPES_USER.IDeleteUserUseCase).to(DeleteUserUseCase)

  bind<GetResponsiblesUseCase>(TYPES_USER.IGetResponsiblesUseCase).to(GetResponsiblesUseCase)
})
