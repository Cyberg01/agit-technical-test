import { BadRequestError, Service, UseCase, dispatcher, transformAndValidate } from '@aptana/multichannel-common';
import { User } from '../../domain/User';
import { UserId } from '../../domain/UserId';
import CreateUserDTO from './CreateUserDTO';
import UserRepo from '../../repos/UserRepo';
import UserCreated from '../../events/UserCreated';
import { hashPassword } from '../../utils/password';

@Service()
export default class CreateUser implements UseCase<CreateUserDTO, Promise<User>> {
  constructor(
    private userRepo: UserRepo
  ) {
    //
  }

  async execute(req: CreateUserDTO): Promise<User> {
    const reqData = transformAndValidate(CreateUserDTO, req);
    const existingUser = await this.userRepo.showByQuery({ email: reqData.email });

    if (existingUser) {
      throw new BadRequestError('Email already registered');
    }

    const user = User.create({
      name: reqData.name,
      email: reqData.email,
      password: await hashPassword(reqData.password)
    }, new UserId());

    const savedUser = await this.userRepo.save(user);

    await dispatcher(new UserCreated(savedUser));

    return savedUser;
  }
}
