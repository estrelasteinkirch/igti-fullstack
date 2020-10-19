import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

pergunta();

function pergunta() {
  rl.question("Digite um número: ", (numero) => {
    //console.log(numero);

    if (parseInt(numero) === -1) {
      // para fechar o programa no terminal:
      rl.close();
    } else {
      const multiplos = [];
      for (let i = 0; i < numero; i++) {
        if (i % 3 === 0 || i % 5 === 0) {
          multiplos.push(i);
        }
      }
      console.log(multiplos);
      pergunta();
    }
  });
}
