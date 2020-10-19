import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    let account = req.body;
    if (!account.name || account.balance == null) {
      throw new Error("Name e Balance sao obrigatórios");
    }

    const data = JSON.parse(await readFile(global.fileName)); //nao precisa colocar global.

    account = {
      id: data.nextId++,
      name: account.name,
      balance: account.balance,
    };

    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(account);
    logger.info(`POST /account - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
});

//retornando todas as informaçoes
router.get("/", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId; //remover o nextId pq pro usuário isso nao é interessante
    res.send(data);
    logger.info("GET /account");
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );

    delete data.nextId;
    res.send(account);
    logger.info("GET /account/:id");
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter(
      (account) => account.id !== parseInt(req.params.id)
    );
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.end();
    logger.info(`DELETE /account/:id - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

//atualizações total, do objeto inteiro, com id, name, balance
router.put("/", async (req, res, next) => {
  try {
    let account = req.body;
    if (!account.id || !account.name || account.balance == null) {
      throw new Error("Name, id e Balance sao obrigatórios");
    }
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((a) => a.id === account.id);
    if (index === -1) {
      throw new Error("Registro não encontrado.");
    }

    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(account);
    logger.info(`PUT /account - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
});

//atualizações parciais
router.patch("/updateBalance", async (req, res, next) => {
  try {
    let account = req.body;
    if (!account.id || account.balance == null) {
      throw new Error("id e Balance sao obrigatórios");
    }
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((a) => a.id === account.id);

    if (index === -1) {
      throw new Error("Registro não encontrado.");
    }

    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(data.accounts[index]);
    logger.info(`PATCH /account/updateBalance - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
});

//tratamento de errros:
router.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${err.message} `);
  res.status(400).send({ error: err.message });
});

export default router;
