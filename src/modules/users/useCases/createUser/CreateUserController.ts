import { Request, Response } from 'express';
import { Controller, Service } from '@aptana/multichannel-common';
import authMiddleware from '@/infrastructure/http/middlewares/auth';
import CreateUser from './CreateUser';

@Service()
export default class CreateUserController extends Controller {

  constructor(
    private createUser: CreateUser
  ) {
    super();
  }

  registerRoutes(): void {
    this.router.post('/register', this.store.bind(this));
  }

  async store(req: Request, res: Response) {
    const user = await this.createUser.execute(req.body);
    return this.ok(res, user);
  }
}
