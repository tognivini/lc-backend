import { PermissionsTypeEnum } from "../../../domain/enums/baseEnums/PermissionsTypeEnum";

export class UpdateUserDto {
  public email?: string;
  public phoneNumber?: string;
  public name?: string;
  public password?: string;
  public userType?: PermissionsTypeEnum;
  public permissionId?: string;
}
