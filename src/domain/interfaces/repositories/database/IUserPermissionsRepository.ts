import { UserPermissionsModel } from './../../../../models/UserPermissionsModel';
import { IBaseRepository } from './base/IBaseRepository'

export interface IUserPermissionsRepository
  extends IBaseRepository<UserPermissionsModel> {
  delete(id: string): Promise<void>
}
