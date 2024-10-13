import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);

    console.log(`MongoDB Connected : ${connect.connection.host}`.cyan.underline.bold);
  } catch (error) {
    console.error(`Error in MongoDB : ${error.message}`.red);
    process.exit(1); // Exit the process with a non-zero exit code
  }
};

export default connectDB;