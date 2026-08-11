import config from '@/config';
import { logger } from '@aptana/multichannel-common';
import { Sequelize } from 'sequelize';

class SequelizeSingleton {
  private static instance: Sequelize;

  private constructor() { }

  public static getInstance(): Sequelize {
    if (!SequelizeSingleton.instance) {
      SequelizeSingleton.instance = new Sequelize(config.mysql.db, {
        dialect: 'mysql',
        pool: {
          max: 5,
          min: 1,
          idle: 10 * 1000,
          acquire: 100 * 1000,
        },
      });

      SequelizeSingleton.instance
        .authenticate()
        .then(() => {
          logger.info('Connection has been established successfully.');
        })
        .catch((err) => {
          logger.error('Unable to connect to the database:', err);
          throw Error('Unable to connect to the database');
        });
    }

    return SequelizeSingleton.instance;
  }
}

const sequelize = SequelizeSingleton.getInstance();

export { SequelizeSingleton };
export default sequelize;
