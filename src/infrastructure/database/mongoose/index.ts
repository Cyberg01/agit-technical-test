import mongoose from 'mongoose';
import config from '@/config';
import '@/infrastructure/database/mongoose/models';

mongoose.set('strictQuery', true);
mongoose.connect(config.app.db)
  .catch((error) => {
    console.error('MongoDB connection error', { error });
    process.exit();
  });

export default mongoose;
