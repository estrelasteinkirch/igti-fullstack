import quantCidades from "./quantCidades.js";
import init from "./init.js";
import readline from "readline";
import { topFiveMais, topFiveMenos } from "./top5.js";
import {
  listaGrandes,
  listaPequenas,
  theBiggest,
  theSmallest,
} from "./grandepeq.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

init();

console.log(await topFiveMais());
console.log(await topFiveMenos());
//console.log(await menorCidade());
//console.log(await maiorCidade());
console.log(await listaPequenas());
console.log(await listaGrandes());
console.log(await theBiggest());
console.log(await theSmallest());
perguntaUF();

function perguntaUF() {
  rl.question("Digite um UF: ", async (uf) => {
    let quantidade = await quantCidades(uf);
    console.log(
      `O ${uf} tem ${quantidade} cidades e ninguem liga, acaba logo jesus`
    );
    rl.close();
  });
}
