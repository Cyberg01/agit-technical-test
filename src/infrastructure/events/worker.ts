import UserCreatedListener from '@/modules/users/events/listeners/UserCreatedListener';
import UserDeletedListener from '@/modules/users/events/listeners/UserDeletedListener';
import UserUpdatedListener from '@/modules/users/events/listeners/UserUpdatedListener';
import { Worker } from '@amirmarmul/waba-common';

const worker = new Worker([
  // usersModule
  UserCreatedListener,
  UserUpdatedListener,
  UserDeletedListener,
]);

worker.start();
