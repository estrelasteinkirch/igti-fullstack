import { maiorCidade, menorCidade } from "./tamanhoCid.js";
import { promises as fs } from "fs";

export async function listaGrandes() {
  const estados = await fs.readFile("Estados.json", "utf-8");
  let estadosObj = JSON.parse(estados);
  let cidadesGrandes = [];
  for (const estado of estadosObj) {
    let cidade = await maiorCidade(estado.Sigla);
    cidadesGrandes.push(cidade);
  }
  return cidadesGrandes;
}

export async function listaPequenas() {
  const estados = await fs.readFile("Estados.json", "utf-8");
  let estadosObj = JSON.parse(estados);
  let cidadesPequenas = [];
  for (const estado of estadosObj) {
    let cidade = await menorCidade(estado.Sigla);
    cidadesPequenas.push(cidade);
  }
  return cidadesPequenas;
}

export async function theBiggest() {
  let biggest = (await listaGrandes()).sort((a, b) => a.localeCompare(b));
  let reducer = (arr) => arr.reduce((a, b) => (a.length >= b.length ? a : b));
  return reducer(biggest);
}

export async function theSmallest() {
  let smallest = (await listaPequenas()).sort((a, b) => a.localeCompare(b));
  let reducer = (arr) => arr.reduce((a, b) => (a.length <= b.length ? a : b));
  return reducer(smallest);
}
