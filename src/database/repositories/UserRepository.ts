import { injectable } from "inversify";
import { getRepository, SelectQueryBuilder, UpdateResult } from "typeorm";

import { GetAllUsersDto } from "../../application/dto/userDto/_index";
import { StatusEnum } from "../../domain/enums/baseEnums/_index";
import { IUserRepository } from "../../domain/interfaces/repositories/database/IUserRepository";
import { UserModel } from "../../models/_index";
import { DateUtils } from "../../utils/commons/utils/_index";

@injectable()
export class UserRepository implements IUserRepository {
  getAll(filters: UserModel): Promise<UserModel[]> {
    throw new Error("Method not implemented.");
  }
  async findById(id: string): Promise<UserModel> {
    if (!id) return null;

    return await this.findUserCustom(<UserModel>{ id: id });
  }

  async findUserCustom(filter: UserModel): Promise<UserModel> {
    const query = getRepository(UserModel).createQueryBuilder("user");

    query.where(filter);
    query.andWhere("user.status = :status", {
      status: StatusEnum.ATIVO,
    });
    return await query.getOne();
  }

  async add(model: UserModel): Promise<UserModel> {
    const repo = getRepository(UserModel);
    return await repo.save(model);
  }

  async update(id: string, data: UserModel): Promise<UserModel> {
    data.updatedAt = DateUtils.now()
    await getRepository(UserModel).save({id, ...data})
    return data
    // const user = await this.findUserCustom(<UserModel>{ id: id })
    // console.log('here is the finded user on repo', user)
    // return getRepository(UserModel).save({
    //   ...user, // existing fields
    //   ...data // updated fields
    // });
  }

  async delete(id: string): Promise<void> {
    const repo = getRepository(UserModel)
    await repo.delete(id)
  }

  async getAllPagging(request: GetAllUsersDto): Promise<UserModel[]> {
    const repo = getRepository(UserModel);
    const query = repo.createQueryBuilder("user");
    //   .leftJoinAndMapOne(
    //     'user.consultant',
    //     'user.consultant',
    //     'consultant',
    //     'consultant.id = user.consultant_id'
    //   )

    // const [data, count] = await query.getManyAndCount()
    return query.getRawMany();
  }
}
