import express from "express";
import winston from "winston";

const app = express();
app.use(express.json());

//destructuring
const { combine, printf, label, timestamp } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "silly", //todos os logs!
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "my-log.log" }),
  ],
  format: combine(label({ label: "my-app" }), timestamp(), myFormat),
});

logger.error("Error Log");
logger.info("Info Log");
logger.verbose("Verbose Log");
logger.debug("Debug Log");
logger.silly("Silly Log");

logger.log("info", "Hello with parameter!");

app.listen(3000, () => {
  console.log("API started");
});
