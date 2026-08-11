import mongoose from 'mongoose';
import { mongoosePaginate } from '@aptana/multichannel-common';

mongoose.plugin(mongoosePaginate);

export * from '@/infrastructure/database/mongoose/models/user';