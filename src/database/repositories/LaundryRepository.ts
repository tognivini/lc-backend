import { injectable } from "inversify";
import { getRepository, SelectQueryBuilder, UpdateResult } from "typeorm";

import { GetAllLaundrysDto } from "../../application/dto/laundryDto/_index";
import { StatusEnum } from "../../domain/enums/baseEnums/_index";
import { ILaundryRepository } from "../../domain/interfaces/repositories/database/ILaundryRepository";
import { LaundryModel } from "../../models/_index";
import { DateUtils } from "../../utils/commons/utils/_index";

@injectable()
export class LaundryRepository implements ILaundryRepository {
  getAll(filters: LaundryModel): Promise<LaundryModel[]> {
    throw new Error("Method not implemented.");
  }
  async findById(id: string): Promise<LaundryModel> {
    if (!id) return null;

    return await this.findLaundryUserCustom(<LaundryModel>{ id: id });
  }

  async findLaundryUserCustom(filter: LaundryModel): Promise<LaundryModel> {
    const query = getRepository(LaundryModel).createQueryBuilder("laundry");
    query.leftJoinAndMapOne(
      "laundry.responsible",
      "laundry.responsible",
      "responsible",
      "responsible.id = laundry.responsible_id"
    );
    query.where(filter);
    query.andWhere("laundry.status = :status", {
      status: StatusEnum.ATIVO,
    });

    return await query.getOne();
  }

  async add(model: LaundryModel): Promise<LaundryModel> {
    const repo = getRepository(LaundryModel);
    return await repo.save(model);
  }

  async update(id: string, data: LaundryModel): Promise<LaundryModel> {
    data.updatedAt = DateUtils.now();
    await getRepository(LaundryModel).save({ id, ...data });
    return data;
  }

  async delete(id: string): Promise<void> {
    const repo = getRepository(LaundryModel);
    await repo.delete(id);
  }

  async getAvailablelaundrys(
    request: GetAllLaundrysDto
  ): Promise<LaundryModel[]> {
    const repo = getRepository(LaundryModel);
    const query = repo
      .createQueryBuilder("laundry")
      .leftJoinAndMapOne(
        "laundry.responsible",
        "laundry.responsible",
        "responsible",
        "responsible.id = laundry.responsible_id"
      )
      .innerJoinAndSelect("laundry.washMachines", "washMachines");

    this.setFilters(request, query);

    query.andWhere("laundry.status = :status", {
      status: StatusEnum.ATIVO,
    });

    return await query.getMany();
  }

  async getAllPagging(request: GetAllLaundrysDto): Promise<LaundryModel[]> {
    const repo = getRepository(LaundryModel);
    const query = repo
      .createQueryBuilder("laundry")
      .leftJoinAndMapOne(
        "laundry.responsible",
        "laundry.responsible",
        "responsible",
        "responsible.id = laundry.responsible_id"
      )
      .leftJoinAndSelect("laundry.washMachines", "washMachines");

    this.setFilters(request, query);

    query.addOrderBy("laundry.name", "ASC");
    query.addOrderBy("washMachines.number", "ASC");

    return await query.getMany();
  }

  private setFilters(
    request: GetAllLaundrysDto,
    query: SelectQueryBuilder<LaundryModel>
  ): void {
    query.where("1=1");
    if (request.laundryId) {
      query.andWhere("laundry.id = :laundryId", {
        laundryId: request.laundryId,
      });
    }
    if (request.responsibleId) {
      query.andWhere("laundry.responsible.id = :responsibleId", {
        responsibleId: request.responsibleId,
      });
    }
    if (request.laundryId) {
      query.andWhere("laundry.id = :laundryId", {
        laundryId: request.laundryId,
      });
    }
  }
}
