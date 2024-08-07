import { ConnectionNotFoundError } from '@/modules/health/errors/ConnectionNotFoundError';
import { HealthCheckError } from '@/modules/health/errors/HealthCheckError';
import { promiseTimeout } from '@/modules/health/utils/promise';
import { HealthIndicatorResult } from '../HealthIndicatorResult';
import { HealthIndicator } from '../HealthIndicator';
import { Service } from '@amirmarmul/waba-common';
import { Connection } from '@amirmarmul/waba-common/core/infrastructure/events/Connection';
import { TimeoutError } from '@/modules/health/errors/TimeoutError';

export interface RabbitmqPingCheckOptions {
  /**
   * The amount of time the check should require in ms
   */
  timeout?: number;
}

@Service()
export class RabbitmqHealthIndicator extends HealthIndicator {
  /**
   * Checks if the RabbitMQ responds in (default) 1000ms and
   * returns a result object corresponding to the result
   * 
   * @example
   * rabbitmqHealthIndicator.pingCheck('rabbitmq', { timeout: 1000 });
   */
  async pingCheck(
    key: string,
    options?: RabbitmqPingCheckOptions
  ): Promise<HealthIndicatorResult> {
    let isHealthy = false;

    const connection = this.getContextConnection();
    const timeout = options?.timeout || 1000;

    if (!connection) {
      throw new ConnectionNotFoundError();
    }

    try {
      await this.pingDB(connection, timeout);
      isHealthy = true;
    } catch (err) {
      if (err instanceof TimeoutError) {
        throw new TimeoutError(timeout);
      }
    }

    if (isHealthy) {
      return this.getStatus(key, isHealthy);
    } else {
      throw new HealthCheckError(`${key} is not available`)
    }
  }

  private async pingDB(connection: any, timeout: number) {
    const promise = connection.isConnected() ? Promise.resolve(): Promise.reject();
    return await promiseTimeout(timeout, promise); 
  }

  private getContextConnection(): any | null {
    try {
      return Connection.getConnection();
    } catch (error) {
      return null;
    }
  }
}
