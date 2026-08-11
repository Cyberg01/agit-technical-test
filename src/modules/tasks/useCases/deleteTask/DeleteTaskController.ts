import { Request, Response } from 'express';
import { Controller, Service } from '@aptana/multichannel-common';
import DeleteTask from './DeleteTask';

@Service()
export default class DeleteTaskController extends Controller {
  constructor(
    private deleteTask: DeleteTask
  ) {
    super();
  }

  registerRoutes(): void {
    this.router.delete('/tasks/:taskId', this.delete.bind(this));
  }

  async delete(req: Request, res: Response) {
    const task = await this.deleteTask.execute(req.params.taskId);
    return this.ok(res, task);
  }
}
