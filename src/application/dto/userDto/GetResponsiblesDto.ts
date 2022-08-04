import { GetAllUsersDto } from './GetAllUsersDto';

export class GetResponsiblesDto extends GetAllUsersDto {
  public onlyAvailableResponsibles?: boolean;
}
