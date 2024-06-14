import { Cache, CacheConfig, Loader } from '@amirmarmul/waba-common';

const config: CacheConfig = {
    store: 'redis',
    stores: {
        array: {
            driver: 'array'
        },
        file: {
            driver: 'redis',
            path: 'storage/cache/data'
        },
        redis: {
            driver: 'redis'
        }
    },
    prefix: process.env.npm_package_name + '_cache_'
}

export class CacheLoader extends Loader {
    register(): void {
        this.container.set(Cache, new Cache(config));
    }
}