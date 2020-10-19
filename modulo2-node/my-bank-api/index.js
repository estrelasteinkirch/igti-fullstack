import express from "express";
import accountsRouter from "./routes/accounts.js";
import { promises as fs } from "fs";
import winston from "winston";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import {swaggerDocument} from "./doc.js";

const { readFile, writeFile } = fs;

global.fileName = "accounts.json"; //variavel global que vale para todo o projeto

const { combine, printf, label, timestamp } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "my-bank-api.log" }),
  ],
  format: combine(label({ label: "my-bank-api" }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());
app.use(cors());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/account", accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    logger.info("API started!");
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile(global.fileName, JSON.stringify(initialJson))
      .then(() => {
        logger.info("API started and File Created");
      })
      .catch((err) => {
        log.error(err);
      });
  }
});
