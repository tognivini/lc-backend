import { HttpResponse } from './../../../utils/commons/protocols/Http';
import { inject, injectable } from 'inversify'

import { GetAllLaundrysDto } from '../../../application/dto/laundryDto/_index'
import { IGetAvailableLaundrysUseCase } from '../../../domain/interfaces/useCases/laundry/_index'
import { LaundryModel } from '../../../models/_index'
import { TYPES_LAUNDRY } from '../../../main/inversify/types'
import { ILaundryRepository } from '../../../domain/interfaces/repositories/database/_index'
import { ok } from '../../../utils/commons/http/HttpHelper';

@injectable()
export class GetAvailableLaundrysUseCase implements IGetAvailableLaundrysUseCase {
  constructor(
    @inject(TYPES_LAUNDRY.ILaundryRepository)
    private readonly _laundryRepository: ILaundryRepository,
  ) {}

  async execute(
    filter: GetAllLaundrysDto
  ): Promise<HttpResponse<LaundryModel[]>> {
    const laundrys = await this._laundryRepository.getAvailablelaundrys(filter)
    return ok(laundrys)
  }
}
