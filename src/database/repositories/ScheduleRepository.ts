import { injectable } from "inversify";
import { getRepository, SelectQueryBuilder, UpdateResult } from "typeorm";

import { GetAllSchedulesDto } from "../../application/dto/scheduleDto/_index";
import { StatusEnum } from "../../domain/enums/baseEnums/_index";
import { IScheduleRepository } from "../../domain/interfaces/repositories/database/IScheduleRepository";
import { ScheduleModel } from "../../models/_index";
import { DateUtils } from "../../utils/commons/utils/_index";

@injectable()
export class ScheduleRepository implements IScheduleRepository {
  getAll(filters: ScheduleModel): Promise<ScheduleModel[]> {
    throw new Error("Method not implemented.");
  }
  async findById(id: string): Promise<ScheduleModel> {
    if (!id) return null;

    return await this.findUserCustom(<ScheduleModel>{ id: id });
  }

  async findUserCustom(filter: ScheduleModel): Promise<ScheduleModel> {
    const query = getRepository(ScheduleModel).createQueryBuilder("schedule");

    query.where(filter);
    query.andWhere("schedule.status = :status", {
      status: StatusEnum.ATIVO,
    });

    return await query.getOne();
  }

  async add(model: ScheduleModel): Promise<ScheduleModel> {
    const repo = getRepository(ScheduleModel);
    return await repo.save(model);
  }

  async update(id: string, data: ScheduleModel): Promise<ScheduleModel> {
    data.updatedAt = DateUtils.now()
    await getRepository(ScheduleModel).save({id, ...data})
    return data
  }

  async delete(id: string): Promise<void> {
    const repo = getRepository(ScheduleModel)
    await repo.delete(id)
  }

  async getAllPagging(request: GetAllSchedulesDto): Promise<ScheduleModel[]> {
    const repo = getRepository(ScheduleModel);
    const query = repo.createQueryBuilder("schedule")
    .leftJoinAndMapOne(
      'schedule.laundry',
      'schedule.laundry',
      'laundry',
      'laundry.id = schedule.laundry_id'
    )
    .leftJoinAndMapOne(
      'schedule.washMachine',
      'schedule.washMachine',
      'washMachine',
      'washMachine.id = schedule.wash_machine_id'
    )
    .leftJoinAndMapOne(
      'schedule.responsible',
      'schedule.responsible',
      'responsible',
      'responsible.id = schedule.responsible_id'
    )
    .leftJoinAndMapOne(
      'schedule.client',
      'schedule.client',
      'client',
      'client.id = schedule.client_id'
    )

    return await query.getMany()
  }
}
