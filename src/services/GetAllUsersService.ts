import { getRepository } from "typeorm";
import { UserModel } from "../models/UserModel";

export class GetAllUsersService {
  async execute() {
    const repo = getRepository(UserModel);

    const users = await repo.find()

    return users;
  }
}