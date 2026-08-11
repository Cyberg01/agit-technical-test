import { Cache, NotFoundError, Service, UseCase } from '@aptana/multichannel-common';
import UserRepo from '../../repos/UserRepo';
import { User } from '../../domain/User';

@Service()
export default class ShowUser implements UseCase<string, Promise<User>> {
  constructor(
    private userRepo: UserRepo,
    private cache: Cache,
  ) {
    //
  }

  async execute(id: string): Promise<User> {
    const user = await this.cache.get<User>(id, async () => {
      return await this.userRepo.show(id);
    });

    if (!user) {
      throw new NotFoundError;
    }

    return user;
  }
}
