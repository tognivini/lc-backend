import { ContainerModule } from 'inversify'

import { AuthController } from '../../../controllers/AuthController'
import { TYPES_AUTH } from './types.auth'
import { 
  AccessTokenGenerateUseCase,
  LoginUseCase,
  TokenJWTGenerateUseCase 
} from '../../../application/useCases/auth/_index'

export const bindingsAuth = new ContainerModule((bind) => {
  require('../../../controllers/AuthController')
  bind<AuthController>(TYPES_AUTH.AuthController).to(
    AuthController
  )
  
  bind<LoginUseCase>(TYPES_AUTH.ILoginUseCase).to(
    LoginUseCase
  )

  bind<TokenJWTGenerateUseCase>(TYPES_AUTH.ITokenJWTGenerateUseCase).to(
    TokenJWTGenerateUseCase
  )

  bind<AccessTokenGenerateUseCase>(TYPES_AUTH.IAccessTokenGenerateUseCase).to(
    AccessTokenGenerateUseCase
  )
})
