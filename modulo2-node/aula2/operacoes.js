const nome = "Teste de exportacao";

function soma(a, b) {
  return a + b;
}

function subtracao(a, b) {
  return a - b;
}

export default { soma, subtracao, nome};

//module.exports = { soma, subtracao, nome};