import { promises as fs } from "fs";

export async function maiorCidade(uf) {
  const cidades = await fs.readFile(`${uf}.json`, "utf-8");
  let maior = JSON.parse(cidades);
  let reducer = (arr) => arr.reduce((a, b) => (a.length >= b.length ? a : b));
  return `${reducer(maior)} - ${uf}`;
}

export async function menorCidade(uf) {
  const cidades = await fs.readFile(`${uf}.json`, "utf-8");
  let menor = JSON.parse(cidades);
  let reducer = (arr) => arr.reduce((a, b) => (a.length <= b.length ? a : b));
  return `${reducer(menor)} - ${uf}`;
}
