import mongoose from "mongoose";
import { logger } from "../utils/logger";

export const connectDB = async (mongoUri: string) => {
  try {
    await mongoose.connect(mongoUri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 15000,
    });
    logger.info("✅ MongoDB connected");
  } catch (err: any) {
    logger.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};
