import { Service, UseCase, transformAndValidate } from '@aptana/multichannel-common';
import TaskRepo from '../../repos/TaskRepo';
import ListTaskDTO from './ListTaskDTO';

@Service()
export default class ListTask implements UseCase<ListTaskDTO, Promise<any>> {
  constructor(
    private taskRepo: TaskRepo
  ) {
    //
  }

  async execute(req: ListTaskDTO): Promise<any> {
    const reqData = transformAndValidate(ListTaskDTO, req);
    return await this.taskRepo.list(reqData);
  }
}
