import { Request, Response } from 'express';
import { Controller, Service } from '@aptana/multichannel-common';
import authMiddleware from '@/infrastructure/http/middlewares/auth';
import ShowUser from './ShowUser';

@Service()
export default class ShowUserController extends Controller {
  constructor(
    private showUser: ShowUser
  ) {
    super();
  }

  registerRoutes(): void {
    this.router.get('/users/:userId', this.show.bind(this));
  }

  async show(req: Request, res: Response) {
    const user = await this.showUser.execute(req.params.userId);
    return this.ok(res, user);
  }
}
