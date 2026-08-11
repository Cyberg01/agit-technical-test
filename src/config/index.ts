const config = {
  app: {
    name: 'task-manager-app',
    mode: process.env.MODE_ENV || 'local',
    mq: process.env.APP_MQ || 'amqp://root:root@rabbitmq',
    redis: process.env.REDIS_URL || 'redis://redis',
    jwtSecret: process.env.JWT_SECRET || 'secret',
  },
  mysql: {
    db: process.env.MYSQL_DB || 'mysql://root:@mysql:3306/mydb'
  },
}

export default config;
