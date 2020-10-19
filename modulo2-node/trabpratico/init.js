import { promises as fs } from "fs";

async function init() {
  try {
    const estados = await fs.readFile("Estados.json", "utf-8");
    const cidades = await fs.readFile("Cidades.json", "utf-8");
    let estadosObj = JSON.parse(estados);
    let cidadesObj = JSON.parse(cidades);
    // console.log(estadosObj);
    // console.log(cidadesObj);
    await novosJson(estadosObj, cidadesObj);
  } catch (err) {
    console.log(err);
  }
}

async function novosJson(estados, cidades) {
  for (const estado of estados) {
    let cidadesDoEstado = cidades
      .filter((cidade) => {
        if (cidade.Estado === estado.ID) {
          return true;
        }
        return false;
      })
      .map((cidade) => {
        return cidade.Nome;
      })
      .sort((a, b) => a.localeCompare(b));
    let virandoJson = JSON.stringify(cidadesDoEstado);
    await fs.writeFile(`${estado.Sigla}.json`, virandoJson);
  }
}

export default init;
