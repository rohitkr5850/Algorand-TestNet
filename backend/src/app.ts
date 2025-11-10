import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import algorandRoutes from "./routes/algorandRoutes";
import { errorHandler, notFound } from "./middleware/errorHandler";

dotenv.config();

const app = express();

// CORS: allow frontend origin
const allowedOrigin = process.env.FRONTEND_ORIGIN || "*";
app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "OK" });
});

app.use("/api/algorand", algorandRoutes);

// 404 + error handling
app.use(notFound);
app.use(errorHandler);

export default app;
