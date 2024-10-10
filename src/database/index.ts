import mongoose from "mongoose";

const connectDB = async (url: string) => {
  try {
    const connecting = await mongoose.connect(url);
    console.log(`MongoDB Connected : ${connecting.connection.host}`);
  } catch (error) {
    if (error instanceof Error) console.error(`error : ${error.message}`);
  }
};

export default connectDB;
