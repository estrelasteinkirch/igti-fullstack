import { promises as fs } from "fs";

async function quantCidades(uf) {
  try {
    const cidades = await fs.readFile(`${uf}.json`, "utf-8");
    let listaCidades = JSON.parse(cidades);
    return listaCidades.length;
  } catch (err) {
    console.log(err);
  }
}

export default quantCidades;
