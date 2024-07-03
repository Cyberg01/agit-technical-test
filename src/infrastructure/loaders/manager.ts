import { LoaderManager } from '@amirmarmul/waba-common';
import { CacheLoader } from '@/infrastructure/loaders/cache';

const manager = new LoaderManager([
  CacheLoader,
]);

manager.load();
