import { Request, Response } from 'express';
import { Controller, Service } from '@amirmarmul/waba-common';
import { HealthCheck } from '../healthCheck/HealthCheck';
import { MongooseHealthIndicator } from '../healthIndicator/database/mongooseHealthIndicator';
import { RabbitmqHealthIndicator } from '../healthIndicator/message-broker/rabbitmqHealthIndicator';

@Service()
export default class HealthController extends Controller {
  constructor(
    private readonly health: HealthCheck,
    private readonly mongoose: MongooseHealthIndicator,
    private readonly rabbitmq: RabbitmqHealthIndicator,
  ) {
    super();
  }

  registerRoutes(): void {
    this.router.get('/health', this.show.bind(this));
  }

  async show(req: Request, res: Response) {
    const data = await this.health.check([
      async () => this.mongoose.pingCheck('mongo'),
      async () => this.rabbitmq.pingCheck('rmq')
    ]);
    
    return this.ok(res, data);
  }
}
