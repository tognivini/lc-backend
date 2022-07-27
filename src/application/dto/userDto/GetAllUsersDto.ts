import { PermissionsTypeEnum } from './../../../domain/enums/baseEnums/PermissionsTypeEnum';
export class GetAllUsersDto {
  public userId: string;
  public email: string;
  public phoneNumber: string;
  public name: string;
  public permissionType?: PermissionsTypeEnum
}
