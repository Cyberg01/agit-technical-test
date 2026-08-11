import { Request, Response } from 'express';
import { Controller, Service } from '@aptana/multichannel-common';
import ListTask from './ListTask';

@Service()
export default class ListTaskController extends Controller {
  constructor(
    private listTask: ListTask
  ) {
    super();
  }

  registerRoutes(): void {
    this.router.get('/tasks', this.list.bind(this));
  }

  async list(req: Request, res: Response) {
    const tasks = await this.listTask.execute(req.query);
    return this.ok(res, tasks);
  }
}
