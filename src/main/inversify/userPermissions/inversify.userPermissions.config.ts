import { ContainerModule } from 'inversify'

import { TYPES_USER_PERMISSIONS } from './types.userPermissions'

import { UserPermissionsRepository } from '../../../database/repositories/UserPermissionsRepository'

export const bindingsUserPermissions = new ContainerModule((bind) => {
  require('../../../controllers/UserController')

  bind<UserPermissionsRepository>(TYPES_USER_PERMISSIONS.IUserPermissionsRepository).to(
    UserPermissionsRepository
  )
})
