import { injectable } from "inversify";
import { getRepository, SelectQueryBuilder, UpdateResult } from "typeorm";

import { GetAllWashMachinesDto } from "../../application/dto/washMachineDto/_index";
import { StatusEnum } from "../../domain/enums/baseEnums/_index";
import { IWashMachineRepository } from "../../domain/interfaces/repositories/database/IWashMachineRepository";
import { WashMachineModel } from "../../models/_index";
import { DateUtils } from "../../utils/commons/utils/_index";

@injectable()
export class WashMachineRepository implements IWashMachineRepository {
  getAll(filters: WashMachineModel): Promise<WashMachineModel[]> {
    throw new Error("Method not implemented.");
  }
  async findById(id: string): Promise<WashMachineModel> {
    if (!id) return null;

    return await this.findWashMachineCustom(<WashMachineModel>{ id: id });
  }

  async findWashMachineCustom(filter: WashMachineModel): Promise<WashMachineModel> {
    const query = getRepository(WashMachineModel).createQueryBuilder("wash_machine");

    query.where(filter);
    query.andWhere("wash_machine.status = :status", {
      status: StatusEnum.ATIVO,
    });

    return await query.getOne();
  }

  async add(model: WashMachineModel): Promise<WashMachineModel> {
    const repo = getRepository(WashMachineModel);
    return await repo.save(model);
  }

  async update(id: string, data: WashMachineModel): Promise<WashMachineModel> {
    data.updatedAt = DateUtils.now()
    await getRepository(WashMachineModel).save({id, ...data})
    return data
  }

  async delete(id: string): Promise<void> {
    const repo = getRepository(WashMachineModel)
    await repo.delete(id)
  }

  async getAllPagging(request: GetAllWashMachinesDto): Promise<WashMachineModel[]> {
    const repo = getRepository(WashMachineModel);
    const query = repo.createQueryBuilder("wash_machine")

    return query.getMany();
  }
}
