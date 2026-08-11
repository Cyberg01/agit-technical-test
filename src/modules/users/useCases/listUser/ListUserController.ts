import { Request, Response } from 'express';
import { Controller, Service } from '@aptana/multichannel-common';
import authMiddleware from '@/infrastructure/http/middlewares/auth';
import ListUser from './ListUser';

@Service()
export default class ListUserController extends Controller {

  constructor(
    private listUser: ListUser
  ) {
    super();
  }

  registerRoutes(): void {
    this.router.get('/users', authMiddleware, this.list.bind(this));
  }

  async list(req: Request, res: Response) {
    const listUsers = await this.listUser.execute(req.query);
    return this.ok(res, listUsers);
  }
}
