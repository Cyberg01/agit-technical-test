import { Service, UseCase, transformAndValidate } from '@amirmarmul/waba-common';
import ListUserDTO from './ListUserDTO';
import UserRepo from '../../repos/UserRepo';

@Service()
export default class ListUser implements UseCase<ListUserDTO, Promise<any>> {
  constructor(
    private userRepo: UserRepo,
  ) {
    //
  }

  async execute(req: ListUserDTO): Promise<any> {
    const reqData = transformAndValidate(ListUserDTO, req);
    return await this.userRepo.list(reqData);
  }
}
