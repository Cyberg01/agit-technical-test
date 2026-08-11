import { Service, UniqueId, UseCase, transformAndValidate } from '@aptana/multichannel-common';
import { Task } from '../../domain/Task';
import TaskRepo from '../../repos/TaskRepo';
import { fetchWeather } from '../../utils/weather';
import UpdateTaskDTO from './UpdateTaskDTO';

@Service()
export default class UpdateTask implements UseCase<UpdateTaskDTO, Promise<Task>> {
  constructor(
    private taskRepo: TaskRepo
  ) {
    //
  }

  async execute(req: UpdateTaskDTO): Promise<Task> {
    const reqData = transformAndValidate(UpdateTaskDTO, req);

    const existingTask = await this.taskRepo.show(reqData.taskId);
    const task = Task.create({
      userID: reqData.userID ?? existingTask.userID,
      title: reqData.title ?? existingTask.title,
      city: reqData.city,
      weatherInfo: reqData.city ? await fetchWeather(reqData.city) : undefined,
      isDone: reqData.isDone,
    }, new UniqueId(reqData.taskId));

    return await this.taskRepo.update(task);
  }
}
