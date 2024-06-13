import 'reflect-metadata';
import 'dotenv/config';
import '@/infrastructure/database/mongoose';
import '@/infrastructure/events/worker';
import '@/infrastructure/http/app';
