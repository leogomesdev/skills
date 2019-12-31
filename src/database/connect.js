import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://10.13.0.5/myskills", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
  }
  catch (err) {
    console.log(err);
  }
}

export default connectToDb;