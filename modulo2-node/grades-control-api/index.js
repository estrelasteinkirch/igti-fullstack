import express from "express";
import gradesRouter from "./routes/grades.js";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

global.fileName = "grades.json"; //variavel global que vale para todo o projeto

const app = express();
app.use(express.json());
//app.use(cors());
app.use("/grades", gradesRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    console.log("API started!");
  } catch (err) {
    console.log(err);
  }
});
