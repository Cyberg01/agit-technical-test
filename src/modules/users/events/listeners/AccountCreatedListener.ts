import config from '@/config';
import { Listener, logger, Service } from '@amirmarmul/waba-common';

@Service()
class AccountCreatedListener extends Listener<any> {
  service: string = config.app.name;
  exchange: string = 'waba-core';
  topic: string = 'user.created';

  constructor() {
    super()
  }

  async onMessage(data: any, ack: Function): Promise<void> {
    try {
      // perform action here
      ack();
    } catch (error: any) {
      logger.error('Error while handling user created', { error: error.stack });
    }
  }
}

export default AccountCreatedListener;
