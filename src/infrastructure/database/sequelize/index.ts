import sequelize from './Sequelize';
import { logger } from '@aptana/multichannel-common';

import './models/user';
import './models/task';

sequelize.sync().catch((err) => {
  logger.error('Unable to sync database:', err);
});

export default sequelize;