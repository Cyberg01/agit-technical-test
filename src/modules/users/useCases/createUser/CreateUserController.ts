import { Request, Response } from 'express';
import { Controller, Service } from '@amirmarmul/waba-common';
import CreateUser from './CreateUser';

@Service()
export default class CreateUserController extends Controller {

  constructor(
    private createUser: CreateUser
  ) {
    super();
  }

  registerRoutes(): void {
    this.router.post('/users', this.store.bind(this));
  }

  async store(req: Request, res: Response) {
    const user = await this.createUser.execute(req.body);
    return this.ok(res, user);
  }
}
