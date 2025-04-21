import { Request, Response } from 'express';
import winston from "winston";
import path from "path";
import { ExceptionResponse } from "../models/exceptionResponse";

const logFormat = winston.format.printf(
  ({ level, message, timestamp, ...metadata }) => {
    return `${timestamp} [${level}] ${message} ${
      Object.keys(metadata).length ? JSON.stringify(metadata) : ""
    }`;
  }
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

export const logApiRequest = (req: Request) => {
  logger.info(`Request: ${req.body} ${req.path}`, {
    body: req.body,
    query: req.query,
    params: req.params,
  });
};

export const logApiResponse = (res: Response, data: any) => {
  logger.info(`Response: ${res.statusCode}`, { data });
};

export const logApiError = (error: Error | ExceptionResponse) => {
  logger.error("API Error", { error });
};

export default logger;