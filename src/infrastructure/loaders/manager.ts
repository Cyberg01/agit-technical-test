import { LoaderManager } from '@aptana/multichannel-common';
import { CacheLoader } from '@/infrastructure/loaders/cache';

const manager = new LoaderManager([
  CacheLoader,
]);

manager.load();
