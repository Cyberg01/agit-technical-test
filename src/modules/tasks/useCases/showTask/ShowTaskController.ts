import { Request, Response } from 'express';
import { Controller, Service } from '@aptana/multichannel-common';
import ShowTask from './ShowTask';

@Service()
export default class ShowTaskController extends Controller {
  constructor(
    private showTask: ShowTask
  ) {
    super();
  }

  registerRoutes(): void {
    this.router.get('/tasks/:taskId', this.show.bind(this));
  }

  async show(req: Request, res: Response) {
    const task = await this.showTask.execute(req.params.taskId);
    return this.ok(res, task);
  }
}
