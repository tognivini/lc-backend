import 'reflect-metadata'

import { Container } from 'inversify'

import { bindingsUser } from './user/inversify.user.config'
import { bindingsLaundry } from './laundry/inversify.laundry.config'
import { bindingsWashMachine } from './washMachine/inversify.washMachine.config'
import { bindingsUserPermissions } from './userPermissions/inversify.userPermissions.config'

const container = new Container()
container.load(bindingsUser)
container.load(bindingsUserPermissions)
container.load(bindingsLaundry)
container.load(bindingsWashMachine)

export { container }
