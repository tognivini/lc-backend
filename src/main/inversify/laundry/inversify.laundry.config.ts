import { ContainerModule } from 'inversify'
import { GetAllLaundrysUseCase } from '../../../application/useCases/laundry/_index'

import { LaundryController } from '../../../controllers/LaundryController'
import { LaundryRepository } from '../../../database/repositories/_index'
import { TYPES_LAUNDRY } from './types.laundry'

export const bindingsLaundry = new ContainerModule((bind) => {
  require('../../../controllers/LaundryController')
  bind<LaundryController>(TYPES_LAUNDRY.LaundryController).to(
    LaundryController
  )

  bind<LaundryRepository>(TYPES_LAUNDRY.ILaundryRepository).to(
    LaundryRepository
  )

  bind<GetAllLaundrysUseCase>(TYPES_LAUNDRY.IGetAllLaundrysUseCase).to(
    GetAllLaundrysUseCase
  )
})
