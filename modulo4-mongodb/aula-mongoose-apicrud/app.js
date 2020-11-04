import express from "express";
import mongoose from "mongoose";
import {studentRouter} from "./routes/student-router.js"

//conectando ao Mongo Atlas pelo mongoose
(async () => {
  try {
    mongoose.connect(
      "mongodb+srv://estrela:9J5agwfBiSUn7ht@bootcampigti.lhqbu.mongodb.net/grades?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log("erro ao conectar no MongoDB Atlas" + err);
  }
})();



const app = express();

app.use(express.json())
app.use(studentRouter);

app.listen(3000, ()=> console.log("API Iniciada"));

