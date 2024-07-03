import AccountCreatedListener from '@/modules/users/events/listeners/AccountCreatedListener';
import AccountDeletedListener from '@/modules/users/events/listeners/AccountDeletedListener';
import AccountUpdatedListener from '@/modules/users/events/listeners/AccountUpdatedListener';
import { Worker } from '@amirmarmul/waba-common';

const worker = new Worker([
  // users
  AccountCreatedListener,
  AccountUpdatedListener,
  AccountDeletedListener,
]);

worker.start();
