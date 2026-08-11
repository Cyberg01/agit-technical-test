import config from '@/config';
import { Listener, logger, Service } from '@aptana/multichannel-common';

@Service()
class AccountDeletedListener extends Listener<any> {
  service: string = config.app.name;
  exchange: string = 'waba-core';
  topic: string = 'account.deleted';

  constructor() {
    super()
  }

  async onMessage(data: any, ack: Function): Promise<void> {
    try {
      // perform action here
      ack();
    } catch (error: any) {
      logger.error('Error while handling account created', { error: error.stack });
    }
  }
}

export default AccountDeletedListener;
