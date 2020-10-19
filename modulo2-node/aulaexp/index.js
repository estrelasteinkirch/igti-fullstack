import express from "express";
import carrosRouter from "./carrosRouter.js";

const app = express();
app.use(express.json());

app.use("/carros", carrosRouter);

//erros

app.get("/", (req, res) => {
  throw new Error("Error msg test");
});

app.post("/", async (req, res, next) => {
  try {
    throw new Error("Error msg async");
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log("Erro 1");
  next(err);
});

app.use((err, req, res, next) => {
  console.log("Erro 2");
  res.status(500).send("Ocorreu um erro, tente novamente mais tarde");
});

//exemplos de rotas

// app.get("/", (req, res) => {
//   res.send("Hello World GET");
// });

//all
app.all("/testAll", (req, res) => {
  res.send(req.method);
});

//caracteres especiais
app.get("/testou?", (_req, res) => {
  res.send("/teste? ou test?");
});
app.get("/buzz+", (_req, res) => {
  res.send("/buzz+ ou buzzzzz+");
});

app.get("/test(ing)?", (_req, res) => {
  res.send("duas opções");
});

app.get("/one*Blue", (_req, res) => {
  res.send("/one *qualquer coisa* Blue");
});

app.get(/.*Red$/, (_req, res) => {
  //aceita carRed
  res.send("/.*Red$/");
});

//parâmetros na rota
app.get("/testParam/:id/:a?", (req, res) => {
  //o ? é pra parametro opcional
  res.send(req.params.id + " " + req.params.a);
});

// parametros via query
app.get("/testQuery", (req, res) => {
  res.send(req.query); //http://localhost:3000/testQuery?nome=joao&email=joao.solva@gmail.com
});

//next

app.get(
  "/testMultHandlers",
  (req, res, next) => {
    console.log("Callback 1");
    next();
  },
  (_req, res) => {
    console.log("Callback 2");
    res.send("fim da requisiçao"); //ou  res.end();
  }
);

//next com array
const callback1 = (req, res, next) => {
  console.log("Callback 1");
  next();
};
function callback2(req, res, next) {
  console.log("Callback 2");
  next();
}
const callback3 = (req, res) => {
  console.log("Callback 3");
  res.end();
};

app.get("/testMultHandlersArray", [callback1, callback2, callback3]);

//route
app
  .route("/testRoute")
  .get((req, res) => {
    res.send("Test Route GET");
  })
  .post((req, res) => {
    res.send("Test Route POST");
  })
  .delete((req, res) => {
    res.send("Test Route DELETE");
  });

//porta
app.listen(3000, () => {
  console.log("API started");
});
// usar o npm install -g nodemon: para ter o servidor ao vivo
