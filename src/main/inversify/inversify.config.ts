import 'reflect-metadata'

import { Container } from 'inversify'

import { bindingsUser } from './user/inversify.user.config'
import { bindingsUserPermissions } from './userPermissions/inversify.userPermissions.config'
import { bindingsLaundry } from './laundry/inversify.laundry.config'
import { bindingsWashMachine } from './washMachine/inversify.washMachine.config'
import { bindingsSchedule } from './schedule/inversify.schedule.config'
import { bindingsAuth } from './auth/inversify.auth.config'

const container = new Container()
container.load(bindingsUser)
container.load(bindingsUserPermissions)
container.load(bindingsLaundry)
container.load(bindingsWashMachine)
container.load(bindingsSchedule)
container.load(bindingsAuth)


export { container }
