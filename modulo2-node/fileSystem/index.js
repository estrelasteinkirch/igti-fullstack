import { promises as fs } from "fs";

init();

async function init() {
  try {
    const pusheen = {
      nome: "pushito",
      idade: 12,
      fofo: true,
    };
    let virandoJson = JSON.stringify(pusheen);
    await fs.writeFile("teste.txt", virandoJson);
    // await fs.appendFile("teste.txt", "/teste apend file");
    const data = await fs.readFile("teste.txt", "utf-8");
    const virandoObjeto = JSON.parse(data);
    console.log(virandoObjeto);
  } catch (err) {
    console.log(err);
  }
}

