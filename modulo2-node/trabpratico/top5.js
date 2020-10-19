import quantCidades from "./quantCidades.js";
import { promises as fs } from "fs";

async function preparacao() {
  const estados = await fs.readFile("Estados.json", "utf-8");
  let estadosObj = JSON.parse(estados);
  //ler o estado com `${estado.Sigla}.json`
  let listaQuantidades = [];
  for (const estado of estadosObj) {
    let quantidade = await quantCidades(estado.Sigla);
    let estadoObj = {
      UF: estado.Sigla,
      quant: quantidade,
    };
    listaQuantidades.push(estadoObj);
  }
  //colocar em ordem decrescente
  let listaCompleta = listaQuantidades.sort((a, b) => {
    return a.quant - b.quant;
  });
  return listaCompleta;
}

export async function topFiveMais() {
  let listaQuantidades = await preparacao();
  listaQuantidades.reverse();
  //pegar novo array só com os 5 primeiros valores
  return [
    listaQuantidades[0],
    listaQuantidades[1],
    listaQuantidades[2],
    listaQuantidades[3],
    listaQuantidades[4],
  ];
}

export async function topFiveMenos() {
  let listaQuantidades = await preparacao();
  return [
    listaQuantidades[0],
    listaQuantidades[1],
    listaQuantidades[2],
    listaQuantidades[3],
    listaQuantidades[4],
  ];
};


