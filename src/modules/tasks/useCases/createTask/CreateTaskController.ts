import { Request, Response } from 'express';
import { Controller, Service } from '@aptana/multichannel-common';
import CreateTask from './CreateTask';

@Service()
export default class CreateTaskController extends Controller {
  constructor(
    private createTask: CreateTask
  ) {
    super();
  }

  registerRoutes(): void {
    this.router.post('/tasks', this.store.bind(this));
  }

  async store(req: Request, res: Response) {
    const task = await this.createTask.execute(req.body);
    return this.ok(res, task);
  }
}
