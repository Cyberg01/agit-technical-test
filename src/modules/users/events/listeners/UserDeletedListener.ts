import config from '@/config';
import { Listener, logger, Service } from '@amirmarmul/waba-common';

@Service()
class UserDeletedListener extends Listener<any> {
  service: string = config.app.name;
  exchange: string = 'waba-core';
  topic: string = 'user.deleted';

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

export default UserDeletedListener;
