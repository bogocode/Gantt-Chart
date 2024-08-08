import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Ensure the environment variable matches the case in your .env file
const mongooseURI = `${process.env.MONGODB_URI}`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongooseURI);
    console.log("Database Connected");
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

export default connectDB;
