import { UpdateUserDto } from './../../../../application/dto/userDto/UpdateUserDto';
import { UserPermissionsModel } from "./../../../../models/UserPermissionsModel";
import { IBaseRepository } from "./base/IBaseRepository";

export interface IUserPermissionsRepository
  extends IBaseRepository<UserPermissionsModel> {
  findPermissionByUserId(id: string): Promise<UserPermissionsModel>;

  delete(id: string): Promise<void>;

  updateCustomRaw(
    request: UpdateUserDto
  ): Promise<UserPermissionsModel>
}
