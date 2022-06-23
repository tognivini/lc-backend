import { UserModel } from '../../../../models/UserModel'
import { PermissionsTypeEnum } from '../../../enums/baseEnums/_index'

export interface IAccessTokenData {
  userId: string
  PermissionType: PermissionsTypeEnum
}

export interface IAccessTokenGenerateUseCase {
  execute(user: UserModel): Promise<string>
}
