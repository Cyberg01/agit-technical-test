import { Cache, CacheConfig, Loader } from '@amirmarmul/waba-common';
import config from '@/config';

const config: CacheConfig = {
    store: 'file',
    stores: {
        array: {
            driver: 'array'
        },
        file: {
            driver: 'file',
            path: 'storage/cache/data'
        },
        redis: {
            driver: 'redis',
            redisUrl: config.app.redis,
        }
    },
    prefix: config.app.name + '_cache_'
}

export class CacheLoader extends Loader {
    register(): void {
        this.container.set(Cache, new Cache(config));
    }
}