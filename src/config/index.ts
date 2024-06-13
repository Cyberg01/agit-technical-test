const config = {
  app: {
    name: 'waba-starter-default',
    mode: process.env.MODE_ENV || 'local',
    grpc: process.env.APP_GRPC || 'waba-starter-default',
    db: process.env.APP_DB || 'mongodb://root:root@mongo:27017/waba-starter-default-DB?authSource=admin',
    mq: process.env.APP_MQ || 'amqp://root:root@rabbitmq',
    jwtSecret: process.env.JWT_SECRET || 'secret',
  }
}

export default config;
