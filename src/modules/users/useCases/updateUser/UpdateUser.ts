import { Service, UniqueId, UseCase, transformAndValidate } from '@amirmarmul/waba-common';
import UpdateUserDTO from './UpdateUserDTO';
import { User } from '../../domain/User';
import UserRepo from '../../repos/UserRepo';

@Service()
export default class UpdateUser implements UseCase<UpdateUserDTO, Promise<User>> {
  constructor(
    private userRepo: UserRepo
  ) {
    //
  }

  async execute(req: UpdateUserDTO): Promise<User> {
    const reqData = transformAndValidate(UpdateUserDTO, req, { skipMissingProperties: true });

    const user = User.create({
      name: reqData.name
    }, new UniqueId(reqData.userId))

    const savedUser = await this.userRepo.update(user);

    return savedUser;
  }
}
