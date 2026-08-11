import { NotFoundError, Service, UseCase } from '@aptana/multichannel-common';
import TaskRepo from '../../repos/TaskRepo';

@Service()
export default class DeleteTask implements UseCase<string, Promise<boolean>> {
  constructor(
    private taskRepo: TaskRepo
  ) {
    //
  }

  async execute(id: string): Promise<boolean> {
    const deleted = await this.taskRepo.destroy(id);

    if (!deleted) {
      throw new NotFoundError();
    }

    return deleted;
  }
}
