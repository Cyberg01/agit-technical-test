import { LoaderManager } from '@amirmarmul/waba-common';
import { CacheLoader } from '@/infrastructure/loaders/cache';
import { RedisLoader } from '@/infrastructure/loaders/redis';

const manager = new LoaderManager([
  RedisLoader,
  CacheLoader,
]);

manager.load();
