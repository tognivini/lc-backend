import { ContainerModule } from 'inversify'

import { ScheduleController } from '../../../controllers/ScheduleController'
import { ScheduleRepository } from '../../../database/repositories/_index'
import { 
  CreateScheduleUseCase,
  GetAllSchedulesUseCase, 
  UpdateScheduleUseCase 
} from '../../../application/useCases/schedule/_index'
import { TYPES_SCHEDULE } from './types.schedule'

export const bindingsSchedule = new ContainerModule((bind) => {
  require('../../../controllers/ScheduleController')
  bind<ScheduleController>(TYPES_SCHEDULE.ScheduleController).to(
    ScheduleController
  )

  bind<ScheduleRepository>(TYPES_SCHEDULE.IScheduleRepository).to(
    ScheduleRepository
  )

  bind<GetAllSchedulesUseCase>(TYPES_SCHEDULE.IGetAllSchedulesUseCase).to(
    GetAllSchedulesUseCase
  )

  bind<CreateScheduleUseCase>(TYPES_SCHEDULE.ICreateScheduleUseCase).to(
    CreateScheduleUseCase
  )
  
  bind<UpdateScheduleUseCase>(TYPES_SCHEDULE.IUpdateScheduleUseCase).to(
    UpdateScheduleUseCase
  )
  
})
