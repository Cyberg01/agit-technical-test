import { Service, UseCase, transformAndValidate } from '@amirmarmul/waba-common';
import { User } from '../../domain/User';
import { UserId } from '../../domain/UserId';
import CreateUserDTO from './CreateUserDTO';
import UserRepo from '../../repos/UserRepo';

@Service()
export default class CreateUser implements UseCase<CreateUserDTO, Promise<User>> {
  constructor(
    private userRepo: UserRepo
  ) {
    //
  }

  async execute(req: CreateUserDTO): Promise<User> {
    const reqData = transformAndValidate(CreateUserDTO, req);

    const user = User.create({
      name: reqData.name
    }, new UserId());

    const savedUser = await this.userRepo.save(user);

    return savedUser;
  }
}
