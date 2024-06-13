import { Event } from '@amirmarmul/waba-common';
import { User } from '../domain/User';
import config from '@/config';

class UserUpdated extends Event<User> {
  exchange: string = config.app.name;
  topic: string = 'user.updated';
}

export default UserUpdated;
