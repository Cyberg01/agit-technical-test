import { Service, UseCase } from '@amirmarmul/waba-common';
import UserRepo from '../../repos/UserRepo';

@Service()
export default class DeleteUser implements UseCase<string, Promise<boolean>> {
  constructor(
    private userRepo: UserRepo,
  ) {
    //
  }

  async execute(id: string): Promise<boolean> {
    return !! await this.userRepo.destroy(id);
  }
}
