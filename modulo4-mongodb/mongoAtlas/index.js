const MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://estrela:9J5agwfBiSUn7ht@bootcampigti.lhqbu.mongodb.net/<dbname>?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect(async (err) => {
  //obtém coleçao student
  const collection = client.db("grades").collection("student");

  //busca documents cujo subject é React
  const documents = await collection.find({ subject: "React" }).toArray();
  // console.log(documents);

  // obtém lista dos bancos no meu servidor conectado
  const databaselist = await client.db().admin().listDatabases();

  console.log("Databases:");
  databaselist.databases.forEach((db) => {
    console.log(` - ${db.name}`);
  });

  client.close();
});
