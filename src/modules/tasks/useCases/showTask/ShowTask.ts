import { NotFoundError, Service, UseCase } from '@aptana/multichannel-common';
import { Task } from '../../domain/Task';
import TaskRepo from '../../repos/TaskRepo';

@Service()
export default class ShowTask implements UseCase<string, Promise<Task>> {
  constructor(
    private taskRepo: TaskRepo
  ) {
    //
  }

  async execute(id: string): Promise<Task> {
    const task = await this.taskRepo.show(id);

    if (!task) {
      throw new NotFoundError();
    }

    return task;
  }
}
