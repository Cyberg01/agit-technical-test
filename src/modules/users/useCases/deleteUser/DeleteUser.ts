import { Service, UseCase, dispatcher } from '@amirmarmul/waba-common';
import UserRepo from '../../repos/UserRepo';
import UserDeleted from '../../events/UserDeleted';

@Service()
export default class DeleteUser implements UseCase<string, Promise<boolean>> {
  constructor(
    private userRepo: UserRepo,
  ) {
    //
  }

  async execute(id: string): Promise<boolean> {
    const user = await this.userRepo.destroy(id);
    await dispatcher(new UserDeleted(user));
    
    return !! user; 
  }
}
