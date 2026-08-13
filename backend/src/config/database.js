import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoDbUri = process.env.MONGODB_URI;

    if (!mongoDbUri) {
      throw new Error("MONGODB_URI is missing in your .env file");
    }

    const connectionInstance = await mongoose.connect(mongoDbUri);
    console.log(`\nMongoDB connected 
            ${connectionInstance.connection.host}`);

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;