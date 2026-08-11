import 'reflect-metadata';
import 'dotenv/config';
import '@/infrastructure/loaders/manager';
import '@/infrastructure/database/sequelize';
import '@/infrastructure/events/worker';
import '@/infrastructure/http/app';
