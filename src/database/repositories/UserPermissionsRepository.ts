import { injectable } from "inversify";
import { getRepository, SelectQueryBuilder, UpdateResult } from "typeorm";

import { GetAllUsersDto } from "../../application/dto/userDto/_index";
import { StatusEnum } from "../../domain/enums/baseEnums/_index";
import { IUserPermissionsRepository } from "../../domain/interfaces/repositories/database/IUserPermissionsRepository";
import { UserPermissionsModel } from "../../models/_index";
import { DateUtils } from "../../utils/commons/utils/_index";

@injectable()
export class UserPermissionsRepository implements IUserPermissionsRepository {
  getAll(filters: UserPermissionsModel): Promise<UserPermissionsModel[]> {
    throw new Error("Method not implemented.");
  }
  async findById(id: string): Promise<UserPermissionsModel> {
    if (!id) return null;

    return await this.findUserCustom(<UserPermissionsModel>{ id: id });
  }

  async findUserCustom(filter: UserPermissionsModel): Promise<UserPermissionsModel> {
    const query = getRepository(UserPermissionsModel).createQueryBuilder("user_permissions");
   
    query.where(filter);
    query.andWhere("user.status = :status", {
      status: StatusEnum.ATIVO,
    });
    return await query.getOne();
  }

  async add(model: UserPermissionsModel): Promise<UserPermissionsModel> {
    const repo = getRepository(UserPermissionsModel);
    return await repo.save(model);
  }

  async update(id: string, data: UserPermissionsModel): Promise<UserPermissionsModel> {
    data.updatedAt = DateUtils.now()
    await getRepository(UserPermissionsModel).save({id, ...data})
    return data
    // const user = await this.findUserCustom(<UserPermissionsModel>{ id: id })
    // return getRepository(UserPermissionsModel).save({
    //   ...user, // existing fields
    //   ...data // updated fields
    // });
  }

  async delete(id: string): Promise<void> {
    const repo = getRepository(UserPermissionsModel)
    await repo.delete(id)
  }
}
