// app/utils/logger.ts
import { createLogger, format, transports } from "winston";
import path from "path";
import fs from "fs";

const logDir = path.join(process.cwd(), "logs");

// Ensure the logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Log file path
const logFilePath = path.join(logDir, "error-log.log");

// Create logger
const logger = createLogger({
  level: "error",
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level.toUpperCase()}] ${message} ${
        stack ? `\nStack: ${stack}` : ""
      }`;
    })
  ),
  transports: [
    new transports.File({ filename: logFilePath }), // Log to file
  ],
});

export default logger;
