import { UserModel } from '../../../../models/UserModel'
import { PermissionsTypeEnum } from '../../../enums/baseEnums/_index'

export interface IAccessTokenData {
  userId: string
  permissionType: PermissionsTypeEnum
}

export interface IAccessTokenGenerateUseCase {
  execute(user: UserModel): Promise<string>
}
