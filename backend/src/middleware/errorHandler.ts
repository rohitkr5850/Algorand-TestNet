import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { logger } from "../utils/logger";

export class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  let status = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof ZodError) {
    status = 400;
    message = "Validation failed";
    return res.status(status).json({
      success: false,
      message,
      errors: err.errors.map((e) => ({ path: e.path.join("."), message: e.message })),
    });
  }

  logger.error(`[${req.method}] ${req.originalUrl} -> ${status} :: ${message}`);
  return res.status(status).json({ success: false, message });
};
