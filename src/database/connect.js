import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

mongoose.Promise = global.Promise;

const mongodb = new MongoMemoryServer();

module.exports.connect = async () => {
  const uri = await mongodb.getConnectionString();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  };

  await mongoose.connect(uri, mongooseOpts);
}