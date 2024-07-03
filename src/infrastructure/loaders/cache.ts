import { Cache, CacheConfig, Loader } from '@amirmarmul/waba-common';

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
            redisUrl: 'redis://redis'
        }
    },
    prefix: process.env.npm_package_name + '_cache_'
}

export class CacheLoader extends Loader {
    register(): void {
        this.container.set(Cache, new Cache(config));
    }
}