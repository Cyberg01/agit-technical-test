import { NotFoundError, Service, UseCase } from '@amirmarmul/waba-common';
import UserRepo from '../../repos/UserRepo';
import { User } from '../../domain/User';

@Service()
export default class ShowUser implements UseCase<string, Promise<User>> {
  constructor(
    private userRepo: UserRepo,
  ) {
    //
  }

  async execute(id: string): Promise<User> {
    const user = await this.userRepo.show(id);
    
    if (!user) {
      throw new NotFoundError;
    }

    return user;
  }
}
