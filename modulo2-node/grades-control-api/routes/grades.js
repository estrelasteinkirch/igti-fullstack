import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let grade = req.body;
    // if (!grade.name || grade.balance == null) {
    //   throw new Error("Name e Balance sao obrigatórios");
    // }

    const data = JSON.parse(await readFile(global.fileName));

    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: new Date(),
    };

    data.grades.push(grade);
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(grade);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId; //remover o nextId pq pro usuário isso nao é interessante
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

router.get("/notatotal", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const studentQuery = req.query.student;
    const subjectQuery = req.query.subject;

    const grades = data.grades.filter((grade) => {
      return grade.student === studentQuery && grade.subject === subjectQuery;
    });

    let notaTotal = grades.reduce((acc, grade) => {
      return acc + grade.value;
    }, 0);

    res.send({ notaTotal });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

router.get("/medias", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const subjectQuery = req.query.subject;
    const typeQuery = req.query.type;

    const grades = data.grades.filter((grade) => {
      return grade.type === typeQuery && grade.subject === subjectQuery;
    });

    const sum = grades.reduce((a, grade) => {
      return a + grade.value;
    }, 0);
    let average = sum / grades.length || 0;
    res.send({ average });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

router.get("/top3", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const subjectQuery = req.query.subject;
    const typeQuery = req.query.type;

    const grades = data.grades.filter((grade) => {
      return grade.type === typeQuery && grade.subject === subjectQuery;
    });

    //sort
    let lista = grades
      .sort((a, b) => {
        return a.value - b.value;
      })
      .reverse();

    let top3 = [lista[0], lista[1], lista[2]];

    res.send({ top3 });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const grade = data.grades.find(
      (grade) => grade.id === parseInt(req.params.id)
    );

    delete data.nextId;
    res.send(grade);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.grades = data.grades.filter(
      (grade) => grade.id !== parseInt(req.params.id)
    );
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.end();
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

router.put("/", async (req, res, next) => {
  try {
    let grade = req.body;
    if (
      !grade.id ||
      !grade.student ||
      !grade.subject ||
      !grade.type ||
      grade.value == null
    ) {
      throw new Error("Grade informada não existe");
    }
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.grades.findIndex((a) => a.id === grade.id);
    if (index === -1) {
      throw new Error("Registro não encontrado.");
    }

    data.grades[index].student = grade.student;
    data.grades[index].subject = grade.subject;
    data.grades[index].type = grade.type;
    data.grades[index].value = grade.value;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(grade);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

export default router;
