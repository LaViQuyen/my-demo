const winston = require("winston");
const path = require("path");

const fileTransport = new winston.transports.File({
  filename: path.join(__dirname, "../logs/app.log"), // Log file path
  level: "info", // Log level
  format: winston.format.combine(
    winston.format.timestamp(), // Include timestamp
    winston.format.json(), // Log in JSON format
  ),
});

// Create a logger instance
const logger = winston.createLogger({
  transports: [fileTransport],
});

module.exports = logger;
