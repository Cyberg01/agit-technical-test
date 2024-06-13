import { Request, Response } from 'express';
import { Controller, Service } from '@amirmarmul/waba-common';
import config from '@/config';

@Service()
export default class VersionController extends Controller {

  registerRoutes(): void {
    this.router.get('/', this.show.bind(this));
  }

  async show(req: Request, res: Response) {
    const { name } = config.app;
    return this.ok(res, { name });
  }
}
