import { Loader } from '@amirmarmul/waba-common';
import { Redis } from 'ioredis';

const redisUrl = 'redis://redis';

export class RedisLoader extends Loader {
  register(): void {
    this.container.set(Redis, new Redis(redisUrl));
  }
}
