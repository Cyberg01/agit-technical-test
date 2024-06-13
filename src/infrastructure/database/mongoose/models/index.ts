import mongoose from 'mongoose';
import { mongoosePaginate } from '@amirmarmul/waba-common';

mongoose.plugin(mongoosePaginate);

export * from '@/infrastructure/database/mongoose/models/user';