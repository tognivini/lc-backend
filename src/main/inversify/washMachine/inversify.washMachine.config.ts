import { ContainerModule } from 'inversify'

import { WashMachineController } from '../../../controllers/WashMachineController'
import { WashMachineRepository } from '../../../database/repositories/_index'
import { 
  CreateWashMachineUseCase,
  GetAllWashMachinesUseCase, 
  UpdateWashMachineUseCase
} from '../../../application/useCases/washMachine/_index'
import { TYPES_WASH_MACHINE } from './types.washMachine'

export const bindingsWashMachine = new ContainerModule((bind) => {
  require('../../../controllers/WashMachineController')
  bind<WashMachineController>(TYPES_WASH_MACHINE.WashMachineController).to(
    WashMachineController
  )

  bind<WashMachineRepository>(TYPES_WASH_MACHINE.IWashMachineRepository).to(
    WashMachineRepository
  )

  bind<GetAllWashMachinesUseCase>(TYPES_WASH_MACHINE.IGetAllWashMachinesUseCase).to(
    GetAllWashMachinesUseCase
  )

  bind<CreateWashMachineUseCase>(TYPES_WASH_MACHINE.ICreateWashMachineUseCase).to(
    CreateWashMachineUseCase
  )
  
  bind<UpdateWashMachineUseCase>(TYPES_WASH_MACHINE.IUpdateWashMachineUseCase).to(
    UpdateWashMachineUseCase
  )
  
})
