import 'reflect-metadata';
import 'dotenv/config';
import '@/infrastructure/loaders/manager';
import '@/infrastructure/database/mongoose';
import '@/infrastructure/events/worker';
import '@/infrastructure/http/app';
