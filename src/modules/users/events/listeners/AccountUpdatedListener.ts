import config from '@/config';
import { Listener, logger, Service } from '@aptana/multichannel-common';

@Service()
class AccountUpdatedListener extends Listener<any> {
  service: string = config.app.name;
  exchange: string = 'waba-core';
  topic: string = 'account.updated';

  constructor() {
    super()
  }

  async onMessage(data: any, ack: Function): Promise<void> {
    try {
      // perform action here
      ack();
    } catch (error: any) {
      logger.error('Error while handling user updated', { error: error.stack });
    }
  }
}

export default AccountUpdatedListener;
