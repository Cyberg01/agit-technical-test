import { Mapper, UniqueId } from '@aptana/multichannel-common';
import { Task } from '../domain/Task';

export class TaskMapper extends Mapper<Task> {
  public static toDomain(raw: any): Task {
    return Task.create({
      userID: raw.userID,
      title: raw.title,
      city: raw.city,
      weatherInfo: raw.weatherInfo,
      isDone: raw.isDone,
    }, new UniqueId(raw.id));
  }

  public static toPersistence(task: Task): any {
    return {
      id: task.id.toString(),
      userID: task.userID,
      title: task.title,
      city: task.city,
      weatherInfo: task.weatherInfo,
      isDone: task.isDone,
    };
  }

  public static toObject(task: any) {
    return {
      id: task.id,
      userID: task.userID,
      title: task.title,
      city: task.city,
      weatherInfo: task.weatherInfo,
      isDone: task.isDone,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
