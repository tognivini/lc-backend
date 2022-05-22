import 'reflect-metadata'

import { Container } from 'inversify'

import { bindingsUser } from './user/inversify.user.config'

const container = new Container()
container.load(bindingsUser)

export { container }
