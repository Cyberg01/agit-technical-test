import { Request, Response } from 'express';
import { Controller, Service } from '@aptana/multichannel-common';
import authMiddleware from '@/infrastructure/http/middlewares/auth';
import DeleteUser from './DeleteUser';

@Service()
export default class DeleteUserController extends Controller {
  constructor(
    private deleteUser: DeleteUser
  ) {
    super();
  }

  registerRoutes(): void {
    this.router.delete('/users/:userId', this.delete.bind(this));
  }

  async delete(req: Request, res: Response) {
    const User = await this.deleteUser.execute(req.params.userId);
    return this.ok(res, User);
  }
}
