import express from "express";
import mongoose from "mongoose";
import {studentRouter} from "./routes/student-router.js"

require("dotenv").config();

process.env.USER_DB = "estrela"

const app = express();

//conectando ao Mongo Atlas pelo mongoose
(async () => {
  try {
    mongoose.connect(
      `mongodb+srv://${
        process.env.USERDB}:${process.env.PWDDB}@bootcampigti.lhqbu.mongodb.net/grades?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log("erro ao conectar no MongoDB Atlas" + err);
  }
})();


app.use(express.json())
app.use(studentRouter);

app.listen([process.env.PORT], ()=> console.log("API Iniciada"));

