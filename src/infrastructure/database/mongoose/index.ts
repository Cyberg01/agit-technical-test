import mongoose from 'mongoose';
import config from '@/config';
import '@/infrastructure/database/mongoose/models';
import { logger } from '@amirmarmul/waba-common';

mongoose.set('strictQuery', true);
mongoose.connect(config.app.db, {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 320000
}).catch((error) => {
  logger.error('MongoDB connection error', { error });
});

mongoose.connection.on('open', () => {
  logger.info('Event: open', { readyState: mongoose.connection.readyState });
});

mongoose.connection.on('error', (error) => {
  logger.error('Event: error', { error, readyState: mongoose.connection.readyState });
});

mongoose.connection.on('disconnected', () => {
  logger.warn('Event: disconnected', { readyState: mongoose.connection.readyState });
});

mongoose.connection.on('reconnected', () => {
  logger.info('Event: reconnected', { readyState: mongoose.connection.readyState });
});

export default mongoose;
