import { GetResponsiblesDto } from '../../../../application/dto/userDto/_index'
import { UserModel } from '../../../../models/_index'

export interface IGetResponsiblesUseCase {
  execute: (
    filter: GetResponsiblesDto
  ) => Promise<UserModel[]>
}
