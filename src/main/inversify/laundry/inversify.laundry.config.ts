import { ContainerModule } from 'inversify'

import { LaundryController } from '../../../controllers/LaundryController'
import { LaundryRepository } from '../../../database/repositories/_index'
import { 
  CreateLaundryUseCase, 
  GetAllLaundrysUseCase 
} from '../../../application/useCases/laundry/_index'
import { TYPES_LAUNDRY } from './types.laundry'
import { UpdateLaundryUseCase } from '../../../application/useCases/laundry/UpdateLaundryUseCase'

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

  bind<CreateLaundryUseCase>(TYPES_LAUNDRY.ICreateLaundryUseCase).to(
    CreateLaundryUseCase
  )
  
  bind<UpdateLaundryUseCase>(TYPES_LAUNDRY.IUpdateLaundryUseCase).to(
    UpdateLaundryUseCase
  )
  
})
