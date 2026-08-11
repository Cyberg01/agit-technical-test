import { Request, Response } from 'express';
import { Controller, Service } from '@aptana/multichannel-common';
import UpdateTask from './UpdateTask';

@Service()
export default class UpdateTaskController extends Controller {
  constructor(
    private updateTask: UpdateTask
  ) {
    super();
  }

  registerRoutes(): void {
    this.router.put('/tasks/:taskId', this.update.bind(this));
  }

  async update(req: Request, res: Response) {
    const task = await this.updateTask.execute({ ...req.body, taskId: req.params.taskId });
    return this.ok(res, task);
  }
}
