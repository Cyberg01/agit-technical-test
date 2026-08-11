import { Event } from '@aptana/multichannel-common';
import { User } from '../domain/User';
import config from '@/config';

class UserDeleted extends Event<User> {
  exchange: string = config.app.name;
  topic: string = 'user.deleted';
}

export default UserDeleted;
