import { Request, Response } from 'express';
import { Controller, Service } from '@aptana/multichannel-common';
import authMiddleware from '@/infrastructure/http/middlewares/auth';
import UpdateUser from './UpdateUser';

@Service()
export default class UpdateUserController extends Controller {

  constructor(
    private updateUser: UpdateUser
  ) {
    super();
  }

  registerRoutes(): void {
    this.router.put('/users/:userId', authMiddleware, this.update.bind(this));
  }

  async update(req: Request, res: Response) {
    const user = await this.updateUser.execute({ ...req.body, userId: req.params.userId });
    return this.ok(res, user);
  }
}
