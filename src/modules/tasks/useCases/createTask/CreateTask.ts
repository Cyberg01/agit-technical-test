import { NotFoundError, Service, UseCase, transformAndValidate } from '@aptana/multichannel-common';
import UserRepo from '@/modules/users/repos/UserRepo';
import { Task } from '../../domain/Task';
import { TaskId } from '../../domain/TaskId';
import TaskRepo from '../../repos/TaskRepo';
import { fetchWeather } from '../../utils/weather';
import CreateTaskDTO from './CreateTaskDTO';

@Service()
export default class CreateTask implements UseCase<CreateTaskDTO, Promise<Task>> {
  constructor(
    private taskRepo: TaskRepo,
    private userRepo: UserRepo
  ) {
    //
  }

  async execute(req: CreateTaskDTO): Promise<Task> {
    const reqData = transformAndValidate(CreateTaskDTO, req);
    const user = await this.userRepo.show(reqData.userID);

    if (!user) {
      throw new NotFoundError();
    }

    const task = Task.create({
      userID: reqData.userID,
      title: reqData.title,
      city: reqData.city,
      weatherInfo: await fetchWeather(reqData.city),
      isDone: false,
    }, new TaskId());

    return await this.taskRepo.save(task);
  }
}
