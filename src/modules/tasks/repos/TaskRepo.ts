import { NotFoundError, Service } from '@aptana/multichannel-common';
import { Op } from 'sequelize';
import TaskModel from '@/infrastructure/database/sequelize/models/task';
import { Task } from '../domain/Task';
import { TaskMapper } from '../mappers/TaskMapper';

@Service()
export default class TaskRepo {
  constructor(
    private task = TaskModel
  ) {
    //
  }

  async save(task: Task): Promise<any> {
    const rawTask = TaskMapper.toPersistence(task);
    const savedTask = await this.task.create(rawTask);
    return TaskMapper.toObject(savedTask.get({ plain: true }));
  }

  async list(req: any): Promise<any> {
    const { filter = {}, search, page, sort } = req;
    const where = { ...filter };

    if (search?.value && search?.fields?.length) {
      where[Op.or as any] = search.fields.map((field: string) => ({
        [field]: { [Op.like]: `%${search.value}%` }
      }));
    }

    const result = await this.task.findAndCountAll({
      where,
      limit: page?.limit ? Number(page.limit) : undefined,
      offset: page?.offset ? Number(page.offset) : undefined,
      order: sort ? [String(sort).split(':') as [string, string]] : undefined,
    });

    return {
      ...result,
      rows: result.rows.map((task: any) => TaskMapper.toObject(task.get({ plain: true })))
    };
  }

  async update(task: Task): Promise<any> {
    const { id, ...rest } = this.clean(TaskMapper.toPersistence(task));
    const [updated] = await this.task.update(rest, { where: { id } });

    if (!updated) {
      throw new NotFoundError();
    }

    return await this.show(id);
  }

  async show(id: string): Promise<any> {
    const task = await this.task.findByPk(id);
    return task ? TaskMapper.toObject(task.get({ plain: true })) : null;
  }

  async destroy(id: string): Promise<any> {
    return !!await this.task.destroy({ where: { id } });
  }

  private clean(data: any): any {
    return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined));
  }
}
