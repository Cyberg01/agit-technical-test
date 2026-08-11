import { Request, Response } from 'express';
import { Controller, Service } from '@aptana/multichannel-common';
import ListUser from './ListUser';

@Service()
export default class ListUserController extends Controller {

  constructor(
    private listUser: ListUser
  ) {
    super();
  }

  registerRoutes(): void {
    this.router.get('/users', this.list.bind(this));
  }

  async list(req: Request, res: Response) {
    const listUsers = await this.listUser.execute(req.query);
    return this.ok(res, listUsers);
  }
}
