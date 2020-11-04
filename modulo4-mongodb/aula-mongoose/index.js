import mongoose from "mongoose";

// mongoose.connect("mongodb+srv://estrela:9J5agwfBiSUn7ht@bootcampigti.lhqbu.mongodb.net/student?retryWrites=true&w=majority", {

//   // "mongodb://localhost/grades"
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(

//   console.log("conectado ao Mongo DB Atlas")
// ).catch((err)=> {
//   console.log("erro ao conectar no Mongo DB Atlas" + err);
// });
//senha: 9J5agwfBiSUn7ht

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
    console.log("erro ao conectar no Mongo DB Atlas" + err);
  }
})();

//criaçao do modelo
const studentSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  value: {
    type: Number,
    require: true,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

//definindo o modelo da coleção
mongoose.model("student", studentSchema, "student");

//obtendo a estrutura da coleção student
const student = mongoose.model("student");

new student({
  name: "Pushe Cookie",
  subject: "MongoDB",
  type: "Desafio",
  value: 20,
})
  .save()
  .then(() => console.log("Documento inserido"))
  .catch((err) => console.log("Erro ao tentar inserir o documento"));

// mongoose.close();
