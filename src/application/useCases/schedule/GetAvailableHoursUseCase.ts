import { ScheduleMessages } from "./../../../utils/commons/messages/ScheduleMessagesResources";
import { HttpResponse } from "../../../utils/commons/protocols/Http";
import { inject, injectable } from "inversify";
import { getDay } from "date-fns";

import { GetAvailableHoursDto } from "../../dto/scheduleDto/_index";
import { IGetAvailableHoursUseCase } from "../../../domain/interfaces/useCases/schedule/_index";
import { TYPES_SCHEDULE } from "../../../main/inversify/types";
import { IScheduleRepository } from "../../../domain/interfaces/repositories/database/_index";
import { badRequest, ok } from "../../../utils/commons/http/HttpHelper";
import {
  CommonDaysEnum,
  SturdaysEnum,
} from "../../../domain/enums/scheduleEnums/AvailableHoursEnum";
@injectable()
export class GetAvailableHoursUseCase implements IGetAvailableHoursUseCase {
  constructor(
    @inject(TYPES_SCHEDULE.IScheduleRepository)
    private readonly _scheduleRepository: IScheduleRepository
  ) {}

  async execute(
    request: GetAvailableHoursDto
  ): Promise<HttpResponse<Object[]>> {
    if (!(request?.laundryId && request?.washMachineId && request?.date)) {
      return badRequest(ScheduleMessages.ERROR_SCHEDULE_INFORMATIONS_NEED);
    }
    const thisDayIs = getDay(new Date(request.date));
    // if(thisDayIs === 0){
    //   return badRequest(ScheduleMessages.ERROR_DATE_SCHEDULE_CLOSED);
    // }
    const schedulesThatAlreadyExists =
      await this._scheduleRepository.getAvailableHoursPagging(request);

    const notAvailableHours = [];
    schedulesThatAlreadyExists.filter((schedule) => {
      notAvailableHours.push(schedule.startHour);
    });

    let hoursToBeUsed = []
    if(thisDayIs !== 6){
      hoursToBeUsed.push(...CommonDaysEnum)
    } else {
      hoursToBeUsed.push(...SturdaysEnum)
    }

    const availableHours = hoursToBeUsed.filter(
      (baseHour) => !notAvailableHours.includes(baseHour)
    );

    return ok(availableHours);
  }
}
