import app from "./app";
import { connectDB } from "./config/db";
import { logger } from "./utils/logger";

const PORT = Number(process.env.PORT || 5000);
const MONGO_URI = process.env.MONGO_URI || "";

(async () => {
  if (!MONGO_URI) {
    logger.error("MONGO_URI missing in env");
    process.exit(1);
  }

  await connectDB(MONGO_URI);

  app.listen(PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
  });
})();
