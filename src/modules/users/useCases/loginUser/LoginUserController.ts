import { Request, Response } from 'express';
import { Controller, Service } from '@aptana/multichannel-common';
import LoginUser from './LoginUser';

@Service()
export default class LoginUserController extends Controller {
  constructor(
    private loginUser: LoginUser
  ) {
    super();
  }

  registerRoutes(): void {
    this.router.post('/login', this.login.bind(this));
  }

  async login(req: Request, res: Response) {
    const result = await this.loginUser.execute(req.body);
    return this.ok(res, result);
  }
}
